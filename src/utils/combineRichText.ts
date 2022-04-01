import { RichTextProperty } from '/src/types/cms/properties';

/**
 * Simple method to combine a rich text block into one plain string
 * @param richTextBlock
 */
export function combineRichText(richTextBlock: RichTextProperty) {
  if (richTextBlock?.rich_text) {
    return richTextBlock.rich_text.map((item) => item.plain_text).join('');
  }
  return '';
}
