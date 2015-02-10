var Tween, h, t;

h = require('./h');

t = require('./tweener');

Tween = (function() {
  function Tween(o) {
    this.o = o != null ? o : {};
    this.vars();
    this;
  }

  Tween.prototype.vars = function() {
    this.timelines = [];
    this.duration = 0;
    this.props = {};
    this.loop = h.bind(this.loop, this);
    return this.onUpdate = this.o.onUpdate;
  };

  Tween.prototype.add = function(timeline) {
    this.timelines.push(timeline);
    return this.duration = Math.max(timeline.props.totalTime, this.duration);
  };

  Tween.prototype.remove = function(timeline) {
    var index;
    index = this.timelines.indexOf(timeline);
    if (index !== -1) {
      return this.timelines.splice(index, 1);
    }
  };

  Tween.prototype.reset = function(timeline) {
    this.remove(timeline);
    return this.add(timeline);
  };

  Tween.prototype.recalcDuration = function() {
    var len, timeline, _results;
    len = this.timelines.length;
    this.duration = 0;
    _results = [];
    while (len--) {
      timeline = this.timelines[len];
      _results.push(this.duration = Math.max(timeline.props.totalTime, this.duration));
    }
    return _results;
  };

  Tween.prototype.update = function(time) {
    var i, _ref;
    if (this.isCompleted) {
      return;
    }
    i = this.timelines.length;
    while (i--) {
      this.timelines[i].update(time);
    }
    if (time >= this.endTime) {
      if ((_ref = this.o.onComplete) != null) {
        _ref.apply(this);
      }
      if (typeof this.onUpdate === "function") {
        this.onUpdate(1);
      }
      return this.isCompleted = true;
    }
    if (time >= this.startTime) {
      return typeof this.onUpdate === "function" ? this.onUpdate((time - this.startTime) / this.duration) : void 0;
    }
  };

  Tween.prototype.start = function() {
    var i, _ref;
    this.isCompleted = false;
    this.getDimentions();
    i = this.timelines.length;
    if ((_ref = this.o.onStart) != null) {
      _ref.apply(this);
    }
    while (i--) {
      this.timelines[i].start(this.startTime);
    }
    t.add(this);
    return this;
  };

  Tween.prototype.stop = function() {
    t.remove(this);
    return this;
  };

  Tween.prototype.getDimentions = function() {
    this.startTime = Date.now();
    return this.endTime = this.startTime + this.duration;
  };

  return Tween;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Tween", [], function() {
    return Tween;
  });
}


/* istanbul ignore next */

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
