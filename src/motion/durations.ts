export const DURATION_MS = {
  fade: 1000,
  transition: 600,
  pageTransition: 1500,
  /** Menu nav transition: sum of overlay in + brand in/hold/out + overlay out (≈2.6s). */
  pageTransitionUi: 2600,
  cardMorph: 1500,
} as const;

/** `router.push` after backdrop is mostly opaque. */
export const PAGE_TRANSITION_PUSH_DELAY_MS = 950 as const;

/** Segment durations (ms). Sum = `PAGE_TRANSITION_TOTAL_MS` ≈ 2.6s visible sequence. */
export const PAGE_TRANSITION_OVERLAY_FADE_IN_MS = 250 as const;
export const PAGE_TRANSITION_BRAND_FADE_IN_MS = 900 as const;
export const PAGE_TRANSITION_BRAND_HOLD_MS = 300 as const;
export const PAGE_TRANSITION_BRAND_FADE_OUT_MS = 900 as const;
export const PAGE_TRANSITION_OVERLAY_FADE_OUT_MS = 250 as const;

export const PAGE_TRANSITION_TOTAL_MS =
  PAGE_TRANSITION_OVERLAY_FADE_IN_MS +
  PAGE_TRANSITION_BRAND_FADE_IN_MS +
  PAGE_TRANSITION_BRAND_HOLD_MS +
  PAGE_TRANSITION_BRAND_FADE_OUT_MS +
  PAGE_TRANSITION_OVERLAY_FADE_OUT_MS;

const T = PAGE_TRANSITION_TOTAL_MS;

/**
 * Backdrop: 0→1 (fade-in), hold at 1, 1→0 (fade-out only at end).
 * No opacity dip in the middle.
 */
export const PAGE_TRANSITION_OVERLAY_TIMES = [
  0,
  PAGE_TRANSITION_OVERLAY_FADE_IN_MS / T,
  (T - PAGE_TRANSITION_OVERLAY_FADE_OUT_MS) / T,
  1,
] as const;

/** Brand: fade-in → hold → fade-out within total timeline. */
export const PAGE_TRANSITION_BRAND_TEXT_TIMES = [
  0,
  PAGE_TRANSITION_BRAND_FADE_IN_MS / T,
  (PAGE_TRANSITION_BRAND_FADE_IN_MS + PAGE_TRANSITION_BRAND_HOLD_MS) / T,
  (PAGE_TRANSITION_BRAND_FADE_IN_MS +
    PAGE_TRANSITION_BRAND_HOLD_MS +
    PAGE_TRANSITION_BRAND_FADE_OUT_MS) /
    T,
] as const;

/** Default strength multiplier for `ParallaxImage` when `speed` is omitted. */
export const PARALLAX_DEFAULT_SPEED = 0.2 as const;

export type DurationKey = keyof typeof DURATION_MS;
