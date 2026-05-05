import type { MenuId } from '@/types/menu';

export type AnchorTarget =
  | { kind: 'fragment'; fragment: string }
  | { kind: 'query'; key: string; value: string };

export type AnchorEntry = AnchorTarget & { labelKo: string };

export const ANCHOR_MAP: Record<MenuId, Record<string, AnchorEntry>> = {
  home: {},
  about: {
    greeting: { kind: 'fragment', fragment: 'greeting', labelKo: '인사말' },
    vision: { kind: 'fragment', fragment: 'vision', labelKo: '비전 · 핵심가치' },
    leaders: { kind: 'fragment', fragment: 'leaders', labelKo: '섬기는 이들' },
  },
  ministries: {
    sunday: { kind: 'fragment', fragment: 'sunday', labelKo: '주일사역' },
    mission: { kind: 'fragment', fragment: 'mission', labelKo: '선교 · 봉사' },
  },
  news: {
    notices: { kind: 'query', key: 'tab', value: 'notices', labelKo: '공지사항' },
    events: { kind: 'query', key: 'tab', value: 'events', labelKo: '행사소식' },
    bulletins: { kind: 'query', key: 'tab', value: 'bulletins', labelKo: '온라인주보' },
  },
  gallery: {},
  contact: {},
};
