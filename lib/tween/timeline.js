(function() {
  var Timeline, h, t,
    __slice = [].slice;

  h = require('../h');

  t = require('./tweener');

  Timeline = (function() {
    Timeline.prototype.state = 'stop';

    Timeline.prototype.defaults = {
      repeat: 0,
      delay: 0
    };

    function Timeline(o) {
      this.o = o != null ? o : {};
      this.vars();
      this._extendDefaults();
      this;
    }

    Timeline.prototype.vars = function() {
      this.timelines = [];
      this.props = {
        time: 0,
        repeatTime: 0,
        shiftedRepeatTime: 0
      };
      this.loop = h.bind(this.loop, this);
      return this.onUpdate = this.o.onUpdate;
    };

    Timeline.prototype.add = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.pushTimelineArray(args);
      return this;
    };

    Timeline.prototype.pushTimelineArray = function(array) {
      var i, tm, _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
        tm = array[i];
        if (h.isArray(tm)) {
          _results.push(this.pushTimelineArray(tm));
        } else {
          _results.push(this.pushTimeline(tm));
        }
      }
      return _results;
    };

    Timeline.prototype._extendDefaults = function() {
      var key, value, _ref, _results;
      _ref = this.defaults;
      _results = [];
      for (key in _ref) {
        value = _ref[key];
        _results.push(this.props[key] = this.o[key] != null ? this.o[key] : value);
      }
      return _results;
    };

    Timeline.prototype.setProp = function(props) {
      var key, value;
      for (key in props) {
        value = props[key];
        this.props[key] = value;
      }
      return this.recalcDuration();
    };

    Timeline.prototype.pushTimeline = function(timeline, shift) {
      if (timeline.timeline instanceof Timeline) {
        timeline = timeline.timeline;
      }
      (shift != null) && timeline.setProp({
        'shiftTime': shift
      });
      this.timelines.push(timeline);
      return this._recalcTimelineDuration(timeline);
    };

    Timeline.prototype.remove = function(timeline) {
      var index;
      index = this.timelines.indexOf(timeline);
      if (index !== -1) {
        return this.timelines.splice(index, 1);
      }
    };

    Timeline.prototype.append = function() {
      var i, timeline, tm, _i, _len;
      timeline = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (i = _i = 0, _len = timeline.length; _i < _len; i = ++_i) {
        tm = timeline[i];
        if (h.isArray(tm)) {
          this._appendTimelineArray(tm);
        } else {
          this.appendTimeline(tm, this.timelines.length);
        }
      }
      return this;
    };

    Timeline.prototype._appendTimelineArray = function(timelineArray) {
      var i, len, time, _results;
      i = timelineArray.length;
      time = this.props.repeatTime - this.props.delay;
      len = this.timelines.length;
      _results = [];
      while (i--) {
        _results.push(this.appendTimeline(timelineArray[i], len, time));
      }
      return _results;
    };

    Timeline.prototype.appendTimeline = function(timeline, index, time) {
      var shift;
      shift = (time != null ? time : this.props.time);
      shift += timeline.props.shiftTime || 0;
      timeline.index = index;
      return this.pushTimeline(timeline, shift);
    };

    Timeline.prototype.recalcDuration = function() {
      var len, _results;
      len = this.timelines.length;
      this.props.time = 0;
      this.props.repeatTime = 0;
      this.props.shiftedRepeatTime = 0;
      _results = [];
      while (len--) {
        _results.push(this._recalcTimelineDuration(this.timelines[len]));
      }
      return _results;
    };

    Timeline.prototype._recalcTimelineDuration = function(timeline) {
      var timelineTime;
      timelineTime = timeline.props.repeatTime + (timeline.props.shiftTime || 0);
      this.props.time = Math.max(timelineTime, this.props.time);
      this.props.repeatTime = (this.props.time + this.props.delay) * (this.props.repeat + 1);
      this.props.shiftedRepeatTime = this.props.repeatTime + (this.props.shiftTime || 0);
      return this.props.shiftedRepeatTime -= this.props.delay;
    };

    Timeline.prototype.update = function(time, isGrow) {
      if (time > this.props.endTime) {
        time = this.props.endTime;
      }
      if (time === this.props.endTime && this.isCompleted) {
        return true;
      }
      this._updateTimelines(time, isGrow);
      return this._checkCallbacks(time);
    };

    Timeline.prototype._updateTimelines = function(time, isGrow) {
      var elapsed, i, len, startPoint, timeToTimelines;
      startPoint = this.props.startTime - this.props.delay;
      elapsed = (time - startPoint) % (this.props.delay + this.props.time);
      timeToTimelines = time === this.props.endTime ? this.props.endTime : startPoint + elapsed >= this.props.startTime ? time >= this.props.endTime ? this.props.endTime : startPoint + elapsed : time > this.props.startTime + this.props.time ? this.props.startTime + this.props.time : null;
      if (timeToTimelines != null) {
        i = -1;
        len = this.timelines.length - 1;
        while (i++ < len) {
          if (isGrow == null) {
            isGrow = time > (this._previousUpdateTime || 0);
          }
          this.timelines[i].update(timeToTimelines, isGrow);
        }
      }
      return this._previousUpdateTime = time;
    };

    Timeline.prototype._checkCallbacks = function(time) {
      var _ref, _ref1, _ref2;
      if (this.prevTime === time) {
        return;
      }
      if (!this.prevTime || this.isCompleted && !this.isStarted) {
        if ((_ref = this.o.onStart) != null) {
          _ref.apply(this);
        }
        this.isStarted = true;
        this.isCompleted = false;
      }
      if (time >= this.props.startTime && time < this.props.endTime) {
        if (typeof this.onUpdate === "function") {
          this.onUpdate((time - this.props.startTime) / this.props.repeatTime);
        }
      }
      if (this.prevTime > time && time <= this.props.startTime) {
        if ((_ref1 = this.o.onReverseComplete) != null) {
          _ref1.apply(this);
        }
      }
      this.prevTime = time;
      if (time === this.props.endTime && !this.isCompleted) {
        if (typeof this.onUpdate === "function") {
          this.onUpdate(1);
        }
        if ((_ref2 = this.o.onComplete) != null) {
          _ref2.apply(this);
        }
        this.isCompleted = true;
        this.isStarted = false;
        return true;
      }
    };

    Timeline.prototype.start = function(time) {
      this.setStartTime(time);
      !time && (t.add(this), this.state = 'play');
      return this;
    };

    Timeline.prototype.pause = function() {
      this.removeFromTweener();
      this.state = 'pause';
      return this;
    };

    Timeline.prototype.stop = function() {
      this.removeFromTweener();
      this.setProgress(0);
      this.state = 'stop';
      return this;
    };

    Timeline.prototype.restart = function() {
      this.stop();
      return this.start();
    };

    Timeline.prototype.removeFromTweener = function() {
      t.remove(this);
      return this;
    };

    Timeline.prototype.setStartTime = function(time) {
      this.getDimentions(time);
      return this.startTimelines(this.props.startTime);
    };

    Timeline.prototype.startTimelines = function(time) {
      var i, _results;
      i = this.timelines.length;
      (time == null) && (time = this.props.startTime);
      _results = [];
      while (i--) {
        _results.push(this.timelines[i].start(time));
      }
      return _results;
    };

    Timeline.prototype.setProgress = function(progress) {
      if (this.props.startTime == null) {
        this.setStartTime();
      }
      progress = h.clamp(progress, 0, 1);
      return this.update(this.props.startTime + progress * this.props.repeatTime);
    };

    Timeline.prototype.getDimentions = function(time) {
      if (time == null) {
        time = performance.now();
      }
      this.props.startTime = time + this.props.delay + (this.props.shiftTime || 0);
      this.props.endTime = this.props.startTime + this.props.shiftedRepeatTime;
      return this.props.endTime -= this.props.shiftTime || 0;
    };

    return Timeline;

  })();

  module.exports = Timeline;

}).call(this);
