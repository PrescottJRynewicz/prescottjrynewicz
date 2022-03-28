import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

export type CmsProperties =
  | 'Title'
  | 'Subtitle'
  | 'Tags'
  | 'Categories'
  | 'Published'
  | 'Created'
  | 'Updated'
  | 'Upvotes'
  | 'Views'
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
  Upvotes: 'Upvotes',
  Views: 'Views',
};

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
    Upvotes: Extract<
      BaseNotionPage['properties']['number'],
      { type: 'number' }
    >;
    Views: Extract<BaseNotionPage['properties']['number'], { type: 'number' }>;
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

export type Emoji = Extract<BaseNotionPage['icon'], { type: 'emoji' }>;
