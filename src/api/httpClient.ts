import { delayResult } from '../utils/loadingDelay';

export const fetchJson = <T>(url: string): Promise<T> =>
  delayResult(fetch(url)).then(result => {
    if (!result.ok) {
      throw new Error(`Failed to fetch ${url}: ${result.status}`);
    }

    return result.json() as Promise<T>;
  });
