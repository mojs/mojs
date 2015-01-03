
/* istanbul ignore next */
var Bit, Line,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Line = (function(_super) {
  __extends(Line, _super);

  function Line() {
    return Line.__super__.constructor.apply(this, arguments);
  }

  Line.prototype.draw = function() {
    return this.setAttr({
      x1: 0,
      x2: 2 * this.props.radius,
      y1: this.props.radius,
      y2: this.props.radius,
      stroke: this.props.strokeColor,
      strokeWidth: this.props.strokeWidth,
      transform: this.props.transform
    });
  };

  return Line;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Line", [], function() {
    return Line;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Line;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Line = Line;
}
