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
import { PeekABoo } from '/src/components/PeekABoo/PeekABoo';
import { Header1, SubHeader3 } from '/design-system/typography';
import { PostListing } from '/src/pages/Blog/components/PostListing';
import Head from 'next/head';
import styled from 'styled-components';
import { solids } from '/design-system/colors';
import { Footer } from '/src/components/Footer/Footer';
import { getUrl } from '/src/utils/url/getApiUrl';
import { useRouter } from 'next/router';

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

  return (
    <BlogContainer>
      <Head>
        <title>PJR - {isCategoryPage ? props.topic : 'Blog'}</title>
        <meta name="description" content="Prescott's Playground 🎢" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%22100%22>📝</text></svg>"
        />
        <link rel="canonical" href={getUrl(router.asPath)} />
        <meta property="og:image" content="/site-image.png" />
        <meta name="twitter:title" content="PrescottJR" />
        <meta name="twitter:description" content="Prescott's Playground" />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="twitter:image:alt" content="Prescott's Playground" />
      </Head>
      <Menu />
      <PeekABoo animationDelay={2} />
      <BlogPostContainer>
        <BlogContentWrapper>
          <Header1 style={{ marginBottom: '0px' }}>
            {isCategoryPage ? props.topic?.toUpperCase() : 'BLOG'}
          </Header1>
          {!isCategoryPage && (
            <>
              <SubHeader3 muted>
                I created this space to share my passions. I am a serial
                hobbyist and crave sharing my excitement for what I do.
              </SubHeader3>
              <SubHeader3
                muted
                style={{
                  marginBottom: '20px',
                }}>
                Thanks for reading 👋
              </SubHeader3>
            </>
          )}
          <div
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            {!isCategoryPage ? (
              <div style={{ whiteSpace: 'pre-wrap', minWidth: '100px' }}>
                {(props.topics || []).map((category) => (
                  <>
                    <Link
                      passHref
                      href={`/blog/topics/${category}`}
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

            {/* Turn this back on to start working on search */}
            {/* <SearchInputContainer> */}
            {/*  <SearchInput */}
            {/*    type="text" */}
            {/*    onChange={(event) => onSearchChange(event.target.value)} */}
            {/*  /> */}
            {/*  <Search style={{ marginLeft: '-20px' }} /> */}
            {/* </SearchInputContainer> */}
          </div>
          <Divider />
          {(props.posts || []).map((post) => {
            const postName = post.properties.Title.title
              .map((item) => item.plain_text)
              .join();
            return (
              <Link
                passHref
                key={postName}
                href={`/blog/${postName.replace(/\s/g, '-')}`}>
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
