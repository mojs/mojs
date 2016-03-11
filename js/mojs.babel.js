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
  revision:   '0.182.2', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, tweener, easing, shapesMap
}

mojs.h     = mojs.helpers;
mojs.delta = mojs.h.delta;

// var tr = new mojs.Transit({
//   left: '50%', top: '50%',
//   shape:    'polygon',
//   strokeWidth: 20,
//   angle:    { 0 : 200},
//   radius:   10,
//   fill:     'none',
//   stroke:   { 'white': 'cyan' },
//   points:   { 3 : 20 }, // make triangle
//   duration: 4000,
//   delay:    8000,
//   isShowEnd: 1,
//   scale: { 0 : 6 },
//   speed: 2,
//   // timeline: { speed: 2 },
//   onStart: function () { console.timeEnd('tw 1 delay'); console.log('start 1'); console.time('tw 1'); },
//   onComplete: function () { console.log('end 1'); console.timeEnd('tw 1'); },
//   // easing: 'expo.in'
// })
// .then({
//   onStart: function () { console.log('start 2'); console.time('tw 2'); },
//   onComplete: function () { console.log('end 2'); console.timeEnd('tw 2'); },
//   points:   3, // make triangle
//   angle:    -180,
//   duration: 3000,
//   stroke: 'yellow',
//   // easing: 'expo.in',
//   scale: .5,
//   speed: 2
// })
// // .then({
// //   strokeWidth: 0,
// //   stroke: 'hotpink',
// //   duration: 400,
// //   easing: 'cubic.out',
// //   // scale: { 1: 1 },
// //   radius: 40,
// //   scale: 1,
// //   angle: 90,
// //   // speed: 1

// //   // opacity: 0
// // }) 
//   // .play();

//   console.log(tr.history[1].delay)

//   setTimeout(function () {
//     console.log('-=-=-=-=- PLAY -=-=-=-=-=-')
//     console.time('tw 1 delay');
//     tr.play();
//   }, 5000);

// document.body.addEventListener('click', function () {

//   tr.run();
// });


// ### istanbul ignore next ###
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// ### istanbul ignore next ###
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
