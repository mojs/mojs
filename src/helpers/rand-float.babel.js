/**
 * `rand` - function to generate random `float` number in range.
 * @param {Number} min Min bound.
 * @param {Number} max Max bound.
 * @return {Number} Random `float` number in range.
 */
export const randFloat = (min = 0, max = 10) => {
  return min + (Math.random() * (max - min));
};
