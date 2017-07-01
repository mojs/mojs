import { Tweenable } from '../tween/tweenable.babel.js';
import { getRadialPoint } from '../helpers/get-radial-point.babel.js';

/* ---------------- */
/* The `Rig` class  */
/* ---------------- */

const Super = Tweenable.__mojsClass;
const Rig = Object.create(Super);

/**
 * `_declareDefaults` - Method to declare `_defaults`.
 *
 * @private
 * @overrides @ ClassProto
 */
Rig._declareDefaults = function() {
  this._defaults = {
    center: .5,
    size: 200,
    curvature: 0,
    direction: 1,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 100,
    onRender: () => {},
  };

  this._center = {}; // TODO: cover
  this._knee = {}; // TODO: cover
  this._handle1 = {}; // TODO: cover
  this._handle2 = {}; // TODO: cover
};

/**
 * `render` - function to render the Rig.
 *
 * @public
 */
Rig.render = function() {
  const {
    x1,
    x2,
    y1,
    y2,
    center,
    direction,
    curvature,
    size,
    onRender
  } = this._props;

  const dX = x1 - x2;
  const dY = y1 - y2;
  const length = Math.sqrt(dX*dX + dY*dY);
  const maxPartLength = size*center;

  // get base angle between 2 points
  let angle = (Math.atan(dY/dX)*(180/Math.PI)) + 90;
  angle = (dX < 0) ? angle : 180 + angle;

  // get center point
  getRadialPoint(x1, y1, length * center, angle, this._center);

  const actualPartLength = center*length;
  const isStretch = actualPartLength > maxPartLength;

  const depth = (isStretch) ? 0 :  Math.sqrt((maxPartLength ** 2) - (actualPartLength ** 2));
  const directionCoeficient = (direction > 0) ? 1 : -1;
  getRadialPoint(this._center.x, this._center.y, depth, angle - (directionCoeficient*90), this._knee);

  const t = (actualPartLength + depth) / 2;
  const k = (t - depth/10)*curvature;
  getRadialPoint(this._knee.x, this._knee.y, k, angle + 180, this._handle1);
  getRadialPoint(this._knee.x, this._knee.y, k, angle, this._handle2);

  onRender(this._props, this._knee, this._handle1, this._handle2);
};

/**
 * Imitate `class` with wrapper.
 *
 * @param {Object} Options object.
 * @returns {Object} `Html` instance.
 */
const wrap = (o) => {
  const instance = Object.create(Rig);
  const result = instance.init(o);

  return result || instance;
};

wrap.__mojsClass = Rig;

export { wrap as Rig };
