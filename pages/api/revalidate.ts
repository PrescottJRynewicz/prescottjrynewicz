import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';
import { NotionPage } from '/src/types/cms/properties';

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
    console.log('starting revalidation...');

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

    console.log('resolving request');

    // Return to avoid timeouts
    res.json({ revalidated: true });

    console.log('await promises');
    const result = await promises;

    console.log('finished re-validating', result);
    return result;
  } catch (err) {
    console.error(err);
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res
      .status(500)
      .send(`Error revalidating: ${(err as Error)?.message}`);
  }
}
