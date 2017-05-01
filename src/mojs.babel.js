import { ClassProto } from './class-proto';
import { Tweenie } from './tween/tweenie';
import { Tween } from './tween/tween';
import { tweenDefaults } from './tween/tween-defaults';
import { tweenieDefaults } from './tween/tweenie-defaults';
import tweener from './tween/tweener';

var mojs = {
  revision: '2.2.0',
  Tweenie,
  Tween,
  __helpers__: {
    ClassProto,
    tweenieDefaults,
    tweenDefaults,
    tweener
  }
};

// // console.log(`=== update: end + 100`, end + 100);
// // tween.update(end + 100);
// console.log(`=== update: end - 10`, end - 10);
// tween.update(end - 10);
// console.log(`=== update: end - 100`, end - 100);
// tween.update(end - 100);
// console.log(`=== update: end - 200`, end - 200);
// tween.update(end - 200);
// console.log(`=== update: end - 300`, end - 300);
// tween.update(end - 300);
// console.log(`=== update: end - 800`, end - 800);
// tween.update(end - 800);
// console.log(`=== update: end - 1100`, end - 1100);
// tween.update(end - 1100);
// console.log(`=== update: end - 1200`, end - 1200);
// tween.update(end - 1200);
// console.log(`=== update: end - 1500`, end - 1500);
// tween.update(end - 1500);
// console.log(`=== update: end - 2000`, end - 2000);
// tween.update(end - 2000);
// console.log(`=== update: end - 2300`, end - 2300);
// tween.update(end - 2300);

// window.onload = () => {
//   const items = [];
//   setTimeout(() => {
//     for (let i = 0; i < 1000; i++) {
//       const tweenie = Tween({
//         repeat: 1,
//         duration: 500,
//         delay: 20000,
//         onUpdate(p) {
//           // (i === 0) && console.log('update', p);
//         },
//         onStart() {
//           // (i === 0) && console.log('start');
//         },
//         onRepeatStart() {
//           // (i === 0) && console.log('repeat start');
//         },
//         onRepeatComplete() {
//           // (i === 0) && console.log('repeat complete');
//         },
//         onComplete() {
//           // (i === 0) && console.log('complete');
//         }
//         // onChimeIn() {
//         //   (i === 0) && console.log('chime in');
//         // },
//         // onChimeOut() {
//         //   (i === 0) && console.log('chime out');
//         // }
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
