(function() {
  var MotionPath, Timeline, Tween, h, resize,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  h = require('./h');

  resize = require('./vendor/resize');

  Tween = require('./tween/tween');

  Timeline = require('./tween/timeline');

  MotionPath = (function() {
    MotionPath.prototype.defaults = {
      path: null,
      curvature: {
        x: '75%',
        y: '50%'
      },
      isCompositeLayer: true,
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
      motionBlur: 0,
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
      this.calcHeight = __bind(this.calcHeight, this);
      if (this.vars()) {
        return;
      }
      this.createTween();
      this;
    }

    MotionPath.prototype.vars = function() {
      this.getScaler = h.bind(this.getScaler, this);
      this.resize = resize;
      this.props = h.cloneObj(this.defaults);
      this.extendOptions(this.o);
      this.isMotionBlurReset = h.isSafari || h.isIE;
      this.isMotionBlurReset && (this.props.motionBlur = 0);
      this.history = [h.cloneObj(this.props)];
      return this.postVars();
    };

    MotionPath.prototype.curveToPath = function(o) {
      var angle, curvature, curvatureX, curvatureY, curvePoint, curveXPoint, dX, dY, endPoint, path, percent, radius, start;
      path = document.createElementNS(h.NS, 'path');
      start = o.start;
      endPoint = {
        x: start.x + o.shift.x,
        y: start.x + o.shift.y
      };
      curvature = o.curvature;
      dX = o.shift.x;
      dY = o.shift.y;
      radius = Math.sqrt(dX * dX + dY * dY);
      percent = radius / 100;
      angle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
      if (o.shift.x < 0) {
        angle = angle + 180;
      }
      curvatureX = h.parseUnit(curvature.x);
      curvatureX = curvatureX.unit === '%' ? curvatureX.value * percent : curvatureX.value;
      curveXPoint = h.getRadialPoint({
        center: {
          x: start.x,
          y: start.y
        },
        radius: curvatureX,
        angle: angle
      });
      curvatureY = h.parseUnit(curvature.y);
      curvatureY = curvatureY.unit === '%' ? curvatureY.value * percent : curvatureY.value;
      curvePoint = h.getRadialPoint({
        center: {
          x: curveXPoint.x,
          y: curveXPoint.y
        },
        radius: curvatureY,
        angle: angle + 90
      });
      path.setAttribute('d', "M" + start.x + "," + start.y + " Q" + curvePoint.x + "," + curvePoint.y + " " + endPoint.x + "," + endPoint.y);
      return path;
    };

    MotionPath.prototype.postVars = function() {
      this.props.pathStart = h.clamp(this.props.pathStart, 0, 1);
      this.props.pathEnd = h.clamp(this.props.pathEnd, this.props.pathStart, 1);
      this.angle = 0;
      this.speedX = 0;
      this.speedY = 0;
      this.blurX = 0;
      this.blurY = 0;
      this.prevCoords = {};
      this.blurAmount = 20;
      this.props.motionBlur = h.clamp(this.props.motionBlur, 0, 1);
      this.onUpdate = this.props.onUpdate;
      if (!this.o.el) {
        h.error('Missed "el" option. It could be a selector, DOMNode or another module.');
        return true;
      }
      this.el = this.parseEl(this.props.el);
      this.props.motionBlur > 0 && this.createFilter();
      this.path = this.getPath();
      if (!this.path.getAttribute('d')) {
        h.error('Path has no coordinates to work with, aborting');
        return true;
      }
      this.len = this.path.getTotalLength();
      this.slicedLen = this.len * (this.props.pathEnd - this.props.pathStart);
      this.startLen = this.props.pathStart * this.len;
      this.fill = this.props.fill;
      if (this.fill != null) {
        this.container = this.parseEl(this.props.fill.container);
        this.fillRule = this.props.fill.fillRule || 'all';
        this.getScaler();
        if (this.container != null) {
          this.removeEvent(this.container, 'onresize', this.getScaler);
          return this.addEvent(this.container, 'onresize', this.getScaler);
        }
      }
    };

    MotionPath.prototype.addEvent = function(el, type, handler) {
      return el.addEventListener(type, handler, false);
    };

    MotionPath.prototype.removeEvent = function(el, type, handler) {
      return el.removeEventListener(type, handler, false);
    };

    MotionPath.prototype.createFilter = function() {
      var div, svg;
      div = document.createElement('div');
      this.filterID = "filter-" + (h.getUniqID());
      div.innerHTML = "<svg id=\"svg-" + this.filterID + "\"\n    style=\"visibility:hidden; width:0px; height:0px\">\n  <filter id=\"" + this.filterID + "\" y=\"-20\" x=\"-20\" width=\"40\" height=\"40\">\n    <feOffset\n      id=\"blur-offset\" in=\"SourceGraphic\"\n      dx=\"0\" dy=\"0\" result=\"offset2\"></feOffset>\n    <feGaussianblur\n      id=\"blur\" in=\"offset2\"\n      stdDeviation=\"0,0\" result=\"blur2\"></feGaussianblur>\n    <feMerge>\n      <feMergeNode in=\"SourceGraphic\"></feMergeNode>\n      <feMergeNode in=\"blur2\"></feMergeNode>\n    </feMerge>\n  </filter>\n</svg>";
      svg = div.querySelector("#svg-" + this.filterID);
      this.filter = svg.querySelector('#blur');
      this.filterOffset = svg.querySelector('#blur-offset');
      document.body.insertBefore(svg, document.body.firstChild);
      this.el.style['filter'] = "url(#" + this.filterID + ")";
      return this.el.style["" + h.prefix.css + "filter"] = "url(#" + this.filterID + ")";
    };

    MotionPath.prototype.parseEl = function(el) {
      if (typeof el === 'string') {
        return document.querySelector(el);
      }
      if (el instanceof HTMLElement) {
        return el;
      }
      if (el.setProp != null) {
        this.isModule = true;
        return el;
      }
    };

    MotionPath.prototype.getPath = function() {
      var path;
      path = h.parsePath(this.props.path);
      if (path) {
        return path;
      }
      if (this.props.path.x || this.props.path.y) {
        return this.curveToPath({
          start: {
            x: 0,
            y: 0
          },
          shift: {
            x: this.props.path.x || 0,
            y: this.props.path.y || 0
          },
          curvature: {
            x: this.props.curvature.x || this.defaults.curvature.x,
            y: this.props.curvature.y || this.defaults.curvature.y
          }
        });
      }
    };

    MotionPath.prototype.getScaler = function() {
      var end, size, start;
      this.cSize = {
        width: this.container.offsetWidth || 0,
        height: this.container.offsetHeight || 0
      };
      start = this.path.getPointAtLength(0);
      end = this.path.getPointAtLength(this.len);
      size = {};
      this.scaler = {};
      size.width = end.x >= start.x ? end.x - start.x : start.x - end.x;
      size.height = end.y >= start.y ? end.y - start.y : start.y - end.y;
      switch (this.fillRule) {
        case 'all':
          this.calcWidth(size);
          return this.calcHeight(size);
        case 'width':
          this.calcWidth(size);
          return this.scaler.y = this.scaler.x;
        case 'height':
          this.calcHeight(size);
          return this.scaler.x = this.scaler.y;
      }
    };

    MotionPath.prototype.calcWidth = function(size) {
      this.scaler.x = this.cSize.width / size.width;
      return !isFinite(this.scaler.x) && (this.scaler.x = 1);
    };

    MotionPath.prototype.calcHeight = function(size) {
      this.scaler.y = this.cSize.height / size.height;
      return !isFinite(this.scaler.y) && (this.scaler.y = 1);
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
      this.tween = new Tween({
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
            _this.props.motionBlur && _this.setBlur({
              blur: {
                x: 0,
                y: 0
              },
              offset: {
                x: 0,
                y: 0
              }
            });
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
      this.timeline = new Timeline;
      this.timeline.add(this.tween);
      !this.props.isRunLess && this.startTween();
      return this.props.isPresetPosition && this.setProgress(0, true);
    };

    MotionPath.prototype.startTween = function() {
      return setTimeout(((function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.timeline) != null ? _ref.start() : void 0;
        };
      })(this)), 1);
    };

    MotionPath.prototype.setProgress = function(p, isInit) {
      var len, point, x, y;
      len = this.startLen + (!this.props.isReverse ? p * this.slicedLen : (1 - p) * this.slicedLen);
      point = this.path.getPointAtLength(len);
      x = point.x + this.props.offsetX;
      y = point.y + this.props.offsetY;
      this._getCurrentAngle(point, len, p);
      this._setTransformOrigin(p);
      this._setTransform(x, y, p, isInit);
      return this.props.motionBlur && this.makeMotionBlur(x, y);
    };

    MotionPath.prototype.setElPosition = function(x, y, p) {
      var composite, isComposite, rotate, transform;
      rotate = this.angle !== 0 ? "rotate(" + this.angle + "deg)" : '';
      isComposite = this.props.isCompositeLayer && h.is3d;
      composite = isComposite ? 'translateZ(0)' : '';
      transform = "translate(" + x + "px," + y + "px) " + rotate + " " + composite;
      return h.setPrefixedStyle(this.el, 'transform', transform);
    };

    MotionPath.prototype.setModulePosition = function(x, y) {
      this.el.setProp({
        shiftX: "" + x + "px",
        shiftY: "" + y + "px",
        angle: this.angle
      });
      return this.el.draw();
    };

    MotionPath.prototype._getCurrentAngle = function(point, len, p) {
      var atan, isTransformFunOrigin, prevPoint, x1, x2;
      isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
      if (this.props.isAngle || (this.props.angleOffset != null) || isTransformFunOrigin) {
        prevPoint = this.path.getPointAtLength(len - 1);
        x1 = point.y - prevPoint.y;
        x2 = point.x - prevPoint.x;
        atan = Math.atan(x1 / x2);
        !isFinite(atan) && (atan = 0);
        this.angle = atan * h.RAD_TO_DEG;
        if ((typeof this.props.angleOffset) !== 'function') {
          return this.angle += this.props.angleOffset || 0;
        } else {
          return this.angle = this.props.angleOffset.call(this, this.angle, p);
        }
      } else {
        return this.angle = 0;
      }
    };

    MotionPath.prototype._setTransform = function(x, y, p, isInit) {
      var transform;
      if (this.scaler) {
        x *= this.scaler.x;
        y *= this.scaler.y;
      }
      transform = null;
      if (!isInit) {
        transform = typeof this.onUpdate === "function" ? this.onUpdate(p, {
          x: x,
          y: y,
          angle: this.angle
        }) : void 0;
      }
      if (this.isModule) {
        return this.setModulePosition(x, y);
      } else {
        if (typeof transform !== 'string') {
          return this.setElPosition(x, y, p);
        } else {
          return h.setPrefixedStyle(this.el, 'transform', transform);
        }
      }
    };

    MotionPath.prototype._setTransformOrigin = function(p) {
      var isTransformFunOrigin, tOrigin;
      if (this.props.transformOrigin) {
        isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
        tOrigin = !isTransformFunOrigin ? this.props.transformOrigin : this.props.transformOrigin(this.angle, p);
        return h.setPrefixedStyle(this.el, 'transform-origin', tOrigin);
      }
    };

    MotionPath.prototype.makeMotionBlur = function(x, y) {
      var absoluteAngle, coords, dX, dY, signX, signY, tailAngle;
      tailAngle = 0;
      signX = 1;
      signY = 1;
      if ((this.prevCoords.x == null) || (this.prevCoords.y == null)) {
        this.speedX = 0;
        this.speedY = 0;
      } else {
        dX = x - this.prevCoords.x;
        dY = y - this.prevCoords.y;
        if (dX > 0) {
          signX = -1;
        }
        if (signX < 0) {
          signY = -1;
        }
        this.speedX = Math.abs(dX);
        this.speedY = Math.abs(dY);
        tailAngle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
      }
      absoluteAngle = tailAngle - this.angle;
      coords = this.angToCoords(absoluteAngle);
      this.blurX = h.clamp((this.speedX / 16) * this.props.motionBlur, 0, 1);
      this.blurY = h.clamp((this.speedY / 16) * this.props.motionBlur, 0, 1);
      this.setBlur({
        blur: {
          x: 3 * this.blurX * this.blurAmount * Math.abs(coords.x),
          y: 3 * this.blurY * this.blurAmount * Math.abs(coords.y)
        },
        offset: {
          x: 3 * signX * this.blurX * coords.x * this.blurAmount,
          y: 3 * signY * this.blurY * coords.y * this.blurAmount
        }
      });
      this.prevCoords.x = x;
      return this.prevCoords.y = y;
    };

    MotionPath.prototype.setBlur = function(o) {
      if (!this.isMotionBlurReset) {
        this.filter.setAttribute('stdDeviation', "" + o.blur.x + "," + o.blur.y);
        this.filterOffset.setAttribute('dx', o.offset.x);
        return this.filterOffset.setAttribute('dy', o.offset.y);
      }
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
      var it, key, opts, prevOptions, value;
      prevOptions = this.history[this.history.length - 1];
      opts = {};
      for (key in prevOptions) {
        value = prevOptions[key];
        if (!h.callbacksMap[key] && !h.tweenOptionMap[key] || key === 'duration') {
          if (o[key] == null) {
            o[key] = value;
          }
        } else {
          if (o[key] == null) {
            o[key] = void 0;
          }
        }
        if (h.tweenOptionMap[key]) {
          opts[key] = key !== 'duration' ? o[key] : o[key] != null ? o[key] : prevOptions[key];
        }
      }
      this.history.push(o);
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
      opts.isChained = !o.delay;
      this.timeline.append(new Tween(opts));
      return this;
    };

    MotionPath.prototype.tuneOptions = function(o) {
      this.extendOptions(o);
      return this.postVars();
    };

    MotionPath.prototype.angToCoords = function(angle) {
      var radAngle, x, y;
      angle = angle % 360;
      radAngle = ((angle - 90) * Math.PI) / 180;
      x = Math.cos(radAngle);
      y = Math.sin(radAngle);
      x = x < 0 ? Math.max(x, -0.7) : Math.min(x, .7);
      y = y < 0 ? Math.max(y, -0.7) : Math.min(y, .7);
      return {
        x: x * 1.428571429,
        y: y * 1.428571429
      };
    };

    return MotionPath;

  })();

  module.exports = MotionPath;

}).call(this);
