import Tween from './tween/tween';

import ClassProto from './class-proto';
import TweenPlanner from './tween/planner';
import tweenDefaults from './tween/tween-defaults';

var mojs = {
  revision: '2.0.0',
  Tween,
  __helpers__: {
    ClassProto,
    TweenPlanner,
    tweenDefaults
  }
}

export default mojs;
