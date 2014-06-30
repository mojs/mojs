(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Bit, h;

h = require('../helpers');

Bit = (function() {
  Bit.prototype.oa = {};

  function Bit(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.imidiate && this.run();
  }

  Bit.prototype.vars = function() {
    this.size = this.o.size || 100;
    this.size *= h.pixel;
    this.cnt = this["default"]({
      prop: 'cnt',
      def: 0
    });
    this.oldRadius = this.radius;
    this.radius = this["default"]({
      prop: 'radius',
      def: 50
    });
    (this.oa.radius != null) && h.unlock({
      lock: 'bitRadiusLock'
    });
    h.lock({
      lock: 'bitRadiusLock',
      fun: (function(_this) {
        return function() {
          return _this.radius *= h.pixel;
        };
      })(this)
    });
    this["default"]({
      prop: 'lineCap',
      def: 'round'
    });
    this.el = this.o.el || this.el || this.createContext();
    (this.o.el != null) && (this.foreignContext = true);
    this.ctx = this.ctx || this.el.getContext('2d');
    this.radius !== this.oldRadius && this.setElSize();
    this.color = this["default"]({
      prop: 'color',
      def: 'deeppink'
    });
    this.rate = this["default"]({
      prop: 'rate',
      def: .5
    });
    this.fillRate = this["default"]({
      prop: 'fillRate',
      def: .33
    });
    this.duration = this["default"]({
      prop: 'duration',
      def: 600
    });
    this.delay = this["default"]({
      prop: 'delay',
      def: 0
    });
    this.strokeWidth = this["default"]({
      prop: 'strokeWidth',
      def: 1
    });
    this.easing = this["default"]({
      prop: 'easing',
      def: 'Linear.None'
    });
    this.easingArr = this.easing.split('.');
    this.imidiate = this.o.imidiate;
    if (this.imidiate == null) {
      this.imidiate = true;
    }
    this.x = this.foreignContext ? this["default"]({
      prop: 'x',
      def: this.radius
    }) : this.radius;
    return this.y = this.foreignContext ? this["default"]({
      prop: 'y',
      def: this.radius
    }) : this.radius;
  };

  Bit.prototype.createContext = function() {
    if (this.foreignContext) {
      return;
    }
    this.el = document.createElement('canvas');
    return h.body.appendChild(this.el);
  };

  Bit.prototype.setElSize = function() {
    this.el.setAttribute('width', 2 * this.radius);
    this.el.setAttribute('height', 2 * this.radius);
    if (h.pixel > 1) {
      this.el.style.width = "" + this.radius + "px";
      this.el.style.height = "" + this.radius + "px";
    }
    return this.el;
  };

  Bit.prototype["default"] = function(o) {
    var def, prop;
    prop = o.prop;
    def = o.def;
    return this[prop] = this.oa[prop] != null ? this.oa[prop] : this[prop] != null ? this[prop] : this.o[prop] != null ? this.o[prop] : def;
  };

  return Bit;

})();

module.exports = Bit;


},{"../helpers":6}],2:[function(require,module,exports){
var Bit, Bubble, TWEEN, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('../polyfills');

h = require('../helpers');

Bit = require('./bit');

TWEEN = require('../vendor/tween');

Bubble = (function(_super) {
  __extends(Bubble, _super);

  function Bubble() {
    return Bubble.__super__.constructor.apply(this, arguments);
  }

  Bubble.prototype.run = function(oa) {
    var it;
    this.oa = oa != null ? oa : {};
    this.vars();
    TWEEN.remove(this.tween);
    it = this;
    h.startAnimationLoop();
    return this.tween = new TWEEN.Tween({
      r: this.radius * this.rate,
      p: 0,
      lw: this.radius * this.fillRate
    }).to({
      r: this.radius,
      p: 1,
      lw: 0
    }, this.duration).easing(TWEEN.Easing[this.easingArr[0]][this.easingArr[1]]).onUpdate(function() {
      return it.draw.call(this, it);
    }).onComplete(function() {
      return h.stopAnimationLoop();
    }).delay(this.delay).start();
  };

  Bubble.prototype.draw = function(it) {
    var ctx;
    ctx = it.ctx;
    (this.r < 0) && (this.r = -this.r);
    ctx.clear();
    ctx.beginPath();
    ctx.arc(it.x, it.y, this.r, 0, 2 * Math.PI, false);
    ctx.lineWidth = this.lw * h.pixel;
    ctx.strokeStyle = it.color;
    ctx.stroke();
    return this.p === 1 && ctx.clear();
  };

  return Bubble;

})(Bit);

module.exports = Bubble;


},{"../helpers":6,"../polyfills":7,"../vendor/tween":8,"./bit":1}],3:[function(require,module,exports){
var Bit, Burst, TWEEN, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('../polyfills');

h = require('../helpers');

Bit = require('./bit');

TWEEN = require('../vendor/tween');

Burst = (function(_super) {
  __extends(Burst, _super);

  function Burst() {
    return Burst.__super__.constructor.apply(this, arguments);
  }

  Burst.prototype.run = function(oa) {
    var from, it;
    this.oa = oa != null ? oa : {};
    this.vars();
    TWEEN.remove(this.tween);
    TWEEN.remove(this.tween2);
    it = this;
    this.tween2 = new TWEEN.Tween({
      r: this.radius * this.rate,
      d: this.rotate / 2
    }).to({
      r: this.radius - this.radiusSlice,
      d: this.rotate
    }, this.duration / 2).easing(TWEEN.Easing[this.easingArr[0]][this.easingArr[1]]).onUpdate(function() {
      return it.draw2.call(this, it);
    }).onComplete(function() {
      return h.stopAnimationLoop();
    });
    from = {
      lw: this.radius * this.fillRate,
      r: this.radius * this.rate,
      p: 0,
      d: 0
    };
    h.startAnimationLoop();
    return this.tween = new TWEEN.Tween(from).to({
      r: this.radius - this.radiusSlice,
      p: 1,
      lw: 0,
      d: this.rotate / 2
    }, this.duration / 2).easing(TWEEN.Easing[this.easingArr[0]][this.easingArr[1]]).onUpdate(function() {
      return it.draw.call(this, it);
    }).delay(this.delay).start().delay(this.delay2).chain(this.tween2);
  };

  Burst.prototype.vars = function() {
    Burst.__super__.vars.apply(this, arguments);
    this.degreeRate = 1;
    this.step = (this.degreeRate * 2 * Math.PI) / this.cnt;
    this.rotateStep = this.degreeRate * 360 / this.cnt;
    this.initialRotation = this["default"]({
      prop: 'initialRotation',
      def: 0
    });
    this["default"]('delay2', 0);
    h.lock({
      lock: 'burstRotationLock',
      fun: (function(_this) {
        return function() {
          return _this.initialRotation *= Math.PI / 180;
        };
      })(this)
    });
    this["default"]({
      prop: 'rotate',
      def: 0
    });
    (this.oa.rotate != null) && h.unlock({
      lock: 'burstRotateLock'
    });
    h.lock({
      lock: 'burstRotateLock',
      fun: (function(_this) {
        return function() {
          return _this.rotate *= Math.PI / 180;
        };
      })(this)
    });
    return this.radiusSlice = this.lineCap !== 'butt' ? this.strokeWidth : 0;
  };

  Burst.prototype.draw = function(it) {
    var angle, ctx, i, x1, x2, y1, y2, _i, _ref;
    ctx = it.ctx;
    ctx.clear();
    ctx.beginPath();
    angle = it.initialRotation;
    for (i = _i = 0, _ref = it.cnt; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      x1 = it.x + (Math.cos(angle + this.d) * (it.radius * it.rate));
      y1 = it.y + (Math.sin(angle + this.d) * (it.radius * it.rate));
      x2 = it.x + (Math.cos(angle + this.d) * this.r);
      y2 = it.y + (Math.sin(angle + this.d) * this.r);
      it.drawLine({
        point1: {
          x: x1,
          y: y1
        },
        point2: {
          x: x2,
          y: y2
        },
        ctx: ctx
      });
      angle += it.step;
    }
    ctx.stroke();
    ctx.lineWidth = it.strokeWidth * h.pixel;
    ctx.strokeStyle = it.color;
    ctx.lineCap = it.lineCap;
    return ctx.stroke();
  };

  Burst.prototype.drawLine = function(o) {
    o.ctx.moveTo(o.point1.x, o.point1.y);
    return o.ctx.lineTo(o.point2.x, o.point2.y);
  };

  Burst.prototype.draw2 = function(it) {
    var angle, ctx, i, x1, x2, y1, y2, _i, _ref;
    ctx = it.ctx;
    ctx.clear();
    ctx.beginPath();
    angle = it.initialRotation;
    for (i = _i = 0, _ref = it.cnt; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      x1 = it.x + (Math.cos(angle + this.d) * this.r);
      y1 = it.y + (Math.sin(angle + this.d) * this.r);
      x2 = it.x + (Math.cos(angle + this.d) * (it.radius - it.radiusSlice));
      y2 = it.y + (Math.sin(angle + this.d) * (it.radius - it.radiusSlice));
      it.drawLine({
        point1: {
          x: x1,
          y: y1
        },
        point2: {
          x: x2,
          y: y2
        },
        ctx: ctx
      });
      angle += it.step;
    }
    ctx.stroke();
    ctx.lineWidth = it.strokeWidth * h.pixel;
    ctx.strokeStyle = it.color;
    ctx.lineCap = it.lineCap;
    this.p === 1 && ctx.clear();
    return ctx.stroke();
  };

  return Burst;

})(Bit);

module.exports = Burst;


},{"../helpers":6,"../polyfills":7,"../vendor/tween":8,"./bit":1}],4:[function(require,module,exports){
var Bit, Quirk, TWEEN, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

h = require('../helpers');

Bit = require('./bit');

TWEEN = require('../vendor/tween');

Quirk = (function(_super) {
  __extends(Quirk, _super);

  function Quirk() {
    return Quirk.__super__.constructor.apply(this, arguments);
  }

  Quirk.prototype.run = function(oa) {
    var from, from2, it, to, to2;
    this.oa = oa != null ? oa : {};
    this.vars();
    TWEEN.remove(this.tween);
    TWEEN.remove(this.tween2);
    it = this;
    h.startAnimationLoop();
    from2 = {
      angle: this.angle * h.deg,
      rotate: this.rotate / 2
    };
    to2 = {
      angle: 0,
      rotate: this.rotate
    };
    this.tween2 = new TWEEN.Tween(from2).to(to2, this.duration / 2).easing(TWEEN.Easing[this.easingArr[0]][this.easingArr[1]]).onUpdate(function() {
      return it.draw2.call(this, it);
    }).onComplete(function() {
      return h.stopAnimationLoop();
    });
    from = {
      angle: 0,
      rotate: 0
    };
    to = {
      angle: this.angle * h.deg,
      rotate: this.rotate / 2
    };
    return this.tween = new TWEEN.Tween(from).to(to, this.duration / 2).easing(TWEEN.Easing[this.easingArr[0]][this.easingArr[1]]).onUpdate(function() {
      return it.draw.call(this, it);
    }).delay(this.delay).start().delay(this.delay2).chain(this.tween2);
  };

  Quirk.prototype.vars = function() {
    Quirk.__super__.vars.apply(this, arguments);
    this["default"]({
      prop: 'angle',
      def: 180
    });
    this["default"]({
      prop: 'rotate',
      def: 360
    });
    return this["default"]({
      prop: 'direction',
      def: 1
    });
  };

  Quirk.prototype.draw = function(it) {
    var ctx, endAngle, rotate, startAngle;
    rotate = this.rotate * h.deg;
    startAngle = (rotate - (this.angle / 2)) * it.direction;
    endAngle = (rotate + (this.angle / 2)) * it.direction;
    ctx = it.ctx;
    ctx.clear();
    ctx.beginPath();
    ctx.arc(it.x, it.y, it.radius - it.strokeWidth, startAngle, endAngle, false);
    ctx.lineWidth = it.strokeWidth * h.pixel;
    ctx.lineCap = it.lineCap;
    ctx.strokeStyle = it.color;
    return ctx.stroke();
  };

  Quirk.prototype.draw2 = function(it) {
    var ctx, endAngle, rotate, startAngle;
    rotate = this.rotate * h.deg;
    startAngle = (rotate - (this.angle / 2)) * it.direction;
    endAngle = (rotate + (this.angle / 2)) * it.direction;
    ctx = it.ctx;
    ctx.clear();
    ctx.beginPath();
    ctx.arc(it.x, it.y, it.radius - it.strokeWidth, startAngle, endAngle, false);
    ctx.lineWidth = it.strokeWidth * h.pixel;
    ctx.lineCap = it.lineCap;
    ctx.strokeStyle = it.color;
    ctx.stroke();
    return this.p === 1 && ctx.clear();
  };

  return Quirk;

})(Bit);

module.exports = Quirk;


},{"../helpers":6,"../vendor/tween":8,"./bit":1}],5:[function(require,module,exports){
var Bubble, Burst, Quirk, bubble1, canvas, h;

Burst = require('./bits/burst');

Bubble = require('./bits/bubble');

Quirk = require('./bits/quirk');

h = require('./helpers');

canvas = document.getElementById('js-canvas');

bubble1 = new Quirk({
  radius: 200,
  duration: 800,
  strokeWidth: 5,
  angle: 60,
  delay: 1400,
  rotate: 360
});

window.addEventListener('click', function(e) {
  var size1, style1;
  style1 = h.getStyle(bubble1.el);
  size1 = parseInt(style1.width, 10);
  bubble1.el.style.position = 'absolute';
  bubble1.el.style.top = "" + (e.y - (size1 / 2)) + "px";
  bubble1.el.style.left = "" + (e.x - (size1 / 2)) + "px";
  return bubble1.run({
    radius: h.rand(50, 100),
    initialRotation: h.rand(-90, 90),
    delay: 0
  });
});


},{"./bits/bubble":2,"./bits/burst":3,"./bits/quirk":4,"./helpers":6}],6:[function(require,module,exports){
var Helpers, TWEEN;

TWEEN = require('./vendor/tween');

Helpers = (function() {
  Helpers.prototype.pixel = 2;

  Helpers.prototype.doc = document;

  Helpers.prototype.body = document.body;

  Helpers.prototype.deg = Math.PI / 180;

  function Helpers(o) {
    this.o = o != null ? o : {};
    this.animationLoop = this.animationLoop.bind(this);
  }

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