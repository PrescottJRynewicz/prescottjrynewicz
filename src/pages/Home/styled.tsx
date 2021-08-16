import styled from 'styled-components';
import React from 'react';

const Rainbow = '/rainbow-bar.png';

export const colors = Object.freeze({
  Red: '#D32A2A',
  Green: '#41BE4E',
  Blue: '#1E58ED',
  Yellow: '#E9D520',
} as const);

export const Container = styled.div`
  border: 1vw solid;
  border-image: url(${Rainbow}) 30 round;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`;

export const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const BreathingCircle = styled.span`
  background-color: ${colors.Green};
  width: 2vw;
  height: 2vw;
  border-radius: 10vw;
  position: absolute;
  left: 49vw;
  top: 46vh;
`;

export const Title = styled.h1`
  font-size: 128px;
  font-family: Shrimp, 'Brandon Grotesque', -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;
  margin: 10px 0;

  @media (max-width: 700px) {
    font-size: 64px;
  }

  @media (max-width: 500px) {
    font-size: 52px;
  }
`;

export const MakeItRain = styled.button`
  font-family: 'Brandon Grotesque', -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  font-size: 24px;
  color: ${colors.Green};
  background: blanchedalmond;
  border: solid 2px black;
  border-radius: 5px;
`;

export const numDots = 300;
export const dotClassname = 'dot-class-id';

export function getRandomSplatterElement(index: number) {
  const topPosition = Math.random() * 98;
  const leftPosition = Math.random() * 98;
  const color = Object.values(colors)[Math.floor(Math.random() * 3.99)];
  const width = Math.random();

  return (
    <span
      key={index}
      className={dotClassname}
      style={{
        position: 'absolute',
        top: `${topPosition}vh`,
        left: `${leftPosition}vw`,
        backgroundColor: color,
        width: `${width}vw`,
        height: `${width}vw`,
        borderRadius: 100,
        zIndex: -1,
      }}
    />
  );
}
