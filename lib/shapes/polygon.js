
/* istanbul ignore next */

(function() {
  var Bit, Polygon, h,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit');

  h = require('../h');

  Polygon = (function(_super) {
    __extends(Polygon, _super);

    function Polygon() {
      return Polygon.__super__.constructor.apply(this, arguments);
    }

    Polygon.prototype.type = 'path';

    Polygon.prototype.draw = function() {
      this.drawShape();
      return Polygon.__super__.draw.apply(this, arguments);
    };

    Polygon.prototype.drawShape = function() {
      var char, d, i, point, step, _i, _j, _len, _ref, _ref1;
      step = 360 / this.props.points;
      this.radialPoints = [];
      for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.radialPoints.push(h.getRadialPoint({
          radius: this.props.radius,
          radiusX: this.props.radiusX,
          radiusY: this.props.radiusY,
          angle: i * step,
          center: {
            x: this.props.x,
            y: this.props.y
          }
        }));
      }
      d = '';
      _ref1 = this.radialPoints;
      for (i = _j = 0, _len = _ref1.length; _j < _len; i = ++_j) {
        point = _ref1[i];
        char = i === 0 ? 'M' : 'L';
        d += "" + char + (point.x.toFixed(4)) + "," + (point.y.toFixed(4)) + " ";
      }
      return this.setAttr({
        d: d += 'z'
      });
    };

    Polygon.prototype.getLength = function() {
      return this.el.getTotalLength();
    };

    return Polygon;

  })(Bit);

  module.exports = Polygon;

}).call(this);
