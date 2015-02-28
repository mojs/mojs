(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/* istanbul ignore next */
var Swirl, Transit,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Transit = require('./transit');

Swirl = (function(_super) {
  __extends(Swirl, _super);

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
    var angle, x, y, _base, _base1;
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
    if ((_base = this.o).angleShift == null) {
      _base.angleShift = 0;
    }
    if ((_base1 = this.o).radiusScale == null) {
      _base1.radiusScale = 1;
    }
    this.props.angleShift = this.h.parseIfRand(this.o.angleShift);
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
    angle = this.positionDelta.angle + this.props.angleShift;
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
    var _base, _base1;
    this.props.signRand = Math.round(this.h.rand(0, 1)) ? -1 : 1;
    if ((_base = this.o).swirlSize == null) {
      _base.swirlSize = 10;
    }
    if ((_base1 = this.o).swirlFrequency == null) {
      _base1.swirlFrequency = 3;
    }
    this.props.swirlSize = this.h.parseIfRand(this.o.swirlSize);
    return this.props.swirlFrequency = this.h.parseIfRand(this.o.swirlFrequency);
  };

  Swirl.prototype.getSwirl = function(progress) {
    return this.props.signRand * this.props.swirlSize * Math.sin(this.props.swirlFrequency * progress);
  };

  return Swirl;

})(Transit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Swirl", [], function() {
    return Swirl;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Swirl;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Swirl = Swirl;
}

},{"./transit":18}],2:[function(require,module,exports){

/* istanbul ignore next */
var Burst, Swirl, Transit, Tween, bitsMap, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

bitsMap = require('./shapes/bitsMap');

Tween = require('./tween/tween');

Transit = require('./transit');

Swirl = require('./swirl');

h = require('./h');

Burst = (function(_super) {
  __extends(Burst, _super);

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
    var i, key, keys, len, tr, transit, _base, _i, _len, _ref;
    if ((o != null) && Object.keys(o).length) {
      if (o.count || ((_ref = o.childOptions) != null ? _ref.count : void 0)) {
        this.h.warn('Sorry, count can not be changed on run');
      }
      this.extendDefaults(o);
      keys = Object.keys(o.childOptions || {});
      if ((_base = this.o).childOptions == null) {
        _base.childOptions = {};
      }
      for (i = _i = 0, _len = keys.length; _i < _len; i = ++_i) {
        key = keys[i];
        this.o.childOptions[key] = o.childOptions[key];
      }
      len = this.transits.length;
      while (len--) {
        transit = this.transits[len];
        transit.tuneNewOption(this.getOption(len), true);
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
    var i, option, _i, _ref, _results;
    this.transits = [];
    _results = [];
    for (i = _i = 0, _ref = this.props.count; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      option = this.getOption(i);
      option.ctx = this.ctx;
      option.isDrawLess = option.isRunLess = option.isTweenLess = true;
      this.props.randomAngle && (option.angleShift = this.generateRandomAngle());
      this.props.randomRadius && (option.radiusScale = this.generateRandomRadius());
      _results.push(this.transits.push(new Swirl(option)));
    }
    return _results;
  };

  Burst.prototype.addBitOptions = function() {
    var angleAddition, delta, end, i, keys, newEnd, newStart, pointEnd, pointStart, points, start, step, transit, _i, _len, _ref, _results;
    points = this.props.count;
    this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1;
    step = this.props.degree / this.degreeCnt;
    _ref = this.transits;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      transit = _ref[i];
      pointStart = this.getSidePoint('start', i * step);
      pointEnd = this.getSidePoint('end', i * step);
      transit.o.x = this.getDeltaFromPoints('x', pointStart, pointEnd);
      transit.o.y = this.getDeltaFromPoints('y', pointStart, pointEnd);
      if (!this.props.isResetAngles) {
        angleAddition = i * step + 90;
        transit.o.angle = typeof transit.o.angle !== 'object' ? transit.o.angle + angleAddition : (keys = Object.keys(transit.o.angle), start = keys[0], end = transit.o.angle[start], newStart = parseFloat(start) + angleAddition, newEnd = parseFloat(end) + angleAddition, delta = {}, delta[newStart] = newEnd, delta);
      }
      _results.push(transit.extendDefaults());
    }
    return _results;
  };

  Burst.prototype.getSidePoint = function(side, angle) {
    var pointStart, sideRadius;
    sideRadius = this.getSideRadius(side);
    return pointStart = this.h.getRadialPoint({
      radius: sideRadius.radius,
      radiusX: sideRadius.radiusX,
      radiusY: sideRadius.radiusY,
      angle: angle + this.props.angle,
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
    var i, _results;
    Burst.__super__.createTween.apply(this, arguments);
    i = this.transits.length;
    _results = [];
    while (i--) {
      _results.push(this.tween.add(this.transits[i].timeline));
    }
    return _results;
  };

  Burst.prototype.calcSize = function() {
    var i, largestSize, radius, transit, _i, _len, _ref;
    largestSize = -1;
    _ref = this.transits;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      transit = _ref[i];
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
    var prop, _ref;
    prop = (_ref = o.from || this.o.childOptions) != null ? _ref[o.key] : void 0;
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


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Burst", [], function() {
    return Burst;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Burst;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Burst = Burst;
}

},{"./h":4,"./shapes/bitsMap":9,"./swirl":17,"./transit":18,"./tween/tween":20}],3:[function(require,module,exports){
var Easing, easing;

Easing = (function() {
  function Easing() {}

  Easing.prototype.Linear = {
    None: function(k) {
      return k;
    }
  };

  Easing.prototype.Quadratic = {
    In: function(k) {
      return k * k;
    },
    Out: function(k) {
      return k * (2 - k);
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k;
      }
      return -0.5 * (--k * (k - 2) - 1);
    }
  };

  Easing.prototype.Cubic = {
    In: function(k) {
      return k * k * k;
    },
    Out: function(k) {
      return --k * k * k + 1;
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k + 2);
    }
  };

  Easing.prototype.Quartic = {
    In: function(k) {
      return k * k * k * k;
    },
    Out: function(k) {
      return 1 - (--k * k * k * k);
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
      }
      return -0.5 * ((k -= 2) * k * k * k - 2);
    }
  };

  Easing.prototype.Quintic = {
    In: function(k) {
      return k * k * k * k * k;
    },
    Out: function(k) {
      return --k * k * k * k * k + 1;
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }
  };

  Easing.prototype.Sinusoidal = {
    In: function(k) {
      return 1 - Math.cos(k * Math.PI / 2);
    },
    Out: function(k) {
      return Math.sin(k * Math.PI / 2);
    },
    InOut: function(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
  };

  Easing.prototype.Exponential = {
    In: function(k) {
      if (k === 0) {
        return 0;
      } else {
        return Math.pow(1024, k - 1);
      }
    },
    Out: function(k) {
      if (k === 1) {
        return 1;
      } else {
        return 1 - Math.pow(2, -10 * k);
      }
    },
    InOut: function(k) {
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

  Easing.prototype.Circular = {
    In: function(k) {
      return 1 - Math.sqrt(1 - k * k);
    },
    Out: function(k) {
      return Math.sqrt(1 - (--k * k));
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }
  };

  Easing.prototype.Elastic = {
    In: function(k) {
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
    Out: function(k) {
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
    InOut: function(k) {
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

  Easing.prototype.Back = {
    In: function(k) {
      var s;
      s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    Out: function(k) {
      var s;
      s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    InOut: function(k) {
      var s;
      s = 1.70158 * 1.525;
      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
      }
      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }
  };

  Easing.prototype.Bounce = {
    In: function(k) {
      return 1 - easing.Bounce.Out(1 - k);
    },
    Out: function(k) {
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
    InOut: function(k) {
      if (k < 0.5) {
        return easing.Bounce.In(k * 2) * 0.5;
      }
      return easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
    }
  };

  return Easing;

})();

easing = new Easing;


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("easing", [], function() {
    return easing;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = easing;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.easing = easing;
}

},{}],4:[function(require,module,exports){
var Helpers, h;

Helpers = (function() {
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

  Helpers.prototype.RAD_TO_DEG = 180 / Math.PI;

  function Helpers() {
    this.vars();
  }

  Helpers.prototype.vars = function() {
    this.prefix = this.getPrefix();
    this.getRemBase();
    this.isFF = this.prefix.lowercase === 'moz';
    this.isIE = this.prefix.lowercase === 'ms';
    this.isOldOpera = navigator.userAgent.match(/presto/gim);
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
    var key, value, _results;
    _results = [];
    for (key in objFrom) {
      value = objFrom[key];
      _results.push(objTo[key] != null ? objTo[key] : objTo[key] = objFrom[key]);
    }
    return _results;
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
    return console.log.apply(console, this.prepareForLog(arguments));
  };

  Helpers.prototype.warn = function() {
    return console.warn.apply(console, this.prepareForLog(arguments));
  };

  Helpers.prototype.error = function() {
    return console.error.apply(console, this.prepareForLog(arguments));
  };

  Helpers.prototype.parseUnit = function(value) {
    var amount, regex, returnVal, unit, _ref;
    if (typeof value === 'number') {
      return returnVal = {
        unit: 'px',
        value: value,
        string: "" + value + "px"
      };
    } else if (typeof value === 'string') {
      regex = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin/gim;
      unit = ((_ref = value.match(regex)) != null ? _ref[0] : void 0) || 'px';
      amount = parseFloat(value);
      return returnVal = {
        unit: unit,
        value: amount,
        string: "" + amount + unit
      };
    }
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
        return arr.push(_this.parseUnit(str));
      };
    })(this));
    return arr;
  };

  Helpers.prototype.calcArrDelta = function(arr1, arr2) {
    var delta, i, num, _i, _len;
    if ((arr1 == null) || (arr2 == null)) {
      throw Error('Two arrays should be passed');
    }
    if (!this.isArray(arr1) || !this.isArray(arr2)) {
      throw Error('Two arrays expected');
    }
    delta = [];
    for (i = _i = 0, _len = arr1.length; _i < _len; i = ++_i) {
      num = arr1[i];
      delta[i] = arr2[i] - arr1[i];
    }
    return delta;
  };

  Helpers.prototype.isArray = function(variable) {
    return variable instanceof Array;
  };

  Helpers.prototype.normDashArrays = function(arr1, arr2) {
    var arr1Len, arr2Len, currItem, i, _i, _j, _ref, _ref1;
    arr1Len = arr1.length;
    arr2Len = arr2.length;
    if (arr1Len > arr2Len) {
      for (i = _i = 0, _ref = arr1Len - arr2Len; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        currItem = i + arr2.length - 1;
        arr2.push(this.parseUnit("0" + arr1[currItem].unit));
      }
    } else if (arr2Len > arr1Len) {
      for (i = _j = 0, _ref1 = arr2Len - arr1Len; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        currItem = i + arr1.length;
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

  Helpers.prototype.splitEasing = function(string) {
    var firstPart, secondPart, split;
    if (typeof string === 'function') {
      return string;
    }
    if (typeof string === 'string' && string.length) {
      split = string.split('.');
      firstPart = this.capitalize(split[0] || 'Linear');
      secondPart = this.capitalize(split[1] || 'None');
      return [firstPart, secondPart];
    } else {
      return ['Linear', 'None'];
    }
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

  Helpers.prototype.parseIfRand = function(str) {
    if (typeof str === 'string' && str.match(/rand\(/)) {
      return this.parseRand(str);
    } else {
      return str;
    }
  };

  Helpers.prototype.parseDelta = function(key, value) {
    var delta, end, endArr, endColorObj, start, startArr, startColorObj;
    console.log(key, value);
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

  Helpers.prototype.rand = function(min, max) {
    return (Math.random() * (max - min)) + min;
  };

  return Helpers;

})();

h = new Helpers;


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Helpers", [], function() {
    return h;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = h;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.helpers = h;
}

},{}],5:[function(require,module,exports){
var Burst, MotionPath, Swirl, Timeline, Transit, Tween, burst;

Burst = require('./burst');

Swirl = require('./Swirl');

Transit = require('./transit');

MotionPath = require('./motion-path');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

burst = new Transit({
  x: 400,
  y: 400,
  type: 'circle',
  bit: document.getElementById('js-ellipse'),
  duration: 2000,
  count: 3,
  isShowInit: true,
  isShowEnd: true,
  repeat: 99999,
  stroke: 'deeppink',
  strokeWidth: 2,
  strokeDasharray: {
    '100% 60%': '10%'
  },
  fill: 'transparent',
  radius: 40,
  swirlFrequency: 'rand(0,10)',
  swirlSize: 'rand(0,10)'
});

},{"./Swirl":1,"./burst":2,"./motion-path":6,"./transit":18,"./tween/timeline":19,"./tween/tween":20}],6:[function(require,module,exports){
var MotionPath, Timeline, Tween, h, resize;

h = require('./h');

resize = require('./vendor/resize');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

MotionPath = (function() {
  MotionPath.prototype.NS = 'http://www.w3.org/2000/svg';

  MotionPath.prototype.defaults = {
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
    transformOrigin: null,
    isAngle: false,
    isReverse: false,
    isRunLess: false,
    isPresetPosition: true,
    onStart: null,
    onComplete: null,
    onUpdate: null
  };

  function MotionPath(o) {
    this.o = o != null ? o : {};
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
    this.history = [h.cloneObj(this.props)];
    return this.postVars();
  };

  MotionPath.prototype.postVars = function() {
    this.props.pathStart = h.clamp(this.props.pathStart, 0, 1);
    this.props.pathEnd = h.clamp(this.props.pathEnd, this.props.pathStart, 1);
    this.onUpdate = this.props.onUpdate;
    this.el = this.parseEl(this.props.el);
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
      if (!this.container) {
        return;
      }
      this.removeEvent(this.container, 'onresize', this.getScaler);
      return this.addEvent(this.container, 'onresize', this.getScaler);
    }
  };

  MotionPath.prototype.addEvent = function(el, type, handler) {
    if (el.addEventListener) {
      return this.container.addEventListener(type, handler, false);
    } else if (el.attachEvent) {
      return this.container.attachEvent(type, handler);
    }
  };

  MotionPath.prototype.removeEvent = function(el, type, handler) {
    if (el.removeEventListener) {
      return this.container.removeEventListener(type, handler, false);
    } else if (el.detachEvent) {
      return this.container.detachEvent(type, handler);
    }
  };

  MotionPath.prototype.parseEl = function(el) {
    if (typeof el === 'string') {
      return document.querySelector(el);
    }
    if (el instanceof HTMLElement) {
      return el;
    }
  };

  MotionPath.prototype.getPath = function() {
    var path;
    if (typeof this.props.path === 'string') {
      if (this.props.path.charAt(0).toLowerCase() === 'm') {
        path = document.createElementNS(this.NS, 'path');
        path.setAttributeNS(null, 'd', this.props.path);
        return path;
      } else {
        return document.querySelector(this.props.path);
      }
    }
    if (this.props.path.style) {
      return this.props.path;
    }
  };

  MotionPath.prototype.getScaler = function() {
    var calcBoth, calcHeight, calcWidth, end, size, start;
    this.cSize = {
      width: this.container.offsetWidth || 0,
      height: this.container.offsetHeight || 0
    };
    start = this.path.getPointAtLength(0);
    end = this.path.getPointAtLength(this.len);
    size = {};
    size.width = end.x >= start.x ? end.x - start.x : start.x - end.x;
    size.height = end.y >= start.y ? end.y - start.y : start.y - end.y;
    this.scaler = {};
    calcWidth = (function(_this) {
      return function() {
        _this.scaler.x = _this.cSize.width / size.width;
        if (!isFinite(_this.scaler.x)) {
          return _this.scaler.x = 1;
        }
      };
    })(this);
    calcHeight = (function(_this) {
      return function() {
        _this.scaler.y = _this.cSize.height / size.height;
        if (!isFinite(_this.scaler.y)) {
          return _this.scaler.y = 1;
        }
      };
    })(this);
    calcBoth = function() {
      calcWidth();
      return calcHeight();
    };
    switch (this.fillRule) {
      case 'all':
        return calcBoth();
      case 'width':
        calcWidth();
        return this.scaler.y = this.scaler.x;
      case 'height':
        calcHeight();
        return this.scaler.x = this.scaler.y;
      default:
        return calcBoth();
    }
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
          var _ref;
          return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
        };
      })(this),
      onComplete: (function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
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
    if (!this.props.isRunLess) {
      return this.startTween();
    } else {
      if (this.props.isPresetPosition) {
        return this.setProgress(0, true);
      }
    }
  };

  MotionPath.prototype.startTween = function() {
    return setTimeout(((function(_this) {
      return function() {
        var _ref;
        return (_ref = _this.tween) != null ? _ref.start() : void 0;
      };
    })(this)), 1);
  };

  MotionPath.prototype.setProgress = function(p, isInit) {
    var atan, len, point, prevPoint, rotate, tOrigin, transform, x, x1, x2, y;
    len = this.startLen + (!this.props.isReverse ? p * this.slicedLen : (1 - p) * this.slicedLen);
    point = this.path.getPointAtLength(len);
    if (this.props.isAngle || (this.props.angleOffset != null)) {
      prevPoint = this.path.getPointAtLength(len - 1);
      x1 = point.y - prevPoint.y;
      x2 = point.x - prevPoint.x;
      atan = Math.atan(x1 / x2);
      !isFinite(atan) && (atan = 0);
      this.angle = atan * h.RAD_TO_DEG;
      if ((typeof this.props.angleOffset) !== 'function') {
        this.angle += this.props.angleOffset || 0;
      } else {
        this.angle = this.props.angleOffset(this.angle, p);
      }
    } else {
      this.angle = 0;
    }
    x = point.x + this.props.offsetX;
    y = point.y + this.props.offsetY;
    if (this.scaler) {
      x *= this.scaler.x;
      y *= this.scaler.y;
    }
    rotate = this.angle !== 0 ? "rotate(" + this.angle + "deg)" : '';
    transform = "translate(" + x + "px," + y + "px) " + rotate + " translateZ(0)";
    this.el.style["" + h.prefix.css + "transform"] = transform;
    this.el.style['transform'] = transform;
    if (this.props.transformOrigin) {
      tOrigin = typeof this.props.transformOrigin === 'function' ? this.props.transformOrigin(this.angle, p) : this.props.transformOrigin;
      this.el.style["" + h.prefix.css + "transform-origin"] = tOrigin;
      this.el.style['transform-origin'] = tOrigin;
    }
    return !isInit && (typeof this.onUpdate === "function" ? this.onUpdate(p) : void 0);
  };

  MotionPath.prototype.extendDefaults = function(o) {
    var key, value, _results;
    _results = [];
    for (key in o) {
      value = o[key];
      _results.push(this[key] = value);
    }
    return _results;
  };

  MotionPath.prototype.extendOptions = function(o) {
    var key, value, _results;
    _results = [];
    for (key in o) {
      value = o[key];
      _results.push(this.props[key] = value);
    }
    return _results;
  };

  MotionPath.prototype.then = function(o) {
    var i, it, key, keys, opts, prevOptions, value;
    prevOptions = this.history[this.history.length - 1];
    for (key in prevOptions) {
      value = prevOptions[key];
      if (o[key] == null) {
        o[key] = value;
      }
    }
    this.history.push(o);
    keys = Object.keys(h.tweenOptionMap);
    i = keys.length;
    opts = {};
    while (i--) {
      key = keys[i];
      opts[key] = o[key] || prevOptions[key];
    }
    it = this;
    opts.onUpdate = (function(_this) {
      return function(p) {
        return _this.setProgress(p);
      };
    })(this);
    opts.onStart = (function(_this) {
      return function() {
        var _ref;
        return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
      };
    })(this);
    opts.onComplete = (function(_this) {
      return function() {
        var _ref;
        return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
      };
    })(this);
    opts.onFirstUpdate = function() {
      return it.tuneOptions(it.history[this.index]);
    };
    this.tween.append(new Timeline(opts));
    return this;
  };

  MotionPath.prototype.tuneOptions = function(o) {
    this.extendOptions(o);
    return this.postVars();
  };

  return MotionPath;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("motion-path", [], function() {
    return MotionPath;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = MotionPath;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.MotionPath = MotionPath;
}

},{"./h":4,"./tween/timeline":19,"./tween/tween":20,"./vendor/resize":22}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
    this.state = [];
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
    var key, value, _ref, _results;
    if (this.props == null) {
      this.props = {};
    }
    _ref = this.defaults;
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push(this.props[key] = this.o[key] != null ? this.o[key] : value);
    }
    return _results;
  };

  Bit.prototype.setAttr = function(attr, value) {
    var el, key, keys, len, val, _results;
    if (typeof attr === 'object') {
      keys = Object.keys(attr);
      len = keys.length;
      el = value || this.el;
      _results = [];
      while (len--) {
        key = keys[len];
        val = attr[key];
        _results.push(el.setAttribute(key, val));
      }
      return _results;
    } else {
      return this.el.setAttribute(attr, value);
    }
  };

  Bit.prototype.setProp = function(attr, value) {
    var key, val, _results;
    if (typeof attr === 'object') {
      _results = [];
      for (key in attr) {
        val = attr[key];
        _results.push(this.props[key] = val);
      }
      return _results;
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
    var len, name, _results;
    len = this.drawMapLength;
    _results = [];
    while (len--) {
      name = this.drawMap[len];
      _results.push(this.setAttrIfChanged(name, this.props[name]));
    }
    return _results;
  };

  Bit.prototype.setAttrIfChanged = function(name) {
    var value;
    if (this.state[name] !== (value = this.props[name])) {
      this.el.setAttribute(name, value);
      return this.state[name] = value;
    }
  };

  return Bit;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Bit", [], function() {
    return Bit;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Bit;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Bit = Bit;
}

},{"../h":4}],9:[function(require,module,exports){
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


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("bitsMap", [], function() {
    return new BitsMap;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = new BitsMap;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.bitsMap = new BitsMap;
}

},{"../h":4,"./bit":8,"./circle":10,"./cross":11,"./equal":12,"./line":13,"./polygon":14,"./rect":15,"./zigzag":16}],10:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Circle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Circle = (function(_super) {
  __extends(Circle, _super);

  function Circle() {
    return Circle.__super__.constructor.apply(this, arguments);
  }

  Circle.prototype.type = 'ellipse';

  Circle.prototype.draw = function() {
    Circle.__super__.draw.apply(this, arguments);
    return this.setAttr({
      rx: this.props.radiusX != null ? this.props.radiusX : this.props.radius,
      ry: this.props.radiusY != null ? this.props.radiusY : this.props.radius,
      cx: this.props.x,
      cy: this.props.y
    });
  };

  return Circle;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Circle", [], function() {
    return Circle;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Circle;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Circle = Circle;
}

},{"./bit":8}],11:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Cross,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Cross = (function(_super) {
  __extends(Cross, _super);

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
    d = "" + line1 + " " + line2;
    return this.setAttr({
      d: d
    });
  };

  return Cross;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Cross", [], function() {
    return Cross;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Cross;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Cross = Cross;
}

},{"./bit":8}],12:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Equal,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Equal = (function(_super) {
  __extends(Equal, _super);

  function Equal() {
    return Equal.__super__.constructor.apply(this, arguments);
  }

  Equal.prototype.type = 'path';

  Equal.prototype.ratio = 1.43;

  Equal.prototype.draw = function() {
    var d, i, radiusX, radiusY, x1, x2, y, yStart, yStep, _i, _ref;
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
    for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      y = "" + (i * yStep + yStart);
      d += "M" + x1 + ", " + y + " L" + x2 + ", " + y + " ";
    }
    return this.setAttr({
      d: d
    });
  };

  return Equal;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Equal", [], function() {
    return Equal;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Equal;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Equal = Equal;
}

},{"./bit":8}],13:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Line,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Line = (function(_super) {
  __extends(Line, _super);

  function Line() {
    return Line.__super__.constructor.apply(this, arguments);
  }

  Line.prototype.draw = function() {
    var radiusX;
    Line.__super__.draw.apply(this, arguments);
    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
    return this.setAttr({
      x1: this.props.x - radiusX,
      x2: this.props.x + radiusX,
      y1: this.props.y,
      y2: this.props.y
    });
  };

  return Line;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Line", [], function() {
    return Line;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Line;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Line = Line;
}

},{"./bit":8}],14:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Polygon, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

h = require('../h');

Polygon = (function(_super) {
  __extends(Polygon, _super);

  function Polygon() {
    return Polygon.__super__.constructor.apply(this, arguments);
  }

  Polygon.prototype.type = 'polygon';

  Polygon.prototype.draw = function() {
    this.drawShape();
    return Polygon.__super__.draw.apply(this, arguments);
  };

  Polygon.prototype.drawShape = function() {
    var d, i, point, step, _i, _j, _len, _ref, _ref1;
    step = 360 / this.props.points;
    this.radialPoints = [];
    for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
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
    _ref1 = this.radialPoints;
    for (i = _j = 0, _len = _ref1.length; _j < _len; i = ++_j) {
      point = _ref1[i];
      d += "" + (point.x.toFixed(4)) + "," + (point.y.toFixed(4)) + " ";
    }
    return this.setAttr({
      points: d
    });
  };

  return Polygon;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Polygon", [], function() {
    return Polygon;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Polygon;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Polygon = Polygon;
}

},{"../h":4,"./bit":8}],15:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Rect,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Rect = (function(_super) {
  __extends(Rect, _super);

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
    return this.setAttr({
      width: 2 * radiusX,
      height: 2 * radiusY,
      x: this.props.x - radiusX,
      y: this.props.y - radiusY
    });
  };

  return Rect;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Rect", [], function() {
    return Rect;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Rect;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Rect = Rect;
}

},{"./bit":8}],16:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Zigzag,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Zigzag = (function(_super) {
  __extends(Zigzag, _super);

  function Zigzag() {
    return Zigzag.__super__.constructor.apply(this, arguments);
  }

  Zigzag.prototype.type = 'polyline';

  Zigzag.prototype.draw = function() {
    var i, iX, iY, points, radiusX, radiusY, startPoints, stepX, stepY, strokeWidth, _i, _ref;
    Zigzag.__super__.draw.apply(this, arguments);
    if (!this.props.points) {
      return;
    }
    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
    points = '';
    stepX = 2 * radiusX / this.props.points;
    stepY = 2 * radiusY / this.props.points;
    strokeWidth = this.props['stroke-width'];
    for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      iX = i * stepX + strokeWidth;
      iY = i * stepY + strokeWidth;
      startPoints = "" + iX + ", " + iY;
      points += i === this.props.points ? startPoints : "" + startPoints + " " + ((i + 1) * stepX + strokeWidth) + ", " + iY + " ";
    }
    return this.setAttr({
      points: points
    });
  };

  return Zigzag;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Zigzag", [], function() {
    return Zigzag;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Zigzag;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Zigzag = Zigzag;
}

},{"./bit":8}],17:[function(require,module,exports){
module.exports=require(1)
},{"./transit":18}],18:[function(require,module,exports){

/* istanbul ignore next */
var Timeline, Transit, Tween, bitsMap, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

h = require('./h');

bitsMap = require('./shapes/bitsMap');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

Transit = (function(_super) {
  __extends(Transit, _super);

  function Transit() {
    return Transit.__super__.constructor.apply(this, arguments);
  }

  Transit.prototype.progress = 0;

  Transit.prototype.defaults = {
    strokeWidth: 2,
    strokeOpacity: 1,
    strokeDasharray: '',
    strokeDashoffset: '',
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
        this.o.isIt && console.log('append');
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
    var marginSize, size;
    if (!this.isForeign) {
      size = "" + this.props.size + "px";
      marginSize = "" + (-this.props.size / 2) + "px";
      this.el.style.position = 'absolute';
      this.el.style.top = this.props.y;
      this.el.style.left = this.props.x;
      this.el.style.width = size;
      this.el.style.height = size;
      this.el.style['margin-left'] = marginSize;
      this.el.style['margin-top'] = marginSize;
      this.h.setPrefixedStyle(this.el, 'backface-visibility', 'hidden');
    }
    this.el.style.opacity = this.props.opacity;
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
    var _base;
    if ((_base = this.lastSet)[name] == null) {
      _base[name] = {};
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
    var dStroke, radius, stroke, _base;
    if (this.o.size) {
      return;
    }
    radius = this.calcMaxRadius();
    dStroke = this.deltas['strokeWidth'];
    stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this.props.strokeWidth;
    this.props.size = 2 * radius + 2 * stroke;
    switch (typeof (_base = this.props.easing).toLowerCase === "function" ? _base.toLowerCase() : void 0) {
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
    var a, b, g, i, key, keys, len, num, r, str, units, value, _results;
    keys = Object.keys(this.deltas);
    len = keys.length;
    _results = [];
    while (len--) {
      key = keys[len];
      value = this.deltas[key];
      _results.push(this.props[key] = (function() {
        var _i, _len, _ref;
        switch (value.type) {
          case 'array':
            str = '';
            _ref = value.delta;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              num = _ref[i];
              str += "" + (value.start[i] + num * this.progress) + " ";
            }
            return str;
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
    return _results;
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
    var defaultsValue, delta, fromObject, isObject, key, keys, len, optionsValue, _ref, _ref1;
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
      if ((_ref = this.skipProps) != null ? _ref[key] : void 0) {
        continue;
      }
      if (o) {
        this.o[key] = defaultsValue;
        optionsValue = defaultsValue;
        delete this.deltas[key];
      } else {
        optionsValue = this.o[key] != null ? this.o[key] : defaultsValue;
      }
      isObject = (optionsValue != null) && (typeof optionsValue === 'object');
      if (!isObject || this.h.isArray(optionsValue)) {
        if (typeof optionsValue === 'string' && optionsValue.match(/rand/)) {
          optionsValue = this.h.parseRand(optionsValue);
        }
        this.props[key] = optionsValue;
        if (this.h.posPropsMap[key]) {
          this.props[key] = this.h.parseUnit(this.props[key]).string;
        }
        continue;
      }
      if ((key === 'x' || key === 'y') && !this.o.ctx) {
        this.h.warn('Consider to animate shiftX/shiftY properties instead of x/y, as it would be much more performant', optionsValue);
      }
      if ((_ref1 = this.skipPropsDelta) != null ? _ref1[key] : void 0) {
        continue;
      }
      delta = this.h.parseDelta(key, optionsValue, this.defaults[key]);
      if (delta.type != null) {
        this.deltas[key] = delta;
      }
      this.props[key] = delta.start;
    }
    return this.onUpdate = this.props.onUpdate;
  };

  Transit.prototype.mergeThenOptions = function(start, end) {
    var endKey, i, key, keys, o, startKey, startKeys;
    o = {};
    this.h.extend(o, start);
    keys = Object.keys(end);
    i = keys.length;
    while (i--) {
      key = keys[i];
      endKey = end[key];
      if (this.h.tweenOptionMap[key] || typeof endKey === 'object') {
        o[key] = endKey != null ? endKey : start[key];
        continue;
      }
      startKey = start[key];
      if (startKey == null) {
        startKey = this.defaults[key];
      }
      if (typeof startKey === 'object') {
        startKeys = Object.keys(startKey);
        startKey = startKey[startKeys[0]];
      }
      if (endKey != null) {
        o[key] = {};
        o[key][startKey] = endKey;
      } else {
        o[key] = startKey;
      }
    }
    return o;
  };

  Transit.prototype.then = function(o) {
    var i, it, keys, merged, opts;
    if (o == null) {
      o = {};
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
    opts.onUpdate = (function(_this) {
      return function(p) {
        return _this.setProgress(p);
      };
    })(this);
    opts.onStart = (function(_this) {
      return function() {
        var _ref;
        return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
      };
    })(this);
    opts.onComplete = (function(_this) {
      return function() {
        var _ref;
        return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
      };
    })(this);
    opts.onFirstUpdate = function() {
      return it.tuneOptions(it.history[this.index]);
    };
    this.tween.append(new Timeline(opts));
    return this;
  };

  Transit.prototype.tuneOptions = function(o) {
    this.extendDefaults(o);
    this.calcSize();
    return this.setElStyles();
  };

  Transit.prototype.createTween = function() {
    var it, onComplete;
    it = this;
    onComplete = this.props.onComplete ? this.h.bind(this.props.onComplete, this) : null;
    this.timeline = new Timeline({
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
          var _ref;
          _this.show();
          return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
        };
      })(this),
      onFirstUpdateBackward: (function(_this) {
        return function() {
          return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
        };
      })(this),
      onReverseComplete: (function(_this) {
        return function() {
          var _ref;
          !_this.o.isShowInit && _this.hide();
          return (_ref = _this.props.onReverseComplete) != null ? _ref.apply(_this) : void 0;
        };
      })(this)
    });
    this.tween = new Tween({
      onComplete: (function(_this) {
        return function() {
          var _ref;
          !_this.o.isShowEnd && _this.hide();
          return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
        };
      })(this)
    });
    this.tween.add(this.timeline);
    return !this.o.isRunLess && this.startTween();
  };

  Transit.prototype.run = function(o) {
    var key, keys, len;
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
    if (o && Object.keys(o).length) {
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
    var historyLen, i, j, key, keys, len, optionRecord, value, value2, valueKeys, valueKeys2, _results;
    keys = Object.keys(o);
    i = -1;
    len = keys.length;
    historyLen = this.history.length;
    _results = [];
    while (++i < len) {
      key = keys[i];
      j = 0;
      _results.push((function() {
        var _results1;
        _results1 = [];
        while (++j < historyLen) {
          optionRecord = this.history[j][key];
          if (optionRecord != null) {
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
              _results1.push(this.history[j][key] = o[key]);
            }
          } else {
            _results1.push(this.history[j][key] = o[key]);
          }
        }
        return _results1;
      }).call(this));
    }
    return _results;
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
        var _ref;
        return (_ref = _this.tween) != null ? _ref.start() : void 0;
      };
    })(this)), 1);
  };

  Transit.prototype.resetTimeline = function() {
    var i, key, timelineOptions, _i, _len, _ref;
    timelineOptions = {};
    _ref = Object.keys(this.h.tweenOptionMap);
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      key = _ref[i];
      timelineOptions[key] = this.props[key];
    }
    timelineOptions.onStart = this.props.onStart;
    timelineOptions.onComplete = this.props.onComplete;
    return this.timeline.setProp(timelineOptions);
  };

  return Transit;

})(bitsMap.map.bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Transit", [], function() {
    return Transit;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Transit;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Transit = Transit;
}

},{"./h":4,"./shapes/bitsMap":9,"./tween/timeline":19,"./tween/tween":20}],19:[function(require,module,exports){
var Easing, Timeline, h;

Easing = require('../easing');

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
    onComplete: null
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
    return this.calcDimentions();
  };

  Timeline.prototype.calcDimentions = function() {
    var easing;
    this.props.totalTime = (this.o.repeat + 1) * (this.o.duration + this.o.delay);
    this.props.totalDuration = this.props.totalTime - this.o.delay;
    easing = h.splitEasing(this.o.easing);
    return this.props.easing = typeof easing === 'function' ? easing : Easing[easing[0]][easing[1]];
  };

  Timeline.prototype.extendDefaults = function() {
    h.extend(this.o, this.defaults);
    return this.onUpdate = this.o.onUpdate;
  };

  Timeline.prototype.start = function(time) {
    this.isCompleted = false;
    this.isStarted = false;
    this.props.startTime = (time || Date.now()) + this.o.delay;
    this.props.endTime = this.props.startTime + this.props.totalDuration;
    return this;
  };

  Timeline.prototype.update = function(time) {
    var cnt, elapsed, isFlip, start, _ref, _ref1, _ref2, _ref3, _ref4;
    if ((time >= this.props.startTime) && (time < this.props.endTime)) {
      if (!this.isStarted) {
        if ((_ref = this.o.onStart) != null) {
          _ref.apply(this);
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
      if (!this.isFirstUpdate) {
        if ((_ref1 = this.o.onFirstUpdate) != null) {
          _ref1.apply(this);
        }
        this.isFirstUpdate = true;
      }
      if (time < this.prevTime && !this.isFirstUpdateBackward) {
        if ((_ref2 = this.o.onFirstUpdateBackward) != null) {
          _ref2.apply(this);
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
        if ((_ref3 = this.o.onComplete) != null) {
          _ref3.apply(this);
        }
        this.isCompleted = true;
      }
      if (time > this.props.endTime || time < this.props.startTime) {
        this.isFirstUpdate = false;
      }
      this.isFirstUpdateBackward = false;
    }
    if (time < this.prevTime && time <= this.props.startTime) {
      if ((_ref4 = this.o.onReverseComplete) != null) {
        _ref4.apply(this);
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

  return Timeline;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Timeline", [], function() {
    return Timeline;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Timeline;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Timeline = Timeline;
}

},{"../easing":3,"../h":4}],20:[function(require,module,exports){
var Tween, h, t;

h = require('../h');

t = require('./tweener');

Tween = (function() {
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

  Tween.prototype.add = function(timeline) {
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
    var len, timeline, _results;
    len = this.timelines.length;
    this.props.totalTime = 0;
    _results = [];
    while (len--) {
      timeline = this.timelines[len];
      _results.push(this.props.totalTime = Math.max(timeline.props.totalTime, this.props.totalTime));
    }
    return _results;
  };

  Tween.prototype.update = function(time) {
    var i, len, _ref, _ref1;
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
      if ((_ref = this.o.onReverseComplete) != null) {
        _ref.apply(this);
      }
    }
    this.prevTime = time;
    if (time === this.props.endTime) {
      if (typeof this.onUpdate === "function") {
        this.onUpdate(1);
      }
      if ((_ref1 = this.o.onComplete) != null) {
        _ref1.apply(this);
      }
      return true;
    }
  };

  Tween.prototype.prepareStart = function() {
    var _ref;
    this.getDimentions();
    return (_ref = this.o.onStart) != null ? _ref.apply(this) : void 0;
  };

  Tween.prototype.startTimelines = function(time) {
    var i, _results;
    i = this.timelines.length;
    _results = [];
    while (i--) {
      _results.push(this.timelines[i].start(time || this.props.startTime));
    }
    return _results;
  };

  Tween.prototype.start = function(time) {
    this.setStartTime(time);
    !time && t.add(this);
    return this;
  };

  Tween.prototype.stop = function() {
    t.remove(this);
    return this;
  };

  Tween.prototype.getDimentions = function() {
    this.props.startTime = Date.now();
    return this.props.endTime = this.props.startTime + this.props.totalTime;
  };

  Tween.prototype.setStartTime = function(time) {
    this.prepareStart(time);
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


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Tween", [], function() {
    return Tween;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Tween;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Tween = Tween;
}

},{"../h":4,"./tweener":21}],21:[function(require,module,exports){
var Tweener, h, t;

require('../polyfills/raf');

h = require('../h');

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
      return;
    }
    time = Date.now();
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
    var i, _results;
    i = this.tweens.length;
    _results = [];
    while (i--) {
      if (this.tweens[i].update(time) === true) {
        _results.push(this.remove(i));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
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


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("tweener", [], function() {
    return t;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = t;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.tweener = t;
}

},{"../h":4,"../polyfills/raf":7}],22:[function(require,module,exports){

/*!
  LegoMushroom @legomushroom http://legomushroom.com
  MIT License 2014
 */
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
      var _i, _len, _ref, _results;
      _ref = this.allowedProtos;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        proto = _ref[i];
        if (proto.prototype == null) {
          continue;
        }
        _results.push((function(proto) {
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
      return _results;
    }).call(this);
  };

  Main.prototype.handleResize = function(args) {
    var computedStyle, el, iframe, isEmpty, isStatic, _ref;
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
      isStatic = computedStyle.position === 'static' && el.style.position === '';
      isEmpty = computedStyle.position === '' && el.style.position === '';
      if (isStatic || isEmpty) {
        el.style.position = 'relative';
      }
      if ((_ref = iframe.contentWindow) != null) {
        _ref.onresize = (function(_this) {
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
    var i, it, proto, _i, _len, _ref, _results;
    clearInterval(this.interval);
    this.interval = null;
    window.isAnyResizeEventInited = false;
    it = this;
    _ref = this.allowedProtos;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      proto = _ref[i];
      if (proto.prototype == null) {
        continue;
      }
      _results.push((function(proto) {
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
    return _results;
  };

  return Main;

})();

if ((typeof define === "function") && define.amd) {
  define("any-resize-event", [], function() {
    return new Main;
  });
} else if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = new Main;
} else {
  if (typeof window !== "undefined" && window !== null) {
    window.AnyResizeEvent = Main;
  }
  if (typeof window !== "undefined" && window !== null) {
    window.anyResizeEvent = new Main;
  }
}

},{}]},{},[5])