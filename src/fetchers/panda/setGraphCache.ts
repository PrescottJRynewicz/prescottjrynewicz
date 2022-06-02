/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { Client } from '@notionhq/client';
import { GraphCache, localFileCachePath } from '/src/fetchers/panda/constants';
import { NotionPage } from '/src/types/cms/properties';
import { chunkArray, chunkString } from '/src/utils/chunk';
import * as fs from 'fs';

const notionAPIKey = process.env.NOTION_API_KEY;

const notion = new Client({
  auth: notionAPIKey,
});

export async function setGraphCache({
  graphCache,
  writeToLocal = false,
}: {
  graphCache: GraphCache;
  writeToLocal?: boolean;
}) {
  try {
    const graphCachePage: NotionPage = (await notion.pages.retrieve({
      page_id: process.env.GRAPH_CACHE_PAGE_ID as string,
    })) as NotionPage;

    const children = await notion.blocks.children.list({
      block_id: graphCachePage.id,
    });

    // remove children
    if (children.results?.length > 0) {
      for (const child of children.results) {
        await notion.blocks.delete({
          block_id: child.id,
        });
      }
    }

    // add first child
    const child = (
      await notion.blocks.children.append({
        block_id: graphCachePage.id,
        children: [
          {
            toggle: { rich_text: [] },
          },
        ],
      })
    )?.results[0];

    const cacheString = JSON.stringify(graphCache);

    if (writeToLocal) {
      try {
        fs.writeFileSync(localFileCachePath, cacheString);
        console.log('\tset local graph cache!');
        return;
      } catch (error) {
        console.log('error writing to local file');
        console.log(error);
      }
    }

    console.log('\tsetting remote cache...');
    // Limit is 2000, using 1900 to be safe
    const cacheChunks = chunkString(cacheString, 1900);
    const chunkedChunks = chunkArray(cacheChunks, 100);

    console.log('\tNumber of Cache Chunks:', cacheChunks?.length);

    for (const chunk of chunkedChunks) {
      await notion.blocks.children.append({
        block_id: child.id,
        children: chunk.map((graphCacheChunk) => ({
          paragraph: {
            rich_text: [{ text: { content: graphCacheChunk } }],
          },
        })),
      });
    }
    console.log('\tRemote Graph Cache Set👍');
  } catch (error) {
    console.log('Error setting graph cache in notion');
    console.error(error);
  }
}
