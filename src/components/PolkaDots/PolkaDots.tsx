import React from 'react';
import { colors } from '/src/pages/Home/styled';

export const dotClassname = 'dot-class-id';

function getRandomSplatterElement(index: number, className = dotClassname) {
  const topPosition = Math.random() * 98;
  const leftPosition = Math.random() * 98;
  const color = Object.values(colors)[Math.floor(Math.random() * 3.99)];
  const width = Math.random();

  return (
    // Parent span for the ability to animate in multiple dimensions
    <span
      key={index}
      style={{
        position: 'absolute',
        top: `${topPosition}%`,
        left: `${leftPosition}%`,
        width: '5px',
        height: '5px',
        zIndex: 10,
      }}>
      <span
        key={index}
        className={className}
        style={{
          position: 'absolute',
          backgroundColor: color,
          width: `${width}vw`,
          height: `${width}vw`,
          borderRadius: 100,
        }}
      />
    </span>
  );
}

export function PolkaDots({
  numDots,
  customClassname,
}: {
  numDots: number;
  customClassname?: string;
}) {
  return (
    <>
      {new Array(numDots)
        .fill(0)
        .map((_value, index) =>
          getRandomSplatterElement(index, customClassname)
        )}
    </>
  );
}
