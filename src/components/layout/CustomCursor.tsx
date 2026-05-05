"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue } from "framer-motion";

import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const CURSOR_SIZE_PX = 20;
const CURSOR_HALF_PX = CURSOR_SIZE_PX / 2;
const HOVER_FINE_QUERY = "(hover: hover) and (pointer: fine)";
const ACTIVE_BODY_CLASS = "custom-cursor-active";

function subscribeHoverFine(onChange: () => void): () => void {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return () => {};
  }
  const mq = window.matchMedia(HOVER_FINE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getHoverFineSnapshot(): boolean {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }
  return window.matchMedia(HOVER_FINE_QUERY).matches;
}

function getHoverFineServerSnapshot(): boolean {
  return false;
}

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotionSafe();
  const hoverCapable = useSyncExternalStore(
    subscribeHoverFine,
    getHoverFineSnapshot,
    getHoverFineServerSnapshot,
  );

  const active = !isTouch && !reducedMotion && hoverCapable;

  // Motion values must be created on every render to satisfy the rules of hooks;
  // the early-return for the inactive case happens below.
  const x = useMotionValue(-CURSOR_SIZE_PX);
  const y = useMotionValue(-CURSOR_SIZE_PX);

  useEffect(() => {
    if (!active) return;
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX - CURSOR_HALF_PX);
      y.set(event.clientY - CURSOR_HALF_PX);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [active, x, y]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (active) {
      document.body.classList.add(ACTIVE_BODY_CLASS);
    } else {
      document.body.classList.remove(ACTIVE_BODY_CLASS);
    }
    return () => {
      document.body.classList.remove(ACTIVE_BODY_CLASS);
    };
  }, [active]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 h-5 w-5 rounded-full border border-white mix-blend-difference"
      style={{ x, y, zIndex: "var(--z-custom-cursor)" }}
    />
  );
}
