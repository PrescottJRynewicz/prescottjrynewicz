import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  to {
    opacity: 100%;
  }
`;

export const AboutMeContainer = styled.div`
  opacity: 0;
  animation: ${fadeIn} 2s forwards;
  display: flex;
  flex-direction: column;

  scroll-behavior: smooth;
`;
