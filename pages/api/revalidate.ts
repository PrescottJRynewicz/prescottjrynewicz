import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';
import { NotionPage } from '/src/types/cms/properties';

/**
 * Revlidate all blog posts cause why not
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await Promise.all(
      (
        await getBlogPosts({})
      ).posts.map((post: NotionPage) =>
        res.revalidate(
          `/blog/${post.properties.Title.title
            .map((item) => item.plain_text)
            .join()
            .replace(/\s/g, '-')}`
        )
      )
    );

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res
      .status(500)
      .send(`Error revalidating: ${(err as Error)?.message}`);
  }
}
