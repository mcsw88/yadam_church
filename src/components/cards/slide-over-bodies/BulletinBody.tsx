"use client";

import type { Bulletin } from "@/types/news";

interface BulletinBodyProps {
  item: Bulletin;
}

function WorshipLine({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="space-y-2 text-center">
      <p className="font-sans text-xs tracking-wide text-[color-mix(in_srgb,var(--color-dado-dark)_45%,transparent)]">
        {label}
      </p>
      <p className="font-serif text-lg leading-relaxed text-[var(--color-dado-dark)]">
        {value}
      </p>
    </div>
  );
}

function OrnamentDivider() {
  return (
    <div className="my-12 flex items-center gap-0 text-[color-mix(in_srgb,var(--color-dado-dark)_12%,transparent)]">
      <span className="h-px flex-1 bg-current" />
      <span className="relative h-4 w-4 rotate-45 border border-current bg-[var(--color-dado-bg)]" />
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}

export function BulletinBody({ item }: BulletinBodyProps) {
  return (
    <div className="allow-text-select mx-auto max-w-[430px] px-4 pb-24 pt-10 text-center">
      <p className="mb-8 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-dado-accent">
        ORDER OF WORSHIP
      </p>

      <h3 className="mb-8 font-serif text-4xl italic leading-tight text-[var(--color-dado-dark)]">
        주일 예배 순서
      </h3>

      <p className="mb-16 font-sans text-sm tracking-wide text-[color-mix(in_srgb,var(--color-dado-dark)_45%,transparent)]">
        {item.date}
      </p>

      <div className="space-y-10">
        <WorshipLine label="찬송가 1" value={item.hymnNumber1 ? `찬송가 ${item.hymnNumber1}장` : null} />
        <WorshipLine label="찬송가 2" value={item.hymnNumber2 ? `찬송가 ${item.hymnNumber2}장` : null} />
        <WorshipLine label="대표기도" value={item.representativePrayer} />
      </div>

      <OrnamentDivider />

      <div className="space-y-4 text-center">
        <p className="font-sans text-xs tracking-wide text-[color-mix(in_srgb,var(--color-dado-dark)_45%,transparent)]">
          말씀 선포
        </p>
        <h4 className="font-serif text-3xl italic leading-tight text-[var(--color-dado-dark)]">
          {item.sermonTitle ?? '—'}
        </h4>
      </div>

      <OrnamentDivider />

      <div className="space-y-10">
        <WorshipLine label="축도" value={item.benediction} />
      </div>
    </div>
  );
}
