/**
 * `parseElement` - function to parse element.
 *
 * @param {Sting, HTMLElement} el Element to parse.
 * @return {HTMLElement} Parsed `html` element.
 */
export const parseElement = (el) => {
  // if `selector` passed, find the element in the DOM
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }

  return el;
};
