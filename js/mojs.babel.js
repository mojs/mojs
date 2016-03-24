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
  revision:   '0.202.0', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// TODO:
/*
  randoms in then chains for transit and swirl.
  Tweak burst for the new reality.
  stagger in delay
  parse rand(stagger(20, 10), 20) values
  perf optimizations.
  percentage for radius
*/

var sw = new mojs.Burst({
  // delay: 'stagger(50)',
  duration: 1000,
  left: '50%', top: '50%',
  strokeDasharray: '100% 100%',
  strokeDashoffset: { '100%': '-100%' },
  // x: {0: 400}, y: 0,
  // angle: 'stagger(15)',
  // duration: 1000,
  isShowEnd: 1,
  degree: 10,
  // angle:  {0: 300},
  // randomRadius: .85,
  radius: {0: 200},
  radiusScale:      'rand(.25, 1)',
  angleShift:       'rand(-10, 10)',
  // swirlFrequency:   'rand(3, 6)',
  // onComplete: function () { console.log('complete', this) },
  // timeline: { onComplete: function () { console.log('complete', this) }, },
  count: 7,
  isSwirl: 0,
  fill: 'white',

  // shape: 'line',
  // stroke: 'cyan',
  childOptions: {
    // isSwirl: 0,
    radius: { 'rand(2, 4)': 0 },
    isShowEnd: false
  }
  //   // radius: {5: 0},
  //   // angle: 'stagger(20, rand(10, 20))',

});

var playEl = document.querySelector('#js-play'),
    rangeSliderEl = document.querySelector('#js-range-slider');
document.body.addEventListener('click', function (e) {
  sw
    // .tune(sw._o)
    // .generate()
    // .tune({ swirlFrequency: 'rand(2, 20)' })
    .play();
    // .run();
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
