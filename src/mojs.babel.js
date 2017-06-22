import { ClassProto } from './class-proto';
// tween related
import { Tween } from './tween/tween';
import { tweenDefaults } from './tween/tween-defaults';
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
import { separateTweenOptions } from './delta/separate-tween-options';
import { Tweenable } from './tween/tweenable';
import { staggerProperty } from './helpers/stagger-property';
import { parseStagger } from './helpers/parse-stagger';
import { makeColorObject } from './helpers/make-color-object';

/*
  Browsers' support:
    - rAF
    - performance.now
    - Map
*/

/*
  TODO:
    - add surface
    - add shape
    - add burst
    - add mojs.staggerFunction()
    - add spring easing
    - add bezier easing
    - add path generators
    - add array deltas
*/

const mojs = {
  revision: '2.9.1',
  Tween,
  Timeline,
  easing,
  __helpers__: {
    parseEasing,
    ClassProto,
    tweenDefaults,
    tweener,
    // temporary
    Delta,
    splitDelta,
    parseNumber,
    parseUnit,
    parseColor,
    separateTweenOptions,
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
// html
import { Html } from './html';
mojs.Html = Html;

export default mojs;
