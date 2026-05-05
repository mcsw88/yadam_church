"use client";

import { useCallback, useState } from "react";

import type { MinistryItem } from "@/types/ministries";

import { SlideOver } from "@/components/interaction/SlideOver";

import { MinistryCtaCard, type MinistryCtaTone } from "./MinistryCtaCard";
import { DefaultBody } from "./slide-over-bodies/DefaultBody";

type MinistryCardDeckProps = {
  items: MinistryItem[];
  tone: MinistryCtaTone;
  className?: string;
};

/**
 * 사역 목록: 항목마다 CTA 카드만 나열, 단일 SlideOver.
 * SlideOver는 기존 props 패턴만 사용(`SlideOver.tsx` 수정 없음).
 */
export function MinistryCardDeck({
  items,
  tone,
  className = "",
}: MinistryCardDeckProps) {
  const [active, setActive] = useState<MinistryItem | null>(null);

  const onClose = useCallback(() => {
    setActive(null);
  }, []);

  const open = active !== null;
  const listGapCls =
    //tone === 'sunday' ? 'gap-12 md:gap-14 lg:gap-16' : 'gap-10 md:gap-12';
    tone === "sunday" ? "gap-6 md:gap-7 lg:gap-8" : "gap-6 md:gap-7";
  const itemRhythmCls = tone === "sunday" ? "w-full py-0.5 md:py-1" : "w-full";

  return (
    <>
      <ul
        className={`m-0 flex list-none flex-col p-0 ${listGapCls} ${className}`.trim()}
      >
        {items.map((item) => (
          <li key={item.id} className={itemRhythmCls}>
            <MinistryCtaCard
              tagline={item.tagline}
              title={item.title}
              tone={tone}
              onActivate={() => {
                setActive(item);
              }}
              isExpanded={active?.id === item.id}
            />
          </li>
        ))}
      </ul>

      <SlideOver
        open={open}
        onClose={onClose}
        title={active?.title}
        description={undefined}
      >
        {active ? (
          <DefaultBody
            body={active.description}
            imageSrc={active.image}
            imageAlt={active.imageAlt}
          />
        ) : null}
      </SlideOver>
    </>
  );
}
