export type MinistryCategory = 'sunday' | 'mission';

export interface MinistryItem {
  id: string;
  /** 카드 상단 소제목(원본 UI 라벨 위치) */
  tagline: string;
  title: string;
  description: string;
  /** 원본은 data/constants에서만 주입—임시 원격 URL 또는 추후 `/images/ministries/...` */
  image: string;
  /** img alt — 실제 사진 교체 시 함께 수정 */
  imageAlt: string;
  category: MinistryCategory;
}
