import { Tween } from '../tween/tween.babel.js';
import { ClassProto } from '../class-proto.babel.js';
import { separateTweenOptions } from './separate-tween-options.babel.js';
import { staggerProperty } from '../helpers/stagger-property.babel.js';
import { motionPathCache } from './motion-path-cache.babel.js';

/* ----------------------- */
/* The `MotionPath` class  */
/* ----------------------- */

// TODO:
//  - add bounds?
//  - add clone
//  - add global cache

const Super = ClassProto;
const MotionPath = Object.create(Super);

/* ---------------------- */
/* The `Public` functions */
/* ---------------------- */

/**
 * `update` - function to update the MotionPath.
 *
 * @public
 * @param {Number} Eased progress.
 * @param {Number} Progress.
 * @param {Boolean} If is forward direction.
 * @param {Object} This motion path.
 */
MotionPath.update = function (ep) {
  const { coordinate, property } = this._props;
  const { step } = this._samples;

  const index = (ep / step) | 0; // convert to integer
  const key = index * step; // get the key
  const nextKey = (index + 1) * step; // get the next key

  const diff = ep - key; // get error for the eased progress
  const value = this._samples.get(key)[coordinate]; // get the value

  let norm = value;
  // if next key is present, calculate the normalized value
  // regarding the eased progress error
  if (nextKey <= 1) {
    const nextValue = this._samples.get(nextKey)[coordinate];
    norm = value + ((nextValue - value) * (diff / step));
  }

  if (this._unit === undefined) {
    this._target[property] = norm;
  } else {
    this._target[property] = `${norm}${this._unit}`;
  }

  return this;
};

/* ----------------------- */
/* The `Private` functions */
/* ----------------------- */

/**
 * `_samplePath` - function to sample path coordinates.
 *
 * @private
 * @param {Number} Number of floating point digits.
 */
MotionPath._samplePath = function (n = this._props.precision) {
  const { path, precision } = this._props;
  const cachedPath = motionPathCache.get(path, precision);
  // if we have the `path` with the `precision` cached - use it
  if (cachedPath) {
    this._samples = cachedPath;
  // if no cache - start over
  } else {
    this._samples = new Map();
    const totalLength = this._path.getTotalLength();
    const step = 1 / n;
    this._samples.step = step;
    this._samples.totalLength = totalLength;
    // samples the path, `key` is in range of [0..1]
    for (let i = 0; i < n; i++) {
      const key = i * step;
      this._setForKey(key);
    }
    // the last sample is for `1`
    this._setForKey(1);
    motionPathCache.save(path, precision, this._samples);
  }
};

/**
 * `_setForKey` - helper function for `_samplePath`,
 *                sets a key/value regarding `totalLength` on the map.
 *
 * @param  {Number} key Map key [0...1].
 */
MotionPath._setForKey = function (key) {
  const { totalLength } = this._samples;
  // x/y computation
  const length = key * totalLength;
  const point = this._path.getPointAtLength(length);
  const prevPoint = this._path.getPointAtLength(length - 1);
  // cangle computation
  const dY = point.y - prevPoint.y;
  const dX = point.x - prevPoint.x;
  const atan = (!isFinite(Math.atan(dY / dX))) ? 0 : Math.atan(dY / dX);
  let angle = atan * (180 / Math.PI);

  if (dX < 0) {
    angle = angle - 180;
  }
  // set the point to the map
  this._samples.set(key, { x: point.x, y: point.y, angle });
};

/**
 * `init` - function init the class.
 *
 * @extends @ClassProto
 * @public
 */
MotionPath.init = function (o = {}) {
  // super call
  Super.init.call(this, o);
  // get target, if the `isSkipRender` is set on `property`
  // in `customProperties`, use `supportProps` otherwise use `el`
  const { el, supportProps, property, customProperties } = this._props;
  const custom = customProperties[property];
  this._target = (custom && custom.isSkipRender) ? supportProps : el;
  // if `unit` is defined or `type` is set on `customProperties`,
  // set the render `_unit` that will be added on render
  if (o.unit !== undefined || (custom && custom.type === 'unit')) {
    this._unit = o.unit || 'px';
  }
  // parse path
  this._parsePath();
  // precompute path
  this._samplePath();
  // set up tween
  this._setupTween();
};

/**
 * `_setupTween` - function set up tween if needed.
 *
 * @extends @ClassProto
 * @public
 */
MotionPath._setupTween = function () {
  // options
  const options = { ...this._o };
  // separate tween  options
  const tweenOptions = separateTweenOptions(options);
  if (tweenOptions !== undefined) {
    this.tween = new Tween({
      ...tweenOptions,
      // send `onUpdate` function to call the `this.update` function
      // and envoke previous `onUpdate`
      onUpdate: (ep, p, isForward) => {
        this.update(ep, p, isForward);
        // envoke old `onUpdate` if is present
        if (tweenOptions.onUpdate !== undefined) {
          tweenOptions.onUpdate(ep, p, isForward);
        }
      },
    });
  }
};

/**
 * `_decalreDefaults` - function to declare defaults.
 *
 * @extends @ClassProto
 * @private
 */
MotionPath._declareDefaults = function () {
  this._defaults = {
    el: null,
    supportProps: null,
    customProperties: {},
    path: 'M0,0 L100,100',
    precision: 140,
    coordinate: 'x',
    property: 'x',
  };
};

/**
 * _extendDefaults - Method to copy `_o` options to `_props` object
 *                  with fallback to `_defaults`.
 * @private
 * @overrides @ ClassProto
 */
MotionPath._extendDefaults = function () {
  // super call
  ClassProto._extendDefaults.call(this);
  // parse stagger
  const propsKeys = Object.keys(this._props);
  for (let i = 0; i < propsKeys.length; i++) {
    const key = propsKeys[i];
    const prop = staggerProperty(this._props[key], this.index, this._totalItemsInStagger);
    // check if path generator was passed to `path` property
    const isPathGenerator = (prop && typeof prop === 'object' && prop.path);
    this._props[key] = (isPathGenerator) ? prop.path : prop;
  }

  const { property } = this._props;
  if (property === 'y' || property === 'angle') {
    this.setIfNotSet('coordinate', property);
  }
};

/**
 * `_parsePath` - function to parse SVG motion path.
 */
MotionPath._parsePath = function () {
  const { path } = this._props;
  this._path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  this._path.setAttributeNS(null, 'd', path);
};

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Tween instance.
 */
const wrap = (o) => {
  const instance = Object.create(MotionPath);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = MotionPath;

export { wrap as MotionPath };
