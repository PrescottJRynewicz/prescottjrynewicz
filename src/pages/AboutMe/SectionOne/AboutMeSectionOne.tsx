import { solids, speckles } from '/design-system/colors';
import Image from 'next/image';
import React, { useCallback } from 'react';
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
} from '/src/pages/AboutMe/SectionOne/styled';
import { useRouter } from 'next/router';

export function AboutMeSectionOne() {
  const router = useRouter();

  const handleNav = useCallback(
    (elementId: string) => () => {
      router.push(`/about-me#${elementId}`);
    },
    [router]
  );

  return (
    <TopSectionContainer>
      <Menu />
      <PeekABoo animationDelay={2} />
      <ContentContainer>
        <LeftSection>
          <Title>WHO I BE</Title>
          <TextContainer>
            <InfoText>👋🏻👋🏻👋🏻 Hello! 👋🏻👋🏻👋🏻</InfoText>
            <InfoText>
              My name is Prescott. I am a bicycle loving, espresso drinking
              software engineer from Los Angeles.
            </InfoText>
            <br />
            <InfoText>Checkout some of these passions below</InfoText>
            <ButtonContainer>
              <PrimaryButton textColor="green" onClick={handleNav('cycling')}>
                Cycling
              </PrimaryButton>
              <PrimaryButton
                textColor={solids.RUST}
                onClick={handleNav('coffee')}>
                Coffee
              </PrimaryButton>
              <PrimaryButton onClick={handleNav('code')}>Code</PrimaryButton>
            </ButtonContainer>
          </TextContainer>
        </LeftSection>
        <RightSection>
          <ImageContainer>
            <Image
              alt="prescott"
              src="/me.jpeg"
              fill
              quality={50}
              style={{ objectFit: 'cover' }}
              priority
              placeholder="blur"
              blurDataURL={speckles.MIMOSA}
            />
          </ImageContainer>
        </RightSection>
      </ContentContainer>
    </TopSectionContainer>
  );
}
