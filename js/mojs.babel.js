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
  revision:   '0.250.0', isDebug: true, helpers: h,
  Shape, ShapeSwirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// functions alias
mojs.h       = mojs.helpers;
mojs.delta   = mojs.h.delta;
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

// let cross = new mojs.Shape({
//   shape: 'rect',
//   stroke: 'cyan',
//   isShowStart: 1,
//   // left:   '50%',
//   // top:    '50%',
//   radius: { 50: 100 },
//   // radiusX: { 0: 50 },
//   // radiusY: { 0: 20 },
//   // isTimelineLess:  1,
//   angle: { 0: 400 },
//   fill: 'none',
//   // x:    { 0: 200 },
//   // strokeDasharray:  '100%',
//   // strokeDashoffset: {'-100%': '100%'},
//   duration: 2000,
//   // origin: { '50% 50%': '100% 50%' }
// }).then({
//   x: 0,
//   radius: 0
// });

// document.addEventListener('click', function (e) {
//   cross.tune({
//     radius: { 10: 50 },
//     x: e.pageX,
//     y: e.pageY,
//   }).replay();
// });

// istanbul ignore next
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// istanbul ignore next
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
