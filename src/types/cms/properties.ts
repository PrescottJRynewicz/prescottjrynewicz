import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

export type CmsProperties =
  | 'Title'
  | 'Subtitle'
  | 'Tags'
  | 'Categories'
  | 'Published'
  | 'Created'
  | 'Updated'
  | 'Author';

export const Properties: Record<CmsProperties, CmsProperties> = {
  Title: 'Title',
  Subtitle: 'Subtitle',
  Author: 'Author',
  Created: 'Created',
  Tags: 'Tags',
  Categories: 'Categories',
  Updated: 'Updated',
  Published: 'Published',
};

export const PropertyMap: Record<
  CmsProperties,
  | 'title'
  | 'rich_text'
  | 'multi_select'
  | 'date'
  | 'created_time'
  | 'last_edited_time'
  | 'people'
> = {
  Title: 'title',
  Subtitle: 'rich_text',
  Tags: 'multi_select',
  Categories: 'multi_select',
  Published: 'date',
  Created: 'created_time',
  Updated: 'last_edited_time',
  Author: 'people',
} as const;

export type NotionTypeHelper<T> = Extract<T, { parent: {} }>;

export type BaseNotionPage = NotionTypeHelper<GetPageResponse>;
export type NotionPage = NotionTypeHelper<GetPageResponse> & {
  icon: Emoji;
  cover: PageCover;
  properties: {
    Title: Extract<BaseNotionPage['properties']['title'], { type: 'title' }>;
    Subtitle: Extract<
      BaseNotionPage['properties']['rich_text'],
      { type: 'rich_text' }
    >;
    Tags: Extract<
      BaseNotionPage['properties']['multi_select'],
      { type: 'multi_select' }
    >;
    Categories: Extract<
      BaseNotionPage['properties']['multi_select'],
      { type: 'multi_select' }
    >;
    Published: Extract<BaseNotionPage['properties']['date'], { type: 'date' }>;
    Created: Extract<
      BaseNotionPage['properties']['created_time'],
      { type: 'created_time' }
    >;
    Updated: Extract<
      BaseNotionPage['properties']['last_edited_time'],
      { type: 'last_edited_time' }
    >;
    Author: Extract<BaseNotionPage['properties']['people'], { type: 'people' }>;
  };
};
export type PageCover = Extract<BaseNotionPage['cover'], { external: {} }>;
export type TitleType = Extract<
  BaseNotionPage['properties']['title'],
  { type: 'title' }
>;

export type Emoji = Extract<BaseNotionPage['icon'], { type: 'emoji' }>;

export type RichTextType = Extract<
  BaseNotionPage['properties']['rich_text'],
  { type: 'rich_text' }
>;
export type MultiSelectType = Extract<
  BaseNotionPage['properties']['multi_select'],
  { type: 'multi_select' }
>;
