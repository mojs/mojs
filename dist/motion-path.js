var MotionPath, Timeline, Tween, h, resize;

h = require('./h');

Tween = require('./tween');

Timeline = require('./timeline');

resize = require('./vendor/resize');

MotionPath = (function() {
  MotionPath.prototype.NS = 'http://www.w3.org/2000/svg';

  function MotionPath(o) {
    this.o = o != null ? o : {};
    this.vars();
    if (!this.isRunLess) {
      this.run();
    } else if (this.isPresetPosition) {
      this.presetPosition();
    }
    this;
  }

  MotionPath.prototype.vars = function() {
    var pathEnd, pathStart;
    this.getScaler = h.bind(this.getScaler, this);
    this.resize = resize;
    this.duration = this.o.duration || 1000;
    this.delay = this.o.delay || 0;
    this.yoyo = this.o.yoyo || false;
    this.easing = this.o.easing || 'Linear.None';
    this.easings = this.easing.split('.');
    this.repeat = this.o.repeat || 0;
    this.offsetX = this.o.offsetX || 0;
    this.offsetY = this.o.offsetY || 0;
    this.angleOffset = this.o.angleOffset;
    this.isAngle = this.o.isAngle || false;
    this.isReverse = this.o.isReverse || false;
    this.isRunLess = this.o.isRunLess || false;
    this.pathStart = this.o.pathStart || 0;
    this.pathEnd = this.o.pathEnd || 1;
    if (pathStart < 0) {
      pathStart = 0;
    }
    if (pathStart > 1) {
      pathStart = 1;
    }
    if (pathEnd < 0) {
      pathEnd = 0;
    }
    if (pathEnd > 1) {
      pathEnd = 1;
    }
    this.isPresetPosition = this.o.isPresetPosition || true;
    this.transformOrigin = this.o.transformOrigin;
    this.onStart = this.o.onStart;
    this.onComplete = this.o.onComplete;
    this.onUpdate = this.o.onUpdate;
    return this.postVars();
  };

  MotionPath.prototype.postVars = function() {
    this.el = this.parseEl(this.o.el);
    this.path = this.getPath();
    this.len = this.path.getTotalLength();
    this.fill = this.o.fill;
    if (this.fill != null) {
      this.container = this.parseEl(this.fill.container);
      this.fillRule = this.fill.fillRule || 'all';
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
    if (typeof this.o.path === 'string') {
      if (this.o.path.charAt(0).toLowerCase() === 'm') {
        path = document.createElementNS(this.NS, 'path');
        path.setAttributeNS(null, 'd', this.o.path);
        return path;
      } else {
        return document.querySelector(this.o.path);
      }
    }
    if (this.o.path.style) {
      return this.o.path;
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

  MotionPath.prototype.presetPosition = function() {
    return this.setProgress(this.pathStart);
  };

  MotionPath.prototype.run = function(o) {
    var it;
    if (o != null ? o.path : void 0) {
      this.o.path = o.path;
    }
    if (o != null ? o.el : void 0) {
      this.o.el = o.el;
    }
    if (o != null ? o.fill : void 0) {
      this.o.fill = o.fill;
    }
    o && this.extendDefaults(o);
    o && this.postVars();
    it = this;
    this.timeline = new Timeline({
      duration: this.duration,
      delay: this.delay,
      yoyo: this.yoyo,
      repeat: this.repeat,
      easing: 'linear.none',
      onStart: (function(_this) {
        return function() {
          return typeof _this.onStart === "function" ? _this.onStart() : void 0;
        };
      })(this),
      onComplete: (function(_this) {
        return function() {
          return typeof _this.onComplete === "function" ? _this.onComplete() : void 0;
        };
      })(this),
      onUpdate: (function(_this) {
        return function(p) {
          return _this.setProgress(p);
        };
      })(this)
    });
    this.tween = new Tween;
    this.tween.add(this.timeline);
    return this.tween.start();
  };

  MotionPath.prototype.setProgress = function(p) {
    var len, point, prevPoint, rotate, tOrigin, transform, x, x1, x2, y;
    len = !this.isReverse ? p * this.len : (1 - p) * this.len;
    point = this.path.getPointAtLength(len);
    if (this.isAngle || (this.angleOffset != null)) {
      prevPoint = this.path.getPointAtLength(len - 1);
      x1 = point.y - prevPoint.y;
      x2 = point.x - prevPoint.x;
      this.angle = Math.atan(x1 / x2) * h.DEG2;
      if ((typeof this.angleOffset) !== 'function') {
        this.angle += this.angleOffset || 0;
      } else {
        this.angle = this.angleOffset(this.angle, p);
      }
    } else {
      this.angle = 0;
    }
    x = point.x + this.offsetX;
    y = point.y + this.offsetY;
    if (this.scaler) {
      x *= this.scaler.x;
      y *= this.scaler.y;
    }
    rotate = this.angle !== 0 ? "rotate(" + this.angle + "deg)" : '';
    transform = "translate(" + x + "px," + y + "px) " + rotate + " translateZ(0)";
    this.el.style["" + h.prefix.js + "Transform"] = transform;
    this.el.style['transform'] = transform;
    if (this.transformOrigin) {
      tOrigin = typeof this.transformOrigin === 'function' ? this.transformOrigin(this.angle, p) : this.transformOrigin;
      this.el.style["" + h.prefix.js + "TransformOrigin"] = tOrigin;
      this.el.style['transformOrigin'] = tOrigin;
    }
    return typeof this.onUpdate === "function" ? this.onUpdate(p) : void 0;
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
