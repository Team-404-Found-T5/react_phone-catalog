import { useEffect, useState } from 'react';

const readValue = <T>(key: string, initialValue: T): T => {
  const storedValue = localStorage.getItem(key);

  if (!storedValue) {
    return initialValue;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    localStorage.removeItem(key);
    return initialValue;
  }
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => readValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
