
/* istanbul ignore next */
var Burst, Transit, bitsMap, burst,
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
    burstPoints: 5,
    burstRadius: {
      50: 75
    },
    burstDegree: 360,
    strokeWidth: 2,
    strokeOpacity: 1,
    strokeDasharray: '',
    strokeDashoffset: '',
    stroke: '#ff00ff',
    fill: 'transparent',
    fillOpacity: 'transparent',
    strokeLinecap: '',
    points: 5,
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
    opacity: 1,
    radius: 50,
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

  Burst.prototype.createBit = function() {
    var bitClass, i, option, _i, _ref, _results;
    this.transits = [];
    _results = [];
    for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      bitClass = bitsMap.getBit(this.o.type || this.type);
      option = this.getOption(i);
      option.ctx = this.ctx;
      option.isDrawLess = true;
      _results.push(this.transits.push(new Transit(option)));
    }
    return _results;
  };

  Burst.prototype.draw = function() {};

  Burst.prototype.calcSize = function() {
    var i, largestSize, transit, _i, _len, _ref;
    largestSize = -1;
    _ref = this.transits;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      transit = _ref[i];
      if (largestSize < transit.props.size) {
        largestSize = transit.props.size;
      }
    }
    console.log(this.deltas);
    this.props.size = largestSize;
    return this.props.center = largestSize / 2;
  };

  Burst.prototype.getOption = function(i) {
    var key, option, value, _ref;
    option = {};
    _ref = this.o;
    for (key in _ref) {
      value = _ref[key];
      option[key] = this.getPropByMod(key, i);
    }
    return option;
  };

  Burst.prototype.getPropByMod = function(name, i) {
    var prop;
    prop = this.o[name];
    if (this.h.isArray(prop)) {
      return this.o[name][i % prop.length];
    } else {
      return prop;
    }
  };

  return Burst;

})(Transit);

burst = new Burst;


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
