import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { NotionPage, Properties } from '/src/types/cms/properties';

const notionAPIKey = process.env.NOTION_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pageId = req.query.postId as string;
  const body = JSON.parse(req.body);
  const { upvotes } = body;

  const notion = new Client({
    auth: notionAPIKey,
  });

  const pageData = (await notion.pages.retrieve({
    page_id: pageId,
  })) as NotionPage;

  const currentLikes = (pageData.properties?.Upvotes?.number as number) || 0;

  const updatedVotes =
    upvotes < currentLikes + 10
      ? Math.max(upvotes, currentLikes + 1)
      : currentLikes + 1;

  const updatedPage = (await notion.pages.update({
    page_id: pageData.id,
    properties: {
      [Properties.Upvotes]: {
        number: updatedVotes,
      },
    },
  })) as NotionPage;

  res.status(200).json({ pageData: updatedPage });
}
