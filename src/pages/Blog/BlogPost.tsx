import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';
import {
  BlogPostContainer,
  BlogPostContentWrapper,
  CategoryText,
  Divider,
  PostCoverContainer,
  Tag,
  TitleContainer,
} from '/src/pages/Blog/styled';
import { Menu } from '/src/components/Menu/Menu';
import {
  Emoji,
  MultiSelectType,
  NotionTypeHelper,
  PageCover,
  Properties,
  RichTextType,
  TitleType,
} from '/src/types/cms/properties';
import Image from 'next/image';
import { speckles } from '/design-system/colors';
import { Header3, SubHeader1 } from '/design-system/typography';
import { PeekABoo } from '/src/components/PeekABoo/PeekABoo';

export type BlogPostProps = {
  post: ExtendedRecordMap;
  pageData: NotionTypeHelper<GetPageResponse>;
};

export const BlogPost = ({ post, pageData }: BlogPostProps) => {
  if (!pageData || !post) {
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
            <div>
              {categories.multi_select.map((cat) => (
                <CategoryText>{cat.name}</CategoryText>
              ))}
              {tags.multi_select.map((tag) => (
                <Tag>{tag.name}</Tag>
              ))}
            </div>
          </TitleContainer>
          <Divider />
          <NotionRenderer recordMap={post} />
        </BlogPostContentWrapper>
      </BlogPostContainer>
    </>
  );
};
