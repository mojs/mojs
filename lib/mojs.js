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
  revision: '0.183.0', isDebug: true, helpers: _h2['default'],
  Transit: _transit2['default'], Swirl: _swirl2['default'], Burst: _burst2['default'], stagger: _stagger2['default'], Spriter: _spriter2['default'], MotionPath: _motionPath2['default'],
  Tween: _tweenTween2['default'], Timeline: _tweenTimeline2['default'], Tweenable: _tweenTweenable2['default'], tweener: _tweenTweener3['default'], easing: _easingEasing2['default'], shapesMap: _shapesShapesMap2['default']
};

mojs.h = mojs.helpers;
mojs.delta = mojs.h.delta;

var ns = 'http://www.w3.org/2000/svg';
var svg = document.createElementNS(ns, 'svg');

var tr = new mojs.Transit({
  left: '50%', top: '50%',
  shape: 'polygon',
  strokeWidth: 20,
  angle: { 0: 200 },
  radius: 10,
  fill: 'none',
  stroke: { 'white': 'cyan' },
  points: { 3: 20 }, // make triangle
  duration: 2000,
  // delay:    4000,
  isShowEnd: 1,
  scale: { 0: 6 },
  // timeline: { repeat: 2, yoyo: true },
  onStart: function onStart() {
    console.log('start 1');
  },
  onComplete: function onComplete() {
    console.log('comple 1');
  },
  onFirstUpdate: function onFirstUpdate() {
    console.log('first update 1');
  }
}). // easing: 'expo.in'
then({
  onStart: function onStart() {
    console.log('start 2');
  },
  onComplete: function onComplete() {
    console.log('comple 2');
  },
  onFirstUpdate: function onFirstUpdate() {
    console.log('first update 2');
  },
  points: 3, // make triangle
  angle: -180,
  duration: 300,
  stroke: 'yellow',
  easing: 'expo.in',
  scale: .5
}).then({
  onStart: function onStart() {
    console.log('start 3');
  },
  onComplete: function onComplete() {
    console.log('comple 3');
  },
  onFirstUpdate: function onFirstUpdate() {
    console.log('first update 3');
  },
  strokeWidth: 0,
  stroke: 'hotpink',
  duration: 400,
  easing: 'cubic.out',
  // scale: { 1: 1 },
  radius: 40,
  scale: 1,
  angle: 90
});
// .play();

// speed: 1
// opacity: 0
var sliderEl = document.querySelector('#js-range-slider');
sliderEl && sliderEl.addEventListener('input', function () {
  tr.setProgress(sliderEl.value / 1000);
});

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