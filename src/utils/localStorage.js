/**
 * Get the item with specified key from localStorage.
 *
 * @param {String} key
 */
export function get(key) {
  const response = localStorage.getItem(key);

  if (response) {
    return JSON.parse(response);
  }

  return null;
}

/**
 * Set the item with the specified key in localStorage.
 *
 * @param {String} key
 * @param {String|Array|Number|Object|Boolean} value
 */
export function set(key, value) {
  if (key && value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * Remove the item from the localStorage with specified key.
 *
 * @param   {String}  key
 *
 */
export function remove(key) {
  localStorage.removeItem(key);
}
