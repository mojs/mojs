import { defaultEasing } from '../constants';
import splitEasing from './splitEasing';


/**
 * parseEasing - function to parse all easing values to a function.
 *
 * @param  {String, Function, Array} Easing representation.
 * @return {Function} Parsed Easing.
 */
export default (easing = defaultEasing.join('.'), easings) => {
  const type = typeof easing;

  switch (type) {
    case 'function' { return easing; }
    case 'string': {
      easing = splitEasing(easing);
      const easingParent = easings[easing[0]];
      if (!easingParent) {
        console.error(`:mojs: Easing with name ${easing[0]} was not found,
                      fallback to "linear.none" instead`);
        return easings[defaultEasing[0]][defaultEasing[1]];
      }
      return easingParent[easing[1]];
      // comming soon:
      // parse `path` easing that can start with `M`, `SVG` command.
      // ---
      // if (easing.charAt(0).toLowerCase() !== 'm') { }
      // else { return this.path(easing); }
    }
    // // comming soon:
    // //   - if array passed - parse as `bezier` function
    // // ---
    // case 'object' {
    //   if (easing instanceof Array.constructor) {
    //     return this.bezier.apply(this, easing);
    //   } else {
    //     console.error(
    //       `:mojs: Failed to parse easing value of `,
    //       easing,
    //       ` fallback to "linear.none" instead`
    //     );
    //     return easings[defaultEasing[0]][defaultEasing[1]];
    //   }
    // }
  }

};
