import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';
import { NotionPage } from '/src/types/cms/properties';
import { formatBlogPostUrlParam } from '/src/utils/url/formatBlogPostUrlParam';

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

    const blogUrls = (await getBlogPosts({})).posts.map(
      (post: NotionPage) =>
        `https://prescottjr.com/blog/${formatBlogPostUrlParam({
          title: post.properties.Title.title,
          id: post.id,
        })}`
    );

    await Promise.all(blogUrls.map((url) => fetch(url)));

    console.log(`finished revalidating ${blogUrls.length} pages`);
    console.log(blogUrls.toString());

    return res.json({ revalidated: true });
  } catch (err) {
    console.error('revlidate.error', { error: err });
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res
      .status(500)
      .send(`Error revalidating: ${(err as Error)?.message}`);
  }
}
