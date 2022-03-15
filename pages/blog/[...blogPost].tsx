import { BlogPost, BlogPostProps } from '/src/pages/Blog/BlogPost';
import { GetServerSidePropsContext } from 'next';
import fetch from 'node-fetch';
import { BlogPostGetResponse } from '/src/types/api/blog/posts';

export default BlogPost;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{
  props: BlogPostProps;
}> {
  const postName = context.params?.blogPost?.[0];
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/'
      : `${process.env.VERCEL_URL}/api`;

  console.log(baseUrl);

  const rawResult = await fetch(`${baseUrl}blog/posts/${postName}`, {
    method: 'POST',
  });

  const blogPost: BlogPostGetResponse =
    (await rawResult.json()) as unknown as BlogPostGetResponse;

  return {
    props: {
      ...blogPost,
    },
  };
}
