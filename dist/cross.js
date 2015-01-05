
/* istanbul ignore next */
var Bit, Cross,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Cross = (function(_super) {
  __extends(Cross, _super);

  function Cross() {
    return Cross.__super__.constructor.apply(this, arguments);
  }

  Cross.prototype.type = 'path';

  Cross.prototype.draw = function() {
    var d, line1, line2, x1, x2, y1, y2;
    Cross.__super__.draw.apply(this, arguments);
    x1 = this.props.x - this.props.radius;
    x2 = this.props.x + this.props.radius;
    line1 = "M" + x1 + "," + this.props.y + " L" + x2 + "," + this.props.y;
    y1 = this.props.y - this.props.radius;
    y2 = this.props.y + this.props.radius;
    line2 = "M" + this.props.x + "," + y1 + " L" + this.props.x + "," + y2;
    d = "" + line1 + " " + line2;
    return this.setAttr({
      d: d
    });
  };

  return Cross;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Cross", [], function() {
    return Cross;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Cross;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Cross = Cross;
}
