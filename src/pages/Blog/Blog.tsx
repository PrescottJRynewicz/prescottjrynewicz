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
import Head from 'next/head';
import styled from 'styled-components';
import { solids } from '/design-system/colors';
import { ChevronLeft } from 'react-feather';

export type BlogStaticProps = {
  posts: BlogGetResponse['posts'];
  categories: string[];
  category?: string;
};

const CategoryLink = styled.a`
  color: ${solids.PINK_STARBURST};
  font-weight: bold;
  font-size: 1.5em;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Blog = (props: BlogStaticProps) => {
  const isCategoryPage = !!props.category;

  return (
    <BlogContainer>
      <Head>
        <title>PJR - {isCategoryPage ? props.category : 'Blog'}</title>
        <meta name="description" content="Prescott's Playground 🎢" />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:image" content="/site-image.png" />
        <meta name="twitter:title" content="PrescottJR" />
        <meta name="twitter:description" content="Prescott's Playground" />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="twitter:image:alt" content="Prescott's Playground" />
      </Head>
      <Menu />
      <PeekABoo useConfetti animationDelay={2} />
      <BlogPostContainer>
        <BlogContentWrapper>
          <Header1 style={{ marginBottom: '0px' }}>
            {isCategoryPage ? props.category?.toUpperCase() : 'BLOG'}
          </Header1>
          {!isCategoryPage ? (
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {(props.categories || []).map((category) => (
                <>
                  <Link href={`/blog/category/${category}`}>
                    <CategoryLink>{category}</CategoryLink>
                  </Link>
                  {'          '}
                </>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ChevronLeft color={solids.PINK_STARBURST} />
              <Link href="/blog">
                <CategoryLink>Home</CategoryLink>
              </Link>
            </div>
          )}
          <Divider />
          {(props.posts || []).map((post) => {
            const postName = post.properties.Title.title
              .map((item) => item.plain_text)
              .join();
            return (
              <Link
                key={postName}
                href={`/blog/${postName.replace(/\s/g, '-')}`}>
                <a>
                  <PostListing post={post} key={postName} />
                </a>
              </Link>
            );
          })}
        </BlogContentWrapper>
      </BlogPostContainer>
    </BlogContainer>
  );
};
