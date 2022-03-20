import styled from 'styled-components';
import { NakedButton } from '/design-system/buttons/naked';
import { solids } from '/design-system/colors';
import { growOnHover } from '/styles/animations';

export const MenuButton = styled(NakedButton)`
  position: absolute;
  top: 5vh;
  right: 5vw;
`;

export const HamburgerBorder = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuPrimaryLink = styled.a`
  font-family: 'Brandon Grotesque';
  font-size: 24px;
  font-weight: bold;

  margin: 10px 0;
  ${growOnHover}
`;

export const MenuSecondaryLink = styled(MenuPrimaryLink)`
  font-weight: normal;
`;

export const MenuDivider = styled.div`
  background-color: black;
  width: 125px;
  height: 1px;
`;

export const HamburgerContainer = styled.div`
  padding: 10px 10px 5px 10px;
  border: solid 3px ${solids.PINK_STARBURST};
  border-radius: 10px;

  @media (max-width: 700px) {
    transform: scale(0.8);
  }
`;
