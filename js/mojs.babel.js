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

window.mojs = {
  revision:   '0.223.2', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// TODO:
/*
  perf optimizations.
  --
  module names
  swirls in then chains for x/y
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

mojs.h     = mojs.helpers;
mojs.delta = mojs.h.delta;

// let tr  = new mojs.Transit({
//       opacity: {0:1}, duration: 10000, x: { 0: 200 },
//       easing: 'linear.none'
//     }),
//     bit = tr.bit,
//     i   = 0;

// var  suite = new Benchmark.Suite;
// suite.add('#1', function () {
//   tr.setProgress( i++ / 10000 );
//   if (i > 10000) { i = 0; }
// })
// .on('cycle', function (e) {
//   console.log(String(e.target));
// })
// .run({ 'async': true });

// let sw = new mojs.Transit({
//   shape: 'circle',
//   x:        { 0: 200 },
//   isTimelineLess: 1,
//   easing: 'linear.none',
//   duration: 4000
// });

// var playEl = document.querySelector('#js-play'),
//     rangeSliderEl = document.querySelector('#js-range-slider');
// document.body.addEventListener('click', function (e) {
//   sw
//     // .tune({ timeline: {delay: 0 , repeat: 1 } })
//     .replay();
// });

// ### istanbul ignore next ###
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// ### istanbul ignore next ###
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
