import React, { useCallback, useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap, PreviewImage } from 'notion-types';
import {
  BlogPostContainer,
  BlogPostContentWrapper,
  CategoryText,
  CommentContainer,
  Divider,
  ImageWrap,
  LikeContainer,
  PublishedOnContainer,
  Tag,
  TitleContainer,
  TitleRow,
  TitleText,
} from '/src/pages/Blog/styled';
import Image from 'next/image';
import { MessageCircle, ThumbsUp } from 'react-feather';
import { Menu } from '/src/components/Menu/Menu';
import { Code } from '/src/pages/Blog/components/Code';
import { NotionPage, PageCover } from '/src/types/cms/properties';
import { solids, speckles } from '/design-system/colors';
import { Header3, SubHeader1, SubHeader3 } from '/design-system/typography';
import { PeekABoo } from '/src/components/PeekABoo/PeekABoo';
import Head from 'next/head';
import { Footer } from '/src/components/Footer/Footer';
import { getApiUrl } from '/src/utils/url/getApiUrl';
import { throttle } from '/src/utils/throttle';
import { animateElement } from '/src/utils/animations/animate';
import styled from 'styled-components';

export type BlogPostProps = {
  post: ExtendedRecordMap;
  pageData: NotionPage;
  coverBlurUrl?: PreviewImage;
};

const getVotedLocalStorageKey = (pageId: string) => `${pageId}:voted`;

const UpvoteIcon = styled(ThumbsUp)`
  &:hover {
    cursor: pointer;
  }
`;

export const BlogPost = ({ post, pageData, coverBlurUrl }: BlogPostProps) => {
  const [upvotes, setUpvotes] = useState(
    (pageData?.properties?.Upvotes?.number as number) || 0
  );
  const [hasUpvoted, setHasUpvoted] = useState(Boolean(false));

  console.log(post?.preview_images);

  useEffect(() => {
    // Set the state of the has voted feature when on the client
    if (typeof window !== 'undefined') {
      setHasUpvoted(
        Boolean(localStorage.getItem(getVotedLocalStorageKey(pageData.id)))
      );

      fetch(getApiUrl(`blog/posts/${pageData.id}/view`), {
        method: 'POST',
      });
    }
  }, [pageData?.id]);

  const updateLikes = useCallback(
    throttle(1000, async () => {
      const thumbsUp = document.getElementById('ThumbsUpButton');

      animateElement({
        node: thumbsUp as HTMLElement,
        removeClassOnComplete: true,
        // This references the just add water animation
        // stylesheet linked in the document head
        animationClassNames: ['animate__animated', 'animate__wobble'],
      });

      const currentUpvotes = upvotes;

      setUpvotes(currentUpvotes + 1);
      setHasUpvoted(true);
      localStorage.setItem(getVotedLocalStorageKey(pageData.id), 'true');

      fetch(getApiUrl(`blog/posts/${pageData.id}/like`), {
        method: 'POST',
        body: JSON.stringify({ upvotes: currentUpvotes + 1 }),
      });
    }),
    [upvotes]
  );

  if (!pageData || !post || !pageData?.cover?.type) {
    // TODO: Add 404
    return <></>;
  }

  const coverPhoto = pageData.cover as PageCover;
  const { url } = coverPhoto?.[coverPhoto?.type] || {
    url: speckles.PINK_STARBURST,
  };

  const title = pageData.properties.Title;
  const subtitle = pageData.properties.Subtitle;
  const tags = pageData.properties.Tags;
  const categories = pageData.properties.Categories;
  const { icon } = pageData;

  return (
    <>
      <Head>
        <title>PJR - {title.title.map((item) => item.plain_text).join()}</title>
        <meta
          name="description"
          content={subtitle.rich_text.map((item) => item.plain_text).join()}
        />
        <link rel="icon" href="/favicon.png" />

        <meta property="og:image" content={url} />
        <meta
          name="twitter:title"
          content={title.title.map((item) => item.plain_text).join()}
        />
        <meta name="twitter:description" content="Prescott's Playground" />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="twitter:image:alt" content="Prescott's Playground" />
      </Head>
      <Menu />
      <PeekABoo useConfetti animationDelay={2} />
      <BlogPostContainer>
        <BlogPostContentWrapper>
          <ImageWrap>
            <Image
              src={url}
              placeholder="blur"
              blurDataURL={coverBlurUrl?.dataURIBase64 || speckles.MILK}
              layout="fill"
              // tested between 25-100. Did not notice a significant difference until 25
              quality={100}
              objectFit="cover"
            />
          </ImageWrap>
          <TitleContainer>
            <TitleRow>
              <TitleText>
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
              </TitleText>
              <LikeContainer>
                <UpvoteIcon
                  id="ThumbsUpButton"
                  onClick={updateLikes}
                  color={hasUpvoted ? solids.PINK_STARBURST : 'black'}
                  fill={hasUpvoted ? solids.PINK_STARBURST : 'transparent'}
                />
                <SubHeader3>{upvotes}</SubHeader3>
              </LikeContainer>
            </TitleRow>
            <PublishedOnContainer>
              Published On{' '}
              {new Date(
                pageData.properties.Published.date?.start || new Date()
              ).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              {pageData.properties?.Updated?.last_edited_time &&
                `  (Updated On ${new Date(
                  pageData.properties?.Updated?.last_edited_time
                ).toLocaleDateString('en-US', { dateStyle: 'medium' })})`}{' '}
              · {(pageData.properties.Views?.number || 1) + 1} Views
            </PublishedOnContainer>
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
                  <CategoryText>{cat.name}</CategoryText>
                ))}
                {tags.multi_select.map((tag) => (
                  <Tag>{tag.name}</Tag>
                ))}
              </div>
              <CommentContainer
                href={pageData.url
                  .replace('www', 'prescottjr')
                  .replace('.so/', '.site/')}
                target="_blank">
                <MessageCircle style={{ marginRight: '10px' }} />
                <SubHeader3>Leave a comment on Notion!</SubHeader3>
              </CommentContainer>
            </div>
          </TitleContainer>

          <Divider />
          <NotionRenderer
            recordMap={post}
            previewImages
            components={{
              code: Code,
            }}
          />
        </BlogPostContentWrapper>
        <Footer />
      </BlogPostContainer>
    </>
  );
};
