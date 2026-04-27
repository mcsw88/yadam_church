"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMenuKeyFromPath, mainMenuItems, type MenuKey, submenuMap } from "../lib/navigation";

type MenuPhase = "closed" | "opening" | "open" | "closing";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const activePathMenu = useMemo(() => getMenuKeyFromPath(pathname), [pathname]);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openCommitRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefetchedHrefsRef = useRef<Set<string>>(new Set());
  const [visibleSubmenuKey, setVisibleSubmenuKey] = useState<MenuKey>(activePathMenu);
  const [visualActiveMenu, setVisualActiveMenu] = useState<MenuKey>(activePathMenu);
  const [menuPhase, setMenuPhase] = useState<MenuPhase>("closed");
  const highlightedMenuKey = visualActiveMenu ?? activePathMenu;

  useEffect(() => {
    if (menuPhase === "closed") {
      setVisibleSubmenuKey(activePathMenu);
      setVisualActiveMenu(activePathMenu);
    }
  }, [activePathMenu, menuPhase]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (openCommitRef.current) clearTimeout(openCommitRef.current);
    };
  }, []);

  const submenuItems = useMemo(() => submenuMap[visibleSubmenuKey], [visibleSubmenuKey]);

  const prefetchSubmenuGroup = useCallback((menuKey: MenuKey) => {
    for (const item of submenuMap[menuKey]) {
      if (prefetchedHrefsRef.current.has(item.href)) continue;
      prefetchedHrefsRef.current.add(item.href);
      void router.prefetch(item.href);
    }
  }, [router]);

  /** 현재 URL이 속한 대메뉴의 소메뉴는 항상 워밍 — 다른 대메뉴로 첫 이동 전에도 형제 탭이 빨라짐 */
  useEffect(() => {
    prefetchSubmenuGroup(activePathMenu);
  }, [activePathMenu, prefetchSubmenuGroup]);

  const clearCloseTimer = () => {
    if (!closeTimerRef.current) return;
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const clearOpenCommit = () => {
    if (!openCommitRef.current) return;
    clearTimeout(openCommitRef.current);
    openCommitRef.current = null;
  };

  const commitOpenPhase = () => {
    clearOpenCommit();
    openCommitRef.current = setTimeout(() => {
      setMenuPhase("open");
      openCommitRef.current = null;
    }, 0);
  };

  const openMenu = (menuKey: MenuKey) => {
    clearCloseTimer();
    clearOpenCommit();
    setVisualActiveMenu(menuKey);
    setVisibleSubmenuKey(menuKey);
    setMenuPhase("opening");
    commitOpenPhase();
    prefetchSubmenuGroup(menuKey);
  };

  const closeMenu = (closingMenuKey: MenuKey) => {
    clearCloseTimer();
    clearOpenCommit();
    setVisibleSubmenuKey(closingMenuKey);
    setMenuPhase("closing");
    closeTimerRef.current = setTimeout(() => {
      setMenuPhase("closed");
      closeTimerRef.current = null;
    }, 2000);
  };

  const handleSubmenuLinkActivate = (parentMenuKey: MenuKey) => {
    setVisualActiveMenu(parentMenuKey);
    closeMenu(parentMenuKey);
  };

  const isPanelVisible = menuPhase !== "closed";
  const isClosing = menuPhase === "closing";
  const isHidden = menuPhase === "closed";

  return (
    <header className="ref-header" onMouseLeave={() => void 0}>
      <div className="ref-container">
        <div className="ref-top-row">
          <Link className="ref-logo" href="/">
            <img src="/assets/images/yadam_logo.png" alt="예닮교회 로고" />
          </Link>
          <nav className="ref-main-nav" aria-label="main navigation">
            <div className="ref-main-nav-core">
              {mainMenuItems.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  className={highlightedMenuKey === key ? "is-active" : ""}
                  onMouseEnter={() => prefetchSubmenuGroup(key)}
                  onFocus={() => prefetchSubmenuGroup(key)}
                  onClick={() => openMenu(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <Link
              className={`ref-main-nav-location${pathname.startsWith("/location") ? " is-active" : ""}`}
              href="/location"
            >
              오시는길
            </Link>
          </nav>
          <div className="ref-header-trailing">
            <Link className="ref-cta" href="/location">
              오시는길
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`ref-submenu-panel-floating ${isPanelVisible ? "is-open" : ""} ${isClosing ? "is-closing" : ""} ${
          isHidden ? "is-hidden" : ""
        }`}
      >
        <div className="ref-container">
          <div className="ref-sub-row">
            {submenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={() => handleSubmenuLinkActivate(visibleSubmenuKey)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
