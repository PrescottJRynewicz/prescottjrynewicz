import { ParagraphBlock } from '/src/types/cms/properties';
import { Client } from '@notionhq/client';

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
export async function getKeyBlock(postId: string) {
  let iterations = 0;
  let hasMore = true;
  let nextCursor: string | undefined;

  while (hasMore && iterations <= 100) {
    // eslint-disable-next-line no-await-in-loop
    const results = await notion.blocks.children.list({
      block_id: imageCachePageId,
      start_cursor: nextCursor,
    });

    const foundBlock = (results.results as ParagraphBlock[]).find(
      (block) =>
        block.paragraph.rich_text.map((item) => item.plain_text).join('') ===
        postId
    );
    if (foundBlock) {
      return foundBlock as ParagraphBlock;
    }

    iterations += 1;
    nextCursor = results.next_cursor || undefined;
    hasMore = results.has_more;
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

  return result.results[0] as ParagraphBlock;
}
