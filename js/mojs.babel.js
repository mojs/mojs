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
  revision:   '0.207.3', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// TODO:
/*
  burst fix the tune for `then` chains
  randoms in then chains for transit and swirl.
  module names
  perf optimizations.
  --
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

var sw = new mojs.Burst({
  left: '50%',  top: '50%',
  duration:     500,
  // delay: 'stagger(400, 75)',
  easing:       'ease.out',
  // stroke:       'cyan',
  // fill:         'none',
  // radius:       0,
  isShowEnd:    1,
  count:        2,
  // angle:        {0: 90},
  isSwirl:      true,
  isShowStart:  1,
  fill: 'red'

}).then({ fill: ['cyan', 'orange'], childOptions: { radius: 10 } });

// console.log(sw._swirls[0]._history);

var playEl = document.querySelector('#js-play'),
    rangeSliderEl = document.querySelector('#js-range-slider');
document.body.addEventListener('click', function (e) {
  // console.log('REPLAy')
  sw
    // .tune({ left: e.pageX, top: e.pageY, angle: { 0: -90 }, stroke: 'orange' })
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
