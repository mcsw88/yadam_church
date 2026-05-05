/** 성공 시 `/api/prayer` 응답 형태 */
export type PrayerApiSuccessBody = {
  text: string;
};

/** 클라이언트에서 파싱하는 오류 응답 (서버가 `{ error: string }` 반환) */
export type PrayerApiErrorBody = {
  error: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readErrorField(parsed: unknown): string | null {
  if (!isRecord(parsed)) return null;
  const err = parsed.error;
  if (typeof err === 'string' && err.trim()) return err.trim();
  return null;
}

function readTextField(parsed: unknown): string | null {
  if (!isRecord(parsed)) return null;
  const text = parsed.text;
  if (typeof text === 'string') return text;
  return null;
}

function parseJsonSafe(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

/**
 * 기도 도우미 프롬프트를 서버로 보내고 생성 텍스트를 반환합니다.
 * @throws Error — HTTP 오류 또는 본문 파싱 실패 시; message는 가능하면 서버 `error` 문자열
 */
export async function submitPrayerPrompt(
  prompt: string,
): Promise<PrayerApiSuccessBody> {
  const response = await fetch('/api/prayer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const raw = await response.text();
  const parsed: unknown = raw ? parseJsonSafe(raw) : null;

  if (!response.ok) {
    const fromServer = readErrorField(parsed);
    const fallback =
      response.status === 503 || response.status === 500
        ? '서버 설정이 완료되지 않았습니다. 잠시 후 다시 시도하거나 관리자에게 문의해 주세요.'
        : '잠시 후 다시 시도해 주세요.';
    throw new Error(fromServer ?? fallback);
  }

  const text = readTextField(parsed);
  if (text === null || !text.trim()) {
    throw new Error('응답 형식이 올바르지 않습니다.');
  }

  return { text: text.trim() };
}
