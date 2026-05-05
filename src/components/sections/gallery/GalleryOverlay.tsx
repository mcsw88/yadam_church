'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { GalleryBody } from '@/components/cards/slide-over-bodies/GalleryBody';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import type { GalleryItem } from '@/types/gallery';

interface GalleryOverlayProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export function GalleryOverlay({ item, onClose }: GalleryOverlayProps) {
  const open = Boolean(item);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {item ? (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <motion.button
            type="button"
            aria-label="갤러리 상세 닫기"
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            className="relative flex h-full w-full max-w-[min(100vw,32rem)] flex-col overflow-y-auto bg-[var(--color-dado-dark)] text-[var(--color-dado-bg)] shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,125,107,0.15)_0%,rgba(0,0,0,0)_72%)]" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-8 top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="갤러리 상세 닫기"
            >
              ✕
            </button>
            <div className="relative z-10">
              <GalleryBody item={item} />
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
