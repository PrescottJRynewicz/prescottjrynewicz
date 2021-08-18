import { useStateSetter } from '/src/hooks/useStateSetter';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

export function useMenuState() {
  const {
    value: isMenuOpen,
    setValue: setIsMenuOpen,
    setter,
  } = useStateSetter(false);
  const contentRef: MutableRefObject<HTMLElement | undefined> = useRef();
  const buttonParentRef = useRef() as MutableRefObject<HTMLButtonElement>;

  const placeMenu = useCallback(() => {
    if (contentRef.current) {
      const menuRect = buttonParentRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      const leftPosition = menuRect.left - contentRect.width + menuRect.width;
      const topPosition = menuRect.top + menuRect.height + 10;

      contentRef.current.style.left = String(`${leftPosition}px`);
      contentRef.current.style.top = String(`${topPosition}px`);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const oldListener = window.onresize;

      window.onresize = (ev) => {
        placeMenu();
        // @ts-ignore
        if (oldListener) oldListener(ev);
      };
      return () => {
        window.onresize = oldListener;
      };
    }
    return undefined;
  }, [placeMenu]);

  return {
    setIsMenuOpen,
    setter,
    isMenuOpen,
    buttonParentRef,
    contentRef,
    placeMenu,
  };
}
