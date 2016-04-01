'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _h = require('./h');

var _h2 = _interopRequireDefault(_h);

var _shapesShapesMap = require('./shapes/shapesMap');

var _shapesShapesMap2 = _interopRequireDefault(_shapesShapesMap);

var _burst = require('./burst');

var _burst2 = _interopRequireDefault(_burst);

var _transit = require('./transit');

var _transit2 = _interopRequireDefault(_transit);

var _swirl = require('./swirl');

var _swirl2 = _interopRequireDefault(_swirl);

var _stagger = require('./stagger');

var _stagger2 = _interopRequireDefault(_stagger);

var _spriter = require('./spriter');

var _spriter2 = _interopRequireDefault(_spriter);

var _motionPath = require('./motion-path');

var _motionPath2 = _interopRequireDefault(_motionPath);

var _tweenTween = require('./tween/tween');

var _tweenTween2 = _interopRequireDefault(_tweenTween);

var _tweenTimeline = require('./tween/timeline');

var _tweenTimeline2 = _interopRequireDefault(_tweenTimeline);

var _tweenTweener = require('./tween/tweener');

var _tweenTweener2 = _interopRequireDefault(_tweenTweener);

var _tweenTweenable = require('./tween/tweenable');

var _tweenTweenable2 = _interopRequireDefault(_tweenTweenable);

var _thenable = require('./thenable');

var _thenable2 = _interopRequireDefault(_thenable);

var _tunable = require('./tunable');

var _tunable2 = _interopRequireDefault(_tunable);

var _module2 = require('./module');

var _module3 = _interopRequireDefault(_module2);

var _tweenTweener3 = _interopRequireDefault(_tweenTweener);

var _easingEasing = require('./easing/easing');

var _easingEasing2 = _interopRequireDefault(_easingEasing);

window.mojs = {
  revision: '0.210.0', isDebug: true, helpers: _h2['default'],
  Transit: _transit2['default'], Swirl: _swirl2['default'], Burst: _burst2['default'], stagger: _stagger2['default'], Spriter: _spriter2['default'], MotionPath: _motionPath2['default'],
  Tween: _tweenTween2['default'], Timeline: _tweenTimeline2['default'], Tweenable: _tweenTweenable2['default'], Thenable: _thenable2['default'], Tunable: _tunable2['default'], Module: _module3['default'],
  tweener: _tweenTweener3['default'], easing: _easingEasing2['default'], shapesMap: _shapesShapesMap2['default']
};

// TODO:
/*
  duration to transit defaults
  burst fix the tune for `then` chains
  cover in thenable
  randoms/swirls in then chains for transit and swirl.
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
  // isIt: 1,
  left: '50%', top: '50%',
  // duration: 4000,
  // x: { 0 : 'rand(0, 400)' },
  strokeDasharray: '50%',
  strokeDashoffset: '-50%',
  stroke: 'white',
  fill: 'none',
  isShowStart: 1,
  radius: 150
}).then({
  strokeDashoffset: '100%'
  // x: 'rand(0, 100)'
});
// .then({
//   strokeDashoffset: '-100%'
// })

console.log('-=-=-=-=-=-=-=-=-=-=-=-');
// console.log(sw._history[0].strokeDasharray);
// console.log(sw._history[0].strokeDashoffset);
// console.log(sw._history[1].strokeDashoffset);
// console.log(sw._history[2].strokeDashoffset);

var playEl = document.querySelector('#js-play'),
    rangeSliderEl = document.querySelector('#js-range-slider');
document.body.addEventListener('click', function (e) {
  sw;
  // .tune({
  //   x: e.pageX, y: e.pageY
  //   // fill: 'white', duration: 1000
  // });
  sw.replay();
});

// // rangeSliderEl.addEventListener('input', function () {
// //   tr.setProgress( rangeSliderEl.value/1000 );
// // });

mojs.h = mojs.helpers;
mojs.delta = mojs.h.delta;

// ### istanbul ignore next ###
if (typeof define === "function" && define.amd) {
  define("mojs", [], function () {
    return mojs;
  });
}
// ### istanbul ignore next ###
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = mojs;
}