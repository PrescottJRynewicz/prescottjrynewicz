import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

export type BlogGetResponse = {
  posts: GetPageResponse[];
};
