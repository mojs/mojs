import { makeColorObject } from '../helpers/make-color-object';

/**
 * Function parse color delta.
 *
 * @param {String} Name of the property.
 * @param {Object} Object to parse.
 * @returns {Object} Parsed `delta`.
 */
const parseColor = (name, object) => {
  const start = makeColorObject(object.start);
  const end = makeColorObject(object.end);
  const delta = {
    r: end.r - start.r,
    g: end.g - start.g,
    b: end.b - start.b,
    a: end.a - start.a
  };

  return {
    ...object,
    type: 'color',
    name, start,
    end, delta
  };
};

export { parseColor };
