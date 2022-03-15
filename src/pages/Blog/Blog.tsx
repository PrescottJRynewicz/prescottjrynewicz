import React from 'react';
import { BlogGetResponse } from '/src/types/api/blog';
import Link from 'next/link';
import { BlogContentWrapper, BlogPostContainer } from '/src/pages/Blog/styled';
import { Menu } from '/src/components/Menu/Menu';
import { PeekABoo } from '/src/components/PeekABoo/PeekABoo';
import { Header1 } from '/design-system/typography';
import { PostListing } from '/src/pages/Blog/components/PostListing';

export type BlogStaticProps = {
  posts: BlogGetResponse['posts'];
};

export const Blog = (props: BlogStaticProps) => (
  <>
    <Menu />
    <PeekABoo useConfetti animationDelay={2} />
    <BlogPostContainer>
      <BlogContentWrapper>
        <Header1>BLOG</Header1>
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
  </>
);
