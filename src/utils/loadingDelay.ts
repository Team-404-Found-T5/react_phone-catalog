const MIN_LOADING_DELAY_MS = 500;
const MAX_LOADING_DELAY_MS = 1000;

export const waitForLoadingDelay = (): Promise<void> => {
  const delay =
    Math.floor(
      Math.random() * (MAX_LOADING_DELAY_MS - MIN_LOADING_DELAY_MS + 1),
    ) + MIN_LOADING_DELAY_MS;

  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export const delayResult = <T>(result: Promise<T>): Promise<T> =>
  Promise.all([result, waitForLoadingDelay()]).then(([value]) => value);
