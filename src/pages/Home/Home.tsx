import React, { useCallback } from 'react';
import Head from 'next/head';
import styles from '/src/pages/Home/Home.module.css';
import {
  dotClassname,
  Container,
  TitleContainer,
  Title,
  numDots,
  BreathingCircle,
  getRandomSplatterElement,
  SubTitle,
  MenuContainer,
  NavContainer,
} from '/src/pages/Home/styled';
import { Menu } from '/src/components/Menu/Menu';
import { PrimaryButton } from '/design-system/buttons/primary';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleNav = useCallback(() => {
    const dots = Array.from(document.getElementsByClassName(dotClassname));

    dots.forEach((dot) => {
      const animationMap = {
        1: styles.twoSec,
        2: styles.threeSec,
        3: styles.fourSec,
      };

      const animationDuration =
        animationMap[Math.ceil(Math.random() * 3) as 1 | 2 | 3];

      dot.classList.add(styles.fallOff, animationDuration);
    });

    setTimeout(() => {
      router.push('/about-me');
    }, 2000);
  }, []);

  return (
    <div>
      <Head>
        <title>PJR</title>
        <meta name="description" content="Prescott's Playground 🎢" />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:image" content="/site-image.png" />
        <meta name="twitter:title" content="PrescottJR" />
        <meta name="twitter:description" content="Prescott's Playground" />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="twitter:image:alt" content="Prescott's Playground" />
      </Head>
      <BreathingCircle className={styles.breath} />
      <Container className={styles.fadeIn}>
        {new Array(numDots)
          .fill(0)
          .map((_value, index) => getRandomSplatterElement(index))}
        <MenuContainer>
          <Menu />
        </MenuContainer>
        <TitleContainer>
          <Title>PRESCOTT</Title>
          <Title>RYNEWICZ</Title>
          <SubTitle>
            A bicycle, coffee, and people loving software engineer
          </SubTitle>
          <NavContainer>
            <PrimaryButton withConfetti simultaneous onClick={handleNav}>
              About me
            </PrimaryButton>
            <PrimaryButton withConfetti>Business</PrimaryButton>
            <PrimaryButton withConfetti>Casual</PrimaryButton>
          </NavContainer>
        </TitleContainer>
      </Container>
    </div>
  );
}
