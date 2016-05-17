
/* istanbul ignore next */

(function() {
  var Bit, Cross,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit')["default"] || require('./bit');

  Cross = (function(_super) {
    __extends(Cross, _super);

    function Cross() {
      return Cross.__super__.constructor.apply(this, arguments);
    }

    Cross.prototype._declareDefaults = function() {
      Cross.__super__._declareDefaults.apply(this, arguments);
      return this._defaults.shape = 'path';
    };

    Cross.prototype._draw = function() {
      var d, line1, line2, radiusX, radiusY, x, x1, x2, y, y1, y2;
      Cross.__super__._draw.apply(this, arguments);
      radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
      x = parseInt(this._props.x, 10);
      y = parseInt(this._props.y, 10);
      x1 = x - radiusX;
      x2 = x + radiusX;
      line1 = "M" + x1 + "," + this._props.y + " L" + x2 + "," + this._props.y;
      y1 = y - radiusY;
      y2 = y + radiusY;
      line2 = "M" + this._props.x + "," + y1 + " L" + this._props.x + "," + y2;
      d = "" + line1 + " " + line2;
      return this.setAttr({
        d: d
      });
    };

    Cross.prototype._getLength = function() {
      var radiusX, radiusY;
      radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
      return 2 * (radiusX + radiusY);
    };

    return Cross;

  })(Bit);

  module.exports = Cross;

}).call(this);
