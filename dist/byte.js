
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
    strokeWidth: 2,
    strokeOpacity: 1,
    strokeDasharray: '',
    strokeDashoffset: '',
    stroke: '#ff00ff',
    fill: 'transparent',
    fillOpacity: 'transparent',
    strokeLinecap: '',
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
    opacity: 1,
    radius: 50,
    deg: 0,
    size: null,
    sizeGap: 0,
    onStart: null,
    onComplete: null,
    onUpdate: null,
    duration: 500,
    delay: 0,
    repeat: 1,
    yoyo: false,
    easing: 'Linear.None'
  };

  Byte.prototype.vars = function() {
    this.h = h;
    if (this.chainArr == null) {
      this.chainArr = [];
    }
    this.extendDefaults();
    return this.calcTransform();
  };

  Byte.prototype.calcTransform = function() {
    return this.props.transform = "rotate(" + this.props.deg + "," + this.props.center + "," + this.props.center + ")";
  };

  Byte.prototype.render = function() {
    var size;
    if (!this.isRendered) {
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
        this.el.style.top = this.props.y.string;
        this.el.style.left = this.props.x.string;
        this.el.style.opacity = this.props.opacity;
        this.el.style.width = size;
        this.el.style.height = size;
        this.h.setPrefixedStyle(this.el, 'backface-visibility', 'hidden');
        this.el.appendChild(this.ctx);
        (this.o.parent || document.body).appendChild(this.el);
      } else {
        this.ctx = this.o.ctx;
        this.createBit();
      }
      this.isRendered = true;
    }
    !this.o.isDrawLess && this.draw();
    this.createTween();
    return this;
  };

  Byte.prototype.chain = function(options) {
    this.chainArr.push({
      type: 'chain',
      options: options
    });
    return this;
  };

  Byte.prototype.then = function(options) {
    this.chainArr.push({
      type: 'then',
      options: options
    });
    return this;
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
    var a, b, g, i, key, num, r, units, value, _i, _len, _ref, _ref1, _ref2;
    if ((_ref = this.props.onUpdate) != null) {
      _ref.call(this, progress);
    }
    this.progress = progress < 0 || !progress ? 0 : progress > 1 ? 1 : progress;
    _ref1 = this.deltas;
    for (key in _ref1) {
      value = _ref1[key];
      switch (value.type) {
        case 'array':
          this.props[key] = '';
          _ref2 = value.delta;
          for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
            num = _ref2[i];
            this.props[key] += "" + (value.start[i] + num * this.progress) + " ";
          }
          break;
        case 'number':
          this.props[key] = value.start + value.delta * this.progress;
          break;
        case 'unit':
          units = value.end.unit;
          this.props[key] = "" + (value.start.value + value.delta * this.progress) + units;
          break;
        case 'color':
          r = parseInt(value.start.r + value.delta.r * this.progress, 10);
          g = parseInt(value.start.g + value.delta.g * this.progress, 10);
          b = parseInt(value.start.b + value.delta.b * this.progress, 10);
          a = parseInt(value.start.a + value.delta.a * this.progress, 10);
          this.props[key] = "rgba(" + r + "," + g + "," + b + "," + a + ")";
      }
    }
    this.draw();
    if (progress === 1 && this.o.isRunLess) {
      return this.runChain();
    }
  };

  Byte.prototype.runChain = function() {
    var chain;
    if (!this.chainArr.length) {
      return;
    }
    chain = this.chainArr.shift();
    if (chain.type === 'chain') {
      this.o = chain.options;
    }
    if (chain.type === 'then') {
      this.mergeThenOptions(chain);
    }
    return this.init();
  };

  Byte.prototype.mergeThenOptions = function(chain) {
    var currValue, end, key, keys, nextValue, options, opts, start, value;
    opts = this.copyEndOptions();
    if (!opts) {
      return;
    }
    options = chain.options;
    for (key in options) {
      value = options[key];
      if (typeof value === 'object') {
        keys = Object.keys(value);
        end = value[keys[0]];
        start = opts[key];
        console.warn("::mojs:: new end value expected instead of object, using end(" + end + ") value", value);
        opts[key] = {};
        opts[key][start] = end;
      } else {
        if (!this.h.tweenOptionMap[key]) {
          currValue = opts[key];
          nextValue = value;
          opts[key] = {};
          opts[key][currValue] = nextValue;
        } else {
          opts[key] = value;
        }
      }
    }
    return this.o = opts;
  };

  Byte.prototype.copyEndOptions = function() {
    var key, opts, value, _ref;
    opts = {};
    _ref = this.o;
    for (key in _ref) {
      value = _ref[key];
      opts[key] = typeof value === 'object' ? value[Object.keys(value)[0]] : value;
    }
    return opts;
  };

  Byte.prototype.draw = function() {
    var translate;
    this.bit.setProp({
      x: this.props.center,
      y: this.props.center,
      stroke: this.props.stroke,
      strokeWidth: this.props.strokeWidth,
      strokeOpacity: this.props.strokeOpacity,
      strokeDasharray: this.props.strokeDasharray,
      strokeDashoffset: this.props.strokeDashoffset,
      strokeLinecap: this.props.strokeLinecap,
      fill: this.props.fill,
      fillOpacity: this.props.fillOpacity,
      radius: this.props.radius,
      transform: this.calcTransform()
    });
    this.bit.draw();
    if (this.el) {
      this.el.style.left = this.props.x;
      this.el.style.top = this.props.y;
      this.el.style.opacity = this.props.opacity;
      translate = "translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
      return this.h.setPrefixedStyle(this.el, 'transform', translate);
    }
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
    this.props.size += 2 * this.props.sizeGap;
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
      if (!(optionsValue && typeof optionsValue === 'object')) {
        this.props[key] = this.o[key] || defaultsValue;
        if (this.h.posPropsMap[key]) {
          this.props[key] = this.h.parseUnit(this.props[key]).string;
        }
        continue;
      }
      start = Object.keys(optionsValue)[0];
      if (isNaN(parseFloat(start))) {
        if (key === 'strokeLinecap') {
          if (typeof console !== "undefined" && console !== null) {
            console.warn('::mojs:: Sorry, stroke-linecap propety is not animateable yet, using the start value');
          }
          this.props[key] = start;
          continue;
        }
        end = optionsValue[start];
        startColorObj = h.makeColorObj(start);
        endColorObj = h.makeColorObj(end);
        _results.push(this.deltas[key] = {
          start: startColorObj,
          end: endColorObj,
          type: 'color',
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
          delta: h.calcArrDelta(startArr, endArr),
          type: 'array'
        });
      } else {
        if (!this.h.tweenOptionMap[key]) {
          if (this.h.posPropsMap[key]) {
            end = this.h.parseUnit(optionsValue[start]);
            start = this.h.parseUnit(start);
            this.deltas[key] = {
              start: start,
              end: end,
              delta: end.value - start.value,
              type: 'unit'
            };
            _results.push(this.props[key] = start.string);
          } else {
            end = parseFloat(optionsValue[start]);
            start = parseFloat(start);
            this.deltas[key] = {
              start: start,
              end: end,
              delta: end - start,
              type: 'number'
            };
            _results.push(this.props[key] = start);
          }
        } else {
          _results.push(this.props[key] = start);
        }
      }
    }
    return _results;
  };

  Byte.prototype.createTween = function() {
    var ease, easings, it;
    it = this;
    if (this.props.onComplete) {
      this.props.onComplete = this.h.bind(this.props.onComplete, this);
    }
    easings = h.splitEasing(this.props.easing);
    ease = typeof easings === 'function' ? easings : TWEEN.Easing[easings[0]][easings[1]];
    this.tween = new this.TWEEN.Tween({
      p: 0
    }).to({
      p: 1
    }, this.props.duration).delay(this.props.delay).easing(ease).onUpdate(function() {
      return it.setProgress(this.p);
    }).repeat(this.props.repeat - 1).yoyo(this.props.yoyo).onComplete((function(_this) {
      return function() {
        var _base;
        _this.runChain();
        return typeof (_base = _this.props).onComplete === "function" ? _base.onComplete() : void 0;
      };
    })(this));
    return !this.o.isRunLess && this.startTween();
  };

  Byte.prototype.startTween = function() {
    var _ref;
    if ((_ref = this.props.onStart) != null) {
      _ref.call(this);
    }
    this.h.startAnimationLoop();
    return this.tween.start();
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
