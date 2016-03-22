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

// window.mojs = {
//   revision:   '0.200.3', isDebug: true, helpers: h,
//   Transit, Swirl, Burst, stagger, Spriter, MotionPath,
//   Tween, Timeline, Tweenable, Thenable, Tunable, Module,
//   tweener, easing, shapesMap
// }

// TODO:
/*
  randoms in then chains for transit and swirl.
  Tweak burst for the new reality.
  percentage for radius
*/

var _easingEasing2 = _interopRequireDefault(_easingEasing);

var sw = new mojs.Burst({
  left: '50%', top: '50%',
  isShowEnd: 1,
  radius: { 0: 50 },
  // scale: { 0: 5 },
  // angle: {0: -200},
  // y: { 0: 100 },
  // duration: ,
  isSwirl: 0,
  isRunLess: 1,
  // degree: 40,
  type: 'polygon',
  stroke: 'cyan'
  // childOptions: {
  //   shape:    'polygon',
  //   duration: 2000,
  //   angle:    [{ 0: 90 }, { 0: -90 }, { 0: 90 }, { 0: -90 }]
  // }
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
  .run();
});

// rangeSliderEl.addEventListener('input', function () {
//   tr.setProgress( rangeSliderEl.value/1000 );
// });

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