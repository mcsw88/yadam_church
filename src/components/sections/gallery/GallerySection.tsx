'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { GalleryCard } from '@/components/cards/GalleryCard';
import { FadeIn } from '@/components/motion/FadeIn';
import { GalleryOverlay } from '@/components/sections/gallery/GalleryOverlay';
import type { GalleryItem } from '@/types/gallery';

interface GallerySectionProps {
  items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  const years = useMemo(
    () => [...new Set(items.map((item) => parseInt(item.date.slice(0, 4), 10)))].sort((a, b) => b - a),
    [items],
  );

  const [activeYear, setActiveYear] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const yearParam = params.get('year');
      if (yearParam) {
        const parsed = parseInt(yearParam, 10);
        if (!isNaN(parsed)) return parsed;
      }
    }
    return years[0] ?? new Date().getFullYear();
  });

  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const yearParam = params.get('year');
      if (yearParam) {
        const parsed = parseInt(yearParam, 10);
        if (!isNaN(parsed)) setActiveYear(parsed);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const filteredItems = useMemo(
    () => items.filter((item) => parseInt(item.date.slice(0, 4), 10) === activeYear),
    [items, activeYear],
  );

  const handleYearSelect = (year: number) => {
    setSelectedItem(null);
    setActiveYear(year);
    const params = new URLSearchParams(window.location.search);
    params.set('year', String(year));
    const nextSearch = params.toString();
    const nextUrl = nextSearch ? `${window.location.pathname}?${nextSearch}` : window.location.pathname;
    window.history.replaceState(null, '', nextUrl);
  };

  return (
    <main className="min-h-screen bg-[var(--color-dado-bg)] pb-28">
      <GalleryOverlay item={selectedItem} onClose={() => setSelectedItem(null)} />

      <section className="px-6 pb-12 pt-48 md:px-24 md:pb-20 md:pt-56">
        <FadeIn className="max-w-4xl">
          <h1 className="mb-6 font-serif text-6xl italic tracking-[0.15em] text-[var(--color-dado-dark)] md:text-8xl">
            갤러리
          </h1>
          <p className="font-sans text-base tracking-[0.2em] text-[color-mix(in_srgb,var(--color-dado-dark)_60%,transparent)] md:text-lg">
            안양예담교회가 걸어온 빛나는 흔적들
          </p>
        </FadeIn>
      </section>

      <section className="px-6 md:px-24">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="sticky top-36 flex flex-col">
              <FadeIn delay={0.15}>
                <div className="mb-14 flex flex-col gap-6 border-b border-[color-mix(in_srgb,var(--color-dado-dark)_12%,transparent)] pb-12 lg:border-none lg:pb-0">
                  {years.map((year) => {
                    const active = year === activeYear;
                    return (
                      <div key={year} className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleYearSelect(year)}
                          className={`font-serif text-4xl transition-colors duration-500 ${
                            active
                              ? 'italic text-[var(--color-dado-dark)]'
                              : 'text-[color-mix(in_srgb,var(--color-dado-dark)_25%,transparent)] hover:text-[color-mix(in_srgb,var(--color-dado-dark)_45%,transparent)]'
                          }`}
                        >
                          {year}
                        </button>
                        {active ? (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-dado-accent)]"
                          >
                            — Archive
                          </motion.span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                className="masonry-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
              >
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      isTouchDevice={isTouchDevice}
                      onClick={setSelectedItem}
                    />
                  ))
                ) : (
                  <div className="border border-dashed border-[color-mix(in_srgb,var(--color-dado-dark)_20%,transparent)] py-20 text-center font-sans text-sm text-[color-mix(in_srgb,var(--color-dado-dark)_55%,transparent)]">
                    해당 연도의 기록이 없습니다.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
