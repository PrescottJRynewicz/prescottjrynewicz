import { css } from 'styled-components';

export const growOnHover = css`
  transition-duration: 0.3s;

  &:hover {
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
  }
`;
