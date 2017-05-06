import { ClassProto } from './class-proto';
import { Tweenie } from './tween/tweenie';
import { Tween } from './tween/tween';
import { tweenDefaults } from './tween/tween-defaults';
import { tweenieDefaults } from './tween/tweenie-defaults';
import { staggerProperty } from './helpers/stagger-property';
import tweener from './tween/tweener';

var mojs = {
  revision: '2.2.0',
  Tweenie,
  Tween,
  __helpers__: {
    ClassProto,
    tweenieDefaults,
    tweenDefaults,
    staggerProperty,
    tweener
  }
};
//
// var a = 0;
// window.onload = () => {
//   const items = [];
//   setTimeout(() => {
//     for (let i = 0; i < 100000; i++) {
//       const tweenie = Tween({
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
//         var tweenie = items[i];
//         tweenie.setStartTime(performance.now());
//         tweener.add(tweenie);
//       }
//     }, 0);
//   }, 1000);
// };

export default mojs;
