import { NotionPage } from '/src/types/cms/properties';
import { getNotionCoverUrl } from '/src/utils/getNotionCoverUrl';

/**
 * Helper function to get a cover photo for a blog post
 *
 * A cover photo's signed url can expire during static site generation
 * For example: if the site hasn't been visitied in over 12 hours, a cover
 * photo could expire, and it won't be able to show an image for the first
 * person to visit the page
 *
 * This helper function will use an up-to-date cover photo signed url
 * if it's available.
 *
 * TODO: There will still be an issue for the first person to visit the page
 *  To fix this, we need to use incremental static regeneration - https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
 *  This is only an issue for server rendered pages - i.e. a preview in a text message
 *  Web browsers rendering this will always fetch an updated cover photo
 *
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
    if (new Date(staticPageData.cover.file.expiry_time) < new Date()) {
      if (updatedPageData?.cover) {
        return {
          url: getNotionCoverUrl({ cover: updatedPageData.cover }),
        };
      }
      return {
        url: undefined,
      };
    }
  }

  return {
    url: getNotionCoverUrl({ cover: staticPageData.cover }),
  };
}
