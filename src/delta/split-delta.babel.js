import { parseEasing } from '../easing/parse-easing';
import { tweenieDefaults } from '../tween/tweenie-defaults';
import { separateTweenieOptions } from '../delta/separate-tweenie-options';

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
  const curve = (object.curve !== void 0) ? parseEasing(object.curve) : void 0;
  delete object.curve;
  // extract tweenie options
  const tweenieOptions = separateTweenieOptions(object);
  // at this point only the `start` -> `end` should left get the values
  const start = Object.keys(object)[0];
  const end = object[start];

  return { start, end, curve, tweenieOptions };
};

export { splitDelta as splitDelta };
