import React from 'react';
import { getUrl } from '/src/utils/url/getApiUrl';
import { useRouter } from 'next/router';

export function SEOTags({
  title,
  description,
  imageUrl,
  router,
  emoji,
}: {
  title: string;
  description: string;
  emoji?: string & { length: 1 };
  imageUrl?: string;
  router: ReturnType<typeof useRouter>;
}) {
  const image = imageUrl || getUrl('site-image.png');

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, all" />

      <link rel="canonical" href={getUrl(router.asPath.slice(1))} />
      <link
        rel="icon"
        href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%22100%22>${
          emoji ?? '👨🏻‍🦰'
        }</text></svg>`}
      />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={getUrl(router.asPath.slice(1))} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Prescott's Playground" />
      <meta property="twitter:card" content="summary_large_image" />
    </>
  );
}
