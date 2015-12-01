import h from '../h';
import t from './tweener';

class Timeline {
  constructor(o = {}) {
    this.o = o;
    this.vars();
    this._extendDefaults();
    return this;
  }

  vars() {
    this.state      = 'stop';
    this.defaults   = { repeat: 0, delay:  0 };
    this.timelines  = [];
    this.props      = { time: 0, repeatTime: 0, shiftedRepeatTime: 0  };
    this.loop       = h.bind(this.loop, this);
    this.onUpdate   = this.o.onUpdate;
  }

  add(...args) { this.pushTimelineArray(args); return this; }

  pushTimelineArray(array) {
    for (var i = 0; i < array.length; i++) {
      var tm = array[i];
      // recursive push to handle arrays of arrays
      if ( h.isArray(tm) ) {
        this.pushTimelineArray(tm)
      } else { this.pushTimeline(tm); }
    };
  }

  /*
    Method to extend defaults by options and save
    the result to props object
  */
  _extendDefaults() {
    for (var key in this.defaults) {
      if (this.defaults.hasOwnProperty(key)) {
        this.props[key] = ( this.o[key] != null ) ? this.o[key] : this.defaults[key];
      }
    }
  }

  /*
    Method to add a prop to the props object.
  */
  setProp(props) {
    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        this.props[key] = props[key];
      }
    }
    return this.recalcDuration();
  }

  pushTimeline(timeline, shift) {
    // if timeline is a module with timeline property then extract it
    if (timeline.timeline instanceof Timeline) { timeline = timeline.timeline; }
    // add self delay to the timeline
    (shift != null) && timeline.setProp({ 'shiftTime': shift });
    this.timelines.push(timeline);
    return this._recalcTimelineDuration(timeline);
  }

  remove(timeline) {
    var index = this.timelines.indexOf(timeline);
    if (index !== -1) { this.timelines.splice(index, 1); }
  }

  /*
    Method to append the tween to the end of the
    timeline. Each argument is treated as a new 
    append. Array of tweens is treated as a parallel
    sequence. 
    @param {Object, Array} Tween to append or array of such.
  */
  append() {
    for (var tm of timeline) {
      if ( h.isArray(tm) ) {
        this._appendTimelineArray(tm);
      } else { this.appendTimeline(tm, this.timelines.length); }
    }
    return this;
  }

  /*  Method to append the tween to the end of the
      timeline. Each argument is treated as a new 
      append. Array of tweens is treated as a parallel
      sequence. 
      @param {Object, Array} Tween to append or array of such.
  */
  append(...timeline) {
    for (var tm of timeline) {
      if (h.isArray(tm)) {
        this._appendTimelineArray(tm);
      } else this.appendTimeline(tm, this.timelines.length)
    }
    return this;
  }

  _appendTimelineArray(timelineArray) {
    var i     = timelineArray.length;
    var time  = this.props.repeatTime - this.props.delay;
    var len   = this.timelines.length;

    while(i--) { this.appendTimeline(timelineArray[i], len, time); }
  }

  appendTimeline(timeline, index, time) {
    var shift = (time != null) ? time : this.props.time;
    shift    += timeline.props.shiftTime || 0;
    timeline.index = index; this.pushTimeline(timeline, shift);
  }

  recalcDuration() {
    var len = this.timelines.length;
    this.props.time = 0; this.props.repeatTime = 0; this.props.shiftedRepeatTime = 0
    while(len--) { this._recalcTimelineDuration(this.timelines[len]); }
  }

  _recalcTimelineDuration(timeline) {
    var timelineTime = timeline.props.repeatTime + (timeline.props.shiftTime || 0);
    this.props.time = Math.max(timelineTime, this.props.time);
    this.props.repeatTime = (this.props.time+this.props.delay)*(this.props.repeat+1);
    this.props.shiftedRepeatTime = this.props.repeatTime + (this.props.shiftTime || 0);
    this.props.shiftedRepeatTime -= this.props.delay;
  }

  /*  Method to take care of the current time.
      @param {Number} The current time
      @return {Undefined, Boolean} Returns true if the tween
      had ended it execution so should be removed form the 
      tweener's active tweens array
  */
  update(time, isGrow) {
    // don't go further then the endTime
    if (time > this.props.endTime) { time = this.props.endTime; }
    // return true if timeline was already completed
    if (time === this.props.endTime && this.isCompleted) { return true; }
    // set the time to timelines
    this._updateTimelines(time, isGrow);
    /*  check the callbacks for the current time
        NOTE: _checkCallbacks method should be returned
        from this update function, because it returns true
        if the tween was completed, to indicate the tweener
        module to remove it from the active tweens array for 
        performance purposes
    */
    return this._checkCallbacks(time);
  }

  /*
    Method to set time on timelines,
    with respect to repeat periods **if present**
    @param {Number} Time to set
  */
  _updateTimelines(time, isGrow) {
    // get elapsed with respect to repeat option
    // so take a modulo of the elapsed time
    var startPoint = this.props.startTime - this.props.delay
    var elapsed = (time - startPoint) % (this.props.delay + this.props.time)

    var timeToTimelines = null;
    // get the time for timelines
    if (time === this.props.endTime) { timeToTimelines = this.props.endTime; }
    // after delay
    else if (startPoint + elapsed >= this.props.startTime)
      if (time >= this.props.endTime) { timeToTimelines = this.props.endTime; }
      else { timeToTimelines = startPoint + elapsed; }
    else
      if (time > this.props.startTime + this.props.time) {
        timeToTimelines = this.props.startTime + this.props.time;
      } else { timeToTimelines = null; }

    // set the normalized time to the timelines
    if (timeToTimelines != null) {
      var i   = -1,
          len = this.timelines.length-1;

      isGrow = (isGrow == null)
        ? time > (this._previousUpdateTime || 0)
        : isGrow;
      while(i++ < len) {
        this.timelines[i].update(timeToTimelines, isGrow);
        }
      }
    return this._previousUpdateTime = time;
  }
  /*
    Method to check the callbacks
    for the current time
    @param {Number} The current time
  */
  _checkCallbacks(time) {
    // dont care about the multiple exact same time calls
    if ( this.prevTime === time ) { return; }

    // if there is no prevTime - so it wasnt called ever at all
    // or if it was called but have been completed already
    // and it wasnt started yet -- then start!
    if ( !this.prevTime || this.isCompleted && !this.isStarted ) {
      if ( this.o.onStart != null && typeof this.o.onStart === 'function' ) {
        this.o.onStart.apply(this);
      }
      this.isStarted = true; this.isCompleted = false;
    }
    // if isn't complete
    if (time >= this.props.startTime && time < this.props.endTime) {
      if ( this.onUpdate != null && typeof this.onUpdate === 'function' ) {
        this.onUpdate( (time - this.props.startTime) / this.props.repeatTime )
      }
    }
    // if reverse completed
    if ( this.prevTime > time && time <= this.props.startTime ) {
      if ( this.o.onReverseComplete != null && typeof this.o.onReverseComplete === 'function' ) {
        this.o.onReverseComplete.apply(this);
      }
    }
    // @isCompleted = false if time < this.props.startTime
    // save the current time as previous for future
    this.prevTime = time;
    // if completed
    if ( time === this.props.endTime && !this.isCompleted ) {
      if (this.onUpdate != null && typeof this.onUpdate === 'function' ) {
        this.onUpdate(1);
      }
      if (this.o.onComplete != null && typeof this.o.onComplete === 'function' ) {
        this.o.onComplete.apply(this);
      }
      this.isCompleted = true; this.isStarted = false; return true
    }
  }

  play(time) {
    this.setStartTime(time);
    if (!time) { t.add(this); this.state = 'play'; };
    return this;
  }

  pause() { this.removeFromTweener(); this.state = 'pause'; return this; }
  
  stop() {
    this.removeFromTweener(); this.setProgress(0);
    this.state = 'stop'; return this;
  }

  restart() { this.stop(); this.play(); return this; }

  removeFromTweener() { t.remove(this); return this; }

  setStartTime(time) {
    this.getDimentions(time); this.startTimelines(this.props.startTime);
  }

  startTimelines(time) {
    var i = this.timelines.length;
    ( time == null) && (time = this.props.startTime);
    while(i--) { this.timelines[i].setStartTime(time); }
  }

  setProgress(progress) {
    if ( this.props.startTime == null ) { this.setStartTime(); }
    progress = h.clamp(progress, 0, 1);
    this.update( this.props.startTime + progress*this.props.repeatTime );
  }

  getDimentions(time) {
    time = (time == null) ? performance.now() : time;
    this.props.startTime  = time + this.props.delay + (this.props.shiftTime || 0);
    this.props.endTime    = this.props.startTime + this.props.shiftedRepeatTime;
    this.props.endTime   -= (this.props.shiftTime || 0);
  }
}

export default Timeline;
