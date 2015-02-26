
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
