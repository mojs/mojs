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
  revision:   '0.226.0', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

window.mojs = mojs;

// TODO:
/*
  loosing `parent` option in `then`
  tween looses speed option on stop/pause -> play
  not able to `play()` in `onComplete` callback
  'rand' angle flick with `then`
  ---
  module names
  swirls in then chains for x/y
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

mojs.h     = mojs.helpers;
mojs.delta = mojs.h.delta;

// let tw = new mojs.Tween({
//   duration: 10000,
//   onStart () {
//     console.log('ON START');
//   },
//   onFirstUpdate () {
//     console.log('ON FIRST UPDATE');
//   },
//   onRepeatStart () {
//     console.log('ON REAPEAT START');
//   },
//   onRepeatComplete () {
//     console.log('ON REAPEAT COMPLETE');
//   },
//   onComplete () {
//     console.log('ON COMPLETE');
//   },
//   onUpdate (p) {
//     console.log(p)
//   }
// });

// let play  = document.querySelector('#js-play'),
//     playB = document.querySelector('#js-play-backward'),
//     pause = document.querySelector('#js-pause'),
//     stop  = document.querySelector('#js-stop'),
//     reset = document.querySelector('#js-reset');

// play.addEventListener('click', function () {  tw.play();  });
// playB.addEventListener('click', function () {  tw.playBackward();  });
// pause.addEventListener('click', function () {  tw.pause();  });
// stop.addEventListener('click', function () {  tw.stop();  });
// reset.addEventListener('click', function () {  tw.reset();  });

// ### istanbul ignore next ###
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// ### istanbul ignore next ###
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
