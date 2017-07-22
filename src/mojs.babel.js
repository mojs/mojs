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

import { getSvgShapeNameID } from './shape/svg/add-shape.babel.js';


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
    getSvgShapeNameID
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
import { addShape } from './shape/svg/add-shape.babel.js'; // eslint-disable-line import/newline-after-import, import/first
mojs.addShape = addShape;
// shapes
import { circle } from './shape/svg/circle.babel.js'; // eslint-disable-line import/newline-after-import, import/first
import { heart } from './shape/svg/heart.babel.js'; // eslint-disable-line import/newline-after-import, import/first
import { rect } from './shape/svg/rect.babel.js'; // eslint-disable-line import/newline-after-import, import/first
import { star } from './shape/svg/star.babel.js'; // eslint-disable-line import/newline-after-import, import/first
import { zip } from './shape/svg/zip.babel.js'; // eslint-disable-line import/newline-after-import, import/first
import { cross } from './shape/svg/cross.babel.js'; // eslint-disable-line import/newline-after-import, import/first
import { triangle } from './shape/svg/triangle.babel.js'; // eslint-disable-line import/newline-after-import, import/first
import { equal } from './shape/svg/equal.babel.js'; // eslint-disable-line import/newline-after-import, import/first
import { zigzag } from './shape/svg/zigzag.babel.js'; // eslint-disable-line import/newline-after-import, import/first
import { water } from './shape/svg/water.babel.js'; // eslint-disable-line import/newline-after-import, import/first
import { polygon } from './shape/svg/polygon.babel.js'; // eslint-disable-line import/newline-after-import, import/first
import { line } from './shape/svg/line.babel.js'; // eslint-disable-line import/newline-after-import, import/first

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


// setTimeout(() => {
//   const shape = new Shape({
//     position: 'absolute',
//     strokeWidth: 12,
//     stroke: 'cyan',
//     shape: 'line',
//     left: '50%',
//     top: '50%',
//     width: 125,
//     height: 125,
//     marginLeft: -100,
//     marginTop: '-100px',
//     size: 100,
//     fill: { 'cyan' : 'purple' },
//     angle: { 0: 360 },
//     duration: 2000,
//     surfaceOptions: [ 'position', 'left', 'top', 'marginLeft', 'marginTop' ],
//     customProperties: {
//       marginLeft: {
//         type: 'unit'
//       },
//       marginTop: {
//         type: 'unit'
//       }
//     }
//   });

//   // shape.el.style.border = '1px solid purple';
//   shape.play();
// }, 1000);




// const StaggerShape = stagger(Shape);

// const burstCoordinates = burstGenerator({
//   degree: 0,
//   degreeOffset: 270,
//   depth: stagger.randFloat(.1, .2),
//   length: stagger.rand(125, 250),
//   count: 2, //stagger.rand(1, 3),
//   direction: index => index % 2 === 0,
//   yEasing: 'quad.out',
//   xEasing: 'linear.none'
// });

// const shapeStagger = new StaggerShape({
//   items: 8,
//   x: burstCoordinates,
//   y: burstCoordinates,
//   position: 'absolute',
//   left: '50%',
//   top: '50%',
//   fill: stagger.map('cyan', 'purple', 'hotpink', '#222'),
//   size: stagger.rand(5, 15),
//   scale: { 1: 0 },
//   surfaceOptions: [ 'position', 'left', 'top' ],
//   duration: stagger.rand(1000, 2200),
//   delay: stagger.rand(0, 200),
// });

// setTimeout(() => {
//   shapeStagger.play();
// }, 1000);



// const StaggerShape = stagger(Shape);

// const burstCoordinates = burstGenerator({
//   degree: 360,
//   // degreeOffset: 270,
//   depth: 0,
//   length: 25,
//   startOffset: 10,
//   count: 1,
//   // direction: index => index % 2 === 0,
//   // yEasing: 'quad.out',
//   // xEasing: 'linear.none'
// });

// const shapeStagger = new StaggerShape({
//   items: 5,
//   x: burstCoordinates,
//   y: burstCoordinates,
//   width: 20,
//   height: 20,
//   angle: burstCoordinates,
//   position: 'absolute',
//   shape: 'line',
//   strokeWidth: { 12 : 0 },
//   stroke: 'hotpink',
//   left: '50%',
//   top: '50%',
//   // scale: { 1: 0 },
//   fill: 'none',
//   // strokeDasharray: 100,
//   // strokeDashoffset: { 100: -100 },
//   // fill: stagger.map('cyan', 'purple', 'hotpink', '#222'),
//   size: 12,
//   // scale: { 1: 0 },
//   surfaceOptions: [ 'position', 'left', 'top' ],
//   duration: 700,
//   easing: 'cubic.out',
//   // duration: stagger.rand(1000, 2200),
//   // delay: stagger.rand(0, 200),
// });

// setTimeout(() => {
//   shapeStagger.play();
// }, 1000);
