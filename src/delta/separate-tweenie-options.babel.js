import { tweenieDefaults } from '../tween/tweenie-defaults';

/**
 * Function to split the delta object to `tweenie` options and actual `delta`.
 *
 * @param {Object} Object to split.
 * @returns {Object} Split `delta`.
 */
const separateTweenieOptions = (object) => {
  let tweenieOptions;
  for (let option in tweenieDefaults) {
    if (object[option] !== void 0) {
      tweenieOptions = tweenieOptions || {};
      tweenieOptions[option] = object[option];
      delete object[option];
    }
  }
  
  return tweenieOptions;
};

export { separateTweenieOptions as separateTweenieOptions };
