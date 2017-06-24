import { Delta } from '../delta/delta';

// TODO: cover

/**
 * `parseStaticProperty` - function to parse static property
 *                         regarding types in `customProperties`.
 *
 * @param {String} key Property name.
 * @param {String} property Property value.
 * @param {Object} customProperties Custom properties object.
 * @param {Number} index Index.
 */
export const parseStaticProperty = (key, property, customProperties, index = 0) => {
  const target = {};
  const object = {};
  const supportProps = {};
  object[property] = property;

  const delta = new Delta({
    key,
    target,
    customProperties,
    index,
    object,
    supportProps
  });
  // update the delta with `0` progress
  delta.update(0,0);
  // get the result on target
  const result = target[key];
  // check if `result` is `NaN` return original propert
  return (isNaN(result) && !result) ? property : result;
};
