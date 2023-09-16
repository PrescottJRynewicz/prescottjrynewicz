import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

export function formatBlogPostUrlParam({
  title,
  id,
}: {
  title: RichTextItemResponse[];
  id: string;
}): string {
  return `${title
    .map((item) => item.plain_text)
    .join()
    .toLowerCase()
    .replace(/\s/g, '-')}-${id.replace(/-/g, '')}`;
}
