import styled from 'styled-components';

const Rainbow = '/rainbow-bar.png';

export const Container = styled.div`
  border: solid;
  border-width: 1vw 1vw 0 1vw;
  border-image: url(${Rainbow}) 30 round;
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: fit-content;
  min-height: 100vh;

  @media (max-width: 700px) {
    border: 1vh solid;
    border-image: url(${Rainbow}) 30 round;
  }
`;
