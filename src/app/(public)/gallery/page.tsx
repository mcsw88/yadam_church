import type { Metadata } from 'next';

import { GallerySection } from '@/components/sections/gallery/GallerySection';
import { getPublishedGalleryItems } from '@/lib/supabase/queries';
import { mapGalleryItem } from '@/lib/admin/mapper';

export const metadata: Metadata = {
  title: '갤러리 | 안양예담교회',
  description: '안양예담교회의 행사 사진과 믿음의 기록을 확인하세요.',
};

export default async function GalleryPage() {
  const rows = await getPublishedGalleryItems();
  const items = rows.map(mapGalleryItem);
  return <GallerySection items={items} />;
}
