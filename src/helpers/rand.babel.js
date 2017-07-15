import { randFloat } from './rand-float';

/**
 * `rand` - function to generate random `integer` number in range.
 * 
 * @param {Number} min Min bound.
 * @param {Number} max Max bound.
 * @return {Number} Random `integer` number in range.
 */
export const rand = (min = 0, max = 10) => {
  return Math.round(randFloat(min, max));
};