// import Tween from './tween/tween';

import { ClassProto } from './class-proto';
import { Tweenie } from './tween/tweenie';
import { tweenieDefaults } from './tween/tweenie-defaults';
// import TweenPlanner from './tween/planner';
// import tweenDefaults from './tween/tween-defaults';
import tweener from './tween/tweener';

var mojs = {
  revision: '2.0.0',
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

export default mojs;
