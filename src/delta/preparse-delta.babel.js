import { tweenieDefaults } from '../tween/tweenie-defaults';
// copy the defaults and add `curve` property
const tweenieProperties = { ...tweenieDefaults, curve: true };

/**
 * Function to split the delta object to `tweenie` options and actual `delta`.
 *
 * @param {Object} Object to split.
 * @returns {Object} Split `delta`.
 */
const preparseDelta = (object) => {
  object = { ...object };

  // loop thru tweenieDefaults and extract them from the object
  let tweenieOptions;
  for (let option in tweenieProperties) {
    if (object[option] !== void 0) {
      tweenieOptions = tweenieOptions || {};
      tweenieOptions[option] = object[option];
      delete object[option];
    }
  }
  // at this point only the `start` -> `end` should left get the values
  const start = Object.keys(object)[0];
  const end = object[start];

  return { start, end, tweenieOptions };
};

export { preparseDelta as preparseDelta };
