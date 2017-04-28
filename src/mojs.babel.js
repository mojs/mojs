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
  // tweener,
  __helpers__: {
    ClassProto,
    tweenieDefaults,
    tweenDefaults
  }
};

// window.onload = () => {
//   const items = [];
//   setTimeout(() => {
//     for (let i = 0; i < 1000; i++) {
//       const tweenie = Tween({
//         repeat: 2,
//         duration: 500,
//         delay: 200,
//         onUpdate(p) {
//           // (i === 0) && console.log('update', p);
//         },
//         onProgress(p) {
//           // (i === 0) && console.log('progress', p);
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
