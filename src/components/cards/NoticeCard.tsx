'use client';

import type { Notice } from '@/types/news';

interface NoticeCardProps {
  item: Notice;
  onClick: (item: Notice) => void;
}

export function NoticeCard({ item, onClick }: NoticeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group relative w-full overflow-hidden rounded-[1rem] border border-[color-mix(in_srgb,var(--color-dado-dark)_14%,transparent)] bg-white/78 text-left transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out hover:translate-x-[2px] hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--color-dado-dark)_32%,transparent)] hover:bg-white hover:shadow-[0_20px_38px_-28px_rgba(17,24,39,0.58)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-dado-accent)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-[4px] bg-[color-mix(in_srgb,var(--color-dado-dark)_42%,transparent)] opacity-70 transition-[width,opacity,background-color] duration-300 group-hover:w-[8px] group-hover:bg-[color-mix(in_srgb,var(--color-dado-dark)_80%,transparent)] group-hover:opacity-100"
      />
      <div className="relative flex min-h-[8.5rem] items-center justify-between gap-6 px-8 py-7 md:px-10 md:py-8">
        <div className="min-w-0">
          <p className="mb-3 font-sans text-xs tracking-[0.2em] text-[color-mix(in_srgb,var(--color-dado-dark)_62%,transparent)]">
            {item.date}
          </p>
          <h3 className="font-serif text-[1.85rem] italic leading-snug text-[var(--color-dado-dark)] md:text-[2rem]">
            {item.title}
          </h3>
        </div>
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-dado-dark)_18%,transparent)] text-lg text-[var(--color-dado-dark)] transition-colors duration-300 group-hover:border-[color-mix(in_srgb,var(--color-dado-dark)_34%,transparent)]"
        >
          →
        </span>
      </div>
    </button>
  );
}
