(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    /**
     * ClassProto - base class for module.
     * It is needed to:
     *   - declare `_defaults`
     *   - extend `_defaults` by `options` and save result to `_props`
     *   - declare `_vars` after extention
     *   - call `_render` eventually
     */
    var ClassProto = {};

    /**
     * get - Method to get a property from `_props`.
     *
     * @public
     * @param {String} Key.
     * @returns {Any} Value from the `_props` by `key`.
     */
    ClassProto.get = function (key) {
      return this._props[key];
    };

    /**
     * get - Method to get a property from `_props`.
     *
     * @public
     * @param {String} Key.
     * @param {Any} Value.
     */
    ClassProto.set = function (key, value) {
      this._props[key] = value;
    };

    /**
     * _init - lifecycle initialization function.
     *
     * @private
     */
    ClassProto.init = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // save options
      this._o = o;

      this._declareDefaults();
      this._extendDefaults();
      this._vars();
    };

    /**
     * _declareDefaults - function to declare `_defaults` object.
     *
     * @private
     */
    ClassProto._declareDefaults = function () {
      this._defaults = {};
    };

    /**
     * _extendDefaults - Method to copy `_o` options to `_props` object
     *                  with fallback to `_defaults`.
     * @private
     */
    ClassProto._extendDefaults = function () {
      this._props = _extends({}, this._defaults, this._o);
    };

    /**
     * _vars - function do declare `variables` after `_defaults` were extended
     *         by `options` and saved to `_props`
     *
     * @return {type}  description
     */
    ClassProto._vars = function () {};

    exports.ClassProto = ClassProto;
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(4), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../constants'), require('./easing'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.constants, global.easing);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(4), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.constants, global.easing);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _constants, _easing) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseEasing = undefined;

    // import { basicEasing } from './basic-easing';

    /**
     * parseEasing - function to parse all easing values to a function.
     *
     * @param  {String, Function, Array} Easing representation.
     * @return {Function} Parsed Easing.
     */
    var parseEasing = function () {
      var ease = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.defaultEasingString;

      var type = typeof ease;

      switch (type) {
        case 'function':
          {
            return ease;
          }
        case 'string':
          {
            ease = ease.toLowerCase().split('.');
            var easeParent = _easing.easing[ease[0]];

            if (!easeParent) {
              console.error(_constants.consoleName + ' Easing with name "' + ease[0] + '" wasn\'t found, fallback to "' + _constants.defaultEasingString + '" instead.', _easing.easing);

              return _easing.easing[_constants.defaultEasing[0]][_constants.defaultEasing[1]];
            }
            return easeParent[ease[1]];
            // comming soon:
            // parse `path` easing that can start with `M`, `SVG` command.
            // ---
            // if (easing.charAt(0).toLowerCase() !== 'm') { }
            // else { return this.path(easing); }
          }
        // // comming soon:
        // //   - if array passed - parse as `bezier` function
        // // ---
        // case 'object' {
        //   if (easing instanceof Array) {
        //     return this.bezier.apply(this, easing);
        //   } else {
        //     console.error(
        //       `:mojs: Failed to parse easing value of `,
        //       easing,
        //       ` fallback to "linear.none" instead`
        //     );
        //     return easing[defaultEasing[0]][defaultEasing[1]];
        //   }
        // }
      }
    };

    exports.parseEasing = parseEasing;
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var tweenieDefaults = {
      /* delay of the tween [-∞..∞] */
      delay: 0,
      /* duration of the tween [0..∞] */
      duration: 350,
      /* speed of playback [0..∞], speed that is less then 1
         will slowdown playback, for instance .5 will make tween
         run 2x slower. Speed of 2 will speedup the tween to 2x. */
      speed: 1,
      /* repeat of the tween [0..∞], means how much to
         repeat the tween regardless first run,
         for instance repeat: 2 will make the tween run 3 times */
      /* easing for the tween, could be any easing type [link to easing-types.md] */
      easing: 'Sin.Out',
      /*
        Easing for backward direction of the tweenthe tween,
        if `null` - fallbacks to `easing` property.
        forward direction in `yoyo` period is treated as backward for the easing.
      */
      backwardEasing: null,
      /* if should reverse the tween */
      isReverse: false,

      onUpdate: function () {},
      /*
        onStart callback runs on very start of the tween just after onProgress
        one. Runs on very end of the tween if tween is reversed.
        @param {Boolean}  Direction of the tween.
                          `true` for forward direction.
                          `false` for backward direction(tween runs in reverse).
      */
      onStart: function () {},
      onComplete: function () {},
      // `onChimeIn` is invoked when the `Tweenie` becomes active
      // kind of like `onStart` but regardless `isReverse` option
      onChimeIn: function () {},
      // `onChimeOut` is invoked when the `Tweenie` becomes active
      // kind of like `onComplete` but regardless `isReverse` option
      onChimeOut: function () {},
      /**
       * onSkip - callback is called when progress runs over the `_end` time
       * and then suddenly goes before the `_start` time. Indecates that
       * progress (1) should be refreshed to (0), or vice versa.
       *
       * @param {Boolean} isForward
       *                    - `true` if skipped in forward direction
       *                    - `false` if skipped in backward direction
       */
      onSkip: function () {},
      // playback callbacks, these fire only when
      // `play`, `replay`, `playBackward`, `replayBackward` were called
      onPlaybackStart: function () {},
      onPlaybackPause: function () {},
      onPlaybackStop: function () {},
      onPlaybackComplete: function () {},
      // tweenie index
      index: 0,
      // shift time - mostly needed for timeline
      shiftTime: 0
    };

    exports.tweenieDefaults = tweenieDefaults;
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(2), __webpack_require__(11), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../class-proto'), require('./tweenie-defaults'), require('./tweener'), require('../easing/parse-easing'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classProto, global.tweenieDefaults, global.tweener, global.parseEasing);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(2), __webpack_require__(11), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.classProto, global.tweenieDefaults, global.tweener, global.parseEasing);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _classProto, _tweenieDefaults, _tweener, _parseEasing) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Tweenie = undefined;


    /* -------------------- */
    /* The `Tweenie` class  */
    /* -------------------- */

    /**
     * TODO:
     *    - add `onRefresh` callbacks
     *    - add `yoyo` option for repeat
     */

    var Tweenie = Object.create(_classProto.ClassProto);
    /**
     * _declareDefaults - function to declare `_defaults` object.
     *
     * @private
     * @override ClassProto
     */
    Tweenie._declareDefaults = function () {
      this._defaults = _tweenieDefaults.tweenieDefaults;
    };

    /* ---------------------- */
    /* The `Public` functions */
    /* ---------------------- */

    /**
     * play - function to `play` the tween.
     *
     * @public
     * @param {Number} Repeat count
     * @returns {Object} This tween.
     */
    Tweenie.play = function (repeat) {
      if (this._state === 'play') {
        return this;
      }

      // if repeat passed - save it
      if (repeat !== void 0) {
        this._repeat = repeat;
      }

      this._setState('play');
      this._setupPlay('play');

      this._playTime = performance.now();
      this._speed = this._props.speed;

      return this;
    };

    /**
     * pause - function to `pause` the tween.
     *
     * @public
     * @returns {Object} This tween.
     */
    Tweenie.pause = function () {
      if (this._state === 'pause' || this._state === 'stop') {
        return this;
      }

      _tweener.tweener.remove(this);
      this._setState('pause');
      // reset speed variable to `1` because speed should not be applied
      // when setProgress is used
      this._speed = 1;

      return this;
    };

    /*
     * stop - function to stop the tween.
     *
     * @public
     * @param {Number} Progress to stop with in [0...1]
     * @returns {Object} This tweenie.
     */
    Tweenie.stop = function (progress) {
      if (this._state === 'stop') {
        return this;
      }

      var stopProc = progress !== void 0 ? progress
      /* if no progress passsed - set 1 if tween
         is playingBackward, otherwise set to 0 */
      : this._props.isReverse === true ? 1 : 0;

      _tweener.tweener.remove(this);
      this.setProgress(stopProc);
      this.reset();

      return this;
    };

    /**
     * play - function to `replay`(`retart`) the tween.
     *
     * @public
     * @param {Number} Repeat count.
     * @returns {Object} This tween.
     */
    Tweenie.replay = function (repeat) {
      this.reset();
      this.play(repeat);

      return this;
    };

    /**
     * setSpeed - function to set speed.
     *
     * @public
     * @param {Number} Speed in [0..∞]
     * @return {Object} This tween.
     */
    Tweenie.setSpeed = function (speed) {
      this._props.speed = speed;

      if (this._state === 'play') {
        this.setStartTime();
        this._speed = speed;
        this._playTime = performance.now();
      }

      return this;
    };

    /**
     * reverse - function to `reverse` the tween.
     *
     * @public
     * @returns {Object} This tween.
     */
    Tweenie.reverse = function () {
      this._props.isReverse = !this._props.isReverse;
      // reverse callbacks in the `_cbs`
      this._reverseCallbacks();

      if (this._elapsed > 0) {
        var delay = this._props.delay;

        this._elapsed = this._end - this._spot - (this._elapsed - delay);
      }

      this.setStartTime();

      return this;
    };

    /**
     * setProgress - function to set tween progress.
     *
     * @public
     * @param {Number} Progress to set.
     * @return {Object} This tween.
     */
    Tweenie.setProgress = function () {
      var progress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this._start === void 0 && this.setStartTime();

      var time = progress === 1 ? this._end : this._spot + progress * (this._end - this._spot);

      // set initial time
      if (this._prevTime === void 0) {
        this._prevTime = this._start;
      }

      this.update(time);

      return this;
    };

    /**
     * reset - function to reset the `Tweenie`.
     */
    Tweenie.reset = function () {
      this._isActive = false;
      this._elapsed = 0;
      this._setState('stop');
      delete this._prevTime;
    };

    /* --------------------- */
    /* The `Private` functions */
    /* --------------------- */

    /**
     * _setupPlay - function to setup before `play`.
     *
     * @public
     * @param {Sting} Direction ['play', 'reverse']
     * @returns {Object} This tween.
     */
    Tweenie._setupPlay = function (type) {
      this.setStartTime();
      _tweener.tweener.add(this);
    };

    /**
     * _vars - function do declare `variables` after `_defaults` were extended
     *         by `options` and saved to `_props`
     *
     * @return {type}  description
     */
    Tweenie._vars = function () {
      var _props = this._props,
          isReverse = _props.isReverse,
          onStart = _props.onStart,
          onComplete = _props.onComplete,
          onChimeIn = _props.onChimeIn,
          onChimeOut = _props.onChimeOut,
          delay = _props.delay,
          duration = _props.duration;


      this._isActive = false;
      // time progress
      this._elapsed = 0;
      // initial state
      this._state = 'stop';
      // set "id" speed
      this._speed = 1;

      this._time = delay + duration;

      // this._prevTime = -Infinity;
      this._prevTime;

      // callbacks array - used to flip the callbacks order on `isReverse`
      this._cbs = [onStart, onComplete, 0, 1];
      // chime callbacks
      this._chCbs = [onChimeIn, onChimeOut];
      // if `isReverse` - flip the callbacks
      if (isReverse === true) {
        this._reverseCallbacks();
      }
    };

    /**
     * setStartTime - function to set `startTime`
     *
     * @param {Number, Undefined} Start time to set.
     */
    Tweenie.setStartTime = function () {
      var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : performance.now();
      var _props2 = this._props,
          delay = _props2.delay,
          duration = _props2.duration,
          repeat = _props2.repeat,
          shiftTime = _props2.shiftTime;


      // if `elapsed` is greated that end bound -> reset it to `0`
      if (this._elapsed >= this._end - this._spot) {
        this._elapsed = 0;
      }
      // `_spot` - is the animation initialization spot
      // `_elapsed` is how much time elapsed in the `active` period,
      // needed for `play`/`pause` functionality
      this._spot = startTime - this._elapsed + shiftTime;
      // play time is needed to recalculate time regarding `speed`
      this._playTime = this._spot;
      // `_start` - is the active animation start time bound
      this._start = this._spot + delay;
      // `_end` - is the active animation end time bound
      this._end = this._start + duration;
    };

    /**
     * update - function to update `Tweenie` with current time.
     *
     * @param {Number} The current update time.
     */
    Tweenie.update = function (time) {
      var _props3 = this._props,
          onUpdate = _props3.onUpdate,
          isReverse = _props3.isReverse,
          index = _props3.index,
          easing = _props3.easing,
          backwardEasing = _props3.backwardEasing;


      // recalculate `time` regarding `speed`
      time = this._playTime + this._speed * (time - this._playTime);

      // save elapsed time
      this._elapsed = time - this._spot;

      // `onSkip` forward
      if (time >= this._end && this._prevTime <= this._start) {
        // if `prevTime` was <= `_start` might need a refresh
        this._props.onSkip(true, index, time, this._prevTime);
      }

      // `onSkip` backward
      if (time <= this._start && this._prevTime >= this._end) {
        this._props.onSkip(false, index, time, this._prevTime);
      }

      // if forward progress
      var isForward = time > this._prevTime;
      var ease = isForward !== isReverse ? easing : backwardEasing;

      if (time >= this._start && time <= this._end && this._prevTime !== void 0) {
        var isActive = void 0;
        var p = (time - this._start) / this._props.duration;
        var progress = isReverse === false ? p : 1 - p;
        onUpdate(ease(progress), progress, isForward, time);

        if (time > this._start && this._isActive === false && isForward === true) {
          // `onStart`
          this._cbs[0](isForward, isReverse, index);
          // `onChimeIn`
          this._chCbs[0](isForward, isReverse, index, time);
        }

        if (time === this._start) {
          // `onStart`
          this._cbs[0](isForward, isReverse, index);
          // `onChimeIn`
          this._chCbs[0](isForward, isReverse, index, time);
          // set `isActive` to `true` for forward direction
          // but set it to `false` for backward
          isActive = isForward;
        }

        if (time < this._end && this._isActive === false && isForward === false) {
          // `onComplete`
          this._cbs[1](false, isReverse, index);
          // `onChimeOut`
          this._chCbs[1](isForward, isReverse, index, time);
        }

        if (time === this._end) {
          // `onComplete`
          this._cbs[1](isForward, isReverse, index);
          // `onChimeOut`
          this._chCbs[1](isForward, isReverse, index, time);
          // set `isActive` to `false` for forward direction
          // but set it to `true` for backward
          isActive = !isForward;
        }

        this._isActive = isActive === undefined ? true : isActive;

        this._prevTime = time;

        return !this._isActive;
      }

      if (time > this._end && this._isActive === true) {
        // one
        onUpdate(ease(this._cbs[3]), this._cbs[3], isForward, time);
        // `onComplete`
        this._cbs[1](isForward, isReverse, index);
        // `onChimeOut`
        this._chCbs[1](isForward, isReverse, index, time);
        this._isActive = false;
        this._prevTime = time;
        return true;
      }

      if (time < this._start && this._isActive === true) {
        // zero
        onUpdate(ease(this._cbs[2]), this._cbs[2], isForward, time);
        // `onStart`
        this._cbs[0](isForward, isReverse, index);
        // `onChimeIn`
        this._chCbs[0](isForward, isReverse, index, time);

        this._isActive = false;
        this._prevTime = time;

        return true;
      }

      this._prevTime = time;
    };

    /**
     * Function to reverse callbacks.
     */
    Tweenie._reverseCallbacks = function () {
      this._cbs = [this._cbs[1], this._cbs[0], this._cbs[3], this._cbs[2]];
    };

    /*
     * Method set playback `_state` string and call appropriate callbacks.
     *
     * @private
     * @param {String} State name [play, pause, 'stop', 'reverse']
     */
    Tweenie._setState = function (state) {
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
        this._props.onPlaybackStart(state, this._prevState);
      }
      if (state === 'pause' && wasPlaying) {
        this._props.onPlaybackPause();
      }
      if (state === 'stop' && (wasPlaying || wasPause)) {
        this._props.onPlaybackStop();
      }
    };

    /**
     * onTweenerFinish - function that is called when the tweeener finished
     *                   playback for this tween and removed it from the queue
     *
     */
    Tweenie.onTweenerFinish = function () {
      var count = this._repeat - 1;
      var isForward = !this._props.isReverse;
      this._props.onPlaybackComplete(isForward, count > 0 ? count : 0);

      this.reset();

      if (this._repeat > 0) {
        this.play(count);
      }
    };

    /**
     * _extendDefaults - Method to copy `_o` options to `_props` object
     *                  with fallback to `_defaults`.
     * @private
     * @overrides @ ClassProto
     */
    Tweenie._extendDefaults = function () {
      // super call
      _classProto.ClassProto._extendDefaults.call(this);
      // parse `easing`
      this._props.easing = (0, _parseEasing.parseEasing)(this._props.easing);
      // parse `backwardEasing`, fallback to `easing` if
      // `backwardEasing` is `null`/`undefined`
      var _props4 = this._props,
          easing = _props4.easing,
          backwardEasing = _props4.backwardEasing;

      this._props.backwardEasing = backwardEasing != null ? (0, _parseEasing.parseEasing)(backwardEasing) : easing;
    };

    /**
     * Imitate `class` with wrapper
     *
     * @param {Object} Options object.
     * @returns {Object} Tweenie instance.
     */
    var wrap = function (o) {
      var instance = Object.create(Tweenie);
      instance.init(o);

      return instance;
    };

    wrap.__mojsClass = Tweenie;

    exports.Tweenie = wrap;
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    /**
     * Constants.
     */
    var defaultEasing = exports.defaultEasing = ['sin', 'out'];
    var defaultEasingString = exports.defaultEasingString = defaultEasing.join('.');
    var name = exports.name = 'mojs';
    var consoleName = exports.consoleName = ':' + name + ':';
  });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    /**
     * Function parse number delta.
     *
     * @param {String} Name of the property.
     * @param {Object} Object to parse.
     * @returns {Object} Parsed `delta`.
     */
    var parseNumber = function (name, object) {
      var result = _extends({
        type: 'number',
        name: name
      }, object);
      // parse the values in case we have strings there
      result.start = parseFloat(result.start);
      result.end = parseFloat(result.end);
      // calculate delta
      result.delta = result.end - result.start;

      return result;
    };

    exports.parseNumber = parseNumber;
  });
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./unit-regexp'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.unitRegexp);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.unitRegexp);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _unitRegexp) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseUnit = undefined;

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    var getRegexpUnit = function (value) {
      if (typeof value !== 'string') {
        return undefined;
      }
      var valueMatch = value.match(_unitRegexp.unitRegexp);
      return valueMatch !== null ? valueMatch[0] : undefined;
    };

    /**
     * Function parse number delta.
     *
     * @param {String} Name of the property.
     * @param {Object} Object to parse.
     * @returns {Object} Parsed `delta`.
     */
    var parseUnit = function (name, object) {
      var result = _extends({
        type: 'unit',
        name: name
      }, object);

      // get start and end units
      var startUnit = getRegexpUnit(result.start);
      var endUnit = getRegexpUnit(result.end);
      // get the unit for both with priority to startUnit
      result.unit = endUnit || startUnit || 'px';

      // parse the values in case we have strings there
      result.start = parseFloat(result.start);
      result.end = parseFloat(result.end);

      // calculate delta
      result.delta = result.end - result.start;

      return result;
    };

    exports.parseUnit = parseUnit;
  });
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../easing/parse-easing'), require('../tween/tweenie-defaults'), require('../delta/separate-tweenie-options'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.parseEasing, global.tweenieDefaults, global.separateTweenieOptions);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.parseEasing, global.tweenieDefaults, global.separateTweenieOptions);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _parseEasing, _tweenieDefaults, _separateTweenieOptions) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.splitDelta = undefined;

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    /**
     * Function to split the delta object to `tweenie` options and actual `delta`.
     *
     * @param {Object} Object to split.
     * @returns {Object} Split `delta`.
     */
    var splitDelta = function (object) {
      object = _extends({}, object);
      // save curve because we need it directly on the
      // parsed `delta` object vs `tweenie`
      var curve = object.curve !== void 0 ? (0, _parseEasing.parseEasing)(object.curve) : void 0;
      delete object.curve;
      // extract tweenie options
      var tweenieOptions = (0, _separateTweenieOptions.separateTweenieOptions)(object);
      // at this point only the `start` -> `end` should left get the values
      var start = Object.keys(object)[0];
      var end = object[start];

      return { start: start, end: end, curve: curve, tweenieOptions: tweenieOptions };
    };

    exports.splitDelta = splitDelta;
  });
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /**
     * The regexp intended to parse all `units` supported.
     */
    var unitRegexp = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin|deg|fr/gim;

    exports.unitRegexp = unitRegexp;
  });
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./pow'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.pow);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.pow);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _pow) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.easing = undefined;


    /**
     * `easing` - object that holds all easing avaliable in `mojs`.
     */
    var easing = {
      /**
       * `Linear` easing, also `null` or `id` easing - simply returns whatever
       * passed to the function.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      linear: { none: function (k) {
          return k;
        } },

      /**
       * `Sin` easing. Has `in`/`out`/`inout` options.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      sin: {
        in: function (k) {
          return 1 - Math.cos(k * Math.PI / 2);
        },
        out: function (k) {
          return Math.sin(k * Math.PI / 2);
        },
        inout: function (k) {
          return 0.5 * (1 - Math.cos(Math.PI * k));
        }
      },

      pow: _pow.pow
    }; /**
        * TODO:
        *  [] add `setParent` public method.
        */

    exports.easing = easing;
  });
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var pow = function () {
      var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

      var easeIn = function (p) {
        return function (t) {
          return Math.pow(t, p);
        };
      }(p);
      var easeOut = function (p) {
        return function (t) {
          return 1 - Math.abs(Math.pow(t - 1, p));
        };
      }(p);

      return {
        in: easeIn,
        out: easeOut,
        inout: function (t) {
          return t < .5 ? easeIn(t * 2) / 2 : easeOut(t * 2 - 1) / 2 + .5;
        }
      };
    };

    exports.pow = pow;
  });
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /**
     * Tweener - singleton object that is responsible of:
     *  - starting `requestAnimationFrame` loop
     *  - stopping `requestAnimationFrame` loop
     *  - holding `tween`/`timeline` objects and passing current time to them.
     */

    var tweens = [];
    var savedTweens = [];
    var isRunning = false;

    /**
     * `savePlayingTweens` - function to store all playing tweenes
     *                       when user leaves a page.
     */
    var savePlayingTweens = function () {
      savedTweens = tweens.slice(0);
      for (var i = 0; i < savedTweens.length; i++) {
        savedTweens[i].pause();
      }
    };

    /**
     * `restorePlayingTweens` - function to restore all playing tweens.
     */
    var restorePlayingTweens = function () {
      for (var i = 0; i < savedTweens.length; i++) {
        savedTweens[i].play();
      }
    };

    /**
     * `onVisibilityChange` - visibilityChange handler.
     */
    var onVisibilityChange = function () {
      if (document['hidden']) {
        savePlayingTweens();
      } else {
        restorePlayingTweens();
      }
    };

    /**
     * `stop` - function to stop the animation loop.
     */
    var stop = function () {
      tweens.length = 0;
      isRunning = false;
    };

    // needed?
    // /**
    //  * `removeAll` - function stop updating all the child tweens/timelines.
    //  *
    //  * @return {type}  description
    //  */
    // const removeAll = () => { tweens.length = 0; };

    /**
     * `remove` - function to remove specific tween/timeline form updating.
     */
    var remove = function (tween) {
      var index = typeof tween === 'number' ? tween : tweens.indexOf(tween);

      if (index !== -1) {
        tween = tweens[index];
        // needed?
        // tween._isRunning = false;
        tweens.splice(index, 1);
      }
    };

    /**
     *  `update` - fucntion  to update every tween/timeline on animation frame.
     */
    var update = function (time) {
      var i = tweens.length;
      while (i--) {
        var tween = tweens[i];
        if (tween.update(time) === true) {
          remove(tween);
          tween.onTweenerFinish();
        }
      }
    };

    /*
     Main animation loop. Should have only one concurrent loop.
     @private
     @returns this
    */
    var loop = function () {
      if (tweens.length === 0) {
        return stop();
      }
      update(performance.now());
      requestAnimationFrame(loop);
    };

    /**
     * `start` - function to start the animation loop.
     */
    var start = function () {
      if (isRunning) {
        return;
      };
      isRunning = true;
      requestAnimationFrame(loop);
    };

    /**
     * `add` - function to add a Tween/Timeline to loop pool.
     */
    var add = function (tween) {
      tweens.push(tween);
      start();
    };

    /**
     * `caffeinate` - function to keep tweener awake on page blur.
     */
    var caffeinate = function () {
      document.removeEventListener('visibilitychange', onVisibilityChange, false);
    };

    // listen to visibility change
    document.addEventListener('visibilitychange', onVisibilityChange, false);

    var tweener = { add: add, remove: remove, caffeinate: caffeinate };

    // const tweener = new Tweener;
    exports.tweener = tweener;
  });
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6), __webpack_require__(5), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../class-proto'), require('../tween/tweenie'), require('./split-delta'), require('./parse-unit'), require('./parse-number'), require('./unit-regexp'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classProto, global.tweenie, global.splitDelta, global.parseUnit, global.parseNumber, global.unitRegexp);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6), __webpack_require__(5), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.classProto, global.tweenie, global.splitDelta, global.parseUnit, global.parseNumber, global.unitRegexp);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _classProto, _tweenie, _splitDelta, _parseUnit, _parseNumber, _unitRegexp) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Delta = undefined;

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    // map that holds all available parsers
    var parsersMap = {
      unit: _parseUnit.parseUnit,
      number: _parseNumber.parseNumber
    };

    /* ------------------ */
    /* The `Delta` class  */
    /* ------------------ */

    var Delta = Object.create(_classProto.ClassProto);

    /**
     * `init` - function init the class.
     *
     * @extends @ClassProto
     * @public
     */
    Delta.init = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // super call
      _classProto.ClassProto.init.call(this, o);
      // parse delta
      this._parseDelta();
      // set up the update function acording to the delta type
      this.update = this['_upd_' + this._delta.type];
      // set up the tweenie
      this._setupTweenie();
    };

    /**
     * `_upd_number` - function to update `number` delta.
     *
     * @private
     * @param {Number} Eased progress.
     * @param {Number} Progress.
     * @param {Boolean} If forward update direction.
     * @returns {Object} This delta.
     */
    Delta._upd_number = function (ep, p, isForward) {
      var _delta = this._delta,
          curve = _delta.curve,
          delta = _delta.delta,
          start = _delta.start,
          end = _delta.end;
      var _props = this._props,
          target = _props.target,
          key = _props.key;


      target[key] = curve === void 0 ? start + ep * delta : curve(p) * start + p * delta;

      return this;
    };

    /**
     * `_upd_unit` - function to update `unit` delta.
     *
     * @private
     * @param {Number} Eased progress.
     * @param {Number} Progress.
     * @param {Boolean} If forward update direction.
     * @returns {Object} This delta.
     */
    Delta._upd_unit = function (ep, p, isForward) {
      var _delta2 = this._delta,
          curve = _delta2.curve,
          delta = _delta2.delta,
          start = _delta2.start,
          end = _delta2.end,
          unit = _delta2.unit;
      var _props2 = this._props,
          target = _props2.target,
          key = _props2.key;


      var value = curve === void 0 ? start + ep * delta : curve(p) * start + p * delta;

      target[key] = '' + value + unit;

      return this;
    };

    /**
     * `_setupTweenie` - function to set up tweenie if needed.
     */
    Delta._setupTweenie = function () {
      var _this = this;

      var tweenieOptions = this._delta.tweenieOptions;

      // set up tweenie if `tweenOptions` is set
      if (tweenieOptions === void 0) {
        return;
      }

      // create tweenie with tweenie options
      this._tween = new _tweenie.Tweenie(_extends({}, tweenieOptions, {
        // send `onUpdate` function to call the `this.update` function
        // and envoke previous `onUpdate`
        onUpdate: function (ep, p, isForward) {
          _this.update(ep, p, isForward);
          // envoke old `onUpdate` if is present
          if (tweenieOptions.onUpdate !== void 0) {
            tweenieOptions.onUpdate(ep, p, isForward);
          }
        }
      }));
    };

    /**
     * `_declareDefaults` - function to declare defaults.
     *
     * @extends @ClassProto
     * @private
     */
    Delta._declareDefaults = function () {
      this._defaults = {
        key: null,
        object: null,
        customProperties: null,
        target: null
      };
    };

    /**
     * `_parseDelta` - function to parse delta.
     *
     * @private
     */
    Delta._parseDelta = function () {
      var _props3 = this._props,
          key = _props3.key,
          customProperties = _props3.customProperties;


      customProperties != null && customProperties[key] != null ? this._parseByCustom() : this._parseByGuess();
    };

    /**
     * `_parseByGuess` - function to parse delta by guess.
     *
     * @private
     */
    Delta._parseByGuess = function () {
      var _props4 = this._props,
          key = _props4.key,
          object = _props4.object,
          customProperties = _props4.customProperties;

      var split = (0, _splitDelta.splitDelta)(object);
      var start = split.start,
          end = split.end;


      var isUnit = start.match(_unitRegexp.unitRegexp) || end.toString().match(_unitRegexp.unitRegexp);
      var type = isUnit ? 'unit' : 'number';
      this._delta = parsersMap[type](key, (0, _splitDelta.splitDelta)(object));
    };

    /**
     * `_parseByCustom` - function to parse delta with help of customProperties.
     *
     * @private
     */
    Delta._parseByCustom = function () {
      var _props5 = this._props,
          key = _props5.key,
          object = _props5.object,
          customProperties = _props5.customProperties;


      var customProperty = customProperties[key];
      var type = customProperty.type;


      this._delta = parsersMap[type](key, (0, _splitDelta.splitDelta)(object));
    };

    /**
     * Imitate `class` with wrapper
     *
     * @param {Object} Options object.
     * @returns {Object} Tweenie instance.
     */
    var wrap = function (o) {
      var instance = Object.create(Delta);
      instance.init(o);

      return instance;
    };

    wrap.__mojsClass = Delta;

    exports.Delta = wrap;
  });
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory();
    } else {
      var mod = {
        exports: {}
      };
      factory();
      global.mojs = mod.exports;
    }
  })(undefined, function () {
    "use strict";

    var parseDelta = function (key, value) {};

    parseDelta = function (key, value, index) {
      var curve, delta, easing, end, endArr, endColorObj, i, j, len, start, startArr, startColorObj;
      value = this.cloneObj(value);
      easing = value.easing;
      if (easing != null) {
        easing = mojs.easing.parseEasing(easing);
      }
      delete value.easing;
      curve = value.curve;
      if (curve != null) {
        curve = mojs.easing.parseEasing(curve);
      }
      delete value.curve;
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
          type: 'color',
          name: key,
          start: startColorObj,
          end: endColorObj,
          easing: easing,
          curve: curve,
          delta: {
            r: endColorObj.r - startColorObj.r,
            g: endColorObj.g - startColorObj.g,
            b: endColorObj.b - startColorObj.b,
            a: endColorObj.a - startColorObj.a
          }
        };
      } else if (key === 'strokeDasharray' || key === 'strokeDashoffset' || key === 'origin') {
        startArr = this.strToArr(start);
        endArr = this.strToArr(end);
        this.normDashArrays(startArr, endArr);
        for (i = j = 0, len = startArr.length; j < len; i = ++j) {
          start = startArr[i];
          end = endArr[i];
          this.mergeUnits(start, end, key);
        }
        delta = {
          type: 'array',
          name: key,
          start: startArr,
          end: endArr,
          delta: this.calcArrDelta(startArr, endArr),
          easing: easing,
          curve: curve
        };
      } else {
        if (!this.callbacksMap[key] && !this.tweenOptionMap[key]) {
          if (this.unitOptionMap[key]) {
            end = this.parseUnit(this.parseStringOption(end, index));
            start = this.parseUnit(this.parseStringOption(start, index));
            this.mergeUnits(start, end, key);
            delta = {
              type: 'unit',
              name: key,
              start: start,
              end: end,
              delta: end.value - start.value,
              easing: easing,
              curve: curve
            };
          } else {
            end = parseFloat(this.parseStringOption(end, index));
            start = parseFloat(this.parseStringOption(start, index));
            delta = {
              type: 'number',
              name: key,
              start: start,
              end: end,
              delta: end - start,
              easing: easing,
              curve: curve
            };
          }
        }
      }
      return delta;
    };
  });
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./pow'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.pow);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.pow);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _pow) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.addBasicEasing = undefined;


    /**
     * `addBasicEasing` - function to add `basic easing functions`.
     *
     * @param {Object} `mojs` object.
     */
    var addBasicEasing = function (mojs) {
      /**
       * `Quad` easing. Has `in`/`out`/`inout` options.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      mojs.easing.quad = (0, _pow.pow)(2);

      /**
       * `Cubic` easing. Has `in`/`out`/`inout` options.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      mojs.easing.cubic = (0, _pow.pow)(3);

      /**
       * `Quart` easing. Has `in`/`out`/`inout` options.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      mojs.easing.quart = (0, _pow.pow)(4);

      /**
       * `Quint` easing. Has `in`/`out`/`inout` options.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      mojs.easing.quint = (0, _pow.pow)(5);

      /**
       * `Expo` easing. Has `in`/`out`/`inout` options.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      mojs.easing.expo = {
        in: function (k) {
          return k === 0 ? 0 : Math.pow(1024, k - 1);
        },
        out: function (k) {
          return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        },
        inout: function (k) {
          if (k === 0 || k === 1) {
            return k;
          }

          if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
          }

          return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
        }
      };

      /**
       * `Circ` easing. Has `in`/`out`/`inout` options.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      mojs.easing.circ = {
        in: function (k) {
          return 1 - Math.sqrt(1 - k * k);
        },
        out: function (k) {
          return Math.sqrt(1 - --k * k);
        },
        inout: function (k) {
          if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
          }
          return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
        }
      };

      /**
       * `Elastic` easing. Has `in`/`out`/`inout` options.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      mojs.easing.elastic = {
        in: function (k) {
          var p = 0.4;
          var a = 1;
          var s = p / 4;

          if (k === 0 || k === 1) {
            return k;
          }
          return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        },
        out: function (k) {
          var p = 0.4;
          var a = 1;
          var s = p / 4;

          if (k === 0 || k === 1) {
            return k;
          }
          return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
        },
        inout: function (k) {
          if (k === 0 || k === 1) {
            return k;
          }

          k *= 2;

          if (k < 1) {
            return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
          }

          return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
        }
      };

      /**
       * `Back` easing. Has `in`/`out`/`inout` options.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      mojs.easing.back = {
        in: function (k) {
          var s = 1.70158;
          return k * k * ((s + 1) * k - s);
        },
        out: function (k) {
          var s = 1.70158;
          return --k * k * ((s + 1) * k + s) + 1;
        },
        inout: function (k) {
          var s = 1.70158 * 1.525;

          if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
          }

          return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        }
      };

      /**
       * `Bounce` easing. Has `in`/`out`/`inout` options.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      mojs.easing.bounce = {
        in: function (k) {
          return 1 - easing.bounce.out(1 - k);
        },
        out: function (k) {
          if (k < 1 / 2.75) {
            return 7.5625 * k * k;
          } else if (k < 2 / 2.75) {
            return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
          } else if (k < 2.5 / 2.75) {
            return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
          } else {
            return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
          }
        },
        inout: function (k) {
          return k < 0.5 ? easing.bounce.in(k * 2) * 0.5 : easing.bounce.out(k * 2 - 1) * 0.5 + 0.5;
        }
      };
    };

    exports.addBasicEasing = addBasicEasing;
  });
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(0), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./tweenie'), require('../class-proto'), require('../constants'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tweenie, global.classProto, global.constants);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(0), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.tweenie, global.classProto, global.constants);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _tweenie, _classProto, _constants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Timeline = undefined;


    // TODO:
    //  - add `onRefresh` that will call all the child items.

    /* --------------------- */
    /* The `Timeline` class  */
    /* --------------------- */

    var Super = _tweenie.Tweenie.__mojsClass;
    var Timeline = Object.create(Super);

    /**
     * _declareDefaults - function do override some defaults.
     *
     * @overrides @ Tweenie
     * @private
     */
    Timeline._declareDefaults = function () {
      // super call
      Super._declareDefaults.call(this);
      // reset `duration` to `0` because user cannot set duration of a Timeline -
      // it is calculated automatically regarding child timelines durations
      // this._defaults.duration = 0;
      // reset the `easing` since timeline should not have easing by default
      this._defaults.easing = 'linear.none';
    };

    /* ---------------------- */
    /* The `Public` functions */
    /* ---------------------- */

    /**
     * add - function to add `Tweenie` to the timeline.
     *
     * @public
     * @param   {Object, Array} A tweenie or array of tweenies to add.
     * @param   {Number} Time shift >= 0.
     * @returns {Object} Self.
     */
    Timeline.add = function (tweenie) {
      var _this = this;

      var shift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      // make sure the shift is positive
      shift = Math.abs(shift);
      // if tweenie is really an array of tweenies,
      // loop thru them and add one by one
      if (tweenie instanceof Array) {
        tweenie.forEach(function (tweenie) {
          _this.add(tweenie, shift);
        });
        // if a single tweenie, add it to `_items`
      } else {
        // set the `shiftTime` on tweenie
        tweenie.set('shiftTime', shift);
        // add to child timelines
        this._items.push(tweenie);
        // check if we need to increase timeline's bound
        var _tweenie$_props = tweenie._props,
            delay = _tweenie$_props.delay,
            duration = _tweenie$_props.duration,
            shiftTime = _tweenie$_props.shiftTime;

        var time = delay + duration + shiftTime;
        this._props.duration = Math.max(this._props.duration, time);
      }

      return this;
    };

    /**
     * append - function to append `Tweenie` to the timeline.
     *
     * @public
     * @param   {Object, Array} A tweenie or array of tweenies to append.
     * @param   {Number} Time shift >= 0.
     * @returns {Object} Self.
     */
    Timeline.append = function (tweenie) {
      var shift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      // add the tweenies shifting them to the current `duration`
      this.add(tweenie, this._props.duration + Math.abs(shift));

      return this;
    };

    /**
     * stop - function to stop the Timeline.
     *
     * @public
     * @param   {Number} Progress [0..1] to set when stopped.
     * @returns {Object} Self.
     */
    Timeline.stop = function (progress) {
      Super.stop.call(this, progress);

      for (var i = this._items.length - 1; i >= 0; i--) {
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
    Timeline.reset = function () {
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
    Timeline.setStartTime = function (time) {
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
    Timeline._callOnItems = function (name) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = 0; i < this._items.length; i++) {
        var _items$i;

        (_items$i = this._items[i])[name].apply(_items$i, args);
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
      return function (ep, p, isForward, time) {
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
      Super._vars.call(this);
      // child `timelines`
      this._items = [];
      // reset the duraton because timeline cannot have it
      this._props.duration = 0;
    };

    /**
     * _extendDefaults - Method to copy `_o` options to `_props` object
     *                  with fallback to `_defaults`.
     * @overrides @ Tweenie
     * @private
     */
    Timeline._extendDefaults = function () {
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
    var wrap = function (o) {
      var instance = Object.create(Timeline);
      instance.init(o);

      return instance;
    };

    exports.Timeline = wrap;
  });
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(2), __webpack_require__(15), __webpack_require__(11), __webpack_require__(9), __webpack_require__(1), __webpack_require__(12), __webpack_require__(19), __webpack_require__(13), __webpack_require__(7), __webpack_require__(5), __webpack_require__(6), __webpack_require__(18), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./class-proto'), require('./tween/tweenie'), require('./tween/tweenie-defaults'), require('./tween/timeline'), require('./tween/tweener'), require('./easing/easing'), require('./easing/parse-easing'), require('./delta/delta'), require('./delta/deltas'), require('./delta/parse-delta'), require('./delta/split-delta'), require('./delta/parse-number'), require('./delta/parse-unit'), require('./delta/separate-tweenie-options'), require('./easing/basic-easing'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.classProto, global.tweenie, global.tweenieDefaults, global.timeline, global.tweener, global.easing, global.parseEasing, global.delta, global.deltas, global.parseDelta, global.splitDelta, global.parseNumber, global.parseUnit, global.separateTweenieOptions, global.basicEasing);
    global.mojs = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(2), __webpack_require__(15), __webpack_require__(11), __webpack_require__(9), __webpack_require__(1), __webpack_require__(12), __webpack_require__(19), __webpack_require__(13), __webpack_require__(7), __webpack_require__(5), __webpack_require__(6), __webpack_require__(18), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.classProto, global.tweenie, global.tweenieDefaults, global.timeline, global.tweener, global.easing, global.parseEasing, global.delta, global.deltas, global.parseDelta, global.splitDelta, global.parseNumber, global.parseUnit, global.separateTweenieOptions, global.basicEasing);
      global.mojs = mod.exports;
    }
  })(undefined, function (module, exports, _classProto, _tweenie, _tweenieDefaults, _timeline, _tweener, _easing, _parseEasing, _delta, _deltas, _parseDelta, _splitDelta, _parseNumber, _parseUnit, _separateTweenieOptions, _basicEasing) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });


    var mojs = {
      revision: '2.3.0',
      Tweenie: _tweenie.Tweenie,
      Timeline: _timeline.Timeline,
      easing: _easing.easing,
      __helpers__: {
        parseEasing: _parseEasing.parseEasing,
        ClassProto: _classProto.ClassProto,
        tweenieDefaults: _tweenieDefaults.tweenieDefaults,
        tweener: _tweener.tweener,
        // temporary
        Delta: _delta.Delta,
        Deltas: _deltas.Deltas,
        parseDelta: _parseDelta.parseDelta,
        splitDelta: _splitDelta.splitDelta,
        parseNumber: _parseNumber.parseNumber,
        parseUnit: _parseUnit.parseUnit,
        separateTweenieOptions: _separateTweenieOptions.separateTweenieOptions
      }
    };

    /* Extensions */
    // `basic easing functions`


    // temporary

    // easing

    // tween related

    (0, _basicEasing.addBasicEasing)(mojs);

    // window.onload = () => {
    //   const items = [];
    //   setTimeout(() => {
    //     for (let i = 0; i < 200; i++) {
    //       const tweenie = Tweenie({
    //         duration: 5000,
    //         delay: 200,
    //         // easing: 'linear.none',
    //         onUpdate(ep, p, isForward, isReverse, index) {},
    //         onChimeIn(isForward, isReverse, index) {},
    //         onChimeOut(isForward, isReverse, index) {},
    //         onStart(isForward, isReverse, index) {},
    //         onComplete(isForward, isReverse, index) {}
    //       });
    //       items.push(tweenie);
    //     }
    //
    //     for (let i = 0; i < items.length; i++) {
    //       items[i].play();
    //     }
    //   }, 1000);
    // };

    exports.default = mojs;
    module.exports = exports['default'];
  });
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../tween/tweenie-defaults'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tweenieDefaults);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.tweenieDefaults);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _tweenieDefaults) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.separateTweenieOptions = undefined;


    /**
     * Function to split the delta object to `tweenie` options and actual `delta`.
     *
     * @param {Object} Object to split.
     * @returns {Object} Split `delta`.
     */
    var separateTweenieOptions = function (object) {
      var tweenieOptions = void 0;
      for (var option in _tweenieDefaults.tweenieDefaults) {
        if (object[option] !== void 0) {
          tweenieOptions = tweenieOptions || {};
          tweenieOptions[option] = object[option];
          delete object[option];
        }
      }

      return tweenieOptions;
    };

    exports.separateTweenieOptions = separateTweenieOptions;
  });
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(15), __webpack_require__(12), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../class-proto'), require('../tween/tweenie'), require('../tween/timeline'), require('./delta'), require('./separate-tweenie-options'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classProto, global.tweenie, global.timeline, global.delta, global.separateTweenieOptions);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(15), __webpack_require__(12), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.classProto, global.tweenie, global.timeline, global.delta, global.separateTweenieOptions);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _classProto, _tweenie, _timeline, _delta, _separateTweenieOptions) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Deltas = undefined;

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    /* ------------------- */
    /* The `Deltas` class  */
    /* ------------------- */

    var Deltas = Object.create(_classProto.ClassProto);

    /**
     * `init` - function init the class.
     *
     * @extends @ClassProto
     * @public
     */
    Deltas.init = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // super call
      _classProto.ClassProto.init.call(this, o);

      // clone the options
      var options = _extends({}, o);
      // get `timeline` options and remove them immediately
      var timelineOptions = options.timeline;
      delete options.timeline;

      // set up the main `tweenie`
      this._setupTweenie(options);
      // set up the `timeline`
      this._setupTimeline(timelineOptions);
      // parse deltas from options that left so far
      this._parseDeltas(options);
    };

    /**
     * `_setupTweenie` - function to set up main tweenie.
     *
     * @param {Object} Options.
     */
    Deltas._setupTweenie = function (options) {
      // separate main tweenie options
      var tweenieOptions = (0, _separateTweenieOptions.separateTweenieOptions)(options);
      this._tween = new _tweenie.Tweenie(tweenieOptions);
    };

    /**
     * `_setupTimeline` - function to set up main timeline.
     *
     * @param {Object} Timeline options.
     */
    Deltas._setupTimeline = function (options) {
      this._timeline = new _timeline.Timeline(options);
      this._timeline.add(this._tween);
    };

    /**
     * `_parseDeltas` - function to parse deltas.
     *
     * @param {Object} Options.
     */
    Deltas._parseDeltas = function (options) {
      // deltas that have tween
      this._tweenDeltas = [];
      // deltas that don't have tween
      this._plainDeltas = [];
      // static properties
      this._staticProps = {};
      // loop thru options and create deltas with objects
      for (var key in options) {
        var value = options[key];
        // if value is tatic save it to static props
        if (typeof value !== 'object') {
          this._staticProps[key] = value;
          continue;
        }
        // if value is not static, create delta object
        var delta = new _delta.Delta({ key: key, object: value });
        // check if delta has own tween and add to `_tweenDeltas`
        if (delta._tween) {
          this._tweenDeltas.push(delta);
        }
        // else add to plain deltas
        else {
            this._plainDeltas.push(delta);
          }
      }
      // add tween deltas to the timeline
      this._timeline.add(this._tweenDeltas);
    };

    /**
     * Imitate `class` with wrapper
     *
     * @param {Object} Options object.
     * @returns {Object} Tweenie instance.
     */
    var wrap = function (o) {
      var instance = Object.create(Deltas);
      instance.init(o);

      return instance;
    };

    wrap.__mojsClass = Deltas;

    exports.Deltas = wrap;
  });
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=mo.js.map