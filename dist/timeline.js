var Easing, Timeline, h;

h = require('./h');

Easing = require('./easing');

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
    var easing;
    this.h = h;
    this.props = {};
    this.progress = 0;
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
    this.props.startTime = (time || performance.now()) + this.o.delay;
    this.props.endTime = this.props.startTime + this.props.totalDuration;
    return this;
  };

  Timeline.prototype.update = function(time) {
    var cnt, elapsed, isFlip, start, _ref, _ref1;
    if ((time >= this.props.startTime) && (time < this.props.endTime)) {
      if (!this.isStarted) {
        if ((_ref = this.o.onStart) != null) {
          _ref.apply(this);
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
      return typeof this.onUpdate === "function" ? this.onUpdate(this.easedProgress) : void 0;
    } else {
      if (time >= this.props.endTime && !this.isCompleted) {
        if ((_ref1 = this.o.onComplete) != null) {
          _ref1.apply(this);
        }
        this.isCompleted = true;
        this.setProc(1);
        return typeof this.onUpdate === "function" ? this.onUpdate(this.easedProgress) : void 0;
      }
    }
  };

  Timeline.prototype.setProc = function(p) {
    this.progress = p;
    return this.easedProgress = this.props.easing(this.progress);
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
