import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import { BlogPostGetResponse } from '/src/types/api/blog/posts';
import { NotionPage } from '/src/types/cms/properties';

const blogDatbaseId = process.env.BLOG_DATABASE_ID;
const notionAPIKey = process.env.NOTION_API_KEY;
const notionUserTokenV2 = process.env.NOTION_USER_SECRET;

const api = new NotionAPI({
  authToken: notionUserTokenV2,
});

// const maxPageSize = 100;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogPostGetResponse | { error: string }>
) {
  try {
    const postName = (req.query.postId as string).replace(/-/g, ' ');

    const notion = new Client({
      auth: notionAPIKey,
      notionVersion: '2021-05-13',
    });

    const postQuery = await notion.databases.query({
      database_id: blogDatbaseId as string,
      filter: {
        property: 'title',
        rich_text: {
          equals: postName,
        },
      },
    });

    const pageData = postQuery.results[0] as NotionPage;

    if (!pageData) {
      res.status(404).json({ error: 'Post Not Found' });
      return;
    }

    const post = await api.getPage(pageData.id);

    res.status(200).json({
      post,
      pageData,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Post Not Found' });
  }
}
