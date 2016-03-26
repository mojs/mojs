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
  revision: '0.207.1', isDebug: true, helpers: _h2['default'],
  Transit: _transit2['default'], Swirl: _swirl2['default'], Burst: _burst2['default'], stagger: _stagger2['default'], Spriter: _spriter2['default'], MotionPath: _motionPath2['default'],
  Tween: _tweenTween2['default'], Timeline: _tweenTimeline2['default'], Tweenable: _tweenTweenable2['default'], Thenable: _thenable2['default'], Tunable: _tunable2['default'], Module: _module3['default'],
  tweener: _tweenTweener3['default'], easing: _easingEasing2['default'], shapesMap: _shapesShapesMap2['default']
};

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
  left: '50%', top: '50%',
  duration: 500,
  easing: 'ease.out',
  // stroke:       'cyan',
  // fill:         'none',
  radius: 0,
  isShowEnd: 1,
  // angle:        {0: 90},
  isSwirl: true,
  fill: ['#333', '#666', '#999', '#c1c1c1', '#f5f5f5'],
  childOptions: {
    // radius: [{125: 150}, {100: 125}, {75: 100}, {50: 75}, { 25: 50 }],
    radius: { 'stagger(125, -25)': 'stagger(150, 25)' }
  }
}); //.then({ radius: 0, angle: 0 });

var playEl = document.querySelector('#js-play'),
    rangeSliderEl = document.querySelector('#js-range-slider');
document.body.addEventListener('click', function (e) {
  console.log('REPLAy');
  sw
  // .tune({ left: e.pageX, top: e.pageY, angle: { 0: -90 }, stroke: 'orange' })
  .play();
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