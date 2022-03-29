import { Client } from '@notionhq/client';
import { PreviewImage } from 'notion-types';
import { NotionPage, Properties } from '/src/types/cms/properties';

const notionAPIKey = process.env.NOTION_API_KEY;

const notion = new Client({
  auth: notionAPIKey,
  notionVersion: '2021-05-13',
});

export async function updateImageCache(
  cache: Record<string, PreviewImage>,
  pageId: string
) {
  (await notion.pages.update({
    page_id: pageId,
    properties: {
      [Properties.Cache]: {
        rich_text: [{ type: 'text', text: { content: JSON.stringify(cache) } }],
      },
    },
  })) as NotionPage;
}
