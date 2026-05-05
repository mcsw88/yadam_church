'use client';

import type { MouseEventHandler, ReactNode } from 'react';

export interface LoadMoreButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
  remainingCount?: number;
}

export function LoadMoreButton({
  onClick,
  disabled = false,
  loading = false,
  children,
  remainingCount,
}: LoadMoreButtonProps) {
  const content =
    children !== undefined ? (
      children
    ) : remainingCount !== undefined ? (
      <>
        더 보기 <span className="text-[color-mix(in_srgb,var(--color-dado-dark)_45%,transparent)]">({remainingCount})</span>
      </>
    ) : (
      '더 보기'
    );

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading ? true : undefined}
      className={`inline-flex items-center justify-center gap-1 rounded-sm border border-[color-mix(in_srgb,var(--color-dado-dark)_22%,transparent)] bg-transparent px-5 py-2 font-sans text-sm tracking-wide text-[var(--color-dado-dark)] transition-colors hover:border-[var(--color-dado-accent)] hover:text-[var(--color-dado-accent)] disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {loading ? (
        <>
          <span className="inline-block size-4 animate-spin rounded-full border-2 border-[color-mix(in_srgb,var(--color-dado-dark)_25%,transparent)] border-t-[var(--color-dado-accent)]" />
          <span>{content}</span>
        </>
      ) : (
        content
      )}
    </button>
  );
}
