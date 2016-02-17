import h          from './h';
import shapesMap  from './shapes/shapesMap';
import Burst      from './burst';
import Transit    from './transit';
import Swirl      from './swirl';
import Stagger    from './stagger';
import Spriter    from './spriter';
import MotionPath from './motion-path';
import Tween      from './tween/tween';
import Timeline   from './tween/timeline';
import Tweener    from './tween/tweener';
import tweener    from './tween/tweener';
import easing     from './easing/easing';

window.mojs = {
  revision:   '0.169.2', isDebug: true, helpers: h,
  Transit, Swirl, Burst, Stagger, Spriter, MotionPath,
  Tween, Timeline, tweener, easing, shapesMap
}

mojs.h     = mojs.helpers;
mojs.delta = mojs.h.delta;

// new mojs.Transit({
//   shape:        'polygon',
//   points:       5,
//   strokeWidth:  { 2: 10 },
//   tween:        {
//     duration:     2000,
//     delay:        200,
//     yoyo:         true,
//     repeat:       20,
//     onUpdate: function (pe, p) {
//       mojs.h.style( someEl, 'transform', `translateX(${20*p}px)` );
//     }
//   }
// });

// new mojs.Transit({
//   shape:        'polygon',
//   points:       5,
//   strokeWidth:  { 2: 10 },

//   duration:     2000,
//   delay:        200,
//   yoyo:         true,
//   repeat:       20,
//   onUpdate: function (pe, p) {
//     mojs.h.style( someEl, 'transform', `translateX(${20*p}px)` );
//   }
// });

// ### istanbul ignore next ###
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// ### istanbul ignore next ###
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
