"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { DEPLOY_REVISION } from "../lib/deploy-revision";
import { getMenuKeyFromPath, mainMenuItems, type MenuKey, submenuMap } from "../lib/navigation";

type MenuPhase = "closed" | "opening" | "open" | "closing";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const activePathMenu = useMemo(() => getMenuKeyFromPath(pathname), [pathname]);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openCommitRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const handleSubmenuClick = (parentMenuKey: MenuKey, href: string) => {
    setVisualActiveMenu(parentMenuKey);
    router.push(href);
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
            {mainMenuItems.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={highlightedMenuKey === key ? "is-active" : ""}
                onClick={() => openMenu(key)}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="ref-header-trailing">
            <Link className="ref-cta" href="/location">
              오시는길 <span className="ref-cta-deploy-num">{DEPLOY_REVISION}</span>
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
              <button key={item.href} type="button" onClick={() => handleSubmenuClick(visibleSubmenuKey, item.href)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
