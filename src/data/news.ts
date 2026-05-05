import type { NewsDataMap } from '@/types/news';

import { BULLETINS } from './news/bulletins';
import { EVENTS } from './news/events';
import { NOTICES } from './news/notices';

export const NEWS_DATA: NewsDataMap = {
  notices: NOTICES,
  events: EVENTS,
  bulletins: BULLETINS,
};
