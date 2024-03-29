import React, { useCallback, useRef } from 'react';
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
import { SEOTags } from '/src/components/SEOTags/SEOTags';

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
          1: styles.oneSec,
          2: styles.twoSec,
          3: styles.twoSec,
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
            // @ts-ignore
            await router.push(pathname);
          }
        }
      });
    },
    [router]
  );

  const title = 'Prescott J. Rynewicz';
  const description =
    "Prescott's Playground 🎢: I created this space to share my passions. I am a serial hobbyist and crave sharing my excitement for these passions.";

  return (
    <div>
      <SEOTags router={router} title={title} description={description} />

      {/* <BreathingCircle className={styles.breath} /> */}
      <Container ref={containerRef}>
        <PolkaDots numDots={300} />
        <Menu />

        <TitleContainer>
          <Title>PRESCOTT</Title>
          <Title>RYNEWICZ</Title>
          <SubTitle>
            {`Product Engineering Leader
          Serial Hobbyist`}
          </SubTitle>
          <NavContainer>
            <PrimaryButton
              onClick={handleNav(
                '/blog/about-me-f53c54947b1d4351b5fde3f5721b86ec'
              )}>
              About me
            </PrimaryButton>
            <PrimaryButton onClick={handleNav('/blog')}>Blog</PrimaryButton>
          </NavContainer>
        </TitleContainer>
      </Container>
    </div>
  );
}
