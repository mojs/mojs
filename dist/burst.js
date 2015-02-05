
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
    angle: 0,
    size: null,
    sizeGap: 0,
    onStart: null,
    onComplete: null,
    onCompleteChain: null,
    onUpdate: null
  };

  Burst.prototype.childDefaults = {
    radius: {
      7: 0
    },
    points: 3,
    angle: 0,
    onStart: null,
    onComplete: null,
    onUpdate: null,
    duration: 500,
    delay: 0,
    repeat: 1,
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

  Burst.prototype.run = function(o) {
    var i, option, tr, _results;
    Burst.__super__.run.apply(this, arguments);
    i = this.transits.length;
    _results = [];
    while (i--) {
      tr = this.transits[i];
      if (this.props.randomAngle || this.props.randomRadius) {
        this.props.randomAngle && tr.setProp({
          angleShift: this.generateRandomAngle()
        });
        this.props.randomRadius && tr.setProp({
          radiusScale: this.generateRandomRadius()
        });
      }
      option = this.getOption(i);
      option.ctx = this.ctx;
      _results.push(option.isDrawLess = option.isRunLess = option.isTweenLess = true);
    }
    return _results;
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
    var i, pointEnd, pointStart, points, step, transit, x, y, _i, _len, _ref, _results;
    points = this.props.count;
    this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1;
    step = this.props.degree / this.degreeCnt;
    _ref = this.transits;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      transit = _ref[i];
      pointStart = this.h.getRadialPoint({
        radius: this.deltas.radius != null ? this.deltas.radius.start : this.props.radius,
        angle: i * step + this.props.angle,
        center: {
          x: this.props.center,
          y: this.props.center
        }
      });
      pointEnd = this.h.getRadialPoint({
        radius: this.deltas.radius != null ? this.deltas.radius.end : this.props.radius,
        angle: i * step + this.props.angle,
        center: {
          x: this.props.center,
          y: this.props.center
        }
      });
      x = {};
      y = {};
      x[pointStart.x] = pointEnd.x;
      y[pointStart.y] = pointEnd.y;
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
    var i;
    this.tween = new Tween({
      onUpdate: (function(_this) {
        return function(p) {
          var _ref;
          _this.setProgress(p);
          return (_ref = _this.props.onUpdate) != null ? _ref.apply(_this, arguments) : void 0;
        };
      })(this),
      onComplete: (function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
        };
      })(this),
      onStart: (function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
        };
      })(this)
    });
    i = this.transits.length;
    while (i--) {
      this.tween.add(this.transits[i].timeline);
    }
    return !this.o.isRunLess && this.startTween();
  };

  Burst.prototype.calcSize = function() {
    var end, i, largestSize, selfSize, start, transit, _i, _len, _ref;
    largestSize = -1;
    _ref = this.transits;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      transit = _ref[i];
      transit.calcSize();
      if (largestSize < transit.props.size) {
        largestSize = transit.props.size;
      }
    }
    selfSize = this.deltas.radius ? (start = Math.abs(this.deltas.radius.start), end = Math.abs(this.deltas.radius.end), Math.max(start, end)) : parseFloat(this.props.radius);
    this.props.size = largestSize + 2 * selfSize;
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
        i: i
      });
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
