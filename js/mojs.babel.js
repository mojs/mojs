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
  revision:   '0.199.0', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// TODO:
/*
  Merge `swirl` and `transit`.
  Tweak burst for the new reality.
  percentage for radius

*/

// var tm = new mojs.Timeline();

// var sw = new mojs.Swirl({
//   radius: {'rand(10,20)': 0},
//   left: '50%', top: '50%',
//   swirlFrequency: {3: 0},
//   swirlSize: {10: 0},
//   y: { 0: -200 },
//   // x: { 0: 200 },
//   duration: 2000,
//   easing: 'ease.out',
//   radiusScale: {2: 0},
//   angleShift: { 'rand(120, 300)': 0}
// });
// .then({
//   radius: 0,
//   swirlFrequency: 6,
//   swirlSize: 10,
//   y: -100,
//   easing: 'ease.in',
//   angleShift: 50
// });

var playEl = document.querySelector('#js-play'),
    rangeSliderEl = document.querySelector('#js-range-slider');
document.body.addEventListener('click', function (e) {
  sw
    // .tune(sw._o)
    // .tune({ swirlFrequency: 'rand(2, 20)' })
    // .generate()
    .play();
});

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
