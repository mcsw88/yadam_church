import type { NewsTabId } from '@/types/news';
export type { NewsTabId } from '@/types/news';

export const NEWS_TABS: NewsTabId[] = ['notices', 'events', 'bulletins'];

export const NEWS_TAB_LABELS: Record<NewsTabId, string> = {
  notices: '공지사항',
  events: '행사소식',
  bulletins: '온라인 주보',
};

export function isNewsTabId(value: string): value is NewsTabId {
  return NEWS_TABS.includes(value as NewsTabId);
}
