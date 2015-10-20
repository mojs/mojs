
/* istanbul ignore next */

(function() {
  var Bit, Circle,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit');

  Circle = (function(_super) {
    __extends(Circle, _super);

    function Circle() {
      return Circle.__super__.constructor.apply(this, arguments);
    }

    Circle.prototype.type = 'ellipse';

    Circle.prototype.draw = function() {
      var rx, ry;
      rx = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
      ry = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
      this.setAttrsIfChanged({
        rx: rx,
        ry: ry,
        cx: this.props.x,
        cy: this.props.y
      });
      return Circle.__super__.draw.apply(this, arguments);
    };

    Circle.prototype.getLength = function() {
      var radiusX, radiusY;
      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
      return 2 * Math.PI * Math.sqrt((Math.pow(radiusX, 2) + Math.pow(radiusY, 2)) / 2);
    };

    return Circle;

  })(Bit);

  module.exports = Circle;

}).call(this);
