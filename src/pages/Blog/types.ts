import { ExtendedRecordMap, PreviewImage } from 'notion-types';
import { NotionPage } from '/src/types/cms/properties';

export type BlogPostProps = {
  post: ExtendedRecordMap;
  pageData: NotionPage;
  coverBlurUrl?: PreviewImage;
};
