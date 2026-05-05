"use client";

import Image from "next/image";

import { AttachmentDownloadList } from "@/components/news/AttachmentDownloadList";
import type { NewsEvent } from "@/types/news";

interface EventBodyProps {
  item: NewsEvent;
}

export function EventBody({ item }: EventBodyProps) {
  return (
    <div className="allow-text-select mx-auto max-w-[38rem] space-y-7">
      {item.image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[color-mix(in_srgb,var(--color-dado-dark)_6%,transparent)]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 42rem) 100vw, 38rem"
            className="object-cover"
          />
        </div>
      ) : null}

      <p className="font-sans text-sm tracking-[0.22em] text-[color-mix(in_srgb,var(--color-dado-dark)_55%,transparent)]">
        {item.date}
      </p>

      <h3 className="font-serif text-3xl italic leading-tight text-[var(--color-dado-dark)] md:text-4xl">
        {item.title}
      </h3>

      <p className="whitespace-pre-line font-sans text-base leading-8 text-[color-mix(in_srgb,var(--color-dado-dark)_82%,transparent)] md:text-lg md:leading-9">
        {item.description}
      </p>

      <AttachmentDownloadList attachments={item.attachments} />
    </div>
  );
}
