import { solids } from '/design-system/colors';
import React from 'react';
import { PeekABoo } from '/src/components/PeekABoo/PeekABoo';
import { Menu } from '/src/components/Menu/Menu';
import { PrimaryButton } from '/design-system/buttons/primary';
import {
  ContentContainer,
  ImageContainer,
  ButtonContainer,
  TextContainer,
  InfoText,
  Title,
  RightSection,
  TopSectionContainer,
  LeftSection,
  PrimaryImage,
} from '/src/pages/AboutMe/SectionOne/styled';

export const AboutMeSectionOne = () => (
  <TopSectionContainer>
    <Menu />
    <PeekABoo useConfetti animationDelay={2} />
    <ContentContainer>
      <LeftSection>
        <Title>WHO AM I</Title>
        <TextContainer>
          <InfoText>👋🏻👋🏻👋🏻Hello!👋🏻👋🏻👋🏻</InfoText>
          <InfoText>
            My name is Prescott. I am a bicycle loving, espresso drinking
            software engineer from Los Angeles.{' '}
          </InfoText>
          <br />
          <InfoText>
            It’s hard for me to not fall in love with what I do. Check out some
            of those passions below
          </InfoText>
          <ButtonContainer>
            <PrimaryButton textColor="green">Cycling</PrimaryButton>
            <PrimaryButton textColor={solids.RUST}>Coffee</PrimaryButton>
            <PrimaryButton>Code</PrimaryButton>
          </ButtonContainer>
        </TextContainer>
      </LeftSection>
      <RightSection>
        <ImageContainer>
          <PrimaryImage
            src="/me.jpeg"
            layout="fill"
            quality={10}
            objectFit="cover"
          />
        </ImageContainer>
      </RightSection>
    </ContentContainer>
  </TopSectionContainer>
);
