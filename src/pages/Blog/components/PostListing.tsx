import React from 'react';
import { NotionPage } from '/src/types/cms/properties';
import styled from 'styled-components';
import { solids, speckles } from '/design-system/colors';
import { SubHeader1, SubHeader2 } from '/design-system/typography';
import { CategoryText, Tag } from '/src/pages/Blog/styled';
import { growOnHover } from '/styles/animations';

const Container = styled.div`
  background-image: url(${speckles.BASIC});
  background-color: ${solids.PAPER};
  width: 1100px;
  max-width: 100%;

  min-height: fit-content;
  padding: 2em;
  border-radius: 2em;
  border: 5px solid ${solids.PINK_STARBURST};
  margin-bottom: 40px;
  ${growOnHover};

  @media (prefers-color-scheme: dark) {
    background-image: url(${speckles.PINK_STARBURST});
    border: 5px solid ${solids.MIMOSA};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: pre;
  max-width: 100%;
`;

const SubHeaderTwo = styled(SubHeader2)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
  color: ${solids.PINK_STARBURST};

  @media (prefers-color-scheme: dark) {
    color: ${solids.MIMOSA};
  }
`;

const SubHeaderOne = styled(SubHeader1)`
  white-space: pre-wrap;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SubHeader1Light = styled(SubHeader2)`
  font-weight: 100;
`;

const PillContainer = styled.div`
  align-items: center;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const TagContainer = styled(PillContainer)`
  margin-top: 0;
`;

export function PostListing({ post }: { post: NotionPage }) {
  return (
    <Container>
      <TitleContainer>
        <SubHeaderOne>
          {post.icon.emoji}{' '}
          {post.properties.Title.title.map((item) => item.plain_text).join()}
          {'  '}
        </SubHeaderOne>
        <SubHeader1Light>
          {' '}
          {post?.properties?.Published?.date?.start
            ? new Date(
                post.properties.Published.date?.start as string
              ).toDateString()
            : ''}
        </SubHeader1Light>
      </TitleContainer>
      <SubHeaderTwo>
        {post.properties.Subtitle.rich_text
          .map((item) => item.plain_text)
          .join()}
      </SubHeaderTwo>
      <PillContainer>
        {post.properties.Categories.multi_select.map((cat) => (
          <CategoryText key={cat.name}>{cat.name}</CategoryText>
        ))}
        <TagContainer>
          {post.properties.Tags.multi_select.map((tag) => (
            <Tag key={tag.name}>{tag.name}</Tag>
          ))}
        </TagContainer>
      </PillContainer>
    </Container>
  );
}
