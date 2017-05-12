import { ClassProto } from './class-proto';
import { Tweenie } from './tween/tweenie';
import { tweenieDefaults } from './tween/tweenie-defaults';
import { tweener } from './tween/tweener';
import { easing } from './easing/easing';
import { parseEasing } from './easing/parse-easing';

var mojs = {
  revision: '2.3.0',
  Tweenie,
  easing,
  __helpers__: {
    parseEasing,
    ClassProto,
    tweenieDefaults,
    tweener
  }
};

// window.onload = () => {
//   const items = [];
//   setTimeout(() => {
//     for (let i = 0; i < 100; i++) {
//       const tweenie = Tweenie({
//         repeat: 1,
//         duration: 5000,
//         delay: 200,
//         onUpdate(ep, p, isForward, isReverse, index) {},
//         onChimeIn(isForward, isReverse, index) {},
//         onChimeOut(isForward, isReverse, index) {},
//         onStart(isForward, isReverse, index) {},
//         onComplete(isForward, isReverse, index) {}
//       });
//       items.push(tweenie);
//     }
//
//     for (let i = 0; i < items.length; i++) {
//       items[i].play();
//     }
//   }, 1000);
// };

export default mojs;
