import h from '../h';
import t from './tweener';
import Tween from './tween';

class Timeline extends Tween {
  /*
    API method to add child tweens/timelines.
    @public
    @param {Object, Array} Tween/Timeline or an array of such.
    @returns {Object} Self.
  */
  add (...args) {
    this._pushTimelineArray(args);
    this._calcDimentions();
    return this;
  }
  /*
    API method to append the Tween/Timeline to the end of the
    timeline. Each argument is treated as a new append.
    Array of tweens is treated as a parallel sequence. 
    @public
    @param {Object, Array} Tween/Timeline to append or array of such.
    @returns {Object} Self.
  */
  append (...timeline) {
    for (var tm of timeline) {
      if (h.isArray(tm)) { this._appendTimelineArray(tm); }
      else { this._appendTimeline(tm, this._timelines.length); }
      this._calcDimentions();
    }
    return this;
  }
  /*
    API method to stop the Tween.
    @public
    @param   {Number} Progress [0..1] to set when stopped.
    @returns {Object} Self.
  */
  stop ( progress ) {
    super.stop( progress );
    this._stopChildren( progress );
    return this;
  }
  /*
    Method to reset tween's state and properties.
    @public
    @overrides @ Tween
    @returns this.
  */
  reset () {
    super.reset();
    this._resetChildren();
    return this;
  }
  /*
    Method to call `reset` method on all children.
    @private
  */
  _resetChildren () {
    for ( var i = 0; i < this._timelines.length; i++ ) {
      this._timelines[i].reset();
    }
  }
  /*
    Method to call `stop` method on all children.
    @private
    @param   {Number} Progress [0..1] to set when stopped.
  */
  _stopChildren ( progress ) {
    for ( var i = this._timelines.length-1; i >= 0; i-- ) {
      this._timelines[i].stop( progress );
    }
  }
  /*
    Method to set tween's state to complete.
    @private
    @overrides @ Tween
    @param {Number} Current time.
    @param {Boolean} Is yoyo period.
  */
  // _complete ( time, isYoyo ) {
  //   // this._updateChildren( 1, time, isYoyo );
  //   // this._setProgress( 1, time, isYoyo );
  //   super._complete( time, isYoyo );
  //   // this._resetChildren();
  // }

  // ^ PUBLIC  METHOD(S) ^
  // v PRIVATE METHOD(S) v
  
  /*
    Method to append Tween/Timeline array or mix of such.
    @private
    @param {Array} Array of Tweens/Timelines.
  */
  _appendTimelineArray (timelineArray) {
    var i     = timelineArray.length,
        time  = this._props.repeatTime - this._props.delay,
        len   = this._timelines.length;

    while(i--) { this._appendTimeline(timelineArray[i], len, time); }
  }
  /*
    Method to append a single timeline to the Timeline.
    @private
    @param {Object} Tween/Timline to append.
    @param {Number} Index of the append.
    @param {Number} Shift time.
  */
  _appendTimeline (timeline, index, time) {
    // if timeline is a module with timeline property then extract it
    if (timeline.timeline instanceof Timeline) { timeline = timeline.timeline; }
    if (timeline.tween instanceof Tween) { timeline = timeline.tween; }

    var shift = (time != null) ? time : this._props.duration;
    shift    += timeline._props.shiftTime || 0;
    timeline.index = index; this._pushTimeline(timeline, shift);
  }
  /*
    PrivateMethod to push Tween/Timeline array.
    @private
    @param {Array} Array of Tweens/Timelines.
  */
  _pushTimelineArray (array) {
    for (var i = 0; i < array.length; i++) {
      var tm = array[i];
      // recursive push to handle arrays of arrays
      if ( h.isArray(tm) ) {
        this._pushTimelineArray(tm)
      } else { this._pushTimeline(tm); }
    };
  }
  /*
    Method to push a single Tween/Timeline.
    @private
    @param {Object} Tween or Timeline to push.
    @param {Number} Number of milliseconds to shift the start time
                    of the Tween/Timeline.
  */
  _pushTimeline (timeline, shift) {
    // if timeline is a module with timeline property then extract it
    if (timeline.timeline instanceof Timeline) { timeline = timeline.timeline; }
    if (timeline.tween instanceof Tween) { timeline = timeline.tween; }
    // add self delay to the timeline
    (shift != null) && timeline._setProp({ 'shiftTime': shift });
    this._timelines.push(timeline);
    this._recalcDuration(timeline);
  }
  /*
    Method set progress on self and child Tweens/Timelines.
    @private
    @param {Number} Progress to set.
    @param {Number} Current update time.
  */
  _setProgress (p, time, isYoyo) {
    // we need to pass self previous time to children
    // to prevent initial _wasUnknownUpdate nested waterfall
    // if not yoyo option set, pass the previous time
    // otherwise, pass previous or next time regarding yoyo period.

    // COVER CURRENT SWAPPED ORDER
    this._updateChildren( p, time, isYoyo );
    
    Tween.prototype._setProgress.call( this, p, time );
  }

  _updateChildren ( p, time, isYoyo ) {
    var coef = ( time > this._prevTime ) ? -1 : 1;
    if ( this._props.isYoyo && isYoyo ) { coef *= -1; }
    var timeToTimelines     = this._props.startTime + p*(this._props.duration),
        prevTimeToTimelines = timeToTimelines + coef,
        len = this._timelines.length;

    for (var i = 0; i < len; i++) {
      // specify the children's array update loop direction
      // if time > prevTime go from 0->length else from length->0
      // var j = ( time > this._prevTime ) ? i : (len-1) - i ;
      var j = ( timeToTimelines > prevTimeToTimelines ) ? i : (len-1) - i ;
      this._timelines[j]._update(
        timeToTimelines,
        prevTimeToTimelines,
        this._prevYoyo,
        this._onEdge
      );
    }
    this._prevYoyo = isYoyo;
  }
  /*
    Method calculate self duration based on timeline's duration.
    @private
    @param {Object} Tween or Timeline to calculate.
  */
  _recalcDuration (timeline) {
    var p             = timeline._props,
        timelineTime  = p.repeatTime/p.speed + (p.shiftTime || 0) + timeline._negativeShift;

    this._props.duration = Math.max(timelineTime, this._props.duration);
  }
  /*
    Method calculate self duration from skretch.
    @private
  */
  _recalcTotalDuration () {
    var i = this._timelines.length;
    this._props.duration = 0;
    while(i--) {
      var tm = this._timelines[i];
      // recalc total duration on child timelines
      tm._recalcTotalDuration && tm._recalcTotalDuration();
      // add the timeline's duration to selft duration
      this._recalcDuration(tm);
    }
    this._calcDimentions();
  }
  /*
    Method set start and end times.
    @private
    @param {Number, Null} Time to start with.
  */
  _setStartTime ( time, isReset = true ) {
    super._setStartTime(time);
    this._startTimelines(this._props.startTime, isReset);
  }
  /*
    Method calculate self duration based on timeline's duration.
    @private
    @param {Number, Null} Time to start with.
  */
  _startTimelines (time, isReset = true) {
    var p = this._props,
        isStop = this._state === 'stop';

    ( time == null) && (time = this._props.startTime);

    for (var i = 0; i < this._timelines.length; i++) {
      var tm = this._timelines[i];
      tm._setStartTime(time, isReset);
      // if from `_subPlay` and `_prevTime` is set and state is `stop`
      // prevTime normalizing is for play/pause functionality, so no
      // need to normalize if the timeline is in `stop` state.
      if ( !isReset && tm._prevTime != null && !isStop ) {
        tm._prevTime = tm._normPrevTimeForward();
      }
    }
  }
  /*
    Method to launch onRefresh callback.
    @method _refresh
    @private
    @overrides @ Tween
    @param {Boolean} If refresh even before start time.
  */
  _refresh ( isBefore ) {
    const len = this._timelines.length;
    for (var i = 0; i < len; i++) {
      this._timelines[i]._refresh( isBefore );
    }
    super._refresh( isBefore );
  }
  /*
    Method do declare defaults by this._defaults object
    @private
  */
  _declareDefaults () {
    // if duration was passed on initialization stage, warn user and reset it.
    if ( this._o.duration != null ) {
      h.error(`Duration can not be declared on Timeline, but "${this._o.duration}" is. You probably want to use Tween instead.`);
      this._o.duration = 0;
    }
    super._declareDefaults();
    // remove default 
    this._defaults.duration       = 0;
    this._defaults.easing         = 'Linear.None';
    this._defaults.backwardEasing = 'Linear.None';
    this._defaults.nameBase = 'Timeline';
  }

  constructor ( o = {} ) { super(o); }
  /*
    Method to declare some vars.
    @private
  */
  _vars () {
    this._timelines = [];
    super._vars();
  }
}

export default Timeline;
