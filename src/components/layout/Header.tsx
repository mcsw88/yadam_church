"use client";

import Link from "next/link";
import { useCallback, useState, type MouseEvent } from "react";

import { OverlayMenu } from "@/components/interaction/OverlayMenu";
import { useNavigationTransition } from "@/components/providers/NavigationTransitionProvider";
import { ROUTES } from "@/constants/routes";
//import { CONTAINER_MAX, HEADER_HEIGHT_PX, PAGE_PADDING_X } from '@/constants/ui';
import { HEADER_HEIGHT_PX } from "@/constants/ui";
import { useHeaderTheme } from "@/hooks/useHeaderTheme";
import type { MenuId } from "@/types/menu";
import { ContactOverlayTrigger } from "@/components/features/ContactOverlayTrigger";

export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [overlayActiveMainId, setOverlayActiveMainId] = useState<MenuId | null>(
    null,
  );
  const theme = useHeaderTheme();
  const { beginNavigation } = useNavigationTransition();

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => {
    setOverlayActiveMainId(null);
    setMenuOpen(false);
  }, []);

  const navigateFromMenu = useCallback(
    (href: string) => {
      beginNavigation(href, closeMenu);
    },
    [beginNavigation, closeMenu],
  );

  const navigateFromHeaderHome = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      if (menuOpen) {
        beginNavigation(ROUTES.home, closeMenu);
        return;
      }

      beginNavigation(ROUTES.home);
    },
    [beginNavigation, closeMenu, menuOpen],
  );

  const textColorClass = theme === "dark" ? "text-dado-bg" : "text-dado-dark";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 transition-colors ${textColorClass}`}
        style={{ height: HEADER_HEIGHT_PX, zIndex: "var(--z-header)" }}
      >
        <div className="flex h-full w-full items-center justify-between px-[clamp(1.25rem,3vw,4rem)]">
          <Link
            href={ROUTES.home}
            onClick={navigateFromHeaderHome}
            className="font-serif text-2xl tracking-wide md:text-[1.75rem] lg:text-[1.9rem]"
          >
            안양예담교회
          </Link>

          <div className="flex items-center gap-5">
            <ContactOverlayTrigger variant="header" />
            <button
              type="button"
              onClick={() => {
                if (menuOpen) closeMenu();
                else openMenu();
              }}
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
              aria-controls="overlay-menu"
              className="-mr-2 flex h-10 min-h-11 min-w-11 shrink-0 items-center justify-end gap-2 py-2 pl-2 pr-0 md:min-w-3 md:gap-3 md:px-0"
            >
              <span className="hidden font-sans text-base font-medium uppercase tracking-[0.34em] md:inline lg:text-[1.05rem]">
                MENU
              </span>
              <span
                className="flex flex-col items-center justify-center gap-1.5"
                aria-hidden="true"
              >
                <span className="block h-px w-7 bg-current" />
                <span className="block h-px w-7 bg-current" />
                <span className="block h-px w-7 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <OverlayMenu
        open={menuOpen}
        onClose={closeMenu}
        onInternalNavigate={navigateFromMenu}
        activeMainId={overlayActiveMainId}
        onActiveMainIdChange={setOverlayActiveMainId}
      />
    </>
  );
}
