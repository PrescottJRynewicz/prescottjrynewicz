import styled, { keyframes } from 'styled-components';
import { NakedButton } from '/design-system/buttons/naked';
import Image from 'next/image';
import React, { RefObject } from 'react';

const SlideIn = keyframes`
  to {
  opacity: 100%;
  }
`;

type Props = { animationDelay: number };
const PeekABooWrapper = styled(NakedButton)<Props>`
  opacity: 0;
  animation: ${SlideIn} 1s ease-in-out forwards;
  animation-delay: ${(props) => props.animationDelay}s;
  position: absolute;
  width: 100px;
  height: 100px;

  top: 10vh;
  left: -70px;
  border-radius: 100px;
  transform: rotate(80deg);

  transition: 1s;

  &:hover {
    left: -40px;
    cursor: pointer;
  }

  @media (max-width: 700px) {
    width: 70px;
    height: 70px;
    left: -50px;
  }
`;

const CustomImage = styled(Image)`
  border-radius: 100px;
`;

export function PeekABoo(
  props: React.ComponentProps<typeof NakedButton> &
    Props & { ref?: RefObject<HTMLButtonElement> }
) {
  return (
    <PeekABooWrapper {...props}>
      <CustomImage src="/peek-a-boo.png" layout="fill" quality={5} />
    </PeekABooWrapper>
  );
}
