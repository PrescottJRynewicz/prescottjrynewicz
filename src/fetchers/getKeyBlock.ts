import {
  NotionPage,
  ParagraphBlock,
  Properties,
} from '/src/types/cms/properties';
import { Client } from '@notionhq/client';
import { combineRichText } from '/src/utils/combineRichText';

const imageCachePageId = process.env.IMAGE_CACHE_PAGE_ID as string;
const notionAPIKey = process.env.NOTION_API_KEY;

const notion = new Client({
  auth: notionAPIKey,
});

/**
 * Function to get the key block of the image cache.
 *
 * It will search through the image cache page, and find the block
 * @param postId
 */
export async function getKeyBlock(pageData: NotionPage) {
  const postId = pageData.id;

  const upToDatePageData = (await notion.pages.retrieve({
    page_id: postId,
  })) as NotionPage;

  const cacheId = combineRichText(upToDatePageData?.properties?.CacheId);

  if (cacheId) {
    const keyBlock = (await notion.blocks
      .retrieve({
        block_id: cacheId,
      })
      .catch(() => null)) as ParagraphBlock;

    if (keyBlock && !keyBlock?.archived) {
      return keyBlock as ParagraphBlock;
    }
  }

  // if we are here, we do not have a key block
  // create one and return it
  const result = await notion.blocks.children.append({
    block_id: imageCachePageId,
    children: [
      {
        paragraph: {
          rich_text: [
            {
              text: { content: postId },
            },
          ],
        },
      },
    ],
  });

  const keyBlock = result.results[0] as ParagraphBlock;

  await notion.pages.update({
    page_id: postId,
    properties: {
      [Properties.CacheId]: {
        type: 'rich_text',
        rich_text: [
          {
            text: { content: keyBlock.id },
          },
        ],
      },
    },
  });

  return keyBlock;
}
