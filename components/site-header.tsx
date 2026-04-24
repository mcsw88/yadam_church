"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type MenuKey = "about" | "ministries" | "news" | "gallery" | "contact";
type MenuPhase = "closed" | "opening" | "open" | "closing";

type SubmenuItem = { label: string; href: string };

const submenuMap: Record<MenuKey, SubmenuItem[]> = {
  about: [
    { label: "인사말", href: "/about#intro" },
    { label: "교회비전", href: "/about#vision" },
    { label: "섬기는 사람들", href: "/about#leaders" },
    { label: "예배시간", href: "/about#worship" },
  ],
  ministries: [
    { label: "주일사역", href: "/ministries#sunday" },
    { label: "다음세대", href: "/ministries#nextgen" },
    { label: "선교/봉사", href: "/ministries#mission" },
    { label: "새가족", href: "/ministries#newcomer" },
  ],
  news: [
    { label: "공지사항", href: "/notice" },
    { label: "행사", href: "/news" },
  ],
  gallery: [{ label: "행사사진", href: "/gallery" }],
  contact: [{ label: "익명 자유게시판", href: "/contact" }],
};

function getMenuKeyFromPath(pathname: string): MenuKey {
  if (pathname.startsWith("/ministries")) return "ministries";
  if (pathname.startsWith("/news") || pathname.startsWith("/notice")) return "news";
  if (pathname.startsWith("/post")) return "news";
  if (pathname.startsWith("/gallery")) return "gallery";
  if (pathname.startsWith("/contact") || pathname.startsWith("/location")) return "contact";
  return "about";
}

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
    // Route-based sync should not override user-opened submenu while animating/open.
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
    // Give the browser one tick so opening transition can start.
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
            <button type="button" className={highlightedMenuKey === "about" ? "is-active" : ""} onClick={() => openMenu("about")}>
              교회소개
            </button>
            <button type="button" className={highlightedMenuKey === "ministries" ? "is-active" : ""} onClick={() => openMenu("ministries")}>
              사역소개
            </button>
            <button type="button" className={highlightedMenuKey === "news" ? "is-active" : ""} onClick={() => openMenu("news")}>
              교회소식
            </button>
            <button type="button" className={highlightedMenuKey === "gallery" ? "is-active" : ""} onClick={() => openMenu("gallery")}>
              갤러리
            </button>
            <button type="button" className={highlightedMenuKey === "contact" ? "is-active" : ""} onClick={() => openMenu("contact")}>
              문의하기
            </button>
          </nav>
          <Link className="ref-cta" href="/location">
            오시는길
          </Link>
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
