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
  revision: '0.240.0', isDebug: true, helpers: _h2['default'],
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
  fix multiple `module-el` elements
  swirl then issue
  add isForce3d option
  'rand' angle flick with `then`
  not able to `play()` in `onComplete` callback
  ---
  module names
  swirls in then chains for x/y
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

var cross = new mojs.Shape({
  shape: 'rect',
  stroke: 'cyan',
  isShowStart: 1,
  left: '50%',
  top: '50%',
  radiusX: { 0: 50 },
  radiusY: { 0: 20 },
  isTimelineLess: 1,
  angle: { 0: 200 },
  fill: 'none',
  strokeDasharray: '100%',
  strokeDashoffset: { '-100%': '100%' },
  duration: 2000
});

document.addEventListener('click', function () {
  cross.replay();
});

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