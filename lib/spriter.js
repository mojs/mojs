(function() {
  var Spriter, Timeline, Tween, h;

  h = require('./h');

  Tween = require('./tween/tween');

  Timeline = require('./tween/timeline');

  Spriter = (function() {
    Spriter.prototype._defaults = {
      duration: 500,
      delay: 0,
      easing: 'linear.none',
      repeat: 0,
      yoyo: false,
      isRunLess: false,
      isShowEnd: false,
      onStart: null,
      onUpdate: null,
      onComplete: null
    };

    function Spriter(o) {
      this.o = o != null ? o : {};
      if (this.o.el == null) {
        return h.error('No "el" option specified, aborting');
      }
      this._vars();
      this._extendDefaults();
      this._parseFrames();
      if (this._frames.length <= 2) {
        h.warn("Spriter: only " + this._frames.length + " frames found");
      }
      if (this._frames.length < 1) {
        h.error("Spriter: there is no frames to animate, aborting");
      }
      this._createTween();
      this;
    }

    Spriter.prototype._vars = function() {
      this._props = h.cloneObj(this.o);
      this.el = this.o.el;
      return this._frames = [];
    };

    Spriter.prototype.run = function(o) {
      return this._timeline.start();
    };

    Spriter.prototype._extendDefaults = function() {
      return h.extend(this._props, this._defaults);
    };

    Spriter.prototype._parseFrames = function() {
      var frame, i, _i, _len, _ref;
      this._frames = Array.prototype.slice.call(this.el.children, 0);
      _ref = this._frames;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        frame = _ref[i];
        frame.style.opacity = 0;
      }
      return this._frameStep = 1 / this._frames.length;
    };

    Spriter.prototype._createTween = function() {
      this._tween = new Tween({
        duration: this._props.duration,
        delay: this._props.delay,
        yoyo: this._props.yoyo,
        repeat: this._props.repeat,
        easing: this._props.easing,
        onStart: (function(_this) {
          return function() {
            var _base;
            return typeof (_base = _this._props).onStart === "function" ? _base.onStart() : void 0;
          };
        })(this),
        onComplete: (function(_this) {
          return function() {
            var _base;
            return typeof (_base = _this._props).onComplete === "function" ? _base.onComplete() : void 0;
          };
        })(this),
        onUpdate: (function(_this) {
          return function(p) {
            return _this._setProgress(p);
          };
        })(this)
      });
      this._timeline = new Timeline;
      this._timeline.add(this._tween);
      return !this._props.isRunLess && this._startTween();
    };

    Spriter.prototype._startTween = function() {
      return setTimeout(((function(_this) {
        return function() {
          return _this._timeline.start();
        };
      })(this)), 1);
    };

    Spriter.prototype._setProgress = function(p) {
      var currentNum, proc, _base, _ref, _ref1;
      proc = Math.floor(p / this._frameStep);
      if (this._prevFrame !== this._frames[proc]) {
        if ((_ref = this._prevFrame) != null) {
          _ref.style.opacity = 0;
        }
        currentNum = p === 1 && this._props.isShowEnd ? proc - 1 : proc;
        if ((_ref1 = this._frames[currentNum]) != null) {
          _ref1.style.opacity = 1;
        }
        this._prevFrame = this._frames[proc];
      }
      return typeof (_base = this._props).onUpdate === "function" ? _base.onUpdate(p) : void 0;
    };

    return Spriter;

  })();

  module.exports = Spriter;

}).call(this);
