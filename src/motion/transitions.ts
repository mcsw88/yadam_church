import { EASE_PREMIUM } from './easings';

export const SPRING_SLIDEOVER = {
  type: 'spring',
  damping: 25,
  stiffness: 200,
} as const;

export const SPRING_CARD = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
} as const;

/** Ministry 이미지 레이어 내부 줌(`ministryImageInner`, `ministrySectionHero`) */
export const SPRING_MINISTRY_IMAGE = {
  type: 'spring',
  stiffness: 280,
  damping: 28,
} as const;

/** Ministry 섹션 히어로 전용 부드러운 hover tween */
export const TWEEN_MINISTRY_SECTION_HERO = {
  duration: 0.55,
  ease: EASE_PREMIUM,
} as const;

export const SPRING_TAB = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const;

export const TWEEN_FADE = {
  duration: 1,
  ease: EASE_PREMIUM,
} as const;
