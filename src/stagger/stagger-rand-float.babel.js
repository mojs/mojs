import { randFloat } from '../helpers/rand-float.babel.js';
import { staggerFunction } from './stagger-function.babel.js';
import { staggerProperty } from '../helpers/stagger-property.babel.js';

/**
 * `staggerRand` - function to create delayed `stagger` function
 *                 that generates random floats in range.
 * @param {Number} min Min bound.
 * @param {Number} max Max bound.
 * @returns {Function} Newly created function that is marked as stagger
 *                     and will call the `rand` one.
 */
export const staggerRandFloat = (min, max) => {
  // mark the function as `stagger` one
  return staggerFunction((i, total) => {
    const minValue = staggerProperty(min, i, total);
    const maxValue = staggerProperty(max, i, total);
    // generate random float regarding `stagger` parsing
    return randFloat(minValue, maxValue);
  });
};

