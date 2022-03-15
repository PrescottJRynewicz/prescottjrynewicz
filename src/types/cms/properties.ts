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

export const PropertyMap: Record<CmsProperties, string> = {
  Title: 'title',
  Subtitle: 'rich_text',
  Tags: 'multi_select',
  Categories: 'multi_select',
  Published: 'date',
  Created: 'created_time',
  Updated: 'last_edited_time',
  Author: 'people',
};

export type NotionTypeHelper<T> = Extract<T, { parent: {} }>;

export type NotionPage = NotionTypeHelper<GetPageResponse>;
export type PageCover = Extract<NotionPage['cover'], { external: {} }>;
export type TitleType = Extract<
  NotionPage['properties']['title'],
  { type: 'title' }
>;

export type Emoji = Extract<NotionPage['icon'], { type: 'emoji' }>;

export type RichTextType = Extract<
  NotionPage['properties']['rich_text'],
  { type: 'rich_text' }
>;
export type MultiSelectType = Extract<
  NotionPage['properties']['multi_select'],
  { type: 'multi_select' }
>;
