import { Tween } from './tween';
import { ClassProto } from '../class-proto';
import { consoleName } from '../constants';

// TODO:
//  - add `onRefresh` that will call all the child items.

/* --------------------- */
/* The `Timeline` class  */
/* --------------------- */

const Super = Tween.__mojsClass;
const Timeline = Object.create(Super);

/**
 * _declareDefaults - function do override some defaults.
 *
 * @overrides @ Tween
 * @private
 */
Timeline._declareDefaults = function() {
  // super call
  Super._declareDefaults.call(this);
  // reset `duration` to `0` because user cannot set duration of a Timeline -
  // it is calculated automatically regarding child timelines durations
  // this._defaults.duration = 0;
  // reset the `easing` since timeline should not have easing by default
  this._defaults.easing = 'linear.none';
};

/* ---------------------- */
/* The `Public` functions */
/* ---------------------- */

/**
 * add - function to add `Tween` to the timeline.
 *
 * @public
 * @param   {Object, Array} A tween or array of tweens to add.
 * @param   {Number} Time shift >= 0.
 * @returns {Object} Self.
 */
Timeline.add = function(tween, shift = 0) {
  // make sure the shift is positive
  shift = Math.abs(shift);
  // if tween is really an array of tweens,
  // loop thru them and add one by one
  if (tween instanceof Array) {
    tween.forEach((tween) => { this.add(tween, shift); });
  // if a single tween, add it to `_items`
  } else {

    // if it has child `timeline` or `tween` property - add it instead
    const runner = tween.timeline || tween.tween;
    if (runner) { tween = runner; }

    // set the `shiftTime` on tween
    tween.set('shiftTime', shift);
    // add to child timelines
    this._items.push(tween);
    // check if we need to increase timeline's bound
    const { delay, duration, shiftTime } = tween._props;
    const time = delay + duration + shiftTime;
    this._props.duration = Math.max(this._props.duration, time);
  }

  return this;
};

/**
 * append - function to append `Tween` to the timeline.
 *
 * @public
 * @param   {Object, Array} A tween or array of tweens to append.
 * @param   {Number} Time shift >= 0.
 * @returns {Object} Self.
 */
Timeline.append = function(tween, shift = 0) {
  // add the tweens shifting them to the current `duration`
  this.add(tween, this._props.duration + Math.abs(shift));

  return this;
};

/**
 * stop - function to stop the Timeline.
 *
 * @public
 * @param   {Number} Progress [0..1] to set when stopped.
 * @returns {Object} Self.
 */
Timeline.stop = function(progress) {
  Super.stop.call(this, progress);

  for (var i = this._items.length-1; i >= 0; i--) {
    this._items[i].stop(progress);
  }

  return this;
};

/**
 * reset - function to reset tween's state and properties.
 *
 * @public
 * @overrides @ Tween
 * @returns this.
 */
Timeline.reset = function() {
  Super.reset.call(this);
  this._callOnItems('reset');

  return this;
};

/* ----------------------- */
/* The `Private` functions */
/* ----------------------- */

/**
 * setStartTime - function to set the start tme for the the Timeline.
 *
 * @extends @ Tween
 * @public
 *
 * @param  {Number} Start time.
 */
Timeline.setStartTime = function(time) {
  Super.setStartTime.call(this, time);
  this._callOnItems('setStartTime', this._start);

  return this;
};

/**
 * Timeline - function to call a function on all child items.
 *
 * @param  {String} `name` Function name.
 * @param  {Arrag} args All other arguments.
 */
Timeline._callOnItems = function(name, ...args) {
  for (var i = 0; i < this._items.length; i++) {
    this._items[i][name](...args);
  }
};

/**
 * _createUpdate - function constructor to update the Timeline and child items.
 *
 * @private
 * @param {Function} `onUpdate` callback from passed options.
 * @param {Object} Instance.
 */
Timeline._createUpdate = function (onUpdate, context) {
  /**
   * _createUpdate - function constructor to update the Timeline and child items.
   *
   * @private
   * @param {Number} Eased progress [0...1].
   * @param {Number} Progress [0...1].
   * @param {Boolean} If forward or backward direction.
   * @param {Number} Update time.
   */
  return function(ep, p, isForward, time) {
    // 1. the order is important
    for (var i = 0; i < context._items.length; i++) {
      context._items[i].update(time);
    }
    // 2. the order is important
    onUpdate(ep, p, isForward, time);
  };
};

/**
 * _vars - declare vars.
 *
 * @extends @ Tween
 * @private
 */
Timeline._vars = function () {
  Super._vars.call(this);
  // child `timelines`
  this._items = [];
  // reset the duraton because timeline cannot have it
  this._props.duration = 0;
};

/**
 * _extendDefaults - Method to copy `_o` options to `_props` object
 *                  with fallback to `_defaults`.
 * @overrides @ Tween
 * @private
 */
Timeline._extendDefaults = function() {
  // super call
  Super._extendDefaults.call(this);
  // save the `onUpdate` callback
  this._onUpdate = this._props.onUpdate;
  // redefine the `onUpdate` callback to `_createUpdate` function
  this._props.onUpdate = this._createUpdate(this._onUpdate, this);
};

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Tween instance.
 */
const wrap = (o) => {
  const instance = Object.create(Timeline);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Timeline;

export { wrap as Timeline };
