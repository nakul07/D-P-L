/**
 * Function to collect all attribute and store it into an object.
 *
 * @param {Array} attributes
 * @returns {Object}
 */
export default function collectAttributes(attributes) {
  const attributeObject = {};

  for (let i = 0; i < attributes.length; i++) {
    Object.assign(attributeObject, {
      [attributes[i].nodeName]: attributes[i].nodeValue,
    });
  }

  return attributeObject;
}
