import {
  ContentContainer,
  CyclingImageContainer,
  LeftSection,
  RightSection,
  ScribbleUnderlineContainer,
  SectionTwoContainer,
  SectionTwoTitle,
} from '/src/pages/AboutMe/PhotoFirstSections/styled';
import { PolkaDots } from '/src/components/PolkaDots/PolkaDots';
import Image from 'next/image';
import { InfoText, TextContainer } from '/src/pages/AboutMe/SectionOne/styled';
import React, { useCallback } from 'react';
import { NakedButton } from '/design-system/buttons/naked';
import styles from '/src/pages/AboutMe/PhotoFirstSections/AboutMeSectionFour.module.css';
import { animateElement } from '/src/utils/animations/animate';
import { solids } from '/design-system/colors';

export function AboutMeSectionFour() {
  const animateDots = useCallback(() => {
    const dots = Array.from(
      document.getElementsByClassName('AboutMeSectionFourPolkaDots')
    ) as HTMLElement[];

    dots.forEach((dot) => {
      animateElement({
        node: dot,
        animationClassNames: [styles.spinAnimation],
        removeClassOnComplete: true,
      });
    });
  }, []);

  return (
    <SectionTwoContainer id="code">
      <PolkaDots numDots={300} customClassname="AboutMeSectionFourPolkaDots" />
      <ContentContainer>
        <LeftSection>
          <CyclingImageContainer>
            <Image src="/code.png" layout="fill" objectFit="cover" />
          </CyclingImageContainer>
        </LeftSection>
        <RightSection>
          <SectionTwoTitle>CODE</SectionTwoTitle>
          <ScribbleUnderlineContainer>
            <Image src="/scribbles/green-underline.png" layout="fill" />
          </ScribbleUnderlineContainer>
          <TextContainer>
            <InfoText>I love writing code</InfoText>
            <br />
            <InfoText>
              This picture is a snippet of code that is running this website. It
              powers all the fun dots you see in this section, and allows me to
              do fun stuff like
              <NakedButton onClick={animateDots} useConfetti simultaneous>
                this
              </NakedButton>
            </InfoText>
            <br />
            <InfoText>
              I work full time at{' '}
              <a
                style={{ color: 'purple' }}
                href="https://www.cameo.com"
                target="_blank"
                rel="nofollow noreferrer">
                Cameo
              </a>
              , and dabble in projects like{' '}
              <a
                style={{ color: solids.PINK_STARBURST }}
                href="https://www.gogyft.com"
                target="_blank"
                rel="nofollow noreferrer">
                GoGyft
              </a>{' '}
              which you&apos;ll notice influenced this website 😉
              <br />A full work bio is coming soon to the site
            </InfoText>
          </TextContainer>
        </RightSection>
      </ContentContainer>
    </SectionTwoContainer>
  );
}
