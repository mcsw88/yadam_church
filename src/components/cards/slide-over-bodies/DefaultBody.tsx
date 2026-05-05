'use client';

import Image from 'next/image';

type DefaultBodyProps = {
  /** 본문(단일 단락 등) */
  body: string;
  imageSrc?: string;
  imageAlt: string;
  className?: string;
};

/**
 * SlideOver 패널 본문: 이미지(선택) + 텍스트.
 * 카드 패턴 재사용을 위한 최소 레이아웃.
 */
export function DefaultBody({
  body,
  imageSrc,
  imageAlt,
  className = '',
}: DefaultBodyProps) {
  const root = ['allow-text-select space-y-5', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={root}>
      {imageSrc ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[color-mix(in_srgb,var(--color-dado-dark)_6%,transparent)]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 24rem) 100vw, 24rem"
            className="object-cover"
          />
        </div>
      ) : null}
      <p className="font-sans text-sm leading-relaxed text-[color-mix(in_srgb,var(--color-dado-dark)_88%,transparent)] md:text-[15px]">
        {body}
      </p>
    </div>
  );
}
