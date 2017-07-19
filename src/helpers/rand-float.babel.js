import { parseUnitValue } from '../helpers/parse-unit-value.babel.js';

/**
 * `rand` - function to generate random `float` number in range.
 * @param {Number} min Min bound.
 * @param {Number} max Max bound.
 * @return {Number} Random `float` number in range.
 */
export const randFloat = (min = 0, max = 10) => {
  // parse units
  const minUnitValue = parseUnitValue(min);
  const maxUnitValue = parseUnitValue(max);
  const minNumber = parseFloat(min);
  const maxNumber = parseFloat(max);
  // decide what is the result unit, the `base` one is top priority
  const resultUnit = (maxUnitValue.unit !== undefined)
        ? maxUnitValue.unit
        : minUnitValue.unit;

  const resultNumber = minNumber + (Math.random() * (maxNumber - minNumber));

  return (resultUnit)
      ? `${resultNumber}${resultUnit}`
      : resultNumber;
};
