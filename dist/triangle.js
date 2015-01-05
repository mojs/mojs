
/* istanbul ignore next */
var Bit, Triangle, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

h = require('./h');

Triangle = (function(_super) {
  __extends(Triangle, _super);

  function Triangle() {
    return Triangle.__super__.constructor.apply(this, arguments);
  }

  Triangle.prototype.type = 'path';

  Triangle.prototype.draw = function() {
    var cnt, d, i, len, nextI, point, points, space, step, _i, _j, _len;
    cnt = 3;
    step = 360 / cnt;
    points = [];
    for (i = _i = 0; 0 <= cnt ? _i < cnt : _i > cnt; i = 0 <= cnt ? ++_i : --_i) {
      points.push(h.getRadialPoint({
        radius: this.props.radius,
        angle: i * step,
        center: {
          x: this.props.x,
          y: this.props.y
        }
      }));
    }
    d = '';
    len = points.length - 1;
    for (i = _j = 0, _len = points.length; _j < _len; i = ++_j) {
      point = points[i];
      nextI = i < len ? i + 1 : 0;
      space = i === 0 ? '' : ' ';
      d += "" + space + "M" + points[i].x + ", " + points[i].y + " L" + points[nextI].x + ", " + points[nextI].y;
    }
    this.setAttr({
      d: d
    });
    return Triangle.__super__.draw.apply(this, arguments);
  };

  return Triangle;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Triangle", [], function() {
    return Triangle;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Triangle;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Triangle = Triangle;
}
