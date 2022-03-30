import { PreviewImage } from 'notion-types';
import { Client } from '@notionhq/client';
import { chunk } from '/src/utils/chunk';
import { ParagraphBlock } from '/src/types/cms/properties';
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
  postId: string
) {
  try {
    const keyBlock: ParagraphBlock = await getKeyBlock(postId);

    const cacheString = JSON.stringify(cache);

    // Limit is 2000, using 1900 to be safe
    const cacheChunks = chunk(cacheString, 1900);

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