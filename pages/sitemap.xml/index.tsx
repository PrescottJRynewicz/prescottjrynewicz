import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';
import { Route } from 'nextjs-routes';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlString =
    process.env.VERCEL_ENV === 'development'
      ? `http://${context.req.headers.host}`
      : `https://${context.req.headers.host}`;
  const url = new URL(urlString);

  const blogPosts = await getBlogPosts({});

  /**
   * Include a generator for each route.
   * If the route doesn't need a sitemap, exclude it below.
   */
  const SiteMapGenerator: Record<
    Exclude<
      Route['pathname'],
      | '/404'
      | '/api/blog/posts/[postId]'
      | '/api/blog/posts/[postId]/like'
      | '/api/revalidate'
      | '/api/blog/posts/[postId]/view'
      | '/api/images/proxy'
      | '/sitemap.xml'
    >,
    ISitemapField[]
  > = {
    '/': [{ loc: url.origin, lastmod: new Date().toISOString(), priority: 1 }],
    '/blog': [
      {
        loc: `${url.origin}/blog`,
        lastmod: new Date().toISOString(),
        priority: 0.9,
      },
    ],
    '/blog/[...blogPost]': blogPosts.posts.map((post) => ({
      loc: `${url.origin}/blog/${post.properties.Title.title
        .map((item) => item.plain_text)
        .join()
        .replace(/\s/g, '-')}`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    })),
    '/blog/topics/[...topic]': blogPosts.categories.map((category) => ({
      loc: `${url.origin}/blog/topics/${category}`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    })),
  };

  console.log(Object.values(SiteMapGenerator).flat());

  return getServerSideSitemapLegacy(
    context,
    Object.values(SiteMapGenerator).flat()
  );
};

export default function Sitemap() {}
