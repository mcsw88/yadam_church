import type { ChurchInfo } from '@/types/church';

export const CHURCH_INFO: ChurchInfo = {
  name: '안양예담교회',
  address: '경기도 안양시 동안구 관악대로 335 5층',
  phone: '031-425-9211',
  email: 'yongsuk9211@daum.net',
  tagline: {
    headline: '예배에서 회복으로,',
    subtext:
      '말씀과 기도로 한 영혼을 품고,\n하나님 앞에 다시 세워가는 안양예담교회입니다.',
  },
  locationNote:
    '관악대로 대로변에 위치하고 있으며, 관양중학교 정류장에서 도보 1분 거리입니다. 언제든 편안한 마음으로 방문해 주세요.',
  worship: [
    { name: '주일 1부 예배', time: '10:30 AM' },
    { name: '주일 2부 예배', time: '13:00 PM' },
  ],
};
