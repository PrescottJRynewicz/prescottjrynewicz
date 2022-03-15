import React from 'react';
import { NotionPage } from '/src/types/cms/properties';
import styled from 'styled-components';
import { solids, speckles } from '/design-system/colors';
import { SubHeader1, SubHeader2 } from '/design-system/typography';

const Container = styled.div`
  background-image: url(${speckles.PAPER});
  width: 1100px;
  max-width: 90%;
  height: 200px;
  padding: 1em;
  border-radius: 2em;
  border: 5px solid ${solids.PINK_STARBURST};
  margin-bottom: 10px;
`;

export const PostListing = ({ post }: { post: NotionPage }) => (
  <Container>
    <SubHeader1>
      {post.properties.Title.title.map((item) => item.plain_text).join()} ·{' '}
      {new Date(post.properties.Created.created_time).toDateString()}
    </SubHeader1>
    <SubHeader2 style={{ color: solids.PINK_STARBURST }}>
      {post.properties.Subtitle.rich_text.map((item) => item.plain_text).join()}
    </SubHeader2>
  </Container>
);
