"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { BulletinCard } from "@/components/cards/BulletinCard";
import { EventCard } from "@/components/cards/EventCard";
import { NoticeCard } from "@/components/cards/NoticeCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import type {
  Bulletin,
  NewsEvent,
  NewsItem,
  NewsTabId,
  Notice,
} from "@/types/news";

interface NewsListProps {
  tab: NewsTabId;
  items: NewsItem[];
  onSelect: (item: NewsItem) => void;
}

const NEWS_PANEL_META: Record<
  NewsTabId,
  {
    heading: string;
    description: string;
    watermark: string;
  }
> = {
  notices: {
    heading: "공지사항",
    description: "교회의 새로운 소식과\n다양한 안내를 전해드립니다.",
    watermark: "좋은 소식을 전하는 자들의 발이여",
  },
  events: {
    heading: "행사소식",
    description: "함께 웃고 교제하며\n사랑을 나누는 공동체의 기록입니다.",
    watermark: "축제와 기쁨의 공동체",
  },
  bulletins: {
    heading: "주보",
    description: "언제 어디서나 예배의 감격을\n이어가는 주간 순서지입니다.",
    watermark: "영과 진리로 예배할지니라",
  },
};

const TOP_GUARD_PX = 32;
const BOTTOM_GUARD_PX = 72;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function NewsList({ tab, items, onSelect }: NewsListProps) {
  const reducedMotion = useReducedMotionSafe();
  const [canFollowText, setCanFollowText] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const leftTextRef = useRef<HTMLDivElement | null>(null);

  const rawLeftTextY = useMotionValue(TOP_GUARD_PX);
  const smoothLeftTextY = useSpring(rawLeftTextY, {
    stiffness: 45,
    damping: 24,
    mass: 1.1,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateCanFollowText = () => {
      const nextCanFollow = mediaQuery.matches;
      setCanFollowText(nextCanFollow);
      rawLeftTextY.set(nextCanFollow ? TOP_GUARD_PX : 0);
    };

    updateCanFollowText();

    mediaQuery.addEventListener("change", updateCanFollowText);

    return () => {
      mediaQuery.removeEventListener("change", updateCanFollowText);
    };
  }, [rawLeftTextY]);

  useEffect(() => {
    if (!canFollowText || reducedMotion) {
      rawLeftTextY.set(0);
      return;
    }

    const section = sectionRef.current;
    const leftText = leftTextRef.current;

    if (!section || !leftText) return;

    let travelY = 0;
    let frameId: number | null = null;

    const updateScrollPosition = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const totalDistance = viewportHeight + rect.height;
      const progress = clamp((viewportHeight - rect.top) / totalDistance, 0, 1);

      rawLeftTextY.set(TOP_GUARD_PX + travelY * progress);
    };

    const requestUpdateScrollPosition = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateScrollPosition();
      });
    };

    const updateTravel = () => {
      const sectionHeight = section.offsetHeight;
      const textHeight = leftText.offsetHeight;

      travelY = Math.max(
        0,
        sectionHeight - textHeight - TOP_GUARD_PX - BOTTOM_GUARD_PX,
      );

      requestUpdateScrollPosition();
    };

    updateTravel();

    const observer = new ResizeObserver(updateTravel);
    observer.observe(section);
    observer.observe(leftText);

    window.addEventListener("scroll", requestUpdateScrollPosition, {
      passive: true,
    });
    window.addEventListener("resize", updateTravel);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      observer.disconnect();
      window.removeEventListener("scroll", requestUpdateScrollPosition);
      window.removeEventListener("resize", updateTravel);
    };
  }, [canFollowText, items.length, rawLeftTextY, reducedMotion, tab]);

  if (items.length === 0) {
    return (
      <EmptyState
        title="등록된 소식이 없습니다."
        description="다음 소식이 준비되는 대로 이곳에 업데이트됩니다."
      />
    );
  }

  const meta = NEWS_PANEL_META[tab];

  const renderCards = () => {
    if (tab === "events") {
      const eventItems = items.filter(
        (item): item is NewsEvent => item.kind === "event",
      );

      return (
        <div className="grid grid-cols-1 gap-11 md:grid-cols-2">
          {eventItems.map((item) => (
            <EventCard key={item.id} item={item} onClick={onSelect} />
          ))}
        </div>
      );
    }

    if (tab === "bulletins") {
      const bulletinItems = items.filter(
        (item): item is Bulletin => item.kind === "bulletin",
      );

      return (
        <div className="flex flex-col gap-5">
          {bulletinItems.map((item) => (
            <BulletinCard key={item.id} item={item} onClick={onSelect} />
          ))}
        </div>
      );
    }

    const noticeItems = items.filter(
      (item): item is Notice => item.kind === "notice",
    );

    return (
      <div className="flex flex-col gap-5">
        {noticeItems.map((item) => (
          <NoticeCard key={item.id} item={item} onClick={onSelect} />
        ))}
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="relative">
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        aria-hidden
      >
        <p
          className="mt-8 font-serif italic leading-[0.9] text-[var(--color-dado-dark)]"
          style={{ fontSize: "clamp(5rem, 14vw, 11rem)", opacity: 0.035 }}
        >
          {meta.watermark}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[28%_68%] lg:gap-x-[4%] lg:gap-y-0">
        <aside className="relative lg:block lg:min-h-[520px]">
          <motion.div
            ref={leftTextRef}
            style={
              !reducedMotion && canFollowText
                ? { y: smoothLeftTextY }
                : undefined
            }
            className="space-y-6 lg:absolute lg:left-0 lg:top-0"
          >
            <h2 className="font-serif text-4xl italic leading-tight text-[var(--color-dado-dark)] md:text-8xl lg:text-8xl">
              {meta.heading}
            </h2>

            <p className="max-w-[30rem] whitespace-pre-line font-sans text-sm leading-relaxed text-gray-500 md:text-lg">
              {meta.description}
            </p>
          </motion.div>
        </aside>

        <div>{renderCards()}</div>
      </div>
    </div>
  );
}
