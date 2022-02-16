/**
 * Set the given element position.
 *
 * In if statement the element is positioned above the top position.
 *
 * @param {*} element
 * @param {*} { Top, left, height, length }.
 */
export function setElementPosition(element, { top, left, height, length }) {
  const windowHeight = window.innerHeight;
  element.style.top = `${top}px`;
  element.style.left = `${left - length}px`;

  if (windowHeight < top + height) {
    element.style.top = `${top - height}px`;
  }
}

export default { setElementPosition };
