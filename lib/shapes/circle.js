
/* istanbul ignore next */

(function() {
  var Bit, Circle,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit')["default"];

  Circle = (function(_super) {
    __extends(Circle, _super);

    function Circle() {
      return Circle.__super__.constructor.apply(this, arguments);
    }

    Circle.prototype._declareDefaults = function() {
      Circle.__super__._declareDefaults.apply(this, arguments);
      return this._defaults.shape = 'ellipse';
    };

    Circle.prototype.draw = function() {
      var rx, ry;
      rx = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      ry = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
      this.setAttrIfChanged('rx', rx);
      this.setAttrIfChanged('ry', ry);
      this.setAttrIfChanged('cx', this._props.x);
      this.setAttrIfChanged('cy', this._props.y);
      return Circle.__super__.draw.apply(this, arguments);
    };

    Circle.prototype.getLength = function() {
      var radiusX, radiusY;
      radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
      return 2 * Math.PI * Math.sqrt((radiusX * radiusX + radiusY * radiusY) / 2);
    };

    return Circle;

  })(Bit);

  module.exports = Circle;

}).call(this);
