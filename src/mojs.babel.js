import { ClassProto } from './class-proto';
import { Tweenie } from './tween/tweenie';
import { Tween } from './tween/tween';
import { tweenDefaults } from './tween/tween-defaults';
import { tweenieDefaults } from './tween/tweenie-defaults';
import tweener from './tween/tweener';

var mojs = {
  revision: '2.2.0',
  Tweenie,
  Tween,
  // tweener,
  __helpers__: {
    ClassProto,
    tweenieDefaults,
    tweenDefaults
  }
};

export default mojs;
