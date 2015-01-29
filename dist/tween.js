var Tween, h;

h = require('./h');

Tween = (function() {
  function Tween(o) {
    this.o = o != null ? o : {};
    this.vars();
    this;
  }

  Tween.prototype.vars = function() {
    this.timelines = [];
    this.duration = 0;
    return this.loop = h.bind(this.loop, this);
  };

  Tween.prototype.add = function(timeline) {
    this.timelines.push(timeline);
    return this.duration = Math.max(timeline.props.totalTime, this.duration);
  };

  Tween.prototype.update = function(time) {
    var i, _results;
    i = this.timelines.length;
    _results = [];
    while (i--) {
      _results.push(this.timelines[i].update(time));
    }
    return _results;
  };

  Tween.prototype.start = function() {
    var i;
    this.startTime = Date.now();
    this.endTime = this.startTime + this.duration;
    i = this.timelines.length;
    while (i--) {
      this.timelines[i].start(this.startTime);
    }
    return this.startLoop();
  };

  Tween.prototype.loop = function() {
    var time;
    if (!this.isRunning) {
      return this;
    }
    time = Date.now();
    this.update(time);
    if (time > this.endTime) {
      return this.isRunning = false;
    }
    requestAnimationFrame(this.loop);
    return this;
  };

  Tween.prototype.startLoop = function() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    return requestAnimationFrame(this.loop);
  };

  Tween.prototype.stopLoop = function() {
    return this.isRunning = false;
  };

  return Tween;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Tween", [], function() {
    return Tween;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Tween;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Tween = Tween;
}
