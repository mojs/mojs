import { tweenDefaults } from '../tween/tween-defaults';

/**
 * Function to split the delta object to `tween` options and actual `delta`.
 *
 * @param {Object} Object to split.
 * @returns {Object} Split `delta`.
 */
const separateTweenOptions = (object) => {
  let tweenOptions;
  for (let option in tweenDefaults) {
    if (object[option] !== void 0) {
      tweenOptions = tweenOptions || {};
      tweenOptions[option] = object[option];
      delete object[option];
    }
  }

  return tweenOptions;
};

export { separateTweenOptions as separateTweenOptions };
