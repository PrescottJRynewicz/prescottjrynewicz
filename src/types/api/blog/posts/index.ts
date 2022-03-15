import { ExtendedRecordMap } from 'notion-types';
import { NotionPage } from '/src/types/cms/properties';

export type BlogPostGetResponse = {
  post: ExtendedRecordMap;
  pageData: NotionPage;
};
