import { NextResponse } from 'next/server';

import { fetchWithBackoff } from '@/lib/fetchWithBackoff';

/** 요청 본문은 `prompt`만 처리합니다. 레거시 클라이언트가 `message` 필드를 썼다면 서버에서 받지 않습니다. */
const MAX_PROMPT_LENGTH = 2000;

const GEMINI_MODEL = 'gemini-2.0-flash';

const SYSTEM_INSTRUCTION =
  '당신은 따뜻한 기독교 목회자입니다. 사용자의 고민에 맞는 성경 구절 1개와 짧은 기도문을 따뜻하고 우아하게 제공해주세요.';

/** 주 환경변수: `GEMINI_API_KEY`. 미설정 시 `GOOGLE_GEMINI_API_KEY`를 보조로 사용합니다. */
function resolveGeminiApiKey(): string | null {
  const primary = process.env.GEMINI_API_KEY?.trim();
  if (primary) return primary;
  const fallback = process.env.GOOGLE_GEMINI_API_KEY?.trim();
  return fallback || null;
}

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parsePromptBody(body: unknown): string | null {
  if (!isRecord(body)) return null;
  const raw = body.prompt;
  if (typeof raw !== 'string') return null;
  return raw;
}

async function generatePrayerText(prompt: string, apiKey: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const payload = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
  });

  const data = await fetchWithBackoff<GeminiGenerateContentResponse>(
    url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    },
    { retries: 4, baseDelayMs: 1000 },
  );

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) {
    throw new Error('empty_candidate');
  }
  return text;
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: '요청 본문을 읽을 수 없습니다.' },
      { status: 400 },
    );
  }

  const promptRaw = parsePromptBody(json);
  if (promptRaw === null) {
    return NextResponse.json(
      { error: 'prompt 필드에 문자열을 보내 주세요.' },
      { status: 400 },
    );
  }

  const prompt = promptRaw.trim();
  if (!prompt) {
    return NextResponse.json(
      { error: '내용을 입력해 주세요.' },
      { status: 400 },
    );
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json(
      { error: `입력은 ${MAX_PROMPT_LENGTH}자 이내로 적어 주세요.` },
      { status: 400 },
    );
  }

  const apiKey = resolveGeminiApiKey();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          '서버 설정이 완료되지 않았습니다. 잠시 후 다시 시도하거나 관리자에게 문의해 주세요.',
      },
      { status: 503 },
    );
  }

  try {
    const text = await generatePrayerText(prompt, apiKey);
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json(
      {
        error:
          '응답을 만들 수 없습니다. 잠시 후 다시 시도해 주세요.',
      },
      { status: 502 },
    );
  }
}
