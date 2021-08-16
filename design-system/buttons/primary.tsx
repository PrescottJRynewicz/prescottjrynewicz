import React, { DOMAttributes, useCallback, useRef } from 'react';
import styled from 'styled-components';
import ConfettiExplosion from '@reonomy/react-confetti-explosion';
import { useStateRef } from '/src/hooks/useStateRef';

export const Button = styled.button`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid 1px black;
  border-radius: 5px;
  background-color: blanchedalmond;
  font-family: 'Brandon Grotesque';
  font-size: 24px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const PrimaryButton: React.FC<
  {
    withConfetti?: boolean;
    simultaneous?: boolean;
  } & DOMAttributes<HTMLButtonElement>
> = ({ withConfetti = false, simultaneous = false, children, ...rest }) => {
  const [exploding, setExploding, explodingRef] = useStateRef(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const confettiDuration = 2000;

  const handler = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (withConfetti && !explodingRef.current) {
        setExploding(true);
        if (simultaneous && rest.onClick) rest.onClick(event);
        setTimeout(() => {
          setExploding(false);

          if (!simultaneous && rest.onClick) rest.onClick(event);
        }, confettiDuration);
      } else if (rest.onClick) {
        rest.onClick(event);
      }
    },
    [withConfetti, rest.onClick]
  );

  return (
    <Button {...rest} onClick={handler} ref={buttonRef}>
      {withConfetti && exploding && (
        <ConfettiExplosion
          duration={confettiDuration}
          force={0.2}
          particleCount={60}
          floorHeight={1000}
          floorWidth={300}
        />
      )}
      {children}
    </Button>
  );
};
