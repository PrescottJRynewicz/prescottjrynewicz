import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import * as Styled from '/src/pages/Blog/styled';
import Image from 'next/image';
import { MessageCircle, ThumbsUp } from 'react-feather';
import { Menu } from '/src/components/Menu/Menu';
import { Code } from '/src/pages/Blog/components/Code';
import { solids, speckles } from '/design-system/colors';
import { Header3, SubHeader1, SubHeader3 } from '/design-system/typography';
import Head from 'next/head';
import { Footer } from '/src/components/Footer/Footer';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUpVotesAndViews } from '/src/pages/Blog/hooks/useUpVotesAndViews';
import { BlogPostProps } from '/src/pages/Blog/types';
import { getPageCover } from '/src/pages/Blog/utils/getPageCover';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { SEOTags } from '/src/components/SEOTags/SEOTags';

const UpvoteIcon = styled(ThumbsUp)<{ hasUpvoted: boolean }>`
  &:hover {
    cursor: pointer;
  }

  color: ${({ hasUpvoted }) =>
    hasUpvoted ? solids.PINK_STARBURST : solids.DARK_KNIGHT};
  fill: ${({ hasUpvoted }) =>
    hasUpvoted ? solids.PINK_STARBURST : 'transparent'};

  @media (prefers-color-scheme: dark) {
    color: ${solids.PINK_STARBURST};
  }
`;

/**
 * Responsible for verifying that the page has adequate data to be rendered
 *
 * @param post
 * @param pageData
 * @param rest
 * @constructor
 */
export function BlogPost({ post, pageData, ...rest }: BlogPostProps) {
  if (!pageData || !post || !pageData?.cover?.type) {
    // TODO: Add 404
    return null;
  }

  return <BlogPostContent post={post} pageData={pageData} {...rest} />;
}

/**
 * The main content of the post - can assume data
 * is available to render
 * @param post
 * @param pageData
 * @param coverBlurUrl
 * @constructor
 */
export function BlogPostContent({
  post,
  pageData,
  coverBlurUrl,
}: BlogPostProps) {
  const router = useRouter();
  const { upvotes, views, updateLikes, hasUpvoted, upToDatePageData } =
    useUpVotesAndViews({
      pageData,
    });

  const { url: pageCoverImage } = getPageCover({
    updatedPageData: upToDatePageData,
    staticPageData: pageData,
  });

  const title = pageData.properties.Title;
  const subtitle = pageData.properties.Subtitle;
  const tags = pageData.properties.Tags;
  const categories = pageData.properties.Categories;
  const { icon } = pageData;

  const seoTitle = `PJR | ${title.title.map((item) => item.plain_text).join()}`;
  const seoDescription = subtitle.rich_text
    .map((item) => item.plain_text)
    .join();

  return (
    <>
      <Head>
        <SEOTags
          router={router}
          title={seoTitle}
          description={seoDescription}
          imageUrl={pageCoverImage}
          emoji={icon?.emoji as string & { length: 1 }}
        />
      </Head>
      <Menu />
      <Styled.BlogPostContainer>
        <Styled.BlogPostContentWrapper>
          {/* If we want to avoid blurring the border we need to wrap this in a container */}
          <Styled.CoverImage
            alt={title.title.map((item) => item.plain_text).join()}
            src={
              (pageCoverImage as string) ||
              (coverBlurUrl?.dataURIBase64 as string)
            }
            placeholder="blur"
            blurDataURL={coverBlurUrl?.dataURIBase64 || speckles.MILK}
            priority
            height={500}
            width={500}
          />
          <Styled.TitleContainer>
            <Styled.TitleRow>
              <Styled.TitleText>
                <header>
                  <Header3>
                    {icon?.emoji}{' '}
                    {title.title
                      .map((item) => item.plain_text)
                      .join()
                      .toUpperCase()}
                  </Header3>
                  <SubHeader1>
                    {subtitle.rich_text.map((item) => item.plain_text).join()}
                  </SubHeader1>
                </header>
              </Styled.TitleText>
              <Styled.LikeContainer>
                <UpvoteIcon
                  id="ThumbsUpButton"
                  onClick={updateLikes}
                  hasUpvoted={hasUpvoted}
                />
                <SubHeader3>{upvotes}</SubHeader3>
              </Styled.LikeContainer>
            </Styled.TitleRow>
            <Styled.PublishedOnContainer>
              Published On{' '}
              {new Date(
                pageData.properties.Published.date?.start || new Date()
              ).toLocaleDateString('en-US', {
                dateStyle: 'medium',
                timeZone: `UTC`,
              })}{' '}
              {pageData.properties?.Updated?.last_edited_time &&
                `(Updated On ${new Date(
                  pageData.properties?.Updated?.last_edited_time
                ).toLocaleDateString('en-US', {
                  dateStyle: 'medium',
                  timeZone: 'UTC',
                })}) `}
              · {(views || 1) + 1} Views
            </Styled.PublishedOnContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}>
                {categories.multi_select.map((cat) => (
                  <Styled.CategoryText key={cat.id}>
                    {cat.name}
                  </Styled.CategoryText>
                ))}
                {tags.multi_select.map((tag) => (
                  <Styled.Tag key={tag.id}>{tag.name}</Styled.Tag>
                ))}
              </div>
              <Styled.CommentContainer
                href={pageData.url
                  .replace('www', 'prescottjr')
                  .replace('.so/', '.site/')}
                target="_blank">
                <MessageCircle style={{ marginRight: '10px' }} />
                <SubHeader3>Leave a comment on Notion!</SubHeader3>
              </Styled.CommentContainer>
            </div>
          </Styled.TitleContainer>

          <Styled.Divider />
          <NotionRenderer
            recordMap={post}
            previewImages
            components={{
              Code,
              Equation,
              nextImage: Image,
              nextLink: Link,
            }}
          />
        </Styled.BlogPostContentWrapper>
        <Footer />
      </Styled.BlogPostContainer>
    </>
  );
}
