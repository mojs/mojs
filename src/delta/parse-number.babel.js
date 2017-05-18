/**
 * Function parse number delta.
 *
 * @param {String} Name of the property.
 * @param {Object} Object to parse.
 * @returns {Object} Parsed `delta`.
 */
const parseNumber = (name, object) => {
  const result = {
    type: 'number',
    name,
    ...object
  };
  // parse the values in case we have strings there
  result.start = parseFloat(result.start);
  result.end = parseFloat(result.end);
  // calculate delta
  result.delta = result.end - result.start;

  return result;
};

export { parseNumber as parseNumber };
