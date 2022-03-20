import styled from 'styled-components';

export const fonts = {
  Shrimp: 'Shrimp',
  Brandon: 'Brandon Grotesque',
  Avenir: 'Avenir',
};

export const Header1 = styled.h1`
  font-family: Shrimp, 'Brandon Grotesque', -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;

  font-size: 8em;

  @media (max-width: 700px) {
    font-size: 4em;
  }
`;

export const Header2 = styled.h2`
  font-family: Shrimp, 'Brandon Grotesque', -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;

  font-size: 6em;

  @media (max-width: 700px) {
    font-size: 3em;
  }
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
`;
