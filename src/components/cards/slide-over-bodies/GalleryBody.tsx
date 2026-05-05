'use client';

import Image from 'next/image';
import type { GalleryItem } from '@/types/gallery';

interface GalleryBodyProps {
  item: GalleryItem;
}

export function GalleryBody({ item }: GalleryBodyProps) {
  return (
    <div className="allow-text-select relative mt-10 flex h-full flex-col gap-8 px-8 pb-8 sm:px-12">
      <span className="block font-sans text-xs tracking-[0.18em] text-[var(--color-dado-accent)]">
        {item.date}
      </span>
      <h3 className="font-serif text-4xl italic leading-tight text-[var(--color-dado-bg)]">
        {item.title}
      </h3>

      <div className="relative w-full overflow-hidden rounded-md bg-black/40 p-2">
        <div className="relative aspect-[4/3] max-h-[48vh]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 32rem) 100vw, 32rem"
            className="rounded-sm object-contain"
          />
        </div>
      </div>

      {item.comment && (
        <div className="mt-auto space-y-4 pb-4 text-center">
          <div className="mx-auto h-px w-8 bg-[var(--color-dado-accent)]" />
          <p className="font-sans text-sm leading-relaxed text-[color-mix(in_srgb,var(--color-dado-bg)_68%,transparent)]">
            {item.comment}
          </p>
        </div>
      )}
    </div>
  );
}
