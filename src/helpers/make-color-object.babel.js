import { div } from './div';

/**
 * `normalizeHex` - Function to normalize part of a HEX color to FF format,
 *                  if one character passed, return doubled version of it.
 *
 * @param {Steing} Color part to normalize.
 * @param {Steing} Normalized part of a color.
 */
const normalizeHex = (string) => {
  return (string.length === 2) ? string : string + string;
};

/**
 * `parseHEXColor` - function to parse #HEX colors.
 */
const parseHEXColor = (color) => {
  const result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);
  const colorObj = {}
  if (result) {
    return {
      r: parseInt(normalizeHex(result[1]), 16),
      g: parseInt(normalizeHex(result[2]), 16),
      b: parseInt(normalizeHex(result[3]), 16),
      a: 1
    }
  }
}

/**
 * Function to parse a color string to color object.
 *
 * @param {String} String to parse.
 * @returns {Object} Color object.
 */
const makeColorObject = (color) => {
  const originColor = color;
  // #HEX
  if (color[0] === '#') {
    return parseHEXColor(color);
  } else {
    const isRgb = (color[0] === 'r' && color[1] === 'g' && color[2] === 'b');
    // if color is not `rgb`, it is a shortcut (`cyan`, `hotpink` etc)
    // so we need to set the color on DOM element and get the calculated color
    if (!isRgb) {
      div.style.color = 'black';
      div.style.color = color;
      color = window.getComputedStyle(div).color;
    }

    // parse `rgb` color
    const regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),';
    const regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$';
    const result = new RegExp(regexString1 + regexString2, 'gi').exec(color);
    const a = parseFloat(result[4] || 1);

    if (result) {
      const r = parseInt(result[1], 10);
      const g = parseInt(result[2], 10);
      const b = parseInt(result[3], 10);
      // if origin color was not black but black
      // returned from the DOM - that's an error
      return (originColor !== 'black' && r === 0 && g === 0 && b === 0 && a === 1)
        ? { isError: true } : { r, g, b, a };
    }
  }

  return {
    isError: true
  }
};

export { makeColorObject };
