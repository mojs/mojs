var Timeline, h;

h = require('./h');

Timeline = (function() {
  Timeline.prototype.defaults = {
    duration: 600,
    delay: 0,
    yoyo: false,
    durationElapsed: 0,
    delayElapsed: 0,
    repeat: 0,
    onStart: null,
    onComplete: null
  };

  function Timeline(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.extendDefaults();
    this.getInitParams();
  }

  Timeline.prototype.vars = function() {
    this.h = h;
    this.progress = 0;
    return this.props = {
      totalElapsed: 0,
      durationElapsed: 0,
      delayElapsed: 0
    };
  };

  Timeline.prototype.extendDefaults = function() {
    this.h.extend(this.o, this.defaults);
    return this.onUpdate = this.o.onUpdate;
  };

  Timeline.prototype.getInitParams = function() {
    this.props.durationSteps = this.o.duration / 16;
    return this.props.delaySteps = this.o.delay / 16;
  };

  Timeline.prototype.tick = function(step) {
    var addition, _ref, _ref1;
    if (step == null) {
      step = 1;
    }
    this.props.totalElapsed += step;
    if (this.props.totalElapsed <= this.props.delaySteps) {
      return this.props.delayElapsed += step;
    } else {
      if (!this.isStarted) {
        if ((_ref = this.o.onStart) != null) {
          _ref.apply(this);
        }
        this.isStarted = true;
      }
      addition = this.props.delayElapsed < this.props.delaySteps ? step - (this.props.delaySteps - this.props.delayElapsed) : step;
      this.props.delayElapsed = this.props.delaySteps;
      this.props.durationElapsed += addition;
      this.progress = this.getProgress();
      if (typeof this.onUpdate === "function") {
        this.onUpdate(this.progress);
      }
      if (this.props.durationElapsed >= this.props.durationSteps) {
        this.props.durationElapsed = this.props.durationSteps;
        if (!this.isCompleted) {
          if (this.o.repeat) {
            return this.handleRepeat();
          } else {
            if ((_ref1 = this.o.onComplete) != null) {
              _ref1.apply(this);
            }
            return this.isCompleted = true;
          }
        }
      }
    }
  };

  Timeline.prototype.getProgress = function() {
    var progress;
    progress = Math.min(this.props.durationElapsed / this.props.durationSteps, 1);
    if (this.isReversed) {
      return 1 - progress;
    } else {
      return progress;
    }
  };

  Timeline.prototype.handleRepeat = function() {
    this.props.delayElapsed = 0;
    this.props.durationElapsed = 0;
    this.props.totalElapsed = 0;
    this.o.yoyo && (this.isReversed = !this.isReversed);
    this.o.repeat--;
    return this.isCompleted = false;
  };

  return Timeline;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Timeline", [], function() {
    return Timeline;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Timeline;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Timeline = Timeline;
}
