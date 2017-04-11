import Tween from './tween/tween';

import ClassProto from './class-proto';
import TweenPlanner from './tween/planner';
import tweenDefaults from './tween/tween-defaults';
import tweener from './tween/tweener';

var mojs = {
  revision: '2.3.0',
  Tween,
  tweener,
  __helpers__: {
    ClassProto,
    TweenPlanner,
    tweenDefaults
  }
};

// window.onload = () => {
//   const items = [];
//   setTimeout(() => {
//     for (let i = 0; i < 1; i++) {
//       const tw = new mojs.Tween({
//         // isReverse: true,
//         repeat: 2,
//         duration: 2000,
//         delay: 5000,
//         onUpdate() {
//           (i === 0) && console.log( 'update' );
//         },
//         onStart() {
//           (i === 0) && console.log( 'start' );
//         },
//         onRepeatStart() {
//           (i === 0) && console.log( 'repeatStart' );
//         },
//         onRepeatComplete() {
//           (i === 0) && console.log( 'repeatComplete' );
//         },
//         onComplete() {
//           (i === 0) && console.log( 'complete' );
//         }
//       });
//       items.push(tw);;
//     }
//
//     setTimeout(function() {
//       for (let i = 0; i < items.length; i++) {
//         items[i].play();
//       }
//     }, 10);
//   }, 10);
// };

export default mojs;
