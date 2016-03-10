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
import tweener    from './tween/tweener';
import easing     from './easing/easing';

window.mojs = {
  revision:   '0.182.0', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, tweener, easing, shapesMap
}

mojs.h     = mojs.helpers;
mojs.delta = mojs.h.delta;

// var tr = new mojs.Transit({
//   left: '50%', top: '50%',
//   shape:    'polygon',
//   angle:    { 0 : 180},
//   fill:     'cyan',
//   points:   { 3 : 12 }, // make triangle
//   duration: 5000,
//   delay:    2000,
//   isShowEnd: 1
// }).play();

// ### istanbul ignore next ###
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// ### istanbul ignore next ###
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
