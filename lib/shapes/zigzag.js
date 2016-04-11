
/* istanbul ignore next */

(function() {
  var Bit, Zigzag,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit')["default"];

  Zigzag = (function(_super) {
    __extends(Zigzag, _super);

    function Zigzag() {
      return Zigzag.__super__.constructor.apply(this, arguments);
    }

    Zigzag.prototype._declareDefaults = function() {
      Zigzag.__super__._declareDefaults.apply(this, arguments);
      this._defaults.shape = 'path';
      return this._defaults.ratio = 1.43;
    };

    Zigzag.prototype.draw = function() {
      var char, i, iX, iX2, iY, iY2, points, radiusX, radiusY, stepX, stepY, strokeWidth, xStart, yStart, _i, _ref;
      if (!this._props.points) {
        return;
      }
      radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
      points = '';
      stepX = 2 * radiusX / this._props.points;
      stepY = 2 * radiusY / this._props.points;
      strokeWidth = this._props['stroke-width'];
      xStart = this._props.x - radiusX;
      yStart = this._props.y - radiusY;
      for (i = _i = _ref = this._props.points; _ref <= 0 ? _i < 0 : _i > 0; i = _ref <= 0 ? ++_i : --_i) {
        iX = xStart + i * stepX + strokeWidth;
        iY = yStart + i * stepY + strokeWidth;
        iX2 = xStart + (i - 1) * stepX + strokeWidth;
        iY2 = yStart + (i - 1) * stepY + strokeWidth;
        char = i === this._props.points ? 'M' : 'L';
        points += "" + char + iX + "," + iY + " l0, -" + stepY + " l-" + stepX + ", 0";
      }
      this.setAttr({
        d: points
      });
      return Zigzag.__super__.draw.apply(this, arguments);
    };

    return Zigzag;

  })(Bit);

  module.exports = Zigzag;

}).call(this);
