
/* istanbul ignore next */
var Bit, Triangle, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

h = require('./h');

Triangle = (function(_super) {
  __extends(Triangle, _super);

  function Triangle() {
    return Triangle.__super__.constructor.apply(this, arguments);
  }

  Triangle.prototype.type = 'polygon';

  Triangle.prototype.draw = function() {
    !this.isDraw && this.drawShape();
    return Triangle.__super__.draw.apply(this, arguments);
  };

  Triangle.prototype.drawShape = function() {
    var d, i, point, step, _i, _j, _len, _ref, _ref1;
    this.isDraw = true;
    step = 360 / this.props.points;
    this.radialPoints = [];
    for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      this.radialPoints.push(h.getRadialPoint({
        radius: this.props.radius,
        angle: (i * step) + this.props.deg,
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
      d += "" + point.x + "," + point.y + " ";
    }
    return this.setAttr({
      points: d
    });
  };

  return Triangle;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Triangle", [], function() {
    return Triangle;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Triangle;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Triangle = Triangle;
}
