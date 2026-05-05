"use client";

import { motion } from "framer-motion";

import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { SPRING_CARD } from "@/motion/transitions";
import { ministryCtaMission, ministryCtaSunday } from "@/motion/variants";

export type MinistryCtaTone = "sunday" | "mission";

type MinistryCtaCardProps = {
  tagline: string;
  title: string;
  tone: MinistryCtaTone;
  onActivate: () => void;
  isExpanded: boolean;
};

/**
 * CTA 전용 카드(이미지 없음). hover variant는 `ministryCtaSunday` | `ministryCtaMission` 만 사용.
 */
export function MinistryCtaCard({
  tagline,
  title,
  tone,
  onActivate,
  isExpanded,
}: MinistryCtaCardProps) {
  const reducedMotion = useReducedMotionSafe();
  const variants = tone === "sunday" ? ministryCtaSunday : ministryCtaMission;

  const tagCls =
    tone === "sunday"
      ? "text-[color-mix(in_srgb,var(--color-dado-bg)_65%,transparent)]"
      : "text-[color-mix(in_srgb,var(--color-dado-dark)_58%,transparent)]";
  const titleCls =
    tone === "sunday"
      ? "text-[color:var(--color-dado-bg)] transition-colors duration-500 group-hover:text-[color-mix(in_srgb,var(--color-dado-accent)_85%,var(--color-dado-bg))]"
      : "text-[color:var(--color-dado-dark)]";

  const barCls =
    tone === "sunday"
      ? "bg-[color:var(--color-dado-accent)]"
      : "bg-[color-mix(in_srgb,var(--color-dado-dark)_42%,transparent)]";

  const arrowRing =
    tone === "sunday"
      ? "border-[color-mix(in_srgb,var(--color-dado-bg)_28%,transparent)] text-[color-mix(in_srgb,var(--color-dado-bg)_95%,transparent)]"
      : "border-[color-mix(in_srgb,var(--color-dado-dark)_15%,transparent)] text-[color:var(--color-dado-dark)]";

  const cardToneCls =
    tone === "sunday"
      ? //? "border-[color-mix(in_srgb,var(--color-dado-bg)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-dado-bg)_7%,transparent)] hover:-translate-y-1 hover:shadow-[0_22px_40px_-24px_rgba(17,24,39,0.56)]"
        //: "border-[color-mix(in_srgb,var(--color-dado-dark)_12%,transparent)] bg-white hover:-translate-y-[2px] hover:shadow-[0_16px_30px_-22px_rgba(17,24,39,0.38)]";
        "border-[color-mix(in_srgb,var(--color-dado-bg)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-dado-bg)_7%,transparent)]"
      : "border-[color-mix(in_srgb,var(--color-dado-dark)_12%,transparent)] bg-white hover:-translate-y-[2px]";

  const rowLayoutCls =
    tone === "sunday"
      ? "min-h-[6.75rem] gap-5 px-6 py-5 md:min-h-[10rem] md:px-10"
      : "min-h-[6.75rem] gap-5 px-6 py-5 md:min-h-[10rem] md:px-10";

  const titleSizeCls =
    tone === "sunday"
      ? "text-[1.35rem] md:text-[1.5rem]"
      : "text-[1.35rem] md:text-[1.5rem]";
  const taglineSizeCls =
    tone === "sunday" ? "text-[0.82rem]" : "text-[0.82rem]";
  const arrowSizeCls =
    tone === "sunday" ? "h-11 w-11 text-base" : "h-11 w-11 text-base";

  const inner = (
    <>
      <span
        className={`pointer-events-none absolute left-0 top-0 z-10 h-full ${
          tone === "sunday"
            ? "w-[4px] group-hover:w-2 group-focus-visible:w-2" //? "w-1"
            : "w-[4px] group-hover:w-2 group-focus-visible:w-2" //? "w-1"
        } ${barCls} opacity-30 transition-[opacity,width] duration-400 group-hover:opacity-100 group-focus-visible:opacity-100`}
        aria-hidden
      />
      <div
        className={`relative flex items-center justify-between text-left ${rowLayoutCls}`}
      >
        <div className="min-w-0 space-y-1">
          <p className={`font-sans tracking-wide ${taglineSizeCls} ${tagCls}`}>
            {tagline}
          </p>
          <h3
            className={`font-serif tracking-wide ${titleSizeCls} ${titleCls}`}
          >
            {title}
          </h3>
        </div>
        <span
          className={`flex shrink-0 items-center justify-center rounded-full border ${arrowSizeCls} ${arrowRing}`}
          aria-hidden
        >
          →
        </span>
      </div>
    </>
  );

  const focusCls =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-dado-accent)]";

  if (reducedMotion) {
    return (
      <button
        type="button"
        className={`group relative w-full overflow-hidden rounded-sm border text-left transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out ${focusCls} ${cardToneCls} ${
          tone === "sunday"
            ? "hover:bg-[color-mix(in_srgb,var(--color-dado-bg)_10%,transparent)]"
            : "hover:bg-[color-mix(in_srgb,var(--color-dado-dark)_3%,white)]"
        }`}
        onClick={onActivate}
        aria-expanded={isExpanded}
        aria-haspopup="dialog"
      >
        {inner}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      variants={variants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={SPRING_CARD}
      className={`group relative w-full overflow-hidden rounded-[0.85rem] border text-left transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out ${focusCls} ${cardToneCls}`}
      onClick={onActivate}
      aria-expanded={isExpanded}
      aria-haspopup="dialog"
    >
      {inner}
    </motion.button>
  );
}
