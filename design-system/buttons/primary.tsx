import styled from 'styled-components';
import { ConfettiButtonWrapper } from '/design-system/buttons/confettiWrapper';

export const _PrimaryButton = styled.button`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid 1px black;
  border-radius: 5px;
  background-color: blanchedalmond;
  font-family: 'Brandon Grotesque';
  font-size: 24px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const PrimaryButton = ConfettiButtonWrapper(_PrimaryButton);
