import { GALLERY_YEARS } from '@/constants/gallery';
import type { GalleryItem } from '@/types/gallery';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-fall-music-night',
    date: '2026. 10. 25',
    title: '가을 음악회 "성소에 울리는 찬양"',
    image:
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    comment: '아름다운 선율로 영광 돌리는 시간이었습니다.',
    batch_id: null,
    sort_order: 0,
  },
  {
    id: 'gallery-fall-sports-day',
    date: '2026. 09. 10',
    title: '전교인 가을 체육대회',
    image:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    comment: '모든 성도가 하나되는 기쁨의 축제.',
    batch_id: null,
    sort_order: 1,
  },
  {
    id: 'gallery-summer-mission-sendoff',
    date: '2026. 07. 15',
    title: '여름 단기선교 파송식',
    image:
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    comment: '열방을 향한 발걸음을 축복합니다.',
    batch_id: null,
    sort_order: 2,
  },
  {
    id: 'gallery-easter-choir',
    date: '2026. 04. 12',
    title: '부활절 연합 예배 성가대',
    image:
      'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    comment: '생명의 주님을 찬양합니다.',
    batch_id: null,
    sort_order: 3,
  },
  {
    id: 'gallery-spring-neighbor-feast',
    date: '2026. 03. 20',
    title: '봄맞이 이웃 초청 잔치',
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    comment: '그리스도의 향기를 이웃과 함께.',
    batch_id: null,
    sort_order: 4,
  },
  {
    id: 'gallery-christmas-cantata',
    date: '2025. 12. 25',
    title: '성탄절 칸타타',
    image:
      'https://images.unsplash.com/photo-1543332143-4e8c27e32a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    comment: '아기 예수님의 탄생을 축하합니다.',
    batch_id: null,
    sort_order: 0,
  },
  {
    id: 'gallery-thanksgiving-fruit-share',
    date: '2025. 11. 17',
    title: '추수감사절 과일 나눔',
    image:
      'https://images.unsplash.com/photo-1506484381205-f7945653044d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    comment: '감사의 열매를 이웃과 나눕니다.',
    batch_id: null,
    sort_order: 1,
  },
];

export function getGalleryByYear(year: number): GalleryItem[] {
  return GALLERY_ITEMS.filter((item) => parseInt(item.date.slice(0, 4), 10) === year);
}

export function resolveGalleryYear(
  rawYear: string | string[] | undefined,
): number {
  const fallbackYear = GALLERY_YEARS[0];

  const value = Array.isArray(rawYear) ? rawYear[0] : rawYear;
  if (!value) return fallbackYear;

  const parsedYear = Number(value);
  if (Number.isNaN(parsedYear)) return fallbackYear;

  return GALLERY_YEARS.includes(parsedYear as (typeof GALLERY_YEARS)[number])
    ? parsedYear
    : fallbackYear;
}
