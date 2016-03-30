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
  revision:   '0.208.2', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// TODO:
/*
  burst fix the tune for `then` chains
  cover in thenable
  randoms in then chains for transit and swirl.
  module names
  perf optimizations.
  --
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

let sw = new mojs.Burst({
  count: 5,
  left: '50%', top: '50%',
  isShowEnd: 1,
  childOptions: {
    fill: 'cyan',
    duration: 2000
  }
}).then({
  childOptions: { radius: 10 }
});

var playEl = document.querySelector('#js-play'),
    rangeSliderEl = document.querySelector('#js-range-slider');
document.body.addEventListener('click', function (e) {
  sw
    // .tune({
    //   fill: 'white', duration: 1000
    // })
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
