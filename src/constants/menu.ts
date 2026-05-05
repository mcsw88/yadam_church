import type { MenuItem } from '@/types/menu';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'home',
    labelKo: '홈',
    labelEn: 'Home',
    sub: [],
  },
  {
    id: 'about',
    labelKo: '교회소개',
    labelEn: 'About',
    sub: [
      { id: 'greeting', labelKo: '인사말' },
      { id: 'vision', labelKo: '비전 · 핵심가치' },
      { id: 'leaders', labelKo: '섬기는 이들' },
    ],
  },
  {
    id: 'ministries',
    labelKo: '사역소개',
    labelEn: 'Ministries',
    sub: [
      { id: 'sunday', labelKo: '주일사역' },
      { id: 'mission', labelKo: '선교 · 봉사' },
    ],
  },
  {
    id: 'news',
    labelKo: '교회소식',
    labelEn: 'News',
    sub: [
      { id: 'notices', labelKo: '공지사항' },
      { id: 'events', labelKo: '행사소식' },
      { id: 'bulletins', labelKo: '온라인주보' },
    ],
  },
  {
    id: 'gallery',
    labelKo: '갤러리',
    labelEn: 'Gallery',
    sub: [],
  },
  {
    id: 'contact',
    labelKo: '문의하기',
    labelEn: 'Contact',
    sub: [],
  },
];
