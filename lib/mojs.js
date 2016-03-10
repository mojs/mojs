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

var _tweenTweener3 = _interopRequireDefault(_tweenTweener);

var _easingEasing = require('./easing/easing');

var _easingEasing2 = _interopRequireDefault(_easingEasing);

window.mojs = {
  revision: '0.179.1', isDebug: true, helpers: _h2['default'],
  Transit: _transit2['default'], Swirl: _swirl2['default'], Burst: _burst2['default'], stagger: _stagger2['default'], Spriter: _spriter2['default'], MotionPath: _motionPath2['default'],
  Tween: _tweenTween2['default'], Timeline: _tweenTimeline2['default'], Tweenable: _tweenTweenable2['default'], tweener: _tweenTweener3['default'], easing: _easingEasing2['default'], shapesMap: _shapesShapesMap2['default']
};

mojs.h = mojs.helpers;
mojs.delta = mojs.h.delta;

// var tr = new mojs.Transit({
//   // duration: 500,
//   // angle: 90,
//   // delay: 2000,
//   // duration: 500,
//   radius: { 20 : 200 },
//   strokeWidth: { 100 : 0},
//   stroke: 'cyan',
//   // radiusX: { 100: 0 },
//   isShowStart: true,
//   isShowEnd: true,
//   // left: '50%', top: '50%',
//   fill: 'none',
//   shape: 'circle'
// })

// document.body.addEventListener('click', function (e) {
//   tr.run({ left: e.pageX, top: e.pageY });
// });

//   .then({ radius: 50 })
//   .then({ radius: 0 })
//   .then({ radius: 10 })
//   // .play()

// setTimeout(function () {
//   tr.setProgress(0);
//   tr.setProgress(.1);
//   tr.setProgress(.2);
//   tr.setProgress(.3);
//   tr.setProgress(.4);
//   tr.setProgress(.5);
//   tr.setProgress(.8);
//   tr.setProgress(.9);
//   tr.setProgress(1);
// }, 100)

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