
import h from '../h';
import t from './tweener';
import easing from '../easing/easing';

// TODO: all public methods should return this

var Tween = class Tween {
  constructor(o={}) {
    this.o = o;
    this.declareDefaults(); this.extendDefaults(); this.vars(); return this;
  }

  declareDefaults() {
    this.defaults = {
      duration:               600,
      delay:                  0,
      repeat:                 0,
      yoyo:                   false,
      easing:                 'Linear.None',
      onStart:                null,
      onComplete:             null,
      onReverseComplete:      null,
      onFirstUpdate:          null,
      onUpdate:               null,
      onFirstUpdateBackward:  null,
      isChained:              false,
    }
  }

  vars() {
    this.h = h; this.progress = 0; this.prevTime = 0;
    return this.calcDimentions();
  }

  calcDimentions() {
    this.props.time              = this.props.duration + this.props.delay;
    this.props.repeatTime        = this.props.time * (this.props.repeat + 1);
  }

  extendDefaults() {
    this.props = {}
    for (var key in this.defaults) {
      if (Object.hasOwnProperty.call(this.defaults, key)) {
        var value = this.defaults[key];
        this.props[key] = (this.o[key] != null) ? this.o[key] : value;
        this.props.easing = easing.parseEasing(this.o.easing || this.defaults.easing);
        this.onUpdate     = this.props.onUpdate;
      }
    }
  }
  /*
    Method for setting start and end time to selft props.
    @param Number(Timestamp), Null
    @returns this
  */
  start(time) {
    var props = this.props;
    this.isCompleted = false; this.isStarted = false
    
    time = (time == null) ? performance.now() : time;
    props.startTime = time + props.delay + (props.shiftTime || 0);
    props.endTime   = props.startTime + props.repeatTime - props.delay;

    return this;
  }

  update(time, isGrow) {
    /*
      if time is inside the active area of the tween.
      active area is the area from start time to end time,
      with all the repeat and delays in it
    */
    if ((time >= this.props.startTime) && (time < this.props.endTime)) {
      // reset callback flags
      this.isOnReverseComplete = false; this.isCompleted = false
      // onFirtUpdate callback
      
      if (!this.isFirstUpdate) {
        if (this.props.onFirstUpdate != null && typeof this.props.onFirstUpdate === 'function') {
          this.props.onFirstUpdate.apply(this); this.isFirstUpdate = true;
        }
      }

      if (!this.isStarted) {
        if (this.props.onStart != null && typeof this.props.onStart === 'function') {
          this.props.onStart.apply(this); this.isStarted = true;
        }
      }
      
      this._updateInActiveArea(time);
        
      if ( time < this.prevTime && !this.isFirstUpdateBackward ) {
        if (this.props.onFirstUpdateBackward != null && typeof this.props.onFirstUpdateBackward === 'function') {
          this.props.onFirstUpdateBackward.apply(this);
        }
        this.isFirstUpdateBackward = true;
      }

    } else {
      // complete if time is larger then end time
      // this.o.isIt && console.log(this.isCompleted);
      if ( time >= this.props.endTime && !this.isCompleted ) {
        this._complete();
      }
      // rest isFirstUpdate flag if update was out of active zone
      if ( time > this.props.endTime ) { this.isFirstUpdate = false; }
      // reset isFirstUpdateBackward flag if progress went further the end time
      if ( time > this.props.endTime ) { this.isFirstUpdateBackward = false; }
    }
    
    if ( time < this.prevTime && time <= this.props.startTime ) {
      if (!this.isFirstUpdateBackward) {
        if (this.props.onFirstUpdateBackward != null && typeof this.props.onFirstUpdateBackward === 'function') {
          this.props.onFirstUpdateBackward.apply(this);
        }
        this.isFirstUpdateBackward = true;
      }

      // isGrow indicates if actual parent time is growing.
      // Despite the fact that the time could be < previous time && <= startTime
      // it is actually grows. Tween could be added to a
      // Timeline, and the later will work with Tween's periods, feeding
      // 0 at the end of the period, because period % period === 0.
      // See 182 line of Timline's code for more info.
      if (isGrow) {
        if (!this.isCompleted && this.prevTime < this.props.endTime ) {
          this._complete();
        }
      } else if ( !this.isOnReverseComplete /* && this.isFirstUpdate */ ) {
        this.isOnReverseComplete = true;
        this.setProgress(0, !this.props.isChained);
        if (this.props.onReverseComplete != null && typeof this.props.onReverseComplete === 'function') {
          this.props.onReverseComplete.apply(this);
        }
      }

      this.isFirstUpdate = false;
    }

    this.prevTime = time;
    return this.isCompleted;
  }

  /*
    Method to set tween's state to complete
  */
  _complete() {
    this.setProgress(1);
    if (this.props.onComplete != null && typeof this.props.onComplete === 'function') {
      this.props.onComplete.apply(this);
    }
    this.isCompleted = true; this.isStarted = false;
    this.isOnReverseComplete = false;
  }

  _updateInActiveArea(time) {
    var props = this.props;
    var startPoint = props.startTime - props.delay;
    var elapsed = (time - startPoint) % (props.delay + props.duration);
    var cnt = Math.floor( (time - startPoint) / (props.delay + props.duration) );
    // if time is inside the duration area of the tween
    if ( startPoint + elapsed >= props.startTime ) {
      // active zone or larger then end
      var elapsed2 = (time-props.startTime) % (props.delay + props.duration)
      var proc = elapsed2/props.duration
      // if not yoyo then set the plain progress
      if (!props.yoyo) { this.setProgress(proc); }
      else {
        // if yoyo then check if the current duration
        // period is even. If so set progress, otherwise
        // set inverset proc value
        if (cnt % 2 === 0) { this.setProgress(proc); }
        else {
          if (proc === 1) { this.setProgress(1-0); } else { this.setProgress(1-proc); }
        }
      }
    }
    // delay gap
    else {
      if (this.prevTime < time) { this.setProgress(1); } else { this.setProgress(0); }
    }
  }

  /*
    Method to set Tween's progress
    @param {Number} Progress to set
    @param {Boolean} ?
  */

  setProgress(p, isCallback=true) {
    this.progress = p;
    this.easedProgress = this.props.easing(this.progress);
    if (this.props.prevEasedProgress !== this.easedProgress && isCallback) {
      if (this.onUpdate != null && typeof this.onUpdate === 'function') {
        this.onUpdate(this.easedProgress, this.progress);
      }
    }
    this.props.prevEasedProgress = this.easedProgress;
  }

  /*
    Method to set property[s] on Tween
    @param {Object, String} Hash object of key/value pairs, or property name
    @param {_} Property's value to set
  */
  setProp(obj, value) {
    // handle hash object case
    if (typeof obj === 'object') {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          this.props[key] = obj[key];
          if (key === 'easing') {
            this.props.easing = easing.parseEasing(this.props.easing);
          }
        }
      }
    // handle key, value case
    } else if (typeof obj === 'string') {
      // if key is easing - parse it immediately
      if ( obj === 'easing' ) { this.props.easing = easing.parseEasing(value); }
      // else just save it to props
      else { this.props[obj] = value; }
    }
    this.calcDimentions();
  }

  /*
    Method to run the Tween
    @param  {Number} Start time
    @return {Object} Self
  */
  run(time) {
    this.start(time); !time && (t.add(this)); //@state = 'play'
    return this;
  }

  /*
    Method to stop the Tween.
    @returns {Object} Self
  */
  stop() { this.pause(); this.setProgress(0); return this; }

  /*
    Method to pause Tween.
    @returns {Object} Self
  */
  pause() { this._removeFromTweener(); return this; }

  /*
    Method to remove the Tween from the tweener.
  */
  _removeFromTweener() { t.remove(this); return this; }
}

export default Tween;


