import { parseEasing } from '../easing/parse-easing.babel.js';
import { separateTweenOptions } from '../delta/separate-tween-options.babel.js';

/**
 * Function to split the delta object to `tween` options and actual `delta`.
 *
 * @param {Object} Object to split.
 * @returns {Object} Split `delta`.
 */
const splitDelta = (object) => {
  const obj = { ...object };
  // save curve because we need it directly on the
  // parsed `delta` object vs `tween`
  const curve = (obj.curve !== undefined)
                  ? parseEasing(obj.curve) : undefined;
  delete obj.curve;
  // extract tween options
  const tweenOptions = separateTweenOptions(obj);

  let start;
  let end;
  // if `{ from: x, to: x }` syntax used
  if (obj.from != undefined && obj.to != undefined) { // eslint-disable-line eqeqeq
    start = obj.from;
    end = obj.to;
  // else `{ from: to }` syntax used
  } else {
    // at this point only the `start` -> `end` should left get the values
    start = Object.keys(obj)[0];
    end = obj[start];
  }

  return { start, end, curve, tweenOptions };
};

export { splitDelta };
