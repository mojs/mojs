import { ClassProto } from './class-proto';
// tween related
import { Tweenie } from './tween/tweenie';
import { tweenieDefaults } from './tween/tweenie-defaults';
import { Timeline } from './tween/timeline';
import { TweenPlanner } from './tween/planner';
import { tweener } from './tween/tweener';
// easing
import { easing } from './easing/easing';
import { parseEasing } from './easing/parse-easing';

var mojs = {
  revision: '2.3.0',
  Tweenie,
  Timeline,
  easing,
  __helpers__: {
    parseEasing,
    ClassProto,
    tweenieDefaults,
    TweenPlanner,
    tweener
  }
};

// window.onload = () => {
//   const items = [];
//   setTimeout(() => {
//     for (let i = 0; i < 1000; i++) {
//       const tweenie = Tweenie({
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
