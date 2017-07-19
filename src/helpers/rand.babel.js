import { randFloat } from './rand-float.babel.js';
import { parseUnitValue } from '../helpers/parse-unit-value.babel.js';

/**
 * `rand` - function to generate random `integer` number in range.
 * @param {Number} min Min bound.
 * @param {Number} max Max bound.
 * @return {Number} Random `integer` number in range.
 */
export const rand = (min = 0, max = 10) => {
  const randomFloat = randFloat(min, max);
  const resultUnit = parseUnitValue(randomFloat);
  const resultNumber = Math.round(parseFloat(randomFloat));

  return (resultUnit.unit)
      ? `${resultNumber}${resultUnit.unit}`
      : resultNumber;
};
