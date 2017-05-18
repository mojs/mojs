import { parseEasing } from '../easing/parse-easing';
import { tweenieDefaults } from '../tween/tweenie-defaults';

/**
 * Function to split the delta object to `tweenie` options and actual `delta`.
 *
 * @param {Object} Object to split.
 * @returns {Object} Split `delta`.
 */
const splitDelta = (object) => {
  object = { ...object };
  // save curve because we need it directly on the
  // parsed `delta` object vs `tweenie`
  const curve = (object.curve !== void 0)
                  ? parseEasing(object.curve) : void 0;
  delete object.curve;
  // loop thru tweenieDefaults and extract them from the object
  let tweenieOptions;
  for (let option in tweenieDefaults) {
    if (object[option] !== void 0) {
      tweenieOptions = tweenieOptions || {};
      tweenieOptions[option] = object[option];
      delete object[option];
    }
  }
  // at this point only the `start` -> `end` should left get the values
  const start = Object.keys(object)[0];
  const end = object[start];

  return { start, end, curve, tweenieOptions };
};

export { splitDelta as splitDelta };
