import { ClassProto } from './class-proto.babel.js';
// tween related
import { Tween } from './tween/tween.babel.js';
import { tweenDefaults } from './tween/tween-defaults.babel.js';
import { Timeline } from './tween/timeline.babel.js';
import { tweener } from './tween/tweener.babel.js';
// easing
import { easing } from './easing/easing.babel.js';
import { parseEasing } from './easing/parse-easing.babel.js';
// temporary - not needed for base file
import { Delta } from './delta/delta.babel.js';
import { splitDelta } from './delta/split-delta.babel.js';
import { parseNumber } from './delta/parse-number.babel.js';
import { parseUnit } from './delta/parse-unit.babel.js';
import { parseColor } from './delta/parse-color.babel.js';
import { separateTweenOptions } from './delta/separate-tween-options.babel.js';
import { Tweenable } from './tween/tweenable.babel.js';
import { staggerProperty } from './helpers/stagger-property.babel.js';
import { parseStagger } from './helpers/parse-stagger.babel.js';
import { makeColorObject } from './helpers/make-color-object.babel.js';
import { SvgShape } from './shape/svg/svg-shape.babel.js';
import { Circle } from './shape/svg/circle.babel.js';
import { getRadialPoint } from './helpers/get-radial-point.babel.js';

/*
  Browsers' support:
    - rAF
    - performance.now
    - Map
*/

/*
  TODO:
    - add shape
    - add burst
    - add mojs.staggerFunction()
    - add spring easing
    - add bezier easing
    - add path generators
    - add array deltas
*/

const mojs = {
  revision: '2.11.0',
  Tween,
  Timeline,
  easing,
  __helpers__: {
    parseEasing,
    ClassProto,
    SvgShape,
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
    makeColorObject,
    getRadialPoint,
    svg: {
      Circle,
    },
  },
};

/* Extensions */
// `basic easing functions`
import { addBasicEasing } from './easing/basic-easing.babel.js'; // eslint-disable-line import/newline-after-import, import/first
addBasicEasing(mojs);
// Deltas
import { Deltas } from './delta/deltas.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.Deltas = Deltas;
// MotionPath
import { MotionPath } from './delta/motion-path.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.MotionPath = MotionPath;
// stagger
import { stagger } from './stagger.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.stagger = stagger;
// html
import { Html } from './html.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.Html = Html;
// surface
import { Surface } from './surface.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.Surface = Surface;
// shape
import { Shape } from './shape/shape.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.Shape2 = Shape;
// rig
import { Rig } from './rig/rig.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.Rig = Rig;

export default mojs;
