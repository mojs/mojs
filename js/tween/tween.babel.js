
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
      onRepeatComplete:       null,
      onRepeatStart:          null,
      onReverseComplete:      null,
      onFirstUpdate:          null,
      onUpdate:               null,
      onFirstUpdateBackward:  null,
      isChained:              false,
    }
  }

  vars() {
    this.h = h; this.progress = 0; this.prevTime = -1;
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
  setStartTime(time) {
    var props = this.props;
    this.isCompleted = false; this.isRepeatCompleted = false;
    this.isStarted = false;
    
    time = (time == null) ? performance.now() : time;
    props.startTime = time + props.delay + (props.shiftTime || 0);
    props.endTime   = props.startTime + props.repeatTime - props.delay;

    return this;
  }
  /*
    Method to update tween's progress.
    @param {Number}   Time from the parent regarding it's period size.
    @param {Boolean}  Indicates if parent progress grows.
    @param {Number}   Parent's current period number.
    @param {Number}   Parent's previous period number.
  */
  update(time, isGrow) {

    var props = this.props;

    /*
      if time is inside the active area of the tween.
      active area is the area from start time to end time,
      with all the repeat and delays in it
    */
    if ((time >= this.props.startTime) && (time <= this.props.endTime)) {
      // // this.isRepeatCompleted = false;
      // // onFirtUpdate callback
      // if (!this.isFirstUpdate) {
      //   if (this.props.onFirstUpdate != null && typeof this.props.onFirstUpdate === 'function') {
      //     this.props.onFirstUpdate.apply(this); this.isFirstUpdate = true;
      //   }
      // }

      // if (!this.isStarted) {
      //   if (this.props.onStart != null && typeof this.props.onStart === 'function') {
      //     this.props.onStart.apply(this); this.isStarted = true;
      //   }
      // }
      
      this._updateInActiveArea(time);
        
      // if ( time < this.prevTime && !this.isFirstUpdateBackward ) {
      //   if (this.props.onFirstUpdateBackward != null && typeof this.props.onFirstUpdateBackward === 'function') {
      //     this.props.onFirstUpdateBackward.apply(this);
      //   }
      //   this.isFirstUpdateBackward = true;
      // }

    } else {
      // complete if time is larger then end time
      if ( time > this.props.endTime && !this.isCompleted ) {
        // get period number
        var props = this.props;
        var startPoint = props.startTime - props.delay;
        var periodNumber = Math.floor((props.endTime-startPoint) / (props.delay+props.duration));
        
        // if ( isGrow == null ) { isGrow = time > this.prevTime; }
        this._complete( (this.o.yoyo && (periodNumber % 2 === 0)) ? 0 : 1 );
      }
      // // rest isFirstUpdate flag if update was out of active zone
      // if ( time > this.props.endTime ) { this.isFirstUpdate = false; }
      // // reset isFirstUpdateBackward flag if progress went further the end time
      // if ( time > this.props.endTime ) { this.isFirstUpdateBackward = false; }
    }
    
    // if was active and went to - unactive area
    if ( time < this.prevTime && time < this.props.startTime ) {

      // TODO: same for 1 progress
      // update progress to 0 only once
      if ( !this.isOnReverseComplete ) {
        this.setProgress(0);
        this._repeatStart();
        this.isOnReverseComplete = true;
      }

      // if (!this.isFirstUpdateBackward) {
      //   if (this.props.onFirstUpdateBackward != null && typeof this.props.onFirstUpdateBackward === 'function') {
      //     this.props.onFirstUpdateBackward.apply(this);
      //   }
      //   this.isFirstUpdateBackward = true;
      // }

      // isGrow indicates if actual parent time is growing.
      // Despite the fact that the time could be < previous time && <= startTime
      // it is actually grows. Tween could be added to a
      // Timeline, and the later will work with Tween's periods, feeding
      // 0 at the end of the period, because period % period === 0.
      // See 182 line of Timline's code for more info.
      // if (isGrow) {
      //   if (!this.isCompleted && this.prevTime < this.props.endTime ) {
      //     this._complete();
      //   }
      // } else if ( !this.isOnReverseComplete /* && this.isFirstUpdate */ ) {
      //   this.isOnReverseComplete = true;
      //   this.setProgress(0, !this.props.isChained);
      //   if (this.props.onReverseComplete != null && typeof this.props.onReverseComplete === 'function') {
      //     this.props.onReverseComplete.apply(this);
      //   }
      // }

      // this.isFirstUpdate = false;
    }

    this.prevTime = time;
    return this.isCompleted;
  }

  /*
    Method to set tween's state to complete
  */
  _complete(progress = 1) {
    this.setProgress(progress);
    this._repeatComplete();
    if (this.props.onComplete != null && typeof this.props.onComplete === 'function') {
      this.props.onComplete.apply(this);
    }
    this.isCompleted = true; this.isStarted = false;
    this.isOnReverseComplete = false;
  }

  /*
    Method call onRepeatComplete calback and set flags.
  */
  _repeatComplete() {
    if (this.isRepeatCompleted) { return; }
    if (this.props.onRepeatComplete != null && typeof this.props.onRepeatComplete === 'function') {
      this.props.onRepeatComplete.apply(this);
    }
    this.isRepeatCompleted = true;
  }

  /*
    Method call onRepeatStart calback and set flags.
  */
  _repeatStart() {
    if (this.isRepeatStart) { return; }
    if (this.props.onRepeatStart != null && typeof this.props.onRepeatStart === 'function') {
      this.props.onRepeatStart.apply(this);
    }
    this.isRepeatStart = true;
  }

  _updateInActiveArea(time) {
    // reset callback flags
    this.isOnReverseComplete = false; this.isCompleted = false;

    // We need to know what direction we are heading in with this tween,
    // so if we don't have the previous update value - this is very first
    // update, - skip it entirely and wait for the next value
    if ( this.prevTime === -1 ) {
      this.o.isIt && console.log(`=========`);
      this.o.isIt && console.log(`tween: SKIP`);
      return this._wasUknownUpdate = true;
    }

    if ( time === this.props.endTime ) {
      this._wasUknownUpdate = false;
      return this._complete();
    }

    var props         = this.props,
        delayDuration = props.delay + props.duration,
        startPoint    = props.startTime - props.delay,
        elapsed       = (time - props.startTime + props.delay) % delayDuration,
        TCount        = (props.endTime - props.startTime) / delayDuration,
        T             = this._getPeriod(time),
        TValue        = this._delayT,
        prevT         = this._getPeriod(this.prevTime),
        TPrevValue    = this._delayT;

    this.o.isIt && console.log(`=========`);
    this.o.isIt && console.log(`tween:`);
    this.o.isIt && console.log(`TCount: ${TCount}`);
    this.o.isIt && console.log(`time: ${time}, start: ${props.startTime}, end: ${props.endTime}`);
    this.o.isIt && console.log(`T: ${T}, prevT: ${prevT}, prevTime: ${this.prevTime}`);
    this.o.isIt && console.log(`TValue: ${TValue}, TPrevValue: ${TPrevValue}`);
    this.o.isIt && this._visualizeProgress(time);

    // if time is inside the duration area of the tween
    if ( startPoint + elapsed >= props.startTime ) {

      this.isRepeatCompleted = false;
      this.isRepeatStart = false;
      // active zone or larger then end
      var elapsed2 = ( time - props.startTime) % delayDuration;
      var proc = elapsed2 / props.duration;
      this.o.isIt && console.log(`proc: ${proc}, elapsed2: ${elapsed2}, elapsed: ${elapsed}`);
      
      // |=====|=====|=====| >>>
      //      ^1^2
      var isOnEdge = (T > 0) && (prevT < T);
      // |=====|=====|=====| <<<
      //      ^2^1
      var isOnReverseEdge = (prevT > T);

      // if not yoyo then set the plain progress
      if (!props.yoyo) {

          if ( this._wasUknownUpdate ) {
            if ( this.prevTime < time ) {
              this._repeatStart();
              this.setProgress(0);
            }

            if ( this.prevTime > time ) {
              this._repeatComplete();
              this.setProgress(1);
            }

          }

          if ( isOnEdge ) {
            // if not just after delay
            // |=====|---=====|---=====| >>>
            //         ^1 ^2
            // because we have already handled
            // 1 and onRepeatComplete in delay gap
            if (this.progress !== 1) {
              this.setProgress(1);
              this._repeatComplete();
            }
            // if on edge but not at very start
            // |=====|=====|=====| >>>
            // ^here           
            if ( prevT >= 0 ) {
              this._repeatStart();
              this.setProgress(0);
            }
          }

          if ( isOnReverseEdge ) {
            // if on edge but not at very end
            // |=====|=====|=====| <<<
            //                   ^not here        
            if (this.progress !== 0 && prevT != TCount) {
              this.setProgress(0);
              this._repeatStart();
            }
            this.setProgress(1);
            this._repeatComplete();
          }

          if ( prevT === 'delay') {
            // if just before delay gap
            // |---=====|---=====|---=====| >>>
            //               ^2    ^1
            if ( T < TPrevValue ) {
              this.setProgress(1);
              this._repeatComplete();
            }
            // if just after delay gap
            // |---=====|---=====|---=====| >>>
            //            ^1  ^2
            if ( T === TPrevValue ) {
              this._repeatStart();
              this.setProgress(0);
            }
          }

          if ( time !== props.endTime ) {
            this.setProgress(proc);
          }
          
          // if progress is equal 0 and progress grows
          if ( proc === 0 ) {
            this._repeatStart();
          }

      // yoyo
      } else {
        // var isEvenPeriod = (T % 2 === 0);
        // // set 1 or 0 on periods' edge
        // if ( isOnEdge ) {
        //   this.setProgress( (isEvenPeriod) ? 0 : 1 );
        //   this._repeatComplete();
        // }
        // // if yoyo then check if the current duration
        // // period is even. If so set progress, otherwise
        // // set inverted proc value
        // this.setProgress( (isEvenPeriod) ? proc : 1-proc );
      }
    // delay gap
    } else {
      this.isRepeatStart = false;
      this.o.isIt && console.log(`in the delay gap`);
      // if yoyo and even period we should flip
      // so set flipCoef to 1 if we need flip, otherwise to 0
      var flipCoef = (props.yoyo && (T % 2 === 0)) ? 1 : 0;
      // if flip is 0 - bitwise XOR will leave the numbers as is,
      // if flip is 1 - bitwise XOR will inverse the numbers
      this.setProgress( (this.prevTime < time) ? 1 ^ flipCoef : 0 ^ flipCoef );
      // if reverse direction and in delay gap, then progress will be 0
      // if so we don't need to call the onRepeatComplete callback
      // |=====|---=====|---=====| <<<
      //         ^here    ^here   
      if (this.progress !== 0) { this._repeatComplete(); }
    }
    this._wasUknownUpdate = false;
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
  play(time) {
    this.setStartTime(time);
    !time && (t.add(this)); // this.state = 'play'
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

  /*
    Method to get current period number
    @param {Number} Time to get the period for.
  */
  _getPeriod(time) {
    var p       = this.props,
        TTime   = p.delay + p.duration,
        dTime   = time - p.startTime + p.delay,
        T       = Math.floor( dTime / TTime ),
        elapsed = dTime % TTime;

    // if in delay gap, set _delayT to current
    // period number and return "delay"
    if ( elapsed > 0 && elapsed < p.delay ) {
      this._delayT = T; T = 'delay';
    }
    // if the end of period and there is a delay
    // if ( elapsed === 0 && T > 0 ) { T--; }
    return T;
  }

  _visualizeProgress(time) {
    var str = '|',
        procStr = ' ',
        p = this.props,
        proc = p.startTime - p.delay;

    while ( proc < p.endTime ) {
      if (p.delay > 0 ) {
        var newProc = proc + p.delay;
        if ( time > proc && time < newProc ) {
          procStr += ' ^ ';
        } else {
          procStr += '   ';
        }
        proc = newProc;
        str  += '---';
      }
      var newProc = proc + p.duration;
      if ( time > proc && time < newProc ) {
        procStr += '  ^   ';
      } else if (time === proc) {
        procStr += '^     ';
      } else if (time === newProc) {
        procStr += '    ^ ';
      } else {
        procStr += '      ';
      }
      proc = newProc;
      str += '=====|';
    }

    console.log(str);
    console.log(procStr);
  }
}

export default Tween;


