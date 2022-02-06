import { Dispatch, SetStateAction, useState } from "react";
import useDebounce from "./useDebounce";

export default function useDebouncedState<T = any>(
  defaultValue: T,
  delay: number
): [T, Dispatch<SetStateAction<T>>, T] {
  const [value, setValue] = useState<T>(defaultValue);
  const debouncedValue = useDebounce(value, delay);
  return [value, setValue, debouncedValue];
}
