import { notFound } from 'next/navigation';
import { GalleryEditForm } from '@/components/admin/GalleryEditForm';
import { getGalleryItem } from '@/lib/admin/cms-gallery';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminGalleryEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getGalleryItem(id);

  if (!item) {
    notFound();
  }

  return <GalleryEditForm item={item} />;
}
