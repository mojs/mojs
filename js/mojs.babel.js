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
  revision:   '0.225.1', isDebug: true, helpers: h,
  Transit, Swirl, Burst, stagger, Spriter, MotionPath,
  Tween, Timeline, Tweenable, Thenable, Tunable, Module,
  tweener, easing, shapesMap
}

// TODO:
/*
  module names
  swirls in then chains for x/y
  parse rand(stagger(20, 10), 20) values
  percentage for radius
*/

mojs.h     = mojs.helpers;
mojs.delta = mojs.h.delta;

// let el      = document.querySelector('#js-el'),
//     speedEl = document.querySelector('#js-speed-slider'),
//     tw      = new mojs.Tween({
//       duration: 20000,
//       // delay:    1000,
//       repeat: 3,
//       easing: 'linear.none',
//       onPlaybackStart () {
//         console.log('PB START');
//       },
//       onPlaybackPause () {
//         console.log('PB PAUSE');
//       },
//       onPlaybackComplete () {
//         console.log('PB COMPLETE');
//       },
//       onPlaybackStop () {
//         console.log('PB STOP');
//       },
//       onStart () {
//         console.log('ON START');
//       },
//       onRepeatStart () {
//         console.log('ON REPEAT START');
//       },
//       onComplete () {
//         console.log('ON COMPLETE');
//       },
//       onRepeatComplete () {
//         console.log('ON REPEAT COMPLETE');
//       },
//       onFirstUpdate () {
//         console.log('ON FIRST UPDATE');
//       },
//       onUpdate (p) {
//         console.log('ON UPDATE');
//         el.style.transform = `translateX( ${1000*p}px )`;
//         // console.log(p)
//       },
//       // onStart    () { console.time('duration'); },
//       // onComplete () { console.timeEnd('duration'); },
//     })
//     // .play();


// let playBtn         = document.querySelector('#js-play'),
//     playBackwardBtn = document.querySelector('#js-play-backward'),
//     pauseBtn        = document.querySelector('#js-pause'),
//     stopBtn         = document.querySelector('#js-stop');

// speedEl.addEventListener('input', function () {
//   tw.setSpeed( this.value/1000 );
// });

// playBtn.addEventListener('click', function () { tw.play(); });
// playBackwardBtn.addEventListener('click', function () { tw.playBackward(); });
// pauseBtn.addEventListener('click', function () { tw.pause(); });
// stopBtn.addEventListener('click', function () { tw.stop(); });


// let x1Btn    = document.querySelector('#js-x1'),
//     x25Btn   = document.querySelector('#js-x25'),
//     x50Btn   = document.querySelector('#js-x50'),
//     x100Btn  = document.querySelector('#js-x100'),
//     x250Btn  = document.querySelector('#js-x250'),
//     x500Btn  = document.querySelector('#js-x500'),
//     x1000Btn = document.querySelector('#js-x1000');

// x1Btn.addEventListener('click', () => { tw.setSpeed(.1); });
// x25Btn.addEventListener('click', () => { tw.setSpeed(.25); });
// x50Btn.addEventListener('click', () => { tw.setSpeed(.5); });
// x100Btn.addEventListener('click', () => { tw.setSpeed(1); });
// x250Btn.addEventListener('click', () => { tw.setSpeed(2.5); });
// x500Btn.addEventListener('click', () => { tw.setSpeed(5); });
// x1000Btn.addEventListener('click', () => { tw.setSpeed(10); });

// ### istanbul ignore next ###
if ( (typeof define === "function") && define.amd ) {
  define("mojs", [], function () { return mojs; });
}
// ### istanbul ignore next ###
if ( (typeof module === "object") && (typeof module.exports === "object") ) {
  module.exports = mojs;
}
