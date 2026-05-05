export interface GalleryItem {
  id: string;
  date: string;
  title: string;
  image: string;
  comment: string | null;
  batch_id: string | null;
  sort_order: number;
}
