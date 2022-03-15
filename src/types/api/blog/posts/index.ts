import { ExtendedRecordMap } from 'notion-types';
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionTypeHelper } from '/src/types/cms/properties';

export type BlogPostGetResponse = {
  post: ExtendedRecordMap;
  pageData: NotionTypeHelper<GetPageResponse>;
};
