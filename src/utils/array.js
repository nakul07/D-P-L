import { SORTING_ORDER } from '../constants/constants';

/**
 * Check if array is empty or not.
 *
 * @param {Array} array
 */
export const isEmpty = array => {
  return !Array.isArray(array) || !array.length;
};

/**
 * Sorts the array of objects by the specified sortBy content in
 * both ascending order and descending order given its order type.
 * By default sorts the in ascending order.
 *
 * @param {Array} array
 * @param {String} sortBy
 * @param {Number} order
 *
 * @returns {Array}
 *
 */
export const sortArrayObjects = (
  array,
  sortBy,
  order = SORTING_ORDER.ASCENDING
) => {
  if (!Array.isArray(array)) {
    return [];
  }

  if (!sortBy) {
    return array;
  }

  const sorted = [...array].sort((a, b) =>
    a[sortBy].toString().toLowerCase() > b[sortBy].toString().toLowerCase()
      ? 1 * order
      : -1 * order
  );

  return sorted;
};

/**
 * Reduce function for objects in an array to join string values.
 *
 * @param { Array } objects
 * @param { String } fieldName
 * @param { String } separator
 */
export const buildStringOfFieldsFromObjects = (
  objects,
  fieldName,
  separator = ', '
) => objects.map(object => object[fieldName]).join(separator);

/**
 * Sorts the array in ascending order.
 *
 * @param {Array} array
 */
export const sortArrayValues = array => {
  const sorted = [...array].sort((a, b) =>
    a.toString().toLowerCase() > b.toString().toLowerCase() ? 1 : -1
  );

  return sorted;
};
