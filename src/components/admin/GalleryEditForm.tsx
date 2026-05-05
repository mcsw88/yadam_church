'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateGalleryItem } from '@/lib/admin/cms-gallery';
import type { GalleryItemRow } from '@/types/admin';

interface Props {
  item: GalleryItemRow;
}

export function GalleryEditForm({ item }: Props) {
  const router = useRouter();

  const [date, setDate] = useState(item.date);
  const [title, setTitle] = useState(item.title);
  const [comment, setComment] = useState(item.comment ?? '');
  const [published, setPublished] = useState(item.published);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !title.trim()) {
      setError('날짜와 타이틀은 필수 입력 사항입니다.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await updateGalleryItem(item.id, {
        date,
        title: title.trim(),
        comment: comment.trim() || null,
        published,
      });
      router.push('/admin/gallery');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">갤러리 수정</h1>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">현재 이미지</p>
        <div className="relative w-48 h-36 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <p className="mt-1 text-xs text-gray-400">이미지 교체는 지원하지 않습니다.</p>
      </div>

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

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">{error}</p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {submitting ? '저장 중...' : '수정 저장'}
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
