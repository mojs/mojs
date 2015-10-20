
/* istanbul ignore next */

(function() {
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
      var d, line1, line2, radiusX, radiusY, x1, x2, y1, y2;
      Cross.__super__.draw.apply(this, arguments);
      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
      x1 = this.props.x - radiusX;
      x2 = this.props.x + radiusX;
      line1 = "M" + x1 + "," + this.props.y + " L" + x2 + "," + this.props.y;
      y1 = this.props.y - radiusY;
      y2 = this.props.y + radiusY;
      line2 = "M" + this.props.x + "," + y1 + " L" + this.props.x + "," + y2;
      d = "" + line1 + " " + line2;
      return this.setAttr({
        d: d
      });
    };

    Cross.prototype.getLength = function() {
      var radiusX, radiusY;
      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
      return 2 * (radiusX + radiusY);
    };

    return Cross;

  })(Bit);

  module.exports = Cross;

}).call(this);
