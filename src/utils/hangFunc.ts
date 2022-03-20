const cache: Record<string, ReturnType<typeof setTimeout>> = {};

/**
 * This utility takes in a function and a hangTime in Ms. It returns a function
 * that, when called, will wait hangTime before executing the original function.
 *
 * But, if the returned function is called again before hangTime is over, the
 * previous call will not be executed.
 *
 * @param funcToRun
 * @param hangTime
 */
export function hangFunc<Params>(
  hangTime: number,
  funcToRun: (..._params: [Params]) => void
) {
  return (...params: [Params]) => {
    const key = funcToRun.toString();

    if (cache[key]) {
      clearInterval(cache[key]);
    }
    cache[key] = setTimeout(() => {
      funcToRun(...params);
    }, hangTime);
  };
}
