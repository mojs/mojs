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

  this._center = {};
  this._knee = {
    handle1: {},
    handle2: {},
  };
};

Rig._vars = function () {
  Super._vars.call(this);

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

  const {
    x1,
    x2,
    y1,
    y2,
    direction,
    curvature,
    onRender,
  } = this._props;

  const sin = Math.sin(Math.abs(direction) * (Math.PI / 2));
  size = sin * Math.abs(size);

  const dX = x1 - x2;
  const dY = y1 - y2;
  const length = sin * Math.sqrt((dX * dX) + (dY * dY));

  const maxPartLength = size / 2;
  const actualPartLength = length / 2;

  // get base angle between 2 points
  let angle = (Math.atan(dY / dX) * (180 / Math.PI)) + 90;
  angle = (dX < 0) ? angle : 180 + angle;
  // get center point
  getRadialPoint(x1, y1, actualPartLength / sin, angle, this._center);

  const isStretch = actualPartLength > maxPartLength;
  const depth = (isStretch) ? 0 : Math.sqrt((maxPartLength ** 2) - (actualPartLength ** 2));

  const directionCoeficient = (direction >= 0) ? 1 : -1;
  const kneeAngle = angle - (directionCoeficient * 90);

  getRadialPoint(this._center.x, this._center.y, depth, kneeAngle, this._knee);

  const t = (actualPartLength + depth) / 2;

  let gripAngle = angle - (Math.acos((actualPartLength / sin) / (maxPartLength)) * (180 / Math.PI));

  gripAngle = (gripAngle - (10 * (t / actualPartLength))) || angle;


  const k = (t - (depth / 10)) * curvature;
  getRadialPoint(this._knee.x, this._knee.y, k, angle + 180, this._knee.handle1);
  getRadialPoint(this._knee.x, this._knee.y, k, angle, this._knee.handle2);

  onRender(this._props, this._knee, actualPartLength / maxPartLength, gripAngle, this._center);
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
