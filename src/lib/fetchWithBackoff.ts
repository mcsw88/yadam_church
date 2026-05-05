export interface FetchWithBackoffOptions {
  retries?: number;
  baseDelayMs?: number;
}

const DEFAULT_RETRIES = 3;
const DEFAULT_BASE_DELAY_MS = 500;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function fetchWithBackoff<T>(
  url: string,
  init?: RequestInit,
  options?: FetchWithBackoffOptions,
): Promise<T> {
  const retries = options?.retries ?? DEFAULT_RETRIES;
  const baseDelayMs = options?.baseDelayMs ?? DEFAULT_BASE_DELAY_MS;

  let lastError: unknown = null;

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`.trim());
      }
      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      if (attempt === retries - 1) break;
      const delay = baseDelayMs * 2 ** attempt;
      await wait(delay);
    }
  }

  if (lastError instanceof Error) throw lastError;
  throw new Error('fetchWithBackoff: request failed');
}
