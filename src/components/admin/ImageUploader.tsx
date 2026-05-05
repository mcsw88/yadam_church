'use client';

import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { uploadImage } from '@/lib/admin/storage';
import { validateImageFile } from '@/lib/admin/validate-file';

interface Props {
  currentUrl: string | null;
  folder: string;
  onUpload: (url: string, path: string) => void;
  onRemove: () => void;
}

export function ImageUploader({ currentUrl, folder, onUpload, onRemove }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      e.target.value = '';
      return;
    }

    setError(null);
    setUploading(true);
    try {
      const supabase = createClient();
      const { url, path } = await uploadImage(supabase, file, folder);
      onUpload(url, path);
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div className="space-y-2">
      {currentUrl ? (
        <div className="relative w-48">
          <img
            src={currentUrl}
            alt="대표 이미지"
            className="w-48 h-32 object-cover rounded-md border border-gray-200"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
          >
            ×
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <span className="text-xs">업로드 중...</span>
          ) : (
            <>
              <span className="text-2xl mb-1">+</span>
              <span className="text-xs">이미지 선택</span>
              <span className="text-xs mt-1">JPG, PNG, WEBP / 5MB</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
