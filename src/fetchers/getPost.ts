import { BlogPostGetResponse } from '/src/types/api/blog/posts';
import { NotionPage } from '/src/types/cms/properties';
import { NotionAPI } from 'notion-client';
import { Client } from '@notionhq/client';

const notionAPIKey = process.env.NOTION_API_KEY;
const notionUserTokenV2 = process.env.NOTION_USER_SECRET;

const api = new NotionAPI({
  authToken: notionUserTokenV2,
});

const notion = new Client({
  auth: notionAPIKey,
});

export async function getBlogPost({
  name,
}: {
  name: string;
}): Promise<BlogPostGetResponse> {
  const postId = (name as string).split('-').pop();

  const pageResult = await notion.pages.retrieve({
    page_id: postId as string,
  });

  const pageData = pageResult as NotionPage;

  if (!pageData) {
    throw Error('Unable to find post');
  }

  const post = await api.getPage(pageData.id);

  return {
    post,
    pageData,
  };
}
