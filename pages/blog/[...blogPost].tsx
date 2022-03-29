import { BlogPost, BlogPostProps } from '/src/pages/Blog/BlogPost';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { getBlogPosts } from '/src/fetchers/getBlogPosts';
import { getBlogPost } from '/src/fetchers/getPost';
import {
  getPreviewImage,
  getPreviewImageMap,
} from '/src/utils/getPreviewImages';
import { speckles } from '/design-system/colors';
import { PageCover } from '/src/types/cms/properties';
import { normalizeUrl } from 'notion-utils';
import { PreviewImage } from 'notion-types';
import { updateImageCache } from '/src/fetchers/updateImageCache';

export default BlogPost;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
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

  if (!postName) {
    return {
      notFound: true,
    };
  }

  const blogPost = await getBlogPost({ name: postName });

  const { post, pageData } = blogPost;

  let cache: Record<string, PreviewImage> = {};

  try {
    const cacheString = pageData.properties.Cache?.rich_text
      .map((item) => item.plain_text)
      .join();

    cache = JSON.parse(cacheString);
  } catch (err) {
    cache = {};
  }

  const { previewImagesMap, shouldUpdateCache } = await getPreviewImageMap(
    post,
    cache
  );

  const coverPhoto = pageData.cover as PageCover;
  const { url } = coverPhoto?.[coverPhoto?.type] || {
    url: speckles.PINK_STARBURST,
  };

  const coverCacheKey = normalizeUrl(url);
  const coverPreview = await getPreviewImage(
    url,
    { cacheKey: coverCacheKey },
    cache
  );

  post.preview_images = previewImagesMap;

  if (
    shouldUpdateCache ||
    coverPreview?.dataURIBase64 !== cache[coverCacheKey]?.dataURIBase64
  ) {
    // should update cache here.
    console.log('going to update cache');

    if (coverPreview) {
      cache[coverCacheKey] = { ...coverPreview };
    }

    updateImageCache(cache, pageData.id);
  }

  return {
    props: {
      post,
      pageData,
      coverBlurUrl: coverPreview || undefined,
    },
    revalidate: 10,
  };
}
