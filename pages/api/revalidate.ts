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

    const promises = Promise.all(
      (await getBlogPosts({})).posts.map((post: NotionPage) =>
        res.revalidate(
          `/blog/${post.properties.Title.title
            .map((item) => item.plain_text)
            .join()
            .replace(/\s/g, '-')}`
        )
      )
    );

    logger.info('resolving request');

    // Return to avoid timeouts
    res.json({ revalidated: true });

    logger.info('await promises');
    const result = await promises;

    logger.info('finished re-validating', result);
    return result;
  } catch (err) {
    logger.error('revlidate.error', { error: err });
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res
      .status(500)
      .send(`Error revalidating: ${(err as Error)?.message}`);
  }
}
