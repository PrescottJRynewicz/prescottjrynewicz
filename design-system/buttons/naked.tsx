import styled from 'styled-components';
import { withConfetti } from '/design-system/buttons/utils/withConfetti';

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-family: 'Brandon Grotesque';
  font-size: 24px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const NakedButton = withConfetti(Button);
