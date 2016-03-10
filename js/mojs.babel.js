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
  revision:   '0.179.2', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, tweener, easing, shapesMap
}

mojs.h     = mojs.helpers;
mojs.delta = mojs.h.delta;

// var tr = new mojs.Transit({
//   radius: { 20 : 200 },
//   isShowStart: true,
//   isShowEnd: true
// }).then({
//   radius: { 200: 0 }
// }).then({
//   radius: { 0: 400 },
//   duration: 2000
// })

//   console.log(tr.history[2].duration);


// document.body.addEventListener('click', function (e) {
//   // tr.run({ left: e.pageX, top: e.pageY });
//   tr.run({ duration: 5000 });
//   console.log(tr.history[2].duration);
//   // console.log(tr.timeline._props.duration);
//   // console.log(tr.timeline._props.endTime - tr.timeline._props.startTime);
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
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// ### istanbul ignore next ###
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
