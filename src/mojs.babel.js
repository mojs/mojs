// import Tween from './tween/tween';

import { ClassProto } from './class-proto';
import { Tweenie } from './tween/tweenie';
import { tweenieDefaults } from './tween/tweenie-defaults';
// import TweenPlanner from './tween/planner';
// import tweenDefaults from './tween/tween-defaults';
import tweener from './tween/tweener';

var mojs = {
  revision: '2.1.0',
  Tweenie,
  // Tween,
  // tweener,
  __helpers__: {
    ClassProto,
    tweenieDefaults
    // TweenPlanner,
    // tweenDefaults
  }
};

window.onload = () => {
  const items = [];
  setTimeout(() => {
    for (let i = 0; i < 1; i++) {
      const tweenie = Tweenie({
        // isReverse: true,
        duration: 2000,
        delay: 500,
        onUpdate(p) {
          // (i === 0) && console.log( 'update', p );
        },
        onStart() {
          // (i === 0) && console.log( 'start' );
        },
        onComplete() {
          // (i === 0) && console.log( 'complete' );
        },
        onChimeIn() {
          // (i === 0) && console.log( 'chime in' );
        },
        onChimeOut() {
          // (i === 0) && console.log( 'chime out' );
        }
      });
      items.push(tweenie);
    }

    setTimeout(function() {
      for (let i = 0; i < items.length; i++) {
        var tweenie = items[i];
        tweenie.setStartTime( performance.now() );
        tweener.add(tweenie);
      }
    }, 0);
  }, 2000);
};

export default mojs;
