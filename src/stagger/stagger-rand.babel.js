import { rand } from '../helpers/rand.babel.js';
import { staggerFunction } from './stagger-function.babel.js';
import { staggerProperty } from '../helpers/stagger-property.babel.js';

/**
 * `staggerRand` - function to create delayed `stagger` function
 *                 that generates random integers in range.
 * @param {Number} min Min bound.
 * @param {Number} max Max bound.
 * @returns {Function} Newly created function that is marked as stagger
 *                     and will call the `rand` one.
 */
export const staggerRand = (min, max) => {
  // mark the function as `stagger` one
  return staggerFunction((i, total) => {
    const minValue = staggerProperty(min, i, total);
    const maxValue = staggerProperty(max, i, total);
    // min/max regarding `staggerProperty` parsing
    return rand(minValue, maxValue);
  });
};
