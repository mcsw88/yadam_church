"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordionKey, setMobileAccordionKey] = useState<MenuKey | null>(null);

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

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileAccordionKey(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setMobileAccordionKey(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1201px)");
    const onWiden = () => {
      if (mq.matches) {
        setMobileMenuOpen(false);
        setMobileAccordionKey(null);
      }
    };
    onWiden();
    try {
      if (typeof mq.addEventListener === "function") {
        mq.addEventListener("change", onWiden);
        return () => mq.removeEventListener("change", onWiden);
      }
      mq.addListener(onWiden);
      return () => mq.removeListener(onWiden);
    } catch {
      return undefined;
    }
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

  const toggleMobileAccordion = (key: MenuKey) => {
    setMobileAccordionKey((current) => (current === key ? null : key));
  };

  const handleMobileSubLink = (parentKey: MenuKey, href: string) => {
    setVisualActiveMenu(parentKey);
    router.push(href);
    setMobileMenuOpen(false);
    setMobileAccordionKey(null);
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
          <nav className="ref-main-nav ref-main-nav--desktop" aria-label="main navigation">
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
              오시는길
            </Link>
            <button
              type="button"
              className="ref-mobile-menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              onClick={() => {
                setMobileMenuOpen((open) => {
                  const next = !open;
                  if (next) setMobileAccordionKey(activePathMenu);
                  else setMobileAccordionKey(null);
                  return next;
                });
              }}
            >
              <span className="ref-mobile-menu-toggle-bars" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <button
          type="button"
          className="ref-mobile-scrim"
          aria-label="메뉴 닫기"
          onClick={() => {
            setMobileMenuOpen(false);
            setMobileAccordionKey(null);
          }}
        />
      ) : null}

      <div
        id="mobile-nav-drawer"
        className={`ref-mobile-drawer ${mobileMenuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="사이트 메뉴"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="ref-container ref-mobile-drawer-inner">
          {mainMenuItems.map(({ key, label }) => (
            <div key={key} className="ref-mobile-accordion">
              <button
                type="button"
                className={`ref-mobile-accordion-trigger ${mobileAccordionKey === key ? "is-expanded" : ""}`}
                aria-expanded={mobileAccordionKey === key}
                onClick={() => toggleMobileAccordion(key)}
              >
                {label}
              </button>
              {mobileAccordionKey === key ? (
                <div className="ref-mobile-accordion-panel">
                  {submenuMap[key].map((item) => (
                    <button
                      key={item.href}
                      type="button"
                      className="ref-mobile-sublink"
                      onClick={() => handleMobileSubLink(key, item.href)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`ref-submenu-panel-floating ref-submenu-panel-floating--desktop ${isPanelVisible ? "is-open" : ""} ${
          isClosing ? "is-closing" : ""
        } ${isHidden ? "is-hidden" : ""}`}
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
