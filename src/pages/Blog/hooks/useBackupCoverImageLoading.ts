import { NotionPage } from '/src/types/cms/properties';
import { ReactEventHandler, useCallback, useState } from 'react';

/**
 * Helper to determine loading for expired cover images
 * @param staticPageData
 * @param updatedPageData
 * @param staticUrl
 */
export function useBackupCoverImageLoading({
  staticPageData,
  updatedPageData,
  staticUrl,
}: {
  staticPageData: NotionPage;
  updatedPageData: NotionPage | undefined;
  staticUrl: string | undefined;
}) {
  // We control image blurring if the static url is expired or not present
  const [shouldBlurCover, setShouldBlurCover] = useState(!staticUrl);

  const updateImageBlur = useCallback<ReactEventHandler<HTMLImageElement>>(
    (event) => {
      if (shouldBlurCover && updatedPageData?.cover?.type === 'file') {
        if (event.currentTarget?.src?.includes('http')) {
          setShouldBlurCover(false);
        }
      }
    },
    [staticPageData, updatedPageData]
  );

  return {
    updateImageBlur,
    shouldBlurCover,
  };
}
