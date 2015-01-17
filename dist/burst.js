
/* istanbul ignore next */
var Burst, Transit, bitsMap,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

bitsMap = require('./bitsMap');

Transit = require('./transit');

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
    easing: 'Linear.None'
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
    var key, value, _base, _ref;
    this.childOptions = this.o.childOptions || {};
    _ref = this.childDefaults;
    for (key in _ref) {
      value = _ref[key];
      if ((_base = this.childOptions)[key] == null) {
        _base[key] = this.childDefaults[key];
      }
    }
    delete this.o.childOptions;
    return Burst.__super__.init.apply(this, arguments);
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
      _results.push(this.transits.push(new Transit(option)));
    }
    return _results;
  };

  Burst.prototype.draw = function() {
    var i, point, points, step, _results;
    points = this.props.points;
    this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1;
    step = this.props.degree / this.degreeCnt;
    i = this.transits.length;
    _results = [];
    while (i--) {
      point = this.h.getRadialPoint({
        radius: this.props.radius,
        angle: i * step,
        center: {
          x: this.props.center,
          y: this.props.center
        }
      });
      _results.push(this.transits[i].setProp({
        x: point.x,
        y: point.y
      }));
    }
    return _results;
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
      return this.childOptions[name][i % prop.length];
    } else {
      return prop;
    }
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
