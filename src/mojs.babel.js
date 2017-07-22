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

import { getRadialPoint } from './helpers/get-radial-point.babel.js';
import { parseUnitValue } from './helpers/parse-unit-value.babel.js';
import { motionPathCache } from './delta/motion-path-cache.babel.js';

import { getSvgShapeNameID } from './shape/svg/add-shape.babel.js'; // eslint-disable-line import/no-duplicates


/*
  Browsers' support:
    - rAF
    - performance.now
    - Map
*/

/*
  TODO:
    - add shape should recieve optional `strokeRatio`
    - add angle offset for `burstGenerator`
    - add shapes tests
    - stagger should remove `items` from props
    - styleKeys should have only delta keys

    - `play` method context
    - add spring easing
    - add bezier easing
    - add array deltas

    - add rig renderers

    - add springs
    - add path/curve generators
*/

const mojs = {
  revision: '2.16.0',
  Tween,
  Timeline,
  easing,
  // temporary
  __helpers__: {
    parseEasing,
    ClassProto,
    SvgShape,
    tweenDefaults,
    tweener,
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
    parseUnitValue,
    motionPathCache,
    getSvgShapeNameID,
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
import { stagger } from './stagger/stagger.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.stagger = stagger;
// html
import { Html } from './html.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.Html = Html;
// surface
import { Surface } from './surface.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.Surface = Surface;

// rig
import { Rig } from './rig/rig.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.Rig = Rig;

// shape
import { Shape } from './shape/shape.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.Shape2 = Shape;
// addShape
import { addShape } from './shape/svg/add-shape.babel.js'; // eslint-disable-line import/newline-after-import, import/first, import/no-duplicates
mojs.addShape = addShape;
// shapes
require('./shape/svg/circle.babel.js');
require('./shape/svg/heart.babel.js');
require('./shape/svg/rect.babel.js');
require('./shape/svg/star.babel.js');
require('./shape/svg/zip.babel.js');
require('./shape/svg/cross.babel.js');
require('./shape/svg/triangle.babel.js');
require('./shape/svg/equal.babel.js');
require('./shape/svg/zigzag.babel.js');
require('./shape/svg/water.babel.js');
require('./shape/svg/polygon.babel.js');
require('./shape/svg/line.babel.js');

// path generator
import { generatePath } from './helpers/generate-path.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.generatePath = generatePath;

// burst generator
import { burstGenerator } from './helpers/burst-generator.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.burstGenerator = burstGenerator;

// random integer generator
import { rand } from './helpers/rand.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.rand = rand;
// random integer generator
import { randFloat } from './helpers/rand-float.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.randFloat = randFloat;

export default mojs;
