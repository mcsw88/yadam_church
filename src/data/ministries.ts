import {
  getMinistryPlaceholderAlt,
  getMinistryPlaceholderImageUrl,
} from '@/constants/ministryAssets';
import type { MinistryItem } from '@/types/ministries';

/** 각 항목의 `image` / `imageAlt`는 `@/constants/ministryAssets` 기준—실사진은 상수·본 파일 주석 TODO 따라 교체 */
export const MINISTRIES: MinistryItem[] = [
  {
    id: 'sunday-welcome',
    tagline: '환대의 첫걸음',
    title: '예배 안내 사역',
    description:
      '예배당을 찾는 모든 분들을 가장 먼저 맞이하는 사역입니다. 따뜻한 미소와 친절한 안내로 낯선 발걸음이 편안한 예배의 자리로 이어지도록 돕습니다.',
    image: getMinistryPlaceholderImageUrl('sunday-welcome'),
    imageAlt: getMinistryPlaceholderAlt('sunday-welcome'),
    category: 'sunday',
  },
  {
    id: 'sunday-jerusalem-choir',
    tagline: '영감 있는 찬양',
    title: '예루살렘 찬양대',
    description:
      '주일 예배의 찬양을 담당합니다. 기도로 준비된 찬양을 통해 회중들의 마음을 열고 하나님의 임재를 깊이 경험하도록 돕는 예배의 중요한 기둥입니다.',
    image: getMinistryPlaceholderImageUrl('sunday-jerusalem-choir'),
    imageAlt: getMinistryPlaceholderAlt('sunday-jerusalem-choir'),
    category: 'sunday',
  },
  {
    id: 'sunday-newcomers',
    tagline: '아름다운 정착',
    title: '새가족 섬김',
    description:
      '처음 오신 분들이 교회 공동체에 잘 정착할 수 있도록 새가족 교육과 친교를 담당합니다. 한 영혼이 온전한 성도로 세워지는 귀한 여정을 함께합니다.',
    image: getMinistryPlaceholderImageUrl('sunday-newcomers'),
    imageAlt: getMinistryPlaceholderAlt('sunday-newcomers'),
    category: 'sunday',
  },
  {
    id: 'mission-local-service',
    tagline: '이웃을 향한 사랑',
    title: '지역 사회 봉사',
    description:
      '안양 지역의 소외된 이웃을 돌보는 사역입니다. 정기적인 나눔과 봉사를 통해 그리스도의 사랑을 삶의 현장에서 실천하고 환대를 나눕니다.',
    image: getMinistryPlaceholderImageUrl('mission-local-service'),
    imageAlt: getMinistryPlaceholderAlt('mission-local-service'),
    category: 'mission',
  },
  {
    id: 'mission-overseas',
    tagline: '땅끝까지 전하는 복음',
    title: '해외 단기 선교',
    description:
      '매년 현지 선교사님과 협력하여 단기 선교팀을 파송합니다. 어린이 사역, 의료 봉사, 문화 교류 등을 진행하며 열방을 향한 하나님의 마음을 품습니다.',
    image: getMinistryPlaceholderImageUrl('mission-overseas'),
    imageAlt: getMinistryPlaceholderAlt('mission-overseas'),
    category: 'mission',
  },
];
