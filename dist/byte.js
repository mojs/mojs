
/* istanbul ignore next */
var Bit, Byte, Circle, Line, Rect, TWEEN, Triangle, elsMap, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Line = require('./line');

Circle = require('./circle');

Triangle = require('./triangle');

Rect = require('./rect');

h = require('./h');

TWEEN = require('./vendor/tween');

elsMap = {
  circle: Circle,
  triangle: Triangle,
  line: Line,
  rect: Rect
};

Byte = (function(_super) {
  __extends(Byte, _super);

  function Byte() {
    return Byte.__super__.constructor.apply(this, arguments);
  }

  Byte.prototype.TWEEN = TWEEN;

  Byte.prototype.progress = 0;

  Byte.prototype.defaults = {
    radius: 50,
    strokeWidth: 2,
    strokeOpacity: 1,
    strokeDasharray: '',
    strokeDashoffset: '',
    stroke: '#ff00ff',
    fill: 'transparent',
    fillOpacity: 'transparent',
    duration: 500,
    delay: 0,
    x: 0,
    y: 0,
    deg: 0,
    size: null
  };

  Byte.prototype.vars = function() {
    this.extendDefaults();
    return this.calcTransform();
  };

  Byte.prototype.calcTransform = function() {
    return this.props.transform = "rotate(" + this.props.deg + "," + this.props.center + "," + this.props.center + ")";
  };

  Byte.prototype.render = function() {
    var size;
    if (this.o.ctx == null) {
      this.ctx = document.createElementNS(this.ns, 'svg');
      this.ctx.style.position = 'absolute';
      this.ctx.style.width = '100%';
      this.ctx.style.height = '100%';
      this.createBit();
      this.calcSize();
      this.el = document.createElement('div');
      size = "" + (this.props.size / 16) + "rem";
      this.el.style.position = 'absolute';
      this.el.style.width = size;
      this.el.style.height = size;
      this.el.style['backface-visibility'] = 'hidden';
      this.el.style["" + h.prefix.css + "backface-visibility"] = 'hidden';
      this.el.appendChild(this.ctx);
      (this.o.parent || document.body).appendChild(this.el);
    } else {
      this.ctx = this.o.ctx;
      this.createBit();
    }
    !this.o.isDrawLess && this.draw();
    return this.createTween();
  };

  Byte.prototype.createBit = function() {
    var bitClass;
    bitClass = elsMap[this.o.type || this.type];
    return this.bit = new bitClass({
      ctx: this.ctx,
      isDrawLess: true
    });
  };

  Byte.prototype.setProgress = function(progress) {
    var a, b, g, i, key, num, r, value, _i, _len, _ref, _ref1;
    this.progress = progress < 0 || !progress ? 0 : progress > 1 ? 1 : progress;
    _ref = this.deltas;
    for (key in _ref) {
      value = _ref[key];
      if (value.delta instanceof Array) {
        this.props[key] = '';
        _ref1 = value.delta;
        for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
          num = _ref1[i];
          this.props[key] += "" + (value.start[i] + num * this.progress) + " ";
        }
      } else {
        if (value.delta.r == null) {
          this.props[key] = value.start + value.delta * this.progress;
        } else {
          r = parseInt(value.start.r + value.delta.r * this.progress, 10);
          g = parseInt(value.start.g + value.delta.g * this.progress, 10);
          b = parseInt(value.start.b + value.delta.b * this.progress, 10);
          a = parseInt(value.start.a + value.delta.a * this.progress, 10);
          this.props[key] = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }
      }
    }
    return this.draw();
  };

  Byte.prototype.draw = function() {
    this.bit.setProp({
      x: this.props.center,
      y: this.props.center,
      stroke: this.props.stroke,
      strokeWidth: this.props.strokeWidth,
      strokeOpacity: this.props.strokeOpacity,
      strokeDasharray: this.props.strokeDasharray,
      strokeDashoffset: this.props.strokeDasharray,
      fill: this.props.fill,
      fillOpacity: this.props.fillOpacity,
      radius: this.props.radius,
      transform: this.calcTransform()
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
    this.props.size *= this.bit.ratio;
    return this.props.center = this.props.size / 2;
  };

  Byte.prototype.extendDefaults = function() {
    var defaultsValue, end, endArr, endColorObj, key, optionsValue, start, startArr, startColorObj, _ref, _results;
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
        start = Object.keys(optionsValue)[0];
        if (isNaN(parseFloat(start))) {
          end = optionsValue[start];
          startColorObj = h.makeColorObj(start);
          endColorObj = h.makeColorObj(end);
          _results.push(this.deltas[key] = {
            start: startColorObj,
            end: endColorObj,
            delta: {
              r: endColorObj.r - startColorObj.r,
              g: endColorObj.g - startColorObj.g,
              b: endColorObj.b - startColorObj.b,
              a: endColorObj.a - startColorObj.a
            }
          });
        } else if (key === 'strokeDasharray' || key === 'strokeDashoffset') {
          end = optionsValue[start];
          startArr = h.strToArr(start);
          endArr = h.strToArr(end);
          h.normDashArrays(startArr, endArr);
          _results.push(this.deltas[key] = {
            start: startArr,
            end: endArr,
            delta: h.calcArrDelta(startArr, endArr)
          });
        } else {
          end = parseFloat(optionsValue[start]);
          start = parseFloat(start);
          this.deltas[key] = {
            start: start,
            end: end,
            delta: end - start
          };
          _results.push(this.props[key] = start);
        }
      } else {
        _results.push(this.props[key] = this.o[key] || defaultsValue);
      }
    }
    return _results;
  };

  Byte.prototype.createTween = function() {
    this.tween = new this.TWEEN.Tween({
      p: 0
    }).to({
      p: 1
    });
    return console.log(this.tween);
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
