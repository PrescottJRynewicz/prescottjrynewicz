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
import { getImageCache } from '/src/fetchers/getImageCache';
import { setImageCache } from '/src/fetchers/setImageCache';

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

  try {
    const blogPost = await getBlogPost({ name: postName });

    const { post, pageData } = blogPost;

    let cache: Record<string, PreviewImage> = {};

    const { combinedText, blockIds } = await getImageCache(pageData.id);
    try {
      cache = JSON.parse(combinedText);
    } catch (err) {
      cache = {};
    }

    const { previewImagesMap, newCache } = await getPreviewImageMap(
      post,
      cache
    );

    const coverPhoto = pageData.cover as PageCover;
    const { url } = coverPhoto?.[coverPhoto?.type] || {
      url: speckles.MILK,
    };

    const coverCacheKey = normalizeUrl(url);
    const coverPreview = await getPreviewImage(
      url,
      { cacheKey: coverCacheKey },
      cache
    );

    newCache[coverCacheKey] = coverPreview as PreviewImage;

    post.preview_images = previewImagesMap;

    const newCacheString = Object.entries(newCache)
      .map((value) => value)
      .sort()
      .toString();
    const oldCacheString = Object.entries(cache)
      .map((value) => value)
      .sort()
      .toString();

    if (oldCacheString !== newCacheString) {
      setImageCache(newCache, blockIds, pageData.id).catch(console.error);
    }

    return {
      props: {
        post,
        pageData,
        coverBlurUrl: coverPreview || undefined,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log('error getting static props');

    return {
      notFound: true,
    };
  }
}
