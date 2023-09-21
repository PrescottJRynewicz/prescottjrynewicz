import { BlogPost } from '/src/pages/Blog/BlogPost';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';
import { getBlogPost } from '/src/fetchers/getPost';
import { getBlurredImages } from '/src/fetchers/getBlurredImages';
import { BlogPostProps } from '/src/pages/Blog/types';
import { formatBlogPostUrlParam } from '/src/utils/url/formatBlogPostUrlParam';

export default BlogPost;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const blogs = await getBlogPosts({});

  const result = {
    paths: blogs.posts.map((post) => {
      const blogPost = formatBlogPostUrlParam({
        title: post.properties.Title.title,
        id: post.id,
      });

      return {
        params: {
          blogPost: [blogPost],
        },
      };
    }),
    fallback: true,
  };

  return result;
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<BlogPostProps>> {
  const postName = context.params?.blogPost?.[0];

  if (!postName) {
    return {
      notFound: true,
    };
  }

  try {
    const blogPost = await getBlogPost({ name: postName });

    const { post, pageData } = blogPost;

    const { previewImagesMap, coverPreview } = await getBlurredImages({
      post,
      pageData,
    });

    post.preview_images = previewImagesMap;

    return {
      props: {
        post,
        pageData,
        coverBlurUrl: coverPreview || null,
      },
      revalidate: 60 * 60 * 6, // every 6 hours
    };
  } catch (error) {
    console.log('error getting static props');
    console.log(error);

    return {
      notFound: true,
    };
  }
}
