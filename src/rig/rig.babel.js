import { Deltas } from '../delta/deltas.babel.js';
import { Tweenable } from '../tween/tweenable.babel.js';
import { getRadialPoint } from '../helpers/get-radial-point.babel.js';

/* ---------------- */
/* The `Rig` class  */
/* ---------------- */

/*
  TODO:
    - direction -> size
*/

const Super = Tweenable.__mojsClass;
const Rig = Object.create(Super);

const DEGREE_RAD = 180 / Math.PI;

/**
 * `_declareDefaults` - Method to declare `_defaults`.
 *
 * @private
 * @overrides @ ClassProto
 */
Rig._declareDefaults = function () {
  this._defaults = {
    size: 200,
    curvature: 0,
    direction: 1,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 100,
    onRender: () => {},
  };

  this._support = {
    handle1: {},
    handle2: {},
    center: {},
    knee: {},
    angle1: 0,
    angle2: 0,
  };
};

Rig._vars = function () {
  Super._vars.call(this);
  // create `Deltas` module to control all the deltas
  this._createDeltas();
};

Rig._createDeltas = function () {
  const customProperties = this._o.customProperties || {};
  const originalRender = customProperties.render;

  const keys = Object.keys(this._defaults);
  // it is forbidden to override the rig defaults
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (customProperties[key] !== undefined) {
      delete customProperties[key];
    }
  }

  const propsToPass = { ...this._props };
  delete propsToPass.onRender;
  // create deltas to add animations to the properties
  this._deltas = new Deltas({
    el: this._props,
    ...propsToPass,
    customProperties: {
      ...customProperties,
      render: (props, support, ep, p, isForward) => {
        this.render(props, support, ep, p, isForward);
        // call the original `render` is set
        if (typeof originalRender === 'function') {
          originalRender(props, support, ep, p, isForward);
        }
      },
    },
  });
  // make the tweenable interface work
  this.timeline = this._deltas.timeline;
};

/**
 * `render` - function to render the Rig.
 *
 * @public
 */
Rig.render = function () {
  let { size } = this._props;
  const support = this._support;

  const {
    x1,
    x2,
    y1,
    y2,
    direction,
    curvature,
    onRender,
  } = this._props;

  const direction3dShift = Math.sin(Math.abs(direction) * (Math.PI / 2));
  size = direction3dShift * Math.abs(size);

  // deltas should be at least 1, otherwise a lot of ambiguities can happen
  const dX = (x1 - x2) || 1;
  const dY = (y1 - y2) || 1;
  const length = direction3dShift * Math.sqrt((dX * dX) + (dY * dY));
  const pureLength = Math.sqrt((dX * dX) + (dY * dY));

  const maxPartLength = size / 2;
  const actualPartLength = length / 2;
  const pureActualLength = Math.sqrt((dX * dX) + (dY * dY)) / 2;

  // get base angle between 2 points
  let angle = (Math.atan(dY / dX) * DEGREE_RAD) + 90;
  angle = (dX < 0) ? angle : 180 + angle;
  const normActualLegnth = actualPartLength / direction3dShift;
  // get center point
  getRadialPoint(x1, y1, normActualLegnth, angle, support.center);

  const isStretch = actualPartLength > maxPartLength;
  const depth = (isStretch) ? 0 : Math.sqrt((maxPartLength ** 2) - (actualPartLength ** 2));

  const directionCoeficient = (direction >= 0) ? 1 : -1;
  const kneeAngle = angle - (directionCoeficient * 90);

  getRadialPoint(support.center.x, support.center.y, depth, kneeAngle, support.knee);

  // angle calculation
  const nAngle = angle - 180;

  let ratio = normActualLegnth / maxPartLength;

  const a = depth;
  const b = pureLength / 2;
  const baseAngle = Math.atan(depth / normActualLegnth) * DEGREE_RAD;

  let gripAngle1 = nAngle + baseAngle;
  let gripAngle2 = angle - baseAngle;

  const r = 25*curvature;
  gripAngle1 = (isStretch === false) ? gripAngle1 + r : nAngle;
  gripAngle2 = (isStretch === false) ? gripAngle2 - r : angle;

  if (direction > 0) {
    const temp = gripAngle1;
    gripAngle1 = gripAngle2 - 180;
    gripAngle2 = temp - 180;
  }

  // handle calculations
  const k = (0.3 * size) * curvature;
  getRadialPoint(support.knee.x, support.knee.y, k, nAngle, support.handle1);
  getRadialPoint(support.knee.x, support.knee.y, k, angle, support.handle2);

  support.stretchRatio = actualPartLength / maxPartLength;
  support.angle1 = gripAngle1;
  support.angle2 = gripAngle2;

  onRender(this._props, support);
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
