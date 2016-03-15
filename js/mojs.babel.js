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
import Module     from './module';
import tweener    from './tween/tweener';
import easing     from './easing/easing';

window.mojs = {
  revision:   '0.187.0', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Module,
  tweener, easing, shapesMap
}

// var tr = new mojs.Transit({
//   left: '50%', top: '50%',
//   shape:    'polygon',
//   strokeWidth: 20,
//   angle:    { 0 : 200},
//   radius:   10,
//   fill:     'none',
//   stroke:   { 'white': 'cyan' },
//   points:   { 3 : 20 }, // make triangle
//   duration: 2000,
//   isShowStart: true,
//   isShowEnd: true,
//   timeline: { repeat: 1, yoyo: true, onRepeatComplete: function () { console.log('rep complete'); } },
//   // delay:    4000,
//   scale: { 0 : 6 },
//   // timeline: { repeat: 2, yoyo: true },
//   onStart: ()=> { console.log('start 1'); },
//   onComplete: ()=> { console.log('comple 1'); },
//   // easing: 'expo.in'
// })
// .then({
//   onStart: ()=> { console.log('start 2')},
//   onComplete: ()=> { console.log('comple 2'); },
//   points:   3, // make triangle
//   angle:    -180,
//   duration: 300,
//   stroke: 'yellow',
//   easing: 'expo.in',
//   scale: .5,
// })
// .then({
//   onStart: ()=> { console.log('start 3')},
//   onComplete: ()=> { console.log('comple 3'); },
//   strokeWidth: 0,
//   stroke: 'hotpink',
//   duration: 400,
//   easing: 'cubic.out',
//   // scale: { 1: 1 },
//   radius: 40,
//   scale: 1,
//   angle: 90,
//   // speed: 1
//   // opacity: 0
// })

// var playEl = document.querySelector('#js-play'),
//     rangeSliderEl = document.querySelector('#js-range-slider');
// playEl.addEventListener('click', function () {
//   tr.play();
// });

// rangeSliderEl.addEventListener('input', function () {
//   tr.setProgress( rangeSliderEl.value/1000 );
// });

mojs.h     = mojs.helpers;
mojs.delta = mojs.h.delta;

// ### istanbul ignore next ###
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// ### istanbul ignore next ###
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
