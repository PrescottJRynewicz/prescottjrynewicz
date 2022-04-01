import { Client } from '@notionhq/client';
import { NotionPage, ParagraphBlock } from '/src/types/cms/properties';
import { getKeyBlock } from '/src/fetchers/getKeyBlock';
import { paginateNotion } from '/src/utils/paginateNotion';
import { PreviewImage } from 'notion-types';

const notionAPIKey = process.env.NOTION_API_KEY;

const notion = new Client({
  auth: notionAPIKey,
});

/**
 * This method will get the image cache for a given post id.
 * @param postId
 */
export async function getImageCache(
  pageData: NotionPage
): Promise<{ blockIds: string[]; cache: Record<string, PreviewImage> }> {
  try {
    const keyBlock: ParagraphBlock = await getKeyBlock(pageData);

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

      try {
        return { blockIds, cache: JSON.parse(combinedText) };
      } catch (error) {
        console.log('error unserializing image cache');
        console.log(error);
      }
    }

    return { blockIds: [], cache: {} };
  } catch (error) {
    console.log('error fetching image cache');
    console.log(error);
    return { blockIds: [], cache: {} };
  }
}
