import useSWR from 'swr';
import { NotionPage } from '/src/types/cms/properties';
import { getApiUrl } from '/src/utils/url/getApiUrl';
import { useCallback, useEffect, useState } from 'react';
import { throttle } from '/src/utils/throttle';
import { animateElement } from '/src/utils/animations/animate';
import { BlogPostProps } from '/src/pages/Blog/types';

const getVotedLocalStorageKey = (pageId: string) => `${pageId}:voted`;

const fetcher = (...args: any[]) =>
  // @ts-ignore
  fetch(...args).then(async (res) => await res.json());

export function useUpVotesAndViews({
  pageData,
}: Pick<BlogPostProps, 'pageData'>) {
  const [upvotes, setUpvotes] = useState(
    (pageData?.properties?.Upvotes?.number as number) || 0
  );
  const [views, setViews] = useState(
    (pageData?.properties?.Views?.number as number) || 0
  );
  const [hasUpvoted, setHasUpvoted] = useState(Boolean(false));
  const results = useSWR<{ pageData: NotionPage }>(
    getApiUrl(`blog/posts/${pageData?.id}`),
    fetcher
  );

  const upToDatePageData = results?.data?.pageData;

  useEffect(() => {
    if (upToDatePageData?.properties?.Upvotes?.number) {
      setUpvotes(upToDatePageData.properties.Upvotes.number);
    }
    if (upToDatePageData?.properties?.Views?.number) {
      setViews(upToDatePageData.properties.Views.number);
    }
  }, [results?.data?.pageData]);

  useEffect(() => {
    // Set the state of the has voted feature when on the client
    if (typeof window !== 'undefined' && pageData?.id) {
      setHasUpvoted(
        Boolean(localStorage.getItem(getVotedLocalStorageKey(pageData.id)))
      );

      fetch(getApiUrl(`blog/posts/${pageData.id}/view`), {
        method: 'POST',
      });
    }
  }, [pageData?.id]);

  const updateLikes = useCallback(
    throttle(1000, async () => {
      const thumbsUp = document.getElementById('ThumbsUpButton');

      animateElement({
        node: thumbsUp as HTMLElement,
        removeClassOnComplete: true,
        // This references the just add water animation
        // stylesheet linked in the document head
        animationClassNames: ['animate__animated', 'animate__wobble'],
      });

      const currentUpvotes = upvotes;

      setUpvotes(currentUpvotes + 1);
      setHasUpvoted(true);
      localStorage.setItem(getVotedLocalStorageKey(pageData.id), 'true');

      fetch(getApiUrl(`blog/posts/${pageData.id}/like`), {
        method: 'POST',
        body: JSON.stringify({ upvotes: currentUpvotes + 1 }),
      });
    }),
    [upvotes]
  );

  return {
    updateLikes,
    upvotes,
    views,
    hasUpvoted,
    upToDatePageData,
  };
}
