import { Client } from '@notionhq/client';
import { ParagraphBlock } from '/src/types/cms/properties';
import { getKeyBlock } from '/src/fetchers/getKeyBlock';
import { paginateNotion } from '/src/utils/paginateNotion';

const notionAPIKey = process.env.NOTION_API_KEY;

const notion = new Client({
  auth: notionAPIKey,
});

/**
 * This method will get the image cache for a given post id.
 * @param postId
 */
export async function getImageCache(
  postId: string
): Promise<{ blockIds: string[]; combinedText: string }> {
  try {
    const keyBlock: ParagraphBlock = await getKeyBlock(postId);

    if (keyBlock.has_children) {
      const { results: blocks } = await paginateNotion<
        ParagraphBlock,
        typeof notion.blocks.children.list
      >(notion.blocks.children.list, {
        block_id: keyBlock.id,
      });

      const blockIds = blocks.map((block) => block.id);
      const combinedText = blocks
        .filter((block) => 'type' in block && block.type === 'paragraph')
        .map((block) =>
          block.paragraph.rich_text.map((item) => item.plain_text).join()
        )
        .join('');

      return { blockIds, combinedText };
    }

    return { blockIds: [], combinedText: '' };
  } catch (error) {
    console.log('error fetching image cache');
    return { blockIds: [], combinedText: '' };
  }
}
