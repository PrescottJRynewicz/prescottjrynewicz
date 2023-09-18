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
import { GitHub, Instagram, Linkedin, Twitter } from 'react-feather';

export function Footer() {
  return (
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
              <Link href="/" passHref legacyBehavior>
                <MenuPrimaryLink>Home</MenuPrimaryLink>
              </Link>
              <Link
                href={{
                  pathname: '/blog/[...blogPost]',
                  query: {
                    blogPost: ['about-me-f53c54947b1d4351b5fde3f5721b86ec'],
                  },
                }}
                passHref
                legacyBehavior>
                <MenuPrimaryLink>About Me</MenuPrimaryLink>
              </Link>
              <Link href="/blog" passHref legacyBehavior>
                <MenuPrimaryLink>Blog</MenuPrimaryLink>
              </Link>
            </MenuContainer>
          </SplitRightContent>
        </MainContent>
        <SubHeader3
          style={{
            textAlign: 'center',
            color: 'white',
            whiteSpace: 'pre-wrap',
          }}>
          <a
            href="https://www.instagram.com/pjrynewicz/"
            target="_blank"
            rel="noreferrer">
            <Instagram />
          </a>
          {'   '}
          <a
            href="https://twitter.com/prescott_ryno"
            target="_blank"
            rel="noreferrer">
            <Twitter />
          </a>
          {'   '}
          <a
            href="https://github.com/PrescottJRynewicz"
            target="_blank"
            rel="noreferrer">
            <GitHub />
          </a>
          {'   '}
          <a
            href="https://www.linkedin.com/in/prescott-rynewicz-36295182/"
            target="_blank"
            rel="noreferrer">
            <Linkedin />
          </a>
        </SubHeader3>
        <SubHeader3 style={{ textAlign: 'center', color: 'white' }}>
          ©Prescott J. Rynewicz {new Date().getFullYear()}
        </SubHeader3>
      </FooterContentContainer>
    </FooterContainer>
  );
}
