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
 * `init` = function init the class.
 *
 * @extends @ClassProto
 * @public
 */
Delta.init = function(o = {}) {
  ClassProto.init.call(this, o);

  this._parseDelta();
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
    customProperties: null
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
