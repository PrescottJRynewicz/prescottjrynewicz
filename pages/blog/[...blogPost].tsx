import { BlogPost, BlogPostProps } from '/src/pages/Blog/BlogPost';
import { GetStaticPropsContext } from 'next';
import fetch from 'node-fetch';
import { BlogPostGetResponse } from '/src/types/api/blog/posts';
import { getApiUrl } from '/src/utils/url/getApiUrl';

export default BlogPost;

export async function getStaticProps(context: GetStaticPropsContext): Promise<{
  props: BlogPostProps;
}> {
  const postName = context.params?.blogPost?.[0];
  const url = getApiUrl(`blog/posts/${postName}`);

  const rawResult = await fetch(url, {
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
