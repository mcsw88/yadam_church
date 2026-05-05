export type CmsTable = 'notices' | 'events';

export interface AttachmentItem {
  name: string;
  url: string;
  path: string;
  size: number;
  type: string;
}

export interface PostRow {
  id: string;
  date: string;
  title: string;
  content: string;
  image_url: string | null;
  image_path: string | null;
  attachment_urls: AttachmentItem[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostFormValues {
  date: string;
  title: string;
  content: string;
  published: boolean;
}

export interface BulletinRow {
  id: string;
  date: string;
  title: string;
  hymn_1: string | null;
  hymn_2: string | null;
  representative_prayer_name: string | null;
  sermon_title: string | null;
  benediction_name: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryItemRow {
  id: string;
  date: string;
  title: string;
  image_url: string;
  image_path: string | null;
  comment: string | null;
  batch_id: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}
