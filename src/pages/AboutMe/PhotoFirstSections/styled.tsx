import styled from 'styled-components';
import { solids } from '/design-system/colors';
import { Title } from '/src/pages/AboutMe/SectionOne/styled';

export const SectionTwoContainer = styled.div`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  height: fit-content;
  min-height: 100vh;
  position: relative;
  width: 100vw;
`;

export const ContentContainer = styled.div`
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  padding: 10vw 5vw;
  width: 100vw;
  flex-wrap: wrap;
`;

export const StravaLink = styled.a`
  color: #fc4c02;

  &:hover {
    text-decoration: underline;
  }
`;

export const LeftSection = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const RightSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 1050px) {
    padding-top: 25px;
  }
  max-width: 100%;
`;

export const CyclingImageContainer = styled.div`
  width: 600px;
  height: ${600 * (3 / 4)}px;
  position: relative;
  border-radius: 30px;
  border: solid 10px ${solids.YELLOW};
  box-shadow: rgba(0, 0, 0, 0.25) 10px 10px 10px;
  overflow: hidden;

  max-width: 100%;

  @media (max-width: 1400px) {
    width: 500px;
    height: ${500 * 0.75}px;
  }
`;

export const SectionTwoTitle = styled(Title)`
  color: black;
  margin-bottom: 10px;
`;

export const ScribbleUnderlineContainer = styled.div`
  position: relative;
  width: 400px;
  height: 91px;
  margin-bottom: 25px;

  max-width: 100%;
`;
