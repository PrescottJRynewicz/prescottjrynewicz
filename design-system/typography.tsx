import styled, { css } from 'styled-components';
import { Shrimp } from '/src/fonts/fonts';

export const fonts = {
  Shrimp: 'Shrimp',
  Brandon: 'Brandon Grotesque',
  Avenir: 'Avenir',
};

type MutedProps = { muted?: boolean };

const mutedMixin = css<MutedProps>`
  color: ${(props) => (props.muted ? 'var(--color-muted)' : '')};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => (props.muted ? 'var(--color-dark)' : '')};
    opacity: ${(props) => (props.muted ? 0.8 : 1)};
  }
`;

export const Header1 = styled.h1.attrs({
  className: Shrimp.className,
})<MutedProps>`
  font-size: 8em;

  @media (max-width: 700px) {
    font-size: 4em;
  }
  ${mutedMixin}
`;

export const Header3 = styled.h3.attrs({ className: Shrimp.className })`
  font-size: 4em;
  margin: 1em 0 0;

  @media (max-width: 700px) {
    font-size: 2em;
  }
`;

export const SubHeader1 = styled.h1`
  font-size: 2em;

  margin: 0.25em 0;

  @media (max-width: 700px) {
    font-size: 1.25em;
  }
`;

export const SubHeader2 = styled.h2`
  font-size: 1.75em;

  margin: 0.25em 0;

  @media (max-width: 700px) {
    font-size: 1.25em;
  }
`;

export const SubHeader3 = styled.h3<MutedProps>`
  font-size: 1.25em;

  margin: 0.25em 0;

  @media (max-width: 700px) {
    font-size: 1em;
  }
  ${mutedMixin}
`;
