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
import tweener    from './tween/tweener';
import easing     from './easing/easing';

window.mojs = {
  revision:   '0.173.1', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, tweener, easing, shapesMap
}

mojs.h     = mojs.helpers;
mojs.delta = mojs.h.delta;

// var tween1 = new mojs.Tween({
//   onUpdate: function (p) {
//     console.log(`update 1: ${p}`);
//   }
// });

// var tween2 = new mojs.Tween({
//   onUpdate: function (p) {
//     console.log(`update 2: ${p}`);
//   }
// });

// var tm = new mojs.Timeline({

// });

// tm
//   .add(tween1)
//   .append(tween2)
//   .play();

// console.log( tween1._props.startTime );
// console.log( tween2._props.startTime );

// var tr = new mojs.Transit({
//   shape: 'circle',
//   duration: 10000
// }).then({
//   radius: 0
// });

// tr.run({ x: 100, y: 100 });

// ### istanbul ignore next ###
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// ### istanbul ignore next ###
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
