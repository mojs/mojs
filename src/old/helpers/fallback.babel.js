/**
 * fallbackFactory - function to close over `source` and `fallback`
 *                   objects to search for a identifier in.
 *
 * @param {Object} Source (options) object.
 * @param {Object} Fallback (defaults) object.
 * @returns {Function} Function that searches for an identifier
 *                     in closed objects.
 */
export default (o, defaults) => {
  return (name) => {
    return (o[name] != null) ? o[name] : defaults[name];
  };
};
