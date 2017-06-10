import { path } from './path';
/**
 * TODO:
 *  [] add `setParent` public method.
 */

import { pow } from './pow';

/**
 * `easing` - object that holds all easing avaliable in `mojs`.
 */
const easing = {
  /**
   * `Linear` easing, also `null` or `id` easing - simply returns whatever
   * passed to the function.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  linear: { none: k => k },

  /**
   * `Sin` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  sin: {
     in: (k) => { return 1 - Math.cos(k * Math.PI / 2); },
     out: (k) => { return Math.sin(k * Math.PI / 2); },
     inout: (k) => { return 0.5 * (1 - Math.cos(Math.PI * k)); }
  },

  pow,
  path
};

export { easing as easing };
