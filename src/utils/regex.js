import { URL_PATTERN } from '../constants/patterns';

/**
 * Checks if the given string matches the pattern.
 *
 * @param {String} str
 * @param {String} pattern
 */
export function matchString(str, pattern) {
  return pattern.test(str);
}

/**
 * Checks if the given string is valid url or not.
 *
 * @param {String} str
 */
export const isValidUrl = str => {
  const regexp = URL_PATTERN;

  return matchString(str, regexp);
};

/**
 * Truncates leading zeros from string.
 *
 * @param {String} str
 */
export const truncateLeadingZeros = str => {
  const regexp = /^0+/;

  const string = str.replace(regexp, '');

  return string;
};

/**
 * Checks if the given string is a valid pubmed Id.
 *
 * @param {String} str
 * @param {String} pattern
 */
export const getReplacedString = (str, pattern) => {
  return str.replace(pattern, '$1');
};
