import styled from 'styled-components';
import { solids, speckles } from '/design-system/colors';

export const TopSectionContainer = styled.div`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  background-image: url(${speckles.MIMOSA});
  height: fit-content;
  min-height: 100vh;
  width: 100vw;
`;

export const Title = styled.h1`
  font-size: 128px;
  color: white;
  font-family:
    Shrimp,
    'Brandon Grotesque',
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    Fira Sans,
    Droid Sans,
    Helvetica Neue,
    sans-serif;
  margin: 40px 0;
  text-align: center;

  @media (max-width: 1250px) {
    font-size: 96px;
  }

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
  justify-content: space-around;
  flex-wrap: wrap-reverse;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const RightSection = styled.div`
  align-items: center;
  display: flex;

  @media (max-width: 950px) {
    padding-top: 100px;
  }
  max-width: 100%;
`;

export const TextContainer = styled.div`
  background-image: url(${speckles.MILK});
  width: 575px;
  height: fit-content;
  border-radius: 10px;
  border: solid ${solids.AGUA} 5px;
  padding: 25px;
  box-shadow: rgba(0, 0, 0, 0.25) 10px 10px 10px;

  margin-bottom: 50px;

  max-width: 100%;

  @media (max-width: 1250px) {
    width: 450px;
  }
`;

export const InfoText = styled.p`
  font-family: 'Brandon Grotesque';
  font-size: 24px;
  margin: 0;

  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ImageContainer = styled.div`
  width: 400px;
  position: relative;
  border-radius: 30px;
  border: solid 5px ${solids.GRASSHOPPER};
  box-shadow: rgba(0, 0, 0, 0.25) 10px 10px 10px;
  overflow: hidden;
  height: 500px;

  @media (max-width: 1250px) {
    width: 300px;
    height: ${300 * 1.25}px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
