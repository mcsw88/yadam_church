export type MenuKey = "about" | "ministries" | "news" | "gallery" | "contact";

export type SubmenuItem = { label: string; href: string };

/** 데스크톱·모바일 공통 대메뉴 순서 */
export const mainMenuItems: { key: MenuKey; label: string }[] = [
  { key: "about", label: "교회소개" },
  { key: "ministries", label: "사역소개" },
  { key: "news", label: "교회소식" },
  { key: "gallery", label: "갤러리" },
  { key: "contact", label: "문의하기" },
];

export const submenuMap: Record<MenuKey, SubmenuItem[]> = {
  about: [
    { label: "인사말", href: "/about/intro" },
    { label: "비전 · 핵심가치", href: "/about/vision" },
    { label: "섬기는 이들", href: "/about/leaders" },
    { label: "예배시간", href: "/about/worship" },
  ],
  ministries: [
    { label: "주일사역", href: "/ministries/sunday" },
    { label: "선교 · 봉사", href: "/ministries/mission" },
  ],
  news: [
    { label: "공지사항", href: "/notice" },
    { label: "행사소식", href: "/news" },
  ],
  gallery: [{ label: "행사사진", href: "/gallery" }],
  contact: [{ label: "자유게시판", href: "/contact/board" }],
};

export function getMenuKeyFromPath(pathname: string): MenuKey {
  if (pathname.startsWith("/ministries")) return "ministries";
  if (pathname.startsWith("/news") || pathname.startsWith("/notice")) return "news";
  if (pathname.startsWith("/post")) return "news";
  if (pathname.startsWith("/gallery")) return "gallery";
  if (pathname.startsWith("/contact") || pathname.startsWith("/location")) return "contact";
  return "about";
}
