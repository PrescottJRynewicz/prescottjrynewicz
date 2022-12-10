import styled, { css } from 'styled-components';

export const fonts = {
  Shrimp: 'Shrimp',
  Brandon: 'Brandon Grotesque',
  Avenir: 'Avenir',
};

const mutedMixin = css<{ muted?: boolean }>`
  color: ${(props) => (props.muted ? 'var(--color-muted)' : '')};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => (props.muted ? 'var(--color-dark)' : '')};
    opacity: ${(props) => (props.muted ? 0.8 : 1)};
  }
`;

export const Header1 = styled.h1`
  font-family: Shrimp, 'Brandon Grotesque', -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;

  font-size: 8em;

  @media (max-width: 700px) {
    font-size: 4em;
  }
  ${mutedMixin}
`;

export const Header3 = styled.h3`
  font-family: Shrimp, 'Brandon Grotesque', -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;

  font-size: 4em;
  margin: 1em 0 0;

  @media (max-width: 700px) {
    font-size: 2em;
  }
`;

export const SubHeader1 = styled.h1`
  font-family: 'Brandon Grotesque', -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  font-size: 2em;

  margin: 0.25em 0;

  @media (max-width: 700px) {
    font-size: 1.25em;
  }
`;

export const SubHeader2 = styled.h2`
  font-family: 'Brandon Grotesque', -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  font-size: 1.75em;

  margin: 0.25em 0;

  @media (max-width: 700px) {
    font-size: 1.25em;
  }
`;

export const SubHeader3 = styled.h3`
  font-family: 'Brandon Grotesque', -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  font-size: 1.25em;

  margin: 0.25em 0;

  @media (max-width: 700px) {
    font-size: 1em;
  }
  ${mutedMixin}
`;
