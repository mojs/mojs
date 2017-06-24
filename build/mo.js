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
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
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
     * `get` - Method to get a property from `_props`.
     *
     * @public
     * @param {String} Key.
     * @returns {Any} Value from the `_props` by `key`.
     */
    ClassProto.get = function (key) {
      return this._props[key];
    };

    /**
     * `set` - Method to get a property from `_props`.
     *
     * @public
     * @param {String} Key.
     * @param {Any} Value.
     */
    ClassProto.set = function (key, value) {
      this._props[key] = value;
    };

    /**
     * `setIfNotSet` - function to set a property if it isn't
     *                 present in the initialization options.
     *
     * @public
     * @param {String} Key.
     * @param {Any} Value.
     * @returns {Object} This instance.
     */
    ClassProto.setIfNotSet = function (key, value) {
      if (this._o[key] === undefined) {
        this.set(key, value);
      }

      return this;
    };

    /**
     * `init` - lifecycle initialization function.
     *
     * @private
     */
    ClassProto.init = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // save options
      this._o = _extends({}, o);
      // parse index and delete it from options
      this.index = this._o.index || 0;
      delete this._o.index;
      // invoke lifecycle functions
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
     * @private
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
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(13)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./parse-stagger'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.parseStagger);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(13)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.parseStagger);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _parseStagger) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.staggerProperty = undefined;


    var staggerProperty = function (prop, index) {
      var value = prop;
      // if property is an array map the index to some array item
      if (prop instanceof Array) {
        value = prop[index % prop.length];
      }
      // if prop is a function, call the it with index and return the result
      if (typeof prop === 'function' && prop.__mojs__isStaggerFunction) {
        value = prop(index);
      }

      // otherwise return the single property
      return (0, _parseStagger.parseStagger)(value, index);
    };

    exports.staggerProperty = staggerProperty;
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../class-proto'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classProto);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.classProto);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _classProto) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Tweenable = undefined;


    /* --------------------- */
    /* The `Tweenable` class */
    /* --------------------- */

    var Super = _classProto.ClassProto;
    var Tweenable = Object.create(Super);

    /**
     * `init` - lifecycle initialization function.
     *
     * @private
     * @extends @ ClassProto
     */
    Tweenable.init = function (o) {
      var _this = this;

      Super.init.call(this, o);
      // proxy all tween public methods to `timeline` with fallback to `tween`
      var methods = ['play', 'pause', 'stop', 'replay', 'setSpeed', 'reverse', 'setProgress', 'reset', 'setStartTime'];

      var _loop = function (i) {
        var method = methods[i];
        _this[method] = function () {
          var _ref;

          for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }

          rest; // otherwise rest arguments got lost
          (_ref = _this.timeline || _this.tween)[method].apply(_ref, rest);
        };
      };

      for (var i = 0; i < methods.length; i++) {
        _loop(i);
      }
    };

    /**
     * Imitate `class` with wrapper
     *
     * @param {Object} Options object.
     * @returns {Object} Tween instance.
     */
    var wrap = function (o) {
      var instance = Object.create(Tweenable);
      instance.init(o);

      return instance;
    };

    wrap.__mojsClass = Tweenable;

    exports.Tweenable = wrap;
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(5), __webpack_require__(20), __webpack_require__(6), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../class-proto'), require('./tween-defaults'), require('./tweener'), require('../easing/parse-easing'), require('../helpers/stagger-property'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classProto, global.tweenDefaults, global.tweener, global.parseEasing, global.staggerProperty);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(5), __webpack_require__(20), __webpack_require__(6), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.classProto, global.tweenDefaults, global.tweener, global.parseEasing, global.staggerProperty);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _classProto, _tweenDefaults, _tweener, _parseEasing, _staggerProperty) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Tween = undefined;

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

    /* ------------------ */
    /* The `Tween` class  */
    /* ------------------ */

    var Tween = Object.create(_classProto.ClassProto);
    /**
     * _declareDefaults - function to declare `_defaults` object.
     *
     * @private
     * @override ClassProto
     */
    Tween._declareDefaults = function () {
      this._defaults = _extends({}, _tweenDefaults.tweenDefaults);
    };

    /* ---------------------- */
    /* The `Public` functions */
    /* ---------------------- */

    /**
     * play - function to `play` the tween.
     *
     * @public
     * @returns {Object} This tween.
     */
    Tween.play = function () {
      if (this._state === 'play') {
        return this;
      }

      this._setState('play');
      this._setupPlay();

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
    Tween.pause = function () {
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
     * @returns {Object} This tween.
     */
    Tween.stop = function (progress) {
      if (this._state === 'stop') {
        return this;
      }

      var stopProc = progress !== void 0 ? progress
      /* if no progress passsed - set 1 if tween
         is playingBackward, otherwise set to 0 */
      : this._props.isReverse === true ? 1 : 0;

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
    Tween.replay = function (repeat) {
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
    Tween.setSpeed = function (speed) {
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
    Tween.reverse = function () {
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
    Tween.setProgress = function () {
      var progress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this._start === void 0 && this.setStartTime();

      var time = progress === 1 ? this._end : this._spot + progress * (this._end - this._spot);

      // set initial time
      if (this._prevTime === void 0) {
        this._prevTime = this._start;
      }
      // save speed before updating form `setProgress`
      var speed = this._speed;
      this._speed = 1;
      // update with current time
      this.update(time);
      // restore speed after updating form `setProgress`
      this._speed = speed;

      return this;
    };

    /**
     * reset - function to reset the `Tween`.
     */
    Tween.reset = function () {
      _tweener.tweener.remove(this);
      this._isActive = false;
      this._elapsed = 0;
      this._repeatCount = 0;
      this._setState('stop');
      delete this._prevTime;

      return this;
    };

    /* ----------------------- */
    /* The `Private` functions */
    /* ----------------------- */

    /**
     * _setupPlay - function to setup before `play`.
     *
     * @public
     * @returns {Object} This tween.
     */
    Tween._setupPlay = function () {
      this.setStartTime();
      _tweener.tweener.add(this);
    };

    /**
     * _vars - function do declare `variables` after `_defaults` were extended
     *         by `options` and saved to `_props`
     *
     * @return {type}  description
     */
    Tween._vars = function () {
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
      // how many times we have been repeating
      this._repeatCount = 0;
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
    Tween.setStartTime = function () {
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
     * update - function to update `Tween` with current time.
     *
     * @param {Number} The current update time.
     */
    Tween.update = function (time) {
      var _props3 = this._props,
          onUpdate = _props3.onUpdate,
          isReverse = _props3.isReverse,
          easing = _props3.easing,
          backwardEasing = _props3.backwardEasing;


      // recalculate `time` regarding `speed`
      time = this._playTime + this._speed * (time - this._playTime);

      // save elapsed time
      this._elapsed = time - this._spot;

      // if pregress is not right - call the `onRefresh` function #before
      if (time < this._start && this._progress !== this._cbs[2]) {
        this._props.onRefresh(false, this.index, time);
        this._progress = this._cbs[2];
      }
      // if pregress is not right - call the `onRefresh` function #after
      if (time > this._end && this._progress !== this._cbs[3]) {
        this._props.onRefresh(true, this.index, time);
        this._progress = this._cbs[3];
      }

      // if forward progress
      var isForward = time > this._prevTime;
      var ease = isForward !== isReverse ? easing : backwardEasing;

      if (time >= this._start && time <= this._end && this._prevTime !== void 0) {
        var isActive = void 0;
        var p = (time - this._start) / this._props.duration;
        this._progress = isReverse === false ? p : 1 - p;
        onUpdate(ease(this._progress), this._progress, isForward, time);

        if (time > this._start && this._isActive === false && isForward === true) {
          // `onStart`
          this._cbs[0](isForward, isReverse, this.index);
          // `onChimeIn`
          this._chCbs[0](isForward, isReverse, this.index, time);
        }

        if (time === this._start) {
          // `onStart`
          this._cbs[0](isForward, isReverse, this.index);
          // `onChimeIn`
          this._chCbs[0](isForward, isReverse, this.index, time);
          // set `isActive` to `true` for forward direction
          // but set it to `false` for backward
          isActive = isForward;
        }

        if (time < this._end && this._isActive === false && isForward === false) {
          // `onComplete`
          this._cbs[1](false, isReverse, this.index);
          // `onChimeOut`
          this._chCbs[1](isForward, isReverse, this.index, time);
        }

        if (time === this._end) {
          // `onComplete`
          this._cbs[1](isForward, isReverse, this.index);
          // `onChimeOut`
          this._chCbs[1](isForward, isReverse, this.index, time);
          // set `isActive` to `false` for forward direction
          // but set it to `true` for backward
          isActive = !isForward;
        }

        this._isActive = isActive === undefined ? true : isActive;

        this._prevTime = time;

        return !this._isActive;
      }

      if (time > this._end && this._isActive === true) {
        this._progress = this._cbs[3];
        // one
        onUpdate(ease(this._progress), this._progress, isForward, time);
        // `onComplete`
        this._cbs[1](isForward, isReverse, this.index);
        // `onChimeOut`
        this._chCbs[1](isForward, isReverse, this.index, time);
        this._isActive = false;
        this._prevTime = time;
        return true;
      }

      if (time < this._start && this._isActive === true) {
        this._progress = this._cbs[2];
        // zero
        onUpdate(ease(this._progress), this._progress, isForward, time);
        // `onStart`
        this._cbs[0](isForward, isReverse, this.index);
        // `onChimeIn`
        this._chCbs[0](isForward, isReverse, this.index, time);

        this._isActive = false;
        this._prevTime = time;

        return true;
      }

      this._prevTime = time;
    };

    /**
     * Function to reverse callbacks.
     */
    Tween._reverseCallbacks = function () {
      this._cbs = [this._cbs[1], this._cbs[0], this._cbs[3], this._cbs[2]];
    };

    /*
     * Method set playback `_state` string and call appropriate callbacks.
     *
     * @private
     * @param {String} State name [play, pause, 'stop', 'reverse']
     */
    Tween._setState = function (state) {
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
     *                   playback for this tween and removemd it from the queue
     *
     */
    Tween.onTweenerFinish = function () {
      var _props4 = this._props,
          isReverse = _props4.isReverse,
          repeat = _props4.repeat,
          isReverseOnRepeat = _props4.isReverseOnRepeat,
          onPlaybackComplete = _props4.onPlaybackComplete;

      var count = this._repeatCount;

      onPlaybackComplete(!isReverse, count, repeat - count);

      this.reset();

      if (repeat - count > 0) {
        if ((0, _staggerProperty.staggerProperty)(isReverseOnRepeat, count)) {
          this.reverse();
        }

        this._repeatCount = count + 1;
        this.play();
      }
    };

    /**
     * _extendDefaults - Method to copy `_o` options to `_props` object
     *                  with fallback to `_defaults`.
     * @private
     * @overrides @ ClassProto
     */
    Tween._extendDefaults = function () {
      // super call
      _classProto.ClassProto._extendDefaults.call(this);
      // parse stagger
      for (var key in this._props) {
        this._props[key] = (0, _staggerProperty.staggerProperty)(this._props[key], this.index);
      }
      // parse `easing`
      this._props.easing = (0, _parseEasing.parseEasing)(this._props.easing);
      // parse `backwardEasing`, fallback to `easing` if
      // `backwardEasing` is `null`/`undefined`
      var _props5 = this._props,
          easing = _props5.easing,
          backwardEasing = _props5.backwardEasing;

      this._props.backwardEasing = backwardEasing != null ? (0, _parseEasing.parseEasing)(backwardEasing) : easing;
    };

    /**
     * Imitate `class` with wrapper
     *
     * @param {Object} Options object.
     * @returns {Object} Tween instance.
     */
    var wrap = function (o) {
      var instance = Object.create(Tween);
      instance.init(o);

      return instance;
    };

    wrap.__mojsClass = Tween;

    exports.Tween = wrap;
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../tween/tween-defaults'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tweenDefaults);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.tweenDefaults);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _tweenDefaults) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.separateTweenOptions = undefined;


    /**
     * Function to split the delta object to `tween` options and actual `delta`.
     *
     * @param {Object} Object to split.
     * @returns {Object} Split `delta`.
     */
    var separateTweenOptions = function (object) {
      var tweenOptions = void 0;
      for (var option in _tweenDefaults.tweenDefaults) {
        if (object[option] !== void 0) {
          tweenOptions = tweenOptions || {};
          tweenOptions[option] = object[option];
          delete object[option];
        }
      }

      return tweenOptions;
    };

    exports.separateTweenOptions = separateTweenOptions;
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
    var tweenDefaults = {
      // delay of the tween [-∞..∞]
      delay: 0,
      // duration of the tween [0..∞]
      duration: 350,
      // speed of playback [0..∞], speed that is less then 1
      // will slowdown playback, for instance .5 will make tween
      // run 2x slower. Speed of 2 will speedup the tween to 2x.
      speed: 1,
      // easing for the tween, could be any easing type
      easing: 'Sin.Out',
      // Easing for backward direction of the tweenthe tween,
      // if `null` - fallbacks to `easing` property.
      // forward direction in `yoyo` period is treated as backward for the easing.
      backwardEasing: null,
      // if should reverse the tween
      isReverse: false,
      // how many times repeat the tween (excluding the first run)
      repeat: 0,
      // if should `reverse` before repeating
      isReverseOnRepeat: false,
      // `onUpdate` callback is called on every animation frame
      onUpdate: function (ep, p, isForward) {},
      /*
        onStart callback runs on very start of the tween just after onProgress
        one. Runs on very end of the tween if tween is reversed.
        @param {Boolean}  Direction of the tween.
                          `true` for forward direction.
                          `false` for backward direction(tween runs in reverse).
      */
      onStart: function () {},
      onComplete: function () {},
      // `onChimeIn` is invoked when the `Tween` becomes active
      // kind of like `onStart` but regardless `isReverse` option
      onChimeIn: function () {},
      // `onChimeOut` is invoked when the `Tween` becomes active
      // kind of like `onComplete` but regardless `isReverse` option
      onChimeOut: function () {},
      // onRefresh - callback is called when progress runs over the `_end` time
      // and then suddenly goes before the `_start` time. Indecates that
      // progress (1) should be refreshed to (0), or vice versa.
      // @param {Boolean} isForward
      //                    - `true` if skipped in forward direction
      //                    - `false` if skipped in backward direction
      onRefresh: function () {},
      // playback callbacks, these fire only when
      // `play`, `replay`, `playBackward`, `replayBackward` called
      onPlaybackStart: function () {},
      onPlaybackPause: function () {},
      onPlaybackStop: function () {},
      onPlaybackComplete: function () {},
      // tween index
      index: 0,
      // shift time - mostly needed for timeline
      shiftTime: 0
    };

    exports.tweenDefaults = tweenDefaults;
  });
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(19), __webpack_require__(17), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../constants'), require('./easing'), require('./path'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.constants, global.easing, global.path);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(19), __webpack_require__(17), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.constants, global.easing, global.path);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _constants, _easing, _path) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseEasing = undefined;


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
            // path easing
            if (ease[0].toLowerCase() === 'm') {
              return (0, _path.path)(ease);
            }

            ease = ease.toLowerCase().split('.');
            var easeParent = _easing.easing[ease[0]];

            if (!easeParent) {
              console.error(_constants.consoleName + ' Easing with name "' + ease[0] + '" wasn\'t found, fallback to "' + _constants.defaultEasingString + '" instead.', _easing.easing);

              return _easing.easing[_constants.defaultEasing[0]][_constants.defaultEasing[1]];
            }
            return easeParent[ease[1]];
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(24), __webpack_require__(23), __webpack_require__(22), __webpack_require__(21), __webpack_require__(15), __webpack_require__(1), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../class-proto'), require('../tween/tween'), require('./split-delta'), require('./parse-number'), require('./parse-unit'), require('./parse-color'), require('./unit-regexp'), require('../helpers/stagger-property'), require('../helpers/make-color-object'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classProto, global.tween, global.splitDelta, global.parseNumber, global.parseUnit, global.parseColor, global.unitRegexp, global.staggerProperty, global.makeColorObject);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(24), __webpack_require__(23), __webpack_require__(22), __webpack_require__(21), __webpack_require__(15), __webpack_require__(1), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.classProto, global.tween, global.splitDelta, global.parseNumber, global.parseUnit, global.parseColor, global.unitRegexp, global.staggerProperty, global.makeColorObject);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _classProto, _tween, _splitDelta, _parseNumber, _parseUnit, _parseColor, _unitRegexp, _staggerProperty, _makeColorObject) {
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

    /*
      TODO:
        - rename `target` to `el`
    */

    // map that holds all available parsers
    var parsersMap = {
      number: _parseNumber.parseNumber,
      unit: _parseUnit.parseUnit,
      color: _parseColor.parseColor
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
      // save target
      var _props = this._props,
          target = _props.target,
          supportProps = _props.supportProps,
          _props$customProperti = _props.customProperties,
          customProperties = _props$customProperti === undefined ? {} : _props$customProperti,
          key = _props.key;

      // if the `isSkipRender` property is set, set the property on
      // `supportProps` otherwise set is as ususal on the `target` object
      this._target = customProperties[key] && customProperties[key].isSkipRender ? supportProps : target;
      // parse delta
      this._parseDelta();
      // set up the update function acording to the delta type
      this.update = this['_upd_' + this._delta.type];
      // set up the tween
      this._setupTween();
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
      var key = this._props.key;


      this._target[key] = curve === void 0 ? start + ep * delta : curve(p) * start + p * delta;

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
      var key = this._props.key;


      var value = curve === void 0 ? start + ep * delta : curve(p) * start + p * delta;

      this._target[key] = '' + value + unit;

      return this;
    };

    /**
     * `_upd_color` - function to update `color` delta.
     *
     * @private
     * @param {Number} Eased progress.
     * @param {Number} Progress.
     * @param {Boolean} If forward update direction.
     * @returns {Object} This delta.
     */
    Delta._upd_color = function (ep, p, isForward) {
      var _delta3 = this._delta,
          curve = _delta3.curve,
          delta = _delta3.delta,
          start = _delta3.start,
          end = _delta3.end;
      var key = this._props.key;


      if (curve === void 0) {
        var r = start.r + ep * delta.r;
        var g = start.g + ep * delta.g;
        var b = start.b + ep * delta.b;
        var a = start.a + ep * delta.a;
        this._target[key] = 'rgba(' + (r | 0) + ', ' + (g | 0) + ', ' + (b | 0) + ', ' + a + ')';
      } else {
        var curveP = curve(p);
        var _r = curveP * start.r + p * delta.r;
        var _g = curveP * start.g + p * delta.g;
        var _b = curveP * start.b + p * delta.b;
        var _a = curveP * start.a + p * delta.a;
        this._target[key] = 'rgba(' + (_r | 0) + ', ' + (_g | 0) + ', ' + (_b | 0) + ', ' + _a + ')';
      }

      return this;
    };

    /**
     * `_setupTween` - function to set up tween if needed.
     */
    Delta._setupTween = function () {
      var _this = this;

      var tweenOptions = this._delta.tweenOptions;

      // set up tween if `tweenOptions` is set
      if (tweenOptions === void 0) {
        return;
      }

      // create tween with tween options
      this.tween = new _tween.Tween(_extends({
        index: this.index
      }, tweenOptions, {
        // send `onUpdate` function to call the `this.update` function
        // and envoke previous `onUpdate`
        onUpdate: function (ep, p, isForward) {
          _this.update(ep, p, isForward);
          // envoke old `onUpdate` if is present
          if (tweenOptions.onUpdate !== void 0) {
            tweenOptions.onUpdate(ep, p, isForward);
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
        customProperties: {},
        target: null,
        supportProps: null
      };
    };

    /**
     * `_parseDelta` - function to parse delta.
     *
     * @private
     */
    Delta._parseDelta = function () {
      var _props2 = this._props,
          key = _props2.key,
          customProperties = _props2.customProperties;


      customProperties[key] != null ? this._parseByCustom() : this._parseByGuess();
    };

    /**
     * `_parseByGuess` - function to parse delta by guess.
     *
     * @private
     */
    Delta._parseByGuess = function () {
      var _props3 = this._props,
          key = _props3.key,
          object = _props3.object;

      var split = this._getSplit(object);
      // // try to parse `start`/`end` as colors first, if ok - this is a color delta
      var startColor = (0, _makeColorObject.makeColorObject)(split.start);
      var endColor = (0, _makeColorObject.makeColorObject)(split.end);
      if (!startColor.isError && !endColor.isError) {
        return this._delta = (0, _parseColor.parseColor)(key, split);
      }
      // conver the delta properties to string and check if unit is present
      var isUnit = ('' + split.start).match(_unitRegexp.unitRegexp) || ('' + split.end).toString().match(_unitRegexp.unitRegexp);
      // parse regarding unit presence
      var parseType = isUnit ? 'unit' : 'number';
      this._delta = parsersMap[parseType](key, split);
    };

    /**
     * `_parseByCustom` - function to parse delta with help of customProperties.
     *
     * @private
     */
    Delta._parseByCustom = function () {
      var _props4 = this._props,
          key = _props4.key,
          object = _props4.object,
          customProperties = _props4.customProperties;


      var customProperty = customProperties[key];
      var type = customProperty.type;


      this._delta = parsersMap[type](key, this._getSplit(object));
    };

    /**
     * `_getSplit` - function to get options split
     *               and parse `stagger` in `start`/`end` properties.
     *
     * @param {Object} Object to split.
     * @return {Object} Split.
     */
    Delta._getSplit = function (object) {
      var split = (0, _splitDelta.splitDelta)(object);
      // parse the `stagger` in `start`/`end` delta properties
      split.start = (0, _staggerProperty.staggerProperty)(split.start, this.index);
      split.end = (0, _staggerProperty.staggerProperty)(split.end, this.index);

      return split;
    };

    /**
     * Imitate `class` with wrapper
     *
     * @param {Object} Options object.
     * @returns {Object} Tween instance.
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(28)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./div'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.div);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(28)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.div);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _div) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.makeColorObject = undefined;


    /**
     * `normalizeHex` - Function to normalize part of a HEX color to FF format,
     *                  if one character passed, return doubled version of it.
     *
     * @param {Steing} Color part to normalize.
     * @param {Steing} Normalized part of a color.
     */
    var normalizeHex = function (string) {
      return string.length === 2 ? string : string + string;
    };

    /**
     * `parseHEXColor` - function to parse #HEX colors.
     */
    var parseHEXColor = function (color) {
      var result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);
      var colorObj = {};
      if (result) {
        return {
          r: parseInt(normalizeHex(result[1]), 16),
          g: parseInt(normalizeHex(result[2]), 16),
          b: parseInt(normalizeHex(result[3]), 16),
          a: 1
        };
      }
    };

    /**
     * Function to parse a color string to color object.
     *
     * @param {String} String to parse.
     * @returns {Object} Color object.
     */
    var makeColorObject = function (color) {
      var originColor = color;
      // #HEX
      if (color[0] === '#') {
        return parseHEXColor(color);
      } else {
        var isRgb = color[0] === 'r' && color[1] === 'g' && color[2] === 'b';
        // if color is not `rgb`, it is a shortcut (`cyan`, `hotpink` etc)
        // so we need to set the color on DOM element and get the calculated color
        if (!isRgb) {
          _div.div.style.color = 'black';
          _div.div.style.color = color;
          color = window.getComputedStyle(_div.div).color;
        }

        // parse `rgb` color
        var regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),';
        var regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$';
        var result = new RegExp(regexString1 + regexString2, 'gi').exec(color);
        var a = parseFloat(result[4] || 1);

        if (result) {
          var r = parseInt(result[1], 10);
          var g = parseInt(result[2], 10);
          var b = parseInt(result[3], 10);
          // if origin color was not black but black
          // returned from the DOM - that's an error
          return originColor !== 'black' && r === 0 && g === 0 && b === 0 && a === 1 ? { isError: true } : { r: r, g: g, b: b, a: a };
        }
      }

      return {
        isError: true
      };
    };

    exports.makeColorObject = makeColorObject;
  });
});

/***/ }),
/* 9 */
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
     * `parseElement` - function to parse element.
     *
     * @param {Sting, HTMLElement} el Element to parse.
     * @return {HTMLElement} Parsed `html` element.
     */
    var parseElement = exports.parseElement = function (el) {
      // if `selector` passed, find the element in the DOM
      if (typeof el === 'string') {
        el = document.querySelector(el);
      }

      return el;
    };
  });
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(11), __webpack_require__(0), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./tween/tweenable'), require('./delta/deltas'), require('./class-proto'), require('./helpers/parse-element'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tweenable, global.deltas, global.classProto, global.parseElement);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(11), __webpack_require__(0), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.tweenable, global.deltas, global.classProto, global.parseElement);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _tweenable, _deltas, _classProto, _parseElement) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Html = undefined;

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

    /* ----------------- */
    /* The `Html` class  */
    /* ----------------- */

    var Super = _tweenable.Tweenable.__mojsClass;
    var Html = Object.create(Super);

    /**
     * `_declareDefaults` - Method to declare `_defaults`.
     *
     * @private
     * @overrides @ ClassProto
     */
    Html._declareDefaults = function () {
      this._defaults = {
        is3d: false,
        el: null,
        customProperties: {},

        x: 0,
        y: 0,
        z: 0,

        skewX: 0,
        skewY: 0,

        angle: 0,
        angleX: 0,
        angleY: 0,
        angleZ: void 0,

        scale: 1,
        scaleX: void 0,
        scaleY: void 0,
        scaleZ: void 0
      };
    };

    /**
     * `init` - function init the class.
     *
     * @public
     * @extends @Tweenable
     */
    Html.init = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // super call
      Super.init.call(this, o);
      // setup deltas
      this._setupDeltas();
    };

    /**
     * `_setupDeltas` - function to set up `Deltas`.
     *
     * @private
     */
    Html._setupDeltas = function () {
      var customProperties = this._getCustomProperties();

      this._deltas = new _deltas.Deltas(_extends({}, this._props, {
        customProperties: customProperties
      }));
      // save the `timeline` to make the `tweenable` work
      this.timeline = this._deltas.timeline;
    };

    /**
    * `_render` - function to render the component.
    *
    * @private
    * @param {Object} Target object to render to.
    * @param {Array} Support objects.
    *          @param {Object} support[0] Support object that will have
    *                                     all properties that are `isSkipRender`.
    *          @param {Object} support[1] Support render (original `render`
    *                                     from `customProperties` in this context).
    */
    Html._render = function (target, support) {
      var props = support.props,
          pipeObj = support.pipeObj;


      var scaleX = props.scaleX !== undefined ? props.scaleX : props.scale;
      var scaleY = props.scaleY !== undefined ? props.scaleY : props.scale;

      target.transform = 'translate(' + props.x + ', ' + props.y + ') rotate(' + props.angle + 'deg) skew(' + props.skewX + 'deg, ' + props.skewY + 'deg) scale(' + scaleX + ', ' + scaleY + ')';

      // call the `supportRender`
      pipeObj(target, support);
    };

    /**
     * `_render3d` - function to render the component with 3d styles.
     *
     * @private
     * @param {Object} Target object to render to.
     * @param {Array} Support objects.
     *          @param {Object} support[0] Support object that will have
     *                                     all properties that are `isSkipRender`.
     *          @param {Object} support[1] Support render (original `render`
     *                                     from `customProperties` in this context).
     */
    Html._render3d = function (target, support) {
      var props = support.props,
          pipeObj = support.pipeObj;


      var rotateZ = props.angleZ !== undefined ? props.angleZ : props.angle;
      var scaleX = props.scaleX !== undefined ? props.scaleX : props.scale;
      var scaleY = props.scaleY !== undefined ? props.scaleY : props.scale;
      var scaleZ = props.scaleZ !== undefined ? props.scaleZ : props.scale;

      target.transform = 'translate3d(' + props.x + ', ' + props.y + ', ' + props.z + ') rotateX(' + props.angleX + 'deg) rotateY(' + props.angleY + 'deg) rotateZ(' + rotateZ + 'deg) skew(' + props.skewX + 'deg, ' + props.skewY + 'deg) scale3d(' + scaleX + ', ' + scaleY + ', ' + scaleZ + ')';
      // call the `supportRender`
      pipeObj(target, support);
    };

    /**
     * `_getCustomProperties` - function to create customProperties.
     *
     * @private
     * @return {Object} Custom properties.
     */
    Html._getCustomProperties = function () {
      var unitProps = ['x', 'y', 'z'];
      var numberProps = ['angle', 'angleX', 'angleY', 'angleZ', 'skewX', 'skewY', 'scale', 'scaleX', 'scaleY', 'scaleZ'];
      var customProperties = this._props.customProperties;

      var originalRender = customProperties.render;

      var customProps = _extends({}, customProperties);

      for (var i = 0; i < unitProps.length; i++) {
        var prop = unitProps[i];
        customProps[prop] = { type: 'unit', isSkipRender: true };
      }

      for (var _i = 0; _i < numberProps.length; _i++) {
        var _prop = numberProps[_i];
        customProps[_prop] = { type: 'number', isSkipRender: true };
      }

      // if at least one of the `_default` properties set, pass the `render`
      // function regarding the fact if the 3d property used
      // otherwise pass thru the original `render` function
      customProps.render = this._isRender() ? this._is3dProperties() ? this._render3d : this._render : originalRender;

      customProps.pipeObj = this._isRender() ? originalRender || function () {} : function () {};

      return customProps;
    };

    /**
     * `_isRender` - function to check if render function
     *               should be used (one of the defaults defined).
     *
     * @return {Boolean} If render should be used
     */
    Html._isRender = function () {
      var ignoreProperties = {
        el: 1,
        customProperties: 1,
        is3d: 1
      };

      for (var prop in this._defaults) {
        if (ignoreProperties[prop]) {
          continue;
        }

        if (this._o[prop] !== void 0) {
          return true;
        }
      }

      return false;
    };

    /**
     * `_is3dProperties` - function to detect if the `3d` properties should be used.
     *
     * @return {Boolean} If 3d.
     */
    Html._is3dProperties = function () {
      var isRotate3d = this._o.angleX != null || this._o.angleY != null || this._o.angleZ != null;
      return this._is3d || this._o.z != null || this._o.scaleZ != null || isRotate3d;
    };

    /**
     * `_extendDefaults` - Method to copy `_o` options to `_props` object
     *                  with fallback to `_defaults`.
     *
     * @private
     * @overrides @ ClassProto
     */
    Html._extendDefaults = function () {
      // super call
      _classProto.ClassProto._extendDefaults.call(this);
      // delete `is3d` from options since we will pass them to `Deltas`
      this._is3d = this._props.is3d;
      delete this._props.is3d;
      // if el was passed as `selector`(`string`), find the element in the DOM
      this.el = (0, _parseElement.parseElement)(this._props.el);
      // set the `el` on options to element style
      // since this what we will pass to deltas
      this._props.el = this.el.style;
    };

    /**
     * Imitate `class` with wrapper.
     *
     * @param {Object} Options object.
     * @returns {Object} `Html` instance.
     */
    var wrap = function (o) {
      var instance = Object.create(Html);
      instance.init(o);

      return instance;
    };

    wrap.__mojsClass = Html;

    exports.Html = wrap;
  });
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(25), __webpack_require__(2), __webpack_require__(7), __webpack_require__(4), __webpack_require__(1), __webpack_require__(27), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../tween/tween'), require('../tween/timeline'), require('../tween/tweenable'), require('./delta'), require('./separate-tween-options'), require('../helpers/stagger-property'), require('../helpers/parse-static-property'), require('./motion-path'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tween, global.timeline, global.tweenable, global.delta, global.separateTweenOptions, global.staggerProperty, global.parseStaticProperty, global.motionPath);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(25), __webpack_require__(2), __webpack_require__(7), __webpack_require__(4), __webpack_require__(1), __webpack_require__(27), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.tween, global.timeline, global.tweenable, global.delta, global.separateTweenOptions, global.staggerProperty, global.parseStaticProperty, global.motionPath);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _tween, _timeline, _tweenable, _delta, _separateTweenOptions, _staggerProperty, _parseStaticProperty, _motionPath) {
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

    var Super = _tweenable.Tweenable.__mojsClass;
    var Deltas = Object.create(Super);

    /**
     * `init` - function init the class.
     *
     * @extends @Tweenable
     * @public
     */
    Deltas.init = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // super call
      Super.init.call(this, o);
      // clone the options
      var options = _extends({}, o);
      // get `timeline` options and remove them immediately
      var timelineOptions = options.timeline;
      delete options.timeline;

      // get `customProperties` options and remove them immediately
      this._customProperties = options.customProperties || {};
      this._render = this._customProperties.render || function () {};
      this._pipeObj = this._customProperties.pipeObj || {};
      delete options.customProperties;

      // save the el object and remove it immediately
      this._el = options.el || {};
      delete options.el;
      // create support object for complex properties
      this._supportProps = {};
      // set up the main `tween`
      this._setupTween(options);
      // set up the `timeline`
      this._setupTimeline(timelineOptions);
      // parse deltas from options that left so far
      this._parseProperties(options);
    };

    /**
     * `_setupTween` - function to set up main tween.
     *
     * @param {Object} Options.
     */
    Deltas._setupTween = function (options) {
      var _this = this;

      // separate main tween options
      var tweenOptions = (0, _separateTweenOptions.separateTweenOptions)(options) || {};
      // create tween
      this.tween = new _tween.Tween(_extends({}, tweenOptions, {
        // update plain deltas on update
        // and call the previous `onUpdate` if present
        onUpdate: function (ep, p, isForward) {
          // update plain deltas
          _this._upd_deltas(ep, p, isForward);
          // envoke onUpdate if present
          tweenOptions.onUpdate && tweenOptions.onUpdate(ep, p, isForward);
        }
      }));
    };

    /**
     * `_setupTimeline` - function to set up main timeline.
     *
     * @param {Object} Timeline options.
     */
    Deltas._setupTimeline = function () {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var support = {
        props: this._supportProps,
        pipeObj: this._pipeObj
      };

      this.timeline = new _timeline.Timeline(_extends({}, options, {
        onUpdate: function (ep, p, isForward) {
          // call render function
          _this2._render(_this2._el, support, ep, p, isForward);
          // envoke onUpdate if present
          options.onUpdate && options.onUpdate(ep, p, isForward);
        }
      }));
      this.timeline.add(this.tween);
    };

    /**
     * `_parseProperties` - function to parse deltas and static properties.
     *
     * @param {Object} Options.
     */
    Deltas._parseProperties = function (options) {
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
          // find out property `el`, it can be `supportProps` if the `isSkipRender`
          // is set for the property in the `customProperties`
          var custom = this._customProperties[key];
          var target = custom && custom.isSkipRender ? this._supportProps : this._el;

          var property = (0, _parseStaticProperty.parseStaticProperty)(key, value, this._customProperties, this.index);
          this._staticProps[key] = property;
          target[key] = property;
          continue;
        }
        // check the delta type
        var delta = void 0;
        if (value.path !== undefined) {
          delta = new _motionPath.MotionPath(_extends({
            el: this._el
          }, value, {
            supportProps: this._supportProps,
            property: key,
            index: this.index
          }));
        } else {
          // if value is not motion path, create delta object
          delta = new _delta.Delta({
            key: key,
            target: this._el,
            supportProps: this._supportProps,
            object: value,
            customProperties: this._customProperties,
            index: this.index
          });
        }

        // check if delta has own tween and add to `_tweenDeltas`
        if (delta.tween) {
          this._tweenDeltas.push(delta);
        }
        // else add to plain deltas
        else {
            this._plainDeltas.push(delta);
          }
      }
      // add tween deltas to the timeline
      this.timeline.add(this._tweenDeltas);
    };

    /**
     * `_upd_deltas` - function to update the plain deltas.
     *
     * @private
     * @param {Number} Eased progress.
     * @param {Number} Progress.
     * @param {Boolean} If forward update direction.
     * @returns {Object} This delta.
     */
    Deltas._upd_deltas = function (ep, p, isForward) {
      // update plain deltas
      for (var i = 0; i < this._plainDeltas.length; i++) {
        this._plainDeltas[i].update(ep, p, isForward);
      }
    };

    /**
     * Imitate `class` with wrapper.
     *
     * @param {Object} Options object.
     * @returns {Object} `Html` instance.
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(0), __webpack_require__(4), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../tween/tween'), require('../class-proto'), require('./separate-tween-options'), require('../helpers/stagger-property'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tween, global.classProto, global.separateTweenOptions, global.staggerProperty);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(0), __webpack_require__(4), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.tween, global.classProto, global.separateTweenOptions, global.staggerProperty);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _tween, _classProto, _separateTweenOptions, _staggerProperty) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MotionPath = undefined;

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

    /* ----------------------- */
    /* The `MotionPath` class  */
    /* ----------------------- */

    // TODO:
    //  - add unit?
    //  - add bounds?
    //  - add pipe?

    var Super = _classProto.ClassProto;
    var MotionPath = Object.create(Super);

    /* ---------------------- */
    /* The `Public` functions */
    /* ---------------------- */

    /**
     * `update` - function to update the MotionPath.
     *
     * @public
     * @param {Number} Eased progress.
     * @param {Number} Progress.
     * @param {Boolean} If is forward direction.
     * @param {Object} This motion path.
     */
    MotionPath.update = function (ep, p, isForward) {
      var _props = this._props,
          precision = _props.precision,
          coordinate = _props.coordinate,
          property = _props.property,
          supportProps = _props.supportProps;
      var step = this._samples.step;


      var index = ep / step | 0; // convert to integer
      var key = index * step; // get the key
      var nextKey = (index + 1) * step; // get the next key

      var diff = ep - key; // get error for the eased progress
      var value = this._samples.get(key)[coordinate]; // get the value

      var norm = value;
      // if next key is present, calculate the normalized value
      // regarding the eased progress error
      if (nextKey <= 1) {
        var nextValue = this._samples.get(nextKey)[coordinate];
        norm = value + (nextValue - value) * (diff / step);
      }

      this._target[property] = norm;

      return this;
    };

    /* ----------------------- */
    /* The `Private` functions */
    /* ----------------------- */

    /**
     * `_samplePath` - function to sample path coordinates.
     *
     * @private
     * @param {Number} Number of floating point digits.
     */
    MotionPath._samplePath = function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._props.precision;

      var totalLength = this._path.getTotalLength();
      var step = 1 / n;
      // create the samples map and save main properties
      this._samples = new Map();
      this._samples.step = step;
      this._samples.totalLength = totalLength;
      // samples the path, `key` is in range of [0..1]
      for (var i = 0; i < n; i++) {
        var key = i * step;
        this._setForKey(key);
      }
      // the last sample is for `1`
      this._setForKey(1);
    };

    /**
     * `_setForKey` - helper function for `_samplePath`,
     *                sets a key/value regarding `totalLength` on the map.
     *
     * @param  {Number} key Map key [0...1].
     */
    MotionPath._setForKey = function (key) {
      var totalLength = this._samples.totalLength;

      // x/y computation
      var length = key * totalLength;
      var point = this._path.getPointAtLength(length);
      var prevPoint = this._path.getPointAtLength(length - 1);
      // cangle computation
      var dY = point.y - prevPoint.y;
      var dX = point.x - prevPoint.x;
      var atan = !isFinite(Math.atan(dY / dX)) ? 0 : Math.atan(dY / dX);
      var angle = atan * (180 / Math.PI);
      // set the point to the map
      this._samples.set(key, { x: point.x, y: point.y, angle: angle });
    };

    /**
     * `init` - function init the class.
     *
     * @extends @ClassProto
     * @public
     */
    MotionPath.init = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // super call
      Super.init.call(this, o);
      // get target, if the `isSkipRender` is set on `property`
      // in `customProperties`, use `supportProps` otherwise use `el`
      var _props2 = this._props,
          el = _props2.el,
          supportProps = _props2.supportProps,
          property = _props2.property,
          customProperties = _props2.customProperties;

      var custom = customProperties[property];
      this._target = custom && custom.isSkipRender ? supportProps : el;
      // parse path
      this._parsePath();
      // precompute path
      this._samplePath();
      // set up tween
      this._setupTween();
    };

    /**
     * `_setupTween` - function set up tween if needed.
     *
     * @extends @ClassProto
     * @public
     */
    MotionPath._setupTween = function () {
      var _this = this;

      // options
      var options = _extends({}, this._o);
      // separate tween  options
      var tweenOptions = (0, _separateTweenOptions.separateTweenOptions)(options);
      if (tweenOptions !== undefined) {
        this.tween = new _tween.Tween(_extends({}, tweenOptions, {
          // send `onUpdate` function to call the `this.update` function
          // and envoke previous `onUpdate`
          onUpdate: function (ep, p, isForward) {
            _this.update(ep, p, isForward);
            // envoke old `onUpdate` if is present
            if (tweenOptions.onUpdate !== void 0) {
              tweenOptions.onUpdate(ep, p, isForward);
            }
          }
        }));
      }
    };

    /**
     * `_decalreDefaults` - function to declare defaults.
     *
     * @extends @ClassProto
     * @private
     */
    MotionPath._declareDefaults = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._defaults = {
        el: null,
        supportProps: null,
        customProperties: {},
        path: 'M0,0 L100,100',
        precision: 140,
        coordinate: 'x',
        property: 'x'
      };
    };

    /**
     * _extendDefaults - Method to copy `_o` options to `_props` object
     *                  with fallback to `_defaults`.
     * @private
     * @overrides @ ClassProto
     */
    MotionPath._extendDefaults = function () {
      // super call
      _classProto.ClassProto._extendDefaults.call(this);
      // parse stagger
      for (var key in this._props) {
        this._props[key] = (0, _staggerProperty.staggerProperty)(this._props[key], this.index);
      }

      var property = this._props.property;

      if (property === 'y' || property === 'angle') {
        this.setIfNotSet('coordinate', property);
      }
    };

    /**
     * `_parsePath` - function to parse SVG motion path.
     */
    MotionPath._parsePath = function () {
      var path = this._props.path;

      this._path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      this._path.setAttributeNS(null, 'd', path);
    };

    /**
     * Imitate `class` with wrapper
     *
     * @param {Object} Options object.
     * @returns {Object} Tween instance.
     */
    var wrap = function (o) {
      var instance = Object.create(MotionPath);
      instance.init(o);

      return instance;
    };

    wrap.__mojsClass = MotionPath;

    exports.MotionPath = wrap;
  });
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../delta/get-regexp-unit'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.getRegexpUnit);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.getRegexpUnit);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _getRegexpUnit) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseStagger = undefined;


    /**
     * `parseStagger` - function to parse `stagger()` strings.
     *
     * @param {_} Property value.
     * @param {Number} Stagger index.
     * @returns {String, Any} Parsed stagger value or unattended value.
     */
    var parseStagger = function (value, index) {
      var type = typeof value;
      // if not string return the value itself as it can not be a stagger string
      if (type !== 'string') {
        return value;
      }
      // if string test it on `stagger` sequence, if not present
      // return the value as it is not a stagger string
      if (!value.match(/^stagger\(/)) {
        return value;
      }

      // split the value `stagger([body])`
      var body = value.split(/stagger\(|\)$/)[1].toLowerCase();
      // split the body
      var stagger = body.split(/([^\(,\s]+)(?=\s*,|\s*$)/gim);
      // assume two values in the `stagger(20, 20)`
      var base = stagger[1];
      var step = stagger[3];
      // if only one value provided in the `stagger(20)`
      if (stagger.length <= 3) {
        base = 0;
        step = stagger[1];
      }
      // parse base
      var baseValue = parseFloat(base);
      var baseUnit = (0, _getRegexpUnit.getRegexpUnit)(base);
      // parse step
      var stepValue = parseFloat(step);
      var stepUnit = (0, _getRegexpUnit.getRegexpUnit)(step);
      // get result unit and result
      var unit = baseUnit ? baseUnit : stepUnit;
      var result = baseValue + index * stepValue;
      // if unit is present - return the result with unit, otherwise return number
      return unit ? '' + result + unit : result;
    };

    exports.parseStagger = parseStagger;
  });
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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
    exports.getRegexpUnit = undefined;


    var getRegexpUnit = function (value) {
      if (typeof value !== 'string') {
        return undefined;
      }
      var valueMatch = value.match(_unitRegexp.unitRegexp);

      return valueMatch !== null ? valueMatch[0] : undefined;
    };

    exports.getRegexpUnit = getRegexpUnit;
  });
});

/***/ }),
/* 15 */
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
/* 16 */
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
    var parsePath = function (path) {
      var domPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      domPath.setAttributeNS(null, 'd', path);
      return domPath;
    };

    var sample = function (path, n) {
      var step = 1 / n;
      var totalLength = path.getTotalLength();
      // create the samples map and save main properties
      var samples = [];
      // samples the path, `key` is in range of [0..1]
      for (var i = 0; i < n + 1; i++) {
        var point = path.getPointAtLength(i * step * totalLength);
        samples[i] = {
          x: point.x / 100,
          y: point.y / 100
        };
      };

      return samples;
    };

    var findY = function (key, samples, n) {
      var start = 0;
      var end = samples.length - 1;
      var step = 1 / n;
      // find `start`/`end` bounds with binary search
      while (Math.abs(end - start) > 1) {
        var _n = end - start;
        var middle = start + Math.floor(_n / 2);
        var _value = samples[middle];

        if (key === _value.x) {
          return _value.y;
        }
        // shift a bound regarding the `value.x` value
        key < _value.x ? end = middle : start = middle;
      }
      // when the loop stops - we've found `start` and `end` bounds
      var value = samples[start];
      // if key is greate than `start` - normalize it
      if (key > value.x) {
        var nextValue = samples[start + 1];
        if (nextValue !== void 0) {
          var diff = value.x - key;
          return value.y - (nextValue.y - value.y) * (diff / step);
        }
      }

      return value.y;
    };

    var translateSamples = function (samples, n) {
      var map = new Map();
      var step = 1 / n;
      // samples the path, `key` is in range of [0..1]
      for (var i = 0; i < n + 1; i++) {
        var key = i * step;
        map.set(key, 1 - findY(key, samples, n));
      }

      return map;
    };

    var path = function (path) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

      var preSamples = sample(parsePath(path), n);
      var samples = translateSamples(preSamples, n);
      var step = 1 / n;

      return function (p) {
        var index = p / step | 0; // convert to integer
        var key = index * step; // get the key
        var nextKey = (index + 1) * step; // get the next key
        var y = samples.get(key); // get the y
        // if next key is present, calculate the normalized y
        // regarding the progress error
        if (nextKey <= 1) {
          var nextY = samples.get(nextKey);
          y = y + (nextY - y) * ((p - key) / step);
        }

        return y;
      };
    };

    exports.path = path;
  });
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(16), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./path'), require('./pow'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.path, global.pow);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(16), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.path, global.pow);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _path, _pow) {
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

      pow: _pow.pow,
      path: _path.path
    };
    /**
     * TODO:
     *  [] add `setParent` public method.
     */

    exports.easing = easing;
  });
});

/***/ }),
/* 18 */
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
/* 19 */
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
    var bundleLink = exports.bundleLink = 'https://aka.ms/mojs-bundle';
  });
});

/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../helpers/make-color-object'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.makeColorObject);
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
      factory(mod.exports, global.makeColorObject);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _makeColorObject) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseColor = undefined;

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
     * Function parse color delta.
     *
     * @param {String} Name of the property.
     * @param {Object} Object to parse.
     * @returns {Object} Parsed `delta`.
     */
    var parseColor = function (name, object) {
      var start = (0, _makeColorObject.makeColorObject)(object.start);
      var end = (0, _makeColorObject.makeColorObject)(object.end);
      var delta = {
        r: end.r - start.r,
        g: end.g - start.g,
        b: end.b - start.b,
        a: end.a - start.a
      };

      return _extends({}, object, {
        type: 'color',
        name: name, start: start,
        end: end, delta: delta
      });
    };

    exports.parseColor = parseColor;
  });
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./get-regexp-unit'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.getRegexpUnit);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.getRegexpUnit);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _getRegexpUnit) {
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
      var startUnit = (0, _getRegexpUnit.getRegexpUnit)(result.start);
      var endUnit = (0, _getRegexpUnit.getRegexpUnit)(result.end);
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(6), __webpack_require__(5), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../easing/parse-easing'), require('../tween/tween-defaults'), require('../delta/separate-tween-options'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.parseEasing, global.tweenDefaults, global.separateTweenOptions);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(6), __webpack_require__(5), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.parseEasing, global.tweenDefaults, global.separateTweenOptions);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _parseEasing, _tweenDefaults, _separateTweenOptions) {
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
     * Function to split the delta object to `tween` options and actual `delta`.
     *
     * @param {Object} Object to split.
     * @returns {Object} Split `delta`.
     */
    var splitDelta = function (object) {
      object = _extends({}, object);
      // save curve because we need it directly on the
      // parsed `delta` object vs `tween`
      var curve = object.curve !== void 0 ? (0, _parseEasing.parseEasing)(object.curve) : void 0;
      delete object.curve;
      // extract tween options
      var tweenOptions = (0, _separateTweenOptions.separateTweenOptions)(object);
      // at this point only the `start` -> `end` should left get the values
      var start = Object.keys(object)[0];
      var end = object[start];

      return { start: start, end: end, curve: curve, tweenOptions: tweenOptions };
    };

    exports.splitDelta = splitDelta;
  });
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(0), __webpack_require__(19)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./tween'), require('../class-proto'), require('../constants'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tween, global.classProto, global.constants);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(0), __webpack_require__(19)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.tween, global.classProto, global.constants);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _tween, _classProto, _constants) {
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

    var Super = _tween.Tween.__mojsClass;
    var Timeline = Object.create(Super);

    /**
     * _declareDefaults - function do override some defaults.
     *
     * @overrides @ Tween
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
     * add - function to add `Tween` to the timeline.
     *
     * @public
     * @param   {Object, Array} A tween or array of tweens to add.
     * @param   {Number} Time shift >= 0.
     * @returns {Object} Self.
     */
    Timeline.add = function (tween) {
      var _this = this;

      var shift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      // make sure the shift is positive
      shift = Math.abs(shift);
      // if tween is really an array of tweens,
      // loop thru them and add one by one
      if (tween instanceof Array) {
        tween.forEach(function (tween) {
          _this.add(tween, shift);
        });
        // if a single tween, add it to `_items`
      } else {

        // if it has child `timeline` or `tween` property - add it instead
        var runner = tween.timeline || tween.tween;
        if (runner) {
          tween = runner;
        }

        // set the `shiftTime` on tween
        tween.set('shiftTime', shift);
        // add to child timelines
        this._items.push(tween);
        // check if we need to increase timeline's bound
        var _tween$_props = tween._props,
            delay = _tween$_props.delay,
            duration = _tween$_props.duration,
            shiftTime = _tween$_props.shiftTime;

        var time = delay + duration + shiftTime;
        this._props.duration = Math.max(this._props.duration, time);
      }

      return this;
    };

    /**
     * append - function to append `Tween` to the timeline.
     *
     * @public
     * @param   {Object, Array} A tween or array of tweens to append.
     * @param   {Number} Time shift >= 0.
     * @returns {Object} Self.
     */
    Timeline.append = function (tween) {
      var shift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      // add the tweens shifting them to the current `duration`
      this.add(tween, this._props.duration + Math.abs(shift));

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
     * @extends @ Tween
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
        for (var i = 0; i < context._items.length; i++) {
          context._items[i].update(time);
        }
        // 2. the order is important
        onUpdate(ep, p, isForward, time);
      };
    };

    /**
     * _vars - declare vars.
     *
     * @extends @ Tween
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
     * @overrides @ Tween
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
     * @returns {Object} Tween instance.
     */
    var wrap = function (o) {
      var instance = Object.create(Timeline);
      instance.init(o);

      return instance;
    };

    wrap.__mojsClass = Timeline;

    exports.Timeline = wrap;
  });
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(10), __webpack_require__(2), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./html'), require('./tween/tweenable'), require('./helpers/parse-element'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.html, global.tweenable, global.parseElement);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(10), __webpack_require__(2), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.html, global.tweenable, global.parseElement);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _html, _tweenable, _parseElement) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Surface = undefined;

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

    /* -------------------- */
    /* The `Surface` class  */
    /* -------------------- */

    var Super = _tweenable.Tweenable.__mojsClass;
    var Surface = Object.create(Super);

    /**
     * `_declareDefaults` - Method to declare `_defaults`.
     *
     * @private
     * @overrides @ ClassProto
     */
    Surface._declareDefaults = function () {
      this._defaults = {
        parent: document.body,
        // `width` of the surface, fallbacks to `size`
        width: 100,
        // `height` of the surface, fallbacks to `size`
        height: 100
      };
    };

    /**
     * _vars - function do declare `variables` after `_defaults` were extended
     *         by `options` and saved to `_props`
     *
     * @private
     */
    Surface._vars = function () {
      // super call
      Super._vars.call(this);
      // create `Html` element
      this._createElement();
      // create `Html` module
      this._createHtml();
    };

    /**
     * `_createElement` - function to create root html element.
     */
    Surface._createElement = function () {
      this.el = document.createElement('div');

      this._props.parent.appendChild(this.el);
    };

    /**
     * `_createElement` - function to create `html` module.
     */
    Surface._createHtml = function () {
      // create object that will be passed to the `html` module
      var htmlOptions = _extends({}, this._props);
      // delete parent from the object
      delete htmlOptions.parent;
      // create `html`
      this._html = new _html.Html(_extends({
        el: this.el
      }, htmlOptions, {
        customProperties: _extends({}, this._o.customProperties, {
          width: { type: 'unit' },
          height: { type: 'unit' }
        })
      }));
      // set `timeline` to `html's` timeline so `tweenable` will work
      this.timeline = this._html.timeline;
    };

    /**
     * Imitate `class` with wrapper.
     *
     * @param {Object} Options object.
     * @returns {Object} `Html` instance.
     */
    var wrap = function (o) {
      var instance = Object.create(Surface);
      instance.init(o);

      return instance;
    };

    wrap.__mojsClass = Surface;

    exports.Surface = wrap;
  });
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../delta/delta'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.delta);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.delta);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _delta) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseStaticProperty = undefined;


    // TODO: cover

    /**
     * `parseStaticProperty` - function to parse static property
     *                         regarding types in `customProperties`.
     *
     * @param {String} key Property name.
     * @param {String} property Property value.
     * @param {Object} customProperties Custom properties object.
     * @param {Number} index Index.
     */
    var parseStaticProperty = exports.parseStaticProperty = function (key, property, customProperties) {
      var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var target = {};
      var delta = new _delta.Delta({
        key: key,
        target: target,
        customProperties: customProperties,
        index: index,
        object: { [property]: property },
        supportProps: {}
      });
      // update the delta with `0` progress
      delta.update(0, 0);
      // get the result on target
      var result = target[key];
      // check if `result` is `NaN` return original propert
      return isNaN(result) && !result ? property : result;
    };
  });
});

/***/ }),
/* 28 */
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
     * div - and element that is added to DOM for enviroment test purposes.
     */
    var div = document.createElement('div');
    document.body.append(div);

    exports.div = div;
  });
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(25), __webpack_require__(2), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./tween/timeline'), require('./tween/tweenable'), require('./helpers/stagger-property'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.timeline, global.tweenable, global.staggerProperty);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(25), __webpack_require__(2), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.timeline, global.tweenable, global.staggerProperty);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _timeline, _tweenable, _staggerProperty) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.stagger = undefined;


    /* -------------------- */
    /* The `Stagger` class  */
    /* -------------------- */

    var Super = _tweenable.Tweenable.__mojsClass;
    var Stagger = Object.create(Super);

    /**
     * `init` - function init the class.
     *
     * @extends @Tweenable
     * @public
     */
    Stagger.init = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var Module = arguments[1];

      // super call
      Super.init.call(this, o);
      // create main timeline
      this._createTimeline(o.timeline);
      // create modules
      this._createModules(Module);
    };

    /**
     * `_createModules` - function to create modules.
     *
     * @private
     * @param {Object} Child module class.
     */
    Stagger._createModules = function (Module) {
      this._modules = [];
      var _o = this._o,
          items = _o.items,
          _o$el = _o.el,
          el = _o$el === undefined ? {} : _o$el;

      var modulesCount = items || el.length || 1;

      for (var i = 0; i < modulesCount; i++) {
        var module = new Module(this._getStaggerOptions(this._o, i));
        this._modules.push(module);
        this.timeline.add(module);
      }
    };

    /**
     * `_getStaggerOptions` - get stagger options for a single module.
     *
     * @private
     * @param {Object} Stagger options.
     * @param {Number} Index of a module.
     */
    Stagger._getStaggerOptions = function (options, i) {
      // pass index to child properties
      var o = { index: i };

      for (var key in options) {
        o[key] = (0, _staggerProperty.staggerProperty)(options[key], i);
      }

      return o;
    };

    /**
     * `_createTimeline` - function to create a timeline.
     *
     * @private
     * @param {Object} Timeline options.
     */
    Stagger._createTimeline = function (options) {
      this.timeline = new _timeline.Timeline(options);

      delete this._o.timeline;
    };

    /**
     * function to wrap a Module with the stagger wrapper.
     */
    var stagger = function (Module) {
      return function (options) {
        var instance = Object.create(Stagger);
        instance.init(options, Module);
        return instance;
      };
    };

    exports.stagger = stagger;
  });
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(32);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(5), __webpack_require__(25), __webpack_require__(20), __webpack_require__(17), __webpack_require__(6), __webpack_require__(7), __webpack_require__(24), __webpack_require__(23), __webpack_require__(22), __webpack_require__(21), __webpack_require__(4), __webpack_require__(2), __webpack_require__(1), __webpack_require__(13), __webpack_require__(8), __webpack_require__(34), __webpack_require__(35), __webpack_require__(30), __webpack_require__(11), __webpack_require__(12), __webpack_require__(29), __webpack_require__(10), __webpack_require__(26), __webpack_require__(33)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./class-proto'), require('./tween/tween'), require('./tween/tween-defaults'), require('./tween/timeline'), require('./tween/tweener'), require('./easing/easing'), require('./easing/parse-easing'), require('./delta/delta'), require('./delta/split-delta'), require('./delta/parse-number'), require('./delta/parse-unit'), require('./delta/parse-color'), require('./delta/separate-tween-options'), require('./tween/tweenable'), require('./helpers/stagger-property'), require('./helpers/parse-stagger'), require('./helpers/make-color-object'), require('./shape/svg/svg-shape'), require('./shape/svg/circle'), require('./easing/basic-easing'), require('./delta/deltas'), require('./delta/motion-path'), require('./stagger'), require('./html'), require('./surface'), require('./shape/shape'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.classProto, global.tween, global.tweenDefaults, global.timeline, global.tweener, global.easing, global.parseEasing, global.delta, global.splitDelta, global.parseNumber, global.parseUnit, global.parseColor, global.separateTweenOptions, global.tweenable, global.staggerProperty, global.parseStagger, global.makeColorObject, global.svgShape, global.circle, global.basicEasing, global.deltas, global.motionPath, global.stagger, global.html, global.surface, global.shape);
    global.mojs = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(5), __webpack_require__(25), __webpack_require__(20), __webpack_require__(17), __webpack_require__(6), __webpack_require__(7), __webpack_require__(24), __webpack_require__(23), __webpack_require__(22), __webpack_require__(21), __webpack_require__(4), __webpack_require__(2), __webpack_require__(1), __webpack_require__(13), __webpack_require__(8), __webpack_require__(34), __webpack_require__(35), __webpack_require__(30), __webpack_require__(11), __webpack_require__(12), __webpack_require__(29), __webpack_require__(10), __webpack_require__(26), __webpack_require__(33)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.classProto, global.tween, global.tweenDefaults, global.timeline, global.tweener, global.easing, global.parseEasing, global.delta, global.splitDelta, global.parseNumber, global.parseUnit, global.parseColor, global.separateTweenOptions, global.tweenable, global.staggerProperty, global.parseStagger, global.makeColorObject, global.svgShape, global.circle, global.basicEasing, global.deltas, global.motionPath, global.stagger, global.html, global.surface, global.shape);
      global.mojs = mod.exports;
    }
  })(undefined, function (module, exports, _classProto, _tween, _tweenDefaults, _timeline, _tweener, _easing, _parseEasing, _delta, _splitDelta, _parseNumber, _parseUnit, _parseColor, _separateTweenOptions, _tweenable, _staggerProperty, _parseStagger, _makeColorObject, _svgShape, _circle, _basicEasing, _deltas, _motionPath, _stagger, _html, _surface, _shape) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });


    /*
      Browsers' support:
        - rAF
        - performance.now
        - Map
    */

    /*
      TODO:
        - add shape
        - add burst
        - add mojs.staggerFunction()
        - add spring easing
        - add bezier easing
        - add path generators
        - add array deltas
    */

    // temporary - not needed for base file

    // easing

    // tween related
    var mojs = {
      revision: '2.10.0',
      Tween: _tween.Tween,
      Timeline: _timeline.Timeline,
      easing: _easing.easing,
      __helpers__: {
        parseEasing: _parseEasing.parseEasing,
        ClassProto: _classProto.ClassProto,
        SvgShape: _svgShape.SvgShape,
        tweenDefaults: _tweenDefaults.tweenDefaults,
        tweener: _tweener.tweener,
        // temporary
        Delta: _delta.Delta,
        splitDelta: _splitDelta.splitDelta,
        parseNumber: _parseNumber.parseNumber,
        parseUnit: _parseUnit.parseUnit,
        parseColor: _parseColor.parseColor,
        separateTweenOptions: _separateTweenOptions.separateTweenOptions,
        Tweenable: _tweenable.Tweenable,
        staggerProperty: _staggerProperty.staggerProperty,
        parseStagger: _parseStagger.parseStagger,
        makeColorObject: _makeColorObject.makeColorObject,
        svg: {
          Circle: _circle.Circle
        }
      }
    };

    /* Extensions */
    // `basic easing functions`

    (0, _basicEasing.addBasicEasing)(mojs);
    // Deltas

    mojs.Deltas = _deltas.Deltas;
    // MotionPath

    mojs.MotionPath = _motionPath.MotionPath;
    // stagger

    mojs.stagger = _stagger.stagger;
    // html

    mojs.Html = _html.Html;
    // surface

    mojs.Surface = _surface.Surface;
    // shape

    mojs.Shape = _shape.Shape;

    exports.default = mojs;
    module.exports = exports['default'];
  });
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(26)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../surface'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.surface);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(26)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.surface);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _surface) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Shape = undefined;


    /* ------------------ */
    /* The `Shape` class  */
    /* ------------------ */

    var Super = _surface.Surface.__mojsClass;
    var Shape = Object.create(Super);

    /**
     * Imitate `class` with wrapper.
     *
     * @param {Object} Options object.
     * @returns {Object} `Html` instance.
     */
    var wrap = function (o) {
      var instance = Object.create(Shape);

      return instance.init(o) || instance;
    };

    wrap.__mojsClass = Shape;

    exports.Shape = wrap;
  });
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../../class-proto'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classProto);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.classProto);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _classProto) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SvgShape = undefined;


    /* --------------------- */
    /* The `SvgShape` class  */
    /* --------------------- */

    var Super = _classProto.ClassProto;
    var SvgShape = Object.create(Super);

    var NS = 'http://www.w3.org/2000/svg';

    /**
     * `init` - lifecycle initialization function.
     *
     * @extends @ClassProto
     * @private
     */
    SvgShape.init = function (o) {
      // super call
      Super.init.call(this, o);
      // create SVG canvas
      this._createSVGCanvas();
    };

    /**
     * `_createSVGCanvas` - function to create a canvas.
     */
    SvgShape._createSVGCanvas = function () {
      this.canvas = document.createElementNS(NS, 'svg');
      this.canvas.setAttribute('viewBox', '0 0 100 100');
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';

      this.root = document.createElementNS(NS, 'g');
      this.canvas.appendChild(this.root);

      this._o.el.appendChild(this.canvas);
    };

    /**
     * Imitate `class` with wrapper
     *
     * @param {Object} Options object.
     * @returns {Object} SvgShape instance.
     */
    var wrap = function (o) {
      var instance = Object.create(SvgShape);
      instance.init(o);

      return instance;
    };

    wrap.__mojsClass = SvgShape;

    exports.SvgShape = wrap;
  });
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(34)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./svg-shape'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.svgShape);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(34)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.svgShape);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _svgShape) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Circle = undefined;


    /* --------------------- */
    /* The `Circle` class  */
    /* --------------------- */

    var Super = _svgShape.SvgShape.__mojsClass;
    var Circle = Object.create(Super);

    var NS = 'http://www.w3.org/2000/svg';

    /**
     * `init` - lifecycle initialization function.
     *
     * @extends @ClassProto
     * @private
     */
    Circle.init = function (o) {
      // super call
      Super.init.call(this, o);
      // create SVG canvas
      this._initializeShape();
    };

    /**
     * `_initializeShape` - function to element for render.
     */
    Circle._initializeShape = function () {
      this.renderEl = document.createElementNS(NS, 'circle');

      this.renderEl.setAttribute('cx', 50);
      this.root.appendChild(this.renderEl);
    };

    /**
     * Imitate `class` with wrapper
     *
     * @param {Object} Options object.
     * @returns {Object} Circle instance.
     */
    var wrap = function (o) {
      var instance = Object.create(Circle);
      instance.init(o);

      return instance;
    };

    wrap.__mojsClass = Circle;

    exports.Circle = wrap;
  });
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=mo.js.map