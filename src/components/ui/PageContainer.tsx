import type { ReactNode } from 'react';

import { CONTAINER_MAX, PAGE_PADDING_X } from '@/constants/ui';

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
};

export function PageContainer({
  children,
  className,
  as: Tag = 'div',
}: PageContainerProps) {
  const base = [
    'mx-auto',
    CONTAINER_MAX,
    PAGE_PADDING_X,
    'py-12 md:py-16',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={base}>{children}</Tag>;
}
