/**
 * Fun util to help animate HTML Elements
 *
 * Pass in an HTML Element, along with the css classnames
 * to animate it. This will attach the classnames,
 * promisify the end of the animation, and allow for
 * callback patterns as well
 *
 *
 * @param node The HTML Element to animate
 * @param animationClassNames A list of classnames to add
 * @param removeClassOnComplete Boolean to remove the animation classnames once the animation is complete
 * @param callback A callback to invoke once the animation completes if you don't want to use promises
 */
export function animateElement({
  node,
  animationClassNames,
  removeClassOnComplete = false,
  callback = () => {},
}: {
  node: HTMLElement;
  animationClassNames: string[];
  removeClassOnComplete?: boolean;
  callback?: () => any;
}) {
  return new Promise((resolve) => {
    if (node) {
      node.classList.remove(...animationClassNames);
      node.classList.add(...animationClassNames);

      const handleAnimationEnd = (event: AnimationEvent) => {
        if (event.target === node) {
          if (removeClassOnComplete) {
            node.classList.remove(...animationClassNames);
          }
          node.removeEventListener('animationend', handleAnimationEnd);

          if (typeof callback === 'function') {
            callback();
            resolve(null);
          }
        }
      };

      node.addEventListener('animationend', handleAnimationEnd);
    } else {
      resolve(null);
    }
  });
}
