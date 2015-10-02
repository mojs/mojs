
/* istanbul ignore next */

(function() {
  var Bit, Zigzag,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit');

  Zigzag = (function(_super) {
    __extends(Zigzag, _super);

    function Zigzag() {
      return Zigzag.__super__.constructor.apply(this, arguments);
    }

    Zigzag.prototype.type = 'path';

    Zigzag.prototype.ratio = 1.43;

    Zigzag.prototype.draw = function() {
      var char, i, iX, iX2, iY, iY2, points, radiusX, radiusY, stepX, stepY, strokeWidth, xStart, yStart, _i, _ref;
      if (!this.props.points) {
        return;
      }
      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
      points = '';
      stepX = 2 * radiusX / this.props.points;
      stepY = 2 * radiusY / this.props.points;
      strokeWidth = this.props['stroke-width'];
      xStart = this.props.x - radiusX;
      yStart = this.props.y - radiusY;
      for (i = _i = _ref = this.props.points; _ref <= 0 ? _i < 0 : _i > 0; i = _ref <= 0 ? ++_i : --_i) {
        iX = xStart + i * stepX + strokeWidth;
        iY = yStart + i * stepY + strokeWidth;
        iX2 = xStart + (i - 1) * stepX + strokeWidth;
        iY2 = yStart + (i - 1) * stepY + strokeWidth;
        char = i === this.props.points ? 'M' : 'L';
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
