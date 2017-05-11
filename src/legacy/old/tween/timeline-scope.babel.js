import Tween from './tween-scope';
import fallbackFactory from '../helpers/fallback';
import { consoleName } from '../constants';
import defaults from './timeline-defaults';

const timelineFactory = (o = {}) => {
  // child timelines
  const timelines = [];

  // for timeline duration is always 0
  let $duration = 0;

  /***** Private Methods *****/

  /**
   * _startTimelines - Method calculate self duration based
   *                  on timeline's duration.
   *
   * @private
   * @param {Number, Null} Time to start with.
   */
  const _startTimelines = (time, isReset = true) => {
    for (let i = 0; i < timelines.length; i++) {
      timelines[i].setStartTime(time, isReset);
    }
  }

  /**
   * _updateChildren - function to update children
   *
   * @private
   * @param  {Number} Progress in [0...1] range.
   * @param  {Number} Update time.
   * @param  {Number} Previous update time.
   * @param  {Boolean} isYoyo period.
   */
  const _updateChildren = (time, prevTime, wasYoyo, onEdge) => {
    prevTime = (prevTime == undefined) ? time-1 : prevTime;

    const len = timelines.length;
    for (let i = 0; i < len; i++) {
      // specify the children's array update loop direction
      // if time > prevTime go from 0->length else from length->0
      // var j = ( time > this._prevTime ) ? i : (len-1) - i ;
      var j = (time > prevTime) ? i : (len-1) - i ;
      timelines[j].update(time, prevTime, wasYoyo, onEdge);
    }
  }

  /**
   * refresh - method to override `onRefresh` on a `Tween`,
   *            refreshes all children.
   *
   * @param  {type} isBefore description
   */
  const refresh = (isBefore) => {
    tween.refresh(isBefore);

    const len = timelines.length;
    for (var i = 0; i < len; i++) {
      timelines[i].refresh(isBefore);
    }

    return tween;
  }

  // if duration was passed on initialization stage, warn user and reset it.
  if (o.duration != null) {
    console.warn(`${consoleName} Duration can not be declared on Timeline,
            but "${o.duration}" set. You probably want to use
            a "Tween" instead.`
    );
    o.duration = 0;
  }

  o.onSetStartTime = _startTimelines;
  o.onInternalUpdate = _updateChildren;
  o.onRefresh = _refresh;
  var tween = Tween(o);

  /**
   * _recalcDuration - Method calculate self duration based on timeline's duration.
   *
   * @private
   * @param {Object} Tween or Timeline to calculate.
   */
  const _recalcDuration = (timeline) => {
    $duration = Math.max(
      timeline.getTotalTime(), $duration
    );
  }

  /**
   * recalcTotalDuration - Method calculate self duration from scratch.
   *
   * @public
   */
  const recalcTotalDuration = () => {
    let i = timelines.length;
    // start from `0` value
    $duration = 0;

    while(i--) {
      const tm = timelines[i];
      // recalc total duration on child timelines
      tm.recalcTotalDuration && tm.recalcTotalDuration();
      // add the timeline's duration to selft duration
      _recalcDuration(tm);
    }

    tween.setDuration($duration);
  }

  /**
   * _pushTimeline - Method to push a single Tween/Timeline.
   *
   * @private
   * @param {Object} Tween or Timeline to push.
   * @param {Number} Number of milliseconds to shift the start time
                   of the Tween/Timeline.
   */
  const _pushTimeline = (timeline, shift) => {
    // if timeline is a module with timeline property then extract it

    /**
     * TODO:
     *   - add the ability for modules
     */
    // if (timeline.timeline instanceof Timeline) { timeline = timeline.timeline; }
    // if (timeline.tween instanceof Tween) { timeline = timeline.tween; }

    // add self delay to the timeline
    (shift !== undefined) && timeline._setProp({ 'shiftTime': shift });
    timelines.push(timeline);
    _recalcDuration(timeline);
  }

  /**
   * _pushTimelineArray - PrivateMethod to push Tween/Timeline array.
   *
   * @private
   * @param {Array} Array of Tweens/Timelines.
   */
  const _pushTimelineArray = (array) => {
    for (let i = 0; i < array.length; i++) {
      const tm = array[i];
      // recursive push to handle arrays of arrays
      if (tm instanceof Array) {
        this._pushTimelineArray(tm)
      } else { this._pushTimeline(tm); }
    };
  }

  /**
   * _appendTimeline - Method to append a single timeline to the Timeline.
   *
   * @private
   * @param {Object} Tween/Timline to append.
   * @param {Number} Index of the append.
   * @param {Number} Shift time.
   */
  const _appendTimeline = (timeline, index, time) => {
    // if timeline is a module with timeline property then extract it

    /**
     * TODO:
     *  - enable this for modules
     */
    // if (timeline.timeline instanceof Timeline) { timeline = timeline.timeline; }
    // if (timeline.tween instanceof Tween) { timeline = timeline.tween; }

    let shift = (time !== undefined) ? time : $duration;
    shift += timeline.getShiftTime();


    /**
     * TODO:
     *  - enable this for `stagger`
     */
    // timeline.index = index;

    _pushTimeline(timeline, shift);
  }

  /**
   * _appendTimelineArray - Method to append Tween/Timeline array or mix of such.
   *
   * @private
   * @param {Array} Array of Tweens/Timelines.
   */
  const _appendTimelineArray = (timelineArray) => {
    const len = timelines.length;
    const time = tween.getTime();

    let i = timelineArray.length;
    while(i--) { this._appendTimeline(timelineArray[i], len, time); }
  }

  /***** Public Methods *****/

  /**
   *  add - method to add child tweens/timelines.
   *
   * @public
   * @param {Object, Array} Tween/Timeline or an array of such.
   * @returns {Object} Self.
   */
  const add = (...args) => {
    _pushTimelineArray(args);
    tween.setDuration($duration);
    return tween;
  };

  /**
   * append - API method to append the Tween/Timeline to the end of the
   *          timeline. Each argument is treated as a new append. Array of
   *          tweens is treated as a parallel sequence.
   *
   * @public
   * @param {Object, Array} Tween/Timeline to append or array of such.
   * @returns {Object} Self.
   */
  const append = (...timeline) => {
    for (let tm of timeline) {
      if (tm instanceof Array) { _appendTimelineArray(tm); }
      else { _appendTimeline(tm, timelines.length); }
      tween.setDuration($duration);
    }

    return tween;
  }

  /**
   * stop - function to stop the Tween.
   *
   * @public
   * @param {Number} Progress [0..1] to set when stopped.
   * @returns {Object} Self.
   */
  const stop = (progress) => {
    tween.stop(progress);

    for (let i = timelines.length-1; i >= 0; i-- ) {
      timelines[i].stop(progress);
    }

    return tween;
  }

  /**
   * reset - Method to reset tween's state and properties.
   *
   * @public
   * @overrides @ Tween
   * @returns this.
   */
  const reset = () => {
    tween.reset();
    for (let i = 0; i < timelines.length; i++) { timelines[i].reset(); }
    return tween;
  }

  /**
   * Expose public methods:
   */
  tween.add = add;
  tween.append = append;
  tween.stop = stop;
  tween.reset = reset;
  tween.refresh = refresh;

  tween.recalcTotalDuration = recalcTotalDuration;

  return tween;
};

export default timelineFactory;
