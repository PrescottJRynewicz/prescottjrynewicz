import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import {
  BlogPostContainer,
  BlogPostContentWrapper,
  CategoryText,
  CommentContainer,
  Divider,
  PostCoverContainer,
  Tag,
  TitleContainer,
} from '/src/pages/Blog/styled';
import { MessageCircle } from 'react-feather';
import { Menu } from '/src/components/Menu/Menu';
import { Code } from '/src/pages/Blog/components/Code';
import {
  Emoji,
  MultiSelectType,
  NotionPage,
  PageCover,
  Properties,
  RichTextType,
  TitleType,
} from '/src/types/cms/properties';
import Image from 'next/image';
import { speckles } from '/design-system/colors';
import { Header3, SubHeader1, SubHeader3 } from '/design-system/typography';
import { PeekABoo } from '/src/components/PeekABoo/PeekABoo';
import Head from 'next/head';
import { Footer } from '/src/components/Footer/Footer';

export type BlogPostProps = {
  post: ExtendedRecordMap;
  pageData: NotionPage;
};

export const BlogPost = ({ post, pageData }: BlogPostProps) => {
  if (!pageData || !post || !pageData?.cover?.type) {
    // TODO: Add 404
    return <></>;
  }

  const coverPhoto = pageData.cover as PageCover;
  const { url } = coverPhoto?.[coverPhoto?.type] || {
    url: speckles.PINK_STARBURST,
  };

  const title = pageData.properties[Properties.Title] as TitleType;
  const subtitle = pageData.properties[Properties.Subtitle] as RichTextType;
  const tags = pageData.properties[Properties.Tags] as MultiSelectType;
  const categories = pageData.properties[
    Properties.Categories
  ] as MultiSelectType;
  const icon = pageData.icon as Emoji;

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
          <PostCoverContainer>
            <Image
              src={url}
              layout="fill"
              objectFit="cover"
              priority
              quality={100}
              placeholder="blur"
              blurDataURL={speckles.PINK_STARBURST}
            />
          </PostCoverContainer>
          <TitleContainer>
            <Header3>
              {icon?.emoji}
              {title.title
                .map((item) => item.plain_text)
                .join()
                .toUpperCase()}
            </Header3>
            <SubHeader1>
              {subtitle.rich_text.map((item) => item.plain_text).join()}
            </SubHeader1>
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
              <CommentContainer href={pageData.url} target="_blank">
                <MessageCircle style={{ marginRight: '10px' }} />
                <SubHeader3>Head over to the CMS to comment!</SubHeader3>
              </CommentContainer>
            </div>
          </TitleContainer>

          <Divider />
          <NotionRenderer
            recordMap={post}
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
