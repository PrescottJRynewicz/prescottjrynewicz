import { ExtendedRecordMap } from 'notion-types';
import {
  getPreviewImage,
  getPreviewImageMap,
} from '/src/utils/getPreviewImages';
import { NotionPage, PageCover } from '/src/types/cms/properties';
import { speckles } from '/design-system/colors';

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
  // const { cache, blockIds } = await getImageCache(pageData);

  const { previewImagesMap } = await getPreviewImageMap(post);

  const coverPhoto = pageData.cover as PageCover;
  const { url } = coverPhoto?.[coverPhoto?.type] || {
    url: speckles.MILK,
  };

  const coverPreview = await getPreviewImage(url);

  return {
    previewImagesMap,
    coverPreview,
  };
}
