import h          from './h';
import shapesMap  from './shapes/shapesMap';
import Burst      from './burst';
import Transit    from './transit';
import Swirl      from './swirl';
import stagger    from './stagger';
import Spriter    from './spriter';
import MotionPath from './motion-path';
import Tween      from './tween/tween';
import Timeline   from './tween/timeline';
import Tweener    from './tween/tweener';
import Tweenable  from './tween/tweenable';
import Thenable   from './thenable';
import Tunable    from './tunable';
import Module     from './module';
import tweener    from './tween/tweener';
import easing     from './easing/easing';

var mojs = {
  revision:   '0.231.0', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

window.mojs = mojs;

// TODO:
/*
  'rand' angle flick with `then`
  not able to `play()` in `onComplete` callback
  ---
  module names
  swirls in then chains for x/y
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

mojs.h     = mojs.helpers;
mojs.delta = mojs.h.delta;

// let mojsPlayer = new MojsPlayer({
//   add:       tr
// });

// istanbul ignore next
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// istanbul ignore next
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
