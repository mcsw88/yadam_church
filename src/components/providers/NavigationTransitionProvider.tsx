'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import {
  PAGE_TRANSITION_BRAND_TEXT_TIMES,
  PAGE_TRANSITION_OVERLAY_FADE_IN_MS,
  PAGE_TRANSITION_OVERLAY_FADE_OUT_MS,
  PAGE_TRANSITION_OVERLAY_TIMES,
  PAGE_TRANSITION_PUSH_DELAY_MS,
  PAGE_TRANSITION_TOTAL_MS,
} from '@/motion/durations';
import { EASE_PREMIUM } from '@/motion/easings';

export function isInternalHref(href: string): boolean {
  const t = href.trim();
  return t.startsWith('/') && !t.startsWith('//');
}

type Destination = {
  pathname: string;
  search: string;
  hash: string;
};

function parseDestination(href: string): Destination {
  if (typeof window === 'undefined') {
    return { pathname: '', search: '', hash: '' };
  }
  const u = new URL(href, window.location.origin);
  return {
    pathname: u.pathname,
    search: u.search,
    hash: u.hash,
  };
}

function isArrived(target: Destination, pathname: string): boolean {
  if (typeof window === 'undefined') return false;
  if (pathname !== target.pathname) return false;
  if (target.search && window.location.search !== target.search) return false;
  if (target.hash && window.location.hash !== target.hash) return false;
  return true;
}

type NavigationTransitionContextValue = {
  beginNavigation: (href: string, onMenuClose?: () => void) => void;
};

const NavigationTransitionContext =
  createContext<NavigationTransitionContextValue | null>(null);

export function useNavigationTransition(): NavigationTransitionContextValue {
  const ctx = useContext(NavigationTransitionContext);
  if (!ctx) {
    throw new Error(
      'useNavigationTransition must be used within NavigationTransitionProvider',
    );
  }
  return ctx;
}

type NavigationTransitionProviderProps = {
  children: ReactNode;
};

/** Full-screen nav overlay (dark + centered church name). Visual parity with `PageTransition`. */
export function NavigationTransitionProvider({
  children,
}: NavigationTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotionSafe();
  const [showOverlay, setShowOverlay] = useState(false);
  const busyRef = useRef(false);
  const targetRef = useRef<Destination | null>(null);
  const pushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingMenuCloseRef = useRef<(() => void) | null>(null);

  const clearTimers = useCallback(() => {
    if (pushTimerRef.current != null) {
      clearTimeout(pushTimerRef.current);
      pushTimerRef.current = null;
    }
    if (endTimerRef.current != null) {
      clearTimeout(endTimerRef.current);
      endTimerRef.current = null;
    }
    if (menuCloseTimerRef.current != null) {
      clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }
  }, []);

  /** Run pending menu close immediately and cancel delayed close timer (early route arrival or teardown). */
  const flushMenuClose = useCallback(() => {
    if (menuCloseTimerRef.current != null) {
      clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }
    pendingMenuCloseRef.current?.();
    pendingMenuCloseRef.current = null;
  }, []);

  const finishTransition = useCallback(() => {
    flushMenuClose();
    clearTimers();
    setShowOverlay(false);
    busyRef.current = false;
    targetRef.current = null;
  }, [flushMenuClose, clearTimers]);

  const beginNavigation = useCallback(
    (href: string, onMenuClose?: () => void) => {
      if (busyRef.current) return;

      if (!isInternalHref(href)) {
        onMenuClose?.();
        if (typeof window !== 'undefined') {
          window.location.href = href;
        }
        return;
      }

      busyRef.current = true;
      targetRef.current = parseDestination(href);

      if (reducedMotion) {
        onMenuClose?.();
        try {
          router.push(href);
        } finally {
          queueMicrotask(() => {
            busyRef.current = false;
            targetRef.current = null;
          });
        }
        return;
      }

      pendingMenuCloseRef.current = onMenuClose ?? null;
      setShowOverlay(true);
      menuCloseTimerRef.current = setTimeout(() => {
        menuCloseTimerRef.current = null;
        pendingMenuCloseRef.current?.();
        pendingMenuCloseRef.current = null;
      }, PAGE_TRANSITION_OVERLAY_FADE_IN_MS);

      pushTimerRef.current = setTimeout(() => {
        pushTimerRef.current = null;
        try {
          router.push(href);
        } catch {
          finishTransition();
        }
      }, PAGE_TRANSITION_PUSH_DELAY_MS);

      endTimerRef.current = setTimeout(() => {
        endTimerRef.current = null;
        finishTransition();
      }, PAGE_TRANSITION_TOTAL_MS);
    },
    [router, reducedMotion, finishTransition],
  );

  const tryFinishIfArrived = useCallback(() => {
    if (!showOverlay) return;
    const target = targetRef.current;
    if (!target) return;
    if (isArrived(target, pathname)) {
      finishTransition();
    }
  }, [showOverlay, pathname, finishTransition]);

  useEffect(() => {
    tryFinishIfArrived();
  }, [tryFinishIfArrived]);

  useEffect(() => {
    if (!showOverlay || typeof window === 'undefined') return;
    const handler = () => {
      tryFinishIfArrived();
    };
    window.addEventListener('hashchange', handler);
    return () => {
      window.removeEventListener('hashchange', handler);
    };
  }, [showOverlay, tryFinishIfArrived]);

  useEffect(
    () => () => {
      flushMenuClose();
      clearTimers();
    },
    [flushMenuClose, clearTimers],
  );

  const durationSec = PAGE_TRANSITION_TOTAL_MS / 1000;

  const overlayBackdropTransition = useMemo(
    () => ({
      duration: durationSec,
      times: [...PAGE_TRANSITION_OVERLAY_TIMES] as number[],
      ease: EASE_PREMIUM,
    }),
    [durationSec],
  );

  const brandTextTransition = useMemo(
    () => ({
      duration: durationSec,
      times: [...PAGE_TRANSITION_BRAND_TEXT_TIMES] as number[],
      ease: EASE_PREMIUM,
    }),
    [durationSec],
  );

  const contextValue = useMemo(
    () => ({ beginNavigation }),
    [beginNavigation],
  );

  return (
    <NavigationTransitionContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {showOverlay && !reducedMotion ? (
          <motion.div
            key="nav-transition-overlay"
            aria-hidden
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 'var(--z-transition)' }}
            initial={{ opacity: 1, pointerEvents: 'auto' }}
            animate={{ opacity: 1, pointerEvents: 'auto' }}
            exit={{
              opacity: 0,
              pointerEvents: 'none',
              transition: {
                opacity: {
                  duration: PAGE_TRANSITION_OVERLAY_FADE_OUT_MS / 1000,
                  ease: EASE_PREMIUM,
                },
                pointerEvents: { duration: 0 },
              },
            }}
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-dado-dark"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={overlayBackdropTransition}
            />
            <motion.span
              className="relative z-10 font-serif text-2xl tracking-wide text-dado-bg md:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={brandTextTransition}
            >
              안양예담교회
            </motion.span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </NavigationTransitionContext.Provider>
  );
}
