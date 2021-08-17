import { useState } from 'react';
import memoize from 'fast-memoize';

/**
 * Simple state hook util.
 * There are a lot of cases where a simple state value is needed
 * (like a boolean) - that will also be set in a wrapper function.
 *
 * This hook creates that memoized wrapper so you can easily pass
 * a func to onClick or similar handlers without creating new functions
 * on each render
 * @param initValue
 */
export const useStateSetter = <T>(initValue: T) => {
  const [value, setValue] = useState(initValue);

  const setter = memoize((newValue: T) => () => setValue(newValue));

  return {
    value,
    setValue,
    setter,
  };
};
