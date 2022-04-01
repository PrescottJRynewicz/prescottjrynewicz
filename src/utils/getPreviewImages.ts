import got from 'got';
import lqip from 'lqip-modern';
import pMap from 'p-map';
import pMemoize from 'p-memoize';
import { ExtendedRecordMap, PreviewImage, PreviewImageMap } from 'notion-types';
import { getPageImageUrls, normalizeUrl } from 'notion-utils';

import { mapImageUrl } from './mapImageUrl';

/**
 * This function is inspired by https://github.com/transitive-bullshit/nextjs-notion-starter-kit/blob/85e2336a6f361887a3c2650d413ae52ea1262076/lib/preview-images.ts#L9
 *
 * It will take an initial record map of notion blocks, and create base64
 * blur image preview for each one.
 *
 * @param recordMap
 * @param cache
 */
export async function getPreviewImageMap(
  recordMap: ExtendedRecordMap,
  cache: Record<string, PreviewImage>
): Promise<{
  previewImagesMap: PreviewImageMap;
  newCache: Record<string, PreviewImage>;
}> {
  const urls: string[] = getPageImageUrls(recordMap, {
    mapImageUrl,
  }).filter(Boolean);

  const newCache: Record<string, PreviewImage> = {};

  const map = await pMap(
    urls,
    async (url) => {
      const cacheKey = normalizeUrl(url);
      const previewImage = await getPreviewImage(url, { cacheKey }, cache);
      if (previewImage) {
        newCache[cacheKey] = previewImage;
      }

      return [cacheKey, previewImage];
    },
    {
      concurrency: 8,
    }
  );

  const previewImagesMap: PreviewImageMap = Object.fromEntries(map);

  return { previewImagesMap, newCache };
}

async function createPreviewImage(
  url: string,
  { cacheKey }: { cacheKey: string },
  cache: Record<string, PreviewImage>
): Promise<PreviewImage | null> {
  try {
    const cachedPreviewImage = cache[cacheKey];
    if (cachedPreviewImage) {
      console.log('using cache for image');
      console.log('\t url', url);
      console.log('\t key', cacheKey, '\n\n');
      return cachedPreviewImage;
    }

    const { body } = await got(url, { responseType: 'buffer' });
    const result = await lqip(body);

    const previewImage = {
      originalWidth: result.metadata.originalWidth,
      originalHeight: result.metadata.originalHeight,
      dataURIBase64: result.metadata.dataURIBase64,
    };

    return previewImage;
  } catch (err) {
    console.warn('error creating preview image', url, err);
    return null;
  }
}

export const getPreviewImage = pMemoize(createPreviewImage);
