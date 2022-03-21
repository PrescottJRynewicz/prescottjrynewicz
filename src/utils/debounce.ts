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
export function debounce<Params>(
  hangTime: number,
  funcToRun: (..._params: [Params]) => void
) {
  let interval: ReturnType<typeof setTimeout>;
  return (...params: [Params]) => {
    if (interval) {
      clearInterval(interval);
    }
    interval = setTimeout(() => {
      funcToRun(...params);
    }, hangTime);
  };
}
