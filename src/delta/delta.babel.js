import { ClassProto } from '../class-proto';
import { Tweenie } from '../tween/tweenie';
import { splitDelta } from './split-delta';
import { parseUnit } from './parse-unit';
import { parseNumber } from './parse-number';
import { unitRegexp } from './unit-regexp';

// map that holds all available parsers
const parsersMap = {
  unit: parseUnit,
  number: parseNumber
};

/* ------------------ */
/* The `Delta` class  */
/* ------------------ */

const Delta = Object.create(ClassProto);

/**
 * `init` - function init the class.
 *
 * @extends @ClassProto
 * @public
 */
Delta.init = function(o = {}) {
  // super call
  ClassProto.init.call(this, o);
  // parse delta
  this._parseDelta();
  // set up the update function acording to the delta type
  this.update = this[`_upd_${this._delta.type}`];
  // set up the tweenie
  this._setupTweenie();
};

/**
 * `_upd_number` - function to update `number` delta.
 *
 * @private
 * @param {Number} Eased progress.
 * @param {Number} Progress.
 * @param {Boolean} If forward update direction.
 * @returns {Object} This delta.
 */
Delta._upd_number = function(ep, p, isForward) {
  const { curve, delta, start, end } = this._delta;
  const { target, key } = this._props;

  target[key] = (curve === void 0)
    ? start + ep*delta
    : curve(p)*start + p*delta;

  return this;
};

/**
 * `_upd_unit` - function to update `unit` delta.
 *
 * @private
 * @param {Number} Eased progress.
 * @param {Number} Progress.
 * @param {Boolean} If forward update direction.
 * @returns {Object} This delta.
 */
Delta._upd_unit = function(ep, p, isForward) {
  const { curve, delta, start, end, unit } = this._delta;
  const { target, key } = this._props;

  const value = (curve === void 0)
    ? start + ep*delta
    : curve(p)*start + p*delta;

  target[key] = `${value}${unit}`;

  return this;
};

/**
 * `_setupTweenie` - function to set up tweenie if needed.
 */
Delta._setupTweenie = function () {
  const { tweenieOptions } = this._delta;
  // set up tweenie if `tweenOptions` is set
  if (tweenieOptions === void 0) { return; }

  // create tweenie with tweenie options
  this._tween = new Tweenie({
    ...tweenieOptions,
    // send `onUpdate` function to call the `this.update` function
    // and envoke previous `onUpdate`
    onUpdate: (ep, p, isForward) => {
      this.update(ep, p, isForward);
      // envoke old `onUpdate` if is present
      if (tweenieOptions.onUpdate !== void 0) {
        tweenieOptions.onUpdate(ep, p, isForward);
      }
    }
  });
};

/**
 * `_declareDefaults` - function to declare defaults.
 *
 * @extends @ClassProto
 * @private
 */
Delta._declareDefaults = function() {
  this._defaults = {
    key: null,
    object: null,
    customProperties: null,
    target: null
  };
};

/**
 * `_parseDelta` - function to parse delta.
 *
 * @private
 */
Delta._parseDelta = function() {
  const { key, customProperties } = this._props;

  (customProperties != null && customProperties[key] != null)
      ? this._parseByCustom()
      : this._parseByGuess();
};

/**
 * `_parseByGuess` - function to parse delta by guess.
 *
 * @private
 */
Delta._parseByGuess = function() {
  const { key, object, customProperties } = this._props;
  const split = splitDelta(object);
  const { start, end } = split;

  const isUnit = start.match(unitRegexp) || end.toString().match(unitRegexp);
  const type = (isUnit) ? 'unit' : 'number';
  this._delta = parsersMap[type](key, splitDelta(object));
};

/**
 * `_parseByCustom` - function to parse delta with help of customProperties.
 *
 * @private
 */
Delta._parseByCustom = function() {
  const { key, object, customProperties } = this._props;

  const customProperty = customProperties[key];
  const { type } = customProperty;

  this._delta = parsersMap[type](key, splitDelta(object));
};

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Tweenie instance.
 */
const wrap = (o) => {
  const instance = Object.create(Delta);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Delta;

export { wrap as Delta };
