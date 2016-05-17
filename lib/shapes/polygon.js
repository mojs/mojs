
/* istanbul ignore next */

(function() {
  var Bit, Polygon, h,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit')["default"] || require('./bit');

  h = require('../h');

  Polygon = (function(_super) {
    __extends(Polygon, _super);

    function Polygon() {
      return Polygon.__super__.constructor.apply(this, arguments);
    }


    /*
      Method to declare defaults.
      @overrides @ Bit
     */

    Polygon.prototype._declareDefaults = function() {
      Polygon.__super__._declareDefaults.apply(this, arguments);
      this._defaults.tag = 'path';
      return this._defaults.points = 3;
    };


    /*
      Method to draw the shape.
      @overrides @ Bit
     */

    Polygon.prototype._draw = function() {
      var char, d, i, p, point, step, _i, _j, _len, _ref, _ref1;
      p = this._props;
      step = 360 / this._props.points;
      if (this._radialPoints == null) {
        this._radialPoints = [];
      } else {
        this._radialPoints.length = 0;
      }
      for (i = _i = 0, _ref = this._props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        this._radialPoints.push(h.getRadialPoint({
          radius: this._props.radius,
          radiusX: this._props.radiusX,
          radiusY: this._props.radiusY,
          angle: i * step,
          center: {
            x: p.width / 2,
            y: p.height / 2
          }
        }));
      }
      d = '';
      _ref1 = this._radialPoints;
      for (i = _j = 0, _len = _ref1.length; _j < _len; i = ++_j) {
        point = _ref1[i];
        char = i === 0 ? 'M' : 'L';
        d += "" + char + (point.x.toFixed(4)) + "," + (point.y.toFixed(4)) + " ";
      }
      this.el.setAttribute('d', (d += 'z'));
      return Polygon.__super__._draw.apply(this, arguments);
    };


    /*
      Method to get length of the shape.
      @overrides @ Bit
     */

    Polygon.prototype._getLength = function() {
      return this._getPointsPerimiter(this._radialPoints);
    };

    return Polygon;

  })(Bit);

  module.exports = Polygon;

}).call(this);
