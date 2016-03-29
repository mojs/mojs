/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(57);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71);
	__webpack_require__(72);
	module.exports = __webpack_require__(65).Symbol;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(27);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(22);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(20);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _h = __webpack_require__(16);

	var _h2 = _interopRequireDefault(_h);

	var _tweener = __webpack_require__(9);

	var _tweener2 = _interopRequireDefault(_tweener);

	var _easing = __webpack_require__(19);

	var _easing2 = _interopRequireDefault(_easing);

	var _module = __webpack_require__(13);

	var _module2 = _interopRequireDefault(_module);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import h from '../h';

	var Tween = function (_Module) {
	  (0, _inherits3.default)(Tween, _Module);
	  (0, _createClass3.default)(Tween, [{
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
	        isChained: false,
	        // context which all callbacks will be called with
	        callbacksContext: null
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
	      this._prevTime = null;
	      this._setPlaybackState('stop');
	      this._prevTime = null;
	      return this;
	    }
	    /*
	      API method to replay(restart) the Tween.
	      @public
	      @param   {Number} Shift time in milliseconds.
	      @returns {Object} Self.
	    */

	  }, {
	    key: 'replay',
	    value: function replay() {
	      var shift = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	      this.stop();
	      this.play(shift);
	      return this;
	    }
	    /*
	      API method to replay(restart) backward the Tween.
	      @public
	      @param   {Number} Shift time in milliseconds.
	      @returns {Object} Self.
	    */

	  }, {
	    key: 'replayBackward',
	    value: function replayBackward() {
	      var shift = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	      this.stop();
	      this.playBackward(shift);
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

	    // ^ PUBLIC  METHOD(S) ^
	    // v PRIVATE METHOD(S) v

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
	    value: function _subPlay() {
	      var shift = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var state = arguments[1];

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
	      _tweener2.default.add(this);
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
	    var _ret;

	    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Tween);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tween).call(this, o));

	    _this._props.name == null && _this._setSelfName();
	    return _ret = _this, (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	  /*
	    Method to set self name to generic one.
	    @private
	  */


	  (0, _createClass3.default)(Tween, [{
	    key: '_setSelfName',
	    value: function _setSelfName() {
	      var globalName = '_' + this._props.nameBase + 's';
	      // track amount of tweens globally
	      _tweener2.default[globalName] = _tweener2.default[globalName] == null ? 1 : ++_tweener2.default[globalName];
	      // and set generic tween's name  || Tween # ||
	      this._props.name = this._props.nameBase + ' ' + _tweener2.default[globalName];
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
	      // call _vars @ Module
	      // super._vars();
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
	      // save callback overrides object with fallback to empty one
	      this._callbackOverrides = this._o.callbackOverrides || {};
	      delete this._o.callbackOverrides;
	      // call the _extendDefaults @ Module
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Tween.prototype), '_extendDefaults', this).call(this);
	      this._props.easing = _easing2.default.parseEasing(this._props.easing);
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
	      // if playback controls are used - use _resumeTime as play time,
	      // else use shifted startTime -- shift is needed for timelines append chains
	      this._playTime = this._resumeTime != null ? this._resumeTime : startTime + shiftTime;
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
	      this._o.isIt && console.log('time: ' + time + ', timelinePrevTime: ' + timelinePrevTime + ', wasYoyo: ' + wasYoyo + ', onEdge: ' + onEdge + ' ');
	      var p = this._props;
	      // if we don't the _prevTime thus the direction we are heading to,
	      // but prevTime was passed thus we are child of a Timeline
	      // set _prevTime to passed one and pretent that there was unknown
	      // update to not to block start/complete callbacks
	      this._o.isIt && console.log('prevTime: ' + this._prevTime + ', timelinePrevTime: ' + timelinePrevTime);
	      if (this._prevTime == null && timelinePrevTime != null) {
	        this._o.isIt && console.log('setting the _prevTime to prevTime and _wasUknownUpdate');
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
	              // call _start callbacks only if prev time was in active area
	              // not always true for append chains
	              if (this._prevTime >= p.startTime && this._prevTime <= p.endTime) {
	                this._prevTime = time + 1;
	                this._repeatStart(time, isYoyo);
	                this._start(time, isYoyo);
	                // reset isCOmpleted immediately to prevent onComplete cb
	                this._isCompleted = true;
	              }
	            }
	          }
	        // reset the _prevTime - drop one frame to undestand
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
	        this._o.isIt && console.log('h3');
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
	        this._o.isIt && console.log('h4');
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
	            this._o.isIt && console.log('h6');
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
	      Method to remove the Tween from the tweener.
	      @private
	      @returns {Object} Self.
	    */

	  }, {
	    key: '_removeFromTweener',
	    value: function _removeFromTweener() {
	      _tweener2.default.remove(this);return this;
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
	      @override @ Module
	      @param {Number} Progress to set.
	      @param {Number} Current update time.
	      @param {Boolean} Is yoyo perido. Used in Timeline to pass to Tween.
	      @returns {Object} Self.
	    */

	  }, {
	    key: '_setProgress',
	    value: function _setProgress(proc, time, isYoyo) {
	      var p = this._props,
	          isYoyoChanged = p.wasYoyo !== isYoyo;
	      this.progress = proc;
	      this.easedProgress = p.easing(this.progress);
	      if (p.prevEasedProgress !== this.easedProgress || isYoyoChanged) {
	        if (p.onUpdate != null && typeof p.onUpdate === 'function') {
	          p.onUpdate.call(p.callbacksContext || this, this.easedProgress, this.progress, time > this._prevTime, isYoyo);
	        }
	      }
	      p.prevEasedProgress = this.easedProgress;
	      p.wasYoyo = isYoyo;
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
	      var p = this._props;
	      if (p.onStart != null && typeof p.onStart === 'function') {
	        p.onStart.call(p.callbacksContext || this, time > this._prevTime, isYoyo);
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
	      this._o.isIt && console.log('_complete!');
	      var p = this._props;
	      if (p.onComplete != null && typeof p.onComplete === 'function') {
	        p.onComplete.call(p.callbacksContext || this, time > this._prevTime, isYoyo);
	      }
	      this._isCompleted = true;this._isStarted = false;
	      this._isFirstUpdate = false;
	      // reset _prevYoyo for timeline usage
	      this._prevYoyo = undefined;
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
	      var p = this._props;
	      if (p.onFirstUpdate != null && typeof p.onFirstUpdate === 'function') {
	        // onFirstUpdate should have tween pointer
	        p.onFirstUpdate.tween = this;
	        p.onFirstUpdate.call(p.callbacksContext || this, time > this._prevTime, isYoyo);
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
	      var p = this._props;
	      if (p.onRepeatComplete != null && typeof p.onRepeatComplete === 'function') {
	        p.onRepeatComplete.call(p.callbacksContext || this, time > this._prevTime, isYoyo);
	      }
	      this._isRepeatCompleted = true;
	      // this._prevYoyo = null;
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
	      var p = this._props;
	      if (p.onRepeatStart != null && typeof p.onRepeatStart === 'function') {
	        p.onRepeatStart.call(p.callbacksContext || this, time > this._prevTime, isYoyo);
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
	      var p = this._props;
	      if (p.onProgress != null && typeof p.onProgress === 'function') {
	        p.onProgress.call(p.callbacksContext || this, progress, time > this._prevTime);
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
	    /*
	      Method to set property[s] on Tween.
	      @private
	      @override @ Module
	      @param {Object, String} Hash object of key/value pairs, or property name.
	      @param {_} Property's value to set.
	    */

	  }, {
	    key: '_setProp',
	    value: function _setProp(obj, value) {
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Tween.prototype), '_setProp', this).call(this, obj, value);
	      this._calcDimentions();
	    }
	    /*
	      Method to set single property.
	      @private
	      @override @ Module
	      @param {String} Name of the property.
	      @param {Any} Value for the property.
	    */

	  }, {
	    key: '_assignProp',
	    value: function _assignProp(key, value) {
	      // fallback to defaults
	      if (value == null) {
	        value = this._defaults[key];
	      }
	      // parse easing
	      key === 'easing' && (value = _easing2.default.parseEasing(value));
	      // handle control callbacks overrides
	      var control = this._callbackOverrides[key],
	          isntOverriden = !value || !value.isMojsCallbackOverride;
	      if (control && isntOverriden) {
	        value = this._overrideCallback(value, control);
	      }
	      // call super on Module
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Tween.prototype), '_assignProp', this).call(this, key, value);
	    }
	    /*
	      Method to override callback for controll pupropes.
	      @private
	      @param {String}    Callback name.
	      @parma {Function}  Method to call  
	    */

	  }, {
	    key: '_overrideCallback',
	    value: function _overrideCallback(callback, fun) {
	      var isCallback = callback && typeof callback === 'function',
	          override = function callbackOverride() {
	        // call overriden callback if it exists
	        isCallback && callback.apply(this, arguments);
	        // call the passed cleanup function
	        fun.apply(this, arguments);
	      };
	      // add overridden flag
	      override.isMojsCallbackOverride = true;
	      return override;
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
	}(_module2.default);

	exports.default = Tween;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toConsumableArray2 = __webpack_require__(25);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _keys = __webpack_require__(28);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(27);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(22);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(20);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _transit = __webpack_require__(4);

	var _transit2 = _interopRequireDefault(_transit);

	var _timeline = __webpack_require__(8);

	var _timeline2 = _interopRequireDefault(_timeline);

	var _swirl = __webpack_require__(5);

	var _swirl2 = _interopRequireDefault(_swirl);

	var _h = __webpack_require__(16);

	var _h2 = _interopRequireDefault(_h);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Burst = function (_Swirl) {
	  (0, _inherits3.default)(Burst, _Swirl);

	  function Burst() {
	    (0, _classCallCheck3.default)(this, Burst);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Burst).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Burst, [{
	    key: '_declareDefaults',

	    /*
	      Method to declare defaults.
	      @override @ Swirl.
	    */
	    value: function _declareDefaults() {
	      // call super @ Swirl
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Burst.prototype), '_declareDefaults', this).call(this);
	      // child defaults declaration
	      this._declareChildDefaults();

	      /* _DEFAULTS ARE - SWIRL DEFAULTS + THESE: */

	      /* :: [number > 0] :: Amount of Burst's points. */
	      this._defaults.count = 5;
	      /* :: [0 < number < 360] :: Degree of the Burst. */
	      this._defaults.degree = 360;
	      /* ∆ :: [number > 0] :: Degree for the Burst's points */
	      this._defaults.radius = { 5: 50 };

	      /* childOptions PROPERTIES ARE -
	        `Swirl` DEFAULTS + `Tween` DEFAULTS.
	        ONLY `isSwirl` option is `false` by default. */

	      // add options intersection hash - map that holds the property
	      // names that could be on both parent module and child ones,
	      // so setting one of those on parent, affect parent only
	      // this._optionsIntersection = {
	      //   radius: 1, radiusX: 1, radiusY: 1,
	      //   angle:  1, scale:   1, opacity: 1,
	      // }
	      // exclude unitTimeline object from deltas parsing
	      this._skipPropsDelta.unitTimeline = 1;
	    }
	    /*
	      Method to copy _o options to _props with fallback to _defaults.
	      @private
	      @override @ Swirl
	    */

	  }, {
	    key: '_extendDefaults',
	    value: function _extendDefaults() {
	      // call super extendDefaults on Swirl
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Burst.prototype), '_extendDefaults', this).call(this);
	      // calc size immedietely, the Swirls' options rely on size
	      this._calcSize();
	    }
	    /*
	      Method to declare `childDefaults` for `childOptions` object.
	      @private
	    */

	  }, {
	    key: '_declareChildDefaults',
	    value: function _declareChildDefaults() {
	      /* CHILD DEFAULTS - SWIRL's DEFAULTS WITH ADDITIONS*/
	      // copy the defaults to the childDefaults property
	      this._childDefaults = _h2.default.cloneObj(this._defaults);
	      // [boolean] :: If shape should follow sinusoidal path.
	      this._childDefaults.isSwirl = false;
	      // copy tween options and callbacks
	      for (var key in _h2.default.tweenOptionMap) {
	        this._childDefaults[key] = null;
	      }
	      for (var key in _h2.default.callbacksMap) {
	        this._childDefaults[key] = null;
	      }
	    }
	    /*
	      Method to create child transits.
	      @private
	      @override Transit
	    */

	  }, {
	    key: '_createBit',
	    value: function _createBit() {
	      this._swirls = [];
	      for (var index = 0; index < this._props.count; index++) {
	        this._swirls.push(new _swirl2.default(this._getOption(index)));
	      }
	    }
	    /*
	      Method to calculate option for specific transit.
	      @private
	      @param {Number} Index of the swirl.
	    */

	  }, {
	    key: '_getOption',
	    value: function _getOption(i) {
	      var option = {};

	      for (var key in this._childDefaults) {
	        // this is priorty for the property lookup
	        // firstly try to find the prop in this._o.childOptions
	        var prop = this._getPropByMod(key, i, this._o.childOptions);
	        // lastly fallback to defaults
	        prop = prop == null ? this._getPropByMod(key, i, this._childDefaults) : prop;
	        // parse `stagger` and `rand` values if needed
	        option[key] = _h2.default.parseStringOption(prop, i);
	      }

	      return this._addOptionalProperties(option, i);
	    }
	    /*
	      Method to add optional Swirls' properties to passed object.
	      @private
	      @param {Object} Object to add the properties to.
	      @param {Number} Index of the property.
	    */

	  }, {
	    key: '_addOptionalProperties',
	    value: function _addOptionalProperties(options, index) {
	      options.index = index;
	      options.left = '50%';
	      options.top = '50%';
	      options.parent = this.el;
	      options.isTimelineLess = true;
	      // option.callbacksContext = this;  ?

	      var p = this._props,
	          points = p.count,
	          degreeCnt = p.degree % 360 === 0 ? points : points - 1 || 1,
	          step = p.degree / degreeCnt,
	          pointStart = this._getSidePoint('start', index * step),
	          pointEnd = this._getSidePoint('end', index * step);

	      options.x = this._getDeltaFromPoints('x', pointStart, pointEnd);
	      options.y = this._getDeltaFromPoints('y', pointStart, pointEnd);
	      options.angle = this._getBitAngle(options.angle, index);

	      return options;
	    }
	    /* 
	      Method to get transits angle in burst so
	      it will follow circular shape.
	       
	       @param    {Number, Object} Base angle.
	       @param    {Number}         Transit's index in burst.
	       @returns  {Number}         Angle in burst.
	    */

	  }, {
	    key: '_getBitAngle',
	    value: function _getBitAngle(angleProperty, i) {
	      var p = this._props,
	          degCnt = p.degree % 360 === 0 ? p.count : p.count - 1 || 1,
	          step = p.degree / degCnt,
	          angle = i * step + 90;
	      // if not delta option
	      if (!this._isDelta(angleProperty)) {
	        angleProperty += angle;
	      } else {
	        var delta = {},
	            keys = (0, _keys2.default)(angleProperty),
	            start = keys[0],
	            end = angleProperty[start];

	        start = _h2.default.parseStringOption(start, i);
	        end = _h2.default.parseStringOption(end, i);
	        // new start = newEnd
	        delta[parseFloat(start) + angle] = parseFloat(end) + angle;

	        angleProperty = delta;
	      }
	      return angleProperty;
	    }
	    /*
	      Method to get radial point on `start` or `end`.
	      @private
	      @param {String} Name of the side - [start, end].
	      @param {Number} Angle of the radial point.
	      @returns radial point.
	    */

	  }, {
	    key: '_getSidePoint',
	    value: function _getSidePoint(side, angle) {
	      var p = this._props,
	          sideRadius = this._getSideRadius(side);

	      return _h2.default.getRadialPoint({
	        radius: sideRadius.radius,
	        radiusX: sideRadius.radiusX,
	        radiusY: sideRadius.radiusY,
	        angle: angle,
	        center: { x: p.center, y: p.center }
	      });
	    }
	    /*
	      Method to get radius of the side.
	      @private
	      @param {String} Name of the side - [start, end].
	      @returns {Object} Radius.
	    */

	  }, {
	    key: '_getSideRadius',
	    value: function _getSideRadius(side) {
	      return {
	        radius: this._getRadiusByKey('radius', side),
	        radiusX: this._getRadiusByKey('radiusX', side),
	        radiusY: this._getRadiusByKey('radiusY', side)
	      };
	    }
	    /*
	      Method to get radius from ∆ or plain property.
	      @private
	      @param {String} Key name.
	      @param {String} Side name - [start, end].
	    */

	  }, {
	    key: '_getRadiusByKey',
	    value: function _getRadiusByKey(key, side) {
	      if (this._deltas[key] != null) {
	        return this._deltas[key][side];
	      } else if (this._props[key] != null) {
	        return this._props[key];
	      }
	    }
	    /*
	      Method to get delta from start and end position points.
	      @private
	      @param {String} Key name.
	      @param {Object} Start position point.
	      @param {Object} End position point.
	      @returns {Object} Delta of the end/start.
	    */

	  }, {
	    key: '_getDeltaFromPoints',
	    value: function _getDeltaFromPoints(key, pointStart, pointEnd) {
	      var delta = {};
	      if (pointStart[key] === pointEnd[key]) {
	        delta = pointStart[key];
	      } else {
	        delta[pointStart[key]] = pointEnd[key];
	      }
	      return delta;
	    }
	    /*
	      Method to get property by modulus.
	      @private
	      @param {String} Name of the property.
	      @param {Number} Index for the modulus.
	      @param {Object} Source object to check in.
	      @returns {Any} Property.
	    */

	  }, {
	    key: '_getPropByMod',
	    value: function _getPropByMod(name, index) {
	      var sourceObj = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      var prop = sourceObj[name];
	      return _h2.default.isArray(prop) ? prop[index % prop.length] : prop;
	    }
	    /*
	      Method to draw self DIV element.
	      @private
	      @override @ Transit
	    */

	  }, {
	    key: '_draw',
	    value: function _draw() {
	      this._drawEl();
	    }
	    /*
	      Method to calculate maximum size of element.
	      @private
	      @override @ Transit
	    */

	  }, {
	    key: '_calcSize',
	    value: function _calcSize() {
	      var p = this._props;
	      p.size = p.size == null ? 2 : p.size;
	      p.center = p.size / 2;
	    }
	    /*
	      Method to setup  timeline options before creating the Timeline instance.
	      @override @ Transit
	      @private
	    */

	  }, {
	    key: '_transformTweenOptions',
	    value: function _transformTweenOptions() {
	      this._o.unitTimeline = this._o.unitTimeline || {};
	      this._o.unitTimeline.callbacksContext = this;
	      this._applyCallbackOverrides(this._o.unitTimeline);
	    }
	    /*
	      Method to create timeline.
	      @private
	      @override @ Tweenable
	      @param {Object} Timeline's options.
	                      An object which contains "timeline" property with
	                      timeline options.
	    */

	  }, {
	    key: '_makeTimeline',
	    value: function _makeTimeline() {
	      var _unitTimeline;

	      // create unit Timeline to controll all Swirls
	      this.unitTimeline = new _timeline2.default(this._o.unitTimeline);
	      (_unitTimeline = this.unitTimeline).add.apply(_unitTimeline, (0, _toConsumableArray3.default)(this._swirls));
	      // if isTimelineLess wasn't passed to the module - we need
	      // to create Master Timeline in case we will have `then` chain,-
	      // the master will control all the unitTimelines of the chain.
	      if (!this._o.wasTimelineLess) {
	        (0, _get3.default)((0, _getPrototypeOf2.default)(Burst.prototype), '_makeTimeline', this).call(this);
	        this.timeline.add(this.unitTimeline);
	        // otherwise set the timeline property to the unitTimeline,
	        // this will allow to `.append( )` this module to master timeline
	        // automatically in the `Thenable.then` method.
	      } else {
	          this.timeline = this.unitTimeline;
	        }
	      // reset the timeline and unitTimeline options objects.
	      this._o.timeline = null;
	      // this._o.unitTimeline = undefined;
	    }
	    /*
	      Method to make Tween for the module.
	      @private
	      @override @ Tweenable
	    */

	  }, {
	    key: '_makeTween',
	    value: function _makeTween() {} /* don't create any tween */
	    /*
	      Method to tune new history options to all the submodules.
	      @private
	      @override @ Tunable
	    */

	  }, {
	    key: '_tuneSubModules',
	    value: function _tuneSubModules() {
	      // call _tuneSubModules on Tunable
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Burst.prototype), '_tuneSubModules', this).call(this);
	      // tune swirls including their tweens
	      for (var index = 0; index < this._swirls.length; index++) {
	        var swirl = this._swirls[index],
	            options = this._getOption(index);

	        swirl._tuneNewOptions(options);
	        this._resetTween(swirl.tween, options);
	      }

	      this._o.timeline && this.timeline._setProp(this._o.timeline);
	      this.timeline._recalcTotalDuration();
	    }
	    /*
	      Method to reset some flags on merged options object.
	      @private
	      @overrides @ Thenable
	      @param   {Object} Options object.
	      @returns {Object} Options object.
	    */

	  }, {
	    key: '_resetTweens',
	    value: function _resetTweens() {} /* don't reset tweens for now */
	    /*
	      Method to reset some flags on merged options object.
	      @private
	      @override @ Thenable
	      @param   {Object} Options object.
	      @returns {Object} Options object.
	    */

	  }, {
	    key: '_resetMergedFlags',
	    value: function _resetMergedFlags(obj) {
	      // call super @ Thenable
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Burst.prototype), '_resetMergedFlags', this).call(this, obj);
	      obj.wasTimelineLess = obj.isTimelineLess;
	      obj.isTimelineLess = false;
	      return obj;
	    }

	    /*
	      Method to merge two options into one. Used in .then chains.
	      @private
	      @param {Object} Start options for the merge.
	      @param {Object} End options for the merge.
	      @returns {Object} Merged options.
	    */

	  }, {
	    key: '_mergeThenOptions',
	    value: function _mergeThenOptions(start, end) {
	      var startChild = start.childOptions || {},
	          endChild = end.childOptions || {},
	          mergedChild = (0, _get3.default)((0, _getPrototypeOf2.default)(Burst.prototype), '_mergeThenOptions', this).call(this, startChild, endChild, false),
	          merged = (0, _get3.default)((0, _getPrototypeOf2.default)(Burst.prototype), '_mergeThenOptions', this).call(this, start, end, false);

	      merged.childOptions = mergedChild;
	      this._history.push(merged);

	      return merged;
	    }
	  }]);
	  return Burst;
	}(_swirl2.default);

	exports.default = Burst;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(28);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(27);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(22);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(20);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tweenable = __webpack_require__(10);

	var _tweenable2 = _interopRequireDefault(_tweenable);

	var _thenable = __webpack_require__(11);

	var _thenable2 = _interopRequireDefault(_thenable);

	var _tunable = __webpack_require__(12);

	var _tunable2 = _interopRequireDefault(_tunable);

	var _tween = __webpack_require__(2);

	var _tween2 = _interopRequireDefault(_tween);

	var _timeline = __webpack_require__(8);

	var _timeline2 = _interopRequireDefault(_timeline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var h = __webpack_require__(16);
	var Bit = __webpack_require__(26);
	var shapesMap = __webpack_require__(17);


	// TODO
	//  - refactor
	//    - add set if changed to Module
	//  --
	//  - tween for every prop

	var Transit = function (_Tunable) {
	  (0, _inherits3.default)(Transit, _Tunable);

	  function Transit() {
	    (0, _classCallCheck3.default)(this, Transit);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Transit).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Transit, [{
	    key: '_declareDefaults',

	    /*
	      Method to declare module's defaults.
	      @private
	    */
	    value: function _declareDefaults() {
	      // DEFAULTS / APIs
	      this._defaults = {
	        // Possible values: [circle, line, zigzag, rect, polygon, cross, equal ]
	        shape: 'circle',
	        // ∆ :: Possible values: [color name, rgb, rgba, hex]
	        stroke: 'transparent',
	        // ∆ :: Possible values: [ 0..1 ]
	        strokeOpacity: 1,
	        // Possible values: ['butt' | 'round' | 'square']
	        strokeLinecap: '',
	        // ∆ :: Possible values: [ number ]
	        strokeWidth: 2,
	        // ∆ :: Units :: Possible values: [ number, string ]
	        strokeDasharray: 0,
	        // ∆ :: Units :: Possible values: [ number, string ]
	        strokeDashoffset: 0,
	        // ∆ :: Possible values: [color name, rgb, rgba, hex]
	        fill: 'deeppink',
	        // ∆ :: Possible values: [ 0..1 ]
	        fillOpacity: 1,
	        // ∆ :: Units :: Possible values: [ number, string ]
	        left: 0,
	        // ∆ :: Units :: Possible values: [ number, string ]
	        top: 0,
	        // ∆ :: Units :: Possible values: [ number, string ]
	        x: 0,
	        // ∆ :: Units :: Possible values: [ number, string ]
	        y: 0,
	        // ∆ :: Units :: Possible values: [ number, string ]
	        rx: 0,
	        // ∆ :: Units :: Possible values: [ number, string ]
	        ry: 0,
	        // ∆ :: Possible values: [ number ]
	        angle: 0,
	        // ∆ :: Possible values: [ number ]
	        scale: 1,
	        // ∆ :: Possible values: [ 0..1 ]
	        opacity: 1,
	        // ∆ :: Possible values: [ number ]
	        points: 3,
	        // ∆ :: Possible values: [ number ]
	        radius: { 0: 50 },
	        // ∆ :: Possible values: [ number ]
	        radiusX: null,
	        // ∆ :: Possible values: [ number ]
	        radiusY: null,
	        // Possible values: [ boolean ]
	        isShowStart: false,
	        // Possible values: [ boolean ]
	        isShowEnd: false,
	        // Possible values: [ number ]
	        size: null,
	        // Possible values: [ number ]
	        sizeGap: 0,
	        // context for all the callbacks
	        callbacksContext: null
	      };
	      // properties that will be excluded from delta parsing
	      this._skipPropsDelta = this._skipPropsDelta || {
	        callbacksContext: 1,
	        timeline: 1
	      };
	    }

	    // ^ PUBLIC  METHOD(S) ^
	    // v PRIVATE METHOD(S) v

	    /*
	      Method to declare variables.
	      @overrides Thenable
	    */

	  }, {
	    key: '_vars',
	    value: function _vars() {
	      // call _vars method on Thenable
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Transit.prototype), '_vars', this).call(this);
	      this._lastSet = {};
	      this._origin = {};
	      // should draw on foreign svg canvas
	      this.isForeign = !!this._o.ctx;
	      // should take an svg element as self bit
	      return this.isForeignBit = !!this._o.bit;
	    }
	    /*
	      Method to initialize modules presentation.
	      @private
	      @overrides Module
	    */

	  }, {
	    key: '_render',
	    value: function _render() {
	      if (!this.isRendered) {
	        if (!this.isForeign && !this.isForeignBit) {
	          this.ctx = document.createElementNS(h.NS, 'svg');
	          this.ctx.style.position = 'absolute';
	          this.ctx.style.width = '100%';
	          this.ctx.style.height = '100%';
	          this.el = document.createElement('div');
	          this.el.appendChild(this.ctx);
	          this._createBit();
	          this._calcSize();
	          (this._o.parent || document.body).appendChild(this.el);
	        } else {
	          this.ctx = this._o.ctx;this._createBit();this._calcSize();
	        }
	        this.isRendered = true;
	      }
	      this._setElStyles();

	      // if (this.el != null) { this.el.style.opacity = this._props.opacity; }
	      if (this._o.isShowStart) {
	        this._show();
	      } else {
	        this._hide();
	      }

	      this._setProgress(0);
	      return this;
	    }
	    /*
	      Method to set el styles on initialization.
	      @private
	    */

	  }, {
	    key: '_setElStyles',
	    value: function _setElStyles() {
	      var marginSize,
	          ref,
	          size,
	          p = this._props;
	      if (!this.isForeign) {
	        size = this._props.size + "px";
	        this.el.style.position = 'absolute';
	        this.el.style.top = p.top;
	        this.el.style.left = p.left;
	        this.el.style.width = size;
	        this.el.style.height = size;
	        this.el.style.opacity = p.opacity;
	        marginSize = -this._props.size / 2 + "px";
	        this.el.style['margin-left'] = marginSize;
	        this.el.style['margin-top'] = marginSize;
	        this.el.style['marginLeft'] = marginSize;
	        this.el.style['marginTop'] = marginSize;
	      }
	    }
	    /*
	      Method to draw shape.
	      @private
	    */

	  }, {
	    key: '_draw',
	    value: function _draw() {
	      // console.time('draw')
	      this.bit.setProp({
	        x: this._origin.x,
	        y: this._origin.y,
	        rx: this._props.rx,
	        ry: this._props.ry,
	        stroke: this._props.stroke,
	        'stroke-width': this._props.strokeWidth,
	        'stroke-opacity': this._props.strokeOpacity,
	        'stroke-dasharray': this._props.strokeDasharray,
	        'stroke-dashoffset': this._props.strokeDashoffset,
	        'stroke-linecap': this._props.strokeLinecap,
	        fill: this._props.fill,
	        'fill-opacity': this._props.fillOpacity,
	        radius: this._props.radius,
	        radiusX: this._props.radiusX,
	        radiusY: this._props.radiusY,
	        points: this._props.points
	      });
	      // transform:            this._calcShapeTransform()
	      this.bit.draw();this._drawEl();
	      // console.timeEnd('draw')
	    }
	    /*
	      Method to set current modules props to main div el.
	      @private
	    */

	  }, {
	    key: '_drawEl',
	    value: function _drawEl() {
	      if (this.el == null) {
	        return true;
	      }
	      var p = this._props;
	      this._isPropChanged('opacity') && (this.el.style.opacity = p.opacity);
	      if (!this.isForeign) {
	        this._isPropChanged('left') && (this.el.style.left = p.left);
	        this._isPropChanged('top') && (this.el.style.top = p.top);
	        var isTranslate = this._isPropChanged('x') || this._isPropChanged('y'),
	            isScaleRotate = this._isPropChanged('scale') || this._isPropChanged('angle');
	        if (isTranslate || isScaleRotate) {
	          h.setPrefixedStyle(this.el, 'transform', this._fillTransform());
	        }
	      }
	    }
	    /*
	      Method to check if property changed after the latest check.
	      @private
	      @param {String} Name of the property to check.
	      @returns {Boolean}
	    */

	  }, {
	    key: '_isPropChanged',
	    value: function _isPropChanged(name) {
	      // if there is no recod for the property - create it
	      if (this._lastSet[name] == null) {
	        this._lastSet[name] = {};
	      }
	      if (this._lastSet[name].value !== this._props[name]) {
	        this._lastSet[name].value = this._props[name];
	        return true;
	      } else {
	        return false;
	      }
	    }
	    /*
	      Method to create shape's transform string.
	      @private
	      @returns {String} Transform string for the shape.
	    */

	  }, {
	    key: '_calcShapeTransform',
	    value: function _calcShapeTransform() {
	      return 'rotate(' + this._props.angle + ', ' + this._origin.x + ', ' + this._origin.y + ')';
	    }
	    /*
	      Method to tune new option on run.
	      @private
	      @override @ Module
	      @param {Object}  Option to tune on run.
	    */

	  }, {
	    key: '_tuneNewOptions',
	    value: function _tuneNewOptions(o) {
	      // call super on Module
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Transit.prototype), '_tuneNewOptions', this).call(this, o);
	      // return if empty object
	      if (!(o != null && (0, _keys2.default)(o).length)) {
	        return 1;
	      }

	      // this.tween._setProp(o);
	      // this.timeline && this.timeline._recalcTotalDuration && this.timeline._recalcTotalDuration();

	      this._calcSize();
	      this._setElStyles();
	    }
	    /*
	      Method to calculate maximum shape's radius.
	      @private
	      @returns {Number} Maximum raduis.
	    */

	  }, {
	    key: '_calcMaxShapeRadius',
	    value: function _calcMaxShapeRadius() {
	      var selfSize, selfSizeX, selfSizeY;
	      selfSize = this._getRadiusSize({ key: 'radius' });
	      selfSizeX = this._getRadiusSize({ key: 'radiusX', fallback: selfSize });
	      selfSizeY = this._getRadiusSize({ key: 'radiusY', fallback: selfSize });
	      return Math.max(selfSizeX, selfSizeY);
	    }
	    /*
	      Method to calculate maximum size of the svg canvas.
	      @private
	    */

	  }, {
	    key: '_calcSize',
	    value: function _calcSize() {
	      if (this._o.size) {
	        return;
	      }
	      var p = this._props,
	          radius = this._calcMaxShapeRadius(),
	          dStroke = this._deltas['strokeWidth'],
	          stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this._props.strokeWidth;
	      p.size = 2 * radius + 2 * stroke;
	      this._increaseSizeWithEasing();
	      this._increaseSizeWithBitRatio();
	      return p.center = p.size / 2;
	    }
	    /*
	      Method to increase calculated size based on easing.
	      @private
	    */

	  }, {
	    key: '_increaseSizeWithEasing',
	    value: function _increaseSizeWithEasing() {
	      var p = this._props,
	          easing = this._o.easing,
	          isStringEasing = easing && typeof easing === 'string';
	      switch (isStringEasing && easing.toLowerCase()) {
	        case 'elastic.out':
	        case 'elastic.inout':
	          p.size *= 1.25;
	          break;
	        case 'back.out':
	        case 'back.inout':
	          p.size *= 1.1;
	      }
	    }
	    /*
	      Method to increase calculated size based on bit ratio.
	      @private
	    */

	  }, {
	    key: '_increaseSizeWithBitRatio',
	    value: function _increaseSizeWithBitRatio() {
	      var p = this._props;
	      p.size *= this.bit.ratio;
	      p.size += 2 * p.sizeGap;
	    }
	    /*
	      Method to get maximum radius size with optional fallback.
	      @private
	      @param {Object}
	        @param key {String} Name of the radius - [radius|radiusX|radiusY].
	        @param @optional fallback {Number}  Optional number to set if there
	                                            is no value for the key.
	    */

	  }, {
	    key: '_getRadiusSize',
	    value: function _getRadiusSize(o) {
	      var delta = this._deltas[o.key];
	      // if value is delta value
	      if (delta != null) {
	        // get maximum number between start and end values of the delta
	        return Math.max(Math.abs(delta.end), Math.abs(delta.start));
	      } else if (this._props[o.key] != null) {
	        // else get the value from props object
	        return parseFloat(this._props[o.key]);
	      } else {
	        return o.fallback || 0;
	      }
	    }
	    /*
	      Method to find the shape and initialize it.
	      @private
	    */

	  }, {
	    key: '_createBit',
	    value: function _createBit() {
	      var bitClass = shapesMap.getShape(this._o.shape || 'circle');
	      this.bit = new bitClass({ ctx: this.ctx, el: this._o.bit, isDrawLess: true });
	      // if draw on foreign context
	      // or we are animating an svg element outside the module
	      if (this.isForeign || this.isForeignBit) {
	        return this.el = this.bit.el;
	      }
	    }
	    /*
	      Method to draw current progress of the deltas.
	      @private
	      @override @ Module
	      @param   {Number}  Progress to set - [0..1].
	    */

	  }, {
	    key: '_setProgress',
	    value: function _setProgress(progress) {
	      // call the super on Module
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Transit.prototype), '_setProgress', this).call(this, progress);
	      this._calcOrigin();
	      this._draw(progress);
	    }
	    /*
	      Method to calculate transform origin for the element.
	      @private
	    */

	  }, {
	    key: '_calcOrigin',
	    value: function _calcOrigin() {
	      var p = this._props;
	      // if drawing context was passed
	      // set origin to x and y of the module
	      // otherwise set the origin to the center
	      this._origin.x = this._o.ctx ? parseFloat(p.x) : p.center;
	      this._origin.y = this._o.ctx ? parseFloat(p.y) : p.center;
	    }
	    /*
	      Method to add callback overrides to passed object.
	      @private
	      @param {Object} Object to add the overrides to.
	    */

	  }, {
	    key: '_applyCallbackOverrides',
	    value: function _applyCallbackOverrides(obj) {
	      var it = this,
	          p = this._props;

	      // specify control functions for the module
	      obj.callbackOverrides = {
	        onUpdate: function onUpdate(pe) {
	          return it._setProgress(pe);
	        },
	        onStart: function onStart(isFwd) {
	          return isFwd ? it._show() : !p.isShowStart && it._hide();
	        },
	        onComplete: function onComplete(isFwd) {
	          return isFwd ? !p.isShowEnd && it._hide() : it._show();
	        }
	      };
	    }
	    /*
	      Method to setup tween and timeline options before creating them.
	      @override @ Tweenable
	      @private  
	    */

	  }, {
	    key: '_transformTweenOptions',
	    value: function _transformTweenOptions() {
	      this._applyCallbackOverrides(this._o);
	    }
	    /*
	      Method to create transform string;
	      @private
	      @returns {String} Transform string.
	    */

	  }, {
	    key: '_fillTransform',
	    value: function _fillTransform() {
	      var p = this._props;
	      return 'scale(' + p.scale + ') translate(' + p.x + ', ' + p.y + ') rotate(' + p.angle + 'deg)';
	    }
	  }]);
	  return Transit;
	}(_tunable2.default);

	exports.default = Transit;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(27);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(22);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(20);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _transit = __webpack_require__(4);

	var _transit2 = _interopRequireDefault(_transit);

	var _h = __webpack_require__(16);

	var _h2 = _interopRequireDefault(_h);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	  *TODO:*
	  ---
	  - tweak then chains
	*/

	var Swirl = function (_Transit) {
	  (0, _inherits3.default)(Swirl, _Transit);

	  function Swirl() {
	    (0, _classCallCheck3.default)(this, Swirl);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Swirl).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Swirl, [{
	    key: '_declareDefaults',

	    /*
	      Method to declare _defaults and other default objects.
	      @private
	      @override @ Transit
	    */
	    value: function _declareDefaults() {
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Swirl.prototype), '_declareDefaults', this).call(this);

	      /* _DEFAULTS ARE - TRANSIT DEFAULTS + THESE: */

	      /* [boolean] :: If shape should follow sinusoidal path. */
	      this._defaults.isSwirl = true;
	      /* ∆ :: [number > 0] :: Degree size of the sinusoidal path. */
	      this._defaults.swirlSize = 10;
	      /* ∆ :: [number > 0] :: Frequency of the sinusoidal path. */
	      this._defaults.swirlFrequency = 3;
	      /* ∆ :: [number > 0] :: Sinusoidal path length scale. */
	      this._defaults.pathScale = 1;
	      /* ∆ :: [number] :: Degree shift for the sinusoidal path. */
	      this._defaults.degreeShift = 0;
	      /* ∆ :: [number] :: Radius of the shape. */
	      this._defaults.radius = { 5: 0 };
	    }

	    // ^ PUBLIC  METHOD(S) ^
	    // v PRIVATE METHOD(S) v

	    /*
	      Method to copy _o options to _props with
	      fallback to _defaults.
	      @private
	      @override @ Module
	    */

	  }, {
	    key: '_extendDefaults',
	    value: function _extendDefaults() {
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Swirl.prototype), '_extendDefaults', this).call(this);

	      var p = this._props,
	          x = this._getPosValue('x'),
	          y = this._getPosValue('y'),
	          angle = 90 + Math.atan(y.delta / x.delta || 0) * _h2.default.RAD_TO_DEG;

	      this._posData = {
	        radius: Math.sqrt(x.delta * x.delta + y.delta * y.delta),
	        angle: x.delta < 0 ? angle + 180 : angle,
	        x: x, y: y
	      };

	      p.signRand = Math.round(_h2.default.rand(0, 1)) ? -1 : 1;
	    }
	    /*
	      Gets `x` or `y` position value.
	      @private
	      @param {String} Name of the property.
	    */

	  }, {
	    key: '_getPosValue',
	    value: function _getPosValue(name) {
	      if (this._deltas[name]) {
	        var delta = this._deltas[name];
	        // delete from deltas to prevent normal
	        // deltas calculation for the property
	        delete this._deltas[name];
	        return {
	          start: delta.start.value,
	          end: delta.end.value,
	          delta: delta.delta,
	          units: delta.end.unit
	        };
	      } else {
	        var pos = _h2.default.parseUnit(this._props[name]);
	        return { start: pos.value, end: pos.value, delta: 0, units: pos.unit };
	      }
	    }
	    /*
	      Method to calculate the progress of the Swirl.
	      @private
	      @overrides @ Transit
	      @param {Numer} Progress of the Swirl in range of [0..1]
	    */

	  }, {
	    key: '_setProgress',
	    value: function _setProgress(proc) {
	      this._progress = proc;
	      this._calcCurrentProps(proc);

	      var p = this._props,
	          angle = this._posData.angle + p.degreeShift,
	          point = _h2.default.getRadialPoint({
	        angle: p.isSwirl ? angle + this._getSwirl(proc) : angle,
	        radius: proc * this._posData.radius * p.pathScale,
	        center: {
	          x: this._posData.x.start,
	          y: this._posData.y.start
	        }
	      });

	      // if foreign svg canvas - set position without units
	      var x = point.x,
	          y = point.y;
	      p.x = this._o.ctx ? x : x + this._posData.x.units;
	      p.y = this._o.ctx ? y : y + this._posData.y.units;

	      this._calcOrigin();
	      this._draw(proc);
	    }
	    /*
	      Method to get progress of the swirl.
	      @private
	      @param {Number} Progress of the Swirl.
	      @returns {Number} Progress of the swirl.
	    */

	  }, {
	    key: '_getSwirl',
	    value: function _getSwirl(proc) {
	      var p = this._props;
	      return p.signRand * p.swirlSize * Math.sin(p.swirlFrequency * proc);
	    }
	  }]);
	  return Swirl;
	}(_transit2.default);

	exports.default = Swirl;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(28);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _h = __webpack_require__(16);

	var _h2 = _interopRequireDefault(_h);

	var _timeline = __webpack_require__(8);

	var _timeline2 = _interopRequireDefault(_timeline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Stagger = function () {
	  function Stagger(options, Module) {
	    (0, _classCallCheck3.default)(this, Stagger);

	    return this.init(options, Module);
	  }
	  /*
	    Method to get an option by modulo and name.
	    @param {String} Name of the property to get.
	    @param {Number} Index for the modulo calculation.
	    @param {Object} Options hash to look in.
	    @return {Any} Property.
	  */


	  (0, _createClass3.default)(Stagger, [{
	    key: '_getOptionByMod',
	    value: function _getOptionByMod(name, i, store) {
	      var props = store[name];
	      // if not dom list then clone it to array
	      if (props + '' === '[object NodeList]' || props + '' === '[object HTMLCollection]') props = Array.prototype.slice.call(props, 0);
	      // get the value in array or return the value itself
	      var value = _h2.default.isArray(props) ? props[i % props.length] : props;
	      // check if value has the stagger expression, if so parse it
	      return _h2.default.parseIfStagger(value, i);
	    }
	    /*
	      Method to get option by modulo of index.
	      @param {Number} Index for modulo calculations.
	      @param {Object} Options hash to look in.
	    */

	  }, {
	    key: '_getOptionByIndex',
	    value: function _getOptionByIndex(i, store) {
	      var _this = this;

	      var options = {};
	      (0, _keys2.default)(store).forEach(function (key) {
	        return options[key] = _this._getOptionByMod(key, i, store);
	      });
	      return options;
	    }
	    /*
	      Method to get total child modules quantity.
	      @param  {String} Name of quantifier in options hash.
	      @param  {Object} Options hash object.
	      @return {Number} Number of child object that should be defined.
	    */

	  }, {
	    key: '_getChildQuantity',
	    value: function _getChildQuantity(name, store) {
	      // if number was set
	      if (typeof name === 'number') {
	        return name;
	      }

	      var quantifier = store[name];
	      if (_h2.default.isArray(quantifier)) {
	        return quantifier.length;
	      } else if (quantifier + '' === '[object NodeList]') {
	        return quantifier.length;
	      } else if (quantifier + '' === '[object HTMLCollection]') {
	        return Array.prototype.slice.call(quantifier, 0).length;
	      } else if (quantifier instanceof HTMLElement) {
	        return 1;
	      } else if (typeof quantifier == 'string') {
	        return 1;
	      }
	    }

	    /*
	      Method to create timeline.
	      @param {Object} Options. ** default ** empty object.
	    */

	  }, {
	    key: '_createTimeline',
	    value: function _createTimeline() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      this.timeline = new _timeline2.default({
	        onStart: options.onStaggerStart,
	        onUpdate: options.onStaggerUpdate,
	        onComplete: options.onStaggerComplete,
	        onReverseComplete: options.onStaggerReverseComplete,
	        delay: options.moduleDelay
	      });
	    }

	    /*
	      Method to make stagger form options
	      @param {Object} Options.
	      @param {Object} Child class.
	    */

	  }, {
	    key: 'init',
	    value: function init(options, Module) {
	      var count = this._getChildQuantity(options.quantifier || 'el', options);
	      this._createTimeline(options);this.childModules = [];
	      for (var i = 0; i < count; i++) {
	        // get child module's option
	        var option = this._getOptionByIndex(i, options);option.isRunLess = true;
	        // create child module
	        var module = new Module(option);this.childModules.push(module);
	        // add child module's timeline to the self timeline
	        this.timeline.add(module);
	      }
	      return this;
	    }
	    /*
	      Method to start timeline.
	    */

	  }, {
	    key: 'run',
	    value: function run() {
	      this.timeline.play();
	    }
	  }]);
	  return Stagger;
	}();

	module.exports = function (Module) {
	  return function (options) {
	    return new Stagger(options, Module);
	  };
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _h = __webpack_require__(16);

	var _h2 = _interopRequireDefault(_h);

	var _tween = __webpack_require__(2);

	var _tween2 = _interopRequireDefault(_tween);

	var _timeline = __webpack_require__(8);

	var _timeline2 = _interopRequireDefault(_timeline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	  Class for toggling opacity on bunch of elements
	  @class Spriter
	  @todo
	    - add isForce3d option
	    - add run new option merging
	    - add then chains
	*/

	var Spriter = function () {
	  (0, _createClass3.default)(Spriter, [{
	    key: '_declareDefaults',

	    /*
	      Defaults/APIs
	    */
	    value: function _declareDefaults() {
	      this._defaults = {
	        /*
	          Duration
	          @property duration
	          @type     {Number}
	        */
	        duration: 500,
	        /*
	          Delay
	          @property delay
	          @type     {Number}
	        */
	        delay: 0,
	        /*
	          Easing. Please see the 
	          [timeline module parseEasing function](timeline.coffee.html#parseEasing)
	          for all avaliable options.
	            @property easing
	          @type     {String, Function}
	        */
	        easing: 'linear.none',
	        /*
	          Repeat times count
	          
	          @property repeat
	          @type     {Number}
	        */
	        repeat: 0,
	        /*
	          Yoyo option defines if animation should be altered on repeat.
	          
	          @property yoyo
	          @type     {Boolean}
	        */
	        yoyo: false,
	        /*
	          isRunLess option prevents animation from running immediately after
	          initialization.
	          
	          @property isRunLess
	          @type     {Boolean}
	        */
	        isRunLess: false,
	        /*
	          isShowEnd option defines if the last frame should be shown when
	          animation completed.
	          
	          @property isShowEnd
	          @type     {Boolean}
	        */
	        isShowEnd: false,
	        /*
	          onStart callback will be called once on animation start.
	          
	          @property onStart
	          @type     {Function}
	        */
	        onStart: null,
	        /*
	          onUpdate callback will be called on every frame of the animation.
	          The current progress in range **[0,1]** will be passed to the callback.
	          
	          @property onUpdate
	          @type     {Function}
	        */
	        onUpdate: null,
	        /*
	          onComplete callback will be called once on animation complete.
	          
	          @property onComplete
	          @type     {Function}
	        */
	        onComplete: null
	      };
	    }
	  }]);

	  function Spriter() {
	    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Spriter);

	    this.o = o;
	    if (!this.o.el) {
	      return _h2.default.error('No "el" option specified, aborting');
	    }
	    this._vars();this._declareDefaults();this._extendDefaults();this._parseFrames();
	    if (this._frames.length <= 2) _h2.default.warn('Spriter: only ' + this._frames.length + ' frames found');
	    if (this._frames.length < 1) _h2.default.error("Spriter: there is no frames to animate, aborting");
	    this._createTween();
	    return this;
	  }
	  /*
	    Method to declare some variables.
	    
	    @method run
	    @param  {Object} New options
	    @todo   Implement new object merging
	  */


	  (0, _createClass3.default)(Spriter, [{
	    key: '_vars',
	    value: function _vars() {
	      this._props = _h2.default.cloneObj(this.o);
	      this.el = this.o.el;
	      this._frames = [];
	    }
	    /*
	      Method to run the spriter on demand.
	      
	      @method run
	      @param  {Object} New options
	      @todo   Implement new object merging
	    */

	  }, {
	    key: 'run',
	    value: function run(o) {
	      return this.timeline.play();
	    }
	    /*
	      Method to extend _props by options(this.o)
	      
	      @method _extendDefaults
	    */

	  }, {
	    key: '_extendDefaults',
	    value: function _extendDefaults() {
	      return _h2.default.extend(this._props, this._defaults);
	    }
	    /*
	      Method to parse frames as child nodes of el.
	      
	      @method _parseFrames
	    */

	  }, {
	    key: '_parseFrames',
	    value: function _parseFrames() {
	      this._frames = Array.prototype.slice.call(this.el.children, 0);
	      this._frames.forEach(function (frame, i) {
	        return frame.style.opacity = 0;
	      });
	      this._frameStep = 1 / this._frames.length;
	    }

	    /*
	      Method to create tween and timeline and supply callbacks.
	      
	      @method _createTween
	    */

	  }, {
	    key: '_createTween',
	    value: function _createTween() {
	      var _this = this;

	      this._tween = new _tween2.default({
	        duration: this._props.duration,
	        delay: this._props.delay,
	        yoyo: this._props.yoyo,
	        repeat: this._props.repeat,
	        easing: this._props.easing,
	        onStart: function onStart() {
	          return _this._props.onStart && _this._props.onStart();
	        },
	        onComplete: function onComplete() {
	          return _this._props.onComplete && _this._props.onComplete();
	        },
	        onUpdate: function onUpdate(p) {
	          return _this._setProgress(p);
	        }
	      });
	      this.timeline = new _timeline2.default();this.timeline.add(this._tween);
	      if (!this._props.isRunLess) this._startTween();
	    }

	    /*
	      Method to start tween
	      
	      @method _startTween
	    */

	  }, {
	    key: '_startTween',
	    value: function _startTween() {
	      var _this2 = this;

	      setTimeout(function () {
	        return _this2.timeline.play();
	      }, 1);
	    }
	    /*
	      Method to set progress of the sprite
	      
	      @method _setProgress
	      @param  {Number} Progress in range **[0,1]**
	    */

	  }, {
	    key: '_setProgress',
	    value: function _setProgress(p) {
	      // get the frame number
	      var proc = Math.floor(p / this._frameStep);
	      // react only if frame changes
	      if (this._prevFrame != this._frames[proc]) {
	        // if previous frame isnt current one, hide it
	        if (this._prevFrame) {
	          this._prevFrame.style.opacity = 0;
	        }
	        // if end of animation and isShowEnd flag was specified
	        // then show the last frame else show current frame
	        var currentNum = p === 1 && this._props.isShowEnd ? proc - 1 : proc;
	        // show the current frame
	        if (this._frames[currentNum]) {
	          this._frames[currentNum].style.opacity = 1;
	        }
	        // set previous frame as current
	        this._prevFrame = this._frames[proc];
	      }
	      if (this._props.onUpdate) {
	        this._props.onUpdate(p);
	      }
	    }
	  }]);
	  return Spriter;
	}();

	exports.default = Spriter;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(27);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _getIterator2 = __webpack_require__(29);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(22);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(20);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _h = __webpack_require__(16);

	var _h2 = _interopRequireDefault(_h);

	var _tweener = __webpack_require__(9);

	var _tweener2 = _interopRequireDefault(_tweener);

	var _tween = __webpack_require__(2);

	var _tween2 = _interopRequireDefault(_tween);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Timeline = function (_Tween) {
	  (0, _inherits3.default)(Timeline, _Tween);
	  (0, _createClass3.default)(Timeline, [{
	    key: 'add',

	    /*
	      API method to add child tweens/timelines.
	      @public
	      @param {Object, Array} Tween/Timeline or an array of such.
	      @returns {Object} Self.
	    */
	    value: function add() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

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

	  }, {
	    key: 'append',
	    value: function append() {
	      for (var _len2 = arguments.length, timeline = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        timeline[_key2] = arguments[_key2];
	      }

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(timeline), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var tm = _step.value;

	          if (_h2.default.isArray(tm)) {
	            this._appendTimelineArray(tm);
	          } else {
	            this._appendTimeline(tm, this._timelines.length);
	          }
	          this._calcDimentions();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return this;
	    }

	    // ^ PUBLIC  METHOD(S) ^
	    // v PRIVATE METHOD(S) v

	    /*
	      Method to append Tween/Timeline array or mix of such.
	      @private
	      @param {Array} Array of Tweens/Timelines.
	    */

	  }, {
	    key: '_appendTimelineArray',
	    value: function _appendTimelineArray(timelineArray) {
	      var i = timelineArray.length,
	          time = this._props.repeatTime - this._props.delay,
	          len = this._timelines.length;

	      while (i--) {
	        this._appendTimeline(timelineArray[i], len, time);
	      }
	    }
	    /*
	      Method to append a single timeline to the Timeline.
	      @private
	      @param {Object} Tween/Timline to append.
	      @param {Number} Index of the append.
	      @param {Number} Shift time.
	    */

	  }, {
	    key: '_appendTimeline',
	    value: function _appendTimeline(timeline, index, time) {
	      // if timeline is a module with timeline property then extract it
	      if (timeline.timeline instanceof Timeline) {
	        timeline = timeline.timeline;
	      }
	      if (timeline.tween instanceof _tween2.default) {
	        timeline = timeline.tween;
	      }

	      var shift = time != null ? time : this._props.duration;
	      shift += timeline._props.shiftTime || 0;
	      timeline.index = index;this._pushTimeline(timeline, shift);
	    }
	    /*
	      PrivateMethod to push Tween/Timeline array.
	      @private
	      @param {Array} Array of Tweens/Timelines.
	    */

	  }, {
	    key: '_pushTimelineArray',
	    value: function _pushTimelineArray(array) {
	      for (var i = 0; i < array.length; i++) {
	        var tm = array[i];
	        // recursive push to handle arrays of arrays
	        if (_h2.default.isArray(tm)) {
	          this._pushTimelineArray(tm);
	        } else {
	          this._pushTimeline(tm);
	        }
	      };
	    }
	    /*
	      Method to push a single Tween/Timeline.
	      @private
	      @param {Object} Tween or Timeline to push.
	      @param {Number} Number of milliseconds to shift the start time
	                      of the Tween/Timeline.
	    */

	  }, {
	    key: '_pushTimeline',
	    value: function _pushTimeline(timeline, shift) {
	      // if timeline is a module with timeline property then extract it
	      if (timeline.timeline instanceof Timeline) {
	        timeline = timeline.timeline;
	      }
	      if (timeline.tween instanceof _tween2.default) {
	        timeline = timeline.tween;
	      }
	      // add self delay to the timeline
	      shift != null && timeline._setProp({ 'shiftTime': shift });
	      this._timelines.push(timeline);
	      this._recalcDuration(timeline);
	    }
	    /*
	      Method set progress on self and child Tweens/Timelines.
	      @private
	      @param {Number} Progress to set.
	      @param {Number} Current update time.
	    */

	  }, {
	    key: '_setProgress',
	    value: function _setProgress(p, time, isYoyo) {
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Timeline.prototype), '_setProgress', this).call(this, p, time);
	      // we need to pass self previous time to children
	      // to prevent initial _wasUnknownUpdate nested waterfall
	      // if not yoyo option set, pass the previous time
	      // otherwise, pass previous or next time regarding yoyo period.
	      var coef = time > this._prevTime ? -1 : 1;
	      if (this._props.yoyo && isYoyo) {
	        coef *= -1;
	      }
	      var timeToTimelines = this._props.startTime + p * this._props.duration,
	          prevTimeToTimelines = timeToTimelines + coef,
	          len = this._timelines.length;
	      for (var i = 0; i < len; i++) {
	        // specify the children's array update loop direction
	        // if time > prevTime go from 0->length else from length->0
	        // var j = ( time > this._prevTime ) ? i : (len-1) - i ;
	        var j = timeToTimelines > prevTimeToTimelines ? i : len - 1 - i;
	        this._timelines[j]._update(timeToTimelines, prevTimeToTimelines, this._prevYoyo, this._onEdge);
	      }
	      this._prevYoyo = isYoyo;
	    }
	    /*
	      Method calculate self duration based on timeline's duration.
	      @private
	      @param {Object} Tween or Timeline to calculate.
	    */

	  }, {
	    key: '_recalcDuration',
	    value: function _recalcDuration(timeline) {
	      var p = timeline._props,
	          timelineTime = p.repeatTime / p.speed + (p.shiftTime || 0);

	      this._props.duration = Math.max(timelineTime, this._props.duration);
	    }
	    /*
	      Method calculate self duration from skretch.
	      @private
	    */

	  }, {
	    key: '_recalcTotalDuration',
	    value: function _recalcTotalDuration() {
	      var i = this._timelines.length;
	      this._props.duration = 0;
	      while (i--) {
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

	  }, {
	    key: '_setStartTime',
	    value: function _setStartTime(time) {
	      var isReset = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      (0, _get3.default)((0, _getPrototypeOf2.default)(Timeline.prototype), '_setStartTime', this).call(this, time);
	      this._startTimelines(this._props.startTime, isReset);
	    }
	    /*
	      Method calculate self duration based on timeline's duration.
	      @private
	      @param {Number, Null} Time to start with.
	    */

	  }, {
	    key: '_startTimelines',
	    value: function _startTimelines(time) {
	      var isReset = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      var p = this._props,
	          isStop = this._state === 'stop';

	      time == null && (time = this._props.startTime);

	      for (var i = 0; i < this._timelines.length; i++) {
	        var tm = this._timelines[i];
	        tm._setStartTime(time, isReset);
	        // if from `_subPlay` and `_prevTime` is set and state is `stop`
	        // prevTime normalizing is for play/pause functionality, so no
	        // need to normalize if the timeline is in `stop` state.
	        if (!isReset && tm._prevTime != null && !isStop) {
	          tm._prevTime = tm._normPrevTimeForward();
	        }
	      }
	    }
	    /*
	      Method do declare defaults by this._defaults object
	      @private
	    */

	  }, {
	    key: '_declareDefaults',
	    value: function _declareDefaults() {
	      // if duration was passed on initialization stage, warn user and reset it.
	      if (this._o.duration != null) {
	        _h2.default.error('Duration can not be declared on Timeline, but "' + this._o.duration + '" is. You probably want to use Tween instead.');
	        this._o.duration = 0;
	      }
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Timeline.prototype), '_declareDefaults', this).call(this);
	      // remove default
	      this._defaults.duration = 0;
	      this._defaults.nameBase = 'Timeline';
	    }
	  }]);

	  function Timeline() {
	    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Timeline);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Timeline).call(this, o));
	  }
	  /*
	    Method to declare some vars.
	    @private
	  */


	  (0, _createClass3.default)(Timeline, [{
	    key: '_vars',
	    value: function _vars() {
	      this._timelines = [];
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Timeline.prototype), '_vars', this).call(this);
	    }
	  }]);
	  return Timeline;
	}(_tween2.default);

	exports.default = Timeline;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	__webpack_require__(30);

	__webpack_require__(31);

	var _h = __webpack_require__(16);

	var _h2 = _interopRequireDefault(_h);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tweener = function () {
	  function Tweener() {
	    (0, _classCallCheck3.default)(this, Tweener);
	    this._vars();return this;
	  }

	  (0, _createClass3.default)(Tweener, [{
	    key: '_vars',
	    value: function _vars() {
	      this.tweens = [];this._loop = this._loop.bind(this);
	    }
	    /*
	      Main animation loop. Should have only one concurrent loop.
	      @private
	      @returns this
	    */

	  }, {
	    key: '_loop',
	    value: function _loop() {
	      if (!this._isRunning) {
	        return false;
	      }
	      this._update(window.performance.now());
	      if (!this.tweens.length) {
	        return this._isRunning = false;
	      }
	      requestAnimationFrame(this._loop);
	      return this;
	    }
	    /*
	      Method to start animation loop.
	      @private
	    */

	  }, {
	    key: '_startLoop',
	    value: function _startLoop() {
	      if (this._isRunning) {
	        return;
	      };this._isRunning = true;
	      requestAnimationFrame(this._loop);
	    }
	    /*
	      Method to stop animation loop.
	      @private
	    */

	  }, {
	    key: '_stopLoop',
	    value: function _stopLoop() {
	      this._isRunning = false;
	    }
	    /*
	      Method to update every tween/timeline on animation frame.
	      @private
	    */

	  }, {
	    key: '_update',
	    value: function _update(time) {
	      var i = this.tweens.length;
	      while (i--) {
	        // cache the current tween
	        var tween = this.tweens[i];
	        if (tween && tween._update(time) === true) {
	          this.remove(i);
	          tween._onTweenerFinish();
	          tween._prevTime = null;
	        }
	      }
	    }
	    /*
	      Method to add a Tween/Timeline to loop pool.
	      @param {Object} Tween/Timeline to add.
	    */

	  }, {
	    key: 'add',
	    value: function add(tween) {
	      // return if tween is already running
	      if (tween._isRunning) {
	        return;
	      }
	      tween._isRunning = true;
	      this.tweens.push(tween);
	      this._startLoop();
	    }
	    /*
	      Method stop updating all the child tweens/timelines.
	      @private
	    */

	  }, {
	    key: 'removeAll',
	    value: function removeAll() {
	      this.tweens.length = 0;
	    }
	    /*
	      Method to remove specific tween/timeline form updating.
	      @private
	    */

	  }, {
	    key: 'remove',
	    value: function remove(tween) {
	      var index = typeof tween === 'number' ? tween : this.tweens.indexOf(tween);

	      if (index !== -1) {
	        tween = this.tweens[index];
	        if (tween) {
	          tween._isRunning = false;
	          this.tweens.splice(index, 1);
	          tween._onTweenerRemove();
	        }
	      }
	    }
	  }]);
	  return Tweener;
	}();

	var t = new Tweener();
	exports.default = t;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(27);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(22);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(20);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tween = __webpack_require__(2);

	var _tween2 = _interopRequireDefault(_tween);

	var _timeline = __webpack_require__(8);

	var _timeline2 = _interopRequireDefault(_timeline);

	var _module = __webpack_require__(13);

	var _module2 = _interopRequireDefault(_module);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	  Class to define a module ancestor
	  with timeline and tween options and functionality.
	  All runable modules should inherit from this class.

	  @class Tweenable
	*/

	var Tweenable = function (_Module) {
	  (0, _inherits3.default)(Tweenable, _Module);
	  (0, _createClass3.default)(Tweenable, [{
	    key: 'play',

	    /*
	      play method for the timeline.
	      @public
	      @returns this.
	    */
	    value: function play() {
	      this.timeline.play.apply(this.timeline, arguments);
	      return this;
	    }
	    /*
	      playBackward method for the timeline.
	      @public
	      @returns this.
	    */

	  }, {
	    key: 'playBackward',
	    value: function playBackward() {
	      this.timeline.playBackward.apply(this.timeline, arguments);
	      return this;
	    }
	    /*
	      pause method for the timeline.
	      @public
	      @returns this.
	    */

	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.timeline.pause.apply(this.timeline, arguments);
	      return this;
	    }
	    /*
	      stop method for the timeline.
	      @public
	      @returns this.
	    */

	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.timeline.stop.apply(this.timeline, arguments);
	      return this;
	    }
	    /*
	      replay method for the timeline.
	      @public
	      @returns this.
	    */

	  }, {
	    key: 'replay',
	    value: function replay() {
	      this.timeline.replay.apply(this.timeline, arguments);
	      return this;
	    }
	    /*
	      replay method for the timeline.
	      @public
	      @returns this.
	    */

	  }, {
	    key: 'replayBackward',
	    value: function replayBackward() {
	      this.timeline.replayBackward.apply(this.timeline, arguments);
	      return this;
	    }
	    /*
	      setProgress method for the timeline.
	      @public
	      @returns this.
	    */

	  }, {
	    key: 'setProgress',
	    value: function setProgress() {
	      this.timeline.setProgress.apply(this.timeline, arguments);
	      return this;
	    }

	    // ^ PUBLIC  METHOD(S) ^
	    // v PRIVATE METHOD(S) v

	  }]);

	  function Tweenable() {
	    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Tweenable);

	    // pipe function for _o object
	    // before creating tween/timeline

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tweenable).call(this, o));
	    // super of Module


	    _this._transformTweenOptions();
	    // make tween only if isTweenLess option is not set
	    !_this._o.isTweenLess && _this._makeTween();
	    // make timeline only if isTimelineLess option is not set
	    !_this._o.isTimelineLess && _this._makeTimeline();
	    return _this;
	  }
	  /*
	    Placeholder method that should be overrided
	    and will be called before tween/timeline creation.
	    @private
	  */


	  (0, _createClass3.default)(Tweenable, [{
	    key: '_transformTweenOptions',
	    value: function _transformTweenOptions() {}
	    /*
	      Method to create tween.
	      @private
	    */

	  }, {
	    key: '_makeTween',
	    value: function _makeTween() {
	      // pass callbacks context
	      this._o.callbacksContext = this._o.callbacksContext || this;
	      this.tween = new _tween2.default(this._o);
	      // make timeline property point to tween one is "no timeline" mode
	      this._o.isTimelineLess && (this.timeline = this.tween);
	    }
	    /*
	      Method to create timeline.
	      @private
	      @param {Object} Timeline's options.
	                      An object which contains "timeline" property with
	                      timeline options.
	    */

	  }, {
	    key: '_makeTimeline',
	    value: function _makeTimeline() {
	      // pass callbacks context
	      this._o.timeline = this._o.timeline || {};
	      this._o.timeline.callbacksContext = this._o.callbacksContext || this;
	      this.timeline = new _timeline2.default(this._o.timeline);
	      // if tween exist - add it to the timeline there is some
	      // modules like burst and stagger that have no tween
	      this.tween && this.timeline.add(this.tween);
	    }
	  }]);
	  return Tweenable;
	}(_module2.default);

	exports.default = Tweenable;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(32);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _keys = __webpack_require__(28);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(27);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(22);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(20);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tweenable = __webpack_require__(10);

	var _tweenable2 = _interopRequireDefault(_tweenable);

	var _h = __webpack_require__(16);

	var _h2 = _interopRequireDefault(_h);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	  The Thenable class adds .then public method and
	  the ability to chain API calls.
	*/

	var Thenable = function (_Tweenable) {
	  (0, _inherits3.default)(Thenable, _Tweenable);

	  function Thenable() {
	    (0, _classCallCheck3.default)(this, Thenable);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Thenable).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Thenable, [{
	    key: 'then',

	    /*
	      Method to create a then record for the module.
	      @public
	      @param    {Object} Options for the next animation.
	      @returns  {Object} this.
	    */
	    value: function then(o) {
	      // return if nothing was passed
	      if (o == null || !(0, _keys2.default)(o)) {
	        return 1;
	      }
	      // merge then options with the current ones
	      var prevRecord = this._history[this._history.length - 1],
	          prevModule = this._modules[this._modules.length - 1],
	          merged = this._mergeThenOptions(prevRecord, o);

	      this._resetMergedFlags(merged);
	      // reset isShowEnd flag on prev module
	      prevModule._setProp && prevModule._setProp('isShowEnd', false);
	      // create a submodule of the same type as the master module
	      var module = new this.constructor(merged);
	      // save the modules to the _modules array
	      this._modules.push(module);
	      // add module's tween into master timeline
	      this.timeline.append(module);
	      return this;
	    }

	    // ^ PUBLIC  METHOD(S) ^
	    // v PRIVATE METHOD(S) v

	    /*
	      Method to reset some flags on merged options object.
	      @private
	      @param   {Object} Options object.
	      @returns {Object} Options object.
	    */

	  }, {
	    key: '_resetMergedFlags',
	    value: function _resetMergedFlags(obj) {
	      // set the submodule to be without timeline for perf reasons
	      obj.isTimelineLess = true;
	      // reset isShowStart flag for the submodules
	      obj.isShowStart = false;
	      // set the submodule callbacks context
	      obj.callbacksContext = this;
	      return obj;
	    }
	    /*
	      Method to initialize properties.
	      @private
	    */

	  }, {
	    key: '_vars',
	    value: function _vars() {
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Thenable.prototype), '_vars', this).call(this);
	      // we are expect that the _o object
	      // have been already extended by defaults
	      this._history = [_h2.default.cloneObj(this._o)];
	      // the array holds all modules in the then chain
	      this._modules = [this];
	      // the props that to exclude from then merge
	      this._nonMergeProps = { shape: 1 };
	    }
	    /*
	      Method to merge two options into one. Used in .then chains.
	      @private
	      @param {Object} Start options for the merge.
	      @param {Object} End options for the merge.
	      @param {Boolean} If should push to _history.
	      @returns {Object} Merged options.
	    */

	  }, {
	    key: '_mergeThenOptions',
	    value: function _mergeThenOptions(start, end) {
	      var isPush = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	      var o = {};
	      this._mergeStartLoop(o, start);
	      this._mergeEndLoop(o, start, end);
	      isPush && this._history.push(o);
	      return o;
	    }
	    /*
	      Originally part of the _mergeThenOptions.
	      Loops thru start object and copies all the props from it.
	      @param {Object} An object to copy in.
	      @parma {Object} Start options object.
	    */

	  }, {
	    key: '_mergeStartLoop',
	    value: function _mergeStartLoop(o, start) {
	      // loop thru start options object
	      for (var key in start) {
	        var value = start[key];
	        if (start[key] == null) {
	          continue;
	        };
	        // copy all values from start if not tween prop or duration
	        if (!_h2.default.isTweenProp(key) || key === 'duration') {
	          // if delta - copy only the end value
	          if (this._isDelta(value)) {
	            o[key] = _h2.default.getDeltaEnd(value);
	          } else {
	            o[key] = value;
	          }
	        }
	      }
	    }
	    /*
	      Originally part of the _mergeThenOptions.
	      Loops thru start object and merges all the props from it.
	      @param {Object} An object to copy in.
	      @parma {Object} Start options object.
	      @parma {Object} End options object.
	    */

	  }, {
	    key: '_mergeEndLoop',
	    value: function _mergeEndLoop(o, start, end) {
	      var endKeys = (0, _keys2.default)(end);

	      for (var key in end) {
	        // get key/value of the end object
	        // endKey - name of the property, endValue - value of the property
	        var endValue = end[key],
	            startValue = start[key] != null ? start[key] : this._defaults[key];
	        if (endValue == null) {
	          continue;
	        };
	        // make ∆ of start -> end
	        // if key name is radiusX/radiusY and
	        // the startValue is not set fallback to radius value
	        var isSubRadius = key === 'radiusX' || key === 'radiusY';
	        if (isSubRadius && startValue == null) {
	          startValue = start.radius;
	        }
	        // if one of the properties is array - merge
	        // with array, - else merge two plain properties
	        if (_h2.default.isArray(startValue) || _h2.default.isArray(endValue)) {
	          o[key] = this._mergeThenArrays(key, startValue, endValue);
	        } else {
	          o[key] = this._mergeThenProperty(key, startValue, endValue);
	        }
	      }
	    }
	    /*
	      Method to merge two arrays for then chain.
	      @private
	      @param {String} Property name.
	      @param {Array} Start array.
	      @param {Array} End array.
	      @returns the merged array.
	    */

	  }, {
	    key: '_mergeThenArrays',
	    value: function _mergeThenArrays(key, arr1, arr2) {
	      var arr = [],

	      // get maximum length for 2 arrays
	      max = Math.max(this._getArrayLength(arr1), this._getArrayLength(arr2));
	      // loop thru the max length of the 2 arrays
	      for (var i = 0; i < max; i++) {
	        // if property is array - get the current property
	        // in it ( by mod ) else take the property itself
	        var startVal = _h2.default.isArray(arr1) ? arr1[i % arr1.length] : arr1,
	            endVal = _h2.default.isArray(arr2) ? arr2[i % arr2.length] : arr2;
	        arr.push(this._mergeThenProperty(key, startVal, endVal));
	      }
	      return arr;
	    }
	    /*
	      Method to merge `start` and `end` for a property in then record.
	      @private
	      @param {String} Property name.
	      @param {Any}    Start value of the property.
	      @param {Any}    End value of the property.
	    */

	  }, {
	    key: '_mergeThenProperty',
	    value: function _mergeThenProperty(key, startValue, endValue) {
	      // if isnt tween property
	      if (!_h2.default.isTweenProp(key) && !this._nonMergeProps[key]) {
	        // if end value is delta - just save it
	        if (this._isDelta(endValue)) {
	          return endValue;
	        } else {
	          // if end value is not delta - merge with start value
	          if (this._isDelta(startValue)) {
	            // if start value is delta - take the end value
	            // as start value of the new delta
	            return (0, _defineProperty3.default)({}, _h2.default.getDeltaEnd(startValue), endValue);
	            // if start value is not delta - make delta
	          } else {
	              return (0, _defineProperty3.default)({}, startValue, endValue);
	            }
	        }
	        // copy the tween values unattended
	      } else {
	          return endValue;
	        }
	    }
	    /*
	      Method to retreive array's length and return -1 for
	      all other types.
	      @private
	      @param {Array, Any} Array to get the width for.
	      @returns {Number} Array length or -1 if not array.
	    */

	  }, {
	    key: '_getArrayLength',
	    value: function _getArrayLength(arr) {
	      return _h2.default.isArray(arr) ? arr.length : -1;
	    }
	    /*
	      Method to check if the property is delta property.
	      @private
	      @param {Any} Parameter value to check.
	      @returns {Boolean}
	    */

	  }, {
	    key: '_isDelta',
	    value: function _isDelta(optionsValue) {
	      var isObject = _h2.default.isObject(optionsValue);
	      isObject = isObject && !optionsValue.unit;
	      return !(!isObject || _h2.default.isArray(optionsValue) || _h2.default.isDOM(optionsValue));
	    }
	  }]);
	  return Thenable;
	}(_tweenable2.default);

	exports.default = Thenable;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(32);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _keys = __webpack_require__(28);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(27);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(22);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(20);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _h = __webpack_require__(16);

	var _h2 = _interopRequireDefault(_h);

	var _thenable = __webpack_require__(11);

	var _thenable2 = _interopRequireDefault(_thenable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tuneable = function (_Thenable) {
	  (0, _inherits3.default)(Tuneable, _Thenable);

	  function Tuneable() {
	    (0, _classCallCheck3.default)(this, Tuneable);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tuneable).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Tuneable, [{
	    key: 'tune',

	    /*
	      Method to start the animation with optional new options.
	      @public
	      @param {Object} New options to set on the run.
	      @returns {Object} this.
	    */
	    value: function tune(o) {
	      // if options object was passed
	      if (o && (0, _keys2.default)(o).length) {
	        this._transformHistory(o);
	        this._tuneNewOptions(o);
	        this._history[0] = _h2.default.extend(_h2.default.cloneObj(this._o), this._defaults);
	        this._tuneSubModules();
	        this._resetTweens();
	      }
	      return this;
	    }
	    /*
	      Method to regenerate all the random properties form initial object.
	      @public
	      @returns this.
	    */

	  }, {
	    key: 'generate',
	    value: function generate() {
	      return this.tune(this._o);
	    }

	    // ^ PUBLIC  METHOD(S) ^
	    // v PRIVATE METHOD(S) v

	    /*
	      Method to transform history rewrite new options object chain on run.
	      @param {Object} New options to tune for.
	    */

	  }, {
	    key: '_transformHistory',
	    value: function _transformHistory(o) {
	      var optionsKeys = (0, _keys2.default)(o);

	      for (var i = 0; i < optionsKeys.length; i++) {
	        var optionsKey = optionsKeys[i],
	            optionsValue = o[optionsKey];

	        this._transformHistoryFor(optionsKey, optionsValue);
	      }
	    }
	    /*
	      Method to transform history chain for specific key/value.
	      @param {String} Name of the property to transform history for.
	      @param {Any} The new property's value.
	    */

	  }, {
	    key: '_transformHistoryFor',
	    value: function _transformHistoryFor(key, value) {
	      for (var i = 0; i < this._history.length; i++) {
	        if (value = this._transformHistoryRecord(i, key, value)) {
	          // break if no further history modifications needed
	          if (value == null) {
	            break;
	          }
	        }
	      }
	    }
	    /*
	      Method to transform history recod with key/value.
	      @param {Number} Index of the history record to transform.
	      @param {String} Property name to transform.
	      @param {Any} Property value to transform to.
	      @returns {Boolean} Returns true if no further
	                         history modifications is needed.
	    */

	  }, {
	    key: '_transformHistoryRecord',
	    value: function _transformHistoryRecord(index, key, newValue) {
	      if (newValue == null) {
	        return null;
	      }

	      var currRecord = this._history[index],
	          prevRecord = this._history[index - 1],
	          nextRecord = this._history[index + 1],
	          oldValue = currRecord[key];

	      // if index is 0 - always save the newValue
	      // and return non-delta for subsequent modifications
	      if (index === 0) {
	        currRecord[key] = newValue;
	        // always return on tween properties
	        if (_h2.default.isTweenProp(key) && key !== 'duration') {
	          return null;
	        }
	        // nontween properties
	        if (this._isDelta(newValue)) {
	          return _h2.default.getDeltaEnd(newValue);
	        } else {
	          var isNextRecord = nextRecord && nextRecord[key] === oldValue,
	              isNextDelta = nextRecord && this._isDelta(nextRecord[key]);

	          return isNextRecord || isNextDelta ? newValue : null;
	        }
	      } else {
	        // if was delta and came none-deltta - rewrite
	        // the start of the delta and stop
	        if (this._isDelta(oldValue)) {
	          currRecord[key] = (0, _defineProperty3.default)({}, newValue, _h2.default.getDeltaEnd(oldValue));
	          return null;
	        } else {
	          // if the old value is not delta and the new one is
	          currRecord[key] = newValue;
	          // if the next item has the same value - return the
	          // item for subsequent modifications or stop
	          return nextRecord && nextRecord[key] === oldValue ? newValue : null;
	        }
	      }
	    }
	    /*
	      Method to tune new history options to all the submodules.
	      @private
	    */

	  }, {
	    key: '_tuneSubModules',
	    value: function _tuneSubModules() {
	      for (var i = 1; i < this._modules.length; i++) {
	        var module = this._modules[i];
	        module._tuneNewOptions(this._history[i]);
	      }
	    }
	    /*
	      Method to set new options on run.
	      @param {Boolean} If foreign context.
	      @private
	    */

	  }, {
	    key: '_resetTweens',
	    value: function _resetTweens() {
	      var i = 0,
	          shift = 0,
	          tweens = this.timeline._timelines;

	      for (var i = 0; i < tweens.length; i++) {
	        var tween = tweens[i],
	            prevTween = tweens[i - 1];

	        shift += prevTween ? prevTween._props.repeatTime : 0;
	        this._resetTween(tween, this._history[i], shift);
	      }
	      this.timeline._recalcTotalDuration();
	    }
	    /*
	      Method to reset tween with new options.
	      @param {Object} Tween to reset.
	      @param {Object} Tween's to reset tween with.
	      @param {Number} Optional number to shift tween start time.
	    */

	  }, {
	    key: '_resetTween',
	    value: function _resetTween(tween, o) {
	      var shift = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	      o.shiftTime = shift;tween._setProp(o);
	    }
	  }]);
	  return Tuneable;
	}(_thenable2.default);

	exports.default = Tuneable;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = __webpack_require__(15);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(21);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _h = __webpack_require__(16);

	var _h2 = _interopRequireDefault(_h);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	  Base class for module. Extends and parses defaults.
	*/

	var Module = function () {
	  function Module() {
	    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Module);

	    this._o = o;
	    this._index = this._o.index || 0;
	    this._declareDefaults();
	    this._extendDefaults();
	    this._vars();
	    this._render();
	  }
	  /*
	    Method to declare defaults.
	    @private
	  */


	  (0, _createClass3.default)(Module, [{
	    key: '_declareDefaults',
	    value: function _declareDefaults() {
	      this._defaults = {};
	    }
	    /*
	      Method to declare module's variables.
	      @private
	    */

	  }, {
	    key: '_vars',
	    value: function _vars() {
	      this._progress = 0;
	      this._strokeDasharrayBuffer = [];
	    }
	    /*
	      Method to render on initialization.
	      @private
	    */

	  }, {
	    key: '_render',
	    value: function _render() {}
	    /*
	      Method to set property on the module.
	      @private
	      @param {String, Object} Name of the property to set
	                              or object with properties to set.
	      @param {Any} Value for the property to set. Could be
	                    undefined if the first param is object.
	    */

	  }, {
	    key: '_setProp',
	    value: function _setProp(attr, value) {
	      if ((typeof attr === 'undefined' ? 'undefined' : (0, _typeof3.default)(attr)) === 'object') {
	        for (var key in attr) {
	          this._assignProp(key, attr[key]);
	        }
	      } else {
	        this._assignProp(attr, value);
	      }
	    }
	    /*
	      Method to assign single property's value.
	      @private
	      @param {String} Property name.
	      @param {Any}    Property value.
	    */

	  }, {
	    key: '_assignProp',
	    value: function _assignProp(key, value) {
	      this._props[key] = value;
	    }
	    /*
	      Method to show the main div el.
	      @private
	    */

	  }, {
	    key: '_show',
	    value: function _show() {
	      if (this._isShown || this.el == null) {
	        return;
	      }
	      this.el.style.display = 'block';
	      this._isShown = true;
	    }
	    /*
	      Method to hide the main div el.
	      @private
	    */

	  }, {
	    key: '_hide',
	    value: function _hide() {
	      if (this._isShown === false || this.el == null) {
	        return;
	      }
	      this.el.style.display = 'none';
	      return this._isShown = false;
	    }
	    /*
	      Method to parse option string.
	      Searches for stagger and rand values and parses them.
	      Leaves the value unattended otherwise.
	      @param {Any} Option value to parse.
	      @returns {Number} Parsed options value.
	    */

	  }, {
	    key: '_parseOptionString',
	    value: function _parseOptionString(value) {
	      if (typeof value === 'string') {
	        if (value.match(/stagger/)) {
	          value = _h2.default.parseStagger(value, this._index);
	        }
	      }
	      if (typeof value === 'string') {
	        if (value.match(/rand/)) {
	          value = _h2.default.parseRand(value);
	        }
	      }
	      return value;
	    }
	    /*
	      Method to parse postion option.
	      @param {String} Property name.
	      @returns {String} Parsed options value.
	    */

	  }, {
	    key: '_parsePositionOption',
	    value: function _parsePositionOption(key) {
	      var value = this._props[key];
	      if (_h2.default.unitOptionMap[key]) {
	        value = _h2.default.parseUnit(value).string;
	      }
	      return value;
	    }
	    /*
	      Method to parse strokeDash.. option.
	      @param {String} Property name.
	      @returns {String} Parsed options value.
	    */

	  }, {
	    key: '_parseStrokeDashOption',
	    value: function _parseStrokeDashOption(key) {
	      var value = this._props[key],
	          result = value;
	      // parse numeric/percent values for strokeDash.. properties
	      if (key === 'strokeDasharray' || key === 'strokeDashoffset') {
	        var result = [];
	        switch (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) {
	          case 'number':
	            result.push(_h2.default.parseUnit(value));
	            break;
	          case 'string':
	            var array = this._props[key].split(' ');
	            for (var i = 0; i < array.length; i++) {
	              result.push(_h2.default.parseUnit(array[i]));
	            }
	            break;
	        }
	      }
	      return result;
	    }
	    /*
	      Method to check if the property is delta property.
	      @private
	      @param {Any} Parameter value to check.
	      @returns {Boolean}
	    */

	  }, {
	    key: '_isDelta',
	    value: function _isDelta(optionsValue) {
	      var isObject = _h2.default.isObject(optionsValue);
	      isObject = isObject && !optionsValue.unit;
	      return !(!isObject || _h2.default.isArray(optionsValue) || _h2.default.isDOM(optionsValue));
	    }
	    /*
	      Method to get delta from property and set
	      the property's start value to the props object.
	      @private
	      @param {String} Key name to get delta for.
	      @param {Object} Option value to get the delta for.
	    */

	  }, {
	    key: '_getDelta',
	    value: function _getDelta(key, optionsValue) {
	      var delta;
	      if ((key === 'left' || key === 'top') && !this._o.ctx) {
	        _h2.default.warn('Consider to animate x/y properties instead of left/top,\n        as it would be much more performant', optionsValue);
	      }
	      // skip delta calculation for a property if it is listed
	      // in skipPropsDelta object
	      if (this._skipPropsDelta && this._skipPropsDelta[key]) {
	        return;
	      }
	      // get delta
	      delta = _h2.default.parseDelta(key, optionsValue, this._index);
	      // if successfully parsed - save it
	      if (delta.type != null) {
	        this._deltas[key] = delta;
	      }
	      // set props to start value of the delta
	      this._props[key] = delta.start;
	    }
	    /*
	      Method to copy `_o` options to `_props` object
	      with fallback to `_defaults`.
	    */

	  }, {
	    key: '_extendDefaults',
	    value: function _extendDefaults() {
	      this._props = {};
	      this._deltas = {};
	      for (var key in this._defaults) {
	        // skip property if it is listed in _skipProps
	        if (this._skipProps && this._skipProps[key]) {
	          continue;
	        }
	        // copy the properties to the _o object
	        var value = this._o[key] != null ? this._o[key] : this._defaults[key];
	        // parse option
	        this._parseOption(key, value);
	      }
	    }
	    /*
	      Method to tune new oprions to _o and _props object.
	      @private
	      @param {Object} Options object to tune to.
	    */

	  }, {
	    key: '_tuneNewOptions',
	    value: function _tuneNewOptions(o) {
	      // hide the module before tuning it's options
	      // cuz the user could see the change
	      this._hide();
	      for (var key in o) {
	        // skip property if it is listed in _skipProps
	        if (this._skipProps && this._skipProps[key]) {
	          continue;
	        }
	        // copy the properties to the _o object
	        // delete the key from deltas
	        o && delete this._deltas[key];
	        // rewrite _o record
	        this._o[key] = o[key];
	        // save the options to _props
	        this._parseOption(key, o[key]);
	      }
	    }
	    /*
	      Method to parse option value.
	      @param {String} Option name.
	      @param {Any} Option value.
	    */

	  }, {
	    key: '_parseOption',
	    value: function _parseOption(name, value) {
	      // if delta property
	      if (this._isDelta(value) && name !== 'callbacksContext') {
	        this._getDelta(name, value);return;
	      }
	      // parse stagger and rand values
	      this._assignProp(name, this._parseOptionString(value));
	      // parse units for position properties
	      this._assignProp(name, this._parsePositionOption(name));
	      // parse numeric/percent values for strokeDash.. properties
	      this._assignProp(name, this._parseStrokeDashOption(name));
	    }
	    /*
	      Method to calculate current progress of the deltas.
	      @private
	      @param {Number} Progress to calculate - [0..1].
	    */

	  }, {
	    key: '_calcCurrentProps',
	    value: function _calcCurrentProps(p) {
	      for (var key in this._deltas) {
	        var value = this._deltas[key];
	        if (value.type === 'array') {
	          this._strokeDasharrayBuffer.length = 0;
	          for (var i = 0; i < value.delta.length; i++) {
	            var item = value.delta[i],
	                dash = value.start[i].value + p * item.value;
	            this._strokeDasharrayBuffer.push({ value: dash, unit: item.unit });
	          }
	          this._props[key] = this._strokeDasharrayBuffer;
	        } else if (value.type === 'number') {
	          this._props[key] = value.start + value.delta * p;
	        } else if (value.type === 'unit') {
	          this._props[key] = '' + (value.start.value + p * value.delta) + value.end.unit;
	        } else if (value.type === 'color') {
	          var r = parseInt(value.start.r + p * value.delta.r, 10),
	              g = parseInt(value.start.g + p * value.delta.g, 10),
	              b = parseInt(value.start.b + p * value.delta.b, 10),
	              a = parseInt(value.start.a + p * value.delta.a, 10);
	          this._props[key] = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
	        }
	      }
	    }
	    /*
	      Method to calculate current progress and probably draw it in children.
	      @private
	      @param {Number} Progress to set - [0..1].
	    */

	  }, {
	    key: '_setProgress',
	    value: function _setProgress(progress) {
	      this._progress = progress;
	      this._calcCurrentProps(progress);
	    }
	  }]);
	  return Module;
	}();

	exports.default = Module;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _iterator = __webpack_require__(33);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(34);

	var _symbol2 = _interopRequireDefault(_symbol);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Helpers, h;

	Helpers = (function() {
	  Helpers.prototype.NS = 'http://www.w3.org/2000/svg';

	  Helpers.prototype.logBadgeCss = 'background:#3A0839;color:#FF512F;border-radius:5px; padding: 1px 5px 2px; border: 1px solid #FF512F;';

	  Helpers.prototype.shortColors = {
	    transparent: 'rgba(0,0,0,0)',
	    none: 'rgba(0,0,0,0)',
	    aqua: 'rgb(0,255,255)',
	    black: 'rgb(0,0,0)',
	    blue: 'rgb(0,0,255)',
	    fuchsia: 'rgb(255,0,255)',
	    gray: 'rgb(128,128,128)',
	    green: 'rgb(0,128,0)',
	    lime: 'rgb(0,255,0)',
	    maroon: 'rgb(128,0,0)',
	    navy: 'rgb(0,0,128)',
	    olive: 'rgb(128,128,0)',
	    purple: 'rgb(128,0,128)',
	    red: 'rgb(255,0,0)',
	    silver: 'rgb(192,192,192)',
	    teal: 'rgb(0,128,128)',
	    white: 'rgb(255,255,255)',
	    yellow: 'rgb(255,255,0)',
	    orange: 'rgb(255,128,0)'
	  };

	  Helpers.prototype.chainOptionMap = {};

	  Helpers.prototype.callbacksMap = {
	    onStart: 1,
	    onComplete: 1,
	    onFirstUpdate: 1,
	    onUpdate: 1,
	    onProgress: 1,
	    onRepeatStart: 1,
	    onRepeatComplete: 1
	  };

	  Helpers.prototype.tweenOptionMap = {
	    duration: 1,
	    delay: 1,
	    speed: 1,
	    repeat: 1,
	    easing: 1,
	    yoyo: 1,
	    shiftTime: 1,
	    isReversed: 1
	  };

	  Helpers.prototype.unitOptionMap = {
	    left: 1,
	    top: 1,
	    x: 1,
	    y: 1,
	    rx: 1,
	    ry: 1
	  };

	  Helpers.prototype.RAD_TO_DEG = 180 / Math.PI;

	  function Helpers() {
	    this.vars();
	  }

	  Helpers.prototype.vars = function() {
	    var ua;
	    this.prefix = this.getPrefix();
	    this.getRemBase();
	    this.isFF = this.prefix.lowercase === 'moz';
	    this.isIE = this.prefix.lowercase === 'ms';
	    ua = navigator.userAgent;
	    this.isOldOpera = ua.match(/presto/gim);
	    this.isSafari = ua.indexOf('Safari') > -1;
	    this.isChrome = ua.indexOf('Chrome') > -1;
	    this.isOpera = ua.toLowerCase().indexOf("op") > -1;
	    this.isChrome && this.isSafari && (this.isSafari = false);
	    (ua.match(/PhantomJS/gim)) && (this.isSafari = false);
	    this.isChrome && this.isOpera && (this.isChrome = false);
	    this.is3d = this.checkIf3d();
	    this.uniqIDs = -1;
	    this.div = document.createElement('div');
	    return document.body.appendChild(this.div);
	  };

	  Helpers.prototype.cloneObj = function(obj, exclude) {
	    var i, key, keys, newObj;
	    keys = Object.keys(obj);
	    newObj = {};
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (exclude != null) {
	        if (!exclude[key]) {
	          newObj[key] = obj[key];
	        }
	      } else {
	        newObj[key] = obj[key];
	      }
	    }
	    return newObj;
	  };

	  Helpers.prototype.extend = function(objTo, objFrom) {
	    var key, value;
	    for (key in objFrom) {
	      value = objFrom[key];
	      if (objTo[key] == null) {
	        objTo[key] = objFrom[key];
	      }
	    }
	    return objTo;
	  };

	  Helpers.prototype.getRemBase = function() {
	    var html, style;
	    html = document.querySelector('html');
	    style = getComputedStyle(html);
	    return this.remBase = parseFloat(style.fontSize);
	  };

	  Helpers.prototype.clamp = function(value, min, max) {
	    if (value < min) {
	      return min;
	    } else if (value > max) {
	      return max;
	    } else {
	      return value;
	    }
	  };

	  Helpers.prototype.setPrefixedStyle = function(el, name, value) {
	    if (name.match(/transform/gim)) {
	      el.style["" + name] = value;
	      return el.style["" + this.prefix.css + name] = value;
	    } else {
	      return el.style[name] = value;
	    }
	  };

	  Helpers.prototype.style = function(el, name, value) {
	    var key, keys, len, results;
	    if (typeof name === 'object') {
	      keys = Object.keys(name);
	      len = keys.length;
	      results = [];
	      while (len--) {
	        key = keys[len];
	        value = name[key];
	        results.push(this.setPrefixedStyle(el, key, value));
	      }
	      return results;
	    } else {
	      return this.setPrefixedStyle(el, name, value);
	    }
	  };

	  Helpers.prototype.prepareForLog = function(args) {
	    args = Array.prototype.slice.apply(args);
	    args.unshift('::');
	    args.unshift(this.logBadgeCss);
	    args.unshift('%cmo·js%c');
	    return args;
	  };

	  Helpers.prototype.log = function() {
	    if (mojs.isDebug === false) {
	      return;
	    }
	    return console.log.apply(console, this.prepareForLog(arguments));
	  };

	  Helpers.prototype.warn = function() {
	    if (mojs.isDebug === false) {
	      return;
	    }
	    return console.warn.apply(console, this.prepareForLog(arguments));
	  };

	  Helpers.prototype.error = function() {
	    if (mojs.isDebug === false) {
	      return;
	    }
	    return console.error.apply(console, this.prepareForLog(arguments));
	  };

	  Helpers.prototype.parseUnit = function(value) {
	    var amount, isStrict, ref, regex, returnVal, unit;
	    if (typeof value === 'number') {
	      return returnVal = {
	        unit: 'px',
	        isStrict: false,
	        value: value,
	        string: value + "px"
	      };
	    } else if (typeof value === 'string') {
	      regex = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin/gim;
	      unit = (ref = value.match(regex)) != null ? ref[0] : void 0;
	      isStrict = true;
	      if (!unit) {
	        unit = 'px';
	        isStrict = false;
	      }
	      amount = parseFloat(value);
	      return returnVal = {
	        unit: unit,
	        isStrict: isStrict,
	        value: amount,
	        string: "" + amount + unit
	      };
	    }
	    return value;
	  };

	  Helpers.prototype.bind = function(func, context) {
	    var bindArgs, wrapper;
	    wrapper = function() {
	      var args, unshiftArgs;
	      args = Array.prototype.slice.call(arguments);
	      unshiftArgs = bindArgs.concat(args);
	      return func.apply(context, unshiftArgs);
	    };
	    bindArgs = Array.prototype.slice.call(arguments, 2);
	    return wrapper;
	  };

	  Helpers.prototype.getRadialPoint = function(o) {
	    var point, radAngle, radiusX, radiusY;
	    if (o == null) {
	      o = {};
	    }
	    if ((o.radius == null) || (o.angle == null) || (o.center == null)) {
	      return;
	    }
	    radAngle = (o.angle - 90) * (Math.PI / 180);
	    radiusX = o.radiusX != null ? o.radiusX : o.radius;
	    radiusY = o.radiusY != null ? o.radiusY : o.radius;
	    return point = {
	      x: o.center.x + (Math.cos(radAngle) * radiusX),
	      y: o.center.y + (Math.sin(radAngle) * radiusY)
	    };
	  };

	  Helpers.prototype.getPrefix = function() {
	    var dom, pre, styles, v;
	    styles = window.getComputedStyle(document.documentElement, "");
	    v = Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/);
	    pre = (v || (styles.OLink === "" && ["", "o"]))[1];
	    dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1];
	    return {
	      dom: dom,
	      lowercase: pre,
	      css: "-" + pre + "-",
	      js: pre[0].toUpperCase() + pre.substr(1)
	    };
	  };

	  Helpers.prototype.strToArr = function(string) {
	    var arr;
	    arr = [];
	    if (typeof string === 'number' && !isNaN(string)) {
	      arr.push(this.parseUnit(string));
	      return arr;
	    }
	    string.trim().split(/\s+/gim).forEach((function(_this) {
	      return function(str) {
	        return arr.push(_this.parseUnit(_this.parseIfRand(str)));
	      };
	    })(this));
	    return arr;
	  };

	  Helpers.prototype.calcArrDelta = function(arr1, arr2) {
	    var delta, i, j, len1, num;
	    delta = [];
	    for (i = j = 0, len1 = arr1.length; j < len1; i = ++j) {
	      num = arr1[i];
	      delta[i] = this.parseUnit("" + (arr2[i].value - arr1[i].value) + arr2[i].unit);
	    }
	    return delta;
	  };

	  Helpers.prototype.isArray = function(variable) {
	    return variable instanceof Array;
	  };

	  Helpers.prototype.normDashArrays = function(arr1, arr2) {
	    var arr1Len, arr2Len, currItem, i, j, k, lenDiff, ref, ref1, startI;
	    arr1Len = arr1.length;
	    arr2Len = arr2.length;
	    if (arr1Len > arr2Len) {
	      lenDiff = arr1Len - arr2Len;
	      startI = arr2.length;
	      for (i = j = 0, ref = lenDiff; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	        currItem = i + startI;
	        arr2.push(this.parseUnit("0" + arr1[currItem].unit));
	      }
	    } else if (arr2Len > arr1Len) {
	      lenDiff = arr2Len - arr1Len;
	      startI = arr1.length;
	      for (i = k = 0, ref1 = lenDiff; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
	        currItem = i + startI;
	        arr1.push(this.parseUnit("0" + arr2[currItem].unit));
	      }
	    }
	    return [arr1, arr2];
	  };

	  Helpers.prototype.makeColorObj = function(color) {
	    var alpha, b, colorObj, g, isRgb, r, regexString1, regexString2, result, rgbColor;
	    if (color[0] === '#') {
	      result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);
	      colorObj = {};
	      if (result) {
	        r = result[1].length === 2 ? result[1] : result[1] + result[1];
	        g = result[2].length === 2 ? result[2] : result[2] + result[2];
	        b = result[3].length === 2 ? result[3] : result[3] + result[3];
	        colorObj = {
	          r: parseInt(r, 16),
	          g: parseInt(g, 16),
	          b: parseInt(b, 16),
	          a: 1
	        };
	      }
	    }
	    if (color[0] !== '#') {
	      isRgb = color[0] === 'r' && color[1] === 'g' && color[2] === 'b';
	      if (isRgb) {
	        rgbColor = color;
	      }
	      if (!isRgb) {
	        rgbColor = !this.shortColors[color] ? (this.div.style.color = color, this.computedStyle(this.div).color) : this.shortColors[color];
	      }
	      regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),';
	      regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$';
	      result = new RegExp(regexString1 + regexString2, 'gi').exec(rgbColor);
	      colorObj = {};
	      alpha = parseFloat(result[4] || 1);
	      if (result) {
	        colorObj = {
	          r: parseInt(result[1], 10),
	          g: parseInt(result[2], 10),
	          b: parseInt(result[3], 10),
	          a: (alpha != null) && !isNaN(alpha) ? alpha : 1
	        };
	      }
	    }
	    return colorObj;
	  };

	  Helpers.prototype.computedStyle = function(el) {
	    return getComputedStyle(el);
	  };

	  Helpers.prototype.capitalize = function(str) {
	    if (typeof str !== 'string') {
	      throw Error('String expected - nothing to capitalize');
	    }
	    return str.charAt(0).toUpperCase() + str.substring(1);
	  };

	  Helpers.prototype.parseRand = function(string) {
	    var rand, randArr, units;
	    randArr = string.split(/rand\(|\,|\)/);
	    units = this.parseUnit(randArr[2]);
	    rand = this.rand(parseFloat(randArr[1]), parseFloat(randArr[2]));
	    if (units.unit && randArr[2].match(units.unit)) {
	      return rand + units.unit;
	    } else {
	      return rand;
	    }
	  };

	  Helpers.prototype.parseStagger = function(string, index) {
	    var base, number, splittedValue, unit, unitValue, value;
	    value = string.split(/stagger\(|\)$/)[1].toLowerCase();
	    splittedValue = value.split(/(rand\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/gim);
	    value = splittedValue.length > 3 ? (base = this.parseUnit(this.parseIfRand(splittedValue[1])), splittedValue[3]) : (base = this.parseUnit(0), splittedValue[1]);
	    value = this.parseIfRand(value);
	    unitValue = this.parseUnit(value);
	    number = index * unitValue.value + base.value;
	    unit = base.isStrict ? base.unit : unitValue.isStrict ? unitValue.unit : '';
	    if (unit) {
	      return "" + number + unit;
	    } else {
	      return number;
	    }
	  };

	  Helpers.prototype.parseIfStagger = function(value, i) {
	    if (!(typeof value === 'string' && value.match(/stagger/g))) {
	      return value;
	    } else {
	      return this.parseStagger(value, i);
	    }
	  };

	  Helpers.prototype.parseIfRand = function(str) {
	    if (typeof str === 'string' && str.match(/rand\(/)) {
	      return this.parseRand(str);
	    } else {
	      return str;
	    }
	  };

	  Helpers.prototype.parseDelta = function(key, value, index) {
	    var delta, end, endArr, endColorObj, i, j, len1, start, startArr, startColorObj;
	    start = Object.keys(value)[0];
	    end = value[start];
	    delta = {
	      start: start
	    };
	    if (isNaN(parseFloat(start)) && !start.match(/rand\(/) && !start.match(/stagger\(/)) {
	      if (key === 'strokeLinecap') {
	        this.warn("Sorry, stroke-linecap property is not animatable yet, using the start(" + start + ") value instead", value);
	        return delta;
	      }
	      startColorObj = this.makeColorObj(start);
	      endColorObj = this.makeColorObj(end);
	      delta = {
	        start: startColorObj,
	        end: endColorObj,
	        type: 'color',
	        delta: {
	          r: endColorObj.r - startColorObj.r,
	          g: endColorObj.g - startColorObj.g,
	          b: endColorObj.b - startColorObj.b,
	          a: endColorObj.a - startColorObj.a
	        }
	      };
	    } else if (key === 'strokeDasharray' || key === 'strokeDashoffset') {
	      startArr = this.strToArr(start);
	      endArr = this.strToArr(end);
	      this.normDashArrays(startArr, endArr);
	      for (i = j = 0, len1 = startArr.length; j < len1; i = ++j) {
	        start = startArr[i];
	        end = endArr[i];
	        this.mergeUnits(start, end, key);
	      }
	      delta = {
	        start: startArr,
	        end: endArr,
	        delta: this.calcArrDelta(startArr, endArr),
	        type: 'array'
	      };
	    } else {
	      if (!this.callbacksMap[key] && !this.tweenOptionMap[key]) {
	        if (this.unitOptionMap[key]) {
	          end = this.parseUnit(this.parseStringOption(end, index));
	          start = this.parseUnit(this.parseStringOption(start, index));
	          this.mergeUnits(start, end, key);
	          delta = {
	            start: start,
	            end: end,
	            delta: end.value - start.value,
	            type: 'unit'
	          };
	        } else {
	          end = parseFloat(this.parseStringOption(end, index));
	          start = parseFloat(this.parseStringOption(start, index));
	          delta = {
	            start: start,
	            end: end,
	            delta: end - start,
	            type: 'number'
	          };
	        }
	      }
	    }
	    return delta;
	  };

	  Helpers.prototype.mergeUnits = function(start, end, key) {
	    if (!end.isStrict && start.isStrict) {
	      end.unit = start.unit;
	      return end.string = "" + end.value + end.unit;
	    } else if (end.isStrict && !start.isStrict) {
	      start.unit = end.unit;
	      return start.string = "" + start.value + start.unit;
	    } else if (end.isStrict && start.isStrict) {
	      if (end.unit !== start.unit) {
	        start.unit = end.unit;
	        start.string = "" + start.value + start.unit;
	        return this.warn("Two different units were specified on \"" + key + "\" delta property, mo · js will fallback to end \"" + end.unit + "\" unit ");
	      }
	    }
	  };

	  Helpers.prototype.rand = function(min, max) {
	    return (Math.random() * (max - min)) + min;
	  };

	  Helpers.prototype.isDOM = function(o) {
	    var isNode;
	    if (o == null) {
	      return false;
	    }
	    isNode = typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
	    return typeof o === 'object' && isNode;
	  };

	  Helpers.prototype.getChildElements = function(element) {
	    var childNodes, children, i;
	    childNodes = element.childNodes;
	    children = [];
	    i = childNodes.length;
	    while (i--) {
	      if (childNodes[i].nodeType === 1) {
	        children.unshift(childNodes[i]);
	      }
	    }
	    return children;
	  };

	  Helpers.prototype.delta = function(start, end) {
	    var isType1, isType2, obj, type1, type2;
	    type1 = typeof start;
	    type2 = typeof end;
	    isType1 = type1 === 'string' || type1 === 'number' && !isNaN(start);
	    isType2 = type2 === 'string' || type2 === 'number' && !isNaN(end);
	    if (!isType1 || !isType2) {
	      this.error("delta method expects Strings or Numbers at input but got - " + start + ", " + end);
	      return;
	    }
	    obj = {};
	    obj[start] = end;
	    return obj;
	  };

	  Helpers.prototype.getUniqID = function() {
	    return ++this.uniqIDs;
	  };

	  Helpers.prototype.parsePath = function(path) {
	    var domPath;
	    if (typeof path === 'string') {
	      if (path.charAt(0).toLowerCase() === 'm') {
	        domPath = document.createElementNS(this.NS, 'path');
	        domPath.setAttributeNS(null, 'd', path);
	        return domPath;
	      } else {
	        return document.querySelector(path);
	      }
	    }
	    if (path.style) {
	      return path;
	    }
	  };

	  Helpers.prototype.closeEnough = function(num1, num2, eps) {
	    return Math.abs(num1 - num2) < eps;
	  };

	  Helpers.prototype.checkIf3d = function() {
	    var div, prefixed, style, tr;
	    div = document.createElement('div');
	    this.style(div, 'transform', 'translateZ(0)');
	    style = div.style;
	    prefixed = this.prefix.css + "transform";
	    tr = style[prefixed] != null ? style[prefixed] : style.transform;
	    return tr !== '';
	  };


	  /*
	    Method to check if variable holds pointer to an object.
	    @param {Any} Variable to test
	    @returns {Boolean} If variable is object.
	   */

	  Helpers.prototype.isObject = function(variable) {
	    return variable !== null && typeof variable === 'object';
	  };


	  /*
	    Method to get first value of the object.
	    Used to get end value on ∆'s.
	    @param {Object} Object to get the value of.
	    @returns {Any} The value of the first object' property.
	   */

	  Helpers.prototype.getDeltaEnd = function(obj) {
	    var key;
	    key = Object.keys(obj)[0];
	    return obj[key];
	  };


	  /*
	    Method to check if propery exists in callbacksMap or tweenOptionMap.
	    @param {String} Property name to check for
	    @returns {Boolean} If property is tween property.
	   */

	  Helpers.prototype.isTweenProp = function(keyName) {
	    return this.tweenOptionMap[keyName] || this.callbacksMap[keyName];
	  };


	  /*
	    Method to parse string property value
	    which can include both `rand` and `stagger `
	    value in various positions.
	    @param {String} Property name to check for.
	    @param {Number} Optional index for stagger.
	    @returns {Number} Parsed option value.
	   */

	  Helpers.prototype.parseStringOption = function(value, index) {
	    if (index == null) {
	      index = 0;
	    }
	    if (typeof value === 'string') {
	      value = this.parseIfStagger(value, index);
	      value = this.parseIfRand(value);
	    }
	    return value;
	  };

	  return Helpers;

	})();

	h = new Helpers;

	module.exports = h;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Bit, BitsMap, Circle, Cross, Equal, Line, Polygon, Rect, Zigzag, h;

	Bit = __webpack_require__(26);

	Circle = __webpack_require__(35);

	Line = __webpack_require__(36);

	Zigzag = __webpack_require__(37);

	Rect = __webpack_require__(38);

	Polygon = __webpack_require__(39);

	Cross = __webpack_require__(40);

	Equal = __webpack_require__(41);

	h = __webpack_require__(16);

	BitsMap = (function() {
	  function BitsMap() {}

	  BitsMap.prototype.bit = Bit;

	  BitsMap.prototype.circle = Circle;

	  BitsMap.prototype.line = Line;

	  BitsMap.prototype.zigzag = Zigzag;

	  BitsMap.prototype.rect = Rect;

	  BitsMap.prototype.polygon = Polygon;

	  BitsMap.prototype.cross = Cross;

	  BitsMap.prototype.equal = Equal;

	  BitsMap.prototype.getShape = function(name) {
	    return this[name] || h.error("no \"" + name + "\" shape available yet, please choose from this list:", this);
	  };

	  return BitsMap;

	})();

	module.exports = new BitsMap;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var MotionPath, Timeline, Tween, h, resize,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	h = __webpack_require__(16);

	resize = __webpack_require__(45);

	Tween = __webpack_require__(2)["default"];

	Timeline = __webpack_require__(8)["default"];

	MotionPath = (function() {
	  MotionPath.prototype.defaults = {
	    path: null,
	    curvature: {
	      x: '75%',
	      y: '50%'
	    },
	    isCompositeLayer: true,
	    delay: 0,
	    duration: 1000,
	    easing: null,
	    repeat: 0,
	    yoyo: false,
	    onStart: null,
	    onComplete: null,
	    onUpdate: null,
	    offsetX: 0,
	    offsetY: 0,
	    angleOffset: null,
	    pathStart: 0,
	    pathEnd: 1,
	    motionBlur: 0,
	    transformOrigin: null,
	    isAngle: false,
	    isReverse: false,
	    isRunLess: false,
	    isPresetPosition: true
	  };

	  function MotionPath(o1) {
	    this.o = o1 != null ? o1 : {};
	    this.calcHeight = bind(this.calcHeight, this);
	    if (this.vars()) {
	      return;
	    }
	    this.createTween();
	    this;
	  }

	  MotionPath.prototype.vars = function() {
	    this.getScaler = h.bind(this.getScaler, this);
	    this.resize = resize;
	    this.props = h.cloneObj(this.defaults);
	    this.extendOptions(this.o);
	    this.isMotionBlurReset = h.isSafari || h.isIE;
	    this.isMotionBlurReset && (this.props.motionBlur = 0);
	    this.history = [h.cloneObj(this.props)];
	    return this.postVars();
	  };

	  MotionPath.prototype.curveToPath = function(o) {
	    var angle, curvature, curvatureX, curvatureY, curvePoint, curveXPoint, dX, dY, endPoint, path, percent, radius, start;
	    path = document.createElementNS(h.NS, 'path');
	    start = o.start;
	    endPoint = {
	      x: start.x + o.shift.x,
	      y: start.x + o.shift.y
	    };
	    curvature = o.curvature;
	    dX = o.shift.x;
	    dY = o.shift.y;
	    radius = Math.sqrt(dX * dX + dY * dY);
	    percent = radius / 100;
	    angle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
	    if (o.shift.x < 0) {
	      angle = angle + 180;
	    }
	    curvatureX = h.parseUnit(curvature.x);
	    curvatureX = curvatureX.unit === '%' ? curvatureX.value * percent : curvatureX.value;
	    curveXPoint = h.getRadialPoint({
	      center: {
	        x: start.x,
	        y: start.y
	      },
	      radius: curvatureX,
	      angle: angle
	    });
	    curvatureY = h.parseUnit(curvature.y);
	    curvatureY = curvatureY.unit === '%' ? curvatureY.value * percent : curvatureY.value;
	    curvePoint = h.getRadialPoint({
	      center: {
	        x: curveXPoint.x,
	        y: curveXPoint.y
	      },
	      radius: curvatureY,
	      angle: angle + 90
	    });
	    path.setAttribute('d', "M" + start.x + "," + start.y + " Q" + curvePoint.x + "," + curvePoint.y + " " + endPoint.x + "," + endPoint.y);
	    return path;
	  };

	  MotionPath.prototype.postVars = function() {
	    this.props.pathStart = h.clamp(this.props.pathStart, 0, 1);
	    this.props.pathEnd = h.clamp(this.props.pathEnd, this.props.pathStart, 1);
	    this.angle = 0;
	    this.speedX = 0;
	    this.speedY = 0;
	    this.blurX = 0;
	    this.blurY = 0;
	    this.prevCoords = {};
	    this.blurAmount = 20;
	    this.props.motionBlur = h.clamp(this.props.motionBlur, 0, 1);
	    this.onUpdate = this.props.onUpdate;
	    if (!this.o.el) {
	      h.error('Missed "el" option. It could be a selector, DOMNode or another module.');
	      return true;
	    }
	    this.el = this.parseEl(this.props.el);
	    this.props.motionBlur > 0 && this.createFilter();
	    this.path = this.getPath();
	    if (!this.path.getAttribute('d')) {
	      h.error('Path has no coordinates to work with, aborting');
	      return true;
	    }
	    this.len = this.path.getTotalLength();
	    this.slicedLen = this.len * (this.props.pathEnd - this.props.pathStart);
	    this.startLen = this.props.pathStart * this.len;
	    this.fill = this.props.fill;
	    if (this.fill != null) {
	      this.container = this.parseEl(this.props.fill.container);
	      this.fillRule = this.props.fill.fillRule || 'all';
	      this.getScaler();
	      if (this.container != null) {
	        this.removeEvent(this.container, 'onresize', this.getScaler);
	        return this.addEvent(this.container, 'onresize', this.getScaler);
	      }
	    }
	  };

	  MotionPath.prototype.addEvent = function(el, type, handler) {
	    return el.addEventListener(type, handler, false);
	  };

	  MotionPath.prototype.removeEvent = function(el, type, handler) {
	    return el.removeEventListener(type, handler, false);
	  };

	  MotionPath.prototype.createFilter = function() {
	    var div, svg;
	    div = document.createElement('div');
	    this.filterID = "filter-" + (h.getUniqID());
	    div.innerHTML = "<svg id=\"svg-" + this.filterID + "\"\n    style=\"visibility:hidden; width:0px; height:0px\">\n  <filter id=\"" + this.filterID + "\" y=\"-20\" x=\"-20\" width=\"40\" height=\"40\">\n    <feOffset\n      id=\"blur-offset\" in=\"SourceGraphic\"\n      dx=\"0\" dy=\"0\" result=\"offset2\"></feOffset>\n    <feGaussianblur\n      id=\"blur\" in=\"offset2\"\n      stdDeviation=\"0,0\" result=\"blur2\"></feGaussianblur>\n    <feMerge>\n      <feMergeNode in=\"SourceGraphic\"></feMergeNode>\n      <feMergeNode in=\"blur2\"></feMergeNode>\n    </feMerge>\n  </filter>\n</svg>";
	    svg = div.querySelector("#svg-" + this.filterID);
	    this.filter = svg.querySelector('#blur');
	    this.filterOffset = svg.querySelector('#blur-offset');
	    document.body.insertBefore(svg, document.body.firstChild);
	    this.el.style['filter'] = "url(#" + this.filterID + ")";
	    return this.el.style[h.prefix.css + "filter"] = "url(#" + this.filterID + ")";
	  };

	  MotionPath.prototype.parseEl = function(el) {
	    if (typeof el === 'string') {
	      return document.querySelector(el);
	    }
	    if (el instanceof HTMLElement) {
	      return el;
	    }
	    if (el._setProp != null) {
	      this.isModule = true;
	      return el;
	    }
	  };

	  MotionPath.prototype.getPath = function() {
	    var path;
	    path = h.parsePath(this.props.path);
	    if (path) {
	      return path;
	    }
	    if (this.props.path.x || this.props.path.y) {
	      return this.curveToPath({
	        start: {
	          x: 0,
	          y: 0
	        },
	        shift: {
	          x: this.props.path.x || 0,
	          y: this.props.path.y || 0
	        },
	        curvature: {
	          x: this.props.curvature.x || this.defaults.curvature.x,
	          y: this.props.curvature.y || this.defaults.curvature.y
	        }
	      });
	    }
	  };

	  MotionPath.prototype.getScaler = function() {
	    var end, size, start;
	    this.cSize = {
	      width: this.container.offsetWidth || 0,
	      height: this.container.offsetHeight || 0
	    };
	    start = this.path.getPointAtLength(0);
	    end = this.path.getPointAtLength(this.len);
	    size = {};
	    this.scaler = {};
	    size.width = end.x >= start.x ? end.x - start.x : start.x - end.x;
	    size.height = end.y >= start.y ? end.y - start.y : start.y - end.y;
	    switch (this.fillRule) {
	      case 'all':
	        this.calcWidth(size);
	        return this.calcHeight(size);
	      case 'width':
	        this.calcWidth(size);
	        return this.scaler.y = this.scaler.x;
	      case 'height':
	        this.calcHeight(size);
	        return this.scaler.x = this.scaler.y;
	    }
	  };

	  MotionPath.prototype.calcWidth = function(size) {
	    this.scaler.x = this.cSize.width / size.width;
	    return !isFinite(this.scaler.x) && (this.scaler.x = 1);
	  };

	  MotionPath.prototype.calcHeight = function(size) {
	    this.scaler.y = this.cSize.height / size.height;
	    return !isFinite(this.scaler.y) && (this.scaler.y = 1);
	  };

	  MotionPath.prototype.run = function(o) {
	    var fistItem, key, value;
	    if (o) {
	      fistItem = this.history[0];
	      for (key in o) {
	        value = o[key];
	        if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
	          h.warn("the property \"" + key + "\" property can not be overridden on run yet");
	          delete o[key];
	        } else {
	          this.history[0][key] = value;
	        }
	      }
	      this.tuneOptions(o);
	    }
	    return this.startTween();
	  };

	  MotionPath.prototype.createTween = function() {
	    this.tween = new Tween({
	      duration: this.props.duration,
	      delay: this.props.delay,
	      yoyo: this.props.yoyo,
	      repeat: this.props.repeat,
	      easing: this.props.easing,
	      onStart: (function(_this) {
	        return function() {
	          var ref;
	          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          var ref;
	          _this.props.motionBlur && _this.setBlur({
	            blur: {
	              x: 0,
	              y: 0
	            },
	            offset: {
	              x: 0,
	              y: 0
	            }
	          });
	          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	        };
	      })(this),
	      onUpdate: (function(_this) {
	        return function(p) {
	          return _this.setProgress(p);
	        };
	      })(this),
	      onFirstUpdate: (function(_this) {
	        return function(isForward, isYoyo) {
	          if (!isForward) {
	            return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
	          }
	        };
	      })(this)
	    });
	    this.timeline = new Timeline;
	    this.timeline.add(this.tween);
	    !this.props.isRunLess && this.startTween();
	    return this.props.isPresetPosition && this.setProgress(0, true);
	  };

	  MotionPath.prototype.startTween = function() {
	    return setTimeout(((function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.timeline) != null ? ref.play() : void 0;
	      };
	    })(this)), 1);
	  };

	  MotionPath.prototype.setProgress = function(p, isInit) {
	    var len, point, x, y;
	    len = this.startLen + (!this.props.isReverse ? p * this.slicedLen : (1 - p) * this.slicedLen);
	    point = this.path.getPointAtLength(len);
	    x = point.x + this.props.offsetX;
	    y = point.y + this.props.offsetY;
	    this._getCurrentAngle(point, len, p);
	    this._setTransformOrigin(p);
	    this._setTransform(x, y, p, isInit);
	    return this.props.motionBlur && this.makeMotionBlur(x, y);
	  };

	  MotionPath.prototype.setElPosition = function(x, y, p) {
	    var composite, isComposite, rotate, transform;
	    rotate = this.angle !== 0 ? "rotate(" + this.angle + "deg)" : '';
	    isComposite = this.props.isCompositeLayer && h.is3d;
	    composite = isComposite ? 'translateZ(0)' : '';
	    transform = "translate(" + x + "px," + y + "px) " + rotate + " " + composite;
	    return h.setPrefixedStyle(this.el, 'transform', transform);
	  };

	  MotionPath.prototype.setModulePosition = function(x, y) {
	    this.el._setProp({
	      shiftX: x + "px",
	      shiftY: y + "px",
	      angle: this.angle
	    });
	    return this.el._draw();
	  };

	  MotionPath.prototype._getCurrentAngle = function(point, len, p) {
	    var atan, isTransformFunOrigin, prevPoint, x1, x2;
	    isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
	    if (this.props.isAngle || (this.props.angleOffset != null) || isTransformFunOrigin) {
	      prevPoint = this.path.getPointAtLength(len - 1);
	      x1 = point.y - prevPoint.y;
	      x2 = point.x - prevPoint.x;
	      atan = Math.atan(x1 / x2);
	      !isFinite(atan) && (atan = 0);
	      this.angle = atan * h.RAD_TO_DEG;
	      if ((typeof this.props.angleOffset) !== 'function') {
	        return this.angle += this.props.angleOffset || 0;
	      } else {
	        return this.angle = this.props.angleOffset.call(this, this.angle, p);
	      }
	    } else {
	      return this.angle = 0;
	    }
	  };

	  MotionPath.prototype._setTransform = function(x, y, p, isInit) {
	    var transform;
	    if (this.scaler) {
	      x *= this.scaler.x;
	      y *= this.scaler.y;
	    }
	    transform = null;
	    if (!isInit) {
	      transform = typeof this.onUpdate === "function" ? this.onUpdate(p, {
	        x: x,
	        y: y,
	        angle: this.angle
	      }) : void 0;
	    }
	    if (this.isModule) {
	      return this.setModulePosition(x, y);
	    } else {
	      if (typeof transform !== 'string') {
	        return this.setElPosition(x, y, p);
	      } else {
	        return h.setPrefixedStyle(this.el, 'transform', transform);
	      }
	    }
	  };

	  MotionPath.prototype._setTransformOrigin = function(p) {
	    var isTransformFunOrigin, tOrigin;
	    if (this.props.transformOrigin) {
	      isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
	      tOrigin = !isTransformFunOrigin ? this.props.transformOrigin : this.props.transformOrigin(this.angle, p);
	      return h.setPrefixedStyle(this.el, 'transform-origin', tOrigin);
	    }
	  };

	  MotionPath.prototype.makeMotionBlur = function(x, y) {
	    var absoluteAngle, coords, dX, dY, signX, signY, tailAngle;
	    tailAngle = 0;
	    signX = 1;
	    signY = 1;
	    if ((this.prevCoords.x == null) || (this.prevCoords.y == null)) {
	      this.speedX = 0;
	      this.speedY = 0;
	    } else {
	      dX = x - this.prevCoords.x;
	      dY = y - this.prevCoords.y;
	      if (dX > 0) {
	        signX = -1;
	      }
	      if (signX < 0) {
	        signY = -1;
	      }
	      this.speedX = Math.abs(dX);
	      this.speedY = Math.abs(dY);
	      tailAngle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
	    }
	    absoluteAngle = tailAngle - this.angle;
	    coords = this.angToCoords(absoluteAngle);
	    this.blurX = h.clamp((this.speedX / 16) * this.props.motionBlur, 0, 1);
	    this.blurY = h.clamp((this.speedY / 16) * this.props.motionBlur, 0, 1);
	    this.setBlur({
	      blur: {
	        x: 3 * this.blurX * this.blurAmount * Math.abs(coords.x),
	        y: 3 * this.blurY * this.blurAmount * Math.abs(coords.y)
	      },
	      offset: {
	        x: 3 * signX * this.blurX * coords.x * this.blurAmount,
	        y: 3 * signY * this.blurY * coords.y * this.blurAmount
	      }
	    });
	    this.prevCoords.x = x;
	    return this.prevCoords.y = y;
	  };

	  MotionPath.prototype.setBlur = function(o) {
	    if (!this.isMotionBlurReset) {
	      this.filter.setAttribute('stdDeviation', o.blur.x + "," + o.blur.y);
	      this.filterOffset.setAttribute('dx', o.offset.x);
	      return this.filterOffset.setAttribute('dy', o.offset.y);
	    }
	  };

	  MotionPath.prototype.extendDefaults = function(o) {
	    var key, results, value;
	    results = [];
	    for (key in o) {
	      value = o[key];
	      results.push(this[key] = value);
	    }
	    return results;
	  };

	  MotionPath.prototype.extendOptions = function(o) {
	    var key, results, value;
	    results = [];
	    for (key in o) {
	      value = o[key];
	      results.push(this.props[key] = value);
	    }
	    return results;
	  };

	  MotionPath.prototype.then = function(o) {
	    var it, key, opts, prevOptions, value;
	    prevOptions = this.history[this.history.length - 1];
	    opts = {};
	    for (key in prevOptions) {
	      value = prevOptions[key];
	      if (!h.callbacksMap[key] && !h.tweenOptionMap[key] || key === 'duration') {
	        if (o[key] == null) {
	          o[key] = value;
	        }
	      } else {
	        if (o[key] == null) {
	          o[key] = void 0;
	        }
	      }
	      if (h.tweenOptionMap[key]) {
	        opts[key] = key !== 'duration' ? o[key] : o[key] != null ? o[key] : prevOptions[key];
	      }
	    }
	    this.history.push(o);
	    it = this;
	    opts.onUpdate = (function(_this) {
	      return function(p) {
	        return _this.setProgress(p);
	      };
	    })(this);
	    opts.onStart = (function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	      };
	    })(this);
	    opts.onComplete = (function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	      };
	    })(this);
	    opts.onFirstUpdate = function() {
	      return it.tuneOptions(it.history[this.index]);
	    };
	    opts.isChained = !o.delay;
	    this.timeline.append(new Tween(opts));
	    return this;
	  };

	  MotionPath.prototype.tuneOptions = function(o) {
	    this.extendOptions(o);
	    return this.postVars();
	  };

	  MotionPath.prototype.angToCoords = function(angle) {
	    var radAngle, x, y;
	    angle = angle % 360;
	    radAngle = ((angle - 90) * Math.PI) / 180;
	    x = Math.cos(radAngle);
	    y = Math.sin(radAngle);
	    x = x < 0 ? Math.max(x, -0.7) : Math.min(x, .7);
	    y = y < 0 ? Math.max(y, -0.7) : Math.min(y, .7);
	    return {
	      x: x * 1.428571429,
	      y: y * 1.428571429
	    };
	  };

	  return MotionPath;

	})();

	module.exports = MotionPath;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Easing, PathEasing, bezier, easing, h, mix;

	bezier = __webpack_require__(42);

	PathEasing = __webpack_require__(43);

	mix = __webpack_require__(44);

	h = __webpack_require__(16);

	Easing = (function() {
	  function Easing() {}

	  Easing.prototype.bezier = bezier;

	  Easing.prototype.PathEasing = PathEasing;

	  Easing.prototype.path = (new PathEasing('creator')).create;

	  Easing.prototype.inverse = function(p) {
	    return 1 - p;
	  };

	  Easing.prototype.linear = {
	    none: function(k) {
	      return k;
	    }
	  };

	  Easing.prototype.ease = {
	    "in": bezier.apply(Easing, [0.42, 0, 1, 1]),
	    out: bezier.apply(Easing, [0, 0, 0.58, 1]),
	    inout: bezier.apply(Easing, [0.42, 0, 0.58, 1])
	  };

	  Easing.prototype.quad = {
	    "in": function(k) {
	      return k * k;
	    },
	    out: function(k) {
	      return k * (2 - k);
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k;
	      }
	      return -0.5 * (--k * (k - 2) - 1);
	    }
	  };

	  Easing.prototype.cubic = {
	    "in": function(k) {
	      return k * k * k;
	    },
	    out: function(k) {
	      return --k * k * k + 1;
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k;
	      }
	      return 0.5 * ((k -= 2) * k * k + 2);
	    }
	  };

	  Easing.prototype.quart = {
	    "in": function(k) {
	      return k * k * k * k;
	    },
	    out: function(k) {
	      return 1 - (--k * k * k * k);
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k * k;
	      }
	      return -0.5 * ((k -= 2) * k * k * k - 2);
	    }
	  };

	  Easing.prototype.quint = {
	    "in": function(k) {
	      return k * k * k * k * k;
	    },
	    out: function(k) {
	      return --k * k * k * k * k + 1;
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k * k * k;
	      }
	      return 0.5 * ((k -= 2) * k * k * k * k + 2);
	    }
	  };

	  Easing.prototype.sin = {
	    "in": function(k) {
	      return 1 - Math.cos(k * Math.PI / 2);
	    },
	    out: function(k) {
	      return Math.sin(k * Math.PI / 2);
	    },
	    inout: function(k) {
	      return 0.5 * (1 - Math.cos(Math.PI * k));
	    }
	  };

	  Easing.prototype.expo = {
	    "in": function(k) {
	      if (k === 0) {
	        return 0;
	      } else {
	        return Math.pow(1024, k - 1);
	      }
	    },
	    out: function(k) {
	      if (k === 1) {
	        return 1;
	      } else {
	        return 1 - Math.pow(2, -10 * k);
	      }
	    },
	    inout: function(k) {
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      if ((k *= 2) < 1) {
	        return 0.5 * Math.pow(1024, k - 1);
	      }
	      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
	    }
	  };

	  Easing.prototype.circ = {
	    "in": function(k) {
	      return 1 - Math.sqrt(1 - k * k);
	    },
	    out: function(k) {
	      return Math.sqrt(1 - (--k * k));
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return -0.5 * (Math.sqrt(1 - k * k) - 1);
	      }
	      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	    }
	  };

	  Easing.prototype.back = {
	    "in": function(k) {
	      var s;
	      s = 1.70158;
	      return k * k * ((s + 1) * k - s);
	    },
	    out: function(k) {
	      var s;
	      s = 1.70158;
	      return --k * k * ((s + 1) * k + s) + 1;
	    },
	    inout: function(k) {
	      var s;
	      s = 1.70158 * 1.525;
	      if ((k *= 2) < 1) {
	        return 0.5 * (k * k * ((s + 1) * k - s));
	      }
	      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	    }
	  };

	  Easing.prototype.elastic = {
	    "in": function(k) {
	      var a, p, s;
	      s = void 0;
	      p = 0.4;
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      a = 1;
	      s = p / 4;
	      return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	    },
	    out: function(k) {
	      var a, p, s;
	      s = void 0;
	      p = 0.4;
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      a = 1;
	      s = p / 4;
	      return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
	    },
	    inout: function(k) {
	      var a, p, s;
	      s = void 0;
	      p = 0.4;
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      a = 1;
	      s = p / 4;
	      if ((k *= 2) < 1) {
	        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	      }
	      return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	    }
	  };

	  Easing.prototype.bounce = {
	    "in": function(k) {
	      return 1 - easing.bounce.out(1 - k);
	    },
	    out: function(k) {
	      if (k < (1 / 2.75)) {
	        return 7.5625 * k * k;
	      } else if (k < (2 / 2.75)) {
	        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
	      } else if (k < (2.5 / 2.75)) {
	        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
	      } else {
	        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
	      }
	    },
	    inout: function(k) {
	      if (k < 0.5) {
	        return easing.bounce["in"](k * 2) * 0.5;
	      }
	      return easing.bounce.out(k * 2 - 1) * 0.5 + 0.5;
	    }
	  };

	  Easing.prototype.parseEasing = function(easing) {
	    var easingParent, type;
	    if (easing == null) {
	      easing = 'linear.none';
	    }
	    type = typeof easing;
	    if (type === 'string') {
	      if (easing.charAt(0).toLowerCase() === 'm') {
	        return this.path(easing);
	      } else {
	        easing = this._splitEasing(easing);
	        easingParent = this[easing[0]];
	        if (!easingParent) {
	          h.error("Easing with name \"" + easing[0] + "\" was not found, fallback to \"linear.none\" instead");
	          return this['linear']['none'];
	        }
	        return easingParent[easing[1]];
	      }
	    }
	    if (h.isArray(easing)) {
	      return this.bezier.apply(this, easing);
	    }
	    if ('function') {
	      return easing;
	    }
	  };

	  Easing.prototype._splitEasing = function(string) {
	    var firstPart, secondPart, split;
	    if (typeof string === 'function') {
	      return string;
	    }
	    if (typeof string === 'string' && string.length) {
	      split = string.split('.');
	      firstPart = split[0].toLowerCase() || 'linear';
	      secondPart = split[1].toLowerCase() || 'none';
	      return [firstPart, secondPart];
	    } else {
	      return ['linear', 'none'];
	    }
	  };

	  return Easing;

	})();

	easing = new Easing;

	easing.mix = mix(easing);

	module.exports = easing;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(46);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(47);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(15);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(15);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _getPrototypeOf = __webpack_require__(27);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _getOwnPropertyDescriptor = __webpack_require__(48);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

	  if (desc === undefined) {
	    var parent = (0, _getPrototypeOf2.default)(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(49);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(50);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Bit, h;

	h = __webpack_require__(16);

	Bit = (function() {
	  Bit.prototype.ns = 'http://www.w3.org/2000/svg';

	  Bit.prototype.shape = 'line';

	  Bit.prototype.ratio = 1;

	  Bit.prototype.defaults = {
	    radius: 50,
	    radiusX: void 0,
	    radiusY: void 0,
	    points: 3,
	    x: 0,
	    y: 0,
	    rx: 0,
	    ry: 0,
	    angle: 0,
	    stroke: 'hotpink',
	    'stroke-width': 2,
	    'stroke-opacity': 1,
	    fill: 'transparent',
	    'fill-opacity': 1,
	    'stroke-dasharray': '',
	    'stroke-dashoffset': '',
	    'stroke-linecap': ''
	  };

	  function Bit(o) {
	    this.o = o != null ? o : {};
	    this.vars();
	    this.render();
	    this;
	  }

	  Bit.prototype.vars = function() {
	    if (this.o.ctx && this.o.ctx.tagName === 'svg') {
	      this.ctx = this.o.ctx;
	    } else if (!this.o.el) {
	      h.error('You should pass a real context(ctx) to the bit');
	    }
	    this.state = {};
	    this.drawMapLength = this.drawMap.length;
	    this.extendDefaults();
	    return this.calcTransform();
	  };

	  Bit.prototype.calcTransform = function() {
	    var rotate;
	    rotate = "rotate(" + this.props.angle + ", " + this.props.x + ", " + this.props.y + ")";
	    return this.props.transform = "" + rotate;
	  };

	  Bit.prototype.extendDefaults = function() {
	    var key, ref, results, value;
	    if (this.props == null) {
	      this.props = {};
	    }
	    ref = this.defaults;
	    results = [];
	    for (key in ref) {
	      value = ref[key];
	      results.push(this.props[key] = this.o[key] != null ? this.o[key] : value);
	    }
	    return results;
	  };

	  Bit.prototype.setAttr = function(attr, value) {
	    var el, key, keys, len, results, val;
	    if (typeof attr === 'object') {
	      keys = Object.keys(attr);
	      len = keys.length;
	      el = value || this.el;
	      results = [];
	      while (len--) {
	        key = keys[len];
	        val = attr[key];
	        results.push(el.setAttribute(key, val));
	      }
	      return results;
	    } else {
	      return this.el.setAttribute(attr, value);
	    }
	  };

	  Bit.prototype.setProp = function(attr, value) {
	    var key, results, val;
	    if (typeof attr === 'object') {
	      results = [];
	      for (key in attr) {
	        val = attr[key];
	        results.push(this.props[key] = val);
	      }
	      return results;
	    } else {
	      return this.props[attr] = value;
	    }
	  };

	  Bit.prototype.render = function() {
	    this.isRendered = true;
	    if (this.o.el != null) {
	      this.el = this.o.el;
	      return this.isForeign = true;
	    } else {
	      this.el = document.createElementNS(this.ns, this.shape || 'line');
	      !this.o.isDrawLess && this.draw();
	      return this.ctx.appendChild(this.el);
	    }
	  };

	  Bit.prototype.drawMap = ['stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill', 'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform'];

	  Bit.prototype.draw = function() {
	    var len, name;
	    this.props.length = this.getLength();
	    len = this.drawMapLength;
	    while (len--) {
	      name = this.drawMap[len];
	      switch (name) {
	        case 'stroke-dasharray':
	        case 'stroke-dashoffset':
	          this.castStrokeDash(name);
	      }
	      this.setAttrsIfChanged(name, this.props[name]);
	    }
	    return this.state.radius = this.props.radius;
	  };

	  Bit.prototype.castStrokeDash = function(name) {
	    var cast, dash, i, j, len1, ref, stroke;
	    if (h.isArray(this.props[name])) {
	      stroke = '';
	      ref = this.props[name];
	      for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	        dash = ref[i];
	        cast = dash.unit === '%' ? this.castPercent(dash.value) : dash.value;
	        stroke += cast + " ";
	      }
	      this.props[name] = stroke === '0 ' ? stroke = '' : stroke;
	      return this.props[name] = stroke;
	    }
	    if (typeof this.props[name] === 'object') {
	      stroke = this.props[name].unit === '%' ? this.castPercent(this.props[name].value) : this.props[name].value;
	      return this.props[name] = stroke === 0 ? stroke = '' : stroke;
	    }
	  };

	  Bit.prototype.castPercent = function(percent) {
	    return percent * (this.props.length / 100);
	  };

	  Bit.prototype.setAttrsIfChanged = function(name, value) {
	    var key, keys, len, results;
	    if (typeof name === 'object') {
	      keys = Object.keys(name);
	      len = keys.length;
	      results = [];
	      while (len--) {
	        key = keys[len];
	        value = name[key];
	        results.push(this.setAttrIfChanged(key, value));
	      }
	      return results;
	    } else {
	      if (value == null) {
	        value = this.props[name];
	      }
	      return this.setAttrIfChanged(name, value);
	    }
	  };

	  Bit.prototype.setAttrIfChanged = function(name, value) {
	    if (this.isChanged(name, value)) {
	      this.el.setAttribute(name, value);
	      return this.state[name] = value;
	    }
	  };

	  Bit.prototype.isChanged = function(name, value) {
	    if (value == null) {
	      value = this.props[name];
	    }
	    return this.state[name] !== value;
	  };

	  Bit.prototype.getLength = function() {
	    var ref;
	    if ((((ref = this.el) != null ? ref.getTotalLength : void 0) != null) && this.el.getAttribute('d')) {
	      return this.el.getTotalLength();
	    } else {
	      return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
	    }
	  };

	  return Bit;

	})();

	module.exports = Bit;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	(function() {
	  'use strict';
	  var cancel, i, isOldBrowser, lastTime, vendors, vp, w;
	  vendors = ['webkit', 'moz'];
	  i = 0;
	  w = window;
	  while (i < vendors.length && !w.requestAnimationFrame) {
	    vp = vendors[i];
	    w.requestAnimationFrame = w[vp + 'RequestAnimationFrame'];
	    cancel = w[vp + 'CancelAnimationFrame'];
	    w.cancelAnimationFrame = cancel || w[vp + 'CancelRequestAnimationFrame'];
	    ++i;
	  }
	  isOldBrowser = !w.requestAnimationFrame || !w.cancelAnimationFrame;
	  if (/iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent) || isOldBrowser) {
	    lastTime = 0;
	    w.requestAnimationFrame = function(callback) {
	      var nextTime, now;
	      now = Date.now();
	      nextTime = Math.max(lastTime + 16, now);
	      return setTimeout((function() {
	        callback(lastTime = nextTime);
	      }), nextTime - now);
	    };
	    w.cancelAnimationFrame = clearTimeout;
	  }
	})();


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	(function(root) {
	  var offset, ref, ref1;
	  if (root.performance == null) {
	    root.performance = {};
	  }
	  Date.now = Date.now || function() {
	    return (new Date).getTime();
	  };
	  if (root.performance.now == null) {
	    offset = ((ref = root.performance) != null ? (ref1 = ref.timing) != null ? ref1.navigationStart : void 0 : void 0) ? performance.timing.navigationStart : Date.now();
	    return root.performance.now = function() {
	      return Date.now() - offset;
	    };
	  }
	})(window);


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(49);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(1), __esModule: true };

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Circle,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(26);

	Circle = (function(superClass) {
	  extend(Circle, superClass);

	  function Circle() {
	    return Circle.__super__.constructor.apply(this, arguments);
	  }

	  Circle.prototype.shape = 'ellipse';

	  Circle.prototype.draw = function() {
	    var rx, ry;
	    rx = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    ry = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    this.setAttrsIfChanged({
	      rx: rx,
	      ry: ry,
	      cx: this.props.x,
	      cy: this.props.y
	    });
	    return Circle.__super__.draw.apply(this, arguments);
	  };

	  Circle.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * Math.PI * Math.sqrt((Math.pow(radiusX, 2) + Math.pow(radiusY, 2)) / 2);
	  };

	  return Circle;

	})(Bit);

	module.exports = Circle;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Line,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(26);

	Line = (function(superClass) {
	  extend(Line, superClass);

	  function Line() {
	    return Line.__super__.constructor.apply(this, arguments);
	  }

	  Line.prototype.draw = function() {
	    var radiusX;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    this.setAttrsIfChanged({
	      x1: this.props.x - radiusX,
	      x2: this.props.x + radiusX,
	      y1: this.props.y,
	      y2: this.props.y
	    });
	    return Line.__super__.draw.apply(this, arguments);
	  };

	  return Line;

	})(Bit);

	module.exports = Line;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Zigzag,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(26);

	Zigzag = (function(superClass) {
	  extend(Zigzag, superClass);

	  function Zigzag() {
	    return Zigzag.__super__.constructor.apply(this, arguments);
	  }

	  Zigzag.prototype.shape = 'path';

	  Zigzag.prototype.ratio = 1.43;

	  Zigzag.prototype.draw = function() {
	    var char, i, iX, iX2, iY, iY2, j, points, radiusX, radiusY, ref, stepX, stepY, strokeWidth, xStart, yStart;
	    if (!this.props.points) {
	      return;
	    }
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    points = '';
	    stepX = 2 * radiusX / this.props.points;
	    stepY = 2 * radiusY / this.props.points;
	    strokeWidth = this.props['stroke-width'];
	    xStart = this.props.x - radiusX;
	    yStart = this.props.y - radiusY;
	    for (i = j = ref = this.props.points; ref <= 0 ? j < 0 : j > 0; i = ref <= 0 ? ++j : --j) {
	      iX = xStart + i * stepX + strokeWidth;
	      iY = yStart + i * stepY + strokeWidth;
	      iX2 = xStart + (i - 1) * stepX + strokeWidth;
	      iY2 = yStart + (i - 1) * stepY + strokeWidth;
	      char = i === this.props.points ? 'M' : 'L';
	      points += "" + char + iX + "," + iY + " l0, -" + stepY + " l-" + stepX + ", 0";
	    }
	    this.setAttr({
	      d: points
	    });
	    return Zigzag.__super__.draw.apply(this, arguments);
	  };

	  return Zigzag;

	})(Bit);

	module.exports = Zigzag;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Rect,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(26);

	Rect = (function(superClass) {
	  extend(Rect, superClass);

	  function Rect() {
	    return Rect.__super__.constructor.apply(this, arguments);
	  }

	  Rect.prototype.shape = 'rect';

	  Rect.prototype.ratio = 1.43;

	  Rect.prototype.draw = function() {
	    var radiusX, radiusY;
	    Rect.__super__.draw.apply(this, arguments);
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return this.setAttrsIfChanged({
	      width: 2 * radiusX,
	      height: 2 * radiusY,
	      x: this.props.x - radiusX,
	      y: this.props.y - radiusY,
	      rx: this.props.rx,
	      ry: this.props.ry
	    });
	  };

	  Rect.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * radiusX + 2 * radiusY;
	  };

	  return Rect;

	})(Bit);

	module.exports = Rect;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Polygon, h,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(26);

	h = __webpack_require__(16);

	Polygon = (function(superClass) {
	  extend(Polygon, superClass);

	  function Polygon() {
	    return Polygon.__super__.constructor.apply(this, arguments);
	  }

	  Polygon.prototype.shape = 'path';

	  Polygon.prototype.draw = function() {
	    this.drawShape();
	    return Polygon.__super__.draw.apply(this, arguments);
	  };

	  Polygon.prototype.drawShape = function() {
	    var char, d, i, j, k, len, point, ref, ref1, step;
	    step = 360 / this.props.points;
	    this.radialPoints = [];
	    for (i = j = 0, ref = this.props.points; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      this.radialPoints.push(h.getRadialPoint({
	        radius: this.props.radius,
	        radiusX: this.props.radiusX,
	        radiusY: this.props.radiusY,
	        angle: i * step,
	        center: {
	          x: this.props.x,
	          y: this.props.y
	        }
	      }));
	    }
	    d = '';
	    ref1 = this.radialPoints;
	    for (i = k = 0, len = ref1.length; k < len; i = ++k) {
	      point = ref1[i];
	      char = i === 0 ? 'M' : 'L';
	      d += "" + char + (point.x.toFixed(4)) + "," + (point.y.toFixed(4)) + " ";
	    }
	    return this.setAttr({
	      d: d += 'z'
	    });
	  };

	  Polygon.prototype.getLength = function() {
	    return this.el.getTotalLength();
	  };

	  return Polygon;

	})(Bit);

	module.exports = Polygon;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Cross,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(26);

	Cross = (function(superClass) {
	  extend(Cross, superClass);

	  function Cross() {
	    return Cross.__super__.constructor.apply(this, arguments);
	  }

	  Cross.prototype.shape = 'path';

	  Cross.prototype.draw = function() {
	    var d, line1, line2, radiusX, radiusY, x1, x2, y1, y2;
	    Cross.__super__.draw.apply(this, arguments);
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    x1 = this.props.x - radiusX;
	    x2 = this.props.x + radiusX;
	    line1 = "M" + x1 + "," + this.props.y + " L" + x2 + "," + this.props.y;
	    y1 = this.props.y - radiusY;
	    y2 = this.props.y + radiusY;
	    line2 = "M" + this.props.x + "," + y1 + " L" + this.props.x + "," + y2;
	    d = line1 + " " + line2;
	    return this.setAttr({
	      d: d
	    });
	  };

	  Cross.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * (radiusX + radiusY);
	  };

	  return Cross;

	})(Bit);

	module.exports = Cross;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Equal,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(26);

	Equal = (function(superClass) {
	  extend(Equal, superClass);

	  function Equal() {
	    return Equal.__super__.constructor.apply(this, arguments);
	  }

	  Equal.prototype.shape = 'path';

	  Equal.prototype.ratio = 1.43;

	  Equal.prototype.draw = function() {
	    var d, i, j, radiusX, radiusY, ref, x1, x2, y, yStart, yStep;
	    Equal.__super__.draw.apply(this, arguments);
	    if (!this.props.points) {
	      return;
	    }
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    x1 = this.props.x - radiusX;
	    x2 = this.props.x + radiusX;
	    d = '';
	    yStep = 2 * radiusY / (this.props.points - 1);
	    yStart = this.props.y - radiusY;
	    for (i = j = 0, ref = this.props.points; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      y = "" + (i * yStep + yStart);
	      d += "M" + x1 + ", " + y + " L" + x2 + ", " + y + " ";
	    }
	    return this.setAttr({
	      d: d
	    });
	  };

	  Equal.prototype.getLength = function() {
	    return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
	  };

	  return Equal;

	})(Bit);

	module.exports = Equal;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var BezierEasing, bezierEasing, h,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	h = __webpack_require__(16);


	/**
	 * Copyright (c) 2014 Gaëtan Renaudeau http://goo.gl/El3k7u
	 * Adopted from https://github.com/gre/bezier-easing
	 */

	BezierEasing = (function() {
	  function BezierEasing(o) {
	    this.vars();
	    return this.generate;
	  }

	  BezierEasing.prototype.vars = function() {
	    return this.generate = h.bind(this.generate, this);
	  };

	  BezierEasing.prototype.generate = function(mX1, mY1, mX2, mY2) {
	    var A, B, C, NEWTON_ITERATIONS, NEWTON_MIN_SLOPE, SUBDIVISION_MAX_ITERATIONS, SUBDIVISION_PRECISION, _precomputed, arg, binarySubdivide, calcBezier, calcSampleValues, f, float32ArraySupported, getSlope, getTForX, i, j, kSampleStepSize, kSplineTableSize, mSampleValues, newtonRaphsonIterate, precompute, str;
	    if (arguments.length < 4) {
	      return this.error('Bezier function expects 4 arguments');
	    }
	    for (i = j = 0; j < 4; i = ++j) {
	      arg = arguments[i];
	      if (typeof arg !== "number" || isNaN(arg) || !isFinite(arg)) {
	        return this.error('Bezier function expects 4 arguments');
	      }
	    }
	    if (mX1 < 0 || mX1 > 1 || mX2 < 0 || mX2 > 1) {
	      return this.error('Bezier x values should be > 0 and < 1');
	    }
	    NEWTON_ITERATIONS = 4;
	    NEWTON_MIN_SLOPE = 0.001;
	    SUBDIVISION_PRECISION = 0.0000001;
	    SUBDIVISION_MAX_ITERATIONS = 10;
	    kSplineTableSize = 11;
	    kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
	    float32ArraySupported = indexOf.call(global, 'Float32Array') >= 0;
	    A = function(aA1, aA2) {
	      return 1.0 - 3.0 * aA2 + 3.0 * aA1;
	    };
	    B = function(aA1, aA2) {
	      return 3.0 * aA2 - 6.0 * aA1;
	    };
	    C = function(aA1) {
	      return 3.0 * aA1;
	    };
	    calcBezier = function(aT, aA1, aA2) {
	      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
	    };
	    getSlope = function(aT, aA1, aA2) {
	      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
	    };
	    newtonRaphsonIterate = function(aX, aGuessT) {
	      var currentSlope, currentX;
	      i = 0;
	      while (i < NEWTON_ITERATIONS) {
	        currentSlope = getSlope(aGuessT, mX1, mX2);

	        /* istanbul ignore if */
	        if (currentSlope === 0.0) {
	          return aGuessT;
	        }
	        currentX = calcBezier(aGuessT, mX1, mX2) - aX;
	        aGuessT -= currentX / currentSlope;
	        ++i;
	      }
	      return aGuessT;
	    };
	    calcSampleValues = function() {
	      i = 0;
	      while (i < kSplineTableSize) {
	        mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	        ++i;
	      }
	    };

	    /* istanbul ignore next */
	    binarySubdivide = function(aX, aA, aB) {
	      var currentT, currentX, isBig;
	      currentX = void 0;
	      currentT = void 0;
	      i = 0;
	      while (true) {
	        currentT = aA + (aB - aA) / 2.0;
	        currentX = calcBezier(currentT, mX1, mX2) - aX;
	        if (currentX > 0.0) {
	          aB = currentT;
	        } else {
	          aA = currentT;
	        }
	        isBig = Math.abs(currentX) > SUBDIVISION_PRECISION;
	        if (!(isBig && ++i < SUBDIVISION_MAX_ITERATIONS)) {
	          break;
	        }
	      }
	      return currentT;
	    };
	    getTForX = function(aX) {
	      var currentSample, delta, dist, guessForT, initialSlope, intervalStart, lastSample;
	      intervalStart = 0.0;
	      currentSample = 1;
	      lastSample = kSplineTableSize - 1;
	      while (currentSample !== lastSample && mSampleValues[currentSample] <= aX) {
	        intervalStart += kSampleStepSize;
	        ++currentSample;
	      }
	      --currentSample;
	      delta = mSampleValues[currentSample + 1] - mSampleValues[currentSample];
	      dist = (aX - mSampleValues[currentSample]) / delta;
	      guessForT = intervalStart + dist * kSampleStepSize;
	      initialSlope = getSlope(guessForT, mX1, mX2);
	      if (initialSlope >= NEWTON_MIN_SLOPE) {
	        return newtonRaphsonIterate(aX, guessForT);
	      } else {

	        /* istanbul ignore next */
	        if (initialSlope === 0.0) {
	          return guessForT;
	        } else {
	          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
	        }
	      }
	    };
	    precompute = function() {
	      var _precomputed;
	      _precomputed = true;
	      if (mX1 !== mY1 || mX2 !== mY2) {
	        return calcSampleValues();
	      }
	    };
	    mSampleValues = !float32ArraySupported ? new Array(kSplineTableSize) : new Float32Array(kSplineTableSize);
	    _precomputed = false;
	    f = function(aX) {
	      if (!_precomputed) {
	        precompute();
	      }
	      if (mX1 === mY1 && mX2 === mY2) {
	        return aX;
	      }
	      if (aX === 0) {
	        return 0;
	      }
	      if (aX === 1) {
	        return 1;
	      }
	      return calcBezier(getTForX(aX), mY1, mY2);
	    };
	    str = "bezier(" + [mX1, mY1, mX2, mY2] + ")";
	    f.toStr = function() {
	      return str;
	    };
	    return f;
	  };

	  BezierEasing.prototype.error = function(msg) {
	    return h.error(msg);
	  };

	  return BezierEasing;

	})();

	bezierEasing = new BezierEasing;

	module.exports = bezierEasing;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var PathEasing, h;

	h = __webpack_require__(16);

	PathEasing = (function() {
	  PathEasing.prototype._vars = function() {
	    this._precompute = h.clamp(this.o.precompute || 1450, 100, 10000);
	    this._step = 1 / this._precompute;
	    this._rect = this.o.rect || 100;
	    this._approximateMax = this.o.approximateMax || 5;
	    this._eps = this.o.eps || 0.001;
	    return this._boundsPrevProgress = -1;
	  };

	  function PathEasing(path, o1) {
	    this.o = o1 != null ? o1 : {};
	    if (path === 'creator') {
	      return;
	    }
	    this.path = h.parsePath(path);
	    if (this.path == null) {
	      return h.error('Error while parsing the path');
	    }
	    this._vars();
	    this.path.setAttribute('d', this._normalizePath(this.path.getAttribute('d')));
	    this.pathLength = this.path.getTotalLength();
	    this.sample = h.bind(this.sample, this);
	    this._hardSample = h.bind(this._hardSample, this);
	    this._preSample();
	    this;
	  }

	  PathEasing.prototype._preSample = function() {
	    var i, j, length, point, progress, ref, results;
	    this._samples = [];
	    results = [];
	    for (i = j = 0, ref = this._precompute; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      progress = i * this._step;
	      length = this.pathLength * progress;
	      point = this.path.getPointAtLength(length);
	      results.push(this._samples[i] = {
	        point: point,
	        length: length,
	        progress: progress
	      });
	    }
	    return results;
	  };

	  PathEasing.prototype._findBounds = function(array, p) {
	    var buffer, direction, end, i, j, len, loopEnd, pointP, pointX, ref, ref1, start, value;
	    if (p === this._boundsPrevProgress) {
	      return this._prevBounds;
	    }
	    if (this._boundsStartIndex == null) {
	      this._boundsStartIndex = 0;
	    }
	    len = array.length;
	    if (this._boundsPrevProgress > p) {
	      loopEnd = 0;
	      direction = 'reverse';
	    } else {
	      loopEnd = len;
	      direction = 'forward';
	    }
	    if (direction === 'forward') {
	      start = array[0];
	      end = array[array.length - 1];
	    } else {
	      start = array[array.length - 1];
	      end = array[0];
	    }
	    for (i = j = ref = this._boundsStartIndex, ref1 = loopEnd; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
	      value = array[i];
	      pointX = value.point.x / this._rect;
	      pointP = p;
	      if (direction === 'reverse') {
	        buffer = pointX;
	        pointX = pointP;
	        pointP = buffer;
	      }
	      if (pointX < pointP) {
	        start = value;
	        this._boundsStartIndex = i;
	      } else {
	        end = value;
	        break;
	      }
	    }
	    this._boundsPrevProgress = p;
	    return this._prevBounds = {
	      start: start,
	      end: end
	    };
	  };

	  PathEasing.prototype.sample = function(p) {
	    var bounds, res;
	    p = h.clamp(p, 0, 1);
	    bounds = this._findBounds(this._samples, p);
	    res = this._checkIfBoundsCloseEnough(p, bounds);
	    if (res != null) {
	      return res;
	    }
	    return this._findApproximate(p, bounds.start, bounds.end);
	  };

	  PathEasing.prototype._checkIfBoundsCloseEnough = function(p, bounds) {
	    var point, y;
	    point = void 0;
	    y = this._checkIfPointCloseEnough(p, bounds.start.point);
	    if (y != null) {
	      return y;
	    }
	    return this._checkIfPointCloseEnough(p, bounds.end.point);
	  };

	  PathEasing.prototype._checkIfPointCloseEnough = function(p, point) {
	    if (h.closeEnough(p, point.x / this._rect, this._eps)) {
	      return this._resolveY(point);
	    }
	  };

	  PathEasing.prototype._approximate = function(start, end, p) {
	    var deltaP, percentP;
	    deltaP = end.point.x - start.point.x;
	    percentP = (p - (start.point.x / this._rect)) / (deltaP / this._rect);
	    return start.length + percentP * (end.length - start.length);
	  };

	  PathEasing.prototype._findApproximate = function(p, start, end, approximateMax) {
	    var approximation, args, newPoint, point, x;
	    if (approximateMax == null) {
	      approximateMax = this._approximateMax;
	    }
	    approximation = this._approximate(start, end, p);
	    point = this.path.getPointAtLength(approximation);
	    x = point.x / this._rect;
	    if (h.closeEnough(p, x, this._eps)) {
	      return this._resolveY(point);
	    } else {
	      if (--approximateMax < 1) {
	        return this._resolveY(point);
	      }
	      newPoint = {
	        point: point,
	        length: approximation
	      };
	      args = p < x ? [p, start, newPoint, approximateMax] : [p, newPoint, end, approximateMax];
	      return this._findApproximate.apply(this, args);
	    }
	  };

	  PathEasing.prototype._resolveY = function(point) {
	    return 1 - (point.y / this._rect);
	  };

	  PathEasing.prototype._normalizePath = function(path) {
	    var commands, endIndex, normalizedPath, points, startIndex, svgCommandsRegexp;
	    svgCommandsRegexp = /[M|L|H|V|C|S|Q|T|A]/gim;
	    points = path.split(svgCommandsRegexp);
	    points.shift();
	    commands = path.match(svgCommandsRegexp);
	    startIndex = 0;
	    points[startIndex] = this._normalizeSegment(points[startIndex]);
	    endIndex = points.length - 1;
	    points[endIndex] = this._normalizeSegment(points[endIndex], this._rect || 100);
	    return normalizedPath = this._joinNormalizedPath(commands, points);
	  };

	  PathEasing.prototype._joinNormalizedPath = function(commands, points) {
	    var command, i, j, len1, normalizedPath, space;
	    normalizedPath = '';
	    for (i = j = 0, len1 = commands.length; j < len1; i = ++j) {
	      command = commands[i];
	      space = i === 0 ? '' : ' ';
	      normalizedPath += "" + space + command + (points[i].trim());
	    }
	    return normalizedPath;
	  };

	  PathEasing.prototype._normalizeSegment = function(segment, value) {
	    var i, j, lastPoint, len1, nRgx, pairs, parsedX, point, space, x;
	    if (value == null) {
	      value = 0;
	    }
	    segment = segment.trim();
	    nRgx = /(-|\+)?((\d+(\.(\d|\e(-|\+)?)+)?)|(\.?(\d|\e|(\-|\+))+))/gim;
	    pairs = this._getSegmentPairs(segment.match(nRgx));
	    lastPoint = pairs[pairs.length - 1];
	    x = lastPoint[0];
	    parsedX = Number(x);
	    if (parsedX !== value) {
	      segment = '';
	      lastPoint[0] = value;
	      for (i = j = 0, len1 = pairs.length; j < len1; i = ++j) {
	        point = pairs[i];
	        space = i === 0 ? '' : ' ';
	        segment += "" + space + point[0] + "," + point[1];
	      }
	    }
	    return segment;
	  };

	  PathEasing.prototype._getSegmentPairs = function(array) {
	    var i, j, len1, newArray, pair, value;
	    if (array.length % 2 !== 0) {
	      h.error('Failed to parse the path - segment pairs are not even.', array);
	    }
	    newArray = [];
	    for (i = j = 0, len1 = array.length; j < len1; i = j += 2) {
	      value = array[i];
	      pair = [array[i], array[i + 1]];
	      newArray.push(pair);
	    }
	    return newArray;
	  };

	  PathEasing.prototype.create = function(path, o) {
	    var handler;
	    handler = new PathEasing(path, o);
	    handler.sample.path = handler.path;
	    return handler.sample;
	  };

	  return PathEasing;

	})();

	module.exports = PathEasing;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var create, easing, getNearest, mix, parseIfEasing, sort,
	  slice = [].slice;

	easing = null;

	parseIfEasing = function(item) {
	  if (typeof item.value === 'number') {
	    return item.value;
	  } else {
	    return easing.parseEasing(item.value);
	  }
	};

	sort = function(a, b) {
	  var returnValue;
	  a.value = parseIfEasing(a);
	  b.value = parseIfEasing(b);
	  returnValue = 0;
	  a.to < b.to && (returnValue = -1);
	  a.to > b.to && (returnValue = 1);
	  return returnValue;
	};

	getNearest = function(array, progress) {
	  var i, index, j, len, value;
	  index = 0;
	  for (i = j = 0, len = array.length; j < len; i = ++j) {
	    value = array[i];
	    index = i;
	    if (value.to > progress) {
	      break;
	    }
	  }
	  return index;
	};

	mix = function() {
	  var args;
	  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	  if (args.length > 1) {
	    args = args.sort(sort);
	  } else {
	    args[0].value = parseIfEasing(args[0]);
	  }
	  return function(progress) {
	    var index, value;
	    index = getNearest(args, progress);
	    if (index !== -1) {
	      value = args[index].value;
	      if (index === args.length - 1 && progress > args[index].to) {
	        return 1;
	      }
	      if (typeof value === 'function') {
	        return value(progress);
	      } else {
	        return value;
	      }
	    }
	  };
	};

	create = function(e) {
	  easing = e;
	  return mix;
	};

	module.exports = create;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	/*!
	  LegoMushroom @legomushroom http://legomushroom.com
	  MIT License 2014
	 */

	/* istanbul ignore next */
	(function() {
	  var Main;
	  Main = (function() {
	    function Main(o) {
	      this.o = o != null ? o : {};
	      if (window.isAnyResizeEventInited) {
	        return;
	      }
	      this.vars();
	      this.redefineProto();
	    }

	    Main.prototype.vars = function() {
	      window.isAnyResizeEventInited = true;
	      this.allowedProtos = [HTMLDivElement, HTMLFormElement, HTMLLinkElement, HTMLBodyElement, HTMLParagraphElement, HTMLFieldSetElement, HTMLLegendElement, HTMLLabelElement, HTMLButtonElement, HTMLUListElement, HTMLOListElement, HTMLLIElement, HTMLHeadingElement, HTMLQuoteElement, HTMLPreElement, HTMLBRElement, HTMLFontElement, HTMLHRElement, HTMLModElement, HTMLParamElement, HTMLMapElement, HTMLTableElement, HTMLTableCaptionElement, HTMLImageElement, HTMLTableCellElement, HTMLSelectElement, HTMLInputElement, HTMLTextAreaElement, HTMLAnchorElement, HTMLObjectElement, HTMLTableColElement, HTMLTableSectionElement, HTMLTableRowElement];
	      return this.timerElements = {
	        img: 1,
	        textarea: 1,
	        input: 1,
	        embed: 1,
	        object: 1,
	        svg: 1,
	        canvas: 1,
	        tr: 1,
	        tbody: 1,
	        thead: 1,
	        tfoot: 1,
	        a: 1,
	        select: 1,
	        option: 1,
	        optgroup: 1,
	        dl: 1,
	        dt: 1,
	        br: 1,
	        basefont: 1,
	        font: 1,
	        col: 1,
	        iframe: 1
	      };
	    };

	    Main.prototype.redefineProto = function() {
	      var i, it, proto, t;
	      it = this;
	      return t = (function() {
	        var j, len, ref, results;
	        ref = this.allowedProtos;
	        results = [];
	        for (i = j = 0, len = ref.length; j < len; i = ++j) {
	          proto = ref[i];
	          if (proto.prototype == null) {
	            continue;
	          }
	          results.push((function(proto) {
	            var listener, remover;
	            listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
	            (function(listener) {
	              var wrappedListener;
	              wrappedListener = function() {
	                var option;
	                if (this !== window || this !== document) {
	                  option = arguments[0] === 'onresize' && !this.isAnyResizeEventInited;
	                  option && it.handleResize({
	                    args: arguments,
	                    that: this
	                  });
	                }
	                return listener.apply(this, arguments);
	              };
	              if (proto.prototype.addEventListener) {
	                return proto.prototype.addEventListener = wrappedListener;
	              } else if (proto.prototype.attachEvent) {
	                return proto.prototype.attachEvent = wrappedListener;
	              }
	            })(listener);
	            remover = proto.prototype.removeEventListener || proto.prototype.detachEvent;
	            return (function(remover) {
	              var wrappedRemover;
	              wrappedRemover = function() {
	                this.isAnyResizeEventInited = false;
	                this.iframe && this.removeChild(this.iframe);
	                return remover.apply(this, arguments);
	              };
	              if (proto.prototype.removeEventListener) {
	                return proto.prototype.removeEventListener = wrappedRemover;
	              } else if (proto.prototype.detachEvent) {
	                return proto.prototype.detachEvent = wrappedListener;
	              }
	            })(remover);
	          })(proto));
	        }
	        return results;
	      }).call(this);
	    };

	    Main.prototype.handleResize = function(args) {
	      var computedStyle, el, iframe, isEmpty, isNoPos, isStatic, ref;
	      el = args.that;
	      if (!this.timerElements[el.tagName.toLowerCase()]) {
	        iframe = document.createElement('iframe');
	        el.appendChild(iframe);
	        iframe.style.width = '100%';
	        iframe.style.height = '100%';
	        iframe.style.position = 'absolute';
	        iframe.style.zIndex = -999;
	        iframe.style.opacity = 0;
	        iframe.style.top = 0;
	        iframe.style.left = 0;
	        computedStyle = window.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
	        isNoPos = el.style.position === '';
	        isStatic = computedStyle.position === 'static' && isNoPos;
	        isEmpty = computedStyle.position === '' && el.style.position === '';
	        if (isStatic || isEmpty) {
	          el.style.position = 'relative';
	        }
	        if ((ref = iframe.contentWindow) != null) {
	          ref.onresize = (function(_this) {
	            return function(e) {
	              return _this.dispatchEvent(el);
	            };
	          })(this);
	        }
	        el.iframe = iframe;
	      } else {
	        this.initTimer(el);
	      }
	      return el.isAnyResizeEventInited = true;
	    };

	    Main.prototype.initTimer = function(el) {
	      var height, width;
	      width = 0;
	      height = 0;
	      return this.interval = setInterval((function(_this) {
	        return function() {
	          var newHeight, newWidth;
	          newWidth = el.offsetWidth;
	          newHeight = el.offsetHeight;
	          if (newWidth !== width || newHeight !== height) {
	            _this.dispatchEvent(el);
	            width = newWidth;
	            return height = newHeight;
	          }
	        };
	      })(this), this.o.interval || 62.5);
	    };

	    Main.prototype.dispatchEvent = function(el) {
	      var e;
	      if (document.createEvent) {
	        e = document.createEvent('HTMLEvents');
	        e.initEvent('onresize', false, false);
	        return el.dispatchEvent(e);
	      } else if (document.createEventObject) {
	        e = document.createEventObject();
	        return el.fireEvent('onresize', e);
	      } else {
	        return false;
	      }
	    };

	    Main.prototype.destroy = function() {
	      var i, it, j, len, proto, ref, results;
	      clearInterval(this.interval);
	      this.interval = null;
	      window.isAnyResizeEventInited = false;
	      it = this;
	      ref = this.allowedProtos;
	      results = [];
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        proto = ref[i];
	        if (proto.prototype == null) {
	          continue;
	        }
	        results.push((function(proto) {
	          var listener;
	          listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
	          if (proto.prototype.addEventListener) {
	            proto.prototype.addEventListener = Element.prototype.addEventListener;
	          } else if (proto.prototype.attachEvent) {
	            proto.prototype.attachEvent = Element.prototype.attachEvent;
	          }
	          if (proto.prototype.removeEventListener) {
	            return proto.prototype.removeEventListener = Element.prototype.removeEventListener;
	          } else if (proto.prototype.detachEvent) {
	            return proto.prototype.detachEvent = Element.prototype.detachEvent;
	          }
	        })(proto));
	      }
	      return results;
	    };

	    return Main;

	  })();
	  if (true) {
	    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return new Main;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "object") && (typeof module.exports === "object")) {
	    return module.exports = new Main;
	  } else {
	    if (typeof window !== "undefined" && window !== null) {
	      window.AnyResizeEvent = Main;
	    }
	    return typeof window !== "undefined" && window !== null ? window.anyResizeEvent = new Main : void 0;
	  }
	})();


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	__webpack_require__(62);
	module.exports = __webpack_require__(63);

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	module.exports = __webpack_require__(65).Object.getPrototypeOf;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	module.exports = __webpack_require__(65).Object.keys;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(61);
	module.exports = __webpack_require__(66)('iterator');

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(68);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	module.exports = __webpack_require__(65).Object.setPrototypeOf;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof2 = __webpack_require__(15);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _h = __webpack_require__(16);

	var _h2 = _interopRequireDefault(_h);

	var _shapesMap = __webpack_require__(17);

	var _shapesMap2 = _interopRequireDefault(_shapesMap);

	var _burst = __webpack_require__(3);

	var _burst2 = _interopRequireDefault(_burst);

	var _transit = __webpack_require__(4);

	var _transit2 = _interopRequireDefault(_transit);

	var _swirl = __webpack_require__(5);

	var _swirl2 = _interopRequireDefault(_swirl);

	var _stagger = __webpack_require__(6);

	var _stagger2 = _interopRequireDefault(_stagger);

	var _spriter = __webpack_require__(7);

	var _spriter2 = _interopRequireDefault(_spriter);

	var _motionPath = __webpack_require__(18);

	var _motionPath2 = _interopRequireDefault(_motionPath);

	var _tween = __webpack_require__(2);

	var _tween2 = _interopRequireDefault(_tween);

	var _timeline = __webpack_require__(8);

	var _timeline2 = _interopRequireDefault(_timeline);

	var _tweener = __webpack_require__(9);

	var _tweener2 = _interopRequireDefault(_tweener);

	var _tweenable = __webpack_require__(10);

	var _tweenable2 = _interopRequireDefault(_tweenable);

	var _thenable = __webpack_require__(11);

	var _thenable2 = _interopRequireDefault(_thenable);

	var _tunable = __webpack_require__(12);

	var _tunable2 = _interopRequireDefault(_tunable);

	var _module = __webpack_require__(13);

	var _module2 = _interopRequireDefault(_module);

	var _easing = __webpack_require__(19);

	var _easing2 = _interopRequireDefault(_easing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.mojs = {
	  revision: '0.208.1', isDebug: true, helpers: _h2.default,
	  Transit: _transit2.default, Swirl: _swirl2.default, Burst: _burst2.default, stagger: _stagger2.default, Spriter: _spriter2.default, MotionPath: _motionPath2.default,
	  Tween: _tween2.default, Timeline: _timeline2.default, Tweenable: _tweenable2.default, Thenable: _thenable2.default, Tunable: _tunable2.default, Module: _module2.default,
	  tweener: _tweener2.default, easing: _easing2.default, shapesMap: _shapesMap2.default
	};

	// TODO:
	/*
	  burst fix the tune for `then` chains
	  randoms in then chains for transit and swirl.
	  module names
	  perf optimizations.
	  --
	  parse rand(stagger(20, 10), 20) values
	  percentage for radius
	*/

	// var sw = new mojs.Burst({
	//   isShowStart:  1,
	//   isShowEnd:    1,
	//   left:         '50%',  top: '50%',
	//   childOptions: {
	//     duration:     3500,
	//     // easing:       'ease.out',
	//     isSwirl:      1,
	//     fill:         ['cyan', 'yellow'],
	//     radius:       { 5 : .5 },
	//     // stroke: 'cyan',
	//     strokeWidth: 2
	//   }
	// })
	//   .then({ radius: 10, childOptions: {
	//     // easing: 'cubic.in',
	//     // duration: 400,
	//     radius: 15 , isSwirl: 0
	//   }})
	//   // .then({
	//   //   radius: 100, angle: 0,
	//   //   childOptions: {
	//   //     easing: 'cubic.out',
	//   //     duration: 350, radius: 0, shape: 'cross', stroke: {'cyan': 'cyan'}, strokeWidth: 2 }
	//   // });

	// console.log(sw._history);

	// var playEl = document.querySelector('#js-play'),
	//     rangeSliderEl = document.querySelector('#js-range-slider');
	// document.body.addEventListener('click', function (e) {
	//   // console.log('REPLAy')
	//   sw
	//     // .generate()
	//     .tune({
	//       left:   e.pageX,
	//       top:    e.pageY,
	//       angle:  { 0: -20 },
	//       childOptions: { fill: 'orange' }
	//     })
	//     .replay();
	// });

	// rangeSliderEl.addEventListener('input', function () {
	//   tr.setProgress( rangeSliderEl.value/1000 );
	// });

	mojs.h = mojs.helpers;
	mojs.delta = mojs.h.delta;

	// ### istanbul ignore next ###
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return mojs;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	// ### istanbul ignore next ###
	if ((false ? 'undefined' : (0, _typeof3.default)(module)) === "object" && (0, _typeof3.default)(module.exports) === "object") {
	  module.exports = mojs;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module)))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(68);
	__webpack_require__(70);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(68);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(73);
	module.exports = __webpack_require__(65).Array.from;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	var Iterators = __webpack_require__(75);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(76)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(77)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(80)
	  , get      = __webpack_require__(81);
	module.exports = __webpack_require__(65).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(78);

	__webpack_require__(79)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(82)('wks')
	  , uid    = __webpack_require__(83)
	  , Symbol = __webpack_require__(84).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(78);

	__webpack_require__(79)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(86);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(87).set});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(85);

	__webpack_require__(79)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(68)
	  , global         = __webpack_require__(84)
	  , has            = __webpack_require__(88)
	  , DESCRIPTORS    = __webpack_require__(89)
	  , $export        = __webpack_require__(86)
	  , redefine       = __webpack_require__(90)
	  , $fails         = __webpack_require__(91)
	  , shared         = __webpack_require__(82)
	  , setToStringTag = __webpack_require__(92)
	  , uid            = __webpack_require__(83)
	  , wks            = __webpack_require__(66)
	  , keyOf          = __webpack_require__(93)
	  , $names         = __webpack_require__(94)
	  , enumKeys       = __webpack_require__(95)
	  , isArray        = __webpack_require__(96)
	  , anObject       = __webpack_require__(80)
	  , toIObject      = __webpack_require__(85)
	  , createDesc     = __webpack_require__(97)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(98)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(100)
	  , $export     = __webpack_require__(86)
	  , toObject    = __webpack_require__(78)
	  , call        = __webpack_require__(101)
	  , isArrayIter = __webpack_require__(99)
	  , toLength    = __webpack_require__(102)
	  , getIterFn   = __webpack_require__(81);
	$export($export.S + $export.F * !__webpack_require__(103)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(106)
	  , step             = __webpack_require__(107)
	  , Iterators        = __webpack_require__(75)
	  , toIObject        = __webpack_require__(85);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(77)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(104)
	  , defined   = __webpack_require__(105);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(98)
	  , $export        = __webpack_require__(86)
	  , redefine       = __webpack_require__(90)
	  , hide           = __webpack_require__(108)
	  , has            = __webpack_require__(88)
	  , Iterators      = __webpack_require__(75)
	  , $iterCreate    = __webpack_require__(109)
	  , setToStringTag = __webpack_require__(92)
	  , getProto       = __webpack_require__(68).getProto
	  , ITERATOR       = __webpack_require__(66)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(105);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(86)
	  , core    = __webpack_require__(65)
	  , fails   = __webpack_require__(91);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(110);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(111)
	  , ITERATOR  = __webpack_require__(66)('iterator')
	  , Iterators = __webpack_require__(75);
	module.exports = __webpack_require__(65).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(84)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(112)
	  , defined = __webpack_require__(105);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(84)
	  , core      = __webpack_require__(65)
	  , ctx       = __webpack_require__(100)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(68).getDesc
	  , isObject = __webpack_require__(110)
	  , anObject = __webpack_require__(80);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(100)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(91)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(108);

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(68).setDesc
	  , has = __webpack_require__(88)
	  , TAG = __webpack_require__(66)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(68)
	  , toIObject = __webpack_require__(85);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(85)
	  , getNames  = __webpack_require__(68).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(68);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(113);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = true;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(75)
	  , ITERATOR   = __webpack_require__(66)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(114);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(80);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(104)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(66)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(68)
	  , createDesc = __webpack_require__(97);
	module.exports = __webpack_require__(89) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(68)
	  , descriptor     = __webpack_require__(97)
	  , setToStringTag = __webpack_require__(92)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(108)(IteratorPrototype, __webpack_require__(66)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(113)
	  , TAG = __webpack_require__(66)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(113);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }
/******/ ]);