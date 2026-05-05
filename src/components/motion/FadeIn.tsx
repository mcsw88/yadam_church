'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { DURATION_MS } from '@/motion/durations';
import { TWEEN_FADE } from '@/motion/transitions';
import { VIEWPORT_DEFAULT } from '@/motion/viewport';
import { fadeInUp } from '@/motion/variants';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds (Framer Motion `transition.delay`). */
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const reducedMotion = useReducedMotionSafe();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEFAULT}
      transition={{
        ...TWEEN_FADE,
        duration: DURATION_MS.fade / 1000,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
