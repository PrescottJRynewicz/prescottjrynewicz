import { Client } from '@notionhq/client';
import { NotionPage, ParagraphBlock } from '/src/types/cms/properties';
import { paginateNotion } from '/src/utils/paginateNotion';
import { GraphCache } from '/src/fetchers/panda/constants';
import * as fs from 'fs';

const notionAPIKey = process.env.NOTION_API_KEY;

const notion = new Client({
  auth: notionAPIKey,
});
export async function populateGraphCache({
  graphCache,
  localPath = '',
}: {
  graphCache: GraphCache;
  localPath?: string;
}) {
  if (localPath) {
    try {
      const localString = fs.readFileSync(localPath).toString();
      const cache: GraphCache = JSON.parse(localString);

      Object.keys(cache).forEach((id) => {
        graphCache[id] = cache[id];
      });

      console.log('graph cache populated from local');
      console.log('\tFound', Object.keys(graphCache).length, 'athletes!');
    } catch (error) {
      console.log('unable to parse graphCache - attempting remote');
      console.log(error);
    }
  }

  const graphCachePage: NotionPage = (await notion.pages.retrieve({
    page_id: process.env.GRAPH_CACHE_PAGE_ID as string,
  })) as NotionPage;

  const children = await notion.blocks.children.list({
    block_id: graphCachePage.id,
  });

  const graphCacheChild: ParagraphBlock = children
    ?.results[0] as ParagraphBlock;

  if (graphCacheChild?.has_children) {
    const { results: blocks } = await paginateNotion<
      ParagraphBlock,
      typeof notion.blocks.children.list
    >(notion.blocks.children.list, {
      block_id: graphCacheChild.id,
    });

    const combinedText = blocks
      .filter((block) => 'type' in block && block.type === 'paragraph')
      .map((block) =>
        block.paragraph.rich_text.map((item) => item.plain_text).join()
      )
      .join('');

    try {
      const cache: GraphCache = JSON.parse(combinedText);

      Object.keys(cache).forEach((id) => {
        graphCache[id] = cache[id];
      });

      console.log('graph cache populated');
      console.log('\tFound', Object.keys(graphCache).length, 'athletes!');
    } catch (error) {
      console.log('unable to parse graphCache');
      console.log(error);
      return {};
    }
  }

  return {};
}
