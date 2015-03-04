
/* istanbul ignore next */
var Bit, Circle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Circle = (function(_super) {
  __extends(Circle, _super);

  function Circle() {
    return Circle.__super__.constructor.apply(this, arguments);
  }

  Circle.prototype.type = 'ellipse';

  Circle.prototype.draw = function() {
    this.setAttrIfChanged('rx', this.props.radiusX != null ? this.props.radiusX : this.props.radius);
    this.setAttrIfChanged('ry', this.props.radiusY != null ? this.props.radiusY : this.props.radius);
    this.setAttrIfChanged('cx', this.props.x);
    this.setAttrIfChanged('cy', this.props.y);
    return Circle.__super__.draw.apply(this, arguments);
  };

  Circle.prototype.getLength = function() {
    var radiusX, radiusY;
    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
    return 2 * Math.PI * Math.sqrt((radiusX * radiusX + radiusY * radiusY) / 2);
  };

  return Circle;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Circle", [], function() {
    return Circle;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Circle;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Circle = Circle;
}
