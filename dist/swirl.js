
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

  Swirl.prototype.extendDefaults = function() {
    var val, x, y;
    Swirl.__super__.extendDefaults.apply(this, arguments);
    x = this.o.x && typeof this.o.x === 'object' ? (val = this.h.parseDelta('x', this.o.x), console.log(val), {
      start: val.start.value,
      end: val.end.value,
      delta: val.delta,
      units: val.end.unit
    }) : (x = parseFloat(this.o.x || this.defaults.x), {
      start: x,
      end: x,
      delta: 0,
      units: 'px'
    });
    y = this.o.y && typeof this.o.y === 'object' ? (val = this.h.parseDelta('y', this.o.y), {
      start: val.start.value,
      end: val.end.value,
      delta: val.delta,
      units: val.end.unit
    }) : (y = parseFloat(this.o.y || this.defaults.y), {
      start: y,
      end: y,
      delta: 0,
      units: 'px'
    });
    this.positionDelta = {
      radius: Math.max(Math.abs(x.delta), Math.abs(y.delta)),
      angle: 90 + Math.atan(y.delta / x.delta) * (180 / Math.PI),
      x: x,
      y: y
    };
    this.props.x = "" + x.start + x.units;
    return this.props.y = "" + y.start + y.units;
  };

  Swirl.prototype.setProgress = function(progress) {
    var point;
    Swirl.__super__.setProgress.apply(this, arguments);
    point = this.h.getRadialPoint({
      angle: this.positionDelta.angle,
      radius: this.positionDelta.radius * progress,
      center: {
        x: this.positionDelta.x.start,
        y: this.positionDelta.y.start
      }
    });
    this.o.isIt && console.log(point);
    this.props.x = point.x.toFixed(4) + this.positionDelta.y.units;
    return this.props.y = point.y.toFixed(4) + this.positionDelta.y.units;
  };

  return Swirl;

})(Transit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Swirl", [], function() {
    return Swirl;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Swirl;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Swirl = Swirl;
}
