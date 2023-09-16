import styled, { css, keyframes } from 'styled-components';
import { solids, speckles, textures } from '/design-system/colors';
import { Header3 } from '/design-system/typography';
import Image from 'next/image';

const fadeIn = keyframes`
  to {
    opacity: 100%;
  }
`;

const BackgroundMixin = css`
  @media (prefers-color-scheme: dark) {
    background-image: url(${speckles.DARK_KNIGHT});
  }
`;

export const BlogContainer = styled.div`
  opacity: 0;
  animation: ${fadeIn} 2s forwards;
`;

export const BlogPostContainer = styled.div`
  background-image: url(${speckles.BASIC_LOW});
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;

  ${BackgroundMixin};
`;

export const BlogPostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20vh;
  width: 1280px;
  max-width: 85%;
  margin-bottom: 5vh;
`;

export const BlogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10vh;
  width: 1280px;
  max-width: 80%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PublishedOnContainer = styled.div`
  color: ${solids.DARK_KNIGHT};
  font-family: 'Avenir Next';
  font-weight: 600;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${Header3};
`;

export const LikeContainer = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
  margin: 1em 0 0 10px;
`;

export const CategoryText = styled.span`
  background-color: ${solids.DARK_KNIGHT};
  color: white;
  border-radius: 2em;
  padding: 0.5em 1em;
  font-weight: 400;
  margin-right: 1em;
  margin-top: 20px;

  @media (prefers-color-scheme: dark) {
    background-image: url(${speckles.PINK_STARBURST});
  }
`;

export const Tag = styled.span`
  background-image: url(${textures.PINK_STARBURST});
  border-radius: 2em;
  padding: 0.5em 1em;
  margin-right: 1em;
  margin-top: 20px;

  @media (prefers-color-scheme: dark) {
    background-image: url(${speckles.PAPER});
    color: black;
  }
`;

export const Divider = styled.span`
  background-image: url(${speckles.DARK_KNIGHT});
  height: 1em;
  width: 100%;
  margin: 2em 0;

  @media (prefers-color-scheme: dark) {
    background-image: url(${speckles.PAPER});
  }
`;

export const CommentContainer = styled.a`
  display: inline-flex;
  align-items: center;
  border: solid 1px black;
  border-radius: 10px;
  padding: 5px 10px;
  width: fit-content;
  margin-top: 20px;

  @media (prefers-color-scheme: dark) {
    border: solid 3px ${solids.PAPER};
    background-image: url(${speckles.PINK_STARBURST});
  }
`;

export const CoverImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: fit-content;
  max-height: 50vh;
  border: solid 3px ${solids.PINK_STARBURST};
  border-radius: 10px;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`;

export const SearchInput = styled.input`
  background-color: transparent;
  border: solid ${solids.DARK_KNIGHT};
  border-width: 0 0 2px;
  padding: 10px 20px 10px 10px;

  font-size: 24px;

  font-family:
    'Brandon Grotesque',
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    Fira Sans,
    Droid Sans,
    Helvetica Neue,
    sans-serif;
  &:focus {
    outline: none;
  }
`;
