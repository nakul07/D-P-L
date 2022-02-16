import { isEmpty as isStringEmpty } from './string';

/**
 * Converts the data object after submitting the query to query params.
 *
 * @param {Object} data
 */
export const create = function(data) {
  const newData = { ...data };
  const keys = Object.keys(newData);
  let queryParams = '?';

  keys &&
    keys.forEach((key, index) => {
      if (
        !isStringEmpty(
          typeof newData[key] === 'boolean' ? `${newData[key]}` : newData[key]
        )
      ) {
        const newKey = encodeSpaceWithAscii(key);

        newData[key] = encodeURIComponent(newData[key]);

        queryParams =
          index === 0
            ? `${queryParams}${newKey}=${newData[key]}`
            : `${queryParams}&${newKey}=${newData[key]}`;
      }
    });

  return queryParams;
};

/**
 * Replaces the globally found spaces in the string with %20.
 * 'John Doe'=>'John%20Doe'.
 *
 * @param {String} data
 */
function encodeSpaceWithAscii(data) {
  let result = data;

  if (typeof result === 'string') {
    result = result.replace(/\s/g, '%20');
  }

  return result;
}

export default create;
