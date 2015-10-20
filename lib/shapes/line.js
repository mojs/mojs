
/* istanbul ignore next */

(function() {
  var Bit, Line,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bit = require('./bit');

  Line = (function(_super) {
    __extends(Line, _super);

    function Line() {
      return Line.__super__.constructor.apply(this, arguments);
    }

    Line.prototype.draw = function() {
      var radiusX;
      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
      this.setAttrsIfChanged({
        x1: this.props.x - radiusX,
        x2: this.props.x + radiusX,
        y1: this.props.y,
        y2: this.props.y
      });
      return Line.__super__.draw.apply(this, arguments);
    };

    return Line;

  })(Bit);

  module.exports = Line;

}).call(this);
