/**
 * Checks whether the incoming value is empty or null.
 *
 * @param {String} value
 */
export const isEmpty = value => {
  if (typeof value === 'string') {
    return !value.trim();
  }
  return !value;
};

/**
 * String splits to substring by a given character.
 *
 * @param {String} str
 * @param {String} character
 */
export const splitStringToSubstring = (str, character) => {
  return str.split(character);
};

/**
 * Trims the string.
 *
 * @param {String} str
 */
export const trimString = str => {
  return str.trim();
};

/**
 *  Accepts a string value and returns it back with an ellipsis if the string length
 * is greater than the max length specified. Otherwise, return the original string.
 *
 * @param   {String}  str
 * @param   {Number}  max
 *
 * @returns  {String}
 */
export function ellipsis(str, max) {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.length > max ? `${str.substring(0, max)}…` : str;
}

/**
 *  Capitalize first Letter of the string.
 *
 * @param   {String}  str
 *
 * @returns  {String}
 */
export function capitalize(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Creates the acronym from the string passed.
 * For eg: 'John Doe' => 'JD'.
 *
 * @param {String} label
 * @returns {String}
 */
export const getAcronym = label => {
  if (isEmpty(label)) {
    return '';
  }

  const word = label.toUpperCase().split(' ');

  return word.length > 1 ? word[0][0] + word[word.length - 1][0] : word[0][0];
};

/**
 * Returns the file extension.
 *
 * @param {String} file
 */
export const getFileExtension = file => {
  if (isEmpty(file)) {
    return '';
  }

  return file.split('.').pop();
};

/**
 * Build supplied string by interpolating properties after delimiter ':' with the given parameters.
 *
 * @example
 * interpolate(':name is here.', {name: 'Barbara'})
 * => 'Barbaba is here.'
 *
 * @param {string} str
 * @param {object} params
 *
 * @returns string
 */

export const interpolate = (str, params = {}) => {
  let formattedString = str;

  for (const [key, value] of Object.entries(params)) {
    const val = value || '';

    formattedString = formattedString.replace(
      new RegExp(':' + key, 'gi'),
      val.toString()
    );
  }

  return formattedString;
};
