'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _h = require('../h');

var _h2 = _interopRequireDefault(_h);

var _tweener = require('./tweener');

var _tweener2 = _interopRequireDefault(_tweener);

var Timeline = (function () {
  function Timeline() {
    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Timeline);

    this.o = o;
    this.vars();
    this._extendDefaults();
    return this;
  }

  _createClass(Timeline, [{
    key: 'vars',
    value: function vars() {
      this.state = 'stop';
      this.defaults = { repeat: 0, delay: 0 };
      this.timelines = [];
      this.props = { time: 0, repeatTime: 0, shiftedRepeatTime: 0 };
      this.loop = _h2['default'].bind(this.loop, this);
      this.onUpdate = this.o.onUpdate;
    }
  }, {
    key: 'add',
    value: function add() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.pushTimelineArray(args);return this;
    }
  }, {
    key: 'pushTimelineArray',
    value: function pushTimelineArray(array) {
      for (var i = 0; i < array.length; i++) {
        var tm = array[i];
        // recursive push to handle arrays of arrays
        if (_h2['default'].isArray(tm)) {
          this.pushTimelineArray(tm);
        } else {
          this.pushTimeline(tm);
        }
      };
    }

    /*
      Method to extend defaults by options and save
      the result to props object
    */
  }, {
    key: '_extendDefaults',
    value: function _extendDefaults() {
      for (var key in this.defaults) {
        if (this.defaults.hasOwnProperty(key)) {
          this.props[key] = this.o[key] != null ? this.o[key] : this.defaults[key];
        }
      }
    }

    /*
      Method to add a prop to the props object.
    */
  }, {
    key: 'setProp',
    value: function setProp(props) {
      for (var key in props) {
        if (props.hasOwnProperty(key)) {
          this.props[key] = props[key];
        }
      }
      return this.recalcDuration();
    }
  }, {
    key: 'pushTimeline',
    value: function pushTimeline(timeline, shift) {
      // if timeline is a module with timeline property then extract it
      if (timeline.timeline instanceof Timeline) {
        timeline = timeline.timeline;
      }
      // add self delay to the timeline
      shift != null && timeline.setProp({ 'shiftTime': shift });
      this.timelines.push(timeline);
      return this._recalcTimelineDuration(timeline);
    }
  }, {
    key: 'remove',
    value: function remove(timeline) {
      var index = this.timelines.indexOf(timeline);
      if (index !== -1) {
        this.timelines.splice(index, 1);
      }
    }

    /*
      Method to append the tween to the end of the
      timeline. Each argument is treated as a new 
      append. Array of tweens is treated as a parallel
      sequence. 
      @param {Object, Array} Tween to append or array of such.
    */
  }, {
    key: 'append',
    value: function append() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = timeline[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tm = _step.value;

          if (_h2['default'].isArray(tm)) {
            this._appendTimelineArray(tm);
          } else {
            this.appendTimeline(tm, this.timelines.length);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }

    /*  Method to append the tween to the end of the
        timeline. Each argument is treated as a new 
        append. Array of tweens is treated as a parallel
        sequence. 
        @param {Object, Array} Tween to append or array of such.
    */
  }, {
    key: 'append',
    value: function append() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _len2 = arguments.length, timeline = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          timeline[_key2] = arguments[_key2];
        }

        for (var _iterator2 = timeline[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var tm = _step2.value;

          if (_h2['default'].isArray(tm)) {
            this._appendTimelineArray(tm);
          } else this.appendTimeline(tm, this.timelines.length);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }
  }, {
    key: '_appendTimelineArray',
    value: function _appendTimelineArray(timelineArray) {
      var i = timelineArray.length;
      var time = this.props.repeatTime - this.props.delay;
      var len = this.timelines.length;

      while (i--) {
        this.appendTimeline(timelineArray[i], len, time);
      }
    }
  }, {
    key: 'appendTimeline',
    value: function appendTimeline(timeline, index, time) {
      var shift = time != null ? time : this.props.time;
      shift += timeline.props.shiftTime || 0;
      timeline.index = index;this.pushTimeline(timeline, shift);
    }
  }, {
    key: 'recalcDuration',
    value: function recalcDuration() {
      var len = this.timelines.length;
      this.props.time = 0;this.props.repeatTime = 0;this.props.shiftedRepeatTime = 0;
      while (len--) {
        this._recalcTimelineDuration(this.timelines[len]);
      }
    }
  }, {
    key: '_recalcTimelineDuration',
    value: function _recalcTimelineDuration(timeline) {
      var timelineTime = timeline.props.repeatTime + (timeline.props.shiftTime || 0);
      this.props.time = Math.max(timelineTime, this.props.time);
      this.props.repeatTime = (this.props.time + this.props.delay) * (this.props.repeat + 1);
      this.props.shiftedRepeatTime = this.props.repeatTime + (this.props.shiftTime || 0);
      this.props.shiftedRepeatTime -= this.props.delay;
    }

    /*  Method to take care of the current time.
        @param {Number} The current time
        @return {Undefined, Boolean} Returns true if the tween
        had ended it execution so should be removed form the 
        tweener's active tweens array
    */
  }, {
    key: 'update',
    value: function update(time, isGrow) {
      var props = this.props;
      this.o.isIt && console.log('------------------------------------------------');
      this.o.isIt && console.log('timeline:');
      this.o.isIt && console.log('time: ' + time + ', prevTime: ' + this._previousUpdateTime);
      this.o.isIt && console.log('start: ' + props.startTime + ', end: ' + props.endTime);
      // don't go further then the endTime
      if (time > this.props.endTime) {
        time = this.props.endTime;
      }
      // return true if timeline was already completed
      if (time === this.props.endTime && this.isCompleted) {
        return true;
      }
      // set the time to timelines
      this._updateTimelines(time, isGrow);
      /*  check the callbacks for the current time
          NOTE: _checkCallbacks method should be returned
          from this update function, because it returns true
          if the tween was completed, to indicate the tweener
          module to remove it from the active tweens array for 
          performance purposes
      */
      return this._checkCallbacks(time);
    }

    /*
      Method to set time on timelines,
      with respect to repeat periods **if present**
      @param {Number} Time to set
    */
  }, {
    key: '_updateTimelines',
    value: function _updateTimelines(time, isGrow) {
      // get elapsed with respect to repeat option
      // so take a modulo of the elapsed time
      var props = this.props;
      var startPoint = props.startTime - props.delay;
      var elapsed = (time - startPoint) % (props.delay + props.time);

      var timeToTimelines = null;
      // get the time for timelines
      if (time === props.endTime) {
        timeToTimelines = props.endTime;
      }
      // after delay
      else if (startPoint + elapsed >= props.startTime) {
          if (time >= props.endTime) {
            timeToTimelines = props.endTime;
          } else {
            timeToTimelines = startPoint + elapsed;
          }
        } else {
          if (time > props.startTime + props.time) {
            timeToTimelines = props.startTime + props.time;
          } else {
            timeToTimelines = null;
          }
        }

      // set the normalized time to the timelines
      if (timeToTimelines != null) {
        var i = -1,
            len = this.timelines.length - 1;

        // calculate current and previous periods
        var delayDuration = props.delay + props.time;
        var T = Math.floor((time - startPoint) / delayDuration);
        var prevT = Math.floor((this._previousUpdateTime - startPoint) / delayDuration);

        this.o.isIt && console.log('T: ' + T + ', prevT: ' + prevT);
        // if on edge of the periods
        if (T > 0 && T > prevT) {
          // get the time we have missed
          var missedTime = props.startTime + T * (props.delay + props.time);
          // update child timelines with missed time
          this.o.isIt && console.log('xxxxxxx missed time: ' + missedTime + ', time: ' + props.time);
          var j = -1;
          while (j++ < len) {
            this.timelines[j].update(missedTime);
          }
        }

        // if on edge of the periods
        if (T < prevT) {
          // get the time we have missed
          var missedTime = props.startTime + T * (props.delay + props.time) - 2 * props.time;
          // update child timelines with missed time
          this.o.isIt && console.log('******* missed time: ' + missedTime + ', time: ' + props.time);
          var j = -1;
          while (j++ < len) {
            this.timelines[j].update(missedTime);
          }
        }

        // check if progress grows
        isGrow = isGrow == null ? time > (this._previousUpdateTime || 0) : isGrow;
        while (i++ < len) {
          this.timelines[i].update(timeToTimelines, isGrow);
        }
      }
      return this._previousUpdateTime = time;
    }

    /*
      Method to check the callbacks
      for the current time
      @param {Number} The current time
    */
  }, {
    key: '_checkCallbacks',
    value: function _checkCallbacks(time) {
      // dont care about the multiple exact same time calls
      if (this.prevTime === time) {
        return;
      }

      // if there is no prevTime - so it wasnt called ever at all
      // or if it was called but have been completed already
      // and it wasnt started yet -- then start!
      if (!this.prevTime || this.isCompleted && !this.isStarted) {
        if (this.o.onStart != null && typeof this.o.onStart === 'function') {
          this.o.onStart.apply(this);
        }
        this.isStarted = true;this.isCompleted = false;
      }
      // if isn't complete
      if (time >= this.props.startTime && time < this.props.endTime) {
        if (this.onUpdate != null && typeof this.onUpdate === 'function') {
          this.onUpdate((time - this.props.startTime) / this.props.repeatTime);
        }
      }

      // if reverse completed
      if (this.prevTime > time && time <= this.props.startTime) {
        if (this.o.onReverseComplete != null && typeof this.o.onReverseComplete === 'function') {
          this.o.onReverseComplete.apply(this);
        }
      }

      // save the current time as previous for future
      this.prevTime = time;
      // if completed
      if (time === this.props.endTime && !this.isCompleted) {
        if (this.onUpdate != null && typeof this.onUpdate === 'function') {
          this.onUpdate(1);
        }
        if (this.o.onComplete != null && typeof this.o.onComplete === 'function') {
          this.o.onComplete.apply(this);
        }
        this.isCompleted = true;this.isStarted = false;return true;
      }
    }
  }, {
    key: 'play',
    value: function play(time) {
      this.setStartTime(time);
      if (!time) {
        _tweener2['default'].add(this);this.state = 'play';
      };
      return this;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.removeFromTweener();this.state = 'pause';return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.removeFromTweener();this.setProgress(0);
      this.state = 'stop';return this;
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.stop();this.play();return this;
    }
  }, {
    key: 'removeFromTweener',
    value: function removeFromTweener() {
      _tweener2['default'].remove(this);return this;
    }
  }, {
    key: 'setStartTime',
    value: function setStartTime(time) {
      this.getDimentions(time);this.startTimelines(this.props.startTime);
    }
  }, {
    key: 'startTimelines',
    value: function startTimelines(time) {
      var i = this.timelines.length;
      time == null && (time = this.props.startTime);
      while (i--) {
        this.timelines[i].setStartTime(time);
      }
    }
  }, {
    key: 'setProgress',
    value: function setProgress(progress) {
      if (this.props.startTime == null) {
        this.setStartTime();
      }
      progress = _h2['default'].clamp(progress, 0, 1);
      this.update(this.props.startTime + progress * this.props.repeatTime);
    }
  }, {
    key: 'getDimentions',
    value: function getDimentions(time) {
      time = time == null ? performance.now() : time;
      this.props.startTime = time + this.props.delay + (this.props.shiftTime || 0);
      this.props.endTime = this.props.startTime + this.props.shiftedRepeatTime;
      this.props.endTime -= this.props.shiftTime || 0;
    }
  }]);

  return Timeline;
})();

exports['default'] = Timeline;
module.exports = exports['default'];