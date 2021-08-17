import styled from 'styled-components';
import { ConfettiButtonWrapper } from '/design-system/buttons/confettiWrapper';

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

export const NakedButton = ConfettiButtonWrapper(Button);
