'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBulletin, updateBulletin } from '@/lib/admin/cms-bulletin';
import { formatBulletinTitle } from '@/lib/admin/bulletin-utils';
import type { BulletinRow } from '@/types/admin';

const PRAYER_POSITIONS = [
  '성도', '집사', '안수집사', '권사', '장로',
  '강도사', '전도사', '목사', '강사', '선교사', '기타',
];

interface Props {
  initialData?: BulletinRow;
}

function parsePrayerName(value: string | null): { name: string; position: string; customName: string } {
  if (!value) return { name: '', position: '성도', customName: '' };
  const lastSpace = value.lastIndexOf(' ');
  if (lastSpace === -1) return { name: value, position: '성도', customName: '' };
  const possiblePosition = value.slice(lastSpace + 1);
  const possibleName = value.slice(0, lastSpace);
  if (PRAYER_POSITIONS.includes(possiblePosition) && possiblePosition !== '기타') {
    return { name: possibleName, position: possiblePosition, customName: '' };
  }
  return { name: '', position: '기타', customName: value };
}

export function BulletinForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = !!initialData;

  const parsed = parsePrayerName(initialData?.representative_prayer_name ?? null);

  const [date, setDate] = useState(initialData?.date ?? '');
  const [hymn1, setHymn1] = useState(initialData?.hymn_1 ?? '');
  const [hymn2, setHymn2] = useState(initialData?.hymn_2 ?? '');
  const [prayerName, setPrayerName] = useState(parsed.name);
  const [prayerPosition, setPrayerPosition] = useState(parsed.position);
  const [customPrayerName, setCustomPrayerName] = useState(parsed.customName);
  const [sermonTitle, setSermonTitle] = useState(initialData?.sermon_title ?? '');
  const [benedictionName, setBenedictionName] = useState(initialData?.benediction_name ?? '');
  const [published, setPublished] = useState(initialData?.published ?? true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(): string | null {
    if (!date) return '날짜를 입력해주세요.';
    if (!hymn1 || isNaN(Number(hymn1)) || Number(hymn1) < 1) return '찬송가 1을 올바르게 입력해주세요.';
    if (!hymn2 || isNaN(Number(hymn2)) || Number(hymn2) < 1) return '찬송가 2를 올바르게 입력해주세요.';
    if (prayerPosition === '기타') {
      if (!customPrayerName.trim()) return '기타 직분일 때 최종 표시명을 입력해주세요.';
    } else {
      if (!prayerName.trim()) return '대표기도 성함을 입력해주세요.';
    }
    if (!sermonTitle.trim()) return '설교제목을 입력해주세요.';
    if (!benedictionName.trim()) return '축도자를 입력해주세요.';
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const representativePrayerName =
        prayerPosition === '기타'
          ? customPrayerName.trim()
          : `${prayerName.trim()} ${prayerPosition}`;

      const payload = {
        date,
        title: formatBulletinTitle(date),
        hymn_1: hymn1 || null,
        hymn_2: hymn2 || null,
        representative_prayer_name: representativePrayerName || null,
        sermon_title: sermonTitle.trim() || null,
        benediction_name: benedictionName.trim() || null,
        published,
      };

      if (isEdit && initialData) {
        await updateBulletin(initialData.id, payload);
      } else {
        await createBulletin(payload);
      }

      router.push('/admin/bulletins');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEdit ? '주보 수정' : '주보 등록'}
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
          {date && (
            <p className="mt-1 text-xs text-gray-400">제목: {formatBulletinTitle(date)}</p>
          )}
        </div>

        {/* 찬송가 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">찬송가 1 *</label>
            <input
              type="number"
              value={hymn1}
              onChange={(e) => setHymn1(e.target.value)}
              min="1"
              max="645"
              required
              placeholder="예: 23"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">찬송가 2 *</label>
            <input
              type="number"
              value={hymn2}
              onChange={(e) => setHymn2(e.target.value)}
              min="1"
              max="645"
              required
              placeholder="예: 94"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* 대표기도 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">대표기도</label>
          <div className="space-y-2">
            <div className="flex gap-2">
              {prayerPosition !== '기타' && (
                <input
                  type="text"
                  value={prayerName}
                  onChange={(e) => setPrayerName(e.target.value)}
                  placeholder="성함"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              )}
              <select
                value={prayerPosition}
                onChange={(e) => {
                  setPrayerPosition(e.target.value);
                  if (e.target.value !== '기타') setCustomPrayerName('');
                }}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
              >
                {PRAYER_POSITIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            {prayerPosition === '기타' && (
              <input
                type="text"
                value={customPrayerName}
                onChange={(e) => setCustomPrayerName(e.target.value)}
                placeholder="최종 표시명 (예: 홍길동 원로목사)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            )}
            {prayerPosition !== '기타' && prayerName && (
              <p className="text-xs text-gray-400">
                저장 형태: {prayerName.trim()} {prayerPosition}
              </p>
            )}
          </div>
        </div>

        {/* 설교제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">설교제목 *</label>
          <input
            type="text"
            value={sermonTitle}
            onChange={(e) => setSermonTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* 축도자 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">축도자 *</label>
          <input
            type="text"
            value={benedictionName}
            onChange={(e) => setBenedictionName(e.target.value)}
            required
            placeholder="예: 홍길동 목사"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
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
          <label htmlFor="published" className="text-sm font-medium text-gray-700">공개</label>
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
            onClick={() => router.push('/admin/bulletins')}
            className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
