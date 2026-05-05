'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import type { GalleryItem } from '@/types/gallery';

interface GalleryCardProps {
  item: GalleryItem;
  isTouchDevice: boolean;
  onClick: (item: GalleryItem) => void;
}

export function GalleryCard({ item, isTouchDevice, onClick }: GalleryCardProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });
  const [isHovered, setIsHovered] = useState(false);

  const isFocused = isTouchDevice ? isInView : isHovered;

  return (
    <button
      ref={ref}
      type="button"
      className="group relative block w-full cursor-pointer text-left"
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      onClick={() => onClick(item)}
      aria-label={`${item.title} 상세 보기`}
    >
      <div className="relative mb-1 aspect-[3/4] overflow-hidden rounded-sm bg-[color-mix(in_srgb,var(--color-dado-dark)_8%,transparent)]">
        <motion.div
          animate={{
            filter: isFocused
              ? 'blur(0px) sepia(0) grayscale(0)'
              : 'blur(2px) sepia(0.3) grayscale(0.15)',
            scale: isFocused ? 1 : 1.02,
          }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-full w-full"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          animate={{ opacity: isFocused ? 0 : 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute bottom-0 top-0 left-1/2 w-px -translate-x-1/2 bg-white/30 mix-blend-overlay" />
          <div className="absolute left-0 right-0 top-1/3 h-px -translate-y-1/2 bg-white/30 mix-blend-overlay" />
          <div className="absolute left-0 right-0 top-2/3 h-px -translate-y-1/2 bg-white/30 mix-blend-overlay" />
        </motion.div>
      </div>

      <div className="pb-1 pt-1">
        <span className="mb-0.5 block font-sans text-[10px] tracking-[0.15em] text-[color-mix(in_srgb,var(--color-dado-dark)_45%,transparent)]">
          {item.date}
        </span>
        <h3
          className="font-serif text-[1.2rem] font-light italic leading-none transition-colors duration-700"
          style={{
            color: isFocused ? 'var(--color-dado-accent)' : 'var(--color-dado-dark)',
          }}
        >
          {item.title}
        </h3>
      </div>
    </button>
  );
}
