import { Tweenie } from './tweenie';
import { ClassProto } from '../class-proto';
import { consoleName } from '../constants';

// TODO:
//  - add `onRefresh` that will call all the child items.

/* --------------------- */
/* The `Timeline` class  */
/* --------------------- */

const Super = Tweenie.__mojsClass;
const Timeline = Object.create(Super);

/**
 * _declareDefaults - function do override some defaults.
 *
 * @overrides @ Tweenie
 * @private
 */
Timeline._declareDefaults = function() {
  // super call
  Super._declareDefaults.call(this);
  // reset `duration` to `0` because user cannot set duration of a Timeline -
  // it is calculated automatically regarding child timelines durations
  this._defaults.duration = 0;
  // reset the `easing` since timeline should not have easing by default
  this._defaults.easing = 'linear.none';
};

/* ---------------------- */
/* The `Public` functions */
/* ---------------------- */

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
 * @extends @ Tweenie
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
    context._callOnItems('update', ep, p, isForward, time);
    // 2. the order is important
    onUpdate(ep, p, isForward, time);
  };
};

/**
 * _vars - declare vars.
 *
 * @extends @ Tweenie
 * @private
 */
Timeline._vars = function () {
  this._items = [];
  Super._vars.call(this);
};

/**
 * _extendDefaults - Method to copy `_o` options to `_props` object
 *                  with fallback to `_defaults`.
 * @overrides @ Tweenie
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
 * @returns {Object} Tweenie instance.
 */
const wrap = (o) => {
  const instance = Object.create(Timeline);
  instance.init(o);

  return instance;
}

export { wrap as Timeline };

// /*
//   API method to add child tweens/timelines.
//   @public
//   @param {Object, Array} Tween/Timeline or an array of such.
//   @returns {Object} Self.
// */
// add(...args) {
//   this._pushTimelineArray(args);
//   this._calcDimentions();
//   return this;
// },
//
// /*
//   API method to append the Tween/Timeline to the end of the
//   timeline. Each argument is treated as a new append.
//   Array of tweens is treated as a parallel sequence.
//   @public
//   @param {Object, Array} Tween/Timeline to append or array of such.
//   @returns {Object} Self.
// */
// append(...timeline) {
//   for (var tm of timeline) {
//     if (h.isArray(tm)) { this._appendTimelineArray(tm); }
//     else { this._appendTimeline(tm, this._timelines.length); }
//     this._calcDimentions();
//   }
//   return this;
// },
//
// // ^ PUBLIC  METHOD(S) ^
// // v PRIVATE METHOD(S) v
//
// /*
//   Method to append Tween/Timeline array or mix of such.
//   @private
//   @param {Array} Array of Tweens/Timelines.
// */
// _appendTimelineArray(timelineArray) {
//   var i     = timelineArray.length,
//       time  = this._props.repeatTime - this._props.delay,
//       len   = this._timelines.length;
//
//   while(i--) { this._appendTimeline(timelineArray[i], len, time); }
// },
//
// /*
//   Method to append a single timeline to the Timeline.
//   @private
//   @param {Object} Tween/Timline to append.
//   @param {Number} Index of the append.
//   @param {Number} Shift time.
// */
// _appendTimeline(timeline, index, time) {
//   // if timeline is a module with timeline property then extract it
//   if (timeline.timeline instanceof Timeline) { timeline = timeline.timeline; }
//   if (timeline.tween instanceof Tween) { timeline = timeline.tween; }
//
//   var shift = (time != null) ? time : this._props.duration;
//   shift += timeline._props.shiftTime || 0;
//   timeline.index = index; this._pushTimeline(timeline, shift);
// },
//
// /*
//   PrivateMethod to push Tween/Timeline array.
//   @private
//   @param {Array} Array of Tweens/Timelines.
// */
// _pushTimelineArray(array) {
//   for (var i = 0; i < array.length; i++) {
//     var tm = array[i];
//     // recursive push to handle arrays of arrays
//     if (tm instanceof Array) {
//       this._pushTimelineArray(tm)
//     } else { this._pushTimeline(tm); }
//   };
// },
//
// /*
//   Method to push a single Tween/Timeline.
//   @private
//   @param {Object} Tween or Timeline to push.
//   @param {Number} Number of milliseconds to shift the start time
//                   of the Tween/Timeline.
// */
// _pushTimeline(timeline, shift) {
//   // if timeline is a module with timeline property then extract it
//   if (timeline.timeline instanceof Timeline) { timeline = timeline.timeline; }
//   if (timeline.tween instanceof Tween) { timeline = timeline.tween; }
//   // add self delay to the timeline
//   (shift != null) && timeline._setProp({ 'shiftTime': shift });
//   this._timelines.push(timeline);
//   this._recalcDuration(timeline);
// },
//
// /*
//   Method calculate self duration based on timeline's duration.
//   @private
//   @param {Object} Tween or Timeline to calculate.
// */
// _recalcDuration(timeline) {
//   const { _props, _negativeShift } = timeline;
//   const { repeatTime, speed, shiftTime = 0 } = _props;
//   const timelineTime = repeatTime/speed + shiftTime + _negativeShift;
//
//   this._props.duration = Math.max(timelineTime, this._props.duration);
// },
//
// /*
//   Method calculate self duration from skretch.
//   @private
// */
// _recalcTotalDuration() {
//   var i = this._timelines.length;
//   this._props.duration = 0;
//   while(i--) {
//     var tm = this._timelines[i];
//     // recalc total duration on child timelines
//     tm._recalcTotalDuration && tm._recalcTotalDuration();
//     // add the timeline's duration to selft duration
//     this._recalcDuration(tm);
//   }
//   this._calcDimentions();
// },
