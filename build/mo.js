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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
    var ClassProto = {
      init: function () {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        // save options
        this._o = o;

        this._declareDefaults();
        this._extendDefaults();
        this._vars();
      },
      _declareDefaults: function () {
        this._defaults = {};
      },
      _extendDefaults: function () {
        this._props = _extends({}, this._defaults, this._o);
      },
      _vars: function () {}
    };

    exports.ClassProto = ClassProto;
  });
});

/***/ }),
/* 1 */
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
      /* duration of the tween [0..∞] */
      duration: 350,
      /* delay of the tween [-∞..∞] */
      delay: 0,
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
      /*
        onStart callback runs on very start of the tween just after onProgress
        one. Runs on very end of the tween if tween is reversed.
        @param {Boolean}  Direction of the tween.
                          `true` for forward direction.
                          `false` for backward direction(tween runs in reverse).
      */
      onStart: function () {},
      onComplete: function () {},
      onUpdate: function () {},
      // playback callbacks, these fire only when
      /* shift time on a timeline */
      shiftTime: 0
    };

    exports.tweenieDefaults = tweenieDefaults;
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports);
      global.mojs = mod.exports;
    }
  })(undefined, function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    /**
     * Helper to get cross-brower `visibility change` event.
     */
    var getVisiblityEvent = function () {
      if (typeof document.mozHidden !== "undefined") {
        return ["mozHidden", "mozvisibilitychange"];
      } else if (typeof document.msHidden !== "undefined") {
        return ["msHidden", "msvisibilitychange"];
      } else if (typeof document.webkitHidden !== "undefined") {
        return ["webkitHidden", "webkitvisibilitychange"];
      }

      return ['hidden', 'visibilitychange'];
    };

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
          if (_this.tweens.length === 0) {
            return _this._stopLoop();
          }
          _this.update(performance.now());
          // if (!this.tweens.length) { return this._isRunning = false; }
          requestAnimationFrame(_this._loop);
        };

        this._onVisibilityChange = function () {
          if (document[_this._visibilityHidden]) {
            _this._savePlayingTweens();
          } else {
            _this._restorePlayingTweens();
          }
        };

        this._vars();
        this._listenVisibilityChange();
        return this;
      }

      _createClass(Tweener, [{
        key: "_vars",
        value: function _vars() {
          this.tweens = [];
          // this._loop = this._loop.bind(this);
          this._savedTweens = [];
        }
      }, {
        key: "_startLoop",
        value: function _startLoop() {
          if (this._isRunning) {
            return;
          };
          this._isRunning = true;
          //  if (this.tweens.length > 0) { return; };
          requestAnimationFrame(this._loop);
        }
      }, {
        key: "_stopLoop",
        value: function _stopLoop() {
          this.tweens.length = 0;
          this._isRunning = false;
        }
      }, {
        key: "removeAll",
        value: function removeAll() {
          this.tweens.length = 0;
        }
      }, {
        key: "remove",
        value: function remove(tween) {
          var index = typeof tween === 'number' ? tween : this.tweens.indexOf(tween);

          if (index !== -1) {
            tween = this.tweens[index];
            tween._isRunning = false;
            this.tweens.splice(index, 1);
            //  tween._onTweenerRemove();
          }
        }
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
      }, {
        key: "_savePlayingTweens",
        value: function _savePlayingTweens() {
          this._savedTweens = this.tweens.slice(0);
          for (var i = 0; i < this._savedTweens.length; i++) {
            this._savedTweens[i].pause();
          }
        }
      }, {
        key: "_restorePlayingTweens",
        value: function _restorePlayingTweens() {
          for (var i = 0; i < this._savedTweens.length; i++) {
            this._savedTweens[i].resume();
          }
        }
      }, {
        key: "update",
        value: function update(time) {
          var i = this.tweens.length;
          while (i--) {
            var tween = this.tweens[i];
            if (tween.update(time) === true) {
              this.remove(tween);
              tween.onTweenerFinish();
              tween._prevTime = undefined;
            }
          }
        }
      }, {
        key: "add",
        value: function add(tween) {
          // return if tween is already running
          if (tween._isRunning) {
            return;
          }
          tween._isRunning = true;
          this.tweens.push(tween);
          this._startLoop();
        }
      }, {
        key: "caffeinate",
        value: function caffeinate() {
          document.removeEventListener(this._visibilityChange, this._onVisibilityChange, false);
        }
      }]);

      return Tweener;
    }();

    exports.default = new Tweener();
    module.exports = exports["default"];
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../class-proto'), require('./tweenie-defaults'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classProto, global.tweenieDefaults);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.classProto, global.tweenieDefaults);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports, _classProto, _tweenieDefaults) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Tweenie = undefined;


    var Tweenie = {
      _declareDefaults: function () {
        this._defaults = _tweenieDefaults.tweenieDefaults;
      },
      _vars: function () {
        var isReverse = this._props.isReverse;
        var _props = this._props,
            onStart = _props.onStart,
            onComplete = _props.onComplete;


        // callbacks array - used to flip the callbacks order on `isReverse`
        this._cbs = [onStart, onComplete, 0, 1];

        // if `isReverse` - flip the callbacks
        if (isReverse === true) {
          this._cbs = [this._cbs[1], this._cbs[0], 1 - this._cbs[2], 1 - this._cbs[3]];
        }
      },
      setStartTime: function () {
        var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var _props2 = this._props,
            delay = _props2.delay,
            duration = _props2.duration;

        this._start = startTime + delay;
        this._end = this._start + duration;
        this._isActive = false;
      },
      onTweenerFinish: function () {},
      update: function (time) {
        var _props3 = this._props,
            onUpdate = _props3.onUpdate,
            isReverse = _props3.isReverse;


        if (time >= this._start && time <= this._end) {
          var isActive = void 0;

          if (time > this._start && this._isActive === false) {
            // `onStart`
            this._cbs[0]();
          }

          if (time === this._start) {
            // `onStart`
            this._cbs[0]();
            isActive = false;
          }

          var p = (time - this._start) / this._props.duration;
          onUpdate(isReverse === false ? p : 1 - p);

          if (time < this._prevTime && this._isActive === false) {
            // `onComplete`
            this._cbs[1]();
          }

          if (time === this._end) {
            // `onComplete`
            this._cbs[1]();
            isActive = false;
          }

          this._isActive = isActive === undefined ? true : isActive;
        }

        if (time > this._end && this._isActive === true) {
          // one
          onUpdate(this._cbs[3]);
          // `onComplete`
          this._cbs[1]();
          this._isActive = false;
          // TODO: cover
          this._prevTime = time;
          // TODO: cover
          return true;
        }

        if (time < this._start && this._isActive === true) {
          // `onStart`
          this._cbs[0]();
          // zero
          onUpdate(this._cbs[2]);
          this._isActive = false;
        }

        this._prevTime = time;
      }
    };
    // extend classProto
    Tweenie.__proto__ = _classProto.ClassProto;

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

    exports.Tweenie = wrap;
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./class-proto'), require('./tween/tweenie'), require('./tween/tweenie-defaults'), require('./tween/tweener'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.classProto, global.tweenie, global.tweenieDefaults, global.tweener);
    global.mojs = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.classProto, global.tweenie, global.tweenieDefaults, global.tweener);
      global.mojs = mod.exports;
    }
  })(undefined, function (module, exports, _classProto, _tweenie, _tweenieDefaults, _tweener) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _tweener2 = _interopRequireDefault(_tweener);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    // import Tween from './tween/tween';

    var mojs = {
      revision: '2.1.0',
      Tweenie: _tweenie.Tweenie,
      // Tween,
      // tweener,
      __helpers__: {
        ClassProto: _classProto.ClassProto,
        tweenieDefaults: _tweenieDefaults.tweenieDefaults
        // TweenPlanner,
        // tweenDefaults
      }
    };
    // import TweenPlanner from './tween/planner';
    // import tweenDefaults from './tween/tween-defaults';
    exports.default = mojs;
    module.exports = exports['default'];
  });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
});
//# sourceMappingURL=mo.js.map