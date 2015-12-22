'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _h = require('../h');

var _h2 = _interopRequireDefault(_h);

var _tweener = require('./tweener');

var _tweener2 = _interopRequireDefault(_tweener);

var _tween = require('./tween');

var _tween2 = _interopRequireDefault(_tween);

var Timeline = (function (_Tween) {
  _inherits(Timeline, _Tween);

  function Timeline() {
    _classCallCheck(this, Timeline);

    _get(Object.getPrototypeOf(Timeline.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Timeline, [{
    key: 'add',

    /*
      API method to add child tweens/timelines.
      @public
      @param {Object, Array} Tween/Timeline or an array of such.
      @returns {Object} Self.
    */
    value: function add() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this._pushTimelineArray(args);
      this._calcDimentions();
      return this;
    }

    /*
      API method to append the Tween/Timeline to the end of the
      timeline. Each argument is treated as a new append.
      Array of tweens is treated as a parallel sequence. 
      @public
      @param {Object, Array} Tween/Timeline to append or array of such.
      @returns {Object} Self.
    */
  }, {
    key: 'append',
    value: function append() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _len2 = arguments.length, timeline = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          timeline[_key2] = arguments[_key2];
        }

        for (var _iterator = timeline[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tm = _step.value;

          if (_h2['default'].isArray(tm)) {
            this._appendTimelineArray(tm);
          } else {
            this._appendTimeline(tm, this._timelines.length);
          }
          this._calcDimentions();
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

    /*
      Method to append Tween/Timeline array or mix of such.
      @private
      @param {Array} Array of Tweens/Timelines.
    */
  }, {
    key: '_appendTimelineArray',
    value: function _appendTimelineArray(timelineArray) {
      var i = timelineArray.length,
          time = this._props.repeatTime - this._props.delay,
          len = this._timelines.length;

      while (i--) {
        this._appendTimeline(timelineArray[i], len, time);
      }
    }

    /*
      Method to append a single timeline to the Timeline.
      @private
      @param {Object} Tween/Timline to append.
      @param {Number} Index of the append.
      @param {Number} Shift time.
    */
  }, {
    key: '_appendTimeline',
    value: function _appendTimeline(timeline, index, time) {
      var shift = time != null ? time : this._props.duration;
      shift += timeline._props.shiftTime || 0;
      timeline.index = index;this._pushTimeline(timeline, shift);
    }

    /*
      PrivateMethod to push Tween/Timeline array.
      @private
      @param {Array} Array of Tweens/Timelines.
    */
  }, {
    key: '_pushTimelineArray',
    value: function _pushTimelineArray(array) {
      for (var i = 0; i < array.length; i++) {
        var tm = array[i];
        // recursive push to handle arrays of arrays
        if (_h2['default'].isArray(tm)) {
          this._pushTimelineArray(tm);
        } else {
          this._pushTimeline(tm);
        }
      };
    }

    /*
      Method to push a single Tween/Timeline.
      @private
      @param {Object} Tween or Timeline to push.
      @param {Number} Number of milliseconds to shift the start time
                      of the Tween/Timeline.
    */
  }, {
    key: '_pushTimeline',
    value: function _pushTimeline(timeline, shift) {
      // if timeline is a module with timeline property then extract it
      if (timeline.timeline instanceof Timeline) {
        timeline = timeline.timeline;
      }
      // add self delay to the timeline
      shift != null && timeline._setProp({ 'shiftTime': shift });
      this._timelines.push(timeline);
      this._recalcDuration(timeline);
    }

    /*
      Method set progress on self and child Tweens/Timelines.
      @private
      @param {Number} Progress to set.
      @param {Number} Current update time.
    */
  }, {
    key: '_setProgress',
    value: function _setProgress(progress, time) {
      _get(Object.getPrototypeOf(Timeline.prototype), '_setProgress', this).call(this, progress, time);
      // cover
      var timeToTimelines = this._props.startTime + progress * this._props.time,
          i = this._timelines.length;
      while (i--) {
        this._timelines[i]._update(timeToTimelines);
      }
    }

    /*
      Method calculate self duration based on timeline's duration.
      @private
      @param {Object} Tween or Timeline to calculate.
    */
  }, {
    key: '_recalcDuration',
    value: function _recalcDuration(timeline) {
      var p = timeline._props,
          speedCoef = p.speed ? 1 / p.speed : 1,
          timelineTime = speedCoef * p.repeatTime + (p.shiftTime || 0);
      this._props.duration = Math.max(timelineTime, this._props.duration);
    }

    /*
      Method set start and end times.
      @private
      @param {Number, Null} Time to start with.
    */
  }, {
    key: '_setStartTime',
    value: function _setStartTime(time) {
      _get(Object.getPrototypeOf(Timeline.prototype), '_setStartTime', this).call(this, time);
      this._startTimelines(this._props.startTime);
    }

    /*
      Method calculate self duration based on timeline's duration.
      @private
      @param {Number, Null} Time to start with.
    */
  }, {
    key: '_startTimelines',
    value: function _startTimelines(time) {
      var i = this._timelines.length;
      time == null && (time = this._props.startTime);
      while (i--) {
        this._timelines[i]._setStartTime(time);
      }
    }

    // recalcDuration() {
    //   var len = this._timelines.length;
    //   this._props.time = 0; this._props.repeatTime = 0; this._props.shiftedRepeatTime = 0
    //   while(len--) { this._recalcDuration(this._timelines[len]); }
    // }

    /*
      Method do declare defaults by this._defaults object
      @private
    */
  }, {
    key: '_declareDefaults',
    value: function _declareDefaults() {
      // if duration was passed on initialization stage, warn user and reset it.
      if (this.o.duration != null) {
        _h2['default'].error('Duration can not be declared on Timeline, but "' + this.o.duration + '" is. You probably want to use Tween instead.');
        this.o.duration = 0;
      }
      _get(Object.getPrototypeOf(Timeline.prototype), '_declareDefaults', this).call(this);
      // set default duration = 0
      this._defaults.duration = 0;
    }

    /*
      Method to declare some vars.
      @private
    */
  }, {
    key: '_vars',
    value: function _vars() {
      this._timelines = [];
      _get(Object.getPrototypeOf(Timeline.prototype), '_vars', this).call(this);
    }
  }]);

  return Timeline;
})(_tween2['default']);

exports['default'] = Timeline;
module.exports = exports['default'];