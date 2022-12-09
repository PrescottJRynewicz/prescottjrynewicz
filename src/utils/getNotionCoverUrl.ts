import { PageCover } from '/src/types/cms/properties';

/**
 * Will return a string for the image url of a notion page cover,
 * depending on the type of image that was uploaded
 *
 * @param cover
 */
export function getNotionCoverUrl({ cover }: { cover: PageCover }) {
  if ('external' in cover) {
    return cover.external.url;
  }
  if ('file' in cover) {
    return cover.file.url;
  }
  return undefined;
}
