'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteGalleryItem } from '@/lib/admin/cms-gallery';
import type { GalleryItemRow } from '@/types/admin';

interface Props {
  items: GalleryItemRow[];
}

export function GalleryList({ items }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(item: GalleryItemRow) {
    if (!confirm(`"${item.title}" 이미지를 삭제하시겠습니까?`)) return;
    setDeletingId(item.id);
    try {
      await deleteGalleryItem(item.id, item.image_path);
      router.refresh();
    } catch {
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">갤러리</h1>
        <Link
          href="/admin/gallery/new"
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
        >
          + 새 갤러리 등록
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          등록된 갤러리 이미지가 없습니다.
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600 w-16">이미지</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 w-24">날짜</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">제목</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 w-20">공개</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600 w-28">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="relative w-14 h-10 rounded overflow-hidden bg-gray-100">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{item.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{item.title}</span>
                      {item.batch_id && (
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-500 text-xs rounded">
                          묶음
                        </span>
                      )}
                      {item.comment && (
                        <span className="text-gray-400 text-xs truncate max-w-32">
                          {item.comment}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {item.published ? '공개' : '비공개'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/gallery/${item.id}/edit`}
                        className="text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(item)}
                        disabled={deletingId === item.id}
                        className="text-xs px-3 py-1.5 border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
