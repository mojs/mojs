
/* istanbul ignore next */
var TWEEN, Transit, bitsMap, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

h = require('./h');

TWEEN = require('./vendor/tween');

bitsMap = require('./bitsMap');

Transit = (function(_super) {
  __extends(Transit, _super);

  function Transit() {
    return Transit.__super__.constructor.apply(this, arguments);
  }

  Transit.prototype.TWEEN = TWEEN;

  Transit.prototype.progress = 0;

  Transit.prototype.defaults = {
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
    onInit: null,
    onStart: null,
    onComplete: null,
    onCompleteChain: null,
    onUpdate: null,
    duration: 500,
    delay: 0,
    repeat: 1,
    yoyo: false,
    easing: 'Linear.None'
  };

  Transit.prototype.vars = function() {
    this.h = h;
    if (this.chainArr == null) {
      this.chainArr = [];
    }
    this.lastSet = {};
    this.extendDefaults();
    return this.calcTransform();
  };

  Transit.prototype.calcTransform = function() {
    return this.props.transform = "rotate(" + this.props.deg + "," + this.props.center + "," + this.props.center + ")";
  };

  Transit.prototype.render = function() {
    var marginSize, size;
    if (!this.isRendered) {
      if (this.o.ctx == null) {
        this.ctx = document.createElementNS(this.ns, 'svg');
        this.ctx.style.position = 'absolute';
        this.ctx.style.width = '100%';
        this.ctx.style.height = '100%';
        this.createBit();
        this.calcSize();
        this.el = document.createElement('div');
        size = "" + (this.props.size / this.h.remBase) + "rem";
        marginSize = "" + (-this.props.size / (2 * this.h.remBase)) + "rem";
        this.el.style.position = 'absolute';
        this.el.style.top = this.props.y.string;
        this.el.style.left = this.props.x.string;
        this.el.style.opacity = this.props.opacity;
        this.el.style.width = size;
        this.el.style.height = size;
        this.el.style['margin-left'] = marginSize;
        this.el.style['margin-top'] = marginSize;
        this.h.setPrefixedStyle(this.el, 'backface-visibility', 'hidden');
        this.el.appendChild(this.ctx);
        (this.o.parent || document.body).appendChild(this.el);
      } else {
        this.ctx = this.o.ctx;
        this.createBit();
      }
      this.isRendered = true;
    }
    !this.o.isDrawLess && this.setProgress(0);
    this.createTween();
    return this;
  };

  Transit.prototype.chain = function(options) {
    options.type = this.o.type;
    this.chainArr.push({
      type: 'chain',
      options: options
    });
    return this;
  };

  Transit.prototype.then = function(options) {
    this.chainArr.push({
      type: 'then',
      options: options
    });
    return this;
  };

  Transit.prototype.createBit = function() {
    var bitClass;
    bitClass = bitsMap.getBit(this.o.type || this.type);
    return this.bit = new bitClass({
      ctx: this.ctx,
      isDrawLess: true
    });
  };

  Transit.prototype.setProgress = function(progress) {
    var a, b, g, i, key, num, r, units, value, _i, _len, _ref, _ref1, _ref2, _ref3;
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
    if (progress === 1) {
      this.runChain();
      return (_ref3 = this.props.onComplete) != null ? _ref3.call(this) : void 0;
    }
  };

  Transit.prototype.runChain = function() {
    var chain, _ref;
    if (!this.chainArr.length) {
      return (_ref = this.props.onCompleteChain) != null ? _ref.call(this) : void 0;
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

  Transit.prototype.mergeThenOptions = function(chain) {
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
        this.h.warn("new end value expected instead of object, using end(" + end + ") value instead", value);
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

  Transit.prototype.copyEndOptions = function() {
    var key, opts, value, _ref;
    opts = {};
    _ref = this.o;
    for (key in _ref) {
      value = _ref[key];
      opts[key] = typeof value === 'object' ? value[Object.keys(value)[0]] : value;
    }
    return opts;
  };

  Transit.prototype.draw = function() {
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
    return this.drawEl();
  };

  Transit.prototype.drawEl = function() {
    var translate;
    if (!this.el) {
      return;
    }
    this.isPropChanged('x') && (this.el.style.left = this.props.x);
    this.isPropChanged('y') && (this.el.style.top = this.props.y);
    this.isPropChanged('opacity') && (this.el.style.opacity = this.props.opacity);
    if (this.isPropChanged('shiftX') || this.isPropChanged('shiftY')) {
      translate = "translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
      return this.h.setPrefixedStyle(this.el, 'transform', translate);
    }
  };

  Transit.prototype.isPropChanged = function(name) {
    var _base;
    if ((_base = this.lastSet)[name] == null) {
      _base[name] = {};
    }
    return this.lastSet[name].isChanged = this.lastSet[name].value !== this.props[name] ? (this.lastSet[name].value = this.props[name], true) : false;
  };

  Transit.prototype.calcSize = function() {
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

  Transit.prototype.extendDefaults = function() {
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
      if (key === 'x' || key === 'y') {
        this.h.warn('Consider to animate shiftX/shiftY properties instead of x/y, as it would be much more perfomant', optionsValue);
      }
      start = Object.keys(optionsValue)[0];
      if (isNaN(parseFloat(start))) {
        if (key === 'strokeLinecap') {
          this.h.warn("Sorry, stroke-linecap property is not animatable yet, using the start(" + start + ") value instead", optionsValue);
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

  Transit.prototype.createTween = function() {
    var ease, easings, it;
    it = this;
    easings = h.splitEasing(this.props.easing);
    ease = typeof easings === 'function' ? easings : TWEEN.Easing[easings[0]][easings[1]];
    this.tween = new this.TWEEN.Tween({
      p: 0
    }).to({
      p: 1
    }, this.props.duration).delay(this.props.delay).easing(ease).onUpdate(function() {
      return it.setProgress(this.p);
    }).repeat(this.props.repeat - 1).yoyo(this.props.yoyo);
    return !this.o.isRunLess && this.startTween();
  };

  Transit.prototype.run = function() {
    return this.startTween();
  };

  Transit.prototype.startTween = function() {
    var _ref;
    if ((_ref = this.props.onStart) != null) {
      _ref.call(this);
    }
    this.h.startAnimationLoop();
    return this.tween.start();
  };

  return Transit;

})(bitsMap.map.bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Transit", [], function() {
    return Transit;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Transit;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Transit = Transit;
}
