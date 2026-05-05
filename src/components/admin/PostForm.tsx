'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/lib/admin/cms-post';
import { ImageUploader } from './ImageUploader';
import { AttachmentUploader } from './AttachmentUploader';
import type { AttachmentItem, CmsTable, PostRow } from '@/types/admin';

interface Props {
  table: CmsTable;
  initialData?: PostRow;
}

export function PostForm({ table, initialData }: Props) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [date, setDate] = useState(initialData?.date ?? '');
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [published, setPublished] = useState(initialData?.published ?? true);
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.image_url ?? null);
  const [imagePath, setImagePath] = useState<string | null>(initialData?.image_path ?? null);
  const [attachments, setAttachments] = useState<AttachmentItem[]>(
    initialData?.attachment_urls ?? []
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleImageUpload(url: string, path: string) {
    setImageUrl(url);
    setImagePath(path);
  }

  function handleImageRemove() {
    setImageUrl(null);
    setImagePath(null);
  }

  function handleAttachmentAdd(item: AttachmentItem) {
    setAttachments((prev) => [...prev, item]);
  }

  function handleAttachmentRemove(index: number) {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !title || !content) {
      setError('날짜, 제목, 내용은 필수 입력 사항입니다.');
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        date,
        title,
        content,
        image_url: imageUrl,
        image_path: imagePath,
        attachment_urls: attachments,
        published,
      };

      if (isEdit && initialData) {
        await updatePost(table, initialData.id, payload);
      } else {
        await createPost(table, payload);
      }

      router.push(`/admin/${table}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  }

  const tableLabel = table === 'notices' ? '공지사항' : '행사소식';

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEdit ? `${tableLabel} 수정` : `${tableLabel} 등록`}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 날짜 */}
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

        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* 내용 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">내용 *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y"
          />
        </div>

        {/* 대표 이미지 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">대표 이미지</label>
          <ImageUploader
            currentUrl={imageUrl}
            folder={`${table}/images/`}
            onUpload={handleImageUpload}
            onRemove={handleImageRemove}
          />
        </div>

        {/* 첨부파일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">첨부파일</label>
          <AttachmentUploader
            items={attachments}
            folder={`${table}/attachments/`}
            onAdd={handleAttachmentAdd}
            onRemove={handleAttachmentRemove}
          />
        </div>

        {/* 공개 여부 */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-700">
            공개
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">{error}</p>
        )}

        {/* 버튼 */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {submitting ? '저장 중...' : isEdit ? '수정 저장' : '등록'}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/admin/${table}`)}
            className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
