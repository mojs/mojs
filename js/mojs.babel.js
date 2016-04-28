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
  revision:   '0.226.6', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

window.mojs = mojs;

// TODO:
/*
  add reset to tweenable
  loosing `parent` option in `then`
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
//   // speed: 5,
//   onUpdate ( p ) {
//     console.log(p);
//   },
//   onComplete (isForward) {
//     // tw.reset();
//     // tw.setProgress(0);
//     // tw.play();
//     // console.log(`COMPLETE: ${isForward}`)
//   }
// });


// let play  = document.querySelector('#js-play'),
//     playB = document.querySelector('#js-play-backward'),
//     pause = document.querySelector('#js-pause'),
//     stop  = document.querySelector('#js-stop'),
//     reset = document.querySelector('#js-reset'),
//     set0  = document.querySelector('#js-set0');

// play.addEventListener('click', function () {  tw.play();  });
// playB.addEventListener('click', function () {  tw.playBackward();  });
// pause.addEventListener('click', function () {  tw.pause();  });
// stop.addEventListener('click', function () {  tw.stop();  });
// reset.addEventListener('click', function () {  tw.reset();  });
// set0.addEventListener('click', function () {  tw.setProgress(0);  });

// ### istanbul ignore next ###
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// ### istanbul ignore next ###
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
