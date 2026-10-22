import { useEffect, useState } from 'react';
import { waitForLoadingDelay } from '../utils/loadingDelay';

export const usePageLoadingDelay = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    waitForLoadingDelay().then(() => {
      if (isActive) {
        setIsLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  return isLoading;
};
