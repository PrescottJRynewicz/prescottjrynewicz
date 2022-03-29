import { BlogPost, BlogPostProps } from '/src/pages/Blog/BlogPost';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import fetch from 'node-fetch';
import { BlogPostGetResponse } from '/src/types/api/blog/posts';
import { getApiUrl } from '/src/utils/url/getApiUrl';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';

export default BlogPost;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  // const url = getApiUrl(`blog`);

  // const rawResult = await fetch(url, {
  //   method: 'POST',
  // });

  // const blogs: BlogGetResponse =
  //   (await rawResult.json()) as unknown as BlogGetResponse;

  const blogs = await getBlogPosts({});

  const result = {
    paths: blogs.posts.map((post) => ({
      params: {
        blogPost: [
          post.properties.Title.title
            .map((item) => item.plain_text)
            .join()
            .replace(/\s/g, '-'),
        ],
      },
    })),
    fallback: true,
  };

  return result;
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<BlogPostProps>> {
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
    revalidate: 10,
  };
}
