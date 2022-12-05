import React, { MutableRefObject, useCallback } from 'react';
import { useStateRef } from '/src/hooks/useStateRef';
import ConfettiExplosion from 'react-confetti-explosion';
import { StyledComponent } from 'styled-components';

/**
 * Fun button wrapper that allow the ability to explode
 * confetti in the button when clicked
 *
 * @deprecated When upgrading to Next JS 13 this broke - need to investigate more or build a new component
 * @param Button
 * @constructor
 */
export function withConfetti<T extends object>(
  Button: StyledComponent<'button', any, T, never>
): React.FC<
  T & {
    /**
     * @deprecated Do not use this. It will not do anything
     */
    useConfetti?: boolean;
    simultaneous?: boolean;
    confettiDuration?: number;
    buttonRef?: MutableRefObject<HTMLButtonElement>;
  } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > &
    React.ComponentProps<typeof ConfettiExplosion>
> {
  /**
   * @param withConfetti Use confetti on click
   * @param simultaneous run the onClick handler at the same time as the confetti pop
   * @param children
   * @param rest
   * @constructor
   */
  return function WrappedConfettiButton({
    useConfetti = false,
    simultaneous = false,
    children,
    buttonRef,
    confettiDuration = 2000,
    ...rest
  }) {
    // @ts-ignore
    const [exploding, setExploding, explodingRef] = useStateRef(false);

    const handler = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (useConfetti && !explodingRef.current) {
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
      [useConfetti, rest.onClick]
    );

    return (
      // @ts-ignore
      <Button {...rest} onClick={handler} ref={buttonRef}>
        {/* Turned off confetti when upgrading to Next JS 13 */}
        {/* {useConfetti && exploding ( */}
        {/*  <ConfettiExplosion */}
        {/*    duration={confettiDuration} */}
        {/*    force={force} */}
        {/*    particleCount={particleCount} */}
        {/*    floorHeight={floorHeight} */}
        {/*    floorWidth={floorWidth} */}
        {/*    particleSize={particleSize} */}
        {/*  /> */}
        {/* )} */}
        {children}
      </Button>
    );
  };
}
