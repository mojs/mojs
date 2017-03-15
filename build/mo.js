(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mojs", [], factory);
	else if(typeof exports === 'object')
		exports["mojs"] = factory();
	else
		root["mojs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _window = window,
    performance = _window.performance;
var now = performance.now;
/**
 * Tweener - singleton object that is responsible of:
 *  - starting `requestAnimationFrame` loop
 *  - stopping `requestAnimationFrame` loop
 *  - holding `tween`/`timeline` objects and passing current time to them.
 */

var Tweener = function () {
  function Tweener() {
    var _this = this;

    _classCallCheck(this, Tweener);

    this._loop = function () {
      // if already running simply return immediately
      if (!_this._isRunning) {
        return false;
      }
      // update all active `tweens` with current time
      _this._update(now());
      // if there is no active `tweens` running - stop the `loop`
      if (!_this._tweens.length) {
        return _this._isRunning = false;
      }
      // else request new animation frame
      requestAnimationFrame(_this._loop);
    };

    this._vars();
    this._listenVisibilityChange();
    return this;
  }

  /**
   * _vars - function for creating variables.
   *
   * @return {type}  description
   */


  _createClass(Tweener, [{
    key: "_vars",
    value: function _vars() {
      this._tweens = [];
      this._onVisibilityChange = this._onVisibilityChange.bind(this);
    }

    /**
     * _loop - main animation loop, takes care of running at most `1` animation loop
     *         and stopping itself if there is no active `tweens` left.
     * @private
     */

  }, {
    key: "_startLoop",


    /*
      Method to start animation loop.
      @private
    */
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
    key: "_stopLoop",
    value: function _stopLoop() {
      this._isRunning = false;
    }
    /*
      Method to update every tween/timeline on animation frame.
      @private
    */

  }, {
    key: "_update",
    value: function _update(time) {
      var i = this._tweens.length;
      while (i--) {
        // cache the current tween
        var tween = this._tweens[i];
        if (tween && tween._update(time) === true) {
          this.remove(tween);
          tween._onTweenerFinish();
          tween._prevTime = undefined;
        }
      }
    }
    /*
      Method to add a Tween/Timeline to loop pool.
      @param {Object} Tween/Timeline to add.
    */

  }, {
    key: "add",
    value: function add(tween) {
      // return if tween is already running
      if (tween._isRunning) {
        return;
      }
      tween._isRunning = true;
      this._tweens.push(tween);
      this._startLoop();
    }
    /*
      Method stop updating all the child tweens/timelines.
      @private
    */

  }, {
    key: "removeAll",
    value: function removeAll() {
      this._tweens.length = 0;
    }
    /*
      Method to remove specific tween/timeline form updating.
      @private
    */

  }, {
    key: "remove",
    value: function remove(tween) {
      var index = typeof tween === 'number' ? tween : this._tweens.indexOf(tween);

      if (index !== -1) {
        tween = this._tweens[index];
        if (tween) {
          tween._isRunning = false;
          this._tweens.splice(index, 1);
          tween._onTweenerRemove();
        }
      }
    }

    /*
      Method to initialize event listeners to visibility change events.
      @private
    */

  }, {
    key: "_listenVisibilityChange",
    value: function _listenVisibilityChange() {
      if (typeof document.hidden !== "undefined") {
        this._visibilityHidden = "hidden";
        this._visibilityChange = "visibilitychange";
      } else if (typeof document.mozHidden !== "undefined") {
        this._visibilityHidden = "mozHidden";
        this._visibilityChange = "mozvisibilitychange";
      } else if (typeof document.msHidden !== "undefined") {
        this._visibilityHidden = "msHidden";
        this._visibilityChange = "msvisibilitychange";
      } else if (typeof document.webkitHidden !== "undefined") {
        this._visibilityHidden = "webkitHidden";
        this._visibilityChange = "webkitvisibilitychange";
      }

      document.addEventListener(this._visibilityChange, this._onVisibilityChange, false);
    }
    /*
      Method that will fire on visibility change.
    */

  }, {
    key: "_onVisibilityChange",
    value: function _onVisibilityChange() {
      if (document[this._visibilityHidden]) {
        this._savePlayingTweens();
      } else {
        this._restorePlayingTweens();
      }
    }
    /*
      Method to save all playing tweens.
      @private
    */

  }, {
    key: "_savePlayingTweens",
    value: function _savePlayingTweens() {
      this._savedTweens = this._tweens.slice(0);
      for (var i = 0; i < this._savedTweens.length; i++) {
        this._savedTweens[i].pause();
      }
    }
    /*
      Method to restore all playing tweens.
      @private
    */

  }, {
    key: "_restorePlayingTweens",
    value: function _restorePlayingTweens() {
      if (this._savedTweens == null) {
        return;
      }

      for (var i = 0; i < this._savedTweens.length; i++) {
        this._savedTweens[i].resume();
      }
    }
  }]);

  return Tweener;
}();

var t = new Tweener();
exports.default = t;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tweener = __webpack_require__(0);

var _tweener2 = _interopRequireDefault(_tweener);

var _easing = __webpack_require__(7);

var _easing2 = _interopRequireDefault(_easing);

var _classProto = __webpack_require__(6);

var _classProto2 = _interopRequireDefault(_classProto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tween = function (_ClassProto) {
  _inherits(Tween, _ClassProto);

  _createClass(Tween, [{
    key: 'declareDefaults',

    /*
      Method do declare defaults with this._defaults object.
      @private
    */
    value: function declareDefaults() {
      // DEFAULTS
      this._defaults = {
        /* duration of the tween [0..∞] */
        duration: 350,
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
        isYoyo: false,
        /* easing for the tween, could be any easing type [link to easing-types.md] */
        easing: 'Sin.Out',
        /*
          Easing for backward direction of the tweenthe tween,
          if `null` - fallbacks to `easing` property.
          forward direction in `yoyo` period is treated as backward for the easing.
        */
        backwardEasing: null,
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
        onRefresh: null,
        onComplete: null,
        onRepeatStart: null,
        onRepeatComplete: null,
        onFirstUpdate: null,
        onUpdate: null,
        isChained: false,
        // playback callbacks
        onPlaybackStart: null,
        onPlaybackPause: null,
        onPlaybackStop: null,
        onPlaybackComplete: null,
        // context which all callbacks will be called with
        callbacksContext: null
      };
    }
    /*
      API method to play the Tween.
      @public
      @param  {Number} Shift time in milliseconds.
      @return {Object} Self.
    */

  }, {
    key: 'play',
    value: function play() {
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this._state === 'play' && this._isRunning) {
        return this;
      }
      this._props.isReversed = false;
      this._subPlay(shift, 'play');
      this._setPlaybackState('play');
      return this;
    }
    /*
      API method to play the Tween in reverse.
      @public
      @param  {Number} Shift time in milliseconds.
      @return {Object} Self.
    */

  }, {
    key: 'playBackward',
    value: function playBackward() {
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this._state === 'reverse' && this._isRunning) {
        return this;
      }
      this._props.isReversed = true;
      this._subPlay(shift, 'reverse');
      this._setPlaybackState('reverse');
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
      if (this._state === 'pause' || this._state === 'stop') {
        return this;
      }
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
        return this;
      }

      this._wasUknownUpdate = undefined;

      var stopProc = progress != null ? progress
      /* if no progress passsed - set 1 if tween
         is playingBackward, otherwise set to 0 */
      : this._state === 'reverse' ? 1 : 0;

      this.setProgress(stopProc);

      this.reset();
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
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.reset();
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
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.reset();
      this.playBackward(shift);
      return this;
    }
    /*
      API method to resume the Tween.
      @public
      @param  {Number} Shift time in milliseconds.
      @return {Object} Self.
    */

  }, {
    key: 'resume',
    value: function resume() {
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this._state !== 'pause') {
        return this;
      }

      switch (this._prevState) {
        case 'play':
          this.play(shift);
          break;
        case 'reverse':
          this.playBackward(shift);
          break;
      }

      return this;
    }
    /*
      API method to set progress on tween.
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
      Method to set tween's speed.
      @public
      @param {Number} Speed value.
      @returns this.
    */

  }, {
    key: 'setSpeed',
    value: function setSpeed(speed) {
      this._props.speed = speed;
      // if playing - normalize _startTime and _prevTime to the current point.
      if (this._state === 'play' || this._state === 'reverse') {
        this._setResumeTime(this._state);
      }
      return this;
    }
    /*
      Method to reset tween's state and properties.
      @public
      @returns this.
    */

  }, {
    key: 'reset',
    value: function reset() {
      this._removeFromTweener();
      this._setPlaybackState('stop');
      this._progressTime = 0;
      this._isCompleted = false;
      this._isStarted = false;
      this._isFirstUpdate = false;
      this._wasUknownUpdate = undefined;
      this._prevTime = undefined;
      this._prevYoyo = undefined;
      // this._props.startTime  = undefined;
      this._props.isReversed = false;
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
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
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
      // set resume time and normalize prev/start times
      this._setResumeTime(state, shift);
      // add self to tweener = play
      _tweener2.default.add(this);
      return this;
    }
    /*
      Method to set _resumeTime, _startTime and _prevTime.
      @private
      @param {String} Current state. [play, reverse]
      @param {Number} Time shift. *Default* is 0.
    */

  }, {
    key: '_setResumeTime',
    value: function _setResumeTime(state) {
      var shift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      // get current moment as resume time
      this._resumeTime = performance.now();
      // set start time regarding passed `shift` and `procTime`
      var startTime = this._resumeTime - Math.abs(shift) - this._progressTime;
      this._setStartTime(startTime, false);
      // if we have prevTime - we need to normalize
      // it for the current resume time
      if (this._prevTime != null) {
        this._prevTime = state === 'play' ? this._normPrevTimeForward() : this._props.endTime - this._progressTime;
      }
    }
    /*
      Method recalculate _prevTime for forward direction.
      @private
      @return {Number} Normalized prev time.
    */

  }, {
    key: '_normPrevTimeForward',
    value: function _normPrevTimeForward() {
      var p = this._props;
      return p.startTime + this._progressTime - p.delay;
    }
    /*
      Constructor of the class.
      @private
    */

  }]);

  function Tween() {
    var _ret;

    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tween);

    var _this = _possibleConstructorReturn(this, (Tween.__proto__ || Object.getPrototypeOf(Tween)).call(this, o));

    _this._props.name == null && _this._setSelfName();
    return _ret = _this, _possibleConstructorReturn(_this, _ret);
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

      // callbacks
      var wasPause = this._prevState === 'pause',
          wasStop = this._prevState === 'stop',
          wasPlay = this._prevState === 'play',
          wasReverse = this._prevState === 'reverse',
          wasPlaying = wasPlay || wasReverse,
          wasStill = wasStop || wasPause;

      if ((state === 'play' || state === 'reverse') && wasStill) {
        this._playbackStart();
      }
      if (state === 'pause' && wasPlaying) {
        this._playbackPause();
      }
      if (state === 'stop' && (wasPlaying || wasPause)) {
        this._playbackStop();
      }
    }
    /*
      Method to declare some vars.
      @private
    */

  }, {
    key: '_vars',
    value: function _vars() {
      this.progress = 0;
      this._prevTime = undefined;
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
      _get(Tween.prototype.__proto__ || Object.getPrototypeOf(Tween.prototype), '_extendDefaults', this).call(this);

      var p = this._props;
      p.easing = _easing2.default.parseEasing(p.easing);
      p.easing._parent = this;

      // parse only present backward easing to prevent parsing as `linear.none`
      // because we need to fallback to `easing` in `_setProgress` method
      if (p.backwardEasing != null) {
        p.backwardEasing = _easing2.default.parseEasing(p.backwardEasing);
        p.backwardEasing._parent = this;
      }
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
      var isResetFlags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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
      // set play time to the startTimes
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
      var p = this._props;
      // if we don't the _prevTime thus the direction we are heading to,
      // but prevTime was passed thus we are child of a Timeline
      // set _prevTime to passed one and pretent that there was unknown
      // update to not to block start/complete callbacks
      if (this._prevTime == null && timelinePrevTime != null) {

        if (this._props.speed && this._playTime) {
          // play point + ( speed * delta )
          this._prevTime = this._playTime + this._props.speed * (timelinePrevTime - this._playTime);
        }
        // this._prevTime = timelinePrevTime;
        this._wasUknownUpdate = true;
      }

      // var before = time;
      // cache vars
      var startPoint = p.startTime - p.delay;
      // if speed param was defined - calculate
      // new time regarding speed
      if (p.speed && this._playTime) {
        // play point + ( speed * delta )
        time = this._playTime + p.speed * (time - this._playTime);
      }

      // due to javascript precision issues, after speed mapping
      // we can get very close number that was made from progress of 1
      // and in fact represents `endTime` if so, set the time to `endTime`
      if (Math.abs(p.endTime - time) < 0.00000001) {
        time = p.endTime;
      }

      // if parent is onEdge but not very start nor very end
      if (onEdge && wasYoyo != null) {
        var T = this._getPeriod(time),
            isYoyo = !!(p.isYoyo && this._props.repeat && T % 2 === 1);

        // for timeline
        // notify children about edge jump
        if (this._timelines) {
          for (var i = 0; i < this._timelines.length; i++) {
            this._timelines[i]._update(time, timelinePrevTime, wasYoyo, onEdge);
          }
        }
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
        this._prevTime = undefined;
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
      if (this._prevTime == null) {
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
        // if was in active area - update in inactive area but just once -
        // right after the active area
        if (this._isInActiveArea) {
          this._updateInInactiveArea(time);
        } else if (!this._isRefreshed) {
          // onRefresh callback
          // before startTime
          if (time < p.startTime && this.progress !== 0) {
            this._refresh(true);
            this._isRefreshed = true;
            // after endTime
          }
          // else if ( time > p.endTime ) { }
        }
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
            isYoyo = p.isYoyo && T % 2 === 0;

        this._setProgress(isYoyo ? 0 : 1, time, isYoyo);
        this._repeatComplete(time, isYoyo);
        this._complete(time, isYoyo);
      }
      // if was active and went to - inactive area "-"
      if (time < this._prevTime && time < p.startTime && !this._isStarted && !this._isCompleted) {
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
      var isYoyo = props.isYoyo && T % 2 === 1,
          isYoyoPrev = props.isYoyo && prevT % 2 === 1,
          yoyoZero = isYoyo ? 1 : 0,
          yoyoOne = 1 - yoyoZero;

      if (time === props.endTime) {
        this._wasUknownUpdate = false;
        // if `time` is equal to `endTime`, T represents the next period,
        // so we need to decrement T and calculate "one" value regarding yoyo
        var isYoyo = props.isYoyo && (T - 1) % 2 === 1;
        this._setProgress(isYoyo ? 0 : 1, time, isYoyo);
        if (time > this._prevTime) {
          this._isRepeatCompleted = false;
        }
        this._repeatComplete(time, isYoyo);
        return this._complete(time, isYoyo);
      }

      // reset callback flags
      this._isCompleted = false;
      this._isRefreshed = false;
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
          // if backward direction and
          // if ( time < this._prevTime && time !== this._props.startTime ) {
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
            var isThisYoyo = props.isYoyo && (T - 1) % 2 === 1;
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
        yoyoZero = props.isYoyo && t % 2 === 1 ? 1 : 0;
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
          isYoyoChanged = p.wasYoyo !== isYoyo,
          isForward = time > this._prevTime;

      this.progress = proc;
      // get the current easing for `forward` direction regarding `yoyo`
      if (isForward && !isYoyo || !isForward && isYoyo) {
        this.easedProgress = p.easing(proc);
        // get the current easing for `backward` direction regarding `yoyo`
      } else if (!isForward && !isYoyo || isForward && isYoyo) {
        var easing = p.backwardEasing != null ? p.backwardEasing : p.easing;

        this.easedProgress = easing(proc);
      }

      if (p.prevEasedProgress !== this.easedProgress || isYoyoChanged) {
        if (p.onUpdate != null && typeof p.onUpdate === 'function') {
          p.onUpdate.call(p.callbacksContext || this, this.easedProgress, this.progress, isForward, isYoyo);
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
      Method to call onPlaybackStart callback
      @private
    */

  }, {
    key: '_playbackStart',
    value: function _playbackStart() {
      var p = this._props;
      if (p.onPlaybackStart != null && typeof p.onPlaybackStart === 'function') {
        p.onPlaybackStart.call(p.callbacksContext || this);
      }
    }
    /*
      Method to call onPlaybackPause callback
      @private
    */

  }, {
    key: '_playbackPause',
    value: function _playbackPause() {
      var p = this._props;
      if (p.onPlaybackPause != null && typeof p.onPlaybackPause === 'function') {
        p.onPlaybackPause.call(p.callbacksContext || this);
      }
    }
    /*
      Method to call onPlaybackStop callback
      @private
    */

  }, {
    key: '_playbackStop',
    value: function _playbackStop() {
      var p = this._props;
      if (p.onPlaybackStop != null && typeof p.onPlaybackStop === 'function') {
        p.onPlaybackStop.call(p.callbacksContext || this);
      }
    }
    /*
      Method to call onPlaybackComplete callback
      @private
    */

  }, {
    key: '_playbackComplete',
    value: function _playbackComplete() {
      var p = this._props;
      if (p.onPlaybackComplete != null && typeof p.onPlaybackComplete === 'function') {
        p.onPlaybackComplete.call(p.callbacksContext || this);
      }
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
      Method to launch onRefresh callback.
      @method _refresh
      @private
      @param {Boolean} If refresh even before start time.
    */

  }, {
    key: '_refresh',
    value: function _refresh(isBefore) {
      var p = this._props;
      if (p.onRefresh != null) {
        var context = p.callbacksContext || this,
            progress = isBefore ? 0 : 1;

        p.onRefresh.call(context, isBefore, p.easing(progress), progress);
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
      this._playbackComplete();
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
      _get(Tween.prototype.__proto__ || Object.getPrototypeOf(Tween.prototype), '_setProp', this).call(this, obj, value);
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
      if (key === 'easing') {
        value = _easing2.default.parseEasing(value);
        value._parent = this;
      }
      // handle control callbacks overrides
      var control = this._callbackOverrides[key],
          isntOverriden = !value || !value.isMojsCallbackOverride;
      if (control && isntOverriden) {
        value = this._overrideCallback(value, control);
      }
      // call super on Module
      _get(Tween.prototype.__proto__ || Object.getPrototypeOf(Tween.prototype), '_assignProp', this).call(this, key, value);
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
}(_classProto2.default);

exports.default = Tween;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _tween = __webpack_require__(1);

var _tween2 = _interopRequireDefault(_tween);

var _timeline = __webpack_require__(3);

var _timeline2 = _interopRequireDefault(_timeline);

var _tweener = __webpack_require__(0);

var _tweener2 = _interopRequireDefault(_tweener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mojs = {
  revision: '2.0.0',
  Tween: _tween2.default, Timeline: _timeline2.default, tweener: tweener
};

/**
 * Definitions - AMD, CommonJS, ES2015, Global
 */
if (true) {
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return mojs;
  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
if (( false ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
  module.exports = mojs;
}
exports.default = mojs;

typeof window !== 'undefined' && (window.mojs = mojs);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _h = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../h\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

var _h2 = _interopRequireDefault(_h);

var _tweener = __webpack_require__(0);

var _tweener2 = _interopRequireDefault(_tweener);

var _tween = __webpack_require__(1);

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timeline = function (_Tween) {
  _inherits(Timeline, _Tween);

  _createClass(Timeline, [{
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
        for (var _iterator = timeline[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    /*
      API method to stop the Tween.
      @public
      @param   {Number} Progress [0..1] to set when stopped.
      @returns {Object} Self.
    */

  }, {
    key: 'stop',
    value: function stop(progress) {
      _get(Timeline.prototype.__proto__ || Object.getPrototypeOf(Timeline.prototype), 'stop', this).call(this, progress);
      this._stopChildren(progress);
      return this;
    }
    /*
      Method to reset tween's state and properties.
      @public
      @overrides @ Tween
      @returns this.
    */

  }, {
    key: 'reset',
    value: function reset() {
      _get(Timeline.prototype.__proto__ || Object.getPrototypeOf(Timeline.prototype), 'reset', this).call(this);
      this._resetChildren();
      return this;
    }
    /*
      Method to call `reset` method on all children.
      @private
    */

  }, {
    key: '_resetChildren',
    value: function _resetChildren() {
      for (var i = 0; i < this._timelines.length; i++) {
        this._timelines[i].reset();
      }
    }
    /*
      Method to call `stop` method on all children.
      @private
      @param   {Number} Progress [0..1] to set when stopped.
    */

  }, {
    key: '_stopChildren',
    value: function _stopChildren(progress) {
      for (var i = this._timelines.length - 1; i >= 0; i--) {
        this._timelines[i].stop(progress);
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
      // we need to pass self previous time to children
      // to prevent initial _wasUnknownUpdate nested waterfall
      // if not yoyo option set, pass the previous time
      // otherwise, pass previous or next time regarding yoyo period.

      // COVER CURRENT SWAPPED ORDER
      this._updateChildren(p, time, isYoyo);

      _tween2.default.prototype._setProgress.call(this, p, time);
    }
  }, {
    key: '_updateChildren',
    value: function _updateChildren(p, time, isYoyo) {
      var coef = time > this._prevTime ? -1 : 1;
      if (this._props.isYoyo && isYoyo) {
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
          timelineTime = p.repeatTime / p.speed + (p.shiftTime || 0) + timeline._negativeShift;

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
      var isReset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _get(Timeline.prototype.__proto__ || Object.getPrototypeOf(Timeline.prototype), '_setStartTime', this).call(this, time);
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
      var isReset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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
      Method to launch onRefresh callback.
      @method _refresh
      @private
      @overrides @ Tween
      @param {Boolean} If refresh even before start time.
    */

  }, {
    key: '_refresh',
    value: function _refresh(isBefore) {
      var len = this._timelines.length;
      for (var i = 0; i < len; i++) {
        this._timelines[i]._refresh(isBefore);
      }
      _get(Timeline.prototype.__proto__ || Object.getPrototypeOf(Timeline.prototype), '_refresh', this).call(this, isBefore);
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
      _get(Timeline.prototype.__proto__ || Object.getPrototypeOf(Timeline.prototype), '_declareDefaults', this).call(this);
      // remove default 
      this._defaults.duration = 0;
      this._defaults.easing = 'Linear.None';
      this._defaults.backwardEasing = 'Linear.None';
      this._defaults.nameBase = 'Timeline';
    }
  }]);

  function Timeline() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Timeline);

    return _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).call(this, o));
  }
  /*
    Method to declare some vars.
    @private
  */


  _createClass(Timeline, [{
    key: '_vars',
    value: function _vars() {
      this._timelines = [];
      _get(Timeline.prototype.__proto__ || Object.getPrototypeOf(Timeline.prototype), '_vars', this).call(this);
    }
  }]);

  return Timeline;
}(_tween2.default);

exports.default = Timeline;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ClassProto - base class for module.
 * It is needed to:
 *   - declare `_defaults`
 *   - extend `_defaults` by `options` and save result to `_props`
 *   - declare `_vars` after extention
 *   - call `_render` eventually
 */
var ClassProto = function () {
  function ClassProto() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ClassProto);

    this._o = o;

    this._init();
    this.declareDefaults();
    this._extendDefaults();
    this._vars();
    this._render();
  }

  /**
   * _declareDefaults - function to declare `_defaults` object.
   */


  _createClass(ClassProto, [{
    key: "declareDefaults",
    value: function declareDefaults() {
      this.defaults = {};
    }

    /*
      Method to copy `_o` options to `_props` object
      with fallback to `_defaults`.
      @private
    */

  }, {
    key: "_extendDefaults",
    value: function _extendDefaults() {
      this._props = _extends({}, this._defaults, this._o);
    }

    /**
     * _vars - function do declare `variables` after `_defaults` were extended
     *         by `options` and saved to `_props`
     *
     * @return {type}  description
     */

  }, {
    key: "_vars",
    value: function _vars() {}

    /**
     * _render - method to render on initialization.
     */

  }, {
    key: "render",
    value: function render() {}
  }]);

  return ClassProto;
}();

exports.default = Module;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token, expected ; (7:22)\n\n\u001b[0m \u001b[90m  5 | \u001b[39m\u001b[90m * `easing` - object that holds all easing avaliable in `mojs`.\u001b[39m\n \u001b[90m  6 | \u001b[39m\u001b[90m */\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m  7 | \u001b[39m\u001b[36mexport\u001b[39m \u001b[36mdefault\u001b[39m easing {\n \u001b[90m    | \u001b[39m                      \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m  8 | \u001b[39m\n \u001b[90m  9 | \u001b[39m  \u001b[90m/**\u001b[39m\n \u001b[90m 10 | \u001b[39m\u001b[90m   * `Linear` easing, also `null` or `id` easing - simply returns whatever\u001b[39m\u001b[0m\n");

/***/ })
/******/ ]);
});