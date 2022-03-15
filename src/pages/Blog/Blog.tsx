import React from 'react';
import { BlogGetResponse } from '/src/types/api/blog';
import styled from 'styled-components';
import { Properties } from '/src/types/cms/properties';
import Link from 'next/link';

export type BlogStaticProps = {
  posts: BlogGetResponse['posts'];
};

const Container = styled.div`
  width: 100%;
  background-color: antiquewhite;
`;

export const Blog = (props: BlogStaticProps) => (
  <Container>
    <ol>
      {props.posts.map((post) => {
        if ('properties' in post) {
          const title = post.properties[Properties.Title];
          if ('title' in title) {
            const postName = title.title.map((item) => item.plain_text).join();
            return (
              <li>
                <Link href={`blog/${postName.replace(/\s/g, '-')}`}>
                  <a>{postName}</a>
                </Link>
              </li>
            );
          }
        }
        return null;
      })}
    </ol>
  </Container>
);
