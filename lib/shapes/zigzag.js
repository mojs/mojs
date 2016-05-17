
/* istanbul ignore next */

(function() {
  var Bit, Zigzag,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit')["default"] || require('./bit');

  Zigzag = (function(_super) {
    __extends(Zigzag, _super);

    function Zigzag() {
      return Zigzag.__super__.constructor.apply(this, arguments);
    }

    Zigzag.prototype._declareDefaults = function() {
      Zigzag.__super__._declareDefaults.apply(this, arguments);
      this._defaults.tag = 'path';
      return this._defaults.points = 3;
    };

    Zigzag.prototype._draw = function() {
      var currentX, currentY, delta, i, isPoints, isRadiusX, isRadiusY, length, p, points, radiusX, radiusY, stepX, x, y, yFlip, _i, _ref;
      Zigzag.__super__._draw.apply(this, arguments);
      p = this._props;
      if (!this._props.points) {
        return;
      }
      radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
      isRadiusX = radiusX === this._prevRadiusX;
      isRadiusY = radiusY === this._prevRadiusY;
      isPoints = p.points === this._prevPoints;
      if (isRadiusX && isRadiusY && isPoints) {
        return;
      }
      x = p.width / 2;
      y = p.height / 2;
      currentX = x - radiusX;
      currentY = y;
      stepX = (2 * radiusX) / (p.points - 1);
      yFlip = -1;
      delta = Math.sqrt(stepX * stepX + radiusY * radiusY);
      length = -delta;
      points = "M" + currentX + ", " + y + " ";
      for (i = _i = 0, _ref = p.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        points += "L" + currentX + ", " + currentY + " ";
        currentX += stepX;
        length += delta;
        currentY = yFlip === -1 ? y - radiusY : y;
        yFlip = -yFlip;
      }
      this._length = length;
      this.el.setAttribute('d', points);
      this._prevPoints = p.points;
      this._prevRadiusX = radiusX;
      return this._prevRadiusY = radiusY;
    };

    Zigzag.prototype._getLength = function() {
      return this._length;
    };

    return Zigzag;

  })(Bit);

  module.exports = Zigzag;

}).call(this);
