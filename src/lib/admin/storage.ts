import type { SupabaseClient } from '@supabase/supabase-js';
import type { AttachmentItem } from '@/types/admin';

const BUCKET = 'church-cms';

function generateFilePath(folder: string, fileName: string): string {
  const ext = fileName.split('.').pop() ?? '';
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  return `${folder}${timestamp}-${random}.${ext}`;
}

export async function uploadImage(
  supabase: SupabaseClient,
  file: File,
  folder: string
): Promise<{ url: string; path: string }> {
  const path = generateFilePath(folder, file.name);
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(`이미지 업로드 실패: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

export async function deleteFile(
  supabase: SupabaseClient,
  path: string
): Promise<void> {
  await supabase.storage.from(BUCKET).remove([path]);
}

export async function uploadAttachment(
  supabase: SupabaseClient,
  file: File,
  folder: string
): Promise<AttachmentItem> {
  const path = generateFilePath(folder, file.name);
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(`첨부파일 업로드 실패: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return {
    name: file.name,
    url: data.publicUrl,
    path,
    size: file.size,
    type: file.type,
  };
}
