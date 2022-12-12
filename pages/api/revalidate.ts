import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';
import { NotionPage } from '/src/types/cms/properties';
import { logger } from '/src/utils/logging/logger';

/**
 * Re-validate all blog posts
 *
 * TODO: Could validate this with a secret - not required for
 *  a hobby project
 */
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    logger.info('starting revalidation...');

    const blogUrls = (await getBlogPosts({})).posts.map(
      (post: NotionPage) =>
        `https://prescottjr.com/blog/${post.properties.Title.title
          .map((item) => item.plain_text)
          .join()
          .replace(/\s/g, '-')}`
    );

    await Promise.all(blogUrls.map((url) => fetch(url)));

    logger.info(`finished revalidating${blogUrls.length}pages`);
    logger.info(blogUrls.toString());

    return res.json({ revalidated: true });
  } catch (err) {
    logger.error('revlidate.error', { error: err });
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res
      .status(500)
      .send(`Error revalidating: ${(err as Error)?.message}`);
  }
}
