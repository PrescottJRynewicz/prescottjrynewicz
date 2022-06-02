/**
 *
 * Helper function to paginate notion api.
 *
 * The notion api always takes in one object parameter. This method
 * genericizes that parameter, and wraps the method call in a pagination
 * strategy to return all results for a given query.
 * @param method
 * @param params
 */
export async function paginateNotion<
  BlockType,
  Method extends (
    ..._args: Parameters<Method>
  ) => // eslint-disable-next-line camelcase
  Promise<{ results: any; next_cursor: string | null; has_more: boolean }>
>(method: Method, ...params: Parameters<Method>) {
  // @ts-ignore
  const [arg1] = params;

  let iterations = 0;
  let hasMore = true;
  let nextCursor: string | undefined;
  const blocks: BlockType[] = [];

  while (hasMore && iterations <= 5000) {
    const methodParams = {
      ...arg1,
      start_cursor: nextCursor || undefined,
    };

    // @ts-ignore
    // eslint-disable-next-line no-await-in-loop
    const results = await method(methodParams);

    blocks.push(...(results.results as BlockType[]));

    iterations += 1;
    nextCursor = results.next_cursor || undefined;
    hasMore = results.has_more;
  }

  return {
    results: blocks,
  };
}
