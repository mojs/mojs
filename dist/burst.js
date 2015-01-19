
/* istanbul ignore next */
var Burst, Transit, bitsMap, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

bitsMap = require('./bitsMap');

Transit = require('./transit');

h = require('./h');

Burst = (function(_super) {
  __extends(Burst, _super);

  function Burst() {
    return Burst.__super__.constructor.apply(this, arguments);
  }

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
    isRandom: false,
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
    easing: 'Linear.None'
  };

  Burst.prototype.init = function() {
    this.childOptions = this.o.childOptions || {};
    h.extend(this.childOptions, this.childDefaults);
    delete this.o.childOptions;
    return Burst.__super__.init.apply(this, arguments);
  };

  Burst.prototype.run = function() {
    var i;
    if (this.props.isRandom) {
      i = this.transits.length;
      while (i--) {
        this.generateRandom(i);
      }
    }
    if (this.props.isSwirl) {
      i = this.transits.length;
      while (i--) {
        this.generateSign(i);
      }
    }
    return Burst.__super__.run.apply(this, arguments);
  };

  Burst.prototype.createBit = function() {
    var bitClass, i, option, _i, _ref, _results;
    this.transits = [];
    _results = [];
    for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      bitClass = bitsMap.getBit(this.o.type || this.type);
      option = this.getOption(i);
      option.ctx = this.ctx;
      option.isDrawLess = true;
      option.isRunLess = true;
      this.transits.push(new Transit(option));
      this.props.isRandom && this.generateRandom(i);
      _results.push(this.props.isSwirl && this.generateSign(i));
    }
    return _results;
  };

  Burst.prototype.draw = function(progress) {
    var angle, i, point, points, radius, step, transit;
    points = this.props.points;
    this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1;
    step = this.props.degree / this.degreeCnt;
    i = this.transits.length;
    while (i--) {
      transit = this.transits[i];
      radius = this.props.radius * (transit.radiusRand || 1);
      angle = i * step * (transit.stepRand || 1);
      if (this.props.isSwirl) {
        angle += this.getSwirl(progress, transit.signRand);
      }
      point = this.h.getRadialPoint({
        radius: radius,
        angle: angle,
        center: {
          x: this.props.center,
          y: this.props.center
        }
      });
      transit.setProp({
        x: point.x,
        y: point.y,
        angle: angle - 90
      });
    }
    return this.drawEl();
  };

  Burst.prototype.setProgress = function(progress) {
    var i, _results;
    Burst.__super__.setProgress.apply(this, arguments);
    i = this.transits.length;
    _results = [];
    while (i--) {
      this.transits[i].setProgress(progress);
      _results.push(this.transits[i].draw());
    }
    return _results;
  };

  Burst.prototype.calcSize = function() {
    var end, i, largestSize, selfSize, start, transit, _i, _len, _ref;
    largestSize = -1;
    _ref = this.transits;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      transit = _ref[i];
      if (largestSize < transit.props.size) {
        largestSize = transit.props.size;
      }
    }
    selfSize = this.deltas.radius ? (start = Math.abs(this.deltas.radius.start), end = Math.abs(this.deltas.radius.end), Math.max(start, end)) : parseFloat(this.props.radius);
    this.props.size = largestSize + 2 * selfSize;
    return this.props.center = this.props.size / 2;
  };

  Burst.prototype.getOption = function(i) {
    var key, option, value, _ref;
    option = {};
    _ref = this.childOptions;
    for (key in _ref) {
      value = _ref[key];
      option[key] = this.getPropByMod(key, i);
    }
    return option;
  };

  Burst.prototype.getPropByMod = function(name, i) {
    var prop;
    prop = this.childOptions[name];
    if (this.h.isArray(prop)) {
      return prop[i % prop.length];
    } else {
      return prop;
    }
  };

  Burst.prototype.generateRandom = function(i) {
    this.transits[i].radiusRand = this.h.rand(50, 100) / 100;
    return this.transits[i].stepRand = this.h.rand(75, 125) / 100 + this.h.rand(0, 5) * 90;
  };

  Burst.prototype.generateSign = function(i) {
    return this.transits[i].signRand = this.h.rand(0, 1) ? -1 : 1;
  };

  Burst.prototype.getSwirl = function(progress, sign) {
    return sign * this.props.swirlSize * Math.sin(this.props.swirlFrequency * progress);
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
