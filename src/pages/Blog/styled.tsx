import styled from 'styled-components';
import { solids, speckles, textures } from '/design-system/colors';

export const BlogPostContainer = styled.div`
  //background-image: url(${speckles.MILK});
  background-image: url(${speckles.BASIC});
  background-color: ${solids.MILK};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const BlogPostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20vh;
  width: 1280px;
  max-width: 80%;
`;

export const PostCoverContainer = styled.div`
  position: relative;
  border-radius: 30px;
  border: solid 3px ${solids.PINK_STARBURST};
  box-shadow: rgba(0, 0, 0, 0.25) 10px 10px 10px;
  overflow: hidden;
  width: 100%;
  height: 500px;

  @media (max-width: 700px) {
    height: 300px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CategoryText = styled.span`
  font-weight: 600;
  font-size: 1.25em;
  margin-right: 1em;
`;

export const Tag = styled.span`
  background-image: url(${textures.PINK_STARBURST});
  background-color: gray;
  border-radius: 2em;
  padding: 0.5em 1em;
  margin-right: 1em;
`;

export const Divider = styled.span`
  background-image: url(${speckles.DARK_KNIGHT});
  height: 1em;
  width: 100%;
  margin: 2em 0;
`;
