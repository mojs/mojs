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
mojs.h       = mojs.helpers;
mojs.delta   = mojs.h.delta;
// module alias
mojs.Transit = mojs.Shape;
mojs.Swirl   = mojs.ShapeSwirl;

window.mojs = mojs;

// TODO:
/*
  custom shapes
  swirl generate issue
  timeline issues

  swirl then issue
  'rand' angle flick with `then`
  not able to `play()` in `onComplete` callback
  ---
  module names
  swirls in then chains for x/y
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

const sw = new mojs.Shape({
  left: '50%', top: '50%',
  degree: 90,
  isSwirl: true,
  // y: 0,
  // x:  { 0: 100 },
  // y:  { 0: 'rand(0, 200)' },
  duration: 2000,
});

// const sw = new mojs.Burst({
//   left: '50%', top: '50%',
//   degree: 90,
//   isSwirl: true,
//   radius: { 0 : 'rand(0, 500)' },
//   isIt: 1,
//   childOptions: {
//     // shape: 'line',
//     // stroke: 'cyan',
//     // radius: 20,
//     radius: 'rand(5, 20)',
//     scaleX: { 1 : 0 },
//     duration: 2000,
//     // pathScale: 'rand(.5, 1)',
//     degreeShift: 'rand(0, 360)',
//     // angle: 45
//   }
// });

sw.play();

document.body.addEventListener( 'click', function () {
  sw
    .generate()
    .replay();
});

// istanbul ignore next
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// istanbul ignore next
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
