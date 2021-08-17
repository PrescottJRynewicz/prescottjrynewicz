import styled, { css } from 'styled-components';
import React from 'react';
import { solids } from '/design-system/colors';

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
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: fit-content;
  min-height: 100vh;
  overflow-y: hidden;

  @media (max-width: 700px) {
    border: 1vh solid;
    border-image: url(${Rainbow}) 30 round;
  }
`;

export const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
  margin-bottom: 5vh;
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

  @media (max-width: 900px) {
    font-size: 64px;
  }

  @media (max-width: 500px) {
    font-size: 52px;
  }
`;

const SharedContainerWidth = css`
  width: 700px;

  @media (max-width: 900px) {
    width: 500px;
    font-size: 32px;
  }
  @media (max-width: 600px) {
    width: 300px;
  }
`;

export const SubTitle = styled.span`
  padding: 20px;
  border-radius: 30px;
  border: solid 10px;
  border-color: ${solids.MIMOSA};
  font-family: 'Brandon Grotesque';
  font-weight: bold;
  font-size: 48px;
  text-align: center;

  ${SharedContainerWidth}
`;

export const NavContainer = styled.div`
  display: flex;

  margin-top: 32px;

  justify-content: space-evenly;

  ${SharedContainerWidth}
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
        top: `${topPosition}%`,
        left: `${leftPosition}%`,
        backgroundColor: color,
        width: `${width}vw`,
        height: `${width}vw`,
        borderRadius: 100,
        zIndex: -1,
      }}
    />
  );
}
