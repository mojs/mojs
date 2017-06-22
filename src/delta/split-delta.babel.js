import { parseEasing } from '../easing/parse-easing';
import { tweenDefaults } from '../tween/tween-defaults';
import { separateTweenOptions } from '../delta/separate-tween-options';

/**
 * Function to split the delta object to `tween` options and actual `delta`.
 *
 * @param {Object} Object to split.
 * @returns {Object} Split `delta`.
 */
const splitDelta = (object) => {
  object = { ...object };
  // save curve because we need it directly on the
  // parsed `delta` object vs `tween`
  const curve = (object.curve !== void 0) ? parseEasing(object.curve) : void 0;
  delete object.curve;
  // extract tween options
  const tweenOptions = separateTweenOptions(object);
  // at this point only the `start` -> `end` should left get the values
  const start = Object.keys(object)[0];
  const end = object[start];

  return { start, end, curve, tweenOptions };
};

export { splitDelta as splitDelta };
