import styled from 'styled-components';
import { solids, speckles } from '/design-system/colors';
import React from 'react';
import { PeekABoo } from '/src/components/PeekABoo/PeekABoo';
import { Menu } from '/src/components/Menu/Menu';
import { PrimaryButton } from '/design-system/buttons/primary';
import Image from 'next/image';
import styles from './AboutMe.module.css';

const TopSectionContainer = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
  background-image: url(${speckles.MIMOSA});
  height: 100vh;
  width: 100vw;
`;

const Title = styled.h1`
  font-size: 128px;
  color: white;
  font-family: Shrimp, 'Brandon Grotesque', -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;
  margin: 10px 0;

  @media (max-width: 700px) {
    font-size: 64px;
  }

  @media (max-width: 500px) {
    font-size: 52px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 5vh 10vw;
  width: 80%;
  max-width: 1400px;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightSection = styled.div`
  display: flex;
`;

const TextContainer = styled.div`
  background-image: url(${speckles.MILK});
  width: 575px;
  height: 321px;
  border-radius: 10px;
  border: solid ${solids.AGUA} 5px;
  padding: 25px;
`;

const InfoText = styled.p`
  font-family: 'Brandon Grotesque';
  font-size: 24px;
  margin: 0;
`;

const ImageContainer = styled.div`
  width: 400px;
  position: relative;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 10px 10px 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const AboutMeSectionOne = () => (
  <TopSectionContainer>
    <Menu />
    <PeekABoo withConfetti animationDelay={2} />
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
          <Image
            src="/me.jpeg"
            layout="fill"
            quality={10}
            objectFit="cover"
            className={styles.sectionOnePhoto}
          />
        </ImageContainer>
      </RightSection>
    </ContentContainer>
  </TopSectionContainer>
);
