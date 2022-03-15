import { Blog, BlogStaticProps } from '/src/pages/Blog/Blog';
import fetch from 'node-fetch';
import { BlogGetResponse } from '/src/types/api/blog';
import { getApiUrl } from '/src/utils/url/getApiUrl';

export default Blog;

/**
 * TODO: Update this to be getStaticProps once endpoits are deployed
 * and blog is cleaned up.
 */
export async function getServerSideProps(): Promise<{
  props: BlogStaticProps;
}> {
  const baseUrl = getApiUrl(`blog`);

  const rawResult = await fetch(`${baseUrl}`, {
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
