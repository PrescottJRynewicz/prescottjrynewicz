import { Client } from '@notionhq/client';
import { NotionPage, Properties } from '/src/types/cms/properties';
import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { BlogGetResponse } from '/src/types/api/blog';

const blogDatbaseId = process.env.BLOG_DATABASE_ID;
const notionAPIKey = process.env.NOTION_API_KEY;

const maxPageSize = 100;

export async function getBlogPosts({
  category,
}: {
  category?: string;
}): Promise<BlogGetResponse> {
  try {
    if (!blogDatbaseId) {
      throw new Error('No Blog Database ID');
    }

    const notion = new Client({
      auth: notionAPIKey,
    });

    let iterations = 0;
    let hasMore = true;
    let nextCursor: string | undefined;
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
      : process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
        ? {
            or: [
              {
                property: Properties.Published,
                date: { is_not_empty: true },
              },
              {
                property: Properties.Preview,
                checkbox: { equals: true },
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
        sorts: [{ property: Properties.Published, direction: 'descending' }],
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
      nextCursor = results.next_cursor || undefined;
      hasMore = results.has_more;
    }

    return {
      posts: blogPosts,
      categories: Array.from(categories),
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
}
