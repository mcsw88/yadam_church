'use client';

import type { Bulletin } from '@/types/news';

interface BulletinCardProps {
  item: Bulletin;
  onClick: (item: Bulletin) => void;
}

const MONTH_LABELS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
] as const;

export function BulletinCard({ item, onClick }: BulletinCardProps) {
  const parts = item.date.match(/\d+/g);
  const monthNumber = parts?.[1] ? Number(parts[1]) : NaN;
  const dayNumber = parts?.[2] ? Number(parts[2]) : NaN;
  const monthLabel =
    Number.isFinite(monthNumber) && monthNumber >= 1 && monthNumber <= 12
      ? MONTH_LABELS[monthNumber - 1]
      : '---';
  const dayLabel =
    Number.isFinite(dayNumber) && dayNumber >= 1
      ? String(dayNumber).padStart(2, '0')
      : '--';

  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group relative w-full overflow-hidden rounded-[1.1rem] border border-[color-mix(in_srgb,var(--color-dado-dark)_17%,transparent)] bg-white/82 text-left transition-[box-shadow,border-color,background-color] duration-300 ease-out hover:border-[color-mix(in_srgb,var(--color-dado-dark)_34%,transparent)] hover:bg-white hover:shadow-[0_18px_36px_-30px_rgba(17,24,39,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-dado-accent)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[color-mix(in_srgb,var(--color-dado-dark)_42%,transparent)] opacity-75 transition-[width,opacity,background-color] duration-300 group-hover:w-[6px] group-hover:bg-[color-mix(in_srgb,var(--color-dado-dark)_80%,transparent)] group-hover:opacity-100"
      />
      <div className="relative flex min-h-[8.8rem] items-center gap-6 px-6 py-6 md:px-8 md:py-7">
        <div className="flex h-[5.7rem] w-[4.9rem] shrink-0 flex-col items-center justify-center rounded-[0.85rem] border border-[color-mix(in_srgb,var(--color-dado-dark)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-dado-bg)_58%,white)] text-[var(--color-dado-dark)] transition-colors duration-300 group-hover:border-[color-mix(in_srgb,var(--color-dado-dark)_36%,transparent)]">
          <p className="font-sans text-[0.68rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--color-dado-dark)_70%,transparent)]">
            {monthLabel}
          </p>
          <span
            aria-hidden
            className="my-2 block h-px w-9 bg-[color-mix(in_srgb,var(--color-dado-dark)_24%,transparent)]"
          />
          <p className="font-serif text-[1.6rem] leading-none text-[var(--color-dado-dark)]">
            {dayLabel}
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-2 font-sans text-[0.66rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--color-dado-dark)_58%,transparent)]">
            주일예배 순서
          </p>
          <h3 className="font-serif text-[1.72rem] italic leading-snug text-[var(--color-dado-dark)] md:text-[1.95rem]">
            {item.title}
          </h3>
        </div>

        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-dado-dark)_22%,transparent)] text-lg text-[var(--color-dado-dark)] transition-[border-color,background-color,color] duration-300 group-hover:border-[color-mix(in_srgb,var(--color-dado-dark)_48%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--color-dado-dark)_6%,transparent)] group-hover:text-[color-mix(in_srgb,var(--color-dado-dark)_92%,transparent)]"
        >
          →
        </span>
      </div>
    </button>
  );
}
