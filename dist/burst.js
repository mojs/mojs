
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

  Burst.prototype.isPropsCalcLess = true;

  Burst.prototype.defaults = {
    points: 5,
    type: 'circle',
    degree: 360,
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
    opacity: 1,
    radius: {
      25: 75
    },
    angle: 0,
    size: null,
    sizeGap: 0,
    onInit: null,
    onStart: null,
    onComplete: null,
    onCompleteChain: null,
    onUpdate: null,
    duration: 500,
    delay: 0,
    repeat: 1,
    yoyo: false,
    easing: 'Linear.None',
    randomAngle: 0,
    randomRadius: 0,
    isSwirl: false,
    swirlFrequency: 3,
    swirlSize: 10
  };

  Burst.prototype.childDefaults = {
    strokeWidth: {
      2: 0
    },
    strokeOpacity: 1,
    strokeDasharray: '',
    strokeDashoffset: '',
    stroke: '#ff00ff',
    fill: 'transparent',
    fillOpacity: 'transparent',
    strokeLinecap: '',
    points: 5,
    type: 'circle',
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
    opacity: 1,
    radius: {
      7: 0
    },
    angle: 0,
    sizeGap: 0,
    onInit: null,
    onStart: null,
    onComplete: null,
    onCompleteChain: null,
    onUpdate: null,
    duration: null,
    delay: null,
    repeat: null,
    yoyo: null,
    easing: null
  };

  Burst.prototype.priorityOptionMap = {
    duration: 1,
    delay: 1,
    repeat: 1,
    easing: 1,
    yoyo: 1,
    swirlSize: 1,
    swirlFrequency: 1,
    isSwirl: 1
  };

  Burst.prototype.init = function() {
    this.childOptions = this.o.childOptions || {};
    h.extend(this.childOptions, this.childDefaults);
    delete this.o.childOptions;
    return Burst.__super__.init.apply(this, arguments);
  };

  Burst.prototype.run = function(o) {
    var i, tr, _results;
    Burst.__super__.run.apply(this, arguments);
    if (this.props.randomAngle || this.props.randomRadius || this.props.isSwirl) {
      i = this.transits.length;
      _results = [];
      while (i--) {
        tr = this.transits[i];
        this.props.randomAngle && tr.setProp({
          angleShift: this.generateRandomAngle()
        });
        this.props.randomRadius && tr.setProp({
          radiusScale: this.generateRandomRadius()
        });
        _results.push(this.props.isSwirl && tr.generateSwirl());
      }
      return _results;
    }
  };

  Burst.prototype.createBit = function() {
    var i, key, option, value, _i, _ref, _ref1, _results;
    this.transits = [];
    _results = [];
    for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      option = this.getOption(i);
      option.ctx = this.ctx;
      option.isDrawLess = option.isRunLess = option.isTweenLess = true;
      _ref1 = this.priorityOptionMap;
      for (key in _ref1) {
        value = _ref1[key];
        if (key !== 'isSwirl') {
          if (option[key] == null) {
            option[key] = this.o[key];
          }
        } else {
          if (option['isSwirlLess'] == null) {
            option['isSwirlLess'] = !this.props.isSwirl;
          }
        }
      }
      this.props.randomAngle && (option.angleShift = this.generateRandomAngle());
      this.props.randomRadius && (option.radiusScale = this.generateRandomRadius());
      _results.push(this.transits.push(new Swirl(option)));
    }
    return _results;
  };

  Burst.prototype.addBitOptions = function() {
    var i, pointEnd, pointStart, points, step, transit, x, y, _i, _len, _ref, _ref1, _ref2, _results;
    points = this.props.points;
    this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1;
    step = this.props.degree / this.degreeCnt;
    _ref = this.transits;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      transit = _ref[i];
      pointStart = this.h.getRadialPoint({
        radius: ((_ref1 = this.deltas.radius) != null ? _ref1.start : void 0) || this.props.radius,
        angle: i * step + this.props.angle,
        center: {
          x: this.props.center,
          y: this.props.center
        }
      });
      pointEnd = this.h.getRadialPoint({
        radius: ((_ref2 = this.deltas.radius) != null ? _ref2.end : void 0) || this.props.radius,
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
      this.transits[i].o.x = x;
      this.transits[i].o.y = y;
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
    _ref = this.childOptions;
    for (key in _ref) {
      value = _ref[key];
      option[key] = this.getPropByMod({
        propName: key,
        i: i
      });
    }
    return option;
  };

  Burst.prototype.getPropByMod = function(o) {
    var prop;
    prop = this[o.from || 'childOptions'][o.propName];
    if (this.h.isArray(prop)) {
      return prop[o.i % prop.length];
    } else {
      return prop;
    }
  };

  Burst.prototype.generateRandomAngle = function(i) {
    var end, randdomness, randomness, start;
    randomness = parseFloat(this.props.randomAngle);
    randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
    if (randomness) {
      start = (1 - randomness) * 180;
      end = (1 + randomness) * 180;
    } else {
      start = (1 - .5) * 180;
      end = (1 + .5) * 180;
    }
    return this.h.rand(start, end);
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

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Burst;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Burst = Burst;
}
