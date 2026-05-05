"use client";

import Image from "next/image";

import type { NewsEvent } from "@/types/news";

interface EventCardProps {
  item: NewsEvent;
  onClick: (item: NewsEvent) => void;
}

export function EventCard({ item, onClick }: EventCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group/event w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-dado-accent)]"
    >
      <div
        className="relative mb-5 aspect-[4/3] overflow-hidden border border-[color-mix(in_srgb,var(--color-dado-dark)_14%,transparent)] bg-white shadow-[0_16px_32px_-30px_rgba(17,24,39,0.52)] transition-[transform,box-shadow,border-color] duration-500 ease-out group-hover/event:-translate-y-[2px] group-hover/event:border-[color-mix(in_srgb,var(--color-dado-dark)_28%,transparent)] group-hover/event:shadow-[0_28px_42px_-32px_rgba(17,24,39,0.58)]"
        style={{
          borderRadius: "59% 41% 47% 53% / 39% 58% 42% 61%",
        }}
      >
        {item.image ? (
          <>
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 38rem"
              //className="scale-110 object-cover blur-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/event:scale-[1.14] group-hover/event:blur-none"
              className="scale-110 object-cover blur-[2px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/event:scale-[1.14] group-hover/event:blur-none"
            />

            <div
              aria-hidden
              className="absolute inset-0 bg-[var(--color-dado-dark)]/10 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/event:opacity-0"
            />
          </>
        ) : (
          <div aria-hidden="true" className="absolute inset-0 bg-white" />
        )}
      </div>

      <p className="mb-3 font-sans text-xs tracking-[0.2em] text-[color-mix(in_srgb,var(--color-dado-dark)_60%,transparent)]">
        {item.date}
      </p>

      <h3 className="font-serif text-[2rem] italic leading-[1.22] text-[var(--color-dado-dark)]">
        {item.title}
      </h3>
    </button>
  );
}
