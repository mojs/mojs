(function() {
  var BezierEasing, bezierEasing, h,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  h = require('../h');


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
      var A, B, C, NEWTON_ITERATIONS, NEWTON_MIN_SLOPE, SUBDIVISION_MAX_ITERATIONS, SUBDIVISION_PRECISION, arg, binarySubdivide, calcBezier, calcSampleValues, f, float32ArraySupported, getSlope, getTForX, i, kSampleStepSize, kSplineTableSize, mSampleValues, newtonRaphsonIterate, precompute, str, _i, _precomputed;
      if (arguments.length < 4) {
        return this.error('Bezier function expects 4 arguments');
      }
      for (i = _i = 0; _i < 4; i = ++_i) {
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
      float32ArraySupported = __indexOf.call(global, 'Float32Array') >= 0;
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

}).call(this);
