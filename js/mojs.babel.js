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
  revision:   '0.214.3', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// TODO:
/*
  timeline: {} for transit and burst after tune
  callbacksContext for the masterSwirl
  add onPlaybackStart, onPlaybackStop,
  onPlaybackFinish methods to support mojs-player
  perf optimizations.
  --
  add target instead of parent.
  module names
  swirls in then chains for x/y
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

mojs.h     = mojs.helpers;
mojs.delta = mojs.h.delta;


// let speedEl = document.querySelector('#js-speed-slider'),
//     timeEl  = document.querySelector('#js-range-slider')

// var isSet = false;
// var sw = new mojs.Tween({
//   duration: 10000,
//   onComplete: function () {
//     setTimeout( function () {
//       sw.play();
//     }, 1);
//   },
//   onUpdate: function (p) {
//     timeEl.value = p*1000;
//   }
// }).play();


// speedEl.addEventListener('input', function () {
//   sw._setProp('speed', this.value/1000);
// });

// var sw = new mojs.Transit({
//   count: 5,
//   left: '50%', top: '50%',
//   isShowEnd: 1,
//   isShowStart: 1,
//   // isSwirl: false,
//   radius: { 0: 100 },
//   timeline: { delay: 1000 },
//   x: {0: 200},
//   y: 0,
//   angle: 90,
//   easing: 'expo.out',
//   // childOptions: {
//   //   shape: 'cross',
//   //   duration: 3000,
//   //   isSwirl: 0,
//   //   radius: 20,
//   //   stroke: ['cyan', 'yellow', 'white'],
//   //   angle: { 0: 180 }
//   // }
// }).then({
//   x:      0,
//   degree: 180,
//   // delay: 2000,
//   angle:  0,
//   radius: 100,
//   childOptions: { radius: 20 }
// }).then({
//   angle: 180,
//   x: 200, y: 200,
//   childOptions: { radius: 0 }
// });

// var sw = new mojs.Swirl({
//   x: { 0: 200 },
//   radius: 5,
//   duration: 4000
// }).then({
//   x: 0
// }).then({
//   x: 200
// });

// var sw = new mojs.Transit({
//   top: '50%', left: '50%',
//   x: { 200: 0 },
//   isShowEnd: true
// }).then({
//   x: 100
// }).then({
//   x: 300, y: -200
// });

// console.log(sw._history[0].isShowEnd)
// console.log(sw._history[1].isShowEnd)
// console.log(sw._history[2].isShowEnd)

// var playEl = document.querySelector('#js-play'),
//     rangeSliderEl = document.querySelector('#js-range-slider');
// document.body.addEventListener('click', function (e) {
//   sw
//     // .tune({ timeline: {delay: 5000} })
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
