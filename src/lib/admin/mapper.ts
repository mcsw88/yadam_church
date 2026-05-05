import type { Notice, NewsEvent, Bulletin, AttachmentFile } from '@/types/news';
import type { GalleryItem } from '@/types/gallery';
import type { PostRow, BulletinRow, GalleryItemRow, AttachmentItem } from '@/types/admin';

function mapAttachments(items: AttachmentItem[]): AttachmentFile[] {
  return items.map((a) => ({
    name: a.name,
    url: a.url,
    path: a.path,
    size: a.size,
    type: a.type,
  }));
}

export function mapNotice(row: PostRow): Notice {
  return {
    kind: 'notice',
    id: row.id,
    title: row.title,
    date: row.date,
    description: row.content,
    image: row.image_url ?? undefined,
    attachments: row.attachment_urls.length > 0 ? mapAttachments(row.attachment_urls) : undefined,
  };
}

export function mapEvent(row: PostRow): NewsEvent {
  return {
    kind: 'event',
    id: row.id,
    title: row.title,
    date: row.date,
    description: row.content,
    image: row.image_url ?? undefined,
    attachments: row.attachment_urls.length > 0 ? mapAttachments(row.attachment_urls) : undefined,
  };
}

export function mapBulletin(row: BulletinRow): Bulletin {
  return {
    kind: 'bulletin',
    id: row.id,
    title: row.title,
    date: row.date,
    hymnNumber1: row.hymn_1,
    hymnNumber2: row.hymn_2,
    representativePrayer: row.representative_prayer_name,
    sermonTitle: row.sermon_title,
    benediction: row.benediction_name,
  };
}

export function mapGalleryItem(row: GalleryItemRow): GalleryItem {
  return {
    id: row.id,
    date: row.date,
    title: row.title,
    image: row.image_url,
    comment: row.comment,
    batch_id: row.batch_id,
    sort_order: row.sort_order,
  };
}
