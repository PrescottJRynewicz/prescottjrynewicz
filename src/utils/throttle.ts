const cache: Record<string, { canRun: boolean; result: any }> = {};

/**
 * Custom throttle.
 *
 * Will return a handler with the same signature as the one passed in.
 * This handler will run at maximum once every waitTime. If the handler
 * is called again before it can be run, it will return the value from
 * the last successful run.
 *
 * @param waitTime
 * @param funcToRun
 */
export function throttle<Params, Return>(
  waitTime: number,
  funcToRun: (..._params: [Params]) => Return
) {
  if (!(funcToRun.toString() in cache)) {
    cache[funcToRun.toString()] = { canRun: true, result: null };
  }

  return (...params: [Params]) => {
    const { canRun } = cache[funcToRun.toString()];
    if (canRun) {
      cache[funcToRun.toString()].canRun = false;
      cache[funcToRun.toString()].result = funcToRun(...params);
      setTimeout(() => {
        cache[funcToRun.toString()].canRun = true;
      }, waitTime);
    }
    return cache[funcToRun.toString()].result;
  };
}
