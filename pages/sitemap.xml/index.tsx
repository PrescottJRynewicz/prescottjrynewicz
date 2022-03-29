import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const blogPosts = await getBlogPosts({});

  const routes: ISitemapField[] = blogPosts.posts.map((post) => ({
    loc: `https://prescottjr.com/${post.properties.Title.title
      .map((item) => item.plain_text)
      .join()
      .replace(/\s/g, '-')}`,
    lastmod: new Date().toISOString(),
    priority: 0.7,
  }));

  routes.push(
    ...blogPosts.categories.map((category) => ({
      loc: `https://prescottjr.com/blog/category/${category}`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    }))
  );

  return getServerSideSitemap(ctx, routes);
};

export default function Sitemap() {}
