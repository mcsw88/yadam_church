'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { GalleryItemRow } from '@/types/admin';

export async function getGalleryItems(): Promise<GalleryItemRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('date', { ascending: false })
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as GalleryItemRow[];
}

export async function getGalleryItem(id: string): Promise<GalleryItemRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as GalleryItemRow;
}

export async function createGalleryItems(
  rows: {
    date: string;
    title: string;
    image_url: string;
    image_path: string | null;
    comment: string | null;
    batch_id: string | null;
    sort_order: number;
    published: boolean;
  }[]
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('gallery_items').insert(rows);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/gallery');
}

export async function updateGalleryItem(
  id: string,
  payload: {
    date: string;
    title: string;
    comment: string | null;
    published: boolean;
  }
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('gallery_items')
    .update(payload)
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/gallery');
  revalidatePath(`/admin/gallery/${id}/edit`);
}

export async function deleteGalleryItem(
  id: string,
  imagePath: string | null
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('gallery_items').delete().eq('id', id);
  if (error) throw new Error(error.message);

  if (imagePath) {
    await supabase.storage.from('church-cms').remove([imagePath]);
  }

  revalidatePath('/admin/gallery');
}
