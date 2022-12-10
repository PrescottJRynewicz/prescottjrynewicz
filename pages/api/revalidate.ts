import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';
import { NotionPage } from '/src/types/cms/properties';

/**
 * Re-validate all blog posts
 */
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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

    res.json({ revalidated: true });

    const result = await promises;

    console.log('finished re-validating', result);
  } catch (err) {
    console.error(err);
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res
      .status(500)
      .send(`Error revalidating: ${(err as Error)?.message}`);
  }
}
