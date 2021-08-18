import React from 'react';
import Image from 'next/image';
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
import { InfoText, TextContainer } from '/src/pages/AboutMe/SectionOne/styled';

export function AboutMeSectionTwo() {
  return (
    <SectionTwoContainer id="cycling">
      <PolkaDots numDots={300} />
      <ContentContainer>
        <LeftSection>
          <CyclingImageContainer>
            <Image src="/cycling.jpeg" layout="fill" objectFit="cover" />
          </CyclingImageContainer>
        </LeftSection>
        <RightSection>
          <SectionTwoTitle>CYCLING</SectionTwoTitle>
          <ScribbleUnderlineContainer>
            <Image src="/scribbles/green-underline.png" layout="fill" />
          </ScribbleUnderlineContainer>
          <TextContainer>
            <InfoText>The bicycle is an amazing machine.</InfoText>
            <br />
            <InfoText>
              The cycling community, especially in Los Angeles, is even more
              amazing.
            </InfoText>
            <br />
            <InfoText>
              Find out where I am riding on Strava, and checkout the cycling
              section of my site to dive deeper into the world of cycling
            </InfoText>
          </TextContainer>
        </RightSection>
      </ContentContainer>
    </SectionTwoContainer>
  );
}
