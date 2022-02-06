import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useDebouncedState<T = any>(
  defaultValue: T,
  delay: number
): [T, Dispatch<SetStateAction<T>>, T] {
  const [value, setValue] = useState<T>(defaultValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [value, setValue, debouncedValue];
}
