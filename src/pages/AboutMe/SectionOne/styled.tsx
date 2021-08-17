import styled from 'styled-components';
import { solids, speckles } from '/design-system/colors';
import Image from 'next/image';

export const TopSectionContainer = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
  background-image: url(${speckles.MIMOSA});
  height: 100vh;
  width: 100vw;
`;

export const Title = styled.h1`
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

export const ContentContainer = styled.div`
  display: flex;
  width: 80%;
  margin-top: 5vh;
  max-width: 1200px;
  justify-content: space-between;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightSection = styled.div`
  display: flex;
`;

export const TextContainer = styled.div`
  background-image: url(${speckles.MILK});
  width: 575px;
  height: 321px;
  border-radius: 10px;
  border: solid ${solids.AGUA} 5px;
  padding: 25px;
`;

export const InfoText = styled.p`
  font-family: 'Brandon Grotesque';
  font-size: 24px;
  margin: 0;
`;

export const ImageContainer = styled.div`
  width: 400px;
  position: relative;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 10px 10px 10px;
`;

export const PrimaryImage = styled(Image)`
  border-radius: 30px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
