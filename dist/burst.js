
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

  Burst.prototype.deltasMap = {
    burstX: 1,
    burstY: 1,
    burstShiftX: 1,
    burstShiftY: 1,
    burstAngle: 1,
    burstDegree: 1,
    burstRadius: 1
  };

  Burst.prototype.defaults = {
    burstX: 0,
    burstY: 0,
    burstShiftX: 0,
    burstShiftY: 0,
    burstAngle: 0,
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
    type: 'circle',
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
    opacity: 1,
    radius: 20,
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
      option.isRunLess = true;
      _results.push(this.transits.push(new Transit(option)));
    }
    return _results;
  };

  Burst.prototype.draw = function() {
    var i, point, step, _results;
    step = this.props.burstDegree / this.props.points;
    i = this.transits.length;
    _results = [];
    while (i--) {
      point = this.h.getRadialPoint({
        radius: this.props.burstRadius,
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

  Burst.prototype.setElStyles = function() {
    var marginSize, size;
    size = "" + (this.props.size / this.h.remBase) + "rem";
    marginSize = "" + (-this.props.size / (2 * this.h.remBase)) + "rem";
    this.el.style.position = 'absolute';
    this.el.style.top = this.props.burstY;
    this.el.style.left = this.props.burstX;
    this.el.style.opacity = this.props.opacity;
    this.el.style.width = size;
    this.el.style.height = size;
    this.el.style['marginLeft'] = marginSize;
    this.el.style['marginTop'] = marginSize;
    return this.h.setPrefixedStyle(this.el, 'backface-visibility', 'hidden');
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
    selfSize = this.deltas.burstRadius ? (start = Math.abs(this.deltas.burstRadius.start), end = Math.abs(this.deltas.burstRadius.end), Math.max(start, end)) : parseFloat(this.props.burstRadius);
    this.props.size = largestSize / 2 + 2 * selfSize;
    return this.props.center = this.props.size / 2;
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
