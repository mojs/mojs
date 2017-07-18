/**
 * `staggerMap` - function to mark another function as `stagger` one.
 * @param {_} args Function parameters to make items of the stagger map.
 * @returns {Array} Newly created array that is marked as stagger one.
 */
export const staggerMap = (...args) => {
  // clone the map
  const newMap = [...args];
  // mark as stagger one
  newMap.__mojs__isStaggerMap = true;
  // return the new map
  return newMap;
};
