"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ANCHOR_MAP, type AnchorEntry } from "@/constants/anchorMap";
import { MENU_ITEMS } from "@/constants/menu";
import { ROUTES } from "@/constants/routes";
import { CHURCH_INFO } from "@/data/church-info";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { isInternalHref } from "@/components/providers/NavigationTransitionProvider";
import { DURATION_MS } from "@/motion/durations";
import { TWEEN_FADE } from "@/motion/transitions";
import type { MenuId, MenuItem, SubMenu } from "@/types/menu";

const OVERLAY_MENU_OPEN_CLASS = "overlay-menu-open";

const OVERLAY_MENU_ITEMS = MENU_ITEMS.filter((item) => item.id !== "contact");
const DEFAULT_ACTIVE_MENU: MenuId =
  MENU_ITEMS.find((i) => i.sub.length > 0)?.id ?? MENU_ITEMS[0].id;

interface OverlayMenuProps {
  open: boolean;
  onClose: () => void;
  /** Called for in-app routes (`/...`); runs transition + closes menu via `beginNavigation`. */
  onInternalNavigate: (href: string) => void;
  activeMainId: MenuId | null;
  onActiveMainIdChange: (id: MenuId) => void;
}

function MenuNavAnchor({
  href,
  className,
  children,
  onInternalNavigate,
  onMouseEnter,
  onFocus,
  "aria-haspopup": ariaHasPopup,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onInternalNavigate: (href: string) => void;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  "aria-haspopup"?: boolean | "false" | "menu";
}) {
  if (!isInternalHref(href)) {
    return (
      <Link
        href={href}
        className={className}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        aria-haspopup={ariaHasPopup}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      prefetch
      className={className}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      aria-haspopup={ariaHasPopup}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey
        ) {
          return;
        }

        event.preventDefault();
        onInternalNavigate(href);
      }}
    >
      {children}
    </Link>
  );
}

const REDUCED_MOTION_VARIANTS = {
  hidden: { opacity: 0, pointerEvents: "none" as const },
  visible: { opacity: 1, pointerEvents: "auto" as const },
  exit: { opacity: 0, pointerEvents: "none" as const },
} as const;

/** Fullscreen overlay: fade only on root (no vertical slide). */
const OVERLAY_ROOT_VARIANTS = {
  hidden: { opacity: 0, pointerEvents: "none" as const },
  visible: { opacity: 1, pointerEvents: "auto" as const },
  exit: { opacity: 0, pointerEvents: "none" as const },
} as const;

const OVERLAY_ROOT_TRANSITION = {
  ...TWEEN_FADE,
  duration: DURATION_MS.transition / 1000,
} as const;

/** Desktop sub panel swap: opacity crossfade only (no rise/slide). */
const SUB_PANEL_VARIANTS_DESKTOP = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

/** Mobile root ↔ sub step: light fade only */
const MOBILE_STEP_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

function buildSubHref(menuId: MenuId, anchor: AnchorEntry): string {
  const base = ROUTES[menuId];
  if (anchor.kind === "fragment") {
    return `${base}#${anchor.fragment}`;
  }
  return `${base}?${anchor.key}=${anchor.value}`;
}

function SubLinkList({
  menuId,
  subs,
  onInternalNavigate,
  mobileCompact = false,
}: {
  menuId: MenuId;
  subs: readonly SubMenu[];
  onInternalNavigate: (href: string) => void;
  /** Used only under `md:hidden` mobile sub panel — tighter type/spacing */
  mobileCompact?: boolean;
}) {
  const ulClass = mobileCompact ? "space-y-2" : "space-y-3 md:space-y-5";
  const linkClass = mobileCompact
    ? "block py-0.5 font-sans text-sm leading-snug text-dado-light/80 transition-colors hover:text-dado-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dado-bg"
    : "font-sans text-base text-dado-light/80 transition-colors hover:text-dado-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dado-bg md:block md:py-1.5 md:text-xl md:leading-snug";

  return (
    <ul className={ulClass}>
      {subs.map((subItem: SubMenu) => {
        const anchor = ANCHOR_MAP[menuId][subItem.id];
        if (!anchor) return null;
        return (
          <li key={subItem.id}>
            <MenuNavAnchor
              href={buildSubHref(menuId, anchor)}
              onInternalNavigate={onInternalNavigate}
              className={linkClass}
            >
              {anchor.labelKo}
            </MenuNavAnchor>
          </li>
        );
      })}
    </ul>
  );
}

function MainMenuChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 4l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OverlayMenu({
  open,
  onClose,
  onInternalNavigate,
  activeMainId,
  onActiveMainIdChange,
}: OverlayMenuProps) {
  const containerRef = useFocusTrap<HTMLDivElement>(open);
  const reducedMotion = useReducedMotionSafe();
  useLockBodyScroll(open);

  const [mobileMenuStep, setMobileMenuStep] = useState<"root" | "sub">("root");
  const [mobileSelectedId, setMobileSelectedId] = useState<MenuId | null>(null);

  const effectiveActiveMenu: MenuId | null = open
    ? (activeMainId ?? DEFAULT_ACTIVE_MENU)
    : null;

  const activeItem = useMemo(
    () =>
      effectiveActiveMenu
        ? (OVERLAY_MENU_ITEMS.find((i) => i.id === effectiveActiveMenu) ?? null)
        : null,
    [effectiveActiveMenu],
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      document.body.classList.add(OVERLAY_MENU_OPEN_CLASS);
    } else {
      document.body.classList.remove(OVERLAY_MENU_OPEN_CLASS);
    }
    return () => {
      if (typeof document === "undefined") return;
      document.body.classList.remove(OVERLAY_MENU_OPEN_CLASS);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (typeof document === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset mobile drill-down when overlay closes
      setMobileMenuStep("root");
      setMobileSelectedId(null);
    }
  }, [open]);

  const mobileSubItem = useMemo(() => {
    if (mobileMenuStep !== "sub" || !mobileSelectedId) return null;
    const item =
      OVERLAY_MENU_ITEMS.find((i) => i.id === mobileSelectedId) ?? null;
    if (!item || item.sub.length === 0) return null;
    return item;
  }, [mobileMenuStep, mobileSelectedId]);

  const showMobileSubPanel =
    open && mobileMenuStep === "sub" && mobileSubItem != null;

  const overlayVariants = reducedMotion
    ? REDUCED_MOTION_VARIANTS
    : OVERLAY_ROOT_VARIANTS;
  const overlayTransition = reducedMotion
    ? { ...TWEEN_FADE, duration: DURATION_MS.transition / 10000 }
    : OVERLAY_ROOT_TRANSITION;

  const subPanelVariants = reducedMotion
    ? REDUCED_MOTION_VARIANTS
    : SUB_PANEL_VARIANTS_DESKTOP;
  const subPanelTransition = reducedMotion
    ? { ...TWEEN_FADE, duration: DURATION_MS.transition / 10000 }
    : { ...TWEEN_FADE, duration: 0.8 };

  const mobileStepVariants = reducedMotion
    ? REDUCED_MOTION_VARIANTS
    : MOBILE_STEP_VARIANTS;
  const mobileStepTransition = reducedMotion
    ? { ...TWEEN_FADE, duration: DURATION_MS.transition / 10000 }
    : TWEEN_FADE;

  const handleMainHoverFocus = useCallback(
    (id: MenuId) => {
      onActiveMainIdChange(id);
    },
    [onActiveMainIdChange],
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={containerRef}
          id="overlay-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="overlay-menu-title"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={overlayTransition}
          className="fixed inset-0 flex max-h-[100dvh] min-h-0 h-[100dvh] flex-col bg-dado-dark text-dado-light"
          style={{ zIndex: "var(--z-menu)" }}
        >
          <h2 id="overlay-menu-title" className="sr-only">
            메뉴
          </h2>

          <div className="mx-auto flex h-full max-h-[100dvh] min-h-0 w-full max-w-none flex-1 flex-col px-6 py-6 md:px-12 md:py-12 lg:px-24">
            <div className="flex shrink-0 items-center justify-between">
              <MenuNavAnchor
                href={ROUTES.home}
                onInternalNavigate={onInternalNavigate}
                className="font-serif text-xl tracking-wide md:text-2xl"
              >
                안양예담교회
              </MenuNavAnchor>
              <button
                type="button"
                onClick={onClose}
                aria-label="메뉴 닫기"
                className="min-h-11 min-w-11 font-sans text-xs uppercase tracking-[0.3em] md:min-h-0 md:min-w-0 md:text-sm"
              >
                닫기
              </button>
            </div>

            <nav
              aria-label="전체 메뉴"
              className="mt-8 flex min-h-0 flex-1 flex-col overflow-hidden md:mt-16 lg:mt-24"
            >
              {/* Mobile: root list or sub panel (drill-down) */}
              <div
                className="relative flex min-h-0 flex-1 flex-col overflow-hidden md:hidden"
                role="region"
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatePresence mode="sync" initial={false}>
                  {!showMobileSubPanel ? (
                    <motion.div
                      key="mobile-menu-root"
                      variants={mobileStepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={mobileStepTransition}
                      className="absolute inset-0 flex min-h-0 w-full flex-col items-start justify-start overflow-hidden"
                    >
                      <ul className="space-y-3 pb-2">
                        {OVERLAY_MENU_ITEMS.map((item: MenuItem) => {
                          const hasSubs = item.sub.length > 0;
                          if (hasSubs) {
                            return (
                              <li key={item.id}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setMobileSelectedId(item.id);
                                    setMobileMenuStep("sub");
                                  }}
                                  className="flex min-h-11 w-full items-center justify-between gap-3 py-1 text-left font-serif text-3xl leading-tight text-dado-light transition-colors hover:text-dado-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dado-bg"
                                >
                                  <span>{item.labelKo}</span>
                                  <MainMenuChevron className="shrink-0 text-dado-light/70" />
                                </button>
                              </li>
                            );
                          }
                          return (
                            <li key={item.id}>
                              <MenuNavAnchor
                                href={ROUTES[item.id]}
                                onInternalNavigate={onInternalNavigate}
                                className="flex min-h-11 items-center py-1 font-serif text-3xl leading-tight text-dado-light transition-colors hover:text-dado-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dado-bg"
                              >
                                {item.labelKo}
                              </MenuNavAnchor>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  ) : mobileSubItem != null ? (
                    <motion.div
                      key="mobile-menu-sub"
                      variants={mobileStepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={mobileStepTransition}
                      className="absolute inset-0 flex min-h-0 w-full flex-col items-start justify-start overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuStep("root");
                          setMobileSelectedId(null);
                        }}
                        aria-label="이전 메뉴"
                        className="mb-2 flex min-h-11 w-full max-w-xs shrink-0 items-center gap-2 font-sans text-sm text-dado-light/75 transition-colors hover:text-dado-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dado-bg"
                      >
                        <MainMenuChevron className="shrink-0 rotate-180" />
                        뒤로
                      </button>
                      <h3 className="shrink-0 font-serif text-2xl leading-snug text-dado-light">
                        {mobileSubItem.labelKo}
                      </h3>
                      <div className="mt-3 min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <SubLinkList
                          menuId={mobileSubItem.id}
                          subs={mobileSubItem.sub}
                          onInternalNavigate={onInternalNavigate}
                          mobileCompact
                        />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Desktop: main column + sub panel */}
              <div className="hidden min-h-0 w-full flex-1 md:flex md:gap-x-16 md:gap-y-0 lg:gap-x-24">
                <ul className="flex w-full min-w-0 shrink-0 flex-col gap-1 md:max-w-[min(42vw,28rem)] md:gap-2 lg:max-w-[min(46vw,38rem)]">
                  {OVERLAY_MENU_ITEMS.map((item: MenuItem) => {
                    const isActive = effectiveActiveMenu === item.id;
                    const hasSubs = item.sub.length > 0;
                    const showChevron = hasSubs && isActive;
                    return (
                      <li key={item.id}>
                        <MenuNavAnchor
                          href={ROUTES[item.id]}
                          onInternalNavigate={onInternalNavigate}
                          onMouseEnter={() => handleMainHoverFocus(item.id)}
                          onFocus={() => handleMainHoverFocus(item.id)}
                          aria-haspopup={hasSubs ? "menu" : undefined}
                          className={`flex min-h-11 w-full items-center justify-between gap-4 py-2 text-left font-serif text-4xl leading-[1.08] transition-colors md:min-h-[3.25rem] md:py-3 md:text-5xl lg:min-h-14 lg:text-6xl ${
                            isActive
                              ? "text-dado-bg"
                              : "text-dado-light hover:text-dado-bg"
                          }`}
                        >
                          <span>{item.labelKo}</span>
                          {showChevron ? (
                            <MainMenuChevron className="shrink-0 text-dado-bg" />
                          ) : (
                            <span
                              className="pointer-events-none h-5 w-5 shrink-0"
                              aria-hidden
                            />
                          )}
                        </MenuNavAnchor>
                      </li>
                    );
                  })}
                </ul>

                <div
                  className="min-h-0 min-w-0 flex-1 overflow-hidden"
                  aria-live="polite"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {activeItem ? (
                      <motion.div
                        key={activeItem.id}
                        variants={subPanelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={subPanelTransition}
                        className="min-h-0"
                      >
                        {activeItem.sub.length > 0 ? (
                          <SubLinkList
                            menuId={activeItem.id}
                            subs={activeItem.sub}
                            onInternalNavigate={onInternalNavigate}
                          />
                        ) : null}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </nav>

            <div className="mt-auto flex w-full shrink-0 flex-col pt-8 text-xs leading-relaxed text-dado-light/55 md:flex-row md:items-end md:justify-between md:pt-10 md:text-sm md:text-dado-light/60">
              <span
                className="hidden min-h-0 flex-1 md:block"
                aria-hidden="true"
              />
              <div className="md:ml-auto md:text-right">
                <p>{CHURCH_INFO.address}</p>
                <p className="mt-1">{CHURCH_INFO.phone}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
