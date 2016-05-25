'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _h = require('./h');

var _h2 = _interopRequireDefault(_h);

var _shapesShapesMap = require('./shapes/shapesMap');

var _shapesShapesMap2 = _interopRequireDefault(_shapesShapesMap);

var _burst = require('./burst');

var _burst2 = _interopRequireDefault(_burst);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _shapeSwirl = require('./shape-swirl');

var _shapeSwirl2 = _interopRequireDefault(_shapeSwirl);

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

var mojs = {
  revision: '0.253.1', isDebug: true, helpers: _h2['default'],
  Shape: _shape2['default'], ShapeSwirl: _shapeSwirl2['default'], Burst: _burst2['default'], stagger: _stagger2['default'], Spriter: _spriter2['default'], MotionPath: _motionPath2['default'],
  Tween: _tweenTween2['default'], Timeline: _tweenTimeline2['default'], Tweenable: _tweenTweenable2['default'], Thenable: _thenable2['default'], Tunable: _tunable2['default'], Module: _module3['default'],
  tweener: _tweenTweener3['default'], easing: _easingEasing2['default'], shapesMap: _shapesShapesMap2['default']
};

// functions alias
mojs.h = mojs.helpers;
mojs.delta = mojs.h.delta;
// module alias
mojs.Transit = mojs.Shape;
mojs.Swirl = mojs.ShapeSwirl;

window.mojs = mojs;

// TODO:
/*
  generate for timelineless shape/swirl
  swirl then issue
  'rand' angle flick with `then`
  not able to `play()` in `onComplete` callback
  ---
  module names
  swirls in then chains for x/y
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

var shape = new mojs.Shape({
  left: '50%', top: '50%',
  radius: 50,
  duration: 2000,
  scaleX: {
    1: 1,
    easing: mojs.easing.path('M0,100 C0,100 2.08241272,101.287388 3.78271484,102.328264 C5.35552883,99.9999999 7.00048828,95.208496 7.00048828,95.208496 L10.1762695,103.816964 L12.7734375,95.9547991 L19.3125,102.328264 L22.2539062,95.208496 L27.0786839,106.645089 L29.2555809,93.3549108 L32.0340385,103.816964 L35.3459816,94.6015626 L38.3783493,103.092634 L41.0513382,95.9547991 L43.7739944,106.645089 L45.6729927,96.8973214 L50,105.083147 L53.3504448,93.3549108 L57.7360497,103.816964 L60.8616066,95.9547991 L65.0345993,103.092634 L68.6997757,97.5106029 L71.6646194,102.03125 L75.5066986,96.5672433 L78.2949219,102.652344 L81.0313873,96.8973214 L84.0174408,102.328264 L86.0842667,97.7332592 L88.7289352,101.606306 L91.1429977,98.3533763 L94.3822556,101.287388 L97.0809174,98.7254467 L100,100'),
    isPropCurve: true
  }
});

shape.play();

// istanbul ignore next
if (typeof define === "function" && define.amd) {
  define("mojs", [], function () {
    return mojs;
  });
}
// istanbul ignore next
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = mojs;
}