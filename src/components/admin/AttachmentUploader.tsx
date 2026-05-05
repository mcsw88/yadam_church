'use client';

import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { uploadAttachment } from '@/lib/admin/storage';
import { validateAttachmentFile, validateAttachmentCount, ATTACHMENT_MAX_COUNT } from '@/lib/admin/validate-file';
import type { AttachmentItem } from '@/types/admin';

interface Props {
  items: AttachmentItem[];
  folder: string;
  onAdd: (item: AttachmentItem) => void;
  onRemove: (index: number) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

export function AttachmentUploader({ items, folder, onAdd, onRemove }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const countError = validateAttachmentCount(items.length, files.length);
    if (countError) {
      setError(countError);
      e.target.value = '';
      return;
    }

    for (const file of files) {
      const fileError = validateAttachmentFile(file);
      if (fileError) {
        setError(fileError);
        e.target.value = '';
        return;
      }
    }

    setError(null);
    setUploading(true);
    try {
      const supabase = createClient();
      for (const file of files) {
        const attachment = await uploadAttachment(supabase, file, folder);
        onAdd(attachment);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div className="space-y-3">
      {items.length > 0 && (
        <ul className="space-y-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border border-gray-200"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs text-gray-500">📎</span>
                <span className="text-sm text-gray-700 truncate">{item.name}</span>
                <span className="text-xs text-gray-400 shrink-0">({formatSize(item.size)})</span>
              </div>
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="ml-2 text-xs text-red-500 hover:text-red-700 shrink-0"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length < ATTACHMENT_MAX_COUNT && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="text-sm px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 text-gray-600"
        >
          {uploading ? '업로드 중...' : '+ 파일 추가'}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.hwp,.hwpx,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip"
        onChange={handleChange}
        className="hidden"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <p className="text-xs text-gray-400">
        PDF, HWP, HWPX, DOC, DOCX, PPT, PPTX, XLS, XLSX, ZIP / 파일당 10MB / 최대 {ATTACHMENT_MAX_COUNT}개
      </p>
    </div>
  );
}
