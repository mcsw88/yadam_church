export const EASE_PREMIUM = [0.25, 0.1, 0.25, 1] as const;
export const EASE_IMAGE_HOVER = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_OUT_LONG = [0.16, 1, 0.3, 1] as const;

export type CubicBezier = readonly [number, number, number, number];
