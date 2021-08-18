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
            <Image src="/scribbles/green-underline.png" layout="fill" />
          </ScribbleUnderlineContainer>
          <TextContainer>
            <InfoText>
              Coffee is as beautiful a drink as it is a culture creator.
            </InfoText>
            <br />
            <InfoText>
              Let’s be honest - true coffee flavor is an acquired test, and it
              is a little strange that we all love it so much.
            </InfoText>
            <br />
            <InfoText>
              I absolutely love how the world of coffee can connect us. Checkout
              the coffee section of my site for Los Angeles favorite spots, at
              home recommendations, and where to start if you want to get into
              the espresso game.
            </InfoText>
          </TextContainer>
        </RightSection>
        <LeftSection>
          <CoffeeImageContainer>
            <Image
              src="/coffee.jpeg"
              layout="fill"
              objectFit="cover"
              quality={50}
            />
          </CoffeeImageContainer>
        </LeftSection>
      </ContentContainer>
    </SectionThreeContainer>
  );
}
