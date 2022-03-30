/*
 * Will break a string into an array chunks
 */
export function chunk(str: string, size: number): string[] {
  if (str == null) {
    return [];
  }
  return size > 0
    ? (str.match(new RegExp(`.{1,${size}}`, 'g')) as string[])
    : [str];
}
