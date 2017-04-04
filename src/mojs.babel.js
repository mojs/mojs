import Tween from './tween/tween';

import ClassProto from './class-proto';
import TweenPlanner from './tween/planner';
import tweenDefaults from './tween/tween-defaults';
import tweener from './tween/tweener';

var mojs = {
  revision: '2.0.0',
  Tween,
  tweener,
  __helpers__: {
    ClassProto,
    TweenPlanner,
    tweenDefaults
  }
};

window.onload = () => {
  const items = [];
  setTimeout(() => {
    for (let i = 0; i < 50000; i++) {
      const tw = new mojs.Tween({
        duration: 2000,
        onUpdate() {
          // (i === 0) && console.log( 'update' );
        },
        onStart() {
          // (i === 0) && console.log( 'start' );
        },
        onRepeatStart() {
          // (i === 0) && console.log( 'repeatStart' );
        },
        onRepeatComplete() {
          // (i === 0) && console.log( 'repeatComplete' );
        },
        onComplete() {
          // (i === 0) && console.log( 'complete' );
        }
      });
      items.push(tw);;
    }

    setTimeout(function() {
      for (let i = 0; i < items.length; i++) {
        items[i].play();
      }
    }, 2000);
  }, 2000);
};

export default mojs;
