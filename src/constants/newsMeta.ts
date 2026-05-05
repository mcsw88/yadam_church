import type { NewsTabId } from './news';

export interface NewsTabMeta {
  desc: string;
  watermark: string;
  featuredImage: string;
}

export const NEWS_TAB_META: Record<NewsTabId, NewsTabMeta> = {
  notices: {
    desc: '교회의 새로운 소식과\n다양한 안내를 전해드립니다.',
    watermark: '"좋은 소식을 전하는 자들의 발이여"',
    featuredImage:
      'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  events: {
    desc: '함께 웃고 교제하며\n사랑을 나누는 공동체의 기록입니다.',
    watermark: '"축제와 기쁨의 공동체"',
    featuredImage:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  bulletins: {
    desc: '언제 어디서나 예배의 감격을\n이어가는 주간 순서지입니다.',
    watermark: '"영과 진리로 예배할지니라"',
    featuredImage:
      'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
};
