import { ClassProto } from './class-proto';
// tween related
import { Tweenie } from './tween/tweenie';
import { tweenieDefaults } from './tween/tweenie-defaults';
import { Timeline } from './tween/timeline';
import { tweener } from './tween/tweener';
// easing
import { easing } from './easing/easing';
import { parseEasing } from './easing/parse-easing';

// temporary
import { Delta } from './delta/delta';
import { parseDelta } from './delta/parse-delta';

import { splitDelta } from './delta/split-delta';
import { parseNumber } from './delta/parse-number';
import { parseUnit } from './delta/parse-unit';

const mojs = {
  revision: '2.3.0',
  Tweenie,
  Timeline,
  easing,
  __helpers__: {
    parseEasing,
    ClassProto,
    tweenieDefaults,
    tweener,
    // temporary
    Delta,
    parseDelta,
    splitDelta,
    parseNumber,
    parseUnit
  }
};

/* Extensions */
// `basic easing functions`
import { addBasicEasing } from './easing/basic-easing';
addBasicEasing(mojs);

// window.onload = () => {
//   const items = [];
//   setTimeout(() => {
//     for (let i = 0; i < 200; i++) {
//       const tweenie = Tweenie({
//         duration: 5000,
//         delay: 200,
//         // easing: 'linear.none',
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
