import Tween from './tween-scope';
import fallbackFactory from '../helpers/fallback';
import { consoleName } from '../constants';
import defaults from './timeline-defaults';

const timelineFactory = (o = {}) => {
  // child timelines
  const timelines = [];
  // export object
  const timeline = {};

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

  // if duration was passed on initialization stage, warn user and reset it.
  if (o.duration != null) {
    console.warn(`${consoleName} Duration can not be declared on Timeline,
            but "${o.duration}" set. You probably want to use
            a "Tween" instead.`
    );
    o.duration = 0;
  }

  o.onSetStartTime = _startTimelines;

  const tween = Tween(o);

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
    this._recalcDuration(timeline);
  }

  /**
   * refresh - method to override `onRefresh` on a `Tween`,
   *            refreshes all children.
   *
   * @param  {type} isBefore description
   */
  const refresh = (isBefore) => {
    const len = timelines.length;
    for (var i = 0; i < len; i++) {
      timelines[i].refresh( isBefore );
    }

    return timeline;
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
    _calcDimentions();
  };

  // inherit getTotalTime from tween
  const { getTotalTime } = tween;

  /**
   * Expose public methods:
   */
  timeline.add = add;
  timeline.getTotalTime = getTotalTime;

  return timeline;
};

export default timelineFactory;
