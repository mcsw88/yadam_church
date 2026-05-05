"use client";

//import { useEffect, useId } from "react";
//import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { DURATION_MS } from "@/motion/durations";
import { EASE_PREMIUM } from "@/motion/easings";
import { SPRING_SLIDEOVER } from "@/motion/transitions";
import { slideLeft, slideRight } from "@/motion/variants";

const REDUCED_PANEL_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const REDUCED_BACKDROP_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

export interface SlideOverProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}

export function SlideOver({
  open,
  onClose,
  title,
  description,
  children,
  side = "right",
  className = "",
}: SlideOverProps) {
  const panelRef = useFocusTrap<HTMLElement>(open);
  const reducedMotion = useReducedMotionSafe();
  useLockBodyScroll(open);

  const baseId = useId();
  const titleId = title ? `${baseId}-title` : `${baseId}-fallback-title`;
  const descriptionId = description ? `${baseId}-description` : undefined;

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

  const panelVariants = reducedMotion
    ? REDUCED_PANEL_VARIANTS
    : side === "left"
      ? slideLeft
      : slideRight;
  const panelTransition = reducedMotion ? { duration: 0 } : SPRING_SLIDEOVER;
  const backdropTransition = reducedMotion
    ? { duration: 0 }
    : { duration: DURATION_MS.transition / 1000, ease: EASE_PREMIUM };

  if (typeof document === "undefined") return null;

  //
  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            key="slide-over-backdrop"
            type="button"
            aria-label="닫기"
            tabIndex={-1}
            variants={REDUCED_BACKDROP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={backdropTransition}
            className="pointer-events-auto fixed inset-0 cursor-default bg-black/35"
            //style={{ zIndex: 'var(--z-overlay)' }}
            style={{ zIndex: 9998 }}
            onClick={onClose}
          />
          <motion.aside
            ref={panelRef}
            key="slide-over-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={panelTransition}
            data-side={side}
            className={`pointer-events-auto fixed inset-y-0 flex max-h-full w-full max-w-[min(100vw,33rem)] flex-col bg-[var(--color-dado-bg)] text-[var(--color-dado-dark)] shadow-lg ${
              side === "left" ? "left-0" : "right-0"
            } ${className}`.trim()}
            //style={{ zIndex: "var(--z-modal)" }}
            style={{ zIndex: 9999 }}
          >
            <h2 id={titleId} className="sr-only">
              {title ?? "패널"}
            </h2>

            {description ? (
              <p id={descriptionId} className="sr-only">
                {description}
              </p>
            ) : null}

            <button
              type="button"
              onClick={onClose}
              aria-label="패널 닫기"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white font-sans text-2xl leading-none text-[var(--color-dado-dark)] shadow-sm transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dado-accent)] md:right-8 md:top-8"
            >
              ×
            </button>
            <div className="min-h-0 flex-1 overflow-y-auto px-8 pb-14 pt-28 md:px-12 md:pb-16 md:pt-32">
              {children}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
