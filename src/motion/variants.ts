/**
 * Warm charcoal `#2A2826` (dado-dark) — ministry variants avoid pure black `rgba(0,0,0,…)` in shadows.
 * Inline literals keep Framer-friendly values without coupling to Tailwind/CSS vars.
 */
const DADO_RGBA = {
  shadowOff: "rgba(42,40,38,0)",
  shadowSoft: "rgba(42,40,38,0.12)",
  shadowLift: "rgba(42,40,38,0.45)",
  borderSubtle: "rgba(42,40,38,0.09)",
} as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
} as const;

/** CTA 카드 전용(주일 다크 톤). `MinistryCtaCard`만 — 이미지 레이어와 분리. */
export const ministryCtaSunday = {
  rest: {
    x: 0,
    y: 0,
    //boxShadow: `0px 0px 0px ${DADO_RGBA.shadowOff}`,
    boxShadow: `0 0 0 0 rgba(42,40,38,0)`,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  hover: {
    x: 8,
    y: -10,
    //boxShadow: `0 18px 38px -14px ${DADO_RGBA.shadowLift}`,
    boxShadow: `0 22px 44px -14px rgba(0,0,0,0.55)`,
    //borderColor: "rgba(139,125,107,0.55)",
    borderColor: "rgba(139,125,107,0.95)",
    backgroundColor: "rgba(255,255,255,0.09)",
  },
  tap: { scale: 0.99 },
} as const;

/** CTA 카드 전용(선교·봉사 라이트 톤). `MinistryCtaCard`만 — 이미지 레이어와 분리. */
export const ministryCtaMission = {
  rest: {
    boxShadow: `0 4px 14px -6px ${DADO_RGBA.shadowSoft}`,
    borderColor: DADO_RGBA.borderSubtle,
    backgroundColor: "#ffffff",
  },
  hover: {
    y: -4,
    boxShadow: "0 22px 44px -18px rgba(139,125,107,0.28)",
    borderColor: "rgba(139,125,107,0.38)",
    backgroundColor: "#ffffff",
  },
  tap: { scale: 0.99 },
} as const;

/** 이미지 레이어 내부만 — `MinistryImageLayer` 전용. CTA와 variant 분리. */
export const ministryImageInner = {
  rest: { scale: 1 },
  hover: { scale: 1.06 },
} as const;

/**
 * Hero 이미지 전용 hover. 이미지 레이어(`ministryImageInner`)와 소유권 분리.
 */
export const ministrySectionHero = {
  rest: { scale: 1 },
  hover: { scale: 1.035 },
} as const;

export const popOutCard = {
  rest: {
    x: 0,
    y: 0,
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    borderColor: "rgba(255, 255, 255, 0)",
    backgroundColor: "#ffffff",
  },
  hover: {
    x: 10,
    y: -5,
    scale: 1,
    boxShadow: "0 20px 40px -15px rgba(139,125,107,0.3)",
    borderColor: "#E8E6E1",
    backgroundColor: "#ffffff",
  },
  tap: { scale: 0.98 },
} as const;

export const lineGrow = {
  rest: { width: 4, opacity: 0.3 },
  hover: { width: 8, opacity: 1 },
} as const;

export const iconReveal = {
  rest: {
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "rgba(229, 231, 235, 1)",
  },
  hover: {
    backgroundColor: "#F5F4F0",
    borderColor: "rgba(229, 231, 235, 1)",
  },
} as const;

export const slideRight = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
} as const;

export const slideLeft = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
  exit: { x: "-100%" },
} as const;
