import { Blog, BlogStaticProps } from '/src/pages/Blog/Blog';
import { GetStaticPropsResult } from 'next';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';

export default Blog;

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BlogStaticProps>
> {
  // const url = getApiUrl(`blog`);
  //
  // const rawResult = await fetch(`${url}`, {
  //   method: 'POST',
  // });
  //
  // const blogPosts: BlogGetResponse =
  //   (await rawResult.json()) as unknown as BlogGetResponse;

  const blogPosts = await getBlogPosts({});

  return {
    props: {
      posts: blogPosts.posts,
      categories: blogPosts.categories,
    },
    revalidate: 10,
  };
}
