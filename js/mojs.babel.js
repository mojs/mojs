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
  revision:   '0.200.3', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// TODO:
/*
  randoms in then chains for transit and swirl.
  Tweak burst for the new reality.
  percentage for radius
*/

var sw = new mojs.Burst({
  left: '50%', top: '50%',
  isShowEnd: 1,
  radius: { 0: 50},
  scale: { 0: 5 },
  angle: {0: 170},
  duration: 10000,
  // isSwirl: false,
  // degree: 180,
  shape: 'polygon',
  childOptions: {
    shape: 'polygon',
    duration: 2000
  }
  // swirlFrequency: 3,
  // x: {0: 400},
  // isSwirl: 0
  // timeline: {
  //   onUpdate: function () {
  //     console.log(this);
  //   },
  // },
});

var playEl = document.querySelector('#js-play'),
    rangeSliderEl = document.querySelector('#js-range-slider');
document.body.addEventListener('click', function (e) {
  sw
    // .tune(sw._o)
    // .tune({ swirlFrequency: 'rand(2, 20)' })
    .replay();
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
