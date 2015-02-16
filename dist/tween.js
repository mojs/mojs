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
    this.props = {
      totalTime: 0
    };
    this.loop = h.bind(this.loop, this);
    return this.onUpdate = this.o.onUpdate;
  };

  Tween.prototype.add = function(timeline) {
    this.timelines.push(timeline);
    return this.props.totalTime = Math.max(timeline.props.totalTime, this.props.totalTime);
  };

  Tween.prototype.remove = function(timeline) {
    var index;
    index = this.timelines.indexOf(timeline);
    if (index !== -1) {
      return this.timelines.splice(index, 1);
    }
  };

  Tween.prototype.append = function(timeline) {
    var i;
    if (!h.isArray(timeline)) {
      timeline.index = this.timelines.length;
      this.appendTimeline(timeline);
      return this.props.totalTime = Math.max(timeline.props.totalTime, this.props.totalTime);
    } else {
      i = timeline.length;
      while (i--) {
        this.appendTimeline(timeline[i]);
      }
      return this.recalcDuration();
    }
  };

  Tween.prototype.appendTimeline = function(timeline) {
    timeline.setProp({
      delay: timeline.o.delay + this.props.totalTime
    });
    return this.timelines.push(timeline);
  };

  Tween.prototype.recalcDuration = function() {
    var len, timeline, _results;
    len = this.timelines.length;
    this.props.totalTime = 0;
    _results = [];
    while (len--) {
      timeline = this.timelines[len];
      _results.push(this.props.totalTime = Math.max(timeline.props.totalTime, this.props.totalTime));
    }
    return _results;
  };

  Tween.prototype.update = function(time) {
    var i, len, _ref;
    console.log(time);
    if (time > this.props.endTime) {
      time = this.props.endTime;
    }
    if (time >= this.props.startTime && time < this.props.endTime) {
      if (typeof this.onUpdate === "function") {
        this.onUpdate((time - this.props.startTime) / this.props.totalTime);
      }
    }
    i = -1;
    len = this.timelines.length - 1;
    while (i++ < len) {
      this.timelines[i].update(time);
    }
    if (time === this.props.endTime) {
      if ((_ref = this.o.onComplete) != null) {
        _ref.apply(this);
      }
      if (typeof this.onUpdate === "function") {
        this.onUpdate(1);
      }
      return true;
    }
  };

  Tween.prototype.prepareStart = function() {
    var _ref;
    this.getDimentions();
    return (_ref = this.o.onStart) != null ? _ref.apply(this) : void 0;
  };

  Tween.prototype.startTimelines = function(time) {
    var i, _results;
    i = this.timelines.length;
    _results = [];
    while (i--) {
      _results.push(this.timelines[i].start(time || this.props.startTime));
    }
    return _results;
  };

  Tween.prototype.start = function(time) {
    this.prepareStart();
    this.startTimelines(time);
    !time && t.add(this);
    return this;
  };

  Tween.prototype.stop = function() {
    t.remove(this);
    return this;
  };

  Tween.prototype.getDimentions = function() {
    this.props.startTime = Date.now();
    return this.props.endTime = this.props.startTime + this.props.totalTime;
  };

  Tween.prototype.setProgress = function(progress) {
    progress = Math.max(progress, 0);
    progress = Math.min(progress, 1);
    return this.update(this.props.startTime + progress * this.props.totalTime);
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


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Tween = Tween;
}
