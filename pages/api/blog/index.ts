import { NextApiRequest, NextApiResponse } from 'next';
import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionPage, Properties } from '/src/types/cms/properties';
import { BlogGetResponse } from '/src/types/api/blog';

const { Client } = require('@notionhq/client');

const blogDatbaseId = process.env.BLOG_DATABASE_ID;
const notionAPIKey = process.env.NOTION_API_KEY;

const maxPageSize = 100;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogGetResponse>
) {
  try {
    const notion = new Client({
      auth: notionAPIKey,
    });

    const { category } = req.query;

    let iterations = 0;
    let hasMore = true;
    let nextCursor;
    const blogPosts: NotionPage[] = [];
    const categories = new Set<string>();
    const tags = new Set<string>();

    const filter: QueryDatabaseParameters['filter'] = category
      ? {
          and: [
            {
              property: Properties.Published,
              date: { is_not_empty: true },
            },
            {
              property: Properties.Categories,
              multi_select: { contains: category as string },
            },
          ],
        }
      : {
          property: Properties.Published,
          date: { is_not_empty: true },
        };

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
      type QueryResult = QueryDatabaseResponse & { results: NotionPage[] };

      // eslint-disable-next-line no-await-in-loop
      const results = (await notion.databases.query({
        database_id: blogDatbaseId,
        page_size: maxPageSize,
        filter,
        sorts: [{ property: Properties.Published, direction: 'ascending' }],
        start_cursor: nextCursor,
      })) as QueryResult;

      results.results.map((post: NotionPage) => {
        if (post?.properties) {
          post.properties.Tags.multi_select.forEach((tag) =>
            tags.add(tag.name)
          );
          post.properties.Categories.multi_select.forEach((cat) =>
            categories.add(cat.name)
          );
        }
        return null;
      });

      blogPosts.push(...results.results);

      iterations += 1;
      nextCursor = results.next_cursor;
      hasMore = results.has_more;
    }

    res.status(200).json({
      posts: blogPosts,
      categories: Array.from(categories),
    });
  } catch (error) {
    console.log(error);

    res.status(500);
    throw error;
  }
}
