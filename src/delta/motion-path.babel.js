import { Tweenie } from '../tween/tweenie';
import { ClassProto } from '../class-proto';
import { separateTweenieOptions } from './separate-tweenie-options';
import { staggerProperty } from '../helpers/stagger-property';

/* ----------------------- */
/* The `MotionPath` class  */
/* ----------------------- */

// TODO:
//  - add unit?
//  - add bounds?
//  - add pipe?

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
MotionPath.update = function(ep, p, isForward) {
  const { precision, coordinate, property } = this._props;
  const { step } = this._samples;

  const index = (ep/step) | 0; // convert to integer
  const key = index*step; // get the key
  const nextKey = (index + 1)*step; // get the next key

  const diff = ep - key; // get error for the eased progress
  const value = this._samples.get(key)[coordinate]; // get the value

  let norm = value;
  // if next key is present, calculate the normalized value
  // regarding the eased progress error
  if (nextKey <= 1)  {
    const nextValue = this._samples.get(nextKey)[coordinate];
    norm = value + ((nextValue - value) * (diff/step));
  }

  this._target[property] = norm;

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
MotionPath._samplePath = function(n = this._props.precision) {
  const  totalLength = this._path.getTotalLength();
  const step = 1/n;
  // create the samples map and save main properties
  this._samples = new Map();
  this._samples.step = step;
  this._samples.totalLength = totalLength;
  // samples the path, `key` is in range of [0..1]
  for (var i = 0; i < n; i++) {
    const key = i*step;
    this._setForKey(key);
  }
  // the last sample is for `1`
  this._setForKey(1);
};

/**
 * `_setForKey` - helper function for `_samplePath`,
 *                sets a key/value regarding `totalLength` on the map.
 *
 * @param  {Number} key Map key [0...1].
 */
MotionPath._setForKey = function(key) {
  const { totalLength } = this._samples;
  // x/y computation
  const length = key*totalLength;
  const point = this._path.getPointAtLength(length);
  const prevPoint = this._path.getPointAtLength(length - 1);
  // cangle computation
  const dY = point.y - prevPoint.y;
  const dX = point.x - prevPoint.x;
  const atan = (!isFinite(Math.atan(dY/dX))) ? 0 : Math.atan(dY/dX);
  const angle = atan*(180/Math.PI);
  // set the point to the map
  this._samples.set(key, { x: point.x, y: point.y, angle });
};

/**
 * `init` - function init the class.
 *
 * @extends @ClassProto
 * @public
 */
MotionPath.init = function(o={}) {
  // super call
  Super.init.call(this, o);
  // get target, if the `isSkipRender` is set on `property`
  // in `customProperties`, use `supportProps` otherwise use `el`
  const { el, supportProps, property, customProperties } = this._props;
  const custom = customProperties[property];
  this._target = (custom && custom.isSkipRender) ? supportProps : el;
  // parse path
  this._parsePath();
  // precompute path
  this._samplePath();
  // set up tween
  this._setupTweenie();
};

/**
 * `_setupTweenie` - function set up tweenie if needed.
 *
 * @extends @ClassProto
 * @public
 */
MotionPath._setupTweenie = function() {
  // options
  const options = { ...this._o };
  // separate tween  options
  const tweenOptions = separateTweenieOptions(options);
  if (tweenOptions !== undefined) {
    this.tween = new Tweenie({
      ...tweenOptions,
      // send `onUpdate` function to call the `this.update` function
      // and envoke previous `onUpdate`
      onUpdate: (ep, p, isForward) => {
        this.update(ep, p, isForward);
        // envoke old `onUpdate` if is present
        if (tweenOptions.onUpdate !== void 0) {
          tweenOptions.onUpdate(ep, p, isForward);
        }
      }
    });
  }
};

/**
 * `_decalreDefaults` - function to declare defaults.
 *
 * @extends @ClassProto
 * @private
 */
MotionPath._declareDefaults = function(o={}) {
  this._defaults = {
    el: null,
    supportProps: null,
    customProperties: {},
    path: 'M0,0 L100,100',
    precision: 140,
    coordinate: 'x',
    property: 'x'
  };
};

/**
 * _extendDefaults - Method to copy `_o` options to `_props` object
 *                  with fallback to `_defaults`.
 * @private
 * @overrides @ ClassProto
 */
MotionPath._extendDefaults = function() {
  // super call
  ClassProto._extendDefaults.call(this);
  // parse stagger
  for (let key in this._props) {
    this._props[key] = staggerProperty(this._props[key], this.index);
  }

  const { property } = this._props;
  if (property === 'y' || property === 'angle') {
    this.setIfNotSet('coordinate', property);
  }
};

/**
 * `_parsePath` - function to parse SVG motion path.
 */
MotionPath._parsePath = function() {
  const { path } = this._props;
  this._path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  this._path.setAttributeNS(null, 'd', path);
};

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Tweenie instance.
 */
const wrap = (o) => {
  const instance = Object.create(MotionPath);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = MotionPath;

export { wrap as MotionPath };
