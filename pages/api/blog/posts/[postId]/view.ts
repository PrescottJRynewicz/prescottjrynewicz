import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { NotionPage, Properties } from '/src/types/cms/properties';

const notionAPIKey = process.env.NOTION_API_KEY;

const notion = new Client({
  auth: notionAPIKey,
  notionVersion: '2021-05-13',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pageId = req.query.postId as string;

  const pageData = (await notion.pages.retrieve({
    page_id: pageId,
  })) as NotionPage;

  const currentVotes = (pageData.properties?.Views?.number as number) || 0;

  const updatedPage = (await notion.pages.update({
    page_id: pageData.id,
    properties: {
      [Properties.Views]: {
        number: currentVotes + 1,
      },
    },
  })) as NotionPage;

  res.status(200).json({ pageData: updatedPage });
}
