import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { BlogStaticProps } from '/src/pages/Blog/Blog';
import Blog from '/pages/blog';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';

export default Blog;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  // const url = getApiUrl(`blog`);
  //
  // const rawResult = await fetch(url, {
  //   method: 'POST',
  // });
  //
  // const blogs: BlogGetResponse =
  //   (await rawResult.json()) as unknown as BlogGetResponse;

  const blogs = await getBlogPosts({});

  const result = {
    paths: blogs.categories
      ? blogs.categories.map((category) => ({
          params: {
            category: [category],
          },
        }))
      : [],
    fallback: true,
  };

  return result;
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<BlogStaticProps>> {
  // const url = getApiUrl(`blog`);

  const category = context?.params?.category?.[0];
  // const rawResult = await fetch(`${url}?category=${category || ''}`, {
  //   method: 'POST',
  // });
  //
  // const blogPosts: BlogGetResponse =
  //   (await rawResult.json()) as unknown as BlogGetResponse;

  const blogPosts = await getBlogPosts({ category });

  return {
    props: {
      posts: blogPosts.posts,
      categories: blogPosts.categories || [],
      category,
    },
    revalidate: 10,
  };
}
