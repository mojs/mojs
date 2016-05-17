
/* istanbul ignore next */

(function() {
  var Bit, Rect,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit')["default"] || require('./bit');

  Rect = (function(_super) {
    __extends(Rect, _super);

    function Rect() {
      return Rect.__super__.constructor.apply(this, arguments);
    }

    Rect.prototype._declareDefaults = function() {
      Rect.__super__._declareDefaults.apply(this, arguments);
      this._defaults.tag = 'rect';
      this._defaults.rx = 0;
      return this._defaults.ry = 0;
    };

    Rect.prototype._draw = function() {
      var p, radiusX, radiusY;
      Rect.__super__._draw.apply(this, arguments);
      p = this._props;
      radiusX = p.radiusX != null ? p.radiusX : p.radius;
      radiusY = p.radiusY != null ? p.radiusY : p.radius;
      this._setAttrIfChanged('width', 2 * radiusX);
      this._setAttrIfChanged('height', 2 * radiusY);
      this._setAttrIfChanged('x', (p.width / 2) - radiusX);
      this._setAttrIfChanged('y', (p.height / 2) - radiusY);
      this._setAttrIfChanged('rx', p.rx);
      return this._setAttrIfChanged('ry', p.ry);
    };

    Rect.prototype._getLength = function() {
      var radiusX, radiusY;
      radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
      return 2 * (2 * radiusX + 2 * radiusY);
    };

    return Rect;

  })(Bit);

  module.exports = Rect;

}).call(this);
