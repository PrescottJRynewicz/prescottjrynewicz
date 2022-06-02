import { PreviewImage } from 'notion-types';
import { Client } from '@notionhq/client';
import { chunkString } from '/src/utils/chunk';
import { NotionPage, ParagraphBlock } from '/src/types/cms/properties';
import { getKeyBlock } from '/src/fetchers/getKeyBlock';

const notionAPIKey = process.env.NOTION_API_KEY;

const notion = new Client({
  auth: notionAPIKey,
});

/**
 * This method will set the image cache in notion.
 * @param cache
 * @param blockIds
 * @param postId
 */
export async function setImageCache(
  cache: Record<string, PreviewImage>,
  blockIds: string[],
  pageData: NotionPage
) {
  try {
    const keyBlock: ParagraphBlock = await getKeyBlock(pageData);

    const cacheString = JSON.stringify(cache);

    // Limit is 2000, using 1900 to be safe
    const cacheChunks = chunkString(cacheString, 1900);

    for (let index = 0; index < cacheChunks.length; index += 1) {
      const piece = cacheChunks[index];
      const blockId = blockIds[index];

      if (blockId) {
        // need to await in loop to not get conflicts in notion api
        // eslint-disable-next-line no-await-in-loop
        await notion.blocks.update({
          block_id: blockId,
          paragraph: {
            rich_text: [{ text: { content: piece } }],
          },
        });
      } else {
        // eslint-disable-next-line no-await-in-loop
        await notion.blocks.children.append({
          block_id: keyBlock.id,
          children: [
            {
              paragraph: {
                rich_text: [{ text: { content: piece } }],
              },
            },
          ],
        });
      }
    }

    // Remove excess blocks still remaining.
    // This covers the use case if a post removes images.
    // Dangling strings will create improperly formatted JSONs.
    if (blockIds.length > cacheChunks.length) {
      for (
        let index = cacheChunks.length;
        index < blockIds.length;
        index += 1
      ) {
        const blockId = blockIds[index];

        // eslint-disable-next-line no-await-in-loop
        await notion.blocks.delete({
          block_id: blockId,
        });
      }
    }
  } catch (error) {
    console.log('error setting image cache');
    console.log(error);
  }
}
