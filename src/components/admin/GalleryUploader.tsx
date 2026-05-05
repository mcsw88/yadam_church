'use client';

import { useRef } from 'react';
import { validateImageFile } from '@/lib/admin/validate-file';

export const GALLERY_MAX_COUNT = 5;

interface PreviewFile {
  file: File;
  preview: string;
}

interface Props {
  files: PreviewFile[];
  onFilesChange: (files: PreviewFile[]) => void;
  error: string | null;
  onError: (msg: string | null) => void;
}

export function GalleryUploader({ files, onFilesChange, error, onError }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length === 0) return;

    if (selected.length > GALLERY_MAX_COUNT) {
      onError(`사진은 한 번에 최대 ${GALLERY_MAX_COUNT}장까지 업로드할 수 있습니다.`);
      e.target.value = '';
      return;
    }

    for (const file of selected) {
      const fileError = validateImageFile(file);
      if (fileError) {
        onError(fileError);
        e.target.value = '';
        return;
      }
    }

    onError(null);
    const newPreviews: PreviewFile[] = selected.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    onFilesChange(newPreviews);
    e.target.value = '';
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    onFilesChange(next);
  }

  return (
    <div className="space-y-3">
      {files.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {files.map((pf, idx) => (
            <div key={idx} className="relative w-24 h-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pf.preview}
                alt={`미리보기 ${idx + 1}`}
                className="w-full h-full object-cover rounded-md border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
              <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                {idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-sm px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-600"
      >
        {files.length === 0 ? '+ 이미지 선택' : '+ 다시 선택'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <p className="text-xs text-gray-400">
        JPG, PNG, WEBP / 파일당 5MB / 최대 {GALLERY_MAX_COUNT}장
      </p>
    </div>
  );
}
