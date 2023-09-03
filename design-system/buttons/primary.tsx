import styled from 'styled-components';
import { solids } from '/design-system/colors';

export const PrimaryButton = styled.button<{ textColor?: string }>`
  align-items: center;
  display: flex;
  color: ${(props) => props.textColor || 'black'};
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

  @media (prefers-color-scheme: dark) {
    border: solid 2px ${solids.PINK_STARBURST};
  }
`;
