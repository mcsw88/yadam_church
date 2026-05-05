"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { BulletinBody } from "@/components/cards/slide-over-bodies/BulletinBody";
import { EventBody } from "@/components/cards/slide-over-bodies/EventBody";
import { NoticeBody } from "@/components/cards/slide-over-bodies/NoticeBody";
import { SlideOver } from "@/components/interaction/SlideOver";
import { FadeIn } from "@/components/motion/FadeIn";
import { NewsList } from "@/components/sections/news/NewsList";
import { NEWS_TAB_LABELS, NEWS_TABS, isNewsTabId } from "@/constants/news";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { parseDate } from "@/lib/parseDate";
import { SPRING_TAB } from "@/motion/transitions";
import type { NewsDataMap, NewsItem, NewsTabId } from "@/types/news";

interface NewsTabsContainerProps {
  initialTab: NewsTabId;
  newsData: NewsDataMap;
}

const INITIAL_VISIBLE_COUNT: Record<NewsTabId, number> = {
  notices: 5,
  events: 4,
  bulletins: 5,
};

function formatNewsDate(input: string): string {
  const parsed = parseDate(input);
  if (!parsed) return input;
  const mm = String(parsed.month).padStart(2, "0");
  const dd = String(parsed.day).padStart(2, "0");
  return `${parsed.year}. ${mm}. ${dd}`;
}

export function NewsTabsContainer({ initialTab, newsData }: NewsTabsContainerProps) {
  const formattedNewsData: NewsDataMap = useMemo(() => ({
    notices: newsData.notices.map((item) => ({
      ...item,
      date: formatNewsDate(item.date),
    })),
    events: newsData.events.map((item) => ({
      ...item,
      date: formatNewsDate(item.date),
    })),
    bulletins: newsData.bulletins.map((item) => ({
      ...item,
      date: formatNewsDate(item.date),
    })),
  }), [newsData]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reducedMotion = useReducedMotionSafe();
  const listId = useId();
  const arrowNavRef = useRef(false);

  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [visibleCounts, setVisibleCounts] = useState(INITIAL_VISIBLE_COUNT);

  const activeTab = useMemo<NewsTabId>(() => {
    const rawTab = searchParams.get("tab");
    return rawTab && isNewsTabId(rawTab) ? rawTab : initialTab;
  }, [initialTab, searchParams]);

  const tabButtonId = useCallback(
    (tabId: string) => `${listId}-news-tab-${tabId}`,
    [listId],
  );

  const handleTabChange = (nextTabId: string) => {
    if (!isNewsTabId(nextTabId)) return;
    setSelectedItem(null);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", nextTabId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (!arrowNavRef.current) return;
    arrowNavRef.current = false;
    const el = document.getElementById(tabButtonId(activeTab));
    el?.focus({ preventScroll: true });
  }, [activeTab, tabButtonId]);

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const currentIndex = NEWS_TABS.indexOf(activeTab);
    switch (event.key) {
      case "ArrowRight": {
        event.preventDefault();
        arrowNavRef.current = true;
        const next = (currentIndex + 1) % NEWS_TABS.length;
        handleTabChange(NEWS_TABS[next]);
        break;
      }
      case "ArrowLeft": {
        event.preventDefault();
        arrowNavRef.current = true;
        const prev = (currentIndex - 1 + NEWS_TABS.length) % NEWS_TABS.length;
        handleTabChange(NEWS_TABS[prev]);
        break;
      }
      case "Home": {
        event.preventDefault();
        arrowNavRef.current = true;
        handleTabChange(NEWS_TABS[0]);
        break;
      }
      case "End": {
        event.preventDefault();
        arrowNavRef.current = true;
        handleTabChange(NEWS_TABS[NEWS_TABS.length - 1]);
        break;
      }
      default:
        break;
    }
  };

  const currentData = formattedNewsData[activeTab];
  const visibleCount = visibleCounts[activeTab];
  const visibleItems = currentData.slice(0, visibleCount);
  const hasMore = currentData.length > visibleCount;

  const handleLoadMore = () => {
    const addCount = activeTab === "events" ? 4 : 5;
    setVisibleCounts((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] + addCount,
    }));
  };

  const slideOverTitle =
    selectedItem?.kind === "bulletin"
      ? "온라인 주보"
      : selectedItem?.kind === "event"
        ? "행사소식"
        : "공지사항";

  const renderDetailBody = () => {
    if (!selectedItem) return null;
    if (selectedItem.kind === "event") {
      return <EventBody item={selectedItem} />;
    }
    if (selectedItem.kind === "bulletin") {
      return <BulletinBody item={selectedItem} />;
    }
    return <NoticeBody item={selectedItem} />;
  };

  return (
    <main className="min-h-screen bg-[var(--color-dado-bg)] pb-28">
      <SlideOver
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title={slideOverTitle}
        side="right"
      >
        {renderDetailBody()}
      </SlideOver>

      {/* P2 #9: 히어로 하단 여백 확대 */}
      {/*<section className="px-6 pb-16 pt-48 md:px-24 md:pb-24 md:pt-56">*/}
      <section className="px-6 pb-24 pt-48 md:px-24 md:pb-40 md:pt-62">
        <FadeIn className="max-w-4xl">
          {/*<h1 className="mb-6 font-serif text-6xl italic tracking-wide text-dado-dark md:text-8xl">*/}
          <h1 className="mb-12 font-serif text-7xl italic text-dado-dark md:text-9xl">
            교회소식
          </h1>
          <p className="font-sans text-base text-dado-dark/70 md:text-xl">
            안양예담교회의 따뜻한 소식과 일상을 나눕니다
          </p>
        </FadeIn>
      </section>

      {/* P0 #1: serif italic 텍스트 탭 + 짧은 굵은 underline + 풀폭 헤어라인 */}
      <section className="px-6 pb-12 md:px-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="relative">
            <div
              role="tablist"
              className="flex items-end gap-6 overflow-x-auto md:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onKeyDown={handleTabKeyDown}
            >
              {NEWS_TABS.map((tabId) => {
                const selected = tabId === activeTab;
                return (
                  <button
                    key={tabId}
                    id={tabButtonId(tabId)}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    tabIndex={selected ? 0 : -1}
                    className={`relative whitespace-nowrap pb-3 font-serif text-lg italic tracking-wide transition-colors md:text-xl ${
                      selected
                        ? "text-[var(--color-dado-dark)]"
                        : "text-[color-mix(in_srgb,var(--color-dado-dark)_40%,transparent)] hover:text-[color-mix(in_srgb,var(--color-dado-dark)_65%,transparent)]"
                    }`}
                    onClick={() => handleTabChange(tabId)}
                  >
                    {NEWS_TAB_LABELS[tabId]}
                    {selected &&
                      (!reducedMotion ? (
                        <motion.span
                          layoutId="news-tab-underline"
                          className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--color-dado-dark)]"
                          transition={SPRING_TAB}
                        />
                      ) : (
                        <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--color-dado-dark)]" />
                      ))}
                  </button>
                );
              })}
            </div>
            <span
              className="absolute bottom-0 left-0 right-0 h-px bg-[color-mix(in_srgb,var(--color-dado-dark)_15%,transparent)]"
              aria-hidden
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-24">
        <div className="mx-auto max-w-screen-2xl">
          <NewsList
            key={activeTab}
            tab={activeTab}
            items={visibleItems}
            onSelect={setSelectedItem}
          />
          {/* P0 #4: pill 형태 더보기 버튼 */}
          {hasMore && (
            <div className="flex justify-center pt-14">
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2.5 rounded-full border border-[color-mix(in_srgb,var(--color-dado-dark)_20%,transparent)] bg-transparent px-7 py-3 font-sans text-sm tracking-wide text-[var(--color-dado-dark)] transition-colors hover:border-[color-mix(in_srgb,var(--color-dado-dark)_45%,transparent)] hover:text-[color-mix(in_srgb,var(--color-dado-dark)_85%,transparent)]"
              >
                과거의 소식 마주하기
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
