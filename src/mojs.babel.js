import { ClassProto } from './class-proto';
import { Tweenie } from './tween/tweenie';
// import { Tween } from './tween/tween';
// import { tweenDefaults } from './tween/tween-defaults';
import { tweenieDefaults } from './tween/tweenie-defaults';
// import { staggerProperty } from './helpers/stagger-property';
import { tweener } from './tween/tweener';
import { easing } from './easing/easing';

var mojs = {
  revision: '2.3.0',
  Tweenie,
  easing,
  __helpers__: {
    ClassProto,
    tweenieDefaults,
    tweener
  }
};

// var a = 0;
// window.onload = () => {
//   const items = [];
//   setTimeout(() => {
//     for (let i = 0; i < 1000; i++) {
//       const tweenie = Tweenie({
//         repeat: 1,
//         duration: 500,
//         delay: 20000,
//         onUpdate(ep, p, isForward, isReverse, index) {
//         },
//         onChimeIn(isForward, isReverse, index) {
//         },
//         onChimeOut(isForward, isReverse, index) {
//         },
//         onStart(isForward, isReverse, index) {
//         },
//         onRepeatStart(isForward, isReverse, index) {
//         },
//         onRepeatComplete(isForward, isReverse, index) {
//         },
//         onRepeatChimeIn(isForward, isReverse, index) {
//         },
//         onRepeatChimeOut(isForward, isReverse, index) {
//         },
//         onComplete(isForward, isReverse, index) {
//         },
//         onChimeIn(isForward, isReverse, index) {
//         }
//       });
//       items.push(tweenie);
//     }
//
//     setTimeout(function() {
//       for (let i = 0; i < items.length; i++) {
//         items[i].play();
//       }
//     }, 0);
//   }, 1000);
// };

export default mojs;
