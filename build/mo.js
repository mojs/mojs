/*! 
	:: mo · js :: motion graphics toolbelt for the web
	Oleg Solomka @LegoMushroom 2015 MIT
	0.117.0 
*/

(function(f){
if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.yes = f()}})(function(){var define,module,exports;return (function e(t,n,r){
function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var BezierEasing, bezierEasing, h,
  indexOf = [].indexOf || 
function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

h = require('./h');

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
        calcSampleValues();
      }
    };
    mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./h":4}],2:[function(require,module,exports){

var Burst, Swirl, Transit, Tween, bitsMap, h,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

bitsMap = require('./shapes/bitsMap');

Tween = require('./tween/tween');

Transit = require('./transit');

Swirl = require('./swirl');

h = require('./h');

Burst = (function(superClass) {
  extend(Burst, superClass);

  function Burst() {
    return Burst.__super__.constructor.apply(this, arguments);
  }

  Burst.prototype.skipProps = {
    childOptions: 1
  };

  Burst.prototype.defaults = {
    count: 5,
    degree: 360,
    opacity: 1,
    randomAngle: 0,
    randomRadius: 0,
    x: 100,
    y: 100,
    shiftX: 0,
    shiftY: 0,
    easing: 'Linear.None',
    radius: {
      25: 75
    },
    radiusX: void 0,
    radiusY: void 0,
    angle: 0,
    size: null,
    sizeGap: 0,
    duration: 600,
    delay: 0,
    onStart: null,
    onComplete: null,
    onCompleteChain: null,
    onUpdate: null,
    isResetAngles: false
  };

  Burst.prototype.childDefaults = {
    radius: {
      7: 0
    },
    radiusX: void 0,
    radiusY: void 0,
    angle: 0,
    opacity: 1,
    onStart: null,
    onComplete: null,
    onUpdate: null,
    points: 3,
    duration: 500,
    delay: 0,
    repeat: 0,
    yoyo: false,
    easing: 'Linear.None',
    type: 'circle',
    fill: 'deeppink',
    fillOpacity: 1,
    isSwirl: false,
    swirlSize: 10,
    swirlFrequency: 3,
    stroke: 'transparent',
    strokeWidth: 0,
    strokeOpacity: 1,
    strokeDasharray: '',
    strokeDashoffset: '',
    strokeLinecap: null
  };

  Burst.prototype.optionsIntersection = {
    radius: 1,
    radiusX: 1,
    radiusY: 1,
    angle: 1,
    opacity: 1,
    onStart: 1,
    onComplete: 1,
    onUpdate: 1
  };

  Burst.prototype.run = function(o) {
    var base, i, j, key, keys, len, len1, option, ref, ref1, tr;
    if ((o != null) && Object.keys(o).length) {
      if (o.count || ((ref = o.childOptions) != null ? ref.count : void 0)) {
        this.h.warn('Sorry, count can not be changed on run');
      }
      this.extendDefaults(o);
      keys = Object.keys(o.childOptions || {});
      if ((base = this.o).childOptions == null) {
        base.childOptions = {};
      }
      for (i = j = 0, len1 = keys.length; j < len1; i = ++j) {
        key = keys[i];
        this.o.childOptions[key] = o.childOptions[key];
      }
      len = this.transits.length;
      while (len--) {
        option = this.getOption(len);
        if ((((ref1 = o.childOptions) != null ? ref1.angle : void 0) == null) && (o.angleShift == null)) {
          option.angle = this.transits[len].o.angle;
        } else if (!o.isResetAngles) {
          option.angle = this.getBitAngle(option.angle, len);
        }
        this.transits[len].tuneNewOption(option, true);
      }
      this.tween.recalcDuration();
    }
    if (this.props.randomAngle || this.props.randomRadius) {
      len = this.transits.length;
      while (len--) {
        tr = this.transits[len];
        this.props.randomAngle && tr.setProp({
          angleShift: this.generateRandomAngle()
        });
        this.props.randomRadius && tr.setProp({
          radiusScale: this.generateRandomRadius()
        });
      }
    }
    return this.startTween();
  };

  Burst.prototype.createBit = function() {
    var i, j, option, ref, results;
    this.transits = [];
    results = [];
    for (i = j = 0, ref = this.props.count; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      option = this.getOption(i);
      option.ctx = this.ctx;
      option.index = i;
      option.isDrawLess = option.isRunLess = option.isTweenLess = true;
      this.props.randomAngle && (option.angleShift = this.generateRandomAngle());
      this.props.randomRadius && (option.radiusScale = this.generateRandomRadius());
      results.push(this.transits.push(new Swirl(option)));
    }
    return results;
  };

  Burst.prototype.addBitOptions = function() {
    var aShift, i, j, len1, pointEnd, pointStart, points, ref, results, step, transit;
    points = this.props.count;
    this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
    step = this.props.degree / this.degreeCnt;
    ref = this.transits;
    results = [];
    for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
      transit = ref[i];
      aShift = transit.props.angleShift || 0;
      pointStart = this.getSidePoint('start', i * step + aShift);
      pointEnd = this.getSidePoint('end', i * step + aShift);
      transit.o.x = this.getDeltaFromPoints('x', pointStart, pointEnd);
      transit.o.y = this.getDeltaFromPoints('y', pointStart, pointEnd);
      if (!this.props.isResetAngles) {
        transit.o.angle = this.getBitAngle(transit.o.angle, i);
      }
      results.push(transit.extendDefaults());
    }
    return results;
  };

  Burst.prototype.getBitAngle = function(angle, i) {
    var angleAddition, angleShift, curAngleShift, degCnt, delta, end, keys, newEnd, newStart, points, start, step;
    points = this.props.count;
    degCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
    step = this.props.degree / degCnt;
    angleAddition = i * step + 90;
    angleShift = this.transits[i].props.angleShift || 0;
    angle = typeof angle !== 'object' ? angle + angleAddition + angleShift : (keys = Object.keys(angle), start = keys[0], end = angle[start], curAngleShift = angleAddition + angleShift, newStart = parseFloat(start) + curAngleShift, newEnd = parseFloat(end) + curAngleShift, delta = {}, delta[newStart] = newEnd, delta);
    return angle;
  };

  Burst.prototype.getSidePoint = function(side, angle) {
    var pointStart, sideRadius;
    sideRadius = this.getSideRadius(side);
    return pointStart = this.h.getRadialPoint({
      radius: sideRadius.radius,
      radiusX: sideRadius.radiusX,
      radiusY: sideRadius.radiusY,
      angle: angle,
      center: {
        x: this.props.center,
        y: this.props.center
      }
    });
  };

  Burst.prototype.getSideRadius = function(side) {
    return {
      radius: this.getRadiusByKey('radius', side),
      radiusX: this.getRadiusByKey('radiusX', side),
      radiusY: this.getRadiusByKey('radiusY', side)
    };
  };

  Burst.prototype.getRadiusByKey = function(key, side) {
    if (this.deltas[key] != null) {
      return this.deltas[key][side];
    } else if (this.props[key] != null) {
      return this.props[key];
    }
  };

  Burst.prototype.getDeltaFromPoints = function(key, pointStart, pointEnd) {
    var delta;
    delta = {};
    if (pointStart[key] === pointEnd[key]) {
      return delta = pointStart[key];
    } else {
      delta[pointStart[key]] = pointEnd[key];
      return delta;
    }
  };

  Burst.prototype.draw = function(progress) {
    return this.drawEl();
  };

  Burst.prototype.isNeedsTransform = function() {
    return this.isPropChanged('shiftX') || this.isPropChanged('shiftY') || this.isPropChanged('angle');
  };

  Burst.prototype.fillTransform = function() {
    return "rotate(" + this.props.angle + "deg) translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
  };

  Burst.prototype.createTween = function() {
    var i, results;
    Burst.__super__.createTween.apply(this, arguments);
    i = this.transits.length;
    results = [];
    while (i--) {
      results.push(this.tween.add(this.transits[i].timeline));
    }
    return results;
  };

  Burst.prototype.calcSize = function() {
    var i, j, largestSize, len1, radius, ref, transit;
    largestSize = -1;
    ref = this.transits;
    for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
      transit = ref[i];
      transit.calcSize();
      if (largestSize < transit.props.size) {
        largestSize = transit.props.size;
      }
    }
    radius = this.calcMaxRadius();
    this.props.size = largestSize + 2 * radius;
    this.props.size += 2 * this.props.sizeGap;
    this.props.center = this.props.size / 2;
    return this.addBitOptions();
  };

  Burst.prototype.getOption = function(i) {
    var key, keys, len, option;
    option = {};
    keys = Object.keys(this.childDefaults);
    len = keys.length;
    while (len--) {
      key = keys[len];
      option[key] = this.getPropByMod({
        key: key,
        i: i,
        from: this.o.childOptions
      });
      if (this.optionsIntersection[key]) {
        if (option[key] == null) {
          option[key] = this.getPropByMod({
            key: key,
            i: i,
            from: this.childDefaults
          });
        }
        continue;
      }
      if (option[key] == null) {
        option[key] = this.getPropByMod({
          key: key,
          i: i,
          from: this.o
        });
      }
      if (option[key] == null) {
        option[key] = this.getPropByMod({
          key: key,
          i: i,
          from: this.childDefaults
        });
      }
    }
    return option;
  };

  Burst.prototype.getPropByMod = function(o) {
    var prop, ref;
    prop = (ref = o.from || this.o.childOptions) != null ? ref[o.key] : void 0;
    if (this.h.isArray(prop)) {
      return prop[o.i % prop.length];
    } else {
      return prop;
    }
  };

  Burst.prototype.generateRandomAngle = function(i) {
    var randdomness, randomness;
    randomness = parseFloat(this.props.randomAngle);
    randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
    return this.h.rand(0, randomness ? randomness * 360 : 180);
  };

  Burst.prototype.generateRandomRadius = function(i) {
    var randdomness, randomness, start;
    randomness = parseFloat(this.props.randomRadius);
    randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
    start = randomness ? (1 - randomness) * 100 : (1 - .5) * 100;
    return this.h.rand(start, 100) / 100;
  };

  Burst.prototype.then = function(o) {
    this.h.error("Burst's \"then\" method is under consideration, you can vote for it in github repo issues");
    return this;
  };

  return Burst;

})(Transit);

module.exports = Burst;

},{"./h":4,"./shapes/bitsMap":11,"./swirl":20,"./transit":21,"./tween/tween":23}],3:[function(require,module,exports){
var Easing, PathEasing, bezier, easing;

bezier = require('./bezier-easing');

PathEasing = require('./path-easing');

Easing = (function() {
  function Easing() {}

  Easing.prototype.bezier = bezier;

  Easing.prototype.PathEasing = PathEasing;

  Easing.prototype.path = (new PathEasing('creator')).create;

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
    "in": bezier.apply(Easing, [0.55, 0.085, 0.68, 0.53]),
    out: bezier.apply(Easing, [0.25, 0.46, 0.45, 0.94]),
    inout: bezier.apply(Easing, [0.455, 0.03, 0.515, 0.955])
  };

  Easing.prototype.cubic = {
    "in": bezier.apply(Easing, [0.55, 0.055, 0.675, 0.19]),
    out: bezier.apply(Easing, [0.215, 0.61, 0.355, 1]),
    inout: bezier.apply(Easing, [0.645, 0.045, 0.355, 1])
  };

  Easing.prototype.quart = {
    "in": bezier.apply(Easing, [0.895, 0.03, 0.685, 0.22]),
    out: bezier.apply(Easing, [0.165, 0.84, 0.44, 1]),
    inout: bezier.apply(Easing, [0.77, 0, 0.175, 1])
  };

  Easing.prototype.quint = {
    "in": bezier.apply(Easing, [0.895, 0.03, 0.685, 0.22]),
    out: bezier.apply(Easing, [0.165, 0.84, 0.44, 1]),
    inout: bezier.apply(Easing, [0.77, 0, 0.175, 1])
  };

  Easing.prototype.sin = {
    "in": bezier.apply(Easing, [0.47, 0, 0.745, 0.715]),
    out: bezier.apply(Easing, [0.39, 0.575, 0.565, 1]),
    inout: bezier.apply(Easing, [0.445, 0.05, 0.55, 0.95])
  };

  Easing.prototype.expo = {
    "in": bezier.apply(Easing, [0.95, 0.05, 0.795, 0.035]),
    out: bezier.apply(Easing, [0.19, 1, 0.22, 1]),
    inout: bezier.apply(Easing, [1, 0, 0, 1])
  };

  Easing.prototype.circ = {
    "in": bezier.apply(Easing, [0.6, 0.04, 0.98, 0.335]),
    out: bezier.apply(Easing, [0.075, 0.82, 0.165, 1]),
    inout: bezier.apply(Easing, [0.785, 0.135, 0.15, 0.86])
  };

  Easing.prototype.back = {
    "in": bezier.apply(Easing, [0.6, 0, 0.735, 0.045]),
    out: bezier.apply(Easing, [0.175, 0.885, 0.32, 1]),
    inout: bezier.apply(Easing, [0.68, 0, 0.265, 1])
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

  return Easing;

})();

easing = new Easing;

module.exports = easing;

},{"./bezier-easing":1,"./path-easing":7}],4:[function(require,module,exports){
var Helpers, h;

Helpers = (function() {
  Helpers.prototype.NS = 'http://www.w3.org/2000/svg';

  Helpers.prototype.logBadgeCss = 'background:#3A0839;color:#FF512F;border-radius:5px; padding: 1px 5px 2px; border: 1px solid #FF512F;';

  Helpers.prototype.shortColors = {
    transparent: 'rgba(0,0,0,0)',
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

  Helpers.prototype.chainOptionMap = {
    duration: 1,
    delay: 1,
    repeat: 1,
    easing: 1,
    yoyo: 1,
    onStart: 1,
    onComplete: 1,
    onCompleteChain: 1,
    onUpdate: 1,
    points: 1
  };

  Helpers.prototype.callbacksMap = {
    onStart: 1,
    onComplete: 1,
    onCompleteChain: 1,
    onUpdate: 1
  };

  Helpers.prototype.tweenOptionMap = {
    duration: 1,
    delay: 1,
    repeat: 1,
    easing: 1,
    yoyo: 1
  };

  Helpers.prototype.posPropsMap = {
    x: 1,
    y: 1,
    shiftX: 1,
    shiftY: 1,
    burstX: 1,
    burstY: 1,
    burstShiftX: 1,
    burstShiftY: 1
  };

  Helpers.prototype.strokeDashPropsMap = {
    strokeDasharray: 1,
    strokeDashoffset: 1
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
    return Math.min(Math.max(value, min), max);
  };

  Helpers.prototype.setPrefixedStyle = function(el, name, value) {
    var prefixedName;
    prefixedName = "" + this.prefix.css + name;
    el.style[name] = value;
    return el.style[prefixedName] = value;
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
    var delta, i, j, len, num;
    delta = [];
    for (i = j = 0, len = arr1.length; j < len; i = ++j) {
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
    var alpha, b, colorObj, g, isRgb, r, regexString1, regexString2, result, rgbColor, style;
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
        rgbColor = !this.shortColors[color] ? (this.div.style.color = color, this.isFF || this.isIE || this.isOldOpera ? (style = this.computedStyle(this.div), this.computedStyle(this.div).color) : this.div.style.color) : this.shortColors[color];
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

  Helpers.prototype.parseIfRand = function(str) {
    if (typeof str === 'string' && str.match(/rand\(/)) {
      return this.parseRand(str);
    } else {
      return str;
    }
  };

  Helpers.prototype.parseDelta = function(key, value) {
    var delta, end, endArr, endColorObj, i, j, len, start, startArr, startColorObj;
    start = Object.keys(value)[0];
    end = value[start];
    delta = {
      start: start
    };
    if (isNaN(parseFloat(start)) && !start.match(/rand\(/)) {
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
      for (i = j = 0, len = startArr.length; j < len; i = ++j) {
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
      if (!this.chainOptionMap[key]) {
        if (this.posPropsMap[key]) {
          end = this.parseUnit(this.parseIfRand(end));
          start = this.parseUnit(this.parseIfRand(start));
          this.mergeUnits(start, end, key);
          delta = {
            start: start,
            end: end,
            delta: end.value - start.value,
            type: 'unit'
          };
        } else {
          end = parseFloat(this.parseIfRand(end));
          start = parseFloat(this.parseIfRand(start));
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

  return Helpers;

})();

h = new Helpers;

module.exports = h;

},{}],5:[function(require,module,exports){
var mojs;

mojs = {
  revision: '0.117.0',
  isDebug: true,
  helpers: require('./h'),
  Bit: require('./shapes/bit'),
  bitsMap: require('./shapes/bitsMap'),
  Circle: require('./shapes/circle'),
  Cross: require('./shapes/cross'),
  Line: require('./shapes/line'),
  Rect: require('./shapes/rect'),
  Polygon: require('./shapes/polygon'),
  Equal: require('./shapes/equal'),
  Zigzag: require('./shapes/zigzag'),
  Burst: require('./burst'),
  Transit: require('./transit'),
  Swirl: require('./swirl'),
  Stagger: require('./stagger'),
  MotionPath: require('./motion-path'),
  Timeline: require('./tween/timeline'),
  Tween: require('./tween/tween'),
  tweener: require('./tween/tweener'),
  easing: require('./easing')
};

mojs.h = mojs.helpers;

mojs.delta = mojs.h.delta;

if ((typeof define === "function") && define.amd) {
  define("mojs", [], function() {
    return mojs;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = mojs;
}

return typeof window !== "undefined" && window !== null ? window.mojs = mojs : void 0;

},{"./burst":2,"./easing":3,"./h":4,"./motion-path":6,"./shapes/bit":10,"./shapes/bitsMap":11,"./shapes/circle":12,"./shapes/cross":13,"./shapes/equal":14,"./shapes/line":15,"./shapes/polygon":16,"./shapes/rect":17,"./shapes/zigzag":18,"./stagger":19,"./swirl":20,"./transit":21,"./tween/timeline":22,"./tween/tween":23,"./tween/tweener":24}],6:[function(require,module,exports){
var MotionPath, Timeline, Tween, easing, h, resize,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

h = require('./h');

easing = require('./easing');

resize = require('./vendor/resize');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

MotionPath = (function() {
  MotionPath.prototype.defaults = {
    path: null,
    curvature: {
      x: '75%',
      y: '50%'
    },
    delay: 0,
    duration: 1000,
    easing: null,
    repeat: 0,
    yoyo: false,
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
    isPresetPosition: true,
    onStart: null,
    onComplete: null,
    onUpdate: null,
    onPosit: null
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
    if (el.setProp != null) {
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
    this.timeline = new Timeline({
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
      onFirstUpdateBackward: (function(_this) {
        return function() {
          return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
        };
      })(this)
    });
    this.tween = new Tween;
    this.tween.add(this.timeline);
    !this.props.isRunLess && this.startTween();
    return this.props.isPresetPosition && this.setProgress(0, true);
  };

  MotionPath.prototype.startTween = function() {
    return setTimeout(((function(_this) {
      return function() {
        var ref;
        return (ref = _this.tween) != null ? ref.start() : void 0;
      };
    })(this)), 1);
  };

  MotionPath.prototype.setProgress = function(p, isInit) {
    var atan, isTransformFunOrigin, len, point, prevPoint, props, tOrigin, x, x1, x2, y;
    props = this.props;
    len = this.startLen + (!props.isReverse ? p * this.slicedLen : (1 - p) * this.slicedLen);
    point = this.path.getPointAtLength(len);
    isTransformFunOrigin = typeof props.transformOrigin === 'function';
    if (props.isAngle || (props.angleOffset != null) || isTransformFunOrigin) {
      prevPoint = this.path.getPointAtLength(len - 1);
      x1 = point.y - prevPoint.y;
      x2 = point.x - prevPoint.x;
      atan = Math.atan(x1 / x2);
      !isFinite(atan) && (atan = 0);
      this.angle = atan * h.RAD_TO_DEG;
      if ((typeof props.angleOffset) !== 'function') {
        this.angle += props.angleOffset || 0;
      } else {
        this.angle = props.angleOffset.call(this, this.angle, p);
      }
    } else {
      this.angle = 0;
    }
    x = point.x + this.props.offsetX;
    y = point.y + this.props.offsetY;
    this.props.motionBlur && this.makeMotionBlur(x, y);
    if (this.scaler) {
      x *= this.scaler.x;
      y *= this.scaler.y;
    }
    if (this.isModule) {
      this.setModulePosition(x, y);
    } else {
      this.setElPosition(x, y, p);
    }
    if (this.props.transformOrigin) {
      tOrigin = !isTransformFunOrigin ? this.props.transformOrigin : this.props.transformOrigin(this.angle, p);
      this.el.style[h.prefix.css + "transform-origin"] = tOrigin;
      this.el.style['transform-origin'] = tOrigin;
    }
    return !isInit && (typeof this.onUpdate === "function" ? this.onUpdate(p) : void 0);
  };

  MotionPath.prototype.setElPosition = function(x, y, p) {
    var rotate, transform;
    transform = this.props.onPosit == null ? (rotate = this.angle !== 0 ? "rotate(" + this.angle + "deg)" : '', "translate(" + x + "px," + y + "px) " + rotate) : this.props.onPosit(p, x, y, this.angle);
    this.el.style[h.prefix.css + "transform"] = transform;
    return this.el.style['transform'] = transform;
  };

  MotionPath.prototype.setModulePosition = function(x, y) {
    this.el.setProp({
      shiftX: x + "px",
      shiftY: y + "px",
      angle: this.angle
    });
    return this.el.draw();
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
    this.tween.append(new Timeline(opts));
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

},{"./easing":3,"./h":4,"./tween/timeline":22,"./tween/tween":23,"./vendor/resize":25}],7:[function(require,module,exports){
var PathEasing, h;

h = require('./h');

PathEasing = (function() {
  function PathEasing(path, o) {
    var ref;
    if (o == null) {
      o = {};
    }
    if (path === 'creator') {
      return;
    }
    this.path = h.parsePath(path);
    this.pathLength = (ref = this.path) != null ? ref.getTotalLength() : void 0;
    this.precision = o.precision || 24;
    this.rect = o.rect || 100;
    this.sample = h.bind(this.sample, this);
    this;
  }

  PathEasing.prototype.sample = function(p, start, end, precision) {
    var center, newEnd, newStart, point, rect;
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = 1;
    }
    if (precision == null) {
      precision = this.precision;
    }
    p = h.clamp(p, 0, 1);
    center = start + ((end - start) / 2);
    point = this.path.getPointAtLength(this.pathLength * center);
    rect = this.rect;
    if (rect * p > point.x) {
      newStart = center;
      newEnd = end;
    } else if (rect * p < point.x) {
      newStart = start;
      newEnd = center;
    } else {
      return 1 - point.y / rect;
    }
    if (--precision < 1) {
      return 1 - point.y / rect;
    } else {
      return this.sample(p, newStart, newEnd, precision);
    }
  };

  PathEasing.prototype.create = function(path, o) {
    return (new PathEasing(path, o)).sample;
  };

  return PathEasing;

})();

module.exports = PathEasing;

},{"./h":4}],8:[function(require,module,exports){

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

},{}],9:[function(require,module,exports){

(function() {
  var k, lastTime, vendors, x;
  lastTime = 0;
  x = 0;
  vendors = ["ms", "moz", "webkit", "o"];
  while (x < vendors.length && !window.requestAnimationFrame) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    k = window[vendors[x] + "CancelRequestAnimationFrame"];
    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || k;
    ++x;
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime, id, timeToCall;
      currTime = new Date().getTime();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();

},{}],10:[function(require,module,exports){
var Bit, h;

h = require('../h');

Bit = (function() {
  Bit.prototype.ns = 'http://www.w3.org/2000/svg';

  Bit.prototype.type = 'line';

  Bit.prototype.ratio = 1;

  Bit.prototype.defaults = {
    radius: 50,
    radiusX: void 0,
    radiusY: void 0,
    points: 3,
    x: 0,
    y: 0,
    angle: 0,
    'stroke': 'hotpink',
    'stroke-width': 2,
    'stroke-opacity': 1,
    'fill': 'transparent',
    'fill-opacity': 1,
    'stroke-dasharray': '',
    'stroke-dashoffset': '',
    'stroke-linecap': ''
  };

  function Bit(o) {
    this.o = o != null ? o : {};
    this.init();
    this;
  }

  Bit.prototype.init = function() {
    this.vars();
    this.render();
    return this;
  };

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
      this.el = document.createElementNS(this.ns, this.type || 'line');
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
      return this.props[name] = stroke;
    }
    if (typeof this.props[name] === 'object') {
      return this.props[name] = this.props[name].unit === '%' ? this.castPercent(this.props[name].value) : this.props[name].value;
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

},{"../h":4}],11:[function(require,module,exports){
var Bit, BitsMap, Circle, Cross, Equal, Line, Polygon, Rect, Zigzag, h;

Bit = require('./bit');

Circle = require('./circle');

Line = require('./line');

Zigzag = require('./zigzag');

Rect = require('./rect');

Polygon = require('./polygon');

Cross = require('./cross');

Equal = require('./equal');

h = require('../h');

BitsMap = (function() {
  function BitsMap() {}

  BitsMap.prototype.h = h;

  BitsMap.prototype.map = {
    bit: Bit,
    circle: Circle,
    line: Line,
    zigzag: Zigzag,
    rect: Rect,
    polygon: Polygon,
    cross: Cross,
    equal: Equal
  };

  BitsMap.prototype.getBit = function(name) {
    return this.map[name] || this.h.error("no \"" + name + "\" shape available yet, please choose from this list:", this.map);
  };

  return BitsMap;

})();

module.exports = new BitsMap;

},{"../h":4,"./bit":10,"./circle":12,"./cross":13,"./equal":14,"./line":15,"./polygon":16,"./rect":17,"./zigzag":18}],12:[function(require,module,exports){

var Bit, Circle,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Bit = require('./bit');

Circle = (function(superClass) {
  extend(Circle, superClass);

  function Circle() {
    return Circle.__super__.constructor.apply(this, arguments);
  }

  Circle.prototype.type = 'ellipse';

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

},{"./bit":10}],13:[function(require,module,exports){

var Bit, Cross,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Bit = require('./bit');

Cross = (function(superClass) {
  extend(Cross, superClass);

  function Cross() {
    return Cross.__super__.constructor.apply(this, arguments);
  }

  Cross.prototype.type = 'path';

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

},{"./bit":10}],14:[function(require,module,exports){

var Bit, Equal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Bit = require('./bit');

Equal = (function(superClass) {
  extend(Equal, superClass);

  function Equal() {
    return Equal.__super__.constructor.apply(this, arguments);
  }

  Equal.prototype.type = 'path';

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

},{"./bit":10}],15:[function(require,module,exports){

var Bit, Line,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Bit = require('./bit');

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

},{"./bit":10}],16:[function(require,module,exports){

var Bit, Polygon, h,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Bit = require('./bit');

h = require('../h');

Polygon = (function(superClass) {
  extend(Polygon, superClass);

  function Polygon() {
    return Polygon.__super__.constructor.apply(this, arguments);
  }

  Polygon.prototype.type = 'path';

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

},{"../h":4,"./bit":10}],17:[function(require,module,exports){

var Bit, Rect,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Bit = require('./bit');

Rect = (function(superClass) {
  extend(Rect, superClass);

  function Rect() {
    return Rect.__super__.constructor.apply(this, arguments);
  }

  Rect.prototype.type = 'rect';

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
      y: this.props.y - radiusY
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

},{"./bit":10}],18:[function(require,module,exports){

var Bit, Zigzag,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Bit = require('./bit');

Zigzag = (function(superClass) {
  extend(Zigzag, superClass);

  function Zigzag() {
    return Zigzag.__super__.constructor.apply(this, arguments);
  }

  Zigzag.prototype.type = 'path';

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

},{"./bit":10}],19:[function(require,module,exports){

var Stagger, Timeline, Transit, Tween, h,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

h = require('./h');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

Transit = require('./transit');

Stagger = (function(superClass) {
  extend(Stagger, superClass);

  function Stagger() {
    return Stagger.__super__.constructor.apply(this, arguments);
  }

  Stagger.prototype.isSkipDelta = true;

  Stagger.prototype.ownDefaults = {
    delay: 'stagger(100)',
    els: null,
    fill: 'transparent',
    stroke: ['yellow', 'cyan', 'deeppink'],
    strokeDasharray: '100%',
    strokeDashoffset: {
      '100%': '0%'
    },
    isShowInit: false,
    isShowEnd: false,
    radius: 0,
    type: 'line'
  };

  Stagger.prototype.vars = function() {
    h.extend(this.ownDefaults, this.defaults);
    this.defaults = this.ownDefaults;
    Stagger.__super__.vars.apply(this, arguments);
    return this.parseEls();
  };

  Stagger.prototype.extendDefaults = function(o) {
    var fromObj, key, ref, results, value;
    this.props = {};
    this.deltas = {};
    fromObj = o || this.o;
    ref = this.defaults;
    results = [];
    for (key in ref) {
      value = ref[key];
      results.push(this.props[key] = fromObj[key] != null ? fromObj[key] : this.defaults[key]);
    }
    return results;
  };

  Stagger.prototype.parseEls = function() {
    var els;
    if (this.props.els + '' === '[object NodeList]') {
      return this.props.els = Array.prototype.slice.call(this.props.els, 0);
    } else if (typeof this.props.els === 'string') {
      els = document.querySelector(this.props.els);
      return this.props.els = h.getChildElements(els);
    } else if (h.isDOM(this.props.els)) {
      return this.props.els = h.getChildElements(this.props.els);
    }
  };

  Stagger.prototype.createBit = function() {
    var i, j, len, option, ref, results;
    this.transits = [];
    len = this.props.els.length;
    results = [];
    for (i = j = 0, ref = len; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      option = this.getOption(i);
      option.index = i;
      option.isRunLess = true;
      results.push(this.transits.push(new Transit(option)));
    }
    return results;
  };

  Stagger.prototype.getOption = function(i) {
    var key, option, ref, value;
    option = {};
    ref = this.props;
    for (key in ref) {
      value = ref[key];
      option[key] = this.getPropByMod(key, i);
    }
    option.bit = this.getPropByMod('els', i);
    return option;
  };

  Stagger.prototype.getPropByMod = function(name, i) {
    var prop;
    prop = this.props[name];
    if (h.isArray(prop)) {
      return prop[i % prop.length];
    } else {
      return prop;
    }
  };

  Stagger.prototype.render = function() {
    this.createBit();
    this.setProgress(0, true);
    this.createTween();
    return this;
  };

  Stagger.prototype.isDelta = function() {
    return false;
  };

  Stagger.prototype.createTween = function() {
    var i;
    this.tween = new Tween;
    i = -1;
    while (i++ < this.transits.length - 1) {
      this.tween.add(this.transits[i].tween);
    }
    return !this.o.isRunLess && this.startTween();
  };

  Stagger.prototype.draw = function() {
    return this.drawEl();
  };

  return Stagger;

})(Transit);

module.exports = Stagger;

},{"./h":4,"./transit":21,"./tween/timeline":22,"./tween/tween":23}],20:[function(require,module,exports){

var Swirl, Transit,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Transit = require('./transit');

Swirl = (function(superClass) {
  extend(Swirl, superClass);

  function Swirl() {
    return Swirl.__super__.constructor.apply(this, arguments);
  }

  Swirl.prototype.skipPropsDelta = {
    x: 1,
    y: 1
  };

  Swirl.prototype.vars = function() {
    Swirl.__super__.vars.apply(this, arguments);
    return !this.o.isSwirlLess && this.generateSwirl();
  };

  Swirl.prototype.extendDefaults = function() {
    var angle, base, x, y;
    Swirl.__super__.extendDefaults.apply(this, arguments);
    x = this.getPosValue('x');
    y = this.getPosValue('y');
    angle = 90 + Math.atan((y.delta / x.delta) || 0) * (180 / Math.PI);
    if (x.delta < 0) {
      angle += 180;
    }
    this.positionDelta = {
      radius: Math.sqrt(x.delta * x.delta + y.delta * y.delta),
      angle: angle,
      x: x,
      y: y
    };
    if ((base = this.o).radiusScale == null) {
      base.radiusScale = 1;
    }
    this.props.angleShift = this.h.parseIfRand(this.o.angleShift || 0);
    return this.props.radiusScale = this.h.parseIfRand(this.o.radiusScale);
  };

  Swirl.prototype.getPosValue = function(name) {
    var optVal, val;
    optVal = this.o[name];
    if (optVal && typeof optVal === 'object') {
      val = this.h.parseDelta(name, optVal);
      return {
        start: val.start.value,
        end: val.end.value,
        delta: val.delta,
        units: val.end.unit
      };
    } else {
      val = parseFloat(optVal || this.defaults[name]);
      return {
        start: val,
        end: val,
        delta: 0,
        units: 'px'
      };
    }
  };

  Swirl.prototype.setProgress = function(progress) {
    var angle, point, x, y;
    angle = this.positionDelta.angle;
    if (this.o.isSwirl) {
      angle += this.getSwirl(progress);
    }
    point = this.h.getRadialPoint({
      angle: angle,
      radius: this.positionDelta.radius * progress * this.props.radiusScale,
      center: {
        x: this.positionDelta.x.start,
        y: this.positionDelta.y.start
      }
    });
    x = point.x.toFixed(4);
    y = point.y.toFixed(4);
    this.props.x = this.o.ctx ? x : x + this.positionDelta.x.units;
    this.props.y = this.o.ctx ? y : y + this.positionDelta.y.units;
    return Swirl.__super__.setProgress.apply(this, arguments);
  };

  Swirl.prototype.generateSwirl = function() {
    var base, base1;
    this.props.signRand = Math.round(this.h.rand(0, 1)) ? -1 : 1;
    if ((base = this.o).swirlSize == null) {
      base.swirlSize = 10;
    }
    if ((base1 = this.o).swirlFrequency == null) {
      base1.swirlFrequency = 3;
    }
    this.props.swirlSize = this.h.parseIfRand(this.o.swirlSize);
    return this.props.swirlFrequency = this.h.parseIfRand(this.o.swirlFrequency);
  };

  Swirl.prototype.getSwirl = function(progress) {
    return this.props.signRand * this.props.swirlSize * Math.sin(this.props.swirlFrequency * progress);
  };

  return Swirl;

})(Transit);

module.exports = Swirl;

},{"./transit":21}],21:[function(require,module,exports){

var Timeline, Transit, Tween, bitsMap, h,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

h = require('./h');

bitsMap = require('./shapes/bitsMap');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

Transit = (function(superClass) {
  extend(Transit, superClass);

  function Transit() {
    return Transit.__super__.constructor.apply(this, arguments);
  }

  Transit.prototype.progress = 0;

  Transit.prototype.defaults = {
    strokeWidth: 2,
    strokeOpacity: 1,
    strokeDasharray: 0,
    strokeDashoffset: 0,
    stroke: 'transparent',
    fill: 'deeppink',
    fillOpacity: 'transparent',
    strokeLinecap: '',
    points: 3,
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
    opacity: 1,
    radius: {
      0: 50
    },
    radiusX: void 0,
    radiusY: void 0,
    angle: 0,
    size: null,
    sizeGap: 0,
    onStart: null,
    onComplete: null,
    onUpdate: null,
    duration: 500,
    delay: 0,
    repeat: 0,
    yoyo: false,
    easing: 'Linear.None'
  };

  Transit.prototype.vars = function() {
    var o;
    if (this.h == null) {
      this.h = h;
    }
    if (this.lastSet == null) {
      this.lastSet = {};
    }
    this.index = this.o.index || 0;
    this.extendDefaults();
    o = this.h.cloneObj(this.o);
    this.h.extend(o, this.defaults);
    this.history = [o];
    this.isForeign = !!this.o.ctx;
    this.isForeignBit = !!this.o.bit;
    return this.timelines = [];
  };

  Transit.prototype.render = function() {
    if (!this.isRendered) {
      if (!this.isForeign && !this.isForeignBit) {
        this.ctx = document.createElementNS(this.ns, 'svg');
        this.ctx.style.position = 'absolute';
        this.ctx.style.width = '100%';
        this.ctx.style.height = '100%';
        this.createBit();
        this.calcSize();
        this.el = document.createElement('div');
        this.el.appendChild(this.ctx);
        (this.o.parent || document.body).appendChild(this.el);
      } else {
        this.ctx = this.o.ctx;
        this.createBit();
        this.calcSize();
      }
      this.isRendered = true;
    }
    this.setElStyles();
    this.setProgress(0, true);
    this.createTween();
    return this;
  };

  Transit.prototype.setElStyles = function() {
    var marginSize, ref, size;
    if (!this.isForeign) {
      size = this.props.size + "px";
      marginSize = (-this.props.size / 2) + "px";
      this.el.style.position = 'absolute';
      this.el.style.top = this.props.y;
      this.el.style.left = this.props.x;
      this.el.style.width = size;
      this.el.style.height = size;
      this.el.style['margin-left'] = marginSize;
      this.el.style['margin-top'] = marginSize;
      this.el.style['marginLeft'] = marginSize;
      this.el.style['marginTop'] = marginSize;
    }
    if ((ref = this.el) != null) {
      ref.style.opacity = this.props.opacity;
    }
    if (this.o.isShowInit) {
      return this.show();
    } else {
      return this.hide();
    }
  };

  Transit.prototype.show = function() {
    if (this.isShown || (this.el == null)) {
      return;
    }
    this.el.style.display = 'block';
    return this.isShown = true;
  };

  Transit.prototype.hide = function() {
    if ((this.isShown === false) || (this.el == null)) {
      return;
    }
    this.el.style.display = 'none';
    return this.isShown = false;
  };

  Transit.prototype.draw = function() {
    this.bit.setProp({
      x: this.origin.x,
      y: this.origin.y,
      stroke: this.props.stroke,
      'stroke-width': this.props.strokeWidth,
      'stroke-opacity': this.props.strokeOpacity,
      'stroke-dasharray': this.props.strokeDasharray,
      'stroke-dashoffset': this.props.strokeDashoffset,
      'stroke-linecap': this.props.strokeLinecap,
      fill: this.props.fill,
      'fill-opacity': this.props.fillOpacity,
      radius: this.props.radius,
      radiusX: this.props.radiusX,
      radiusY: this.props.radiusY,
      points: this.props.points,
      transform: this.calcTransform()
    });
    this.bit.draw();
    return this.drawEl();
  };

  Transit.prototype.drawEl = function() {
    if (this.el == null) {
      return;
    }
    this.isPropChanged('opacity') && (this.el.style.opacity = this.props.opacity);
    if (!this.isForeign) {
      this.isPropChanged('x') && (this.el.style.left = this.props.x);
      this.isPropChanged('y') && (this.el.style.top = this.props.y);
      if (this.isNeedsTransform()) {
        return this.h.setPrefixedStyle(this.el, 'transform', this.fillTransform());
      }
    }
  };

  Transit.prototype.fillTransform = function() {
    return "translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
  };

  Transit.prototype.isNeedsTransform = function() {
    var isX, isY;
    isX = this.isPropChanged('shiftX');
    isY = this.isPropChanged('shiftY');
    return isX || isY;
  };

  Transit.prototype.isPropChanged = function(name) {
    var base;
    if ((base = this.lastSet)[name] == null) {
      base[name] = {};
    }
    if (this.lastSet[name].value !== this.props[name]) {
      this.lastSet[name].value = this.props[name];
      return true;
    } else {
      return false;
    }
  };

  Transit.prototype.calcTransform = function() {
    return this.props.transform = "rotate(" + this.props.angle + "," + this.origin.x + "," + this.origin.y + ")";
  };

  Transit.prototype.calcSize = function() {
    var base, dStroke, radius, stroke;
    if (this.o.size) {
      return;
    }
    radius = this.calcMaxRadius();
    dStroke = this.deltas['strokeWidth'];
    stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this.props.strokeWidth;
    this.props.size = 2 * radius + 2 * stroke;
    switch (typeof (base = this.props.easing).toLowerCase === "function" ? base.toLowerCase() : void 0) {
      case 'elastic.out':
      case 'elastic.inout':
        this.props.size *= 1.25;
        break;
      case 'back.out':
      case 'back.inout':
        this.props.size *= 1.1;
    }
    this.props.size *= this.bit.ratio;
    this.props.size += 2 * this.props.sizeGap;
    return this.props.center = this.props.size / 2;
  };

  Transit.prototype.calcMaxRadius = function() {
    var selfSize, selfSizeX, selfSizeY;
    selfSize = this.getRadiusSize({
      key: 'radius'
    });
    selfSizeX = this.getRadiusSize({
      key: 'radiusX',
      fallback: selfSize
    });
    selfSizeY = this.getRadiusSize({
      key: 'radiusY',
      fallback: selfSize
    });
    return Math.max(selfSizeX, selfSizeY);
  };

  Transit.prototype.getRadiusSize = function(o) {
    if (this.deltas[o.key] != null) {
      return Math.max(Math.abs(this.deltas[o.key].end), Math.abs(this.deltas[o.key].start));
    } else if (this.props[o.key] != null) {
      return parseFloat(this.props[o.key]);
    } else {
      return o.fallback || 0;
    }
  };

  Transit.prototype.createBit = function() {
    var bitClass;
    bitClass = bitsMap.getBit(this.o.type || this.type);
    this.bit = new bitClass({
      ctx: this.ctx,
      el: this.o.bit,
      isDrawLess: true
    });
    if (this.isForeign || this.isForeignBit) {
      return this.el = this.bit.el;
    }
  };

  Transit.prototype.setProgress = function(progress, isShow) {
    if (!isShow) {
      this.show();
      if (typeof this.onUpdate === "function") {
        this.onUpdate(progress);
      }
    }
    this.progress = progress < 0 || !progress ? 0 : progress > 1 ? 1 : progress;
    this.calcCurrentProps(progress);
    this.calcOrigin();
    this.draw(progress);
    return this;
  };

  Transit.prototype.calcCurrentProps = function(progress) {
    var a, b, dash, g, i, item, key, keys, len, r, results, stroke, units, value;
    keys = Object.keys(this.deltas);
    len = keys.length;
    results = [];
    while (len--) {
      key = keys[len];
      value = this.deltas[key];
      results.push(this.props[key] = (function() {
        var k, len1, ref;
        switch (value.type) {
          case 'array':
            stroke = [];
            ref = value.delta;
            for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
              item = ref[i];
              dash = value.start[i].value + item.value * this.progress;
              stroke.push({
                value: dash,
                unit: item.unit
              });
            }
            return stroke;
          case 'number':
            return value.start + value.delta * progress;
          case 'unit':
            units = value.end.unit;
            return "" + (value.start.value + value.delta * progress) + units;
          case 'color':
            r = parseInt(value.start.r + value.delta.r * progress, 10);
            g = parseInt(value.start.g + value.delta.g * progress, 10);
            b = parseInt(value.start.b + value.delta.b * progress, 10);
            a = parseInt(value.start.a + value.delta.a * progress, 10);
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }
      }).call(this));
    }
    return results;
  };

  Transit.prototype.calcOrigin = function() {
    return this.origin = this.o.ctx ? {
      x: parseFloat(this.props.x),
      y: parseFloat(this.props.y)
    } : {
      x: this.props.center,
      y: this.props.center
    };
  };

  Transit.prototype.extendDefaults = function(o) {
    var array, defaultsValue, fromObject, i, k, key, keys, len, len1, optionsValue, property, ref, unit, value;
    if (this.props == null) {
      this.props = {};
    }
    fromObject = o || this.defaults;
    (o == null) && (this.deltas = {});
    keys = Object.keys(fromObject);
    len = keys.length;
    while (len--) {
      key = keys[len];
      defaultsValue = fromObject[key];
      if ((ref = this.skipProps) != null ? ref[key] : void 0) {
        continue;
      }
      if (o) {
        this.o[key] = defaultsValue;
        optionsValue = defaultsValue;
        delete this.deltas[key];
      } else {
        optionsValue = this.o[key] != null ? this.o[key] : defaultsValue;
      }
      if (!this.isDelta(optionsValue)) {
        if (typeof optionsValue === 'string') {
          if (optionsValue.match(/stagger/)) {
            optionsValue = this.h.parseStagger(optionsValue, this.index);
          }
        }
        if (typeof optionsValue === 'string') {
          if (optionsValue.match(/rand/)) {
            optionsValue = this.h.parseRand(optionsValue);
          }
        }
        this.props[key] = optionsValue;
        if (key === 'radius') {
          if (this.o.radiusX == null) {
            this.props.radiusX = optionsValue;
          }
          if (this.o.radiusY == null) {
            this.props.radiusY = optionsValue;
          }
        }
        if (this.h.posPropsMap[key]) {
          this.props[key] = this.h.parseUnit(this.props[key]).string;
        }
        if (this.h.strokeDashPropsMap[key]) {
          property = this.props[key];
          value = [];
          switch (typeof property) {
            case 'number':
              value.push(this.h.parseUnit(property));
              break;
            case 'string':
              array = this.props[key].split(' ');
              for (i = k = 0, len1 = array.length; k < len1; i = ++k) {
                unit = array[i];
                value.push(this.h.parseUnit(unit));
              }
          }
          this.props[key] = value;
        }
        continue;
      }
      this.isSkipDelta || this.getDelta(key, optionsValue);
    }
    return this.onUpdate = this.props.onUpdate;
  };

  Transit.prototype.isDelta = function(optionsValue) {
    var isObject;
    isObject = (optionsValue != null) && (typeof optionsValue === 'object');
    isObject = isObject && !optionsValue.unit;
    return !(!isObject || this.h.isArray(optionsValue) || h.isDOM(optionsValue));
  };

  Transit.prototype.getDelta = function(key, optionsValue) {
    var delta, ref;
    if ((key === 'x' || key === 'y') && !this.o.ctx) {
      this.h.warn('Consider to animate shiftX/shiftY properties instead of x/y, as it would be much more performant', optionsValue);
    }
    if ((ref = this.skipPropsDelta) != null ? ref[key] : void 0) {
      return;
    }
    delta = this.h.parseDelta(key, optionsValue, this.defaults[key]);
    if (delta.type != null) {
      this.deltas[key] = delta;
    }
    return this.props[key] = delta.start;
  };

  Transit.prototype.mergeThenOptions = function(start, end) {
    var endValue, i, isFunction, key, keys, o, startKey, startKeys, value;
    o = {};
    for (key in start) {
      value = start[key];
      if (!this.h.tweenOptionMap[key] && !this.h.callbacksMap[key] || key === 'duration') {
        o[key] = value;
      } else {
        o[key] = key === 'easing' ? '' : void 0;
      }
    }
    keys = Object.keys(end);
    i = keys.length;
    while (i--) {
      key = keys[i];
      endValue = end[key];
      isFunction = typeof endValue === 'function';
      if (this.h.tweenOptionMap[key] || typeof endValue === 'object' || isFunction) {
        o[key] = endValue != null ? endValue : start[key];
        continue;
      }
      startKey = start[key];
      if (startKey == null) {
        startKey = this.defaults[key];
      }
      if ((key === 'radiusX' || key === 'radiusY') && (startKey == null)) {
        startKey = start.radius;
      }
      if (typeof startKey === 'object' && (startKey != null)) {
        startKeys = Object.keys(startKey);
        startKey = startKey[startKeys[0]];
      }
      if (endValue != null) {
        o[key] = {};
        o[key][startKey] = endValue;
      }
    }
    return o;
  };

  Transit.prototype.then = function(o) {
    var i, it, keys, len, merged, opts;
    if ((o == null) || !Object.keys(o)) {
      return;
    }
    merged = this.mergeThenOptions(this.history[this.history.length - 1], o);
    this.history.push(merged);
    keys = Object.keys(this.h.tweenOptionMap);
    i = keys.length;
    opts = {};
    while (i--) {
      opts[keys[i]] = merged[keys[i]];
    }
    it = this;
    len = it.history.length;
    (function(_this) {
      return (function(len) {
        opts.onUpdate = function(p) {
          return _this.setProgress(p);
        };
        opts.onStart = function() {
          var ref;
          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
        };
        opts.onComplete = function() {
          var ref;
          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
        };
        opts.onFirstUpdate = function() {
          return it.tuneOptions(it.history[this.index]);
        };
        opts.isChained = !o.delay;
        return _this.tween.append(new Timeline(opts));
      });
    })(this)(len);
    return this;
  };

  Transit.prototype.tuneOptions = function(o) {
    this.extendDefaults(o);
    this.calcSize();
    return this.setElStyles();
  };

  Transit.prototype.createTween = function() {
    var it;
    it = this;
    this.createTimeline();
    this.tween = new Tween({
      onComplete: (function(_this) {
        return function() {
          var ref;
          !_this.o.isShowEnd && _this.hide();
          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
        };
      })(this)
    });
    this.tween.add(this.timeline);
    return !this.o.isRunLess && this.startTween();
  };

  Transit.prototype.createTimeline = function() {
    return this.timeline = new Timeline({
      duration: this.props.duration,
      delay: this.props.delay,
      repeat: this.props.repeat,
      yoyo: this.props.yoyo,
      easing: this.props.easing,
      onUpdate: (function(_this) {
        return function(p) {
          return _this.setProgress(p);
        };
      })(this),
      onStart: (function(_this) {
        return function() {
          var ref;
          _this.show();
          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
        };
      })(this),
      onFirstUpdateBackward: (function(_this) {
        return function() {
          return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
        };
      })(this),
      onReverseComplete: (function(_this) {
        return function() {
          var ref;
          !_this.o.isShowInit && _this.hide();
          return (ref = _this.props.onReverseComplete) != null ? ref.apply(_this) : void 0;
        };
      })(this)
    });
  };

  Transit.prototype.run = function(o) {
    var key, keys, len;
    if (o && Object.keys(o).length) {
      if (this.history.length > 1) {
        keys = Object.keys(o);
        len = keys.length;
        while (len--) {
          key = keys[len];
          if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
            h.warn("the property \"" + key + "\" property can not be overridden on run with \"then\" chain yet");
            delete o[key];
          }
        }
      }
      this.transformHistory(o);
      this.tuneNewOption(o);
      o = this.h.cloneObj(this.o);
      this.h.extend(o, this.defaults);
      this.history[0] = o;
      !this.o.isDrawLess && this.setProgress(0, true);
    }
    return this.startTween();
  };

  Transit.prototype.transformHistory = function(o) {
    var historyLen, i, j, key, keys, len, optionRecord, results, value, value2, valueKeys, valueKeys2;
    keys = Object.keys(o);
    i = -1;
    len = keys.length;
    historyLen = this.history.length;
    results = [];
    while (++i < len) {
      key = keys[i];
      j = 0;
      results.push((function() {
        var results1;
        results1 = [];
        while (++j < historyLen) {
          optionRecord = this.history[j][key];
          if (typeof optionRecord === 'object') {
            valueKeys = Object.keys(optionRecord);
            value = optionRecord[valueKeys[0]];
            delete this.history[j][key][valueKeys[0]];
            if (typeof o[key] === 'object') {
              valueKeys2 = Object.keys(o[key]);
              value2 = o[key][valueKeys2[0]];
              this.history[j][key][value2] = value;
            } else {
              this.history[j][key][o[key]] = value;
            }
            break;
          } else {
            results1.push(this.history[j][key] = o[key]);
          }
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  Transit.prototype.tuneNewOption = function(o, isForeign) {
    if ((o != null) && (o.type != null) && o.type !== (this.o.type || this.type)) {
      this.h.warn('Sorry, type can not be changed on run');
      delete o.type;
    }
    if ((o != null) && Object.keys(o).length) {
      this.extendDefaults(o);
      this.resetTimeline();
      !isForeign && this.tween.recalcDuration();
      this.calcSize();
      return !isForeign && this.setElStyles();
    }
  };

  Transit.prototype.startTween = function() {
    return setTimeout(((function(_this) {
      return function() {
        var ref;
        return (ref = _this.tween) != null ? ref.start() : void 0;
      };
    })(this)), 1);
  };

  Transit.prototype.resetTimeline = function() {
    var i, k, key, len1, ref, timelineOptions;
    timelineOptions = {};
    ref = Object.keys(this.h.tweenOptionMap);
    for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
      key = ref[i];
      timelineOptions[key] = this.props[key];
    }
    timelineOptions.onStart = this.props.onStart;
    timelineOptions.onComplete = this.props.onComplete;
    return this.timeline.setProp(timelineOptions);
  };

  Transit.prototype.getBitLength = function() {
    this.props.bitLength = this.bit.getLength();
    return this.props.bitLength;
  };

  return Transit;

})(bitsMap.map.bit);

module.exports = Transit;

},{"./h":4,"./shapes/bitsMap":11,"./tween/timeline":22,"./tween/tween":23}],22:[function(require,module,exports){
var Timeline, easingModule, h;

easingModule = require('../easing');

h = require('../h');

Timeline = (function() {
  Timeline.prototype.defaults = {
    duration: 600,
    delay: 0,
    repeat: 0,
    yoyo: false,
    easing: 'Linear.None',
    durationElapsed: 0,
    delayElapsed: 0,
    onStart: null,
    onComplete: null,
    isChained: false
  };

  function Timeline(o) {
    this.o = o != null ? o : {};
    this.extendDefaults();
    this.vars();
    this;
  }

  Timeline.prototype.vars = function() {
    this.h = h;
    this.props = {};
    this.progress = 0;
    this.prevTime = 0;
    this.props.easing = this.parseEasing(this.o.easing);
    return this.calcDimentions();
  };

  Timeline.prototype.calcDimentions = function() {
    this.props.totalTime = (this.o.repeat + 1) * (this.o.duration + this.o.delay);
    return this.props.totalDuration = this.props.totalTime - this.o.delay;
  };

  Timeline.prototype.extendDefaults = function() {
    h.extend(this.o, this.defaults);
    return this.onUpdate = this.o.onUpdate;
  };

  Timeline.prototype.start = function(time) {
    this.isCompleted = false;
    this.isStarted = false;
    this.props.startTime = (time || performance.now()) + this.o.delay;
    this.props.endTime = this.props.startTime + this.props.totalDuration;
    return this;
  };

  Timeline.prototype.update = function(time) {
    var cnt, elapsed, isFlip, ref, ref1, ref2, ref3, ref4, ref5, start;
    if ((time >= this.props.startTime) && (time < this.props.endTime)) {
      this.isOnReverseComplete = false;
      this.isCompleted = false;
      if (!this.isFirstUpdate) {
        if ((ref = this.o.onFirstUpdate) != null) {
          ref.apply(this);
        }
        this.isFirstUpdate = true;
      }
      if (!this.isStarted) {
        if ((ref1 = this.o.onStart) != null) {
          ref1.apply(this);
        }
        this.isStarted = true;
      }
      elapsed = time - this.props.startTime;
      if (elapsed <= this.o.duration) {
        this.setProc(elapsed / this.o.duration);
      } else {
        start = this.props.startTime;
        isFlip = false;
        cnt = 0;
        while (start <= time) {
          isFlip = !isFlip;
          start += isFlip ? (cnt++, this.o.duration) : this.o.delay;
        }
        if (isFlip) {
          start = start - this.o.duration;
          elapsed = time - start;
          this.setProc(elapsed / this.o.duration);
          if (this.o.yoyo && this.o.repeat) {
            this.setProc(cnt % 2 === 1 ? this.progress : 1 - (this.progress === 0 ? 1 : this.progress));
          }
        } else {
          this.setProc(0);
        }
      }
      if (time < this.prevTime && !this.isFirstUpdateBackward) {
        if ((ref2 = this.o.onFirstUpdateBackward) != null) {
          ref2.apply(this);
        }
        this.isFirstUpdateBackward = true;
      }
      if (typeof this.onUpdate === "function") {
        this.onUpdate(this.easedProgress);
      }
    } else {
      if (time >= this.props.endTime && !this.isCompleted) {
        this.setProc(1);
        if (typeof this.onUpdate === "function") {
          this.onUpdate(this.easedProgress);
        }
        if ((ref3 = this.o.onComplete) != null) {
          ref3.apply(this);
        }
        this.isCompleted = true;
        this.isOnReverseComplete = false;
      }
      if (time > this.props.endTime || time < this.props.startTime) {
        this.isFirstUpdate = false;
      }
      if (time > this.props.endTime) {
        this.isFirstUpdateBackward = false;
      }
    }
    if (time < this.prevTime && time <= this.props.startTime) {
      if (!this.isFirstUpdateBackward) {
        if ((ref4 = this.o.onFirstUpdateBackward) != null) {
          ref4.apply(this);
        }
        this.isFirstUpdateBackward = true;
      }
      if (!this.isOnReverseComplete) {
        this.isOnReverseComplete = true;
        this.setProc(0);
        !this.o.isChained && (typeof this.onUpdate === "function" ? this.onUpdate(this.easedProgress) : void 0);
        if ((ref5 = this.o.onReverseComplete) != null) {
          ref5.apply(this);
        }
      }
    }
    return this.prevTime = time;
  };

  Timeline.prototype.setProc = function(p) {
    this.progress = p;
    return this.easedProgress = this.props.easing(this.progress);
  };

  Timeline.prototype.setProp = function(obj, value) {
    var key, val;
    if (typeof obj === 'object') {
      for (key in obj) {
        val = obj[key];
        this.o[key] = val;
      }
    } else if (typeof obj === 'string') {
      this.o[obj] = value;
    }
    return this.calcDimentions();
  };

  Timeline.prototype.parseEasing = function(easing) {
    var type;
    type = typeof easing;
    if (type === 'string') {
      if (easing.charAt(0).toLowerCase() === 'm') {
        return easingModule.path(easing);
      } else {
        easing = this.splitEasing(easing);
        return easingModule[easing[0]][easing[1]];
      }
    }
    if (h.isArray(easing)) {
      return easingModule.bezier.apply(easingModule, easing);
    }
    if ('function') {
      return easing;
    }
  };

  Timeline.prototype.splitEasing = function(string) {
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

  return Timeline;

})();

module.exports = Timeline;

},{"../easing":3,"../h":4}],23:[function(require,module,exports){
var Tween, h, t;

h = require('../h');

t = require('./tweener');

Tween = (function() {
  Tween.prototype.state = 'stop';

  function Tween(o) {
    this.o = o != null ? o : {};
    this.vars();
    this;
  }

  Tween.prototype.vars = function() {
    this.timelines = [];
    this.props = {
      totalTime: 0
    };
    this.loop = h.bind(this.loop, this);
    return this.onUpdate = this.o.onUpdate;
  };

  Tween.prototype.add = function() {
    var timeline;
    timeline = Array.prototype.slice.apply(arguments);
    return this.pushTimelineArray(timeline);
  };

  Tween.prototype.pushTimelineArray = function(array) {
    var i, j, len1, results, tm;
    results = [];
    for (i = j = 0, len1 = array.length; j < len1; i = ++j) {
      tm = array[i];
      if (h.isArray(tm)) {
        results.push(this.pushTimelineArray(tm));
      } else {
        results.push(this.pushTimeline(tm));
      }
    }
    return results;
  };

  Tween.prototype.pushTimeline = function(timeline) {
    this.timelines.push(timeline);
    return this.props.totalTime = Math.max(timeline.props.totalTime, this.props.totalTime);
  };

  Tween.prototype.remove = function(timeline) {
    var index;
    index = this.timelines.indexOf(timeline);
    if (index !== -1) {
      return this.timelines.splice(index, 1);
    }
  };

  Tween.prototype.append = function(timeline) {
    var i;
    if (!h.isArray(timeline)) {
      timeline.index = this.timelines.length;
      this.appendTimeline(timeline);
      return this.props.totalTime = Math.max(timeline.props.totalTime, this.props.totalTime);
    } else {
      i = timeline.length;
      while (i--) {
        this.appendTimeline(timeline[i]);
      }
      return this.recalcDuration();
    }
  };

  Tween.prototype.appendTimeline = function(timeline) {
    timeline.setProp({
      delay: timeline.o.delay + this.props.totalTime
    });
    return this.timelines.push(timeline);
  };

  Tween.prototype.recalcDuration = function() {
    var len, results, timeline;
    len = this.timelines.length;
    this.props.totalTime = 0;
    results = [];
    while (len--) {
      timeline = this.timelines[len];
      results.push(this.props.totalTime = Math.max(timeline.props.totalTime, this.props.totalTime));
    }
    return results;
  };

  Tween.prototype.update = function(time) {
    var i, len, ref, ref1;
    if (time > this.props.endTime) {
      time = this.props.endTime;
    }
    i = -1;
    len = this.timelines.length - 1;
    while (i++ < len) {
      this.timelines[i].update(time);
    }
    if (time >= this.props.startTime && time < this.props.endTime) {
      if (typeof this.onUpdate === "function") {
        this.onUpdate((time - this.props.startTime) / this.props.totalTime);
      }
    }
    if (this.prevTime > time && time <= this.props.startTime) {
      if ((ref = this.o.onReverseComplete) != null) {
        ref.apply(this);
      }
    }
    this.prevTime = time;
    if (time === this.props.endTime) {
      if (typeof this.onUpdate === "function") {
        this.onUpdate(1);
      }
      if ((ref1 = this.o.onComplete) != null) {
        ref1.apply(this);
      }
      return true;
    }
  };

  Tween.prototype.prepareStart = function() {
    var ref;
    this.getDimentions();
    return (ref = this.o.onStart) != null ? ref.apply(this) : void 0;
  };

  Tween.prototype.startTimelines = function(time) {
    var i, results;
    i = this.timelines.length;
    results = [];
    while (i--) {
      results.push(this.timelines[i].start(time || this.props.startTime));
    }
    return results;
  };

  Tween.prototype.start = function(time) {
    this.setStartTime(time);
    !time && t.add(this);
    this.state = 'play';
    return this;
  };

  Tween.prototype.pause = function() {
    this.removeFromTweener();
    this.state = 'pause';
    return this;
  };

  Tween.prototype.stop = function() {
    this.removeFromTweener();
    this.setProgress(0);
    this.state = 'stop';
    return this;
  };

  Tween.prototype.restart = function() {
    this.stop();
    return this.start();
  };

  Tween.prototype.removeFromTweener = function() {
    t.remove(this);
    return this;
  };

  Tween.prototype.getDimentions = function() {
    this.props.startTime = performance.now();
    return this.props.endTime = this.props.startTime + this.props.totalTime;
  };

  Tween.prototype.setStartTime = function(time) {
    this.prepareStart();
    return this.startTimelines(time);
  };

  Tween.prototype.setProgress = function(progress) {
    if (this.props.startTime == null) {
      this.setStartTime();
    }
    progress = Math.max(progress, 0);
    progress = Math.min(progress, 1);
    return this.update(this.props.startTime + progress * this.props.totalTime);
  };

  return Tween;

})();

module.exports = Tween;

},{"../h":4,"./tweener":24}],24:[function(require,module,exports){
var Tweener, h, i, t;

require('../polyfills/raf');

require('../polyfills/performance');

h = require('../h');

i = 0;

Tweener = (function() {
  function Tweener() {
    this.vars();
    this;
  }

  Tweener.prototype.vars = function() {
    this.tweens = [];
    return this.loop = h.bind(this.loop, this);
  };

  Tweener.prototype.loop = function() {
    var time;
    if (!this.isRunning) {
      return false;
    }
    time = performance.now();
    this.update(time);
    if (!this.tweens.length) {
      return this.isRunning = false;
    }
    requestAnimationFrame(this.loop);
    return this;
  };

  Tweener.prototype.startLoop = function() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    return requestAnimationFrame(this.loop);
  };

  Tweener.prototype.stopLoop = function() {
    return this.isRunning = false;
  };

  Tweener.prototype.update = function(time) {
    var results;
    i = this.tweens.length;
    results = [];
    while (i--) {
      if (this.tweens[i].update(time) === true) {
        results.push(this.remove(i));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Tweener.prototype.add = function(tween) {
    this.tweens.push(tween);
    return this.startLoop();
  };

  Tweener.prototype.removeAll = function() {
    return this.tweens.length = 0;
  };

  Tweener.prototype.remove = function(tween) {
    var index;
    index = typeof tween === 'number' ? tween : this.tweens.indexOf(tween);
    if (index !== -1) {
      return this.tweens.splice(index, 1);
    }
  };

  return Tweener;

})();

t = new Tweener;

module.exports = t;

},{"../h":4,"../polyfills/performance":8,"../polyfills/raf":9}],25:[function(require,module,exports){

/*!
  LegoMushroom @legomushroom http://legomushroom.com
  MIT License 2014
 */

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
  if ((typeof define === "function") && define.amd) {
    return define("any-resize-event", [], function() {
      return new Main;
    });
  } else if ((typeof module === "object") && (typeof module.exports === "object")) {
    return module.exports = new Main;
  } else {
    if (typeof window !== "undefined" && window !== null) {
      window.AnyResizeEvent = Main;
    }
    return typeof window !== "undefined" && window !== null ? window.anyResizeEvent = new Main : void 0;
  }
})();

},{}]},{},[5])(5)
});