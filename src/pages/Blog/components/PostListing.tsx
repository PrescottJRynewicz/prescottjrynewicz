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
`;

const TitleContainer = styled.div`
  display: flex;
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

const SubHeader1Light = styled(SubHeader1)`
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

export const PostListing = ({ post }: { post: NotionPage }) => (
  <Container>
    <TitleContainer>
      <SubHeaderOne>
        {post.icon.emoji}{' '}
        {post.properties.Title.title.map((item) => item.plain_text).join()}
        {'  '}
      </SubHeaderOne>
      <SubHeader1Light>
        {' '}
        {new Date(post.properties.Created.created_time).toDateString()}
      </SubHeader1Light>
    </TitleContainer>
    <SubHeaderTwo style={{ color: solids.PINK_STARBURST }}>
      {post.properties.Subtitle.rich_text.map((item) => item.plain_text).join()}
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
