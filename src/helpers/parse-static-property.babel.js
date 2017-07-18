import { Delta } from '../delta/delta.babel.js';

// TODO: cover by unit tests

/**
 * `parseStaticProperty` - function to parse static property
 *                         regarding types in `customProperties`.
 *
 * @param {String} key Property name.
 * @param {String} property Property value.
 * @param {Object} customProperties Custom properties object.
 * @param {Number} index Index.
 */
export const parseStaticProperty = (key, property, customProperties, index = 0, total = 1) => {
  // if property is not defined, just return it
  if (property == null) {
    return property;
  }

  const target = {};
  const object = {
    from: property,
    to: property,
  };
  // greate a delta with `{ from: property, to: property }` transition
  const delta = new Delta({
    key,
    target,
    customProperties,
    index,
    totalItemsInStagger: total,
    object,
    supportProps: target,
  });
  // update the delta with `0` progress
  delta.update(0, 0);

  // get the result on target
  const result = target[key];
  // check if `result` is `NaN` return original propert
  return (isNaN(result) && !result) ? property : result;
};
