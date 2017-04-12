/**
 * Function to transform number to frames (16ms each).
 *
 * @param {Number} Number to transform.
 * @returns {Number} Number in frames (16ms each).
 */
export default (number) => {
  return parseInt(16*Math.round(number/16));
};
