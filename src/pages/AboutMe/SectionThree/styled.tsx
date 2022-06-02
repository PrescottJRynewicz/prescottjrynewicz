import styled from 'styled-components';
import { solids, speckles } from '/design-system/colors';

export const SectionThreeContainer = styled.div`
  align-items: center;
  justify-content: center;
  background-image: url(${speckles.RUST});
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
  flex-wrap: wrap-reverse;
`;

export const CoffeeImageContainer = styled.div`
  height: 650px;
  width: ${500}px;
  position: relative;
  border-radius: 30px;
  border: solid 10px ${solids.MIMOSA};
  box-shadow: rgba(0, 0, 0, 0.25) 10px 10px 10px;
  overflow: hidden;

  max-width: 100%;

  @media (max-width: 1400px) {
    height: 500px;
    width: ${(500 / 650) * 500}px;
  }
`;
