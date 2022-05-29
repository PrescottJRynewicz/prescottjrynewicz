/*
 * Will break a string into an array chunks
 */
export function chunkString(str: string, size: number): string[] {
  if (str == null) {
    return [];
  }
  return size > 0
    ? (str.match(new RegExp(`.{1,${size}}`, 'g')) as string[])
    : [str];
}

export function chunkArray<T = any>(arr: T[], chunkSize: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}
