import React from 'react';
import {
  CoffeeImageContainer,
  ContentContainer,
  SectionThreeContainer,
} from '/src/pages/AboutMe/SectionThree/styled';
import {
  LeftSection,
  RightSection,
  ScribbleUnderlineContainer,
  SectionTwoTitle,
} from '/src/pages/AboutMe/PhotoFirstSections/styled';
import Image from 'next/image';
import { InfoText, TextContainer } from '/src/pages/AboutMe/SectionOne/styled';

export function AboutMeSectionThree() {
  return (
    <SectionThreeContainer id="coffee">
      <ContentContainer>
        <RightSection>
          <SectionTwoTitle>COFFEE</SectionTwoTitle>
          <ScribbleUnderlineContainer>
            <Image alt="scribbles" src="/scribbles/green-underline.png" fill />
          </ScribbleUnderlineContainer>
          <TextContainer>
            <InfoText>
              Coffee is as beautiful a drink as it is a culture creator.
            </InfoText>
            <br />
            <br />
            <InfoText>
              I absolutely love how the world of coffee connects us. Checkout
              the coffee section of my site (coming soon) for Los Angeles
              favorite spots, at home recommendations, and where to start if you
              want to get into the espresso game.
            </InfoText>
          </TextContainer>
        </RightSection>
        <LeftSection>
          <CoffeeImageContainer>
            <Image
              alt="coffee"
              src="/coffee.jpeg"
              fill
              quality={50}
              priority
              style={{ objectFit: 'cover' }}
            />
          </CoffeeImageContainer>
        </LeftSection>
      </ContentContainer>
    </SectionThreeContainer>
  );
}
