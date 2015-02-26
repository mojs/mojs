var MotionPath, Timeline, Tween, h, resize;

h = require('./h');

Tween = require('./tween');

Timeline = require('./timeline');

resize = require('./vendor/resize');

MotionPath = (function() {
  MotionPath.prototype.NS = 'http://www.w3.org/2000/svg';

  MotionPath.prototype.defaults = {
    delay: 0,
    duration: 1000,
    easing: null,
    repeat: 0,
    yoyo: false,
    offsetX: 0,
    offsetY: 0,
    angleOffset: null,
    pathStart: 0,
    pathEnd: 1,
    transformOrigin: null,
    isAngle: false,
    isReverse: false,
    isRunLess: false,
    isPresetPosition: true,
    onStart: null,
    onComplete: null,
    onUpdate: null
  };

  function MotionPath(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.createTween();
    this;
  }

  MotionPath.prototype.vars = function() {
    this.getScaler = h.bind(this.getScaler, this);
    this.resize = resize;
    this.props = h.cloneObj(this.defaults);
    this.extendOptions(this.o);
    this.history = [h.cloneObj(this.props)];
    return this.postVars();
  };

  MotionPath.prototype.postVars = function() {
    this.props.pathStart = h.clamp(this.props.pathStart, 0, 1);
    this.props.pathEnd = h.clamp(this.props.pathEnd, this.props.pathStart, 1);
    this.onUpdate = this.props.onUpdate;
    this.el = this.parseEl(this.props.el);
    this.path = this.getPath();
    this.len = this.path.getTotalLength();
    this.slicedLen = this.len * (this.props.pathEnd - this.props.pathStart);
    this.startLen = this.props.pathStart * this.len;
    this.fill = this.props.fill;
    if (this.fill != null) {
      this.container = this.parseEl(this.props.fill.container);
      this.fillRule = this.props.fill.fillRule || 'all';
      this.getScaler();
      if (!this.container) {
        return;
      }
      this.removeEvent(this.container, 'onresize', this.getScaler);
      return this.addEvent(this.container, 'onresize', this.getScaler);
    }
  };

  MotionPath.prototype.addEvent = function(el, type, handler) {
    if (el.addEventListener) {
      return this.container.addEventListener(type, handler);
    } else if (el.attachEvent) {
      return this.container.attachEvent(type, handler);
    }
  };

  MotionPath.prototype.removeEvent = function(el, type, handler) {
    if (el.removeEventListener) {
      return this.container.removeEventListener(type, handler);
    } else if (el.detachEvent) {
      return this.container.detachEvent(type, handler);
    }
  };

  MotionPath.prototype.parseEl = function(el) {
    if (typeof el === 'string') {
      return document.querySelector(el);
    }
    if (el instanceof HTMLElement) {
      return el;
    }
  };

  MotionPath.prototype.getPath = function() {
    var path;
    if (typeof this.props.path === 'string') {
      if (this.props.path.charAt(0).toLowerCase() === 'm') {
        path = document.createElementNS(this.NS, 'path');
        path.setAttributeNS(null, 'd', this.props.path);
        return path;
      } else {
        return document.querySelector(this.props.path);
      }
    }
    if (this.props.path.style) {
      return this.props.path;
    }
  };

  MotionPath.prototype.getScaler = function() {
    var calcBoth, calcHeight, calcWidth, end, size, start;
    this.cSize = {
      width: this.container.offsetWidth || 0,
      height: this.container.offsetHeight || 0
    };
    start = this.path.getPointAtLength(0);
    end = this.path.getPointAtLength(this.len);
    size = {};
    size.width = end.x >= start.x ? end.x - start.x : start.x - end.x;
    size.height = end.y >= start.y ? end.y - start.y : start.y - end.y;
    this.scaler = {};
    calcWidth = (function(_this) {
      return function() {
        _this.scaler.x = _this.cSize.width / size.width;
        if (!isFinite(_this.scaler.x)) {
          return _this.scaler.x = 1;
        }
      };
    })(this);
    calcHeight = (function(_this) {
      return function() {
        _this.scaler.y = _this.cSize.height / size.height;
        if (!isFinite(_this.scaler.y)) {
          return _this.scaler.y = 1;
        }
      };
    })(this);
    calcBoth = function() {
      calcWidth();
      return calcHeight();
    };
    switch (this.fillRule) {
      case 'all':
        return calcBoth();
      case 'width':
        calcWidth();
        return this.scaler.y = this.scaler.x;
      case 'height':
        calcHeight();
        return this.scaler.x = this.scaler.y;
      default:
        return calcBoth();
    }
  };

  MotionPath.prototype.run = function(o) {
    var fistItem, key, value;
    if (o) {
      fistItem = this.history[0];
      for (key in o) {
        value = o[key];
        if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
          h.warn("the property \"" + key + "\" property can not be overridden on run yet");
          delete o[key];
        } else {
          this.history[0][key] = value;
        }
      }
      this.tuneOptions(o);
    }
    return this.startTween();
  };

  MotionPath.prototype.createTween = function() {
    this.timeline = new Timeline({
      duration: this.props.duration,
      delay: this.props.delay,
      yoyo: this.props.yoyo,
      repeat: this.props.repeat,
      easing: this.props.easing,
      onStart: (function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
        };
      })(this),
      onComplete: (function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
        };
      })(this),
      onUpdate: (function(_this) {
        return function(p) {
          return _this.setProgress(p);
        };
      })(this),
      onFirstUpdateBackward: (function(_this) {
        return function() {
          return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
        };
      })(this)
    });
    this.tween = new Tween;
    this.tween.add(this.timeline);
    if (!this.props.isRunLess) {
      return this.startTween();
    } else if (this.props.isPresetPosition) {
      return this.setProgress(0, true);
    }
  };

  MotionPath.prototype.startTween = function() {
    return setTimeout(((function(_this) {
      return function() {
        var _ref;
        return (_ref = _this.tween) != null ? _ref.start() : void 0;
      };
    })(this)), 1);
  };

  MotionPath.prototype.setProgress = function(p, isInit) {
    var atan, len, point, prevPoint, rotate, tOrigin, transform, x, x1, x2, y;
    len = this.startLen + (!this.props.isReverse ? p * this.slicedLen : (1 - p) * this.slicedLen);
    point = this.path.getPointAtLength(len);
    if (this.props.isAngle || (this.props.angleOffset != null)) {
      prevPoint = this.path.getPointAtLength(len - 1);
      x1 = point.y - prevPoint.y;
      x2 = point.x - prevPoint.x;
      atan = Math.atan(x1 / x2);
      !isFinite(atan) && (atan = 0);
      this.angle = atan * h.RAD_TO_DEG;
      if ((typeof this.props.angleOffset) !== 'function') {
        this.angle += this.props.angleOffset || 0;
      } else {
        this.angle = this.props.angleOffset(this.angle, p);
      }
    } else {
      this.angle = 0;
    }
    x = point.x + this.props.offsetX;
    y = point.y + this.props.offsetY;
    if (this.scaler) {
      x *= this.scaler.x;
      y *= this.scaler.y;
    }
    rotate = this.angle !== 0 ? "rotate(" + this.angle + "deg)" : '';
    transform = "translate(" + x + "px," + y + "px) " + rotate + " translateZ(0)";
    this.el.style["" + h.prefix.css + "transform"] = transform;
    this.el.style['transform'] = transform;
    if (this.props.transformOrigin) {
      tOrigin = typeof this.props.transformOrigin === 'function' ? this.props.transformOrigin(this.angle, p) : this.props.transformOrigin;
      this.el.style["" + h.prefix.css + "transform-origin"] = tOrigin;
      this.el.style['transform-origin'] = tOrigin;
    }
    return !isInit && (typeof this.onUpdate === "function" ? this.onUpdate(p) : void 0);
  };

  MotionPath.prototype.extendDefaults = function(o) {
    var key, value, _results;
    _results = [];
    for (key in o) {
      value = o[key];
      _results.push(this[key] = value);
    }
    return _results;
  };

  MotionPath.prototype.extendOptions = function(o) {
    var key, value, _results;
    _results = [];
    for (key in o) {
      value = o[key];
      _results.push(this.props[key] = value);
    }
    return _results;
  };

  MotionPath.prototype.then = function(o) {
    var i, it, key, keys, opts, prevOptions, value;
    prevOptions = this.history[this.history.length - 1];
    for (key in prevOptions) {
      value = prevOptions[key];
      if (o[key] == null) {
        o[key] = value;
      }
    }
    this.history.push(o);
    keys = Object.keys(h.tweenOptionMap);
    i = keys.length;
    opts = {};
    while (i--) {
      key = keys[i];
      opts[key] = o[key] || prevOptions[key];
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

  MotionPath.prototype.tuneOptions = function(o) {
    this.extendOptions(o);
    return this.postVars();
  };

  return MotionPath;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("motion-path", [], function() {
    return MotionPath;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = MotionPath;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.MotionPath = MotionPath;
}
