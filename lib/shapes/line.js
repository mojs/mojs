
/* istanbul ignore next */

(function() {
  var Bit, Line,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit')["default"] || require('./bit');

  Line = (function(_super) {
    __extends(Line, _super);

    function Line() {
      return Line.__super__.constructor.apply(this, arguments);
    }

    Line.prototype._declareDefaults = function() {
      Line.__super__._declareDefaults.apply(this, arguments);
      return this._defaults.tag = 'line';
    };

    Line.prototype._draw = function() {
      var radiusX, x, y;
      radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
      x = this._props.width / 2;
      y = this._props.height / 2;
      this._setAttrIfChanged('x1', x - radiusX);
      this._setAttrIfChanged('x2', x + radiusX);
      this._setAttrIfChanged('y1', y);
      this._setAttrIfChanged('y2', y);
      return Line.__super__._draw.apply(this, arguments);
    };

    return Line;

  })(Bit);

  module.exports = Line;

}).call(this);
