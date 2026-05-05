"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { PARALLAX_DEFAULT_SPEED } from "@/motion/durations";

/** Base percentage movement per unit of speed (speed × BASE_PCT_PER_SPEED = y%). */
const BASE_PCT_PER_SPEED = 20;

/** Default cap for absolute Y shift as percentage of container height. */
const DEFAULT_MAX_OFFSET_PCT = 4;

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  /**
   * Transform strength multiplier (e.g. `0.2` → 4% y shift).
   * Use `0` to disable parallax.
   */
  speed?: number;
  /**
   * Cap absolute Y shift as percentage of container height (default 4).
   * Example: `maxOffset={6}` allows up to 6% shift.
   */
  maxOffset?: number;
};

export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  speed: speedProp,
  maxOffset: maxOffsetProp,
}: ParallaxImageProps) {
  const reducedMotion = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const speed = speedProp ?? PARALLAX_DEFAULT_SPEED;
  const maxOffset = maxOffsetProp ?? DEFAULT_MAX_OFFSET_PCT;
  const yPct = Math.min(Math.abs(speed) * BASE_PCT_PER_SPEED, maxOffset);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${yPct}%`, `${yPct}%`]);

  const innerClass = "absolute inset-x-0 h-[130%] -top-[15%]"; //h-[116%] -top-[8%]

  if (reducedMotion || yPct === 0) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
        <div className={innerClass}>
          <img src={src} alt={alt} className={imageClassName} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div className={innerClass} style={{ y }}>
        <img src={src} alt={alt} className={imageClassName} />
      </motion.div>
    </div>
  );
}
