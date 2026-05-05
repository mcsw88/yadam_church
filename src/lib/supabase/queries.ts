import { createClient } from '@/lib/supabase/server';
import type { PostRow, BulletinRow, GalleryItemRow } from '@/types/admin';

export async function getPublishedNotices(): Promise<PostRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false });
    if (error) {
      console.error('[getPublishedNotices]', error.message);
      return [];
    }
    return (data ?? []) as PostRow[];
  } catch (e) {
    console.error('[getPublishedNotices]', e);
    return [];
  }
}

export async function getPublishedEvents(): Promise<PostRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false });
    if (error) {
      console.error('[getPublishedEvents]', error.message);
      return [];
    }
    return (data ?? []) as PostRow[];
  } catch (e) {
    console.error('[getPublishedEvents]', e);
    return [];
  }
}

export async function getPublishedBulletins(): Promise<BulletinRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('bulletins')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false });
    if (error) {
      console.error('[getPublishedBulletins]', error.message);
      return [];
    }
    return (data ?? []) as BulletinRow[];
  } catch (e) {
    console.error('[getPublishedBulletins]', e);
    return [];
  }
}

export async function getPublishedGalleryItems(): Promise<GalleryItemRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })
      .order('sort_order', { ascending: true });
    if (error) {
      console.error('[getPublishedGalleryItems]', error.message);
      return [];
    }
    return (data ?? []) as GalleryItemRow[];
  } catch (e) {
    console.error('[getPublishedGalleryItems]', e);
    return [];
  }
}
