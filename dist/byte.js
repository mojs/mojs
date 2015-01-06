
/* istanbul ignore next */
var Bit, Byte, Circle, Line, Rect, elsMap, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Line = require('./line');

Circle = require('./circle');

Rect = require('./rect');

h = require('./h');

elsMap = {
  circle: Circle,
  line: Line,
  rect: Rect
};

Byte = (function(_super) {
  __extends(Byte, _super);

  function Byte() {
    return Byte.__super__.constructor.apply(this, arguments);
  }

  Byte.prototype.progress = 0;

  Byte.prototype.defaults = {
    radius: 50,
    strokeWidth: 2,
    stroke: '#ff00ff',
    fill: 'transparent',
    duration: 500,
    delay: 0,
    x: 0,
    y: 0,
    deg: 0,
    size: null
  };

  Byte.prototype.vars = function() {
    this.extendDefaults();
    this.calcTransform();
    return this.calcSize();
  };

  Byte.prototype.render = function() {
    var bitClass, size;
    if (this.o.ctx == null) {
      this.el = document.createElement('div');
      size = "" + (this.props.size / 16) + "rem";
      this.el.style.position = 'absolute';
      this.el.style.width = size;
      this.el.style.height = size;
      this.el.style['transform'] = 'translateZ(0px)';
      this.el.style["" + h.prefix.css + "transform"] = 'translateZ(0px)';
      this.ctx = document.createElementNS(this.ns, 'svg');
      this.ctx.style.position = 'absolute';
      this.ctx.style.width = '100%';
      this.ctx.style.height = '100%';
      this.el.appendChild(this.ctx);
      (this.o.parent || document.body).appendChild(this.el);
    } else {
      this.ctx = this.o.ctx;
    }
    bitClass = elsMap[this.o.type || this.type];
    this.bit = new bitClass({
      ctx: this.ctx,
      isDrawLess: true
    });
    return !this.o.isDrawLess && this.draw();
  };

  Byte.prototype.setProgress = function(progress) {
    var key, value, _ref;
    this.progress = progress < 0 || !progress ? 0 : progress > 1 ? 1 : progress;
    _ref = this.deltas;
    for (key in _ref) {
      value = _ref[key];
      this.props[key] = value.start + value.delta * this.progress;
    }
    return this.draw();
  };

  Byte.prototype.draw = function() {
    this.bit.setProp({
      x: this.props.center,
      y: this.props.center,
      stroke: this.props.stroke,
      strokeWidth: this.props.strokeWidth,
      strokeDasharray: this.props.strokeDasharray,
      strokeDashoffset: this.props.strokeDasharray,
      fill: this.props.fill,
      radius: this.props.radius,
      deg: this.props.deg
    });
    return this.bit.draw();
  };

  Byte.prototype.calcSize = function() {
    var dRadius, dStroke, radius, stroke;
    if ((this.o.size != null) || this.o.ctx) {
      return;
    }
    dRadius = this.deltas['radius'];
    dStroke = this.deltas['strokeWidth'];
    radius = dRadius != null ? Math.max(Math.abs(dRadius.start), Math.abs(dRadius.end)) : this.props.radius;
    stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this.props.strokeWidth;
    this.props.size = 2 * radius + stroke;
    return this.props.center = this.props.size / 2;
  };

  Byte.prototype.extendDefaults = function() {
    var defaultsValue, end, key, optionsValue, start, _ref, _results;
    if (this.props == null) {
      this.props = {};
    }
    if (this.deltas == null) {
      this.deltas = {};
    }
    _ref = this.defaults;
    _results = [];
    for (key in _ref) {
      defaultsValue = _ref[key];
      optionsValue = this.o[key];
      if (optionsValue && typeof optionsValue === 'object') {
        start = Object.keys(optionsValue);
        end = parseFloat(optionsValue[start]);
        start = parseFloat(start);
        this.deltas[key] = {
          start: start,
          end: end,
          delta: end - start
        };
        _results.push(this.props[key] = start);
      } else {
        _results.push(this.props[key] = this.o[key] || defaultsValue);
      }
    }
    return _results;
  };

  return Byte;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Byte", [], function() {
    return Byte;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Byte;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Byte = Byte;
}
