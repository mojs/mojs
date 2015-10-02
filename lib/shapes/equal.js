
/* istanbul ignore next */

(function() {
  var Bit, Equal,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit');

  Equal = (function(_super) {
    __extends(Equal, _super);

    function Equal() {
      return Equal.__super__.constructor.apply(this, arguments);
    }

    Equal.prototype.type = 'path';

    Equal.prototype.ratio = 1.43;

    Equal.prototype.draw = function() {
      var d, i, radiusX, radiusY, x1, x2, y, yStart, yStep, _i, _ref;
      Equal.__super__.draw.apply(this, arguments);
      if (!this.props.points) {
        return;
      }
      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
      x1 = this.props.x - radiusX;
      x2 = this.props.x + radiusX;
      d = '';
      yStep = 2 * radiusY / (this.props.points - 1);
      yStart = this.props.y - radiusY;
      for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        y = "" + (i * yStep + yStart);
        d += "M" + x1 + ", " + y + " L" + x2 + ", " + y + " ";
      }
      return this.setAttr({
        d: d
      });
    };

    Equal.prototype.getLength = function() {
      return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
    };

    return Equal;

  })(Bit);

  module.exports = Equal;

}).call(this);
