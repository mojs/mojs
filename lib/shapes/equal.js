
/* istanbul ignore next */

(function() {
  var Bit, Equal,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit')["default"] || require('./bit');

  Equal = (function(_super) {
    __extends(Equal, _super);

    function Equal() {
      return Equal.__super__.constructor.apply(this, arguments);
    }

    Equal.prototype._declareDefaults = function() {
      Equal.__super__._declareDefaults.apply(this, arguments);
      this._defaults.tag = 'path';
      return this._defaults.points = 2;
    };

    Equal.prototype._draw = function() {
      var d, i, radiusX, radiusY, x, x1, x2, y, yStart, yStep, _i, _ref;
      Equal.__super__._draw.apply(this, arguments);
      if (!this._props.points) {
        return;
      }
      radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
      x = this._props.width / 2;
      y = this._props.height / 2;
      x1 = x - radiusX;
      x2 = x + radiusX;
      d = '';
      yStep = 2 * radiusY / (this._props.points - 1);
      yStart = y - radiusY;
      for (i = _i = 0, _ref = this._props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        y = "" + (i * yStep + yStart);
        d += "M" + x1 + ", " + y + " L" + x2 + ", " + y + " ";
      }
      return this.el.setAttribute('d', d);
    };

    Equal.prototype._getLength = function() {
      return 2 * (this._props.radiusX != null ? this._props.radiusX : this._props.radius);
    };

    return Equal;

  })(Bit);

  module.exports = Equal;

}).call(this);
