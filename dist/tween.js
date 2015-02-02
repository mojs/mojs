var Tween, h, t;

h = require('./h');

t = require('./tweener');

Tween = (function() {
  Tween.prototype.t = t;

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
    return this.t.add(this);
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
