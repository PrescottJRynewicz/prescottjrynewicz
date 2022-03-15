import { BlogPost, BlogPostProps } from '/src/pages/Blog/BlogPost';
import { GetStaticPathsResult, GetStaticPropsContext } from 'next';
import fetch from 'node-fetch';
import { BlogPostGetResponse } from '/src/types/api/blog/posts';
import { getApiUrl } from '/src/utils/url/getApiUrl';
import { BlogGetResponse } from '/src/types/api/blog';

export default BlogPost;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const url = getApiUrl(`blog`);

  console.log('here');
  const rawResult = await fetch(url, {
    method: 'POST',
  });

  const blogs: BlogGetResponse =
    (await rawResult.json()) as unknown as BlogGetResponse;

  console.log({
    paths: blogs.posts.map((post) => ({
      params: {
        blogPost: [
          post.properties.Title.title.map((item) => item.plain_text).join('-'),
        ],
      },
    })),
  });
  return {
    paths: blogs.posts.map((post) => ({
      params: {
        blogPost: [
          post.properties.Title.title.map((item) => item.plain_text).join('-'),
        ],
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<{
  props: BlogPostProps;
}> {
  const postName = context.params?.blogPost?.[0];

  console.log('Post', postName);

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
