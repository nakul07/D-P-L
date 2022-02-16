/**
 * The debounce function.
 *
 * @param {Function} callback - The function that needs to be debounced.
 * @param {Number} wait - The time in milliseconds to debounce.
 * @param {Boolean} isImmediate - Determines if the function should be run immediately.
 *
 * @returns {Function}
 */
export function debounce(callback, wait = 1000, isImmediate = false) {
  let timeoutRef;

  return function(...args) {
    const context = this;

    const later = function() {
      timeoutRef = null;

      if (!isImmediate) {
        callback.apply(context, args);
      }
    };

    const shouldCallNow = isImmediate && !timeoutRef;

    clearTimeout(timeoutRef);

    timeoutRef = setTimeout(later, wait);

    if (shouldCallNow) {
      callback.apply(context, args);
    }
  };
}

export default { debounce };
