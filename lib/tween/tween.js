(function() {
  var Tween, easing, h, t;

  h = require('../h');

  t = require('./tweener');

  easing = require('../easing/easing');

  Tween = (function() {
    Tween.prototype.defaults = {
      duration: 600,
      delay: 0,
      repeat: 0,
      yoyo: false,
      easing: 'Linear.None',
      onStart: null,
      onComplete: null,
      onReverseComplete: null,
      onFirstUpdate: null,
      onUpdate: null,
      onFirstUpdateBackward: null,
      isChained: false
    };

    function Tween(o) {
      this.o = o != null ? o : {};
      this.extendDefaults();
      this.vars();
      this;
    }

    Tween.prototype.vars = function() {
      this.h = h;
      this.progress = 0;
      this.prevTime = 0;
      return this.calcDimentions();
    };

    Tween.prototype.calcDimentions = function() {
      this.props.time = this.props.duration + this.props.delay;
      return this.props.repeatTime = this.props.time * (this.props.repeat + 1);
    };

    Tween.prototype.extendDefaults = function() {
      var key, value, _ref;
      this.props = {};
      _ref = this.defaults;
      for (key in _ref) {
        value = _ref[key];
        this.props[key] = this.o[key] != null ? this.o[key] : value;
      }
      this.props.easing = easing.parseEasing(this.o.easing || this.defaults.easing);
      return this.onUpdate = this.props.onUpdate;
    };

    Tween.prototype.start = function(time) {
      this.isCompleted = false;
      this.isStarted = false;
      if (time == null) {
        time = performance.now();
      }
      this.props.startTime = time + this.props.delay + (this.props.shiftTime || 0);
      this.props.endTime = this.props.startTime + this.props.repeatTime - this.props.delay;
      return this;
    };

    Tween.prototype.update = function(time, isGrow) {
      var _ref, _ref1, _ref2, _ref3, _ref4;
      if ((time >= this.props.startTime) && (time < this.props.endTime)) {
        this.isOnReverseComplete = false;
        this.isCompleted = false;
        if (!this.isFirstUpdate) {
          if ((_ref = this.props.onFirstUpdate) != null) {
            _ref.apply(this);
          }
          this.isFirstUpdate = true;
        }
        if (!this.isStarted) {
          if ((_ref1 = this.props.onStart) != null) {
            _ref1.apply(this);
          }
          this.isStarted = true;
        }
        this._updateInActiveArea(time);
        if (time < this.prevTime && !this.isFirstUpdateBackward) {
          if ((_ref2 = this.props.onFirstUpdateBackward) != null) {
            _ref2.apply(this);
          }
          this.isFirstUpdateBackward = true;
        }
      } else {
        if (time >= this.props.endTime && !this.isCompleted) {
          this._complete();
        }
        if (time > this.props.endTime) {
          this.isFirstUpdate = false;
        }
        if (time > this.props.endTime) {
          this.isFirstUpdateBackward = false;
        }
      }
      if (time < this.prevTime && time <= this.props.startTime) {
        if (!this.isFirstUpdateBackward) {
          if ((_ref3 = this.props.onFirstUpdateBackward) != null) {
            _ref3.apply(this);
          }
          this.isFirstUpdateBackward = true;
        }
        if (isGrow) {
          this._complete();
        } else if (!this.isOnReverseComplete) {
          this.isOnReverseComplete = true;
          this.setProgress(0, !this.props.isChained);
          if ((_ref4 = this.props.onReverseComplete) != null) {
            _ref4.apply(this);
          }
        }
        this.isFirstUpdate = false;
      }
      this.prevTime = time;
      return this.isCompleted;
    };

    Tween.prototype._complete = function() {
      var _ref;
      this.setProgress(1);
      if ((_ref = this.props.onComplete) != null) {
        _ref.apply(this);
      }
      this.isCompleted = true;
      this.isStarted = false;
      return this.isOnReverseComplete = false;
    };

    Tween.prototype._updateInActiveArea = function(time) {
      var cnt, elapsed, elapsed2, proc, startPoint;
      startPoint = this.props.startTime - this.props.delay;
      elapsed = (time - startPoint) % (this.props.delay + this.props.duration);
      cnt = Math.floor((time - startPoint) / (this.props.delay + this.props.duration));
      if (startPoint + elapsed >= this.props.startTime) {
        elapsed2 = (time - this.props.startTime) % (this.props.delay + this.props.duration);
        proc = elapsed2 / this.props.duration;
        return this.setProgress(!this.props.yoyo ? proc : cnt % 2 === 0 ? proc : 1 - (proc === 1 ? 0 : proc));
      } else {
        return this.setProgress(this.prevTime < time ? 1 : 0);
      }
    };

    Tween.prototype.setProgress = function(p, isCallback) {
      if (isCallback == null) {
        isCallback = true;
      }
      this.progress = p;
      this.easedProgress = this.props.easing(this.progress);
      if (this.props.prevEasedProgress !== this.easedProgress && isCallback) {
        if (typeof this.onUpdate === "function") {
          this.onUpdate(this.easedProgress, this.progress);
        }
      }
      return this.props.prevEasedProgress = this.easedProgress;
    };

    Tween.prototype.setProp = function(obj, value) {
      var key, val;
      if (typeof obj === 'object') {
        for (key in obj) {
          val = obj[key];
          this.props[key] = val;
          if (key === 'easing') {
            this.props.easing = easing.parseEasing(this.props.easing);
          }
        }
      } else if (typeof obj === 'string') {
        if (obj === 'easing') {
          this.props.easing = easing.parseEasing(value);
        } else {
          this.props[obj] = value;
        }
      }
      return this.calcDimentions();
    };

    Tween.prototype.run = function(time) {
      this.start(time);
      !time && (t.add(this));
      return this;
    };

    Tween.prototype.stop = function() {
      this.pause();
      this.setProgress(0);
      return this;
    };

    Tween.prototype.pause = function() {
      this._removeFromTweener();
      return this;
    };

    Tween.prototype._removeFromTweener = function() {
      t.remove(this);
      return this;
    };

    return Tween;

  })();

  module.exports = Tween;

}).call(this);
