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
    return this.loop = h.bind(this.loop, this);
  };

  Tween.prototype.add = function(timeline) {
    this.timelines.push(timeline);
    return this.duration = Math.max(timeline.props.totalTime, this.duration);
  };

  Tween.prototype.update = function(time) {
    var i, _ref;
    i = this.timelines.length;
    while (i--) {
      this.timelines[i].update(time);
    }
    if (time >= this.endTime) {
      !this.isCompleted && ((_ref = this.o.onComplete) != null ? _ref.apply(this) : void 0);
      return this.isCompleted = true;
    }
  };

  Tween.prototype.start = function() {
    var i, _ref;
    this.startTime = Date.now();
    this.endTime = this.startTime + this.duration;
    i = this.timelines.length;
    if ((_ref = this.o.onStart) != null) {
      _ref.apply(this);
    }
    while (i--) {
      this.timelines[i].start(this.startTime);
    }
    return this.t.add(this);
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
