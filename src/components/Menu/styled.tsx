import styled from 'styled-components';

export const Button = styled.div`
  &:hover {
    cursor: pointer;
  }
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
`;

export const MenuSecondaryLink = styled(MenuPrimaryLink)`
  font-weight: normal;
`;

export const MenuDivider = styled.div`
  background-color: black;
  width: 125px;
  height: 1px;
`;
