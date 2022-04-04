import { Blog, BlogStaticProps } from '/src/pages/Blog/Blog';
import { GetStaticPropsResult } from 'next';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';

export default Blog;

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BlogStaticProps>
> {
  const blogPosts = await getBlogPosts({});

  return {
    props: {
      posts: blogPosts.posts,
      topics: blogPosts.categories,
    },
    revalidate: 10,
  };
}
