import Tween        from './tween/tween';
import Timeline     from './tween/timeline';
import Tweener      from './tween/tweener';

var mojs = {
  revision:   '2.0.0',
  Tween, Timeline, tweener
}

/**
 * Definitions - AMD, CommonJS, ES2015, Global
 */
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
export default mojs;
(typeof window !== 'undefined') && (window.mojs = mojs);
