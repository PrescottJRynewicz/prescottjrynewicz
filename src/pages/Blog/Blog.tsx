import React from 'react';
import { BlogGetResponse } from '/src/types/api/blog';
import Link from 'next/link';
import {
  BlogContainer,
  BlogContentWrapper,
  BlogPostContainer,
  Divider,
} from '/src/pages/Blog/styled';
import { Menu } from '/src/components/Menu/Menu';
import { PeekABoo } from '/src/components/PeekABoo/PeekABoo';
import { Header1 } from '/design-system/typography';
import { PostListing } from '/src/pages/Blog/components/PostListing';

export type BlogStaticProps = {
  posts: BlogGetResponse['posts'];
};

export const Blog = (props: BlogStaticProps) => (
  <BlogContainer>
    <Menu />
    <PeekABoo useConfetti animationDelay={2} />
    <BlogPostContainer>
      <BlogContentWrapper>
        <Header1 style={{ marginBottom: '0px' }}>BLOG</Header1>
        <Divider />
        {props.posts.map((post) => {
          const postName = post.properties.Title.title
            .map((item) => item.plain_text)
            .join();
          return (
            <Link href={`blog/${postName.replace(/\s/g, '-')}`}>
              <a>
                <PostListing post={post} />
              </a>
            </Link>
          );
        })}
      </BlogContentWrapper>
    </BlogPostContainer>
  </BlogContainer>
);
