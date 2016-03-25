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
  revision:   '0.206.0', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// TODO:
/*
  add then, generate to burst.
  randoms in then chains for transit and swirl.
  module names
  parse rand(stagger(20, 10), 20) values
  perf optimizations.
  percentage for radius
*/

var sw = new mojs.Burst({
  left: '50%', top: '50%',
  duration:     2000,
  easing:       'ease.out',
  // shape:        ['cross', 'polygon', 'zigzag'],
  points:       'rand(3, 5)',
  stroke:       'cyan',
  fill:         'none',
  radius:       {0: 50},
  angle:        190,
  degreeShift:  'rand(-50,50)',
  pathScale:    'rand(.5, 1)',
  // strokeWidth:  { 2 : 0 }
});

var playEl = document.querySelector('#js-play'),
    rangeSliderEl = document.querySelector('#js-range-slider');
document.body.addEventListener('click', function (e) {
  sw
    .tune({
      left: e.pageX, top: e.pageY,
      duration: 250,
      easing: 'ease.out',
      isSwirl: 1,
      timeline: {
        onComplete: function () { console.log('comple'); }
      }
      // childOptions: {
      //   radius: 'rand(10, 50)'
      // }
    })
    // .generate()
    // .tune({ swirlFrequency: 'rand(2, 20)' })
    .replay();
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
