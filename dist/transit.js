
/* istanbul ignore next */
var Timeline, Transit, Tween, bitsMap, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

h = require('./h');

bitsMap = require('./shapes/bitsMap');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

Transit = (function(_super) {
  __extends(Transit, _super);

  function Transit() {
    return Transit.__super__.constructor.apply(this, arguments);
  }

  Transit.prototype.progress = 0;

  Transit.prototype.defaults = {
    strokeWidth: 2,
    strokeOpacity: 1,
    strokeDasharray: '',
    strokeDashoffset: '',
    stroke: 'transparent',
    fill: 'deeppink',
    fillOpacity: 'transparent',
    strokeLinecap: '',
    points: 3,
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
    opacity: 1,
    radius: {
      0: 50
    },
    radiusX: void 0,
    radiusY: void 0,
    angle: 0,
    size: null,
    sizeGap: 0,
    onStart: null,
    onComplete: null,
    onUpdate: null,
    duration: 500,
    delay: 0,
    repeat: 0,
    yoyo: false,
    easing: 'Linear.None'
  };

  Transit.prototype.vars = function() {
    var o;
    if (this.h == null) {
      this.h = h;
    }
    if (this.lastSet == null) {
      this.lastSet = {};
    }
    this.extendDefaults();
    o = this.h.cloneObj(this.o);
    this.h.extend(o, this.defaults);
    this.history = [o];
    this.isForeign = !!this.o.ctx;
    this.isForeignBit = !!this.o.bit;
    return this.timelines = [];
  };

  Transit.prototype.render = function() {
    if (!this.isRendered) {
      if (!this.isForeign && !this.isForeignBit) {
        this.ctx = document.createElementNS(this.ns, 'svg');
        this.ctx.style.position = 'absolute';
        this.ctx.style.width = '100%';
        this.ctx.style.height = '100%';
        this.createBit();
        this.calcSize();
        this.el = document.createElement('div');
        this.el.appendChild(this.ctx);
        (this.o.parent || document.body).appendChild(this.el);
      } else {
        this.ctx = this.o.ctx;
        this.createBit();
        this.calcSize();
      }
      this.isRendered = true;
    }
    this.setElStyles();
    this.setProgress(0, true);
    this.createTween();
    return this;
  };

  Transit.prototype.setElStyles = function() {
    var marginSize, size;
    if (!this.isForeign) {
      size = "" + this.props.size + "px";
      marginSize = "" + (-this.props.size / 2) + "px";
      this.el.style.position = 'absolute';
      this.el.style.top = this.props.y;
      this.el.style.left = this.props.x;
      this.el.style.width = size;
      this.el.style.height = size;
      this.el.style['margin-left'] = marginSize;
      this.el.style['margin-top'] = marginSize;
      this.h.setPrefixedStyle(this.el, 'backface-visibility', 'hidden');
    }
    this.el.style.opacity = this.props.opacity;
    if (this.o.isShowInit) {
      return this.show();
    } else {
      return this.hide();
    }
  };

  Transit.prototype.show = function() {
    if (this.isShown || (this.el == null)) {
      return;
    }
    this.el.style.display = 'block';
    return this.isShown = true;
  };

  Transit.prototype.hide = function() {
    if ((this.isShown === false) || (this.el == null)) {
      return;
    }
    this.el.style.display = 'none';
    return this.isShown = false;
  };

  Transit.prototype.draw = function() {
    this.bit.setProp({
      x: this.origin.x,
      y: this.origin.y,
      stroke: this.props.stroke,
      'stroke-width': this.props.strokeWidth,
      'stroke-opacity': this.props.strokeOpacity,
      'stroke-dasharray': this.props.strokeDasharray,
      'stroke-dashoffset': this.props.strokeDashoffset,
      'stroke-linecap': this.props.strokeLinecap,
      fill: this.props.fill,
      'fill-opacity': this.props.fillOpacity,
      radius: this.props.radius,
      radiusX: this.props.radiusX,
      radiusY: this.props.radiusY,
      points: this.props.points,
      transform: this.calcTransform()
    });
    this.bit.draw();
    return this.drawEl();
  };

  Transit.prototype.drawEl = function() {
    if (this.el == null) {
      return;
    }
    this.isPropChanged('opacity') && (this.el.style.opacity = this.props.opacity);
    if (!this.isForeign) {
      this.isPropChanged('x') && (this.el.style.left = this.props.x);
      this.isPropChanged('y') && (this.el.style.top = this.props.y);
      if (this.isNeedsTransform()) {
        return this.h.setPrefixedStyle(this.el, 'transform', this.fillTransform());
      }
    }
  };

  Transit.prototype.fillTransform = function() {
    return "translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
  };

  Transit.prototype.isNeedsTransform = function() {
    var isX, isY;
    isX = this.isPropChanged('shiftX');
    isY = this.isPropChanged('shiftY');
    return isX || isY;
  };

  Transit.prototype.isPropChanged = function(name) {
    var _base;
    if ((_base = this.lastSet)[name] == null) {
      _base[name] = {};
    }
    if (this.lastSet[name].value !== this.props[name]) {
      this.lastSet[name].value = this.props[name];
      return true;
    } else {
      return false;
    }
  };

  Transit.prototype.calcTransform = function() {
    return this.props.transform = "rotate(" + this.props.angle + "," + this.origin.x + "," + this.origin.y + ")";
  };

  Transit.prototype.calcSize = function() {
    var dStroke, radius, stroke, _base;
    if (this.o.size) {
      return;
    }
    radius = this.calcMaxRadius();
    dStroke = this.deltas['strokeWidth'];
    stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this.props.strokeWidth;
    this.props.size = 2 * radius + 2 * stroke;
    switch (typeof (_base = this.props.easing).toLowerCase === "function" ? _base.toLowerCase() : void 0) {
      case 'elastic.out':
      case 'elastic.inout':
        this.props.size *= 1.25;
        break;
      case 'back.out':
      case 'back.inout':
        this.props.size *= 1.1;
    }
    this.props.size *= this.bit.ratio;
    this.props.size += 2 * this.props.sizeGap;
    return this.props.center = this.props.size / 2;
  };

  Transit.prototype.calcMaxRadius = function() {
    var selfSize, selfSizeX, selfSizeY;
    selfSize = this.getRadiusSize({
      key: 'radius'
    });
    selfSizeX = this.getRadiusSize({
      key: 'radiusX',
      fallback: selfSize
    });
    selfSizeY = this.getRadiusSize({
      key: 'radiusY',
      fallback: selfSize
    });
    return Math.max(selfSizeX, selfSizeY);
  };

  Transit.prototype.getRadiusSize = function(o) {
    if (this.deltas[o.key] != null) {
      return Math.max(Math.abs(this.deltas[o.key].end), Math.abs(this.deltas[o.key].start));
    } else if (this.props[o.key] != null) {
      return parseFloat(this.props[o.key]);
    } else {
      return o.fallback || 0;
    }
  };

  Transit.prototype.createBit = function() {
    var bitClass;
    bitClass = bitsMap.getBit(this.o.type || this.type);
    this.bit = new bitClass({
      ctx: this.ctx,
      el: this.o.bit,
      isDrawLess: true
    });
    if (this.isForeign || this.isForeignBit) {
      return this.el = this.bit.el;
    }
  };

  Transit.prototype.setProgress = function(progress, isShow) {
    if (!isShow) {
      this.show();
      if (typeof this.onUpdate === "function") {
        this.onUpdate(progress);
      }
    }
    this.progress = progress < 0 || !progress ? 0 : progress > 1 ? 1 : progress;
    this.calcCurrentProps(progress);
    this.calcOrigin();
    this.draw(progress);
    return this;
  };

  Transit.prototype.calcCurrentProps = function(progress) {
    var a, b, dash, g, i, item, key, keys, len, r, stroke, units, value, _results;
    keys = Object.keys(this.deltas);
    len = keys.length;
    _results = [];
    while (len--) {
      key = keys[len];
      value = this.deltas[key];
      _results.push(this.props[key] = (function() {
        var _i, _len, _ref;
        switch (value.type) {
          case 'array':
            stroke = [];
            _ref = value.delta;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              item = _ref[i];
              dash = value.start[i].value + item.value * this.progress;
              console.log(dash);
              stroke.push({
                value: dash,
                units: item.unit
              });
            }
            return stroke;
          case 'number':
            return value.start + value.delta * progress;
          case 'unit':
            units = value.end.unit;
            return "" + (value.start.value + value.delta * progress) + units;
          case 'color':
            r = parseInt(value.start.r + value.delta.r * progress, 10);
            g = parseInt(value.start.g + value.delta.g * progress, 10);
            b = parseInt(value.start.b + value.delta.b * progress, 10);
            a = parseInt(value.start.a + value.delta.a * progress, 10);
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }
      }).call(this));
    }
    return _results;
  };

  Transit.prototype.calcOrigin = function() {
    return this.origin = this.o.ctx ? {
      x: parseFloat(this.props.x),
      y: parseFloat(this.props.y)
    } : {
      x: this.props.center,
      y: this.props.center
    };
  };

  Transit.prototype.extendDefaults = function(o) {
    var defaultsValue, delta, fromObject, isObject, key, keys, len, optionsValue, _ref, _ref1;
    if (this.props == null) {
      this.props = {};
    }
    fromObject = o || this.defaults;
    (o == null) && (this.deltas = {});
    keys = Object.keys(fromObject);
    len = keys.length;
    while (len--) {
      key = keys[len];
      defaultsValue = fromObject[key];
      if ((_ref = this.skipProps) != null ? _ref[key] : void 0) {
        continue;
      }
      if (o) {
        this.o[key] = defaultsValue;
        optionsValue = defaultsValue;
        delete this.deltas[key];
      } else {
        optionsValue = this.o[key] != null ? this.o[key] : defaultsValue;
      }
      isObject = (optionsValue != null) && (typeof optionsValue === 'object');
      if (!isObject || this.h.isArray(optionsValue)) {
        if (typeof optionsValue === 'string' && optionsValue.match(/rand/)) {
          optionsValue = this.h.parseRand(optionsValue);
        }
        this.props[key] = optionsValue;
        if (this.h.posPropsMap[key]) {
          this.props[key] = this.h.parseUnit(this.props[key]).string;
        }
        continue;
      }
      if ((key === 'x' || key === 'y') && !this.o.ctx) {
        this.h.warn('Consider to animate shiftX/shiftY properties instead of x/y, as it would be much more performant', optionsValue);
      }
      if ((_ref1 = this.skipPropsDelta) != null ? _ref1[key] : void 0) {
        continue;
      }
      delta = this.h.parseDelta(key, optionsValue, this.defaults[key]);
      if (delta.type != null) {
        this.deltas[key] = delta;
      }
      this.props[key] = delta.start;
    }
    return this.onUpdate = this.props.onUpdate;
  };

  Transit.prototype.mergeThenOptions = function(start, end) {
    var endKey, i, key, keys, o, startKey, startKeys;
    o = {};
    this.h.extend(o, start);
    keys = Object.keys(end);
    i = keys.length;
    while (i--) {
      key = keys[i];
      endKey = end[key];
      if (this.h.tweenOptionMap[key] || typeof endKey === 'object') {
        o[key] = endKey != null ? endKey : start[key];
        continue;
      }
      startKey = start[key];
      if (startKey == null) {
        startKey = this.defaults[key];
      }
      if (typeof startKey === 'object') {
        startKeys = Object.keys(startKey);
        startKey = startKey[startKeys[0]];
      }
      if (endKey != null) {
        o[key] = {};
        o[key][startKey] = endKey;
      } else {
        o[key] = startKey;
      }
    }
    return o;
  };

  Transit.prototype.then = function(o) {
    var i, it, keys, merged, opts;
    if (o == null) {
      o = {};
    }
    merged = this.mergeThenOptions(this.history[this.history.length - 1], o);
    this.history.push(merged);
    keys = Object.keys(this.h.tweenOptionMap);
    i = keys.length;
    opts = {};
    while (i--) {
      opts[keys[i]] = merged[keys[i]];
    }
    it = this;
    opts.onUpdate = (function(_this) {
      return function(p) {
        return _this.setProgress(p);
      };
    })(this);
    opts.onStart = (function(_this) {
      return function() {
        var _ref;
        return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
      };
    })(this);
    opts.onComplete = (function(_this) {
      return function() {
        var _ref;
        return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
      };
    })(this);
    opts.onFirstUpdate = function() {
      return it.tuneOptions(it.history[this.index]);
    };
    this.tween.append(new Timeline(opts));
    return this;
  };

  Transit.prototype.tuneOptions = function(o) {
    this.extendDefaults(o);
    this.calcSize();
    return this.setElStyles();
  };

  Transit.prototype.createTween = function() {
    var it, onComplete;
    it = this;
    onComplete = this.props.onComplete ? this.h.bind(this.props.onComplete, this) : null;
    this.timeline = new Timeline({
      duration: this.props.duration,
      delay: this.props.delay,
      repeat: this.props.repeat,
      yoyo: this.props.yoyo,
      easing: this.props.easing,
      onUpdate: (function(_this) {
        return function(p) {
          return _this.setProgress(p);
        };
      })(this),
      onStart: (function(_this) {
        return function() {
          var _ref;
          _this.show();
          return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
        };
      })(this),
      onFirstUpdateBackward: (function(_this) {
        return function() {
          return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
        };
      })(this),
      onReverseComplete: (function(_this) {
        return function() {
          var _ref;
          !_this.o.isShowInit && _this.hide();
          return (_ref = _this.props.onReverseComplete) != null ? _ref.apply(_this) : void 0;
        };
      })(this)
    });
    this.tween = new Tween({
      onComplete: (function(_this) {
        return function() {
          var _ref;
          !_this.o.isShowEnd && _this.hide();
          return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
        };
      })(this)
    });
    this.tween.add(this.timeline);
    return !this.o.isRunLess && this.startTween();
  };

  Transit.prototype.run = function(o) {
    var key, keys, len;
    if (this.history.length > 1) {
      keys = Object.keys(o);
      len = keys.length;
      while (len--) {
        key = keys[len];
        if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
          h.warn("the property \"" + key + "\" property can not be overridden on run with \"then\" chain yet");
          delete o[key];
        }
      }
    }
    if (o && Object.keys(o).length) {
      this.transformHistory(o);
      this.tuneNewOption(o);
      o = this.h.cloneObj(this.o);
      this.h.extend(o, this.defaults);
      this.history[0] = o;
      !this.o.isDrawLess && this.setProgress(0, true);
    }
    return this.startTween();
  };

  Transit.prototype.transformHistory = function(o) {
    var historyLen, i, j, key, keys, len, optionRecord, value, value2, valueKeys, valueKeys2, _results;
    keys = Object.keys(o);
    i = -1;
    len = keys.length;
    historyLen = this.history.length;
    _results = [];
    while (++i < len) {
      key = keys[i];
      j = 0;
      _results.push((function() {
        var _results1;
        _results1 = [];
        while (++j < historyLen) {
          optionRecord = this.history[j][key];
          if (optionRecord != null) {
            if (typeof optionRecord === 'object') {
              valueKeys = Object.keys(optionRecord);
              value = optionRecord[valueKeys[0]];
              delete this.history[j][key][valueKeys[0]];
              if (typeof o[key] === 'object') {
                valueKeys2 = Object.keys(o[key]);
                value2 = o[key][valueKeys2[0]];
                this.history[j][key][value2] = value;
              } else {
                this.history[j][key][o[key]] = value;
              }
              break;
            } else {
              _results1.push(this.history[j][key] = o[key]);
            }
          } else {
            _results1.push(this.history[j][key] = o[key]);
          }
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  Transit.prototype.tuneNewOption = function(o, isForeign) {
    if ((o != null) && (o.type != null) && o.type !== (this.o.type || this.type)) {
      this.h.warn('Sorry, type can not be changed on run');
      delete o.type;
    }
    if ((o != null) && Object.keys(o).length) {
      this.extendDefaults(o);
      this.resetTimeline();
      !isForeign && this.tween.recalcDuration();
      this.calcSize();
      return !isForeign && this.setElStyles();
    }
  };

  Transit.prototype.startTween = function() {
    return setTimeout(((function(_this) {
      return function() {
        var _ref;
        return (_ref = _this.tween) != null ? _ref.start() : void 0;
      };
    })(this)), 1);
  };

  Transit.prototype.resetTimeline = function() {
    var i, key, timelineOptions, _i, _len, _ref;
    timelineOptions = {};
    _ref = Object.keys(this.h.tweenOptionMap);
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      key = _ref[i];
      timelineOptions[key] = this.props[key];
    }
    timelineOptions.onStart = this.props.onStart;
    timelineOptions.onComplete = this.props.onComplete;
    return this.timeline.setProp(timelineOptions);
  };

  Transit.prototype.getBitLength = function() {
    var isChanged, isChangedXY;
    isChangedXY = this.isPropChanged('radiusX') || this.isPropChanged('radiusY');
    isChanged = this.isPropChanged('radius');
    if (isChangedXY || isChanged) {
      this.props.bitLength = this.bit.getLength();
    }
    return this.props.bitLength;
  };

  return Transit;

})(bitsMap.map.bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Transit", [], function() {
    return Transit;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Transit;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Transit = Transit;
}
