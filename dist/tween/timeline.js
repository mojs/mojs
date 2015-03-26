var Easing, Timeline, h;

Easing = require('../easing');

h = require('../h');

Timeline = (function() {
  Timeline.prototype.defaults = {
    duration: 600,
    delay: 0,
    repeat: 0,
    yoyo: false,
    easing: 'Linear.None',
    durationElapsed: 0,
    delayElapsed: 0,
    onStart: null,
    onComplete: null
  };

  function Timeline(o) {
    this.o = o != null ? o : {};
    this.extendDefaults();
    this.vars();
    this;
  }

  Timeline.prototype.vars = function() {
    this.h = h;
    this.props = {};
    this.progress = 0;
    this.prevTime = 0;
    return this.calcDimentions();
  };

  Timeline.prototype.calcDimentions = function() {
    var easing;
    this.props.totalTime = (this.o.repeat + 1) * (this.o.duration + this.o.delay);
    this.props.totalDuration = this.props.totalTime - this.o.delay;
    easing = h.splitEasing(this.o.easing);
    return this.props.easing = typeof easing === 'function' ? easing : Easing[easing[0]][easing[1]];
  };

  Timeline.prototype.extendDefaults = function() {
    h.extend(this.o, this.defaults);
    return this.onUpdate = this.o.onUpdate;
  };

  Timeline.prototype.start = function(time) {
    this.isCompleted = false;
    this.isStarted = false;
    this.props.startTime = (time || Date.now()) + this.o.delay;
    this.props.endTime = this.props.startTime + this.props.totalDuration;
    return this;
  };

  Timeline.prototype.update = function(time) {
    var cnt, elapsed, isFlip, start, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    if ((time >= this.props.startTime) && (time < this.props.endTime)) {
      this.isOnReverseComplete = false;
      this.isCompleted = false;
      if (!this.isFirstUpdate) {
        if ((_ref = this.o.onFirstUpdate) != null) {
          _ref.apply(this);
        }
        this.isFirstUpdate = true;
      }
      if (!this.isStarted) {
        if ((_ref1 = this.o.onStart) != null) {
          _ref1.apply(this);
        }
        this.isStarted = true;
      }
      elapsed = time - this.props.startTime;
      if (elapsed <= this.o.duration) {
        this.setProc(elapsed / this.o.duration);
      } else {
        start = this.props.startTime;
        isFlip = false;
        cnt = 0;
        while (start <= time) {
          isFlip = !isFlip;
          start += isFlip ? (cnt++, this.o.duration) : this.o.delay;
        }
        if (isFlip) {
          start = start - this.o.duration;
          elapsed = time - start;
          this.setProc(elapsed / this.o.duration);
          if (this.o.yoyo && this.o.repeat) {
            this.setProc(cnt % 2 === 1 ? this.progress : 1 - (this.progress === 0 ? 1 : this.progress));
          }
        } else {
          this.setProc(0);
        }
      }
      if (time < this.prevTime && !this.isFirstUpdateBackward) {
        if ((_ref2 = this.o.onFirstUpdateBackward) != null) {
          _ref2.apply(this);
        }
        this.isFirstUpdateBackward = true;
      }
      if (typeof this.onUpdate === "function") {
        this.onUpdate(this.easedProgress);
      }
    } else {
      if (time >= this.props.endTime && !this.isCompleted) {
        this.setProc(1);
        if (typeof this.onUpdate === "function") {
          this.onUpdate(this.easedProgress);
        }
        if ((_ref3 = this.o.onComplete) != null) {
          _ref3.apply(this);
        }
        this.isCompleted = true;
        this.isOnReverseComplete = false;
      }
      if (time > this.props.endTime || time < this.props.startTime) {
        this.isFirstUpdate = false;
      }
      if (time > this.props.endTime) {
        this.isFirstUpdateBackward = false;
      }
    }
    if (time < this.prevTime && time <= this.props.startTime) {
      this.o.isIt && console.log(this.isFirstUpdateBackward);
      if (!this.isFirstUpdateBackward) {
        this.o.isIt && console.log('yup');
        if ((_ref4 = this.o.onFirstUpdateBackward) != null) {
          _ref4.apply(this);
        }
        this.isFirstUpdateBackward = true;
      }
      if (!this.isOnReverseComplete) {
        this.isOnReverseComplete = true;
        this.setProc(0);
        if (typeof this.onUpdate === "function") {
          this.onUpdate(this.easedProgress);
        }
        if ((_ref5 = this.o.onReverseComplete) != null) {
          _ref5.apply(this);
        }
      }
    }
    return this.prevTime = time;
  };

  Timeline.prototype.setProc = function(p) {
    this.progress = p;
    return this.easedProgress = this.props.easing(this.progress);
  };

  Timeline.prototype.setProp = function(obj, value) {
    var key, val;
    if (typeof obj === 'object') {
      for (key in obj) {
        val = obj[key];
        this.o[key] = val;
      }
    } else if (typeof obj === 'string') {
      this.o[obj] = value;
    }
    return this.calcDimentions();
  };

  return Timeline;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Timeline", [], function() {
    return Timeline;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Timeline;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Timeline = Timeline;
}
