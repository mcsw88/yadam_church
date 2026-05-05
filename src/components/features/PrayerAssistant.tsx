'use client';

import { type FormEvent, useCallback, useState } from 'react';

import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { LoadingDots } from '@/components/ui/LoadingDots';
import { submitPrayerPrompt } from '@/services/prayerService';

export function PrayerAssistant() {
  const [input, setInput] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emptyHint, setEmptyHint] = useState(false);

  const trimmed = input.trim();

  const runSubmit = useCallback(async () => {
    const text = input.trim();
    if (!text) {
      setEmptyHint(true);
      return;
    }
    setEmptyHint(false);
    setError(null);
    setIsLoading(true);
    try {
      const { text: reply } = await submitPrayerPrompt(text);
      setResponseText(reply);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : '잠시 후 다시 시도해 주세요.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void runSubmit();
  };

  return (
    <section
      data-theme="dark"
      className="bg-dado-dark px-6 py-32 text-dado-bg md:px-24"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 font-serif text-4xl italic text-dado-accent md:text-5xl">
          ✨ 마음의 성소
        </h2>
        <p className="mb-12 font-sans text-sm text-gray-400">
          현재의 고민이나 기도 제목을 나누어주세요.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-2xl flex-col gap-8"
        >
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (emptyHint && e.target.value.trim()) setEmptyHint(false);
            }}
            placeholder="어떤 마음이든 괜찮습니다..."
            rows={2}
            className="w-full resize-none border-b border-gray-600 bg-transparent py-4 text-center font-sans text-lg text-white outline-none focus:border-dado-accent"
            aria-invalid={emptyHint}
            aria-describedby={emptyHint ? 'prayer-empty-hint' : undefined}
          />
          {emptyHint ? (
            <p
              id="prayer-empty-hint"
              className="font-sans text-sm text-dado-accent"
              role="status"
            >
              마음을 한 줄이라도 적어 주시면 나눌 수 있습니다.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="hover-trigger mx-auto rounded-full border border-gray-600 px-8 py-3 transition-colors hover:bg-dado-bg hover:text-dado-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2 font-sans">
                기도하는 중...
                <LoadingDots />
              </span>
            ) : (
              '마음 나누기 ✨'
            )}
          </button>
        </form>

        {error ? (
          <div className="mx-auto mt-10 max-w-2xl text-left">
            <ErrorMessage
              title="잠시 문제가 생겼습니다"
              description={error}
              className="border-gray-500/80 bg-black/30 [&_h3]:font-serif [&_h3]:text-dado-bg [&_p]:text-gray-300"
              actionSlot={
                <button
                  type="button"
                  onClick={() => void runSubmit()}
                  disabled={isLoading || !trimmed}
                  className="rounded-sm border border-dado-accent/80 px-4 py-2 font-sans text-sm text-dado-bg transition-colors hover:bg-dado-accent/20 disabled:opacity-50"
                >
                  다시 시도
                </button>
              }
            />
          </div>
        ) : null}

        {responseText && !error ? (
          <div className="mt-16 rounded-2xl border border-gray-700 bg-black/20 p-8 text-left font-serif leading-relaxed">
            <div className="whitespace-pre-wrap text-lg leading-loose text-dado-bg">
              {responseText}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
