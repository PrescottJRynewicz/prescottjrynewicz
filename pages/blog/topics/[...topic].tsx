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
  const blogs = await getBlogPosts({});

  const result = {
    paths: blogs.categories
      ? blogs.categories.map((category) => ({
          params: {
            topic: [category],
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
  const category = context?.params?.topic?.[0];

  const blogPosts = await getBlogPosts({ category });

  return {
    props: {
      posts: blogPosts.posts,
      topics: blogPosts.categories || [],
      topic: category,
    },
    revalidate: 10,
  };
}
