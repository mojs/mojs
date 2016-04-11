
/* istanbul ignore next */

(function() {
  var Bit, Rect,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit')["default"];

  Rect = (function(_super) {
    __extends(Rect, _super);

    function Rect() {
      return Rect.__super__.constructor.apply(this, arguments);
    }

    Rect.prototype._declareDefaults = function() {
      Rect.__super__._declareDefaults.apply(this, arguments);
      this._defaults.shape = 'rect';
      return this._defaults.ratio = 1.43;
    };

    Rect.prototype.draw = function() {
      var radiusX, radiusY;
      Rect.__super__.draw.apply(this, arguments);
      radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
      return this.setAttrsIfChanged({
        width: 2 * radiusX,
        height: 2 * radiusY,
        x: parseFloat(this._props.x) - radiusX,
        y: parseFloat(this._props.y) - radiusY,
        rx: this._props.rx,
        ry: this._props.ry
      });
    };

    Rect.prototype.getLength = function() {
      var radiusX, radiusY;
      radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
      return 2 * radiusX + 2 * radiusY;
    };

    return Rect;

  })(Bit);

  module.exports = Rect;

}).call(this);
