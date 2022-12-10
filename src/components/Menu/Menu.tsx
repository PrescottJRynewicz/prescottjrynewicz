import React from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import { solids, speckles } from '/design-system/colors';
import {
  MenuPrimaryLink,
  HamburgerBorder,
  MenuButton,
  HamburgerContainer,
} from '/src/components/Menu/styled';
import { useMenuState } from '/src/components/Menu/useMenuState';
import styled from 'styled-components';

const customStyles: Modal.Styles = {
  content: {
    width: 'fit-content',
    height: 'fit-content',
    padding: '0',
    border: 'none',
    borderRadius: '10px',
  },
  overlay: {
    backgroundColor: 'transparent',
  },
};

const Nav = styled.nav`
  background-image: url(${speckles.MILK});
  border: solid 3px ${solids.PINK_STARBURST};
  border-radius: 10px;
  padding: 15px 30px;

  @media (prefers-color-scheme: dark) {
    color: black;
  }
`;

Modal.setAppElement('#app');

export function Menu() {
  const {
    isMenuOpen,
    setIsMenuOpen,
    setter,
    buttonParentRef,
    contentRef,
    placeMenu,
  } = useMenuState();

  return (
    <MenuButton buttonRef={buttonParentRef} onClick={setter(true)}>
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
        <Nav>
          <HamburgerBorder>
            <Link href="/" passHref legacyBehavior>
              <MenuPrimaryLink>Home</MenuPrimaryLink>
            </Link>
            <Link href="/blog/about-me" passHref legacyBehavior>
              <MenuPrimaryLink>About Me</MenuPrimaryLink>
            </Link>
            <Link href="/blog" passHref legacyBehavior>
              <MenuPrimaryLink>Blog</MenuPrimaryLink>
            </Link>
          </HamburgerBorder>
        </Nav>
      </Modal>
      <HamburgerContainer>
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
      </HamburgerContainer>
    </MenuButton>
  );
}
