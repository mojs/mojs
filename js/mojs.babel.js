import h            from './h';
import shapesMap    from './shapes/shapesMap';
import Burst        from './burst';
import Shape        from './shape';
import ShapeSwirl   from './shape-swirl';
import stagger      from './stagger';
import Spriter      from './spriter';
import MotionPath   from './motion-path';
import Tween        from './tween/tween';
import Timeline     from './tween/timeline';
import Tweener      from './tween/tweener';
import Tweenable    from './tween/tweenable';
import Thenable     from './thenable';
import Tunable      from './tunable';
import Module       from './module';
import tweener      from './tween/tweener';
import easing       from './easing/easing';

var mojs = {
  revision:   '0.257.0', isDebug: true, helpers: h,
  Shape, ShapeSwirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// functions alias
mojs.h        = mojs.helpers;
mojs.delta    = mojs.h.delta;
// custom shape add function and class
mojs.addShape    = mojs.shapesMap.addShape;
mojs.CustomShape = mojs.shapesMap.custom;
// module alias
mojs.Transit = mojs.Shape;
mojs.Swirl   = mojs.ShapeSwirl;

window.mojs = mojs;

// TODO:
/*
  swirl then issue
  'rand' angle flick with `then`
  not able to `play()` in `onComplete` callback
  ---
  module names
  swirls in then chains for x/y
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

// const swirl = new mojs.Shape({
//   shape: 'polygon',
//   left: '50%', top: '50%',
//   // y: { 0: -200 },
//   // angle: 'rand(90, 180)',
//   angle: { 0: 'rand(90, 180)' },
//   duration: 2000,
//   scale: 5
// }).then({
//   angle: 0
// });

// console.log( swirl._history[0].angle );
// console.log( swirl._deltas.angle );
// // console.log( swirl._history[1].angle );

// // console.log(rect._o.angle);

// document.addEventListener('click', function () {

//   swirl
//     .generate()
//     .replay();
//   // console.log(burst._deltas.radius)
//   // rect
//   //   .generate()
//   //   .replay();

//   // console.log(rect._deltas.angle);
//   // console.log(rect._o.angle);
// });

// istanbul ignore next
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// istanbul ignore next
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
