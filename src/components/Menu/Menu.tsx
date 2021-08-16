import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import { useStateSetter } from '/src/hooks/useStateSetter';
import { solids } from '/design-system/colors';
import {
  Button,
  MenuContainer,
  MenuDivider,
  MenuPrimaryLink,
  MenuSecondaryLink,
} from '/src/components/Menu/styled';

const customStyles: Modal.Styles = {
  content: {
    width: '175px',
    height: 'fit-content',
    padding: '15px',
    backgroundColor: solids.MILK,
    border: `solid 3px ${solids.PINK_STARBURST}`,
  },
  overlay: {
    backgroundColor: 'transparent',
  },
};

Modal.setAppElement('#app');

export function Menu() {
  const {
    value: isMenuOpen,
    setValue: setIsMenuOpen,
    setter,
  } = useStateSetter(false);
  const contentRef: MutableRefObject<HTMLElement | undefined> = useRef();
  const modalParent = useRef() as MutableRefObject<HTMLDivElement>;

  const placeMenu = useCallback(() => {
    if (contentRef.current) {
      const menuRect = modalParent.current.getBoundingClientRect();
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
  }, []);

  return (
    <Button ref={modalParent} onClick={setter(true)}>
      <Modal
        isOpen={isMenuOpen}
        onRequestClose={(event) => {
          event.stopPropagation();
          setIsMenuOpen(false);
        }}
        contentRef={(ref) => {
          contentRef.current = ref;
        }}
        onAfterOpen={(obj) => {
          if (obj?.contentEl) {
            contentRef.current = obj.contentEl;
            placeMenu();
          }
        }}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        style={customStyles}
        contentLabel="Example Modal">
        <MenuContainer>
          <Link href="/" passHref>
            <MenuPrimaryLink>Home</MenuPrimaryLink>
          </Link>
          <Link href="/about-me" passHref>
            <MenuPrimaryLink>About Me</MenuPrimaryLink>
          </Link>
          <MenuDivider />
          <Link href="/cycling" passHref>
            <MenuSecondaryLink>Cycling</MenuSecondaryLink>
          </Link>
          <Link href="/cycling" passHref>
            <MenuSecondaryLink>Coffee</MenuSecondaryLink>
          </Link>
          <Link href="/cycling" passHref>
            <MenuSecondaryLink>Code</MenuSecondaryLink>
          </Link>
        </MenuContainer>
      </Modal>
      <svg
        width="46"
        height="42"
        viewBox="0 0 46 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="46" height="10" rx="5" fill="#E06D98" />
        <rect y="15" width="46" height="10" rx="5" fill="#E06D98" />
        <rect y="32" width="46" height="10" rx="5" fill="#E06D98" />
      </svg>
    </Button>
  );
}
