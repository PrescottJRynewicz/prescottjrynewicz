import { NotionPage } from '/src/types/cms/properties';
import { getNotionCoverUrl } from '/src/utils/getNotionCoverUrl';

/**
 * Helper function to get a cover photo for a blog post
 *
 * A cover photo's signed url can expire during static site generation
 * For example: if the site hasn't been visitied in over 12 hours, a cover
 * photo could expire and it won't be able to show an image for the first
 * person to visit the page
 *
 * This helper function will use an up to date cover photo signed url
 * if it's available.
 * @param updatedPageData
 * @param staticPageData
 */
export function getPageCover({
  updatedPageData,
  staticPageData,
}: {
  staticPageData: NotionPage;
  updatedPageData: NotionPage | undefined;
}) {
  if (staticPageData.cover.type === 'file') {
    console.log(
      'Cover Photo expiring on',
      staticPageData.cover.file?.expiry_time
    );
    if (new Date(staticPageData.cover.file.expiry_time) < new Date()) {
      console.log('cover photo is expired - fetching new photo');
    }
  }

  if (updatedPageData?.cover) {
    return getNotionCoverUrl({ cover: updatedPageData.cover });
  }

  return getNotionCoverUrl({ cover: staticPageData.cover });
}
