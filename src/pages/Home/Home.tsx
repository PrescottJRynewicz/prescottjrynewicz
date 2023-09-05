import React, { useCallback, useRef } from 'react';
import Head from 'next/head';
import styles from '/src/pages/Home/Home.module.css';
import {
  Container,
  TitleContainer,
  Title,
  SubTitle,
  NavContainer,
} from '/src/pages/Home/styled';
import { Menu } from '/src/components/Menu/Menu';

import { PrimaryButton } from '/design-system/buttons/primary';
import { useRouter } from 'next/router';
import { animateElement } from '/src/utils/animations/animate';
import { dotClassname, PolkaDots } from '/src/components/PolkaDots/PolkaDots';
import { getUrl } from '/src/utils/url/getApiUrl';

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNav = useCallback(
    (pathname: string) => () => {
      const dots = Array.from(
        document.getElementsByClassName(dotClassname)
      ) as HTMLElement[];

      let listenerAdded = false;
      dots.forEach(async (dot) => {
        const animationMap = {
          1: styles.twoSec,
          2: styles.threeSec,
          3: styles.fourSec,
        };

        const animationDuration =
          animationMap[Math.ceil(Math.random() * 3) as 1 | 2 | 3];

        const animationPromise = animateElement({
          node: dot,
          animationClassNames: [styles.fallOff, animationDuration],
        });

        if (animationDuration === styles.twoSec && !listenerAdded) {
          listenerAdded = true;

          await animationPromise;
          if (containerRef.current) {
            await animateElement({
              node: containerRef.current,
              animationClassNames: [styles.fadeOut],
            });
            await router.push(pathname);
          }
        }
      });
    },
    [router]
  );

  return (
    <div>
      <Head>
        <title>Prescott J. Rynewicz</title>
        <meta
          name="description"
          content="Prescott's Playground 🎢: I created this space to share my passions. I am a serial hobbyist and crave sharing my excitement for these passions. "
        />
        <meta name="robots" content="index, follow, all" />

        <link rel="canonical" href={getUrl(router.asPath)} />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:image" content="/site-image.png" />
        <meta name="twitter:title" content="PrescottJR" />
        <meta name="twitter:description" content="Prescott's Playground" />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="twitter:image:alt" content="Prescott's Playground" />
      </Head>
      {/* <BreathingCircle className={styles.breath} /> */}
      <Container ref={containerRef}>
        <PolkaDots numDots={300} />
        <Menu />

        <TitleContainer>
          <Title>PRESCOTT</Title>
          <Title>RYNEWICZ</Title>
          <SubTitle>
            A bicycle, coffee, and people-loving software engineer.
          </SubTitle>
          <NavContainer>
            <PrimaryButton onClick={handleNav('/blog/about-me')}>
              About me
            </PrimaryButton>
            <PrimaryButton onClick={handleNav('/blog')}>Blog</PrimaryButton>
          </NavContainer>
        </TitleContainer>
      </Container>
    </div>
  );
}
