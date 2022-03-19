import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getApiUrl } from '/src/utils/url/getApiUrl';
import fetch from 'node-fetch';
import { BlogGetResponse } from '/src/types/api/blog';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const url = getApiUrl(`blog`);

  const rawResult = await fetch(`${url}`, {
    method: 'POST',
  });

  const blogPosts: BlogGetResponse =
    (await rawResult.json()) as unknown as BlogGetResponse;

  const routes: ISitemapField[] = blogPosts.posts.map((post) => ({
    loc: `https://prescottjr.com/${post.properties.Title.title
      .map((item) => item.plain_text)
      .join()
      .replace(/\s/g, '-')}`,
    lastmod: new Date().toDateString(),
    priority: 0.7,
  }));

  routes.push(
    ...blogPosts.categories.map((category) => ({
      loc: `https://prescottjr.com/blog/category/${category}`,
      lastmod: new Date().toDateString(),
      priority: 0.7,
    }))
  );

  return getServerSideSitemap(ctx, routes);
};

export default function Sitemap() {}
