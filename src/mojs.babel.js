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

export default mojs;
