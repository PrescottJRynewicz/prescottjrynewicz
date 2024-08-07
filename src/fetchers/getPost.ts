import { BlogPostGetResponse } from '/src/types/api/blog/posts';
import { NotionPage } from '/src/types/cms/properties';
import { NotionAPI } from 'notion-client';
import { Client } from '@notionhq/client';

const blogDatbaseId = process.env.BLOG_DATABASE_ID;
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
  let pageResult = undefined;
  try {
    const postId = (name as string).split('-').pop();

    pageResult = await notion.pages.retrieve({
      page_id: postId as string,
    });
  } catch (error) {
    // attempt old URL structure
    const postName = (name as string).replace(/-/g, ' ').toLowerCase();

    const postQuery = await notion.databases.query({
      database_id: blogDatbaseId as string,
      filter: {
        property: 'title',
        rich_text: {
          equals: postName,
        },
      },
    });

    pageResult = postQuery.results[0] as NotionPage;
  }

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
