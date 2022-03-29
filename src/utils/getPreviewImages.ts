import got from 'got';
import lqip from 'lqip-modern';
import pMap from 'p-map';
import pMemoize from 'p-memoize';
import { ExtendedRecordMap, PreviewImage, PreviewImageMap } from 'notion-types';
import { getPageImageUrls, normalizeUrl } from 'notion-utils';

import { mapImageUrl } from './mapImageUrl';

// NOTE: this is just an example of how to pre-compute preview images.
// Depending on how many images you're working with, this can potentially be
// very expensive to recompute, so in production we recommend that you cache
// the preview image results in a key-value database of your choosing.
// If you're not sure where to start, check out https://github.com/jaredwray/keyv

export async function getPreviewImageMap(
  recordMap: ExtendedRecordMap,
  cache: Record<string, PreviewImage>
): Promise<{ previewImagesMap: PreviewImageMap; shouldUpdateCache: boolean }> {
  const urls: string[] = getPageImageUrls(recordMap, {
    mapImageUrl,
  }).filter(Boolean);

  let shouldUpdateCache = false;

  const map = await pMap(
    urls,
    async (url) => {
      const cacheKey = normalizeUrl(url);
      const previewImage = await getPreviewImage(url, { cacheKey }, cache);
      if (previewImage?.dataURIBase64 !== cache[cacheKey]?.dataURIBase64) {
        if (previewImage) {
          cache[cacheKey] = previewImage;
          shouldUpdateCache = true;
        }
      }
      return [cacheKey, previewImage];
    },
    {
      concurrency: 8,
    }
  );

  if (shouldUpdateCache) {
    console.log('should update cache here');
  }

  const previewImagesMap: PreviewImageMap = Object.fromEntries(map);

  return { previewImagesMap, shouldUpdateCache };
}

async function createPreviewImage(
  url: string,
  { cacheKey }: { cacheKey: string },
  cache: Record<string, PreviewImage>
): Promise<PreviewImage | null> {
  try {
    try {
      const cachedPreviewImage = cache[cacheKey];
      if (cachedPreviewImage) {
        console.log('using cache');
        return cachedPreviewImage;
      }
    } catch {
      // ignore redis errors
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
