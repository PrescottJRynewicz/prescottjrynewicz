import React, { useCallback } from 'react';
import Head from 'next/head';
import styles from '/src/pages/Home/Home.module.css';
import {
  dotClassname,
  MakeItRain,
  Container,
  TitleContainer,
  Title,
  numDots,
  BreathingCircle,
  getRandomSplatterElement,
} from '/src/pages/Home/styled';

export default function Home() {
  const handleNav = useCallback(() => {
    const dots = Array.from(document.getElementsByClassName(dotClassname));

    dots.forEach((dot) => {
      let animationDuration = styles.twoSec;
      switch (Math.ceil(Math.random() * 3)) {
        case 1: {
          animationDuration = styles.twoSec;
          break;
        }
        case 2: {
          animationDuration = styles.threeSec;
          break;
        }
        case 3: {
          animationDuration = styles.fourSec;
          break;
        }
        default: {
          break;
        }
      }
      dot.classList.add(styles.fallOff, animationDuration);
    });
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
        <TitleContainer>
          <Title>PRESCOTT</Title>
          <Title>J</Title>
          <Title>RYNEWICZ</Title>
          <MakeItRain onClick={handleNav}>💦 Make it rain 💦</MakeItRain>
          <p>More coming soon</p>
        </TitleContainer>
      </Container>
    </div>
  );
}
