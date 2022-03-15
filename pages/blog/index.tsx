import { Blog, BlogStaticProps } from '/src/pages/Blog/Blog';
import fetch from 'node-fetch';
import { BlogGetResponse } from '/src/types/api/blog';
import { getApiUrl } from '/src/utils/url/getApiUrl';
import { GetStaticPropsResult } from 'next';

export default Blog;

/**
 * TODO: Update this to be getStaticProps once endpoits are deployed
 * and blog is cleaned up.
 */
export async function getStaticProps(): Promise<
  GetStaticPropsResult<BlogStaticProps>
> {
  const url = getApiUrl(`blog`);

  const rawResult = await fetch(`${url}`, {
    method: 'POST',
  });

  const blogPosts: BlogGetResponse =
    (await rawResult.json()) as unknown as BlogGetResponse;

  return {
    props: {
      posts: blogPosts.posts,
    },
    revalidate: 10,
  };
}
