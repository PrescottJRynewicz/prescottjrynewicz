import { useEffect, useRef, useState } from 'react';

export function useStateRef<T = any>(initValue: T) {
  const [state, setState] = useState(initValue);
  const ref = useRef(state);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return [state, setState, ref] as const;
}
