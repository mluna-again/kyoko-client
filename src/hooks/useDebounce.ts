import { useState, useRef, useEffect } from "react";

type useDebounce = (
  value: string,
  callback: (value: string) => any,
  delay: number
) => [string, (e: React.ChangeEvent<HTMLInputElement>) => void, boolean];

const useDebounce: useDebounce = (value, callback, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [debouncing, setDebouncing] = useState(false);

  const timeout = useRef<number | null>(null);

  useEffect(() => setDebouncedValue(value), [value]);

  const setWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncing(true);
    const value = e.target.value;

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      callback(value);
      setDebouncing(false);
    }, delay);
    setDebouncedValue(value);
  };

  return [debouncedValue, setWrapper, debouncing];
};

export default useDebounce;
