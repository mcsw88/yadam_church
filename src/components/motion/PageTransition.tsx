'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import {
  PAGE_TRANSITION_BRAND_TEXT_TIMES,
  PAGE_TRANSITION_OVERLAY_TIMES,
  PAGE_TRANSITION_TOTAL_MS,
} from '@/motion/durations';
import { EASE_PREMIUM } from '@/motion/easings';

type PageTransitionProps = {
  children: ReactNode;
};

/** Route pulse overlay; menu-driven transitions use `NavigationTransitionProvider` (visual parity: dark layer + centered church name, `PAGE_TRANSITION_TOTAL_MS`). */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotionSafe();

  if (reducedMotion) {
    return children;
  }

  const durationSec = PAGE_TRANSITION_TOTAL_MS / 1000;

  const sharedTransition = {
    duration: durationSec,
    ease: EASE_PREMIUM,
  };

  return (
    <>
      {children}
      <motion.div
        key={pathname}
        aria-hidden
        className="pointer-events-none fixed inset-0 flex items-center justify-center"
        style={{ zIndex: 'var(--z-transition)' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-dado-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            ...sharedTransition,
            times: [...PAGE_TRANSITION_OVERLAY_TIMES],
          }}
        />
        <motion.span
          className="relative z-10 font-serif text-2xl tracking-wide text-dado-bg md:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            ...sharedTransition,
            times: [...PAGE_TRANSITION_BRAND_TEXT_TIMES],
          }}
        >
          안양예담교회
        </motion.span>
      </motion.div>
    </>
  );
}
