import { Blog, BlogStaticProps } from '/src/pages/Blog/Blog';
import fetch from 'node-fetch';
import { BlogGetResponse } from '/src/types/api/blog';

export default Blog;

export async function getStaticProps(): Promise<{
  props: BlogStaticProps;
}> {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/'
      : `${process.env.VERCEL_URL}/api`;

  const rawResult = await fetch(`${baseUrl}blog`, {
    method: 'POST',
  });

  const blogPosts: BlogGetResponse =
    (await rawResult.json()) as unknown as BlogGetResponse;

  return {
    props: {
      posts: blogPosts.posts,
    },
  };
}
