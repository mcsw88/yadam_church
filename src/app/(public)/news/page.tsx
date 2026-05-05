import type { Metadata } from 'next';

import { isNewsTabId } from '@/constants/news';
import { NewsTabsContainer } from '@/components/sections/news/NewsTabsContainer';
import {
  getPublishedNotices,
  getPublishedEvents,
  getPublishedBulletins,
} from '@/lib/supabase/queries';
import { mapNotice, mapEvent, mapBulletin } from '@/lib/admin/mapper';
import type { NewsTabId } from '@/types/news';

export const metadata: Metadata = {
  title: '교회소식 | 안양예담교회',
  description: '공지사항, 행사소식, 온라인 주보를 확인하세요.',
};

interface NewsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
}

function resolveInitialTab(rawTab: string | string[] | undefined): NewsTabId {
  if (Array.isArray(rawTab)) {
    return rawTab[0] && isNewsTabId(rawTab[0]) ? rawTab[0] : 'notices';
  }
  if (rawTab && isNewsTabId(rawTab)) return rawTab;
  return 'notices';
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const resolvedParams = await Promise.resolve(searchParams ?? {});
  const initialTab = resolveInitialTab(resolvedParams.tab);

  const [noticeRows, eventRows, bulletinRows] = await Promise.all([
    getPublishedNotices(),
    getPublishedEvents(),
    getPublishedBulletins(),
  ]);

  const newsData = {
    notices: noticeRows.map(mapNotice),
    events: eventRows.map(mapEvent),
    bulletins: bulletinRows.map(mapBulletin),
  };

  return <NewsTabsContainer initialTab={initialTab} newsData={newsData} />;
}
