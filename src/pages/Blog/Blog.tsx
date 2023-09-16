import React from 'react';
import { BlogGetResponse } from '/src/types/api/blog';
import Link from 'next/link';
import {
  BlogContainer,
  BlogContentWrapper,
  BlogPostContainer,
  Divider,
} from '/src/pages/Blog/styled';
import { ChevronLeft } from 'react-feather';
import { Menu } from '/src/components/Menu/Menu';
import { Header1 } from '/design-system/typography';
import { PostListing } from '/src/pages/Blog/components/PostListing';
import Head from 'next/head';
import styled from 'styled-components';
import { solids } from '/design-system/colors';
import { Footer } from '/src/components/Footer/Footer';
import { useRouter } from 'next/router';
import { SEOTags } from '/src/components/SEOTags/SEOTags';
import { formatBlogPostUrlParam } from '/src/utils/url/formatBlogPostUrlParam';

export type BlogStaticProps = {
  posts: BlogGetResponse['posts'];
  topics: string[];
  topic?: string;
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

export function Blog(props: BlogStaticProps) {
  const isCategoryPage = !!props.topic;
  const router = useRouter();

  const title = `Prescott | Blog${isCategoryPage ? ` | ${props.topic}` : ''}`;
  const description = `Prescott's Playground 🎢`;

  return (
    <BlogContainer>
      <Head>
        <SEOTags router={router} title={title} description={description} />
      </Head>
      <Menu />
      <BlogPostContainer>
        <BlogContentWrapper>
          <Header1 style={{ marginBottom: '0px' }}>
            {isCategoryPage ? props.topic?.toUpperCase() : 'BLOG'}
          </Header1>

          <div
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            {!isCategoryPage ? (
              <div style={{ whiteSpace: 'pre-wrap', minWidth: '100px' }}>
                {(props.topics || []).map((category) => (
                  <>
                    <Link
                      passHref
                      href={{
                        pathname: '/blog/topics/[...topic]',
                        query: { topic: [category] },
                      }}
                      legacyBehavior>
                      <CategoryLink>{category}</CategoryLink>
                    </Link>
                    {'          '}
                  </>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ChevronLeft color={solids.PINK_STARBURST} />
                <Link passHref href="/blog" legacyBehavior>
                  <CategoryLink>Home</CategoryLink>
                </Link>
              </div>
            )}
          </div>
          <Divider />
          {(props.posts || []).map((post) => {
            const postName = post.properties.Title.title
              .map((item) => item.plain_text)
              .join();
            const postNameParam = formatBlogPostUrlParam({
              title: post.properties.Title.title,
              id: post.id,
            });
            return (
              <Link
                passHref
                key={postName}
                href={{
                  pathname: '/blog/[...blogPost]',
                  query: { blogPost: [postNameParam] },
                }}>
                <PostListing post={post} key={postName} />
              </Link>
            );
          })}
        </BlogContentWrapper>
      </BlogPostContainer>
      <Footer />
    </BlogContainer>
  );
}
