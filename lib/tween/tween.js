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

var _easingEasing = require('../easing/easing');

// TODO: all public methods should return this

var _easingEasing2 = _interopRequireDefault(_easingEasing);

var Tween = (function () {
  function Tween() {
    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Tween);

    this.o = o;
    this.declareDefaults();this.extendDefaults();this.vars();return this;
  }

  _createClass(Tween, [{
    key: 'declareDefaults',
    value: function declareDefaults() {
      this.defaults = {
        duration: 600,
        delay: 0,
        repeat: 0,
        yoyo: false,
        easing: 'Linear.None',
        onStart: null,
        onComplete: null,
        onRepeatComplete: null,
        onReverseComplete: null,
        onFirstUpdate: null,
        onUpdate: null,
        onFirstUpdateBackward: null,
        isChained: false
      };
    }
  }, {
    key: 'vars',
    value: function vars() {
      this.h = _h2['default'];this.progress = 0;this.prevTime = 0;
      return this.calcDimentions();
    }
  }, {
    key: 'calcDimentions',
    value: function calcDimentions() {
      this.props.time = this.props.duration + this.props.delay;
      this.props.repeatTime = this.props.time * (this.props.repeat + 1);
    }
  }, {
    key: 'extendDefaults',
    value: function extendDefaults() {
      this.props = {};
      for (var key in this.defaults) {
        if (Object.hasOwnProperty.call(this.defaults, key)) {
          var value = this.defaults[key];
          this.props[key] = this.o[key] != null ? this.o[key] : value;
          this.props.easing = _easingEasing2['default'].parseEasing(this.o.easing || this.defaults.easing);
          this.onUpdate = this.props.onUpdate;
        }
      }
    }

    /*
      Method for setting start and end time to selft props.
      @param Number(Timestamp), Null
      @returns this
    */
  }, {
    key: 'setStartTime',
    value: function setStartTime(time) {
      var props = this.props;
      this.isCompleted = false;this.isRepeatCompleted = false;
      this.isStarted = false;

      time = time == null ? performance.now() : time;
      props.startTime = time + props.delay + (props.shiftTime || 0);
      props.endTime = props.startTime + props.repeatTime - props.delay;

      return this;
    }
  }, {
    key: 'update',
    value: function update(time, isGrow) {
      /*
        if time is inside the active area of the tween.
        active area is the area from start time to end time,
        with all the repeat and delays in it
      */
      if (time >= this.props.startTime && time < this.props.endTime) {
        // reset callback flags
        this.isOnReverseComplete = false;this.isCompleted = false;
        // this.isRepeatCompleted = false;
        // onFirtUpdate callback

        if (!this.isFirstUpdate) {
          if (this.props.onFirstUpdate != null && typeof this.props.onFirstUpdate === 'function') {
            this.props.onFirstUpdate.apply(this);this.isFirstUpdate = true;
          }
        }

        if (!this.isStarted) {
          if (this.props.onStart != null && typeof this.props.onStart === 'function') {
            this.props.onStart.apply(this);this.isStarted = true;
          }
        }

        this._updateInActiveArea(time);

        if (time < this.prevTime && !this.isFirstUpdateBackward) {
          if (this.props.onFirstUpdateBackward != null && typeof this.props.onFirstUpdateBackward === 'function') {
            this.props.onFirstUpdateBackward.apply(this);
          }
          this.isFirstUpdateBackward = true;
        }
      } else {
        // complete if time is larger then end time
        if (time >= this.props.endTime && !this.isCompleted) {
          // get period number
          var props = this.props;
          var startPoint = props.startTime - props.delay;
          var periodNumber = Math.floor((time - startPoint) / (props.delay + props.duration));

          this._complete(this.o.yoyo && periodNumber % 2 === 0 ? 0 : 1);
        }
        // rest isFirstUpdate flag if update was out of active zone
        if (time > this.props.endTime) {
          this.isFirstUpdate = false;
        }
        // reset isFirstUpdateBackward flag if progress went further the end time
        if (time > this.props.endTime) {
          this.isFirstUpdateBackward = false;
        }
      }

      if (time < this.prevTime && time <= this.props.startTime) {
        if (!this.isFirstUpdateBackward) {
          if (this.props.onFirstUpdateBackward != null && typeof this.props.onFirstUpdateBackward === 'function') {
            this.props.onFirstUpdateBackward.apply(this);
          }
          this.isFirstUpdateBackward = true;
        }

        // isGrow indicates if actual parent time is growing.
        // Despite the fact that the time could be < previous time && <= startTime
        // it is actually grows. Tween could be added to a
        // Timeline, and the later will work with Tween's periods, feeding
        // 0 at the end of the period, because period % period === 0.
        // See 182 line of Timline's code for more info.
        if (isGrow) {
          if (!this.isCompleted && this.prevTime < this.props.endTime) {
            this._complete();
          }
        } else if (!this.isOnReverseComplete /* && this.isFirstUpdate */) {
            this.isOnReverseComplete = true;
            this.setProgress(0, !this.props.isChained);
            if (this.props.onReverseComplete != null && typeof this.props.onReverseComplete === 'function') {
              this.props.onReverseComplete.apply(this);
            }
          }

        this.isFirstUpdate = false;
      }

      this.prevTime = time;
      return this.isCompleted;
    }

    /*
      Method to set tween's state to complete
    */
  }, {
    key: '_complete',
    value: function _complete() {
      var progress = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      this.setProgress(progress);
      this._repeatComplete();
      if (this.props.onComplete != null && typeof this.props.onComplete === 'function') {
        this.props.onComplete.apply(this);
      }
      this.isCompleted = true;this.isStarted = false;
      this.isOnReverseComplete = false;
    }

    /*
      Method call onRepeatComplete calback and set flags.
    */
  }, {
    key: '_repeatComplete',
    value: function _repeatComplete() {
      if (this.isRepeatCompleted) {
        return;
      }
      if (this.props.onRepeatComplete != null && typeof this.props.onRepeatComplete === 'function') {
        this.props.onRepeatComplete.apply(this);
      }
      this.isRepeatCompleted = true;
    }
  }, {
    key: '_updateInActiveArea',
    value: function _updateInActiveArea(time) {
      var props = this.props;
      var startPoint = props.startTime - props.delay;
      var delayDuration = props.delay + props.duration;
      var elapsed = (time - startPoint) % delayDuration;
      var periodNumber = Math.floor((time - startPoint) / delayDuration);
      var prevPeriodNumber = Math.floor((this.prevTime - startPoint) / delayDuration);

      // if time is inside the duration area of the tween
      if (startPoint + elapsed >= props.startTime) {
        this.isRepeatCompleted = false;
        // active zone or larger then end
        var elapsed2 = (time - props.startTime) % delayDuration;
        var proc = elapsed2 / props.duration;
        // isOnEdge means
        // time is larger then the first period
        // AND
        // previous period is smaller then the current one
        var isOnEdge = periodNumber > 0 && prevPeriodNumber < periodNumber;
        // if not yoyo then set the plain progress
        if (!props.yoyo) {
          if (isOnEdge) {
            this.setProgress(1);
            this._repeatComplete();
          }
          // proc === 0 means that the time === end of the period,
          // and we have already handled this case, so set progress
          // only if proc > 0
          if (proc > 0) {
            this.setProgress(proc);
          }
        } else {
          var isEvenPeriod = periodNumber % 2 === 0;
          // set 1 or 0 on periods' edge
          if (isOnEdge) {
            this.setProgress(isEvenPeriod ? 0 : 1);
            this._repeatComplete();
          }
          // if yoyo then check if the current duration
          // period is even. If so set progress, otherwise
          // set inverted proc value
          this.setProgress(isEvenPeriod ? proc : 1 - proc);
        }
        // delay gap
      } else {
        // if yoyo and even period we should flip
        // so set flipCoef to 1 if we need flip, otherwise to 0
        var flipCoef = props.yoyo && periodNumber % 2 === 0 ? 1 : 0;
        // if flip is 0 - bitwise XOR will leave the numbers as is,
        // if flip is 1 - bitwise XOR will inverse the numbers
        this.setProgress(this.prevTime < time ? 1 ^ flipCoef : 0 ^ flipCoef);
        this._repeatComplete();
      }
    }

    /*
      Method to set Tween's progress
      @param {Number} Progress to set
      @param {Boolean} ?
    */

  }, {
    key: 'setProgress',
    value: function setProgress(p) {
      var isCallback = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      this.progress = p;
      this.easedProgress = this.props.easing(this.progress);
      if (this.props.prevEasedProgress !== this.easedProgress && isCallback) {
        if (this.onUpdate != null && typeof this.onUpdate === 'function') {
          this.onUpdate(this.easedProgress, this.progress);
        }
      }
      this.props.prevEasedProgress = this.easedProgress;
    }

    /*
      Method to set property[s] on Tween
      @param {Object, String} Hash object of key/value pairs, or property name
      @param {_} Property's value to set
    */
  }, {
    key: 'setProp',
    value: function setProp(obj, value) {
      // handle hash object case
      if (typeof obj === 'object') {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            this.props[key] = obj[key];
            if (key === 'easing') {
              this.props.easing = _easingEasing2['default'].parseEasing(this.props.easing);
            }
          }
        }
        // handle key, value case
      } else if (typeof obj === 'string') {
          // if key is easing - parse it immediately
          if (obj === 'easing') {
            this.props.easing = _easingEasing2['default'].parseEasing(value);
          }
          // else just save it to props
          else {
              this.props[obj] = value;
            }
        }
      this.calcDimentions();
    }

    /*
      Method to run the Tween
      @param  {Number} Start time
      @return {Object} Self
    */
  }, {
    key: 'play',
    value: function play(time) {
      this.setStartTime(time);
      !time && _tweener2['default'].add(this); // this.state = 'play'
      return this;
    }

    /*
      Method to stop the Tween.
      @returns {Object} Self
    */
  }, {
    key: 'stop',
    value: function stop() {
      this.pause();this.setProgress(0);return this;
    }

    /*
      Method to pause Tween.
      @returns {Object} Self
    */
  }, {
    key: 'pause',
    value: function pause() {
      this._removeFromTweener();return this;
    }

    /*
      Method to remove the Tween from the tweener.
    */
  }, {
    key: '_removeFromTweener',
    value: function _removeFromTweener() {
      _tweener2['default'].remove(this);return this;
    }
  }]);

  return Tween;
})();

exports['default'] = Tween;
module.exports = exports['default'];