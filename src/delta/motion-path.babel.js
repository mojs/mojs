import { Tweenie } from '../tween/tweenie';
import { ClassProto } from '../class-proto';
import { separateTweenieOptions } from './separate-tweenie-options';

/* ----------------------- */
/* The `MotionPath` class  */
/* ----------------------- */

// TODO:
//  - add unit
//  - add reverse
//  - add bounds?
//  - add offset?

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
  const { el, precision, coordinate, property } = this._props;

  const numberDecimals = +precision || 0; // +var magic!
  const multiplyer = Math.pow(10.0, numberDecimals);
  const key = Math.round(ep * multiplyer) / multiplyer;

  el[property] = this._samples.get(key)[coordinate];
  return this;
};

/* ----------------------- */
/* The `Private` functions */
/* ----------------------- */

/**
 * `init` - function init the class.
 *
 * @extends @ClassProto
 * @public
 */
MotionPath.init = function(o={}) {
  // super call
  Super.init.call(this, o);
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
    path: 'M0,0 L100,100',
    precision: 2,
    el: null,
    coordinate: 'x',
    property: 'x'
  };
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
 * `_samplePath` - function to sample path coordinates.
 *
 * @private
 * @param {Number} Number of floating point digits.
 */
MotionPath._samplePath = function(n = this._props.precision) {
  const totalLength = this._path.getTotalLength();
  const samplesCount = Math.pow(10, n);
  const step = 1/samplesCount;

  this._samples = new Map();
  let p = 0;
  for (let i = 0; i < samplesCount; i++) {
    this._setSampleFor(p, n, totalLength);
    p += step;
  }

  this._setSampleFor(1, n, totalLength);
};

/**
 * _setSampleFor - function to set some number to the map,
 *                 helper for `_samplePath`.
 *
 * @private
 * @param  {Number} Number to add [0...1].
 * @param  {Number} Precision.
 * @param  {Number} Total path length.
 */
MotionPath._setSampleFor = function(number, n, totalLength) {
  const key = this._toPrecision(number, n);
  const point = this._path.getPointAtLength(key*totalLength);
  this._samples.set(key, { x: point.x, y: point.y });
};

/**
 * `_toPrecision` - function to convert number to some precision,
 *                  helper for `_setSampleFor`.
 *
 * @private
 * @param {Number} Number to convert.
 * @param {Number} Precision.
 * @return {Number} Converted number.
 */
MotionPath._toPrecision = function(number, precision) {
  const numberDecimals = +precision || 0; // +var magic!
  const multiplyer = Math.pow(10.0, numberDecimals);
  return Math.round(number * multiplyer) / multiplyer;
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
