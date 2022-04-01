import { ExtendedRecordMap, PreviewImage } from 'notion-types';
import { getImageCache } from '/src/fetchers/getImageCache';
import {
  getPreviewImage,
  getPreviewImageMap,
} from '/src/utils/getPreviewImages';
import { NotionPage, PageCover } from '/src/types/cms/properties';
import { speckles } from '/design-system/colors';
import { normalizeUrl } from 'notion-utils';
import { setImageCache } from '/src/fetchers/setImageCache';

/**
 * This method will take a post, and attach image previews.
 *
 * It will attempt to populate these from a cache, and if not, it
 * will create them
 * @param post
 * @param pageData
 */
export async function getBlurredImages({
  post,
  pageData,
}: {
  post: ExtendedRecordMap;
  pageData: NotionPage;
}) {
  const { cache, blockIds } = await getImageCache(pageData);

  const { previewImagesMap, newCache } = await getPreviewImageMap(post, cache);

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

  const newCacheString = Object.entries(newCache)
    .map((value) => value)
    .sort()
    .toString();
  const oldCacheString = Object.entries(cache)
    .map((value) => value)
    .sort()
    .toString();

  if (oldCacheString !== newCacheString) {
    console.log('updating image cache for page', pageData.id);
    setImageCache(newCache, blockIds, pageData).catch(console.error);
  }

  return {
    previewImagesMap,
    coverPreview,
  };
}
