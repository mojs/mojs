
/* istanbul ignore next */

(function() {
  var Bit, Equal,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit')["default"];

  Equal = (function(_super) {
    __extends(Equal, _super);

    function Equal() {
      return Equal.__super__.constructor.apply(this, arguments);
    }

    Equal.prototype._declareDefaults = function() {
      Equal.__super__._declareDefaults.apply(this, arguments);
      this._defaults.shape = 'path';
      return this._defaults.ratio = 1.43;
    };

    Equal.prototype.draw = function() {
      var d, i, radiusX, radiusY, x1, x2, y, yStart, yStep, _i, _ref;
      Equal.__super__.draw.apply(this, arguments);
      if (!this._props.points) {
        return;
      }
      radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
      x1 = this._props.x - radiusX;
      x2 = this._props.x + radiusX;
      d = '';
      yStep = 2 * radiusY / (this._props.points - 1);
      yStart = this._props.y - radiusY;
      for (i = _i = 0, _ref = this._props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        y = "" + (i * yStep + yStart);
        d += "M" + x1 + ", " + y + " L" + x2 + ", " + y + " ";
      }
      return this.setAttr({
        d: d
      });
    };

    Equal.prototype.getLength = function() {
      return 2 * (this._props.radiusX != null ? this._props.radiusX : this._props.radius);
    };

    return Equal;

  })(Bit);

  module.exports = Equal;

}).call(this);
