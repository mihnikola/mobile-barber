import { useCallback, useState } from "react";

/**
 * Shared loading / error / data state for async calls (Phase 3.2).
 * Replaces the try/catch + setIsLoading + setError block every useFetch* hook repeated.
 *
 * `run(task, errorMessage)`:
 *  - sets isLoading, clears error
 *  - stores the task's result in `data` unless it returns `undefined`
 *  - on throw stores `errorMessage` (already localized) in `error`
 *  - always clears isLoading at the end (old hooks sometimes left it stuck, B22)
 */
export function useAsync<T>(initialData: T, options: { initialLoading?: boolean } = {}) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(options.initialLoading ?? false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (task: () => Promise<T | undefined>, errorMessage: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await task();
      if (result !== undefined) setData(result);
      return result;
    } catch {
      setError(errorMessage);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, setData, isLoading, error, run };
}

/** Backend envelope `{ status, data }`: returns `data` when status is 200, otherwise `undefined`. */
export function dataIfOk<T = any>(response: { status?: number; data?: T } | undefined): T | undefined {
  return response?.status === 200 ? response.data : undefined;
}
