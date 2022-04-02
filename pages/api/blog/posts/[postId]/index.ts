import { NextApiRequest, NextApiResponse } from 'next';
import { NotionPage } from '/src/types/cms/properties';
import { Client } from '@notionhq/client';

const notionAPIKey = process.env.NOTION_API_KEY;

const notion = new Client({
  auth: notionAPIKey,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postId } = req.query;

  const pageData = (await notion.pages.retrieve({
    page_id: postId as string,
  })) as NotionPage;
  res.status(200).json({
    pageData,
  });
}
