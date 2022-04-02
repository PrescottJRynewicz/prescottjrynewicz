import styled from 'styled-components';
import { solids, speckles } from '/design-system/colors';

export const FooterContainer = styled.footer`
  align-items: center;
  background-image: url(${speckles.PINK_STARBURST});
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
`;

export const FooterContentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  max-width: 1280px;
`;

export const SplitLeftContent = styled.div`
  display: flex;
  align-items: center;
  width: 50%;

  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
    margin-top: 1em;
    margin-bottom: 2em;
  }
`;

export const SplitRightContent = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;

  min-width: 150px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 80%;
  padding: 4em;

  flex-wrap: wrap;

  @media (max-width: 800px) {
    padding: 2em;
    max-width: 90%;
  }
`;

export const MenuContainer = styled.nav`
  text-align: right;
  color: white;
  display: flex;
  flex-direction: column;
  border: solid 5px ${solids.MIMOSA};
  height: fit-content;
  width: fit-content;
  border-radius: 0.5em;
  padding: 1em 2em;
`;
