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
            <InfoText />
          </TextContainer>
        </RightSection>
      </ContentContainer>
    </SectionTwoContainer>
  );
}
