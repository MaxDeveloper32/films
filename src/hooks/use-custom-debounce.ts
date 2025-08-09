import { useEffect, useState } from 'react';

const useCustomDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedValue(value.trim());
    }, delay);

    return () => clearTimeout(timeId);
  }, [value, delay]);

  return debouncedValue;
};

export { useCustomDebounce };
