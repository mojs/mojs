
/* istanbul ignore next */

(function() {
  var Bit, Rect,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit');

  Rect = (function(_super) {
    __extends(Rect, _super);

    function Rect() {
      return Rect.__super__.constructor.apply(this, arguments);
    }

    Rect.prototype.type = 'rect';

    Rect.prototype.ratio = 1.43;

    Rect.prototype.draw = function() {
      var radiusX, radiusY;
      Rect.__super__.draw.apply(this, arguments);
      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
      return this.setAttrsIfChanged({
        width: 2 * radiusX,
        height: 2 * radiusY,
        x: this.props.x - radiusX,
        y: this.props.y - radiusY
      });
    };

    Rect.prototype.getLength = function() {
      var radiusX, radiusY;
      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
      return 2 * radiusX + 2 * radiusY;
    };

    return Rect;

  })(Bit);

  module.exports = Rect;

}).call(this);
