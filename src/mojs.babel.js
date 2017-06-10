import { ClassProto } from './class-proto';
// tween related
import { Tweenie } from './tween/tweenie';
import { tweenieDefaults } from './tween/tweenie-defaults';
import { Timeline } from './tween/timeline';
import { tweener } from './tween/tweener';
// easing
import { easing } from './easing/easing';
import { parseEasing } from './easing/parse-easing';
// temporary - not needed for base file
import { Delta } from './delta/delta';
import { splitDelta } from './delta/split-delta';
import { parseNumber } from './delta/parse-number';
import { parseUnit } from './delta/parse-unit';
import { parseColor } from './delta/parse-color';
import { separateTweenieOptions } from './delta/separate-tweenie-options';
import { Tweenable } from './tween/tweenable';
import { staggerProperty } from './helpers/stagger-property';
import { parseStagger } from './helpers/parse-stagger';
import { makeColorObject } from './helpers/make-color-object';

/*
  TODO:
    - add path easing
    - add spring easing
    - add bezier easing
    - add surface
    - add path generators
    - add shape
    - add burst
    - add array deltas
    -=-=-=-=-=-=-=-=-=-=-=-=-
    - rename tweenie to tween
*/

const mojs = {
  revision: '2.6.0',
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
    splitDelta,
    parseNumber,
    parseUnit,
    parseColor,
    separateTweenieOptions,
    Tweenable,
    staggerProperty,
    parseStagger,
    makeColorObject
  }
};

/* Extensions */
// `basic easing functions`
import { addBasicEasing } from './easing/basic-easing';
addBasicEasing(mojs);
// Deltas
import { Deltas } from './delta/deltas';
mojs.Deltas = Deltas;
// MotionPath
import { MotionPath } from './delta/motion-path';
mojs.MotionPath = MotionPath;
// stagger
import { stagger } from './stagger';
mojs.stagger = stagger;
// path easing
import { path } from './easing/path';
mojs.easing.path = path;

export default mojs;
