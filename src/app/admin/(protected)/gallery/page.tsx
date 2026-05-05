import { GalleryList } from '@/components/admin/GalleryList';
import { getGalleryItems } from '@/lib/admin/cms-gallery';

export default async function AdminGalleryPage() {
  const items = await getGalleryItems();
  return <GalleryList items={items} />;
}
