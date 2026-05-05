'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { HEADER_HEIGHT_PX } from '@/constants/ui';

export type HeaderTheme = 'dark' | 'light';

const OVERLAY_MENU_ID = 'overlay-menu';

/** Skip fullscreen overlay menu — it uses data-theme for visuals but must not drive header contrast. */
function isExcludedFromHeaderThemeScan(el: HTMLElement): boolean {
  if (el.id === OVERLAY_MENU_ID) return true;
  return el.closest(`#${OVERLAY_MENU_ID}`) != null;
}

export function useHeaderTheme(): HeaderTheme {
  const pathname = usePathname();
  const [theme, setTheme] = useState<HeaderTheme>('light');

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    let scrollRafId: number | null = null;
    let routeRafId: number | null = null;

    const compute = (): void => {
      const sections = document.querySelectorAll<HTMLElement>('[data-theme="dark"]');
      let isOverDark = false;

      for (const section of sections) {
        if (isExcludedFromHeaderThemeScan(section)) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= HEADER_HEIGHT_PX && rect.bottom >= 0) {
          isOverDark = true;
          break;
        }
      }

      setTheme(isOverDark ? 'dark' : 'light');
    };

    const scheduleScrollCompute = (): void => {
      if (scrollRafId !== null) return;
      scrollRafId = window.requestAnimationFrame(() => {
        scrollRafId = null;
        compute();
      });
    };

    /** After route or hash change: sync once, then once more after layout/paint. */
    const scheduleRouteCompute = (): void => {
      compute();
      if (routeRafId !== null) {
        window.cancelAnimationFrame(routeRafId);
        routeRafId = null;
      }
      routeRafId = window.requestAnimationFrame(() => {
        routeRafId = null;
        compute();
      });
    };

    scheduleRouteCompute();

    window.addEventListener('scroll', scheduleScrollCompute, { passive: true });
    window.addEventListener('resize', scheduleScrollCompute);
    window.addEventListener('hashchange', scheduleRouteCompute);
    window.addEventListener('popstate', scheduleRouteCompute);

    return () => {
      window.removeEventListener('scroll', scheduleScrollCompute);
      window.removeEventListener('resize', scheduleScrollCompute);
      window.removeEventListener('hashchange', scheduleRouteCompute);
      window.removeEventListener('popstate', scheduleRouteCompute);
      if (scrollRafId !== null) {
        window.cancelAnimationFrame(scrollRafId);
      }
      if (routeRafId !== null) {
        window.cancelAnimationFrame(routeRafId);
      }
    };
  }, [pathname]);

  return theme;
}
