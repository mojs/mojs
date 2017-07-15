import { unitRegexp } from './unit-regexp.babel.js';

/**
 * `parseUnitValue` - function to parse a string with unit e.g. `10%`.
 * @param {String, Number, Any} value Value to parse.
 * @param {String} defaultUnit Default unit to fallback to.
 * @returns {Object} Parsed unit object.
 */
export const parseUnitValue = (value, defaultUnit) => {
  const result = {
    unit: defaultUnit,
    value,
  };

  if (typeof value === 'string') {
    const match = value.match(unitRegexp);

    result.unit = (match === null || match === undefined) ? defaultUnit : match[0];
    result.value = parseFloat(value);
  }

  return result;
};
