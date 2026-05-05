'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { BulletinRow } from '@/types/admin';

export async function getBulletins(): Promise<BulletinRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bulletins')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as BulletinRow[];
}

export async function getBulletin(id: string): Promise<BulletinRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bulletins')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as BulletinRow;
}

export async function createBulletin(payload: {
  date: string;
  title: string;
  hymn_1: string | null;
  hymn_2: string | null;
  representative_prayer_name: string | null;
  sermon_title: string | null;
  benediction_name: string | null;
  published: boolean;
}): Promise<{ id: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bulletins')
    .insert(payload)
    .select('id')
    .single();
  if (error) throw new Error(error.message);
  revalidatePath('/admin/bulletins');
  return data as { id: string };
}

export async function updateBulletin(
  id: string,
  payload: {
    date: string;
    title: string;
    hymn_1: string | null;
    hymn_2: string | null;
    representative_prayer_name: string | null;
    sermon_title: string | null;
    benediction_name: string | null;
    published: boolean;
  }
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('bulletins')
    .update(payload)
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/bulletins');
  revalidatePath(`/admin/bulletins/${id}/edit`);
}

export async function deleteBulletin(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('bulletins').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/bulletins');
}
