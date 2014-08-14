(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Bit, TWEEN, h;

h = require('../helpers');

require('../polyfills');

TWEEN = require('../vendor/tween');

Bit = (function() {
  Bit.prototype.oa = {};

  Bit.prototype.defaultOptions = {
    x: 0,
    y: 0,
    deg: 0
  };

  function Bit(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.o.isRunLess || (typeof this.run === "function" ? this.run() : void 0);
  }

  Bit.prototype.vars = function() {
    this.TWEEN = TWEEN;
    this.h = h;
    this.ctx = this.o.ctx || this.ctx;
    this.px = h.pixel;
    this.DEG = Math.PI / 180;
    this.parent = this["default"]({
      prop: 'parent',
      def: h.body
    });
    this.color = this["default"]({
      prop: 'color',
      def: '#222'
    });
    this.colorMap = this["default"]({
      prop: 'colorMap',
      def: [this.color]
    });
    return this.colorObj = this.h.makeColorObj(this.color);
  };

  Bit.prototype.setProp = function(props) {
    var propName, propValue;
    for (propName in props) {
      propValue = props[propName];
      this[propName] = propValue;
    }
    return this.render();
  };

  Bit.prototype["default"] = function(o) {
    var def, prop;
    prop = o.prop;
    def = o.def;
    return this[prop] = this.oa[prop] != null ? this.oa[prop] : this.o[prop] != null ? this.o[prop] : this[prop] != null ? this[prop] : this.defaultOptions[prop] != null ? this.defaultOptions[prop] : def;
  };

  Bit.prototype.defaultPart = function(o) {
    this[o.prop] = null;
    return this["default"](o);
  };

  return Bit;

})();

module.exports = Bit;


},{"../helpers":6,"../polyfills":7,"../vendor/tween":8}],2:[function(require,module,exports){
var Burst, Byte, Line,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Byte = require('./byte');

Line = require('./line');

Burst = (function(_super) {
  __extends(Burst, _super);

  function Burst() {
    return Burst.__super__.constructor.apply(this, arguments);
  }

  Burst.prototype.vars = function() {
    var i, line, _i, _ref, _results;
    this.cnt = this["default"]({
      prop: 'cnt',
      def: 3
    });
    this.radiusStart = this["default"]({
      prop: 'radiusStart',
      def: 100
    });
    this.radiusEnd = this["default"]({
      prop: 'radiusEnd',
      def: 200
    });
    this.lineWidth = this["default"]({
      prop: 'lineWidth',
      def: 1
    });
    this.lineCap = this["default"]({
      prop: 'lineCap',
      def: 'none'
    });
    this.angle = this["default"]({
      prop: 'angle',
      def: 360
    });
    this.duration = this["default"]({
      prop: 'duration',
      def: 400
    });
    this.duration1 = this["default"]({
      prop: 'duration1',
      def: this.duration / 2
    });
    this.duration2 = this["default"]({
      prop: 'duration2',
      def: this.duration / 2
    });
    this.delay = this["default"]({
      prop: 'delay',
      def: 0
    });
    this.easing = this["default"]({
      prop: 'easing',
      def: 'Linear.None'
    });
    this.easing1 = this["default"]({
      prop: 'easing1',
      def: this.easing
    });
    this.easing2 = this["default"]({
      prop: 'easing2',
      def: this.easing
    });
    this.easings1 = this.easing1.split('.');
    this.easings2 = this.easing2.split('.');
    this.initialRotation = this["default"]({
      prop: 'initialRotation',
      def: 0
    });
    this.rotation = this["default"]({
      prop: 'rotation',
      def: 0
    });
    this.rotation1 = this.defaultPart({
      prop: 'rotation1',
      def: this.rotation / 2
    });
    this.rotation2 = this.defaultPart({
      prop: 'rotation2',
      def: this.rotation / 2
    });
    this.step = this.angle / (this.cnt - 1);
    console.log(this.step);
    this.size = 2 * this.radiusEnd + 2 * this.lineWidth;
    this.center = this.size / 2;
    this.sizeX = this.size;
    this.sizeY = this.size;
    Burst.__super__.vars.apply(this, arguments);
    this.lines = [];
    _results = [];
    for (i = _i = 0, _ref = this.cnt; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      line = new Line({
        ctx: this.ctx,
        color: this.colorMap[i % this.colorMap.length],
        isClearLess: true,
        lineWidth: this.lineWidth,
        lineCap: this.lineCap
      });
      _results.push(this.lines.push(line));
    }
    return _results;
  };

  Burst.prototype.run = function(oa) {
    var from, it, to;
    this.oa = oa != null ? oa : {};
    this.h.size(this.oa) && this.vars();
    this.TWEEN.remove(this.tween1);
    it = this;
    from = {
      r: this.radiusStart,
      deg: this.rotation1
    };
    to = {
      r: this.radiusEnd,
      deg: this.rotation1 + this.rotation2
    };
    this.tween2 = new this.TWEEN.Tween(from).to(to, this.duration2 * this.s).onUpdate(function() {
      var angle, i, line, rotation, x, x1, y, y1, _i, _len, _ref, _results;
      it.ctx.clear();
      angle = 0;
      _ref = it.lines;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        line = _ref[i];
        rotation = (angle + it.initialRotation + this.deg) * it.DEG;
        x1 = it.center + Math.cos(rotation) * it.radiusEnd;
        y1 = it.center + Math.sin(rotation) * it.radiusEnd;
        x = it.center + Math.cos(rotation) * this.r;
        y = it.center + Math.sin(rotation) * this.r;
        line.setProp({
          start: {
            x: x,
            y: y
          },
          end: {
            x: x1,
            y: y1
          }
        });
        _results.push(angle += it.step);
      }
      return _results;
    }).easing(this.TWEEN.Easing[this.easings2[0]][this.easings2[1]]);
    from = {
      r: this.radiusStart,
      deg: 0
    };
    to = {
      r: this.radiusEnd,
      deg: this.rotation1
    };
    this.tween1 = new this.TWEEN.Tween(from).to(to, this.duration1 * this.s).onUpdate(function() {
      var angle, i, line, rotation, x, x1, y, y1, _i, _len, _ref, _results;
      it.ctx.clear();
      angle = 0;
      _ref = it.lines;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        line = _ref[i];
        rotation = (angle + it.initialRotation + this.deg) * it.DEG;
        x1 = it.center + Math.cos(rotation) * it.radiusStart;
        y1 = it.center + Math.sin(rotation) * it.radiusStart;
        x = it.center + Math.cos(rotation) * this.r;
        y = it.center + Math.sin(rotation) * this.r;
        line.setProp({
          start: {
            x: x1,
            y: y1
          },
          end: {
            x: x,
            y: y
          }
        });
        _results.push(angle += it.step);
      }
      return _results;
    }).easing(this.TWEEN.Easing[this.easings1[0]][this.easings1[1]]).chain(this.tween2).start();
    return this.h.startAnimationLoop();
  };

  return Burst;

})(Byte);

module.exports = Burst;


},{"./byte":3,"./line":4}],3:[function(require,module,exports){
var Bit, Byte, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

h = require('../helpers');

Bit = require('./bit');

Byte = (function(_super) {
  __extends(Byte, _super);

  function Byte() {
    return Byte.__super__.constructor.apply(this, arguments);
  }

  Byte.prototype.vars = function() {
    Byte.__super__.vars.apply(this, arguments);
    this.s = 1 * h.time(1);
    this.parent = this.o.parent || h.body;
    this.el = this.o.el || this.createEl();
    return this.ctx = this.o.ctx || this.ctx || this.el.getContext('2d');
  };

  Byte.prototype.createEl = function() {
    this.el = document.createElement('canvas');
    this.el.style.position = 'absolute';
    this.el.style.left = 0;
    this.el.style.top = 0;
    this.parent.appendChild(this.el);
    return this.setElSize();
  };

  Byte.prototype.setElSize = function() {
    this.el.setAttribute('width', 2 * this.sizeX);
    this.el.setAttribute('height', 2 * this.sizeY);
    if (h.pixel > 1) {
      this.el.style.width = "" + this.sizeX + "px";
      this.el.style.height = "" + this.sizeY + "px";
    }
    return this.el;
  };

  return Byte;

})(Bit);

module.exports = Byte;


},{"../helpers":6,"./bit":1}],4:[function(require,module,exports){
var Bit, Line,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Line = (function(_super) {
  __extends(Line, _super);

  function Line() {
    return Line.__super__.constructor.apply(this, arguments);
  }

  Line.prototype.vars = function() {
    this.start = this["default"]({
      prop: 'start',
      def: {
        x: 0,
        y: 0
      }
    });
    this.end = this["default"]({
      prop: 'end',
      def: {
        x: 0,
        y: 0
      }
    });
    this.position = this["default"]({
      prop: 'position',
      def: {
        x: 0,
        y: 0
      }
    });
    this.lineWidth = this["default"]({
      prop: 'lineWidth',
      def: 1
    });
    this.lineCap = this["default"]({
      prop: 'lineCap',
      def: 1
    });
    this.opacity = this["default"]({
      prop: 'opacity',
      def: 1
    });
    this.isClearLess = this["default"]({
      prop: 'isClearLess',
      def: false
    });
    this.size = {
      width: (this.end.x - this.start.x) + this.lineWidth,
      height: this.end.y - this.start.y
    };
    return Line.__super__.vars.apply(this, arguments);
  };

  Line.prototype.render = function() {
    var c;
    if (!this.ctx) {
      console.error('Line.render: no context!');
      return;
    }
    this.isClearLess || this.ctx.clear();
    this.ctx.beginPath();
    this.ctx.moveTo(this.start.x * this.px, this.start.y * this.px);
    this.ctx.lineTo(this.end.x * this.px, this.end.y * this.px);
    this.ctx.lineWidth = this.lineWidth * this.px;
    c = this.colorObj;
    this.ctx.strokeStyle = "rgba(" + c.r + "," + c.g + "," + c.b + ", " + this.opacity + ")";
    this.ctx.lineCap = this.lineCap;
    return this.ctx.stroke();
  };

  return Line;

})(Bit);

module.exports = Line;


},{"./bit":1}],5:[function(require,module,exports){
var Burst, burst;

Burst = require('./bits/burst');

burst = new Burst({
  lineWidth: 2,
  lineCap: 'round',
  duration: 300,
  radiusStart: 15,
  radiusEnd: 30,
  cnt: 5,
  angle: 180,
  initialRotation: 180,
  rotation: 90,
  isRunLess: true
});

window.addEventListener('click', function(e) {
  burst.el.style.top = "" + (e.y - (burst.size / 2)) + "px";
  burst.el.style.left = "" + (e.x - (burst.size / 2)) + "px";
  return burst.run();
});


},{"./bits/burst":2}],6:[function(require,module,exports){
var Helpers, TWEEN;

TWEEN = require('./vendor/tween');

Helpers = (function() {
  Helpers.prototype.pixel = 2;

  Helpers.prototype.doc = document;

  Helpers.prototype.body = document.body;

  Helpers.prototype.deg = Math.PI / 180;

  Helpers.prototype.s = 1;

  Helpers.prototype.time = function(time) {
    return time * this.s;
  };

  function Helpers(o) {
    this.o = o != null ? o : {};
    this.animationLoop = this.animationLoop.bind(this);
  }

  Helpers.prototype.slice = function(value, max) {
    if (value > max) {
      return max;
    } else {
      return value;
    }
  };

  Helpers.prototype.clone = function(obj) {
    var key, target, value;
    target = {};
    for (key in obj) {
      value = obj[key];
      target[key] = value;
    }
    return target;
  };

  Helpers.prototype.getStyle = function(el) {
    var computedStyle;
    if (window.getComputedStyle) {
      return computedStyle = getComputedStyle(el, null);
    } else {
      return computedStyle = el.currentStyle;
    }
  };

  Helpers.prototype.rand = function(min, max) {
    return Math.floor((Math.random() * ((max + 1) - min)) + min);
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

  Helpers.prototype.makeColorObj = function(hex) {
    var b, colorObj, g, r, result;
    result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(hex);
    colorObj = {};
    if (result) {
      r = result[1].length === 2 ? result[1] : result[1] + result[1];
      g = result[2].length === 2 ? result[2] : result[2] + result[2];
      b = result[3].length === 2 ? result[3] : result[3] + result[3];
      colorObj = {
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16)
      };
    }
    return colorObj;
  };

  Helpers.prototype.size = function(obj) {
    var i, key, value;
    i = 0;
    for (key in obj) {
      value = obj[key];
      i++;
    }
    return i;
  };

  Helpers.prototype.lock = function(o) {
    !this[o.lock] && o.fun();
    return this[o.lock] = true;
  };

  Helpers.prototype.unlock = function(o) {
    return this[o.lock] = false;
  };

  Helpers.prototype.animationLoop = function(time) {
    if (!this.isAnimateLoop) {
      return;
    }
    requestAnimationFrame(this.animationLoop);
    return TWEEN.update(time);
  };

  Helpers.prototype.startAnimationLoop = function() {
    if (this.isAnimateLoop) {
      return;
    }
    this.isAnimateLoop = true;
    return this.animationLoop();
  };

  Helpers.prototype.stopAnimationLoop = function() {
    return this.isAnimateLoop = false;
  };

  return Helpers;

})();

module.exports = (function() {
  return new Helpers;
})();


},{"./vendor/tween":8}],7:[function(require,module,exports){
module.exports = (function() {
  if (!CanvasRenderingContext2D.prototype.clear) {
    return CanvasRenderingContext2D.prototype.clear = function(preserveTransform) {
      if (preserveTransform) {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
      }
      this.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (preserveTransform) {
        this.restore();
      }
    };
  }
})();


},{}],8:[function(require,module,exports){
;(function(undefined){

	/**
	 * Tween.js - Licensed under the MIT license
	 * https://github.com/sole/tween.js
	 * ----------------------------------------------
	 *
	 * See https://github.com/sole/tween.js/graphs/contributors for the full list of contributors.
	 * Thank you all, you're awesome!
	 */

	// Date.now shim for (ahem) Internet Explo(d|r)er
	if ( Date.now === undefined ) {

		Date.now = function () {

			return new Date().valueOf();

		};

	}

	var TWEEN = TWEEN || ( function () {

		var _tweens = [];

		return {

			REVISION: '14',

			getAll: function () {

				return _tweens;

			},

			removeAll: function () {

				_tweens = [];

			},

			add: function ( tween ) {

				_tweens.push( tween );

			},

			remove: function ( tween ) {

				var i = _tweens.indexOf( tween );

				if ( i !== -1 ) {

					_tweens.splice( i, 1 );

				}

			},

			update: function ( time ) {

				if ( _tweens.length === 0 ) return false;

				var i = 0;

				time = time !== undefined ? time : ( typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now() );

				while ( i < _tweens.length ) {

					if ( _tweens[ i ].update( time ) ) {

						i++;

					} else {

						_tweens.splice( i, 1 );

					}

				}

				return true;

			}
		};

	} )();

	TWEEN.Tween = function ( object ) {

		var _object = object;
		var _valuesStart = {};
		var _valuesEnd = {};
		var _valuesStartRepeat = {};
		var _duration = 1000;
		var _repeat = 0;
		var _yoyo = false;
		var _isPlaying = false;
		var _reversed = false;
		var _delayTime = 0;
		var _startTime = null;
		var _easingFunction = TWEEN.Easing.Linear.None;
		var _interpolationFunction = TWEEN.Interpolation.Linear;
		var _chainedTweens = [];
		var _onStartCallback = null;
		var _onStartCallbackFired = false;
		var _onUpdateCallback = null;
		var _onCompleteCallback = null;
		var _onStopCallback = null;

		// Set all starting values present on the target object
		for ( var field in object ) {

			_valuesStart[ field ] = parseFloat(object[field], 10);

		}

		this.to = function ( properties, duration ) {

			if ( duration !== undefined ) {

				_duration = duration;

			}

			_valuesEnd = properties;

			return this;

		};

		this.start = function ( time ) {

			TWEEN.add( this );

			_isPlaying = true;

			_onStartCallbackFired = false;

			_startTime = time !== undefined ? time : ( typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now() );
			_startTime += _delayTime;

			for ( var property in _valuesEnd ) {

				// check if an Array was provided as property value
				if ( _valuesEnd[ property ] instanceof Array ) {

					if ( _valuesEnd[ property ].length === 0 ) {

						continue;

					}

					// create a local copy of the Array with the start value at the front
					_valuesEnd[ property ] = [ _object[ property ] ].concat( _valuesEnd[ property ] );

				}

				_valuesStart[ property ] = _object[ property ];

				if( ( _valuesStart[ property ] instanceof Array ) === false ) {
					_valuesStart[ property ] *= 1.0; // Ensures we're using numbers, not strings
				}

				_valuesStartRepeat[ property ] = _valuesStart[ property ] || 0;

			}

			return this;

		};

		this.stop = function () {

			if ( !_isPlaying ) {
				return this;
			}

			TWEEN.remove( this );
			_isPlaying = false;

			if ( _onStopCallback !== null ) {

				_onStopCallback.call( _object );

			}

			this.stopChainedTweens();
			return this;

		};

		this.stopChainedTweens = function () {

			for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {

				_chainedTweens[ i ].stop();

			}

		};

		this.delay = function ( amount ) {

			_delayTime = amount;
			return this;

		};

		this.repeat = function ( times ) {
			_repeat = times;
			return this;

		};

		this.yoyo = function( yoyo ) {

			_yoyo = yoyo;
			return this;

		};


		this.easing = function ( easing ) {

			_easingFunction = easing;
			return this;

		};

		this.interpolation = function ( interpolation ) {

			_interpolationFunction = interpolation;
			return this;

		};

		this.chain = function () {

			_chainedTweens = arguments;
			return this;

		};

		this.onStart = function ( callback ) {

			_onStartCallback = callback;
			return this;

		};

		this.onUpdate = function ( callback ) {

			_onUpdateCallback = callback;
			return this;

		};

		this.onComplete = function ( callback ) {

			_onCompleteCallback = callback;
			return this;

		};

		this.onStop = function ( callback ) {

			_onStopCallback = callback;
			return this;

		};

		this.update = function ( time ) {

			var property;

			if ( time < _startTime ) {

				return true;

			}

			if ( _onStartCallbackFired === false ) {

				if ( _onStartCallback !== null ) {

					_onStartCallback.call( _object );

				}

				_onStartCallbackFired = true;

			}

			var elapsed = ( time - _startTime ) / _duration;
			elapsed = elapsed > 1 ? 1 : elapsed;

			var value = _easingFunction( elapsed );

			for ( property in _valuesEnd ) {

				var start = _valuesStart[ property ] || 0;
				var end = _valuesEnd[ property ];

				if ( end instanceof Array ) {

					_object[ property ] = _interpolationFunction( end, value );

				} else {

					// Parses relative end values with start as base (e.g.: +10, -3)
					if ( typeof(end) === "string" ) {
						end = start + parseFloat(end, 10);
					}

					// protect against non numeric properties.
					if ( typeof(end) === "number" ) {
						_object[ property ] = start + ( end - start ) * value;
					}

				}

			}

			if ( _onUpdateCallback !== null ) {

				_onUpdateCallback.call( _object, value );

			}

			if ( elapsed == 1 ) {

				if ( _repeat > 0 ) {

					if( isFinite( _repeat ) ) {
						_repeat--;
					}

					// reassign starting values, restart by making startTime = now
					for( property in _valuesStartRepeat ) {

						if ( typeof( _valuesEnd[ property ] ) === "string" ) {
							_valuesStartRepeat[ property ] = _valuesStartRepeat[ property ] + parseFloat(_valuesEnd[ property ], 10);
						}

						if (_yoyo) {
							var tmp = _valuesStartRepeat[ property ];
							_valuesStartRepeat[ property ] = _valuesEnd[ property ];
							_valuesEnd[ property ] = tmp;
						}

						_valuesStart[ property ] = _valuesStartRepeat[ property ];

					}

					if (_yoyo) {
						_reversed = !_reversed;
					}

					_startTime = time + _delayTime;

					return true;

				} else {

					if ( _onCompleteCallback !== null ) {

						_onCompleteCallback.call( _object );

					}

					for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {

						_chainedTweens[ i ].start( time );

					}

					return false;

				}

			}

			return true;

		};

	};


	TWEEN.Easing = {

		Linear: {

			None: function ( k ) {

				return k;

			}

		},

		Quadratic: {

			In: function ( k ) {

				return k * k;

			},

			Out: function ( k ) {

				return k * ( 2 - k );

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
				return - 0.5 * ( --k * ( k - 2 ) - 1 );

			}

		},

		Cubic: {

			In: function ( k ) {

				return k * k * k;

			},

			Out: function ( k ) {

				return --k * k * k + 1;

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
				return 0.5 * ( ( k -= 2 ) * k * k + 2 );

			}

		},

		Quartic: {

			In: function ( k ) {

				return k * k * k * k;

			},

			Out: function ( k ) {

				return 1 - ( --k * k * k * k );

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
				return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

			}

		},

		Quintic: {

			In: function ( k ) {

				return k * k * k * k * k;

			},

			Out: function ( k ) {

				return --k * k * k * k * k + 1;

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
				return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

			}

		},

		Sinusoidal: {

			In: function ( k ) {

				return 1 - Math.cos( k * Math.PI / 2 );

			},

			Out: function ( k ) {

				return Math.sin( k * Math.PI / 2 );

			},

			InOut: function ( k ) {

				return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

			}

		},

		Exponential: {

			In: function ( k ) {

				return k === 0 ? 0 : Math.pow( 1024, k - 1 );

			},

			Out: function ( k ) {

				return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

			},

			InOut: function ( k ) {

				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
				return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

			}

		},

		Circular: {

			In: function ( k ) {

				return 1 - Math.sqrt( 1 - k * k );

			},

			Out: function ( k ) {

				return Math.sqrt( 1 - ( --k * k ) );

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
				return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

			}

		},

		Elastic: {

			In: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

			},

			Out: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

			},

			InOut: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
				return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

			}

		},

		Back: {

			In: function ( k ) {

				var s = 1.70158;
				return k * k * ( ( s + 1 ) * k - s );

			},

			Out: function ( k ) {

				var s = 1.70158;
				return --k * k * ( ( s + 1 ) * k + s ) + 1;

			},

			InOut: function ( k ) {

				var s = 1.70158 * 1.525;
				if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
				return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

			}

		},

		Bounce: {

			In: function ( k ) {

				return 1 - TWEEN.Easing.Bounce.Out( 1 - k );

			},

			Out: function ( k ) {

				if ( k < ( 1 / 2.75 ) ) {

					return 7.5625 * k * k;

				} else if ( k < ( 2 / 2.75 ) ) {

					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

				} else if ( k < ( 2.5 / 2.75 ) ) {

					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

				} else {

					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

				}

			},

			InOut: function ( k ) {

				if ( k < 0.5 ) return TWEEN.Easing.Bounce.In( k * 2 ) * 0.5;
				return TWEEN.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

			}

		}

	};

	TWEEN.Interpolation = {

		Linear: function ( v, k ) {

			var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.Linear;

			if ( k < 0 ) return fn( v[ 0 ], v[ 1 ], f );
			if ( k > 1 ) return fn( v[ m ], v[ m - 1 ], m - f );

			return fn( v[ i ], v[ i + 1 > m ? m : i + 1 ], f - i );

		},

		Bezier: function ( v, k ) {

			var b = 0, n = v.length - 1, pw = Math.pow, bn = TWEEN.Interpolation.Utils.Bernstein, i;

			for ( i = 0; i <= n; i++ ) {
				b += pw( 1 - k, n - i ) * pw( k, i ) * v[ i ] * bn( n, i );
			}

			return b;

		},

		CatmullRom: function ( v, k ) {

			var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.CatmullRom;

			if ( v[ 0 ] === v[ m ] ) {

				if ( k < 0 ) i = Math.floor( f = m * ( 1 + k ) );

				return fn( v[ ( i - 1 + m ) % m ], v[ i ], v[ ( i + 1 ) % m ], v[ ( i + 2 ) % m ], f - i );

			} else {

				if ( k < 0 ) return v[ 0 ] - ( fn( v[ 0 ], v[ 0 ], v[ 1 ], v[ 1 ], -f ) - v[ 0 ] );
				if ( k > 1 ) return v[ m ] - ( fn( v[ m ], v[ m ], v[ m - 1 ], v[ m - 1 ], f - m ) - v[ m ] );

				return fn( v[ i ? i - 1 : 0 ], v[ i ], v[ m < i + 1 ? m : i + 1 ], v[ m < i + 2 ? m : i + 2 ], f - i );

			}

		},

		Utils: {

			Linear: function ( p0, p1, t ) {

				return ( p1 - p0 ) * t + p0;

			},

			Bernstein: function ( n , i ) {

				var fc = TWEEN.Interpolation.Utils.Factorial;
				return fc( n ) / fc( i ) / fc( n - i );

			},

			Factorial: ( function () {

				var a = [ 1 ];

				return function ( n ) {

					var s = 1, i;
					if ( a[ n ] ) return a[ n ];
					for ( i = n; i > 1; i-- ) s *= i;
					return a[ n ] = s;

				};

			} )(),

			CatmullRom: function ( p0, p1, p2, p3, t ) {

				var v0 = ( p2 - p0 ) * 0.5, v1 = ( p3 - p1 ) * 0.5, t2 = t * t, t3 = t * t2;
				return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

			}

		}

	};

	module.exports = TWEEN;


})()


},{}]},{},[5])