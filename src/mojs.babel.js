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
import { separateTweenieOptions } from './delta/separate-tweenie-options';
import { Tweenable } from './tween/tweenable';
import { staggerProperty } from './helpers/stagger-property';
import { parseStagger } from './helpers/parse-stagger';

/*
  TODO:
    - add stagger
    - add color deltas
    - add stagger deltas
    - add array deltas
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    - rename tweenie to tween
    - rename deltas to ObjectTween?
*/

const mojs = {
  revision: '2.4.0',
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
    parseUnit,
    separateTweenieOptions,
    Tweenable,
    staggerProperty,
    parseStagger
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

export default mojs;
