import { NextApiRequest, NextApiResponse } from 'next';
import {
  GetPageResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { Properties } from '/src/types/cms/properties';

const { Client } = require('@notionhq/client');

const blogDatbaseId = process.env.BLOG_DATABASE_ID;
const notionAPIKey = process.env.NOTION_API_KEY;

const maxPageSize = 100;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notion = new Client({
      auth: notionAPIKey,
    });

    let iterations = 0;
    let hasMore = true;
    let nextCursor;
    const blogPosts: GetPageResponse[] = [];

    /*
     * Paginate through all posts.
     * V1 of blog page will return all results without pagination.
     * Will add pagination if we ever end up writing enough
     * to require pagination
     *
     * Building this looped pagination functionality
     * at inception though so if I end up writing a ton,
     * I don't need to worry about losing posts in the future
     */
    while (hasMore && iterations <= 100) {
      // eslint-disable-next-line no-await-in-loop
      const results: QueryDatabaseResponse = await notion.databases.query({
        database_id: blogDatbaseId,
        page_size: maxPageSize,
        filter: {
          property: Properties.Published,
          date: { is_not_empty: true },
        },
        sorts: [{ property: Properties.Created, direction: 'ascending' }],
        start_cursor: nextCursor,
      });

      blogPosts.push(...results.results);

      iterations += 1;
      nextCursor = results.next_cursor;
      hasMore = results.has_more;
    }

    res.status(200).json({ posts: blogPosts });
  } catch (error) {
    console.log(error);

    res.status(500);
    throw new Error('got em');
  }
}
