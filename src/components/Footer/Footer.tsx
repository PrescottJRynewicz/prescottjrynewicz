import React from 'react';
import {
  FooterContainer,
  FooterContentContainer,
  MainContent,
  MenuContainer,
  SplitLeftContent,
  SplitRightContent,
} from '/src/components/Footer/styled';
import { Header3, SubHeader3 } from '/design-system/typography';
import Link from 'next/link';
import { MenuPrimaryLink } from '/src/components/Menu/styled';

export const Footer = () => (
  <FooterContainer>
    <FooterContentContainer>
      <MainContent>
        <SplitLeftContent>
          <Header3 style={{ color: 'white', margin: 0 }}>
            THANKS FOR READING! 👋
          </Header3>
        </SplitLeftContent>
        <SplitRightContent>
          <MenuContainer>
            <Link href="/" passHref>
              <MenuPrimaryLink>Home</MenuPrimaryLink>
            </Link>
            <Link href="/blog/about-me" passHref>
              <MenuPrimaryLink>About Me</MenuPrimaryLink>
            </Link>
            <Link href="/blog" passHref>
              <MenuPrimaryLink>Blog</MenuPrimaryLink>
            </Link>
          </MenuContainer>
        </SplitRightContent>
      </MainContent>
      <SubHeader3 style={{ textAlign: 'center', color: 'white' }}>
        ©Prescott J. Rynewicz {new Date().getFullYear()}
      </SubHeader3>
    </FooterContentContainer>
  </FooterContainer>
);
