/**
 * Ministries 페이지용 **임시** 이미지 자산(원격 CDN).
 *
 * TODO: 실제 교회 사역 사진 확보 후 `public/images/ministries/` 에 두고,
 *       아래 URL을 `/images/ministries/<파일명>.webp` 형태로 교체한다.
 *       로컬 정적 파일만 쓰게 되면 `next.config` 의 `images.remotePatterns` 에서
 *       외부 호스트 항목을 제거해도 된다.
 */

/** 사역 항목 id → placeholder 원격 이미지 URL */
export const MINISTRY_PLACEHOLDER_IMAGE_URL_BY_ID: Record<string, string> = {
  'sunday-welcome':
    'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'sunday-jerusalem-choir':
    'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'sunday-newcomers':
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'mission-local-service':
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'mission-overseas':
    'https://images.unsplash.com/photo-1532372320572-cda25653a26d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
};

/**
 * 임시 접근성 텍스트. 실제 사진 교체 시 장면·인물에 맞게 함께 수정한다.
 * TODO: 로컬 이미지로 바꿀 때 이 문자열도 갱신.
 */
export const MINISTRY_PLACEHOLDER_ALT_BY_ID: Record<string, string> = {
  'sunday-welcome': '예배 안내 사역 이미지(임시)',
  'sunday-jerusalem-choir': '예루살렘 찬양대 사역 이미지(임시)',
  'sunday-newcomers': '새가족 섬김 사역 이미지(임시)',
  'mission-local-service': '지역 사회 봉사 사역 이미지(임시)',
  'mission-overseas': '해외 단기 선교 사역 이미지(임시)',
};

export function getMinistryPlaceholderImageUrl(id: string): string {
  const url = MINISTRY_PLACEHOLDER_IMAGE_URL_BY_ID[id];
  if (!url) {
    throw new Error(`Unknown ministry id for placeholder image: ${id}`);
  }
  return url;
}

export function getMinistryPlaceholderAlt(id: string): string {
  return MINISTRY_PLACEHOLDER_ALT_BY_ID[id] ?? `${id} 사역 이미지(임시)`;
}

// --- Section-level full-width hero placeholders (미니스트리 카드 맵과 별개) ---
// TODO: 교회 실제 현장 컷 확보 후 public 정적 파일 또는 CDN으로 교체하고 alt도 현장 설명으로 맞춘다.

/** 주일 예배 섹션 상단 전폭 히어로 — 예배/경건 분위기(카드용 `sunday-jerusalem-choir`와 동일 소스 재사용, 해상도만 확대). */
const SUNDAY_SECTION_HERO_TOP_URL =
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80';
/** 주일 예배 섹션 하단 선택 전폭 밴드 — 교제/연대 느낌(Unsplash 플레이스홀더). */
const SUNDAY_SECTION_HERO_BOTTOM_URL =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80';
/** 선교·봉사 섹션 상단 전폭 히어로 — 손 모으기/헌신 분위기(Unsplash 플레이스홀더). */
const MISSION_SECTION_HERO_TOP_URL =
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80';

/** TODO: 교회 대표 장면 설명으로 교체 */
const SUNDAY_SECTION_HERO_TOP_ALT =
  '예배 공간 실내(플레이스홀더, 카드 예루살렘 찬양대 소스 재사용)';
/** TODO: 교회 교제·연대 현장 설명으로 교체 */
const SUNDAY_SECTION_HERO_BOTTOM_ALT =
  '교우들이 함께하는 공동체 모습 플레이스홀더';
/** TODO: 교회 선교·봉사 현장 설명으로 교체 */
const MISSION_SECTION_HERO_TOP_ALT =
  '봉사·선교 헌신을 상징하는 손 모으기 플레이스홀더';

export function getSundaySectionHeroTopUrl(): string {
  return SUNDAY_SECTION_HERO_TOP_URL;
}

export function getSundaySectionHeroBottomUrl(): string {
  return SUNDAY_SECTION_HERO_BOTTOM_URL;
}

export function getMissionSectionHeroTopUrl(): string {
  return MISSION_SECTION_HERO_TOP_URL;
}

export function getSundaySectionHeroTopAlt(): string {
  return SUNDAY_SECTION_HERO_TOP_ALT;
}

export function getSundaySectionHeroBottomAlt(): string {
  return SUNDAY_SECTION_HERO_BOTTOM_ALT;
}

export function getMissionSectionHeroTopAlt(): string {
  return MISSION_SECTION_HERO_TOP_ALT;
}
