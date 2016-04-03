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
  revision:   '0.211.3', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// TODO:
/*
  fix parsing new params in tune calls
  burst fix the tune for `then` chains
  duration to transit defaults
  cover in thenable
  swirls in then chains for transit and swirl.
  module names
  perf optimizations.
  --
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

// let sw = new mojs.Burst({
//   count: 5,
//   // left: '50%', top: '50%',
//   isShowEnd: 1,
//   isShowStart: 1,
//   // isSwirl: false,
//   radius: { 0: 100 },
//   x: {0: 200},
//   y: 0,
//   angle: 90,
//   childOptions: {
//     shape: 'line',
//     duration: 2000,
//     isSwirl: 0,
//     radius: { 7: 4 },
//     stroke: ['cyan', 'yellow', 'white'],
//     angle: { 0: 180 }
//   }
// }).then({
//   x: 0,
//   angle: 0,
//   childOptions: { radius: 20 }
// }).then({
//   angle: 180,
//   x: 200, y: 200,
//   childOptions: { radius: 0 }
// });

var sw = new mojs.Transit({
  x: { 0: 200 }
}).then({
  x: 400,
}).then({
  x: 'rand(400, 600)', y: -200
});

var playEl = document.querySelector('#js-play'),
    rangeSliderEl = document.querySelector('#js-range-slider');
document.body.addEventListener('click', function (e) {
  return;
  console.log('-=-=-=-=-=-')
  console.log(sw._history[0].x)
  console.log(sw._history[1].x)
  console.log(sw._history[2].x)

  sw
    .tune({
      x: e.pageX,
      y: e.pageY
      // fill: 'white', duration: 1000
    });
  console.log('-=-=-=-=-=-')
  console.log(sw._history[0].x)
  console.log(sw._history[1].x)
  console.log(sw._history[2].x)
  sw
    .replay();
});

// // rangeSliderEl.addEventListener('input', function () {
// //   tr.setProgress( rangeSliderEl.value/1000 );
// // });

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
