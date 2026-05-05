'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { uploadImage } from '@/lib/admin/storage';
import { createGalleryItems } from '@/lib/admin/cms-gallery';
import { GalleryUploader } from './GalleryUploader';

interface PreviewFile {
  file: File;
  preview: string;
}

export function GalleryForm() {
  const router = useRouter();

  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [published, setPublished] = useState(true);
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!date) { setError('날짜를 입력해주세요.'); return; }
    if (!title.trim()) { setError('타이틀을 입력해주세요.'); return; }
    if (files.length === 0) { setError('이미지를 1장 이상 선택해주세요.'); return; }
    if (fileError) { setError(fileError); return; }

    setError(null);
    setSubmitting(true);

    try {
      const supabase = createClient();
      const batchId = files.length > 1 ? crypto.randomUUID() : null;
      const uploadedRows: {
        date: string;
        title: string;
        image_url: string;
        image_path: string | null;
        comment: string | null;
        batch_id: string | null;
        sort_order: number;
        published: boolean;
      }[] = [];

      for (let i = 0; i < files.length; i++) {
        setUploadProgress(`이미지 업로드 중... (${i + 1}/${files.length})`);
        const { url, path } = await uploadImage(supabase, files[i].file, 'gallery/');
        uploadedRows.push({
          date,
          title: title.trim(),
          image_url: url,
          image_path: path,
          comment: comment.trim() || null,
          batch_id: batchId,
          sort_order: i,
          published,
        });
      }

      setUploadProgress('저장 중...');
      await createGalleryItems(uploadedRows);

      router.push('/admin/gallery');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
      setUploadProgress(null);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">갤러리 등록</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">날짜 *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">타이틀 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이미지 * <span className="text-gray-400 font-normal">(최대 5장)</span>
          </label>
          <GalleryUploader
            files={files}
            onFilesChange={setFiles}
            error={fileError}
            onError={setFileError}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">코멘트</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-700">공개</label>
        </div>

        {uploadProgress && (
          <p className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-md">{uploadProgress}</p>
        )}

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">{error}</p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {submitting ? (uploadProgress ?? '저장 중...') : '등록'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/gallery')}
            className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
