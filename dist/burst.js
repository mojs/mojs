
/* istanbul ignore next */
var Burst, Swirl, Transit, Tween, bitsMap, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

bitsMap = require('./bitsMap');

Transit = require('./transit');

Swirl = require('./swirl');

h = require('./h');

Tween = require('./tween');

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
    onUpdate: null
  };

  Burst.prototype.childDefaults = {
    radius: {
      7: 0
    },
    radiusX: void 0,
    radiusY: void 0,
    angle: 0,
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
    var i, pointEnd, pointStart, points, rEnd, rStart, rXEnd, rXStart, rYEnd, rYStart, step, transit, x, y, _i, _len, _ref, _results;
    points = this.props.count;
    this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1;
    step = this.props.degree / this.degreeCnt;
    _ref = this.transits;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      transit = _ref[i];
      rStart = this.deltas.radius != null ? this.deltas.radius.start : this.props.radius;
      rXStart = this.deltas.radiusX != null ? this.deltas.radiusX.start : this.props.radiusX != null ? this.props.radiusX : void 0;
      rYStart = this.deltas.radiusY != null ? this.deltas.radiusY.start : this.props.radiusY != null ? this.props.radiusY : void 0;
      pointStart = this.h.getRadialPoint({
        radius: rStart,
        radiusX: rXStart,
        radiusY: rYStart,
        angle: i * step + this.props.angle,
        center: {
          x: this.props.center,
          y: this.props.center
        }
      });
      rEnd = this.deltas.radius != null ? this.deltas.radius.end : this.props.radius;
      rXEnd = this.deltas.radiusX != null ? this.deltas.radiusX.end : this.props.radiusX != null ? this.props.radiusX : void 0;
      rYEnd = this.deltas.radiusY != null ? this.deltas.radiusY.end : this.props.radiusY != null ? this.props.radiusY : void 0;
      pointEnd = this.h.getRadialPoint({
        radius: rEnd,
        radiusX: rXEnd,
        radiusY: rYEnd,
        angle: i * step + this.props.angle,
        center: {
          x: this.props.center,
          y: this.props.center
        }
      });
      x = {};
      y = {};
      if (pointStart.x === pointEnd.x) {
        x = pointStart.x;
      } else {
        x[pointStart.x] = pointEnd.x;
      }
      if (pointStart.y === pointEnd.y) {
        y = pointStart.y;
      } else {
        y[pointStart.y] = pointEnd.y;
      }
      transit.o.x = x;
      transit.o.y = y;
      _results.push(transit.extendDefaults());
    }
    return _results;
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
    this.props.center = this.props.size / 2;
    return this.addBitOptions();
  };

  Burst.prototype.getOption = function(i) {
    var key, option, value, _ref;
    option = {};
    _ref = this.childDefaults;
    for (key in _ref) {
      value = _ref[key];
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
