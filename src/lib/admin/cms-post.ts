'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { AttachmentItem, CmsTable, PostRow } from '@/types/admin';

function assertValidTable(table: string): asserts table is CmsTable {
  if (table !== 'notices' && table !== 'events') {
    throw new Error('Invalid table name');
  }
}

export async function getPosts(table: CmsTable): Promise<PostRow[]> {
  assertValidTable(table);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('date', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as PostRow[];
}

export async function getPost(table: CmsTable, id: string): Promise<PostRow | null> {
  assertValidTable(table);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as PostRow;
}

export async function createPost(
  table: CmsTable,
  payload: {
    date: string;
    title: string;
    content: string;
    image_url: string | null;
    image_path: string | null;
    attachment_urls: AttachmentItem[];
    published: boolean;
  }
): Promise<{ id: string }> {
  assertValidTable(table);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(table)
    .insert(payload)
    .select('id')
    .single();
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/${table}`);
  return data as { id: string };
}

export async function updatePost(
  table: CmsTable,
  id: string,
  payload: {
    date: string;
    title: string;
    content: string;
    image_url: string | null;
    image_path: string | null;
    attachment_urls: AttachmentItem[];
    published: boolean;
  }
): Promise<void> {
  assertValidTable(table);
  const supabase = await createClient();
  const { error } = await supabase
    .from(table)
    .update(payload)
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/${table}`);
  revalidatePath(`/admin/${table}/${id}/edit`);
}

export async function deletePost(
  table: CmsTable,
  id: string,
  imagePath: string | null,
  attachmentPaths: string[]
): Promise<void> {
  assertValidTable(table);
  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw new Error(error.message);

  // Storage 파일 삭제 (best-effort)
  const pathsToDelete: string[] = [];
  if (imagePath) pathsToDelete.push(imagePath);
  pathsToDelete.push(...attachmentPaths);
  if (pathsToDelete.length > 0) {
    await supabase.storage.from('church-cms').remove(pathsToDelete);
  }

  revalidatePath(`/admin/${table}`);
}
