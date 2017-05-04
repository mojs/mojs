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
