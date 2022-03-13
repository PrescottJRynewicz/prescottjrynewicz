import React from 'react';

import { Container } from './styled';
import { colors } from '/src/pages/Home/styled';

function getMonthsSinceBirth() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const lastYear = now.getFullYear() - 1;
  const birthYearPlusOne = 1995;
  const monthsInBirthYear = 8;

  return (
    (lastYear - birthYearPlusOne) * 12 + monthsInBirthYear + currentMonth + 1
  );
}

function timelineCurve(x: number) {
  return (
    -0.1305361 +
    8.198252 * x -
    9.643648 * x ** 2 +
    3.688666 * x ** 3 -
    0.5597319 * x ** 4 +
    0.02916667 * x ** 5
  );
}
const totalRepeats = 3;
const totalXPoints = 8;
const yScaleFactory = 10;
const yOffset = 50;

function buildTimeline() {
  const monthsToPlot = getMonthsSinceBirth();
  const pointsPerPlot = Math.floor(monthsToPlot / totalRepeats);

  return new Array(monthsToPlot).fill(0).map((_value, index) => {
    const color = Object.values(colors)[Math.floor(Math.random() * 3.99)];
    const width = Math.random() + 3;

    const verticalPosition = index * yScaleFactory + yOffset;
    const xCoordMap = ((index % pointsPerPlot) / pointsPerPlot) * totalXPoints;
    // const xCoordMap = (index / monthsToPlot) * totalXPoints;
    const leftPosition = timelineCurve(xCoordMap) * 10 + 50 - width / 2;

    return (
      <span
        style={{
          position: 'absolute',
          top: `${verticalPosition}vh`,
          left: `${leftPosition}vw`,
          width: '5px',
          height: '5px',
          zIndex: -1,
        }}>
        <span
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
  });
}

export function Chronos() {
  const elements = buildTimeline();
  return (
    <Container
      style={{
        height: `${getMonthsSinceBirth() * yScaleFactory + yOffset}vh`,
      }}>
      {elements}
    </Container>
  );
}
