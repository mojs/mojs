// import h from '../h';
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _tweener = require('./tweener');

var _tweener2 = _interopRequireDefault(_tweener);

var _easingEasing = require('../easing/easing');

var _easingEasing2 = _interopRequireDefault(_easingEasing);

var Tween = (function () {
  _createClass(Tween, [{
    key: '_declareDefaults',

    /*
      Method do declare defaults with this._defaults object.
      @private
    */
    value: function _declareDefaults() {
      // DEFAULTS
      this._defaults = {
        /* duration of the tween [0..∞] */
        duration: 600,
        /* delay of the tween [-∞..∞] */
        delay: 0,
        /* repeat of the tween [0..∞], means how much to
           repeat the tween regardless first run,
           for instance repeat: 2 will make the tween run 3 times */
        repeat: 0,
        /* speed of playback [0..∞], speed that is less then 1
           will slowdown playback, for instance .5 will make tween
           run 2x slower. Speed of 2 will speedup the tween to 2x. */
        speed: 1,
        /*  flip onUpdate's progress on each even period.
            note that callbacks order won't flip at least
            for now (under consideration). */
        yoyo: false,
        /* easing for the tween, could be any easing type [link to easing-types.md] */
        easing: 'Linear.None',
        /* custom tween's name */
        name: null,
        /* custom tween's base name */
        nameBase: 'Tween',
        /*
          onProgress callback runs before any other callback.
          @param {Number}   The entire, not eased, progress
                            of the tween regarding repeat option.
          @param {Boolean}  The direction of the tween.
                            `true` for forward direction.
                            `false` for backward direction(tween runs in reverse).
        */
        onProgress: null,
        /*
          onStart callback runs on very start of the tween just after onProgress
          one. Runs on very end of the tween if tween is reversed.
          @param {Boolean}  Direction of the tween.
                            `true` for forward direction.
                            `false` for backward direction(tween runs in reverse).
        */
        onStart: null,
        onComplete: null,
        onRepeatStart: null,
        onRepeatComplete: null,
        onFirstUpdate: null,
        onUpdate: null,
        isChained: false
      };
    }

    /*
      API method to run the Tween.
      @public
      @param  {Number} Shift time in milliseconds.
      @return {Object} Self.
    */
  }, {
    key: 'play',
    value: function play() {
      var shift = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      if (this._state === 'play' && this._isRunning) {
        return false;
      }
      this._props.isReversed = false;
      this._subPlay(shift, 'play');
      this._setPlaybackState('play');
      return this;
    }

    /*
      API method to run the Tween in reverse.
      @public
      @param  {Number} Shift time in milliseconds.
      @return {Object} Self.
    */
  }, {
    key: 'playBackward',
    value: function playBackward() {
      var shift = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      if (this._state === 'reverse' && this._isRunning) {
        return false;
      }
      this._props.isReversed = true;
      this._subPlay(shift, 'reverse');
      this._setPlaybackState('reverse');
      // reset previous time cache
      return this;
    }

    /*
      API method to stop the Tween.
      @public
      @param   {Number} Progress [0..1] to set when stopped.
      @returns {Object} Self.
    */
  }, {
    key: 'stop',
    value: function stop(progress) {
      if (this._state === 'stop') {
        return;
      }
      this._props.isReversed = false;
      this._removeFromTweener();
      // if progress passed - use it
      var stopProc = progress != null ? progress
      /* if no progress passsed - set 1 if tween
         is playingBackward, otherwise set to 0 */
      : this._state === 'reverse' ? 1 : 0;
      this.setProgress(stopProc);
      this._setPlaybackState('stop');
      this._prevTime = null;
      return this;
    }

    /*
      API method to pause Tween.
      @public
      @returns {Object} Self.
    */
  }, {
    key: 'pause',
    value: function pause() {
      this._removeFromTweener();
      this._setPlaybackState('pause');
      return this;
    }

    /*
      API method to set total progress on timeline.
      @public
      @param {Number} Progress to set.
      @returns {Object} Self.
    */
  }, {
    key: 'setProgress',
    value: function setProgress(progress) {
      var p = this._props;
      // set start time if there is no one yet.
      !p.startTime && this._setStartTime();
      // reset play time
      this._playTime = null;
      // progress should be in range of [0..1]
      progress < 0 && (progress = 0);
      progress > 1 && (progress = 1);
      // update self with calculated time
      this._update(p.startTime - p.delay + progress * p.repeatTime);
      return this;
    }

    /*
      API ^
      PRIVATE METHODS v
    */

    /*
      Method to launch play. Used as launch
      method for bothplay and reverse methods.
      @private
      @param  {Number} Shift time in milliseconds.
      @param  {String} Play or reverse state.
      @return {Object} Self.
    */
  }, {
    key: '_subPlay',
    value: function _subPlay(shift, state) {
      if (shift === undefined) shift = 0;

      var resumeTime,
          startTime,
          p = this._props,

      // check if direction of playback changes,
      // if so, the _progressTime needs to be flipped
      _state = this._state,
          _prevState = this._prevState,
          isPause = _state === 'pause',
          wasPlay = _state === 'play' || isPause && _prevState === 'play',
          wasReverse = _state === 'reverse' || isPause && _prevState === 'reverse',
          isFlip = wasPlay && state === 'reverse' || wasReverse && state === 'play';

      // if tween was ended, set progress to 0 if not, set to elapsed progress
      this._progressTime = this._progressTime >= p.repeatTime ? 0 : this._progressTime;
      // flip the _progressTime if playback direction changed
      if (isFlip) {
        this._progressTime = p.repeatTime - this._progressTime;
      }
      // get current moment as resume time
      this._resumeTime = performance.now();
      // set start time regarding passed `shift` and `procTime`
      this._setStartTime(this._resumeTime - Math.abs(shift) - this._progressTime, false, state);
      // if we have prevTime - we need to normalize
      // it for the current resume time
      if (this._prevTime != null) {
        this._prevTime = state === 'play' ? this._normPrevTimeForward() : p.endTime - this._progressTime;
      }
      // add self to tweener = play
      _tweener2['default'].add(this);
      return this;
    }

    /*
      Method recalculate _prevTime for forward direction.
      @private
      @return {Number} Normalized prev time.
    */

  }, {
    key: '_normPrevTimeForward',
    value: function _normPrevTimeForward() {
      var p = this._props;return p.startTime + this._progressTime - p.delay;
    }

    /*
      Constructor of the class.
      @private
    */
  }]);

  function Tween() {
    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Tween);

    // console.log('tween constructor');
    this.o = o;
    this._declareDefaults();this._extendDefaults();this._vars();
    this._props.name == null && this._setSelfName();
    return this;
  }

  /*
    Method to set self name to generic one.
    @private
  */

  _createClass(Tween, [{
    key: '_setSelfName',
    value: function _setSelfName() {
      var globalName = '_' + this._props.nameBase + 's';
      // track amount of tweens globally
      _tweener2['default'][globalName] = _tweener2['default'][globalName] == null ? 1 : ++_tweener2['default'][globalName];
      // and set generic tween's name  || Tween # ||
      this._props.name = this._props.nameBase + ' ' + _tweener2['default'][globalName];
    }

    /*
      Method set playback state string.
      @private
      @param {String} State name
    */
  }, {
    key: '_setPlaybackState',
    value: function _setPlaybackState(state) {
      // save previous state
      this._prevState = this._state;
      this._state = state;
    }

    /*
      Method to declare some vars.
      @private
    */
  }, {
    key: '_vars',
    value: function _vars() {
      this.progress = 0;
      this._prevTime = null;
      this._progressTime = 0;
      this._negativeShift = 0;
      this._state = 'stop';
      // if negative delay was specified,
      // save it to _negativeShift property and
      // reset it back to 0
      if (this._props.delay < 0) {
        this._negativeShift = this._props.delay;
        this._props.delay = 0;
      }

      return this._calcDimentions();
    }

    /*
      Method to calculate tween's dimentions.
      @private
    */
  }, {
    key: '_calcDimentions',
    value: function _calcDimentions() {
      this._props.time = this._props.duration + this._props.delay;
      this._props.repeatTime = this._props.time * (this._props.repeat + 1);
    }

    /*
      Method to extend defaults by options and put them in _props.
      @private
    */
  }, {
    key: '_extendDefaults',
    value: function _extendDefaults() {
      this._props = {};
      for (var key in this._defaults) {
        // borrow hasOwnProperty function
        if (Object.hasOwnProperty.call(this._defaults, key)) {
          var value = this._defaults[key];
          this._props[key] = this.o[key] != null ? this.o[key] : value;
        }
      }
      this._props.easing = _easingEasing2['default'].parseEasing(this.o.easing || this._defaults.easing);
      this.onUpdate = this._props.onUpdate;
    }

    /*
      Method for setting start and end time to props.
      @private
      @param {Number(Timestamp)}, {Null} Start time.
      @param {Boolean} Should reset flags.
      @returns this
    */
  }, {
    key: '_setStartTime',
    value: function _setStartTime(time) {
      var isResetFlags = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var p = this._props,
          shiftTime = p.shiftTime || 0;
      // reset flags
      if (isResetFlags) {
        this._isCompleted = false;this._isRepeatCompleted = false;
        this._isStarted = false;
      }
      // set start time to passed time or to the current moment
      var startTime = time == null ? performance.now() : time;
      // calculate bounds
      // - negativeShift is negative delay in options hash
      // - shift time is shift of the parent
      p.startTime = startTime + p.delay + this._negativeShift + shiftTime;
      p.endTime = p.startTime + p.repeatTime - p.delay;
      // set play time to the startTime
      // if playback controls are used - use _resumeTime as play time, else use startTime
      this._playTime = this._resumeTime != null ? this._resumeTime : startTime;
      this._resumeTime = null;

      return this;
    }

    /*
      Method to update tween's progress.
      @private
      @param {Number} Current update time.
      -- next params only present when parent Timeline calls the method.
      @param {Number} Previous Timeline's update time.
      @param {Boolean} Was parent in yoyo period.
      @param {Number} [-1, 0, 1] If update is on edge.
                     -1 = edge jump in negative direction.
                      0 = no edge jump.
                      1 = edge jump in positive direction.
    */
  }, {
    key: '_update',
    value: function _update(time, timelinePrevTime, wasYoyo, onEdge) {
      var p = this._props;
      // if we don't the _prevTime thus the direction we are heading to,
      // but prevTime was passed thus we are child of a Timeline
      // set _prevTime to passed one and pretent that there was unknown
      // update to not to block start/complete callbacks
      if (this._prevTime == null && timelinePrevTime != null) {
        this._prevTime = timelinePrevTime;
        this._wasUknownUpdate = true;
      }

      // cache vars
      var startPoint = p.startTime - p.delay;
      // if speed param was defined - calculate
      // new time regarding speed
      if (p.speed && this._playTime) {
        // play point + ( speed * delta )
        time = this._playTime + p.speed * (time - this._playTime);
      }

      // // if end time(with precision issue fix)
      // // and already completed then return immediately
      // var isEnded = Math.abs(time - this._props.endTime) < .000000000001;
      // if ( isEnded && ( time < this._prevTime ) && ( this._isCompleted || this._isStarted ) ) { return; }

      // if parent is onEdge but not very start nor very end
      if (onEdge && wasYoyo != null) {
        var T = this._getPeriod(time),
            isYoyo = !!(p.yoyo && this._props.repeat && T % 2 === 1);
        // forward edge direction
        if (onEdge === 1) {
          // jumped from yoyo period?
          if (wasYoyo) {
            this._prevTime = time + 1;
            this._repeatStart(time, isYoyo);
            this._start(time, isYoyo);
          } else {
            this._prevTime = time - 1;
            this._repeatComplete(time, isYoyo);
            this._complete(time, isYoyo);
          }
          // backward edge direction
        } else if (onEdge === -1) {
            // jumped from yoyo period?
            if (wasYoyo) {
              this._prevTime = time - 1;
              this._repeatComplete(time, isYoyo);
              this._complete(time, isYoyo);
            } else {
              this._prevTime = time + 1;
              this._repeatStart(time, isYoyo);
              this._start(time, isYoyo);
            }
          }
        // reset the _prevTime === drop one frame to undestand
        // where we are heading
        this._prevTime = null;
      }
      // if in active area and not ended - save progress time
      // for pause/play purposes.
      if (time > startPoint && time < p.endTime) {
        this._progressTime = time - startPoint;
      }
      // else if not started or ended set progress time to 0
      else if (time <= startPoint) {
          this._progressTime = 0;
        } else if (time >= p.endTime) {
          // set progress time to repeat time + tiny cofficient
          // to make it extend further than the end time
          this._progressTime = p.repeatTime + .00000000001;
        }
      // reverse time if _props.isReversed is set
      if (p.isReversed) {
        time = p.endTime - this._progressTime;
      }
      // We need to know what direction we are heading to,
      // so if we don't have the previous update value - this is very first
      // update, - skip it entirely and wait for the next value
      if (this._prevTime === null) {
        this._prevTime = time;
        this._wasUknownUpdate = true;
        return false;
      }

      // this._visualizeProgress(time);

      // ====== AFTER SKIPPED FRAME ======

      // handle onProgress callback
      if (time >= startPoint && time <= p.endTime) {
        this._progress((time - startPoint) / p.repeatTime, time);
      }
      /*
        if time is inside the active area of the tween.
        active area is the area from start time to end time,
        with all the repeat and delays in it
      */
      if (time >= p.startTime && time <= p.endTime) {
        this._updateInActiveArea(time);
      } else {
        this._isInActiveArea && this._updateInInactiveArea(time);
      }
      this._prevTime = time;
      return time >= p.endTime || time <= startPoint;
    }

    /*
      Method to handle tween's progress in inactive area.
      @private
      @param {Number} Current update time.
    */
  }, {
    key: '_updateInInactiveArea',
    value: function _updateInInactiveArea(time) {
      if (!this._isInActiveArea) {
        return;
      }
      var p = this._props;

      // complete if time is larger then end time
      if (time > p.endTime && !this._isCompleted) {
        this._progress(1, time);
        // get period number
        var T = this._getPeriod(p.endTime),
            isYoyo = p.yoyo && T % 2 === 0;

        this._setProgress(isYoyo ? 0 : 1, time, isYoyo);
        this._repeatComplete(time, isYoyo);
        this._complete(time, isYoyo);
      }
      // if was active and went to - inactive area "-"
      if (time < this._prevTime && time < p.startTime && !this._isStarted) {
        // if was in active area and didn't fire onStart callback
        this._progress(0, time, false);
        this._setProgress(0, time, false);
        this._isRepeatStart = false;
        this._repeatStart(time, false);
        this._start(time, false);
      }
      this._isInActiveArea = false;
    }

    /*
      Method to handle tween's progress in active area.
      @private
      @param {Number} Current update time.
    */
  }, {
    key: '_updateInActiveArea',
    value: function _updateInActiveArea(time) {

      var props = this._props,
          delayDuration = props.delay + props.duration,
          startPoint = props.startTime - props.delay,
          elapsed = (time - props.startTime + props.delay) % delayDuration,
          TCount = Math.round((props.endTime - props.startTime + props.delay) / delayDuration),
          T = this._getPeriod(time),
          TValue = this._delayT,
          prevT = this._getPeriod(this._prevTime),
          TPrevValue = this._delayT;

      // "zero" and "one" value regarding yoyo and it's period
      var isYoyo = props.yoyo && T % 2 === 1,
          isYoyoPrev = props.yoyo && prevT % 2 === 1,
          yoyoZero = isYoyo ? 1 : 0,
          yoyoOne = 1 - yoyoZero;

      if (time === this._props.endTime) {
        this._wasUknownUpdate = false;
        // if `time` is equal to `endTime`, T represents the next period,
        // so we need to decrement T and calculate "one" value regarding yoyo
        var isYoyo = props.yoyo && (T - 1) % 2 === 1;
        this._setProgress(isYoyo ? 0 : 1, time, isYoyo);
        if (time > this._prevTime) {
          this._isRepeatCompleted = false;
        }
        this._repeatComplete(time, isYoyo);
        return this._complete(time, isYoyo);
      }

      // reset callback flags
      this._isCompleted = false;
      // if time is inside the duration area of the tween
      if (startPoint + elapsed >= props.startTime) {
        this._isInActiveArea = true;this._isRepeatCompleted = false;
        this._isRepeatStart = false;this._isStarted = false;
        // active zone or larger then end
        var elapsed2 = (time - props.startTime) % delayDuration,
            proc = elapsed2 / props.duration;
        // |=====|=====|=====| >>>
        //      ^1^2
        var isOnEdge = T > 0 && prevT < T;
        // |=====|=====|=====| <<<
        //      ^2^1
        var isOnReverseEdge = prevT > T;

        // for use in timeline
        this._onEdge = 0;
        isOnEdge && (this._onEdge = 1);
        isOnReverseEdge && (this._onEdge = -1);

        if (this._wasUknownUpdate) {
          if (time > this._prevTime) {
            this._start(time, isYoyo);
            this._repeatStart(time, isYoyo);
            this._firstUpdate(time, isYoyo);
          }
          if (time < this._prevTime) {
            this._complete(time, isYoyo);
            this._repeatComplete(time, isYoyo);
            this._firstUpdate(time, isYoyo);
            // reset isCompleted immediately
            this._isCompleted = false;
          }
        }

        if (isOnEdge) {
          // if not just after delay
          // |---=====|---=====|---=====| >>>
          //            ^1 ^2
          // because we have already handled
          // 1 and onRepeatComplete in delay gap
          if (this.progress !== 1) {
            // prevT
            var isThisYoyo = props.yoyo && (T - 1) % 2 === 1;
            this._repeatComplete(time, isThisYoyo);
          }
          // if on edge but not at very start
          // |=====|=====|=====| >>>
          // ^!    ^here ^here
          if (prevT >= 0) {
            this._repeatStart(time, isYoyo);
          }
        }

        if (time > this._prevTime) {
          //  |=====|=====|=====| >>>
          // ^1  ^2
          if (!this._isStarted && this._prevTime <= props.startTime) {
            this._start(time, isYoyo);
            this._repeatStart(time, isYoyo);
            // it was zero anyways

            // restart flags immediately in case if we will
            // return to '-' inactive area on the next step
            this._isStarted = false;
            this._isRepeatStart = false;
          }
          this._firstUpdate(time, isYoyo);
        }

        if (isOnReverseEdge) {
          // if on edge but not at very end
          // |=====|=====|=====| <<<
          //       ^here ^here ^not here
          if (this.progress !== 0 && this.progress !== 1 && prevT != TCount) {
            this._repeatStart(time, isYoyoPrev);
          }
          // if on very end edge
          // |=====|=====|=====| <<<
          //       ^!    ^! ^2 ^1
          // we have handled the case in this._wasUknownUpdate
          // block so filter that
          if (prevT === TCount && !this._wasUknownUpdate) {
            this._complete(time, isYoyo);
            this._repeatComplete(time, isYoyo);
            this._firstUpdate(time, isYoyo);
            // reset isComplete flag call
            // cuz we returned to active area
            // this._isRepeatCompleted = false;
            this._isCompleted = false;
          }
          this._repeatComplete(time, isYoyo);
        }

        if (prevT === 'delay') {
          // if just before delay gap
          // |---=====|---=====|---=====| <<<
          //               ^2    ^1
          if (T < TPrevValue) {
            this._repeatComplete(time, isYoyo);
          }
          // if just after delay gap
          // |---=====|---=====|---=====| >>>
          //            ^1  ^2
          if (T === TPrevValue && T > 0) {
            this._repeatStart(time, isYoyo);
          }
        }

        // swap progress and repeatStart based on direction
        if (time > this._prevTime) {
          // if progress is equal 0 and progress grows
          if (proc === 0) {
            this._repeatStart(time, isYoyo);
          }
          if (time !== props.endTime) {
            this._setProgress(isYoyo ? 1 - proc : proc, time, isYoyo);
          }
        } else {
          if (time !== props.endTime) {
            this._setProgress(isYoyo ? 1 - proc : proc, time, isYoyo);
          }
          // if progress is equal 0 and progress grows
          if (proc === 0) {
            this._repeatStart(time, isYoyo);
          }
        }

        if (time === props.startTime) {
          this._start(time, isYoyo);
        }
        // delay gap - react only once
      } else if (this._isInActiveArea) {
          // because T will be string of "delay" here,
          // let's normalize it be setting to TValue
          var t = T === 'delay' ? TValue : T,
              isGrows = time > this._prevTime;
          // decrement period if forward direction of update
          isGrows && t--;
          // calculate normalized yoyoZero value
          yoyoZero = props.yoyo && t % 2 === 1 ? 1 : 0;
          // if was in active area and previous time was larger
          // |---=====|---=====|---=====| <<<
          //   ^2 ^1    ^2 ^1    ^2 ^1
          if (time < this._prevTime) {
            this._setProgress(yoyoZero, time, yoyoZero === 1);
            this._repeatStart(time, yoyoZero === 1);
          }
          // set 1 or 0 regarding direction and yoyo
          this._setProgress(isGrows ? 1 - yoyoZero : yoyoZero, time, yoyoZero === 1);
          // if time grows
          if (time > this._prevTime) {
            // if reverse direction and in delay gap, then progress will be 0
            // if so we don't need to call the onRepeatComplete callback
            // |---=====|---=====|---=====| <<<
            //   ^0       ^0       ^0  
            // OR we have flipped 0 to 1 regarding yoyo option
            if (this.progress !== 0 || yoyoZero === 1) {
              // since we repeatComplete for previous period
              // invert isYoyo option
              // is elapsed is 0 - count as previous period
              this._repeatComplete(time, yoyoZero === 1);
            }
          }
          // set flag to indicate inactive area
          this._isInActiveArea = false;
        }
      // we've got the first update now
      this._wasUknownUpdate = false;
    }

    /*
      Method to set property[s] on Tween
      @private
      @param {Object, String} Hash object of key/value pairs, or property name
      @param {_} Property's value to set
    */
  }, {
    key: '_setProp',
    value: function _setProp(obj, value) {
      // handle hash object case
      if (typeof obj === 'object') {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            this._props[key] = obj[key];
            if (key === 'easing') {
              this._props.easing = _easingEasing2['default'].parseEasing(this._props.easing);
            }
          }
        }
        // handle key, value case
      } else if (typeof obj === 'string') {
          // if key is easing - parse it immediately
          if (obj === 'easing') {
            this._props.easing = _easingEasing2['default'].parseEasing(value);
          }
          // else just save it to props
          else {
              this._props[obj] = value;
            }
        }
      this._calcDimentions();
    }

    /*
      Method to remove the Tween from the tweener.
      @private
      @returns {Object} Self.
    */
  }, {
    key: '_removeFromTweener',
    value: function _removeFromTweener() {
      _tweener2['default'].remove(this);return this;
    }

    /*
      Method to get current period number.
      @private
      @param {Number} Time to get the period for.
      @returns {Number} Current period number.
    */
  }, {
    key: '_getPeriod',
    value: function _getPeriod(time) {
      var p = this._props,
          TTime = p.delay + p.duration,
          dTime = p.delay + time - p.startTime,
          T = dTime / TTime,

      // if time if equal to endTime we need to set the elapsed
      // time to 0 to fix the occasional precision js bug, which
      // causes 0 to be something like 1e-12
      elapsed = time < p.endTime ? dTime % TTime : 0;
      // If the latest period, round the result, otherwise floor it.
      // Basically we always can floor the result, but because of js
      // precision issues, sometimes the result is 2.99999998 which
      // will result in 2 instead of 3 after the floor operation.
      T = time >= p.endTime ? Math.round(T) : Math.floor(T);
      // if time is larger then the end time
      if (time > p.endTime) {
        // set equal to the periods count
        T = Math.round((p.endTime - p.startTime + p.delay) / TTime);
        // if in delay gap, set _delayT to current
        // period number and return "delay"
      } else if (elapsed > 0 && elapsed < p.delay) {
          this._delayT = T;T = 'delay';
        }
      // if the end of period and there is a delay
      return T;
    }

    /*
      Method to set Tween's progress and call onUpdate callback.
      @private
      @param {Number} Progress to set.
      @param {Number} Current update time.
      @param {Boolean} Is yoyo perido. Used in Timeline to pass to Tween.
      @returns {Object} Self.
    */
  }, {
    key: '_setProgress',
    value: function _setProgress(p, time, isYoyo) {
      var props = this._props,
          isYoyoChanged = props.wasYoyo !== isYoyo;
      this.progress = p;
      this.easedProgress = this._props.easing(this.progress);
      if (props.prevEasedProgress !== this.easedProgress || isYoyoChanged) {
        if (this.onUpdate != null && typeof this.onUpdate === 'function') {
          this.onUpdate(this.easedProgress, this.progress, time > this._prevTime, isYoyo);
        }
      }
      this._props.prevEasedProgress = this.easedProgress;
      this._props.wasYoyo = isYoyo;
      return this;
    }

    /*
      Method to set tween's state to start and call onStart callback.
      @method _start
      @private
      @param {Number} Progress to set.
      @param {Boolean} Is yoyo period.
    */
  }, {
    key: '_start',
    value: function _start(time, isYoyo) {
      if (this._isStarted) {
        return;
      }
      if (this._props.onStart != null && typeof this._props.onStart === 'function') {
        this._props.onStart.call(this, time > this._prevTime, isYoyo);
      }
      this._isCompleted = false;this._isStarted = true;
      this._isFirstUpdate = false;
    }

    /*
      Method to set tween's state to complete.
      @method _complete
      @private
      @param {Number} Current time.
      @param {Boolean} Is yoyo period.
    */
  }, {
    key: '_complete',
    value: function _complete(time, isYoyo) {
      if (this._isCompleted) {
        return;
      }
      if (this._props.onComplete != null && typeof this._props.onComplete === 'function') {
        this._props.onComplete.call(this, time > this._prevTime, isYoyo);
      }
      this._isCompleted = true;this._isStarted = false;
      this._isFirstUpdate = false;
    }

    /*
      Method to run onFirstUpdate callback.
      @method _firstUpdate
      @private
      @param {Number} Current update time.
      @param {Boolean} Is yoyo period.
    */
  }, {
    key: '_firstUpdate',
    value: function _firstUpdate(time, isYoyo) {
      if (this._isFirstUpdate) {
        return;
      }
      if (this._props.onFirstUpdate != null && typeof this._props.onFirstUpdate === 'function') {
        this._props.onFirstUpdate.call(this, time > this._prevTime, isYoyo);
      }
      this._isFirstUpdate = true;
    }

    /*
      Method call onRepeatComplete calback and set flags.
      @private
      @param {Number} Current update time.
      @param {Boolean} Is repeat period.
    */
  }, {
    key: '_repeatComplete',
    value: function _repeatComplete(time, isYoyo) {
      if (this._isRepeatCompleted) {
        return;
      }
      if (this._props.onRepeatComplete != null && typeof this._props.onRepeatComplete === 'function') {
        this._props.onRepeatComplete.call(this, time > this._prevTime, isYoyo);
      }
      this._isRepeatCompleted = true;
    }

    /*
      Method call onRepeatStart calback and set flags.
      @private
      @param {Number} Current update time.
      @param {Boolean} Is yoyo period.
    */
  }, {
    key: '_repeatStart',
    value: function _repeatStart(time, isYoyo) {
      if (this._isRepeatStart) {
        return;
      }
      if (this._props.onRepeatStart != null && typeof this._props.onRepeatStart === 'function') {
        this._props.onRepeatStart.call(this, time > this._prevTime, isYoyo);
      }
      this._isRepeatStart = true;
    }

    /*
      Method to launch onProgress callback.
      @method _progress
      @private
      @param {Number} Progress to set.
    */
  }, {
    key: '_progress',
    value: function _progress(progress, time) {
      if (this._props.onProgress != null && typeof this._props.onProgress === 'function') {
        this._props.onProgress.call(this, progress, time > this._prevTime);
      }
    }

    /*
      Method which is called when the tween is removed from tweener.
      @private
    */
  }, {
    key: '_onTweenerRemove',
    value: function _onTweenerRemove() {}

    /*
      Method which is called when the tween is removed
      from tweener when finished.
      @private
    */
  }, {
    key: '_onTweenerFinish',
    value: function _onTweenerFinish() {
      this._setPlaybackState('stop');
    }

    // _visualizeProgress(time) {
    //   var str = '|',
    //       procStr = ' ',
    //       p = this._props,
    //       proc = p.startTime - p.delay;

    //   while ( proc < p.endTime ) {
    //     if (p.delay > 0 ) {
    //       var newProc = proc + p.delay;
    //       if ( time > proc && time < newProc ) {
    //         procStr += ' ^ ';
    //       } else {
    //         procStr += '   ';
    //       }
    //       proc = newProc;
    //       str  += '---';
    //     }
    //     var newProc = proc + p.duration;
    //     if ( time > proc && time < newProc ) {
    //       procStr += '  ^   ';
    //     } else if (time === proc) {
    //       procStr += '^     ';
    //     } else if (time === newProc) {
    //       procStr += '    ^ ';
    //     } else {
    //       procStr += '      ';
    //     }
    //     proc = newProc;
    //     str += '=====|';
    //   }

    //   console.log(str);
    //   console.log(procStr);
    // }
  }]);

  return Tween;
})();

exports['default'] = Tween;
module.exports = exports['default'];