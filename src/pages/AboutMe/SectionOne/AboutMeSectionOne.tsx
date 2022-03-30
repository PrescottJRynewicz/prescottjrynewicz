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
      <PeekABoo useConfetti animationDelay={2} />
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
              <PrimaryButton
                textColor="green"
                useConfetti
                simultaneous
                onClick={handleNav('cycling')}>
                Cycling
              </PrimaryButton>
              <PrimaryButton
                textColor={solids.RUST}
                useConfetti
                simultaneous
                onClick={handleNav('coffee')}>
                Coffee
              </PrimaryButton>
              <PrimaryButton
                useConfetti
                simultaneous
                onClick={handleNav('code')}>
                Code
              </PrimaryButton>
            </ButtonContainer>
          </TextContainer>
        </LeftSection>
        <RightSection>
          <ImageContainer>
            <Image
              src="/me.jpeg"
              layout="fill"
              objectFit="cover"
              quality={50}
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
