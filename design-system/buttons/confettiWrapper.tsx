import React, { DOMAttributes, useCallback, useRef } from 'react';
import { useStateRef } from '/src/hooks/useStateRef';
import ConfettiExplosion from '@reonomy/react-confetti-explosion';
import { _PrimaryButton } from './primary';

/**
 * Fun button wrapper that allow the ability to explode
 * confetti in the button when clicked
 *
 * @param Button
 * @constructor
 */
export const ConfettiButtonWrapper = (
  Button: typeof _PrimaryButton
): React.FC<
  {
    withConfetti?: boolean;
    simultaneous?: boolean;
  } & DOMAttributes<HTMLButtonElement>
> =>
  /**
   * @param withConfetti Use confetti on click
   * @param simultaneous run the onClick handler at the same time as the confetti pop
   * @param children
   * @param rest
   * @constructor
   */
  function WrappedConfettiButton({
    withConfetti = false,
    simultaneous = false,
    children,
    ...rest
  }) {
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
