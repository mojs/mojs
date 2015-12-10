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
        onRepeatStart: null,
        onRepeatComplete: null,
        onFirstUpdate: null,
        onUpdate: null,
        isChained: false
      };
    }
  }, {
    key: 'vars',
    value: function vars() {
      this.h = _h2['default'];this.progress = 0;this.prevTime = -1;
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
      Method for setting start and end time to props.
      @param {Number(Timestamp)}, {Null}
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

    /*
      Method to update tween's progress.
      @param {Number}   Time from the parent regarding it's period size.
      @param {Boolean}  Indicates if parent progress grows.
      @param {Number}   Parent's current period number.
      @param {Number}   Parent's previous period number.
    */
  }, {
    key: 'update',
    value: function update(time, isGrow) {
      var props = this.props;

      // We need to know what direction we are heading in with this tween,
      // so if we don't have the previous update value - this is very first
      // update, - skip it entirely and wait for the next value
      if (this.prevTime === -1) {
        this.o.isIt && console.log('=========');
        this.o.isIt && console.log('tween: SKIP');
        this.o.isIt && this._visualizeProgress(time);
        this.prevTime = time;
        this._wasUknownUpdate = true;
        return false;
      }

      /*
        if time is inside the active area of the tween.
        active area is the area from start time to end time,
        with all the repeat and delays in it
      */
      if (time >= this.props.startTime && time <= this.props.endTime) {
        this._updateInActiveArea(time);
      } else {
        this.isFirstUpdate = false;
        // complete if time is larger then end time
        if (time > this.props.endTime && !this.isCompleted && this._isInActiveArea) {
          // get period number
          var props = this.props,
              startPoint = props.startTime - props.delay,
              periodNumber = Math.floor((props.endTime - startPoint) / (props.delay + props.duration));

          // if ( isGrow == null ) { isGrow = time > this.prevTime; }
          this._complete(this.o.yoyo && periodNumber % 2 === 0 ? 0 : 1, time);
        }

        // if was active and went to - inactive area "-"
        if (time < this.prevTime && time < this.props.startTime) {

          if (!this.isOnReverseComplete && this._isInActiveArea) {
            this._start(0, time);
            this.setProgress(0, time);
            this._repeatStart(time);
            this.isOnReverseComplete = true;
          }
        }

        this._isInActiveArea = false;
      }

      this.prevTime = time;
      return this.isCompleted;
    }

    /*
      Method to set tween's state to start
      @method _start
      @param {Numner} Progress to set.
    */
  }, {
    key: '_start',
    value: function _start(progress, time) {
      if (progress === undefined) progress = 0;

      if (this.isStarted) {
        return;
      }
      this.setProgress(progress, time);
      // this._repeatStart();
      if (this.props.onStart != null && typeof this.props.onStart === 'function') {
        this.o.isIt && console.log("********** START **********");
        this.props.onStart.call(this, time > this.prevTime);
      }
      this.isCompleted = false;this.isStarted = true;
    }

    /*
      Method to set tween's state to complete.
      @method _complete
      @param {Number} Progress to set.
      @param {Number} Current time.
    */
  }, {
    key: '_complete',
    value: function _complete(progress, time) {
      if (progress === undefined) progress = 1;

      this.setProgress(progress, time);
      this._repeatComplete(time);
      if (this.props.onComplete != null && typeof this.props.onComplete === 'function') {
        this.o.isIt && console.log("********** COMPLETE **********");
        this.props.onComplete.call(this, time > this.prevTime);
      }
      this.isCompleted = true;this.isStarted = false;
    }

    /*
      Method to run onFirstUpdate callback.
      @method _firstUpdate
      @param {Number} Current update time.
    */
  }, {
    key: '_firstUpdate',
    value: function _firstUpdate(time) {
      if (this.isFirstUpdate) {
        return;
      }
      if (this.props.onFirstUpdate != null && typeof this.props.onFirstUpdate === 'function') {
        this.o.isIt && console.log("********** ON_FIRST_UPDATE **********");
        this.props.onFirstUpdate.call(this, time > this.prevTime);
      }
      this.isCompleted = false;
      this.isFirstUpdate = true;
    }

    /*
      Method call onRepeatComplete calback and set flags.
      @param {Number} Current update time.
    */
  }, {
    key: '_repeatComplete',
    value: function _repeatComplete(time) {
      if (this.isRepeatCompleted) {
        return;
      }
      if (this.props.onRepeatComplete != null && typeof this.props.onRepeatComplete === 'function') {
        this.o.isIt && console.log("********** REPEAT COMPLETE **********");
        this.props.onRepeatComplete.call(this, time > this.prevTime);
      }
      this.isRepeatCompleted = true;
    }

    /*
      Method call onRepeatStart calback and set flags.
    */
  }, {
    key: '_repeatStart',
    value: function _repeatStart(time) {
      if (this.isRepeatStart) {
        return;
      }
      if (this.props.onRepeatStart != null && typeof this.props.onRepeatStart === 'function') {
        this.o.isIt && console.log("********** REPEAT START **********");
        this.props.onRepeatStart.call(this, time > this.prevTime);
      }
      this.isRepeatStart = true;
    }
  }, {
    key: '_updateInActiveArea',
    value: function _updateInActiveArea(time) {
      // reset callback flags
      this.isOnReverseComplete = false;this.isCompleted = false;

      if (time === this.props.endTime) {
        this._wasUknownUpdate = false;
        return this._complete(1, time);
      }

      var props = this.props,
          delayDuration = props.delay + props.duration,
          startPoint = props.startTime - props.delay,
          elapsed = (time - props.startTime + props.delay) % delayDuration,
          TCount = (props.endTime - props.startTime + props.delay) / delayDuration,
          T = this._getPeriod(time),
          TValue = this._delayT,
          prevT = this._getPeriod(this.prevTime),
          TPrevValue = this._delayT;

      this.o.isIt && console.log('=========');
      this.o.isIt && console.log('tween:');
      this.o.isIt && console.log('TCount: ' + TCount);
      // this.o.isIt && console.log(`time: ${time}, start: ${props.startTime}, end: ${props.endTime}`);
      this.o.isIt && console.log('T: ' + T + ', prevT: ' + prevT + ', time: ' + time + ' prevTime: ' + this.prevTime);
      // this.o.isIt && console.log(`TValue: ${TValue}, TPrevValue: ${TPrevValue}`);
      this.o.isIt && this._visualizeProgress(time);

      // if time is inside the duration area of the tween
      if (startPoint + elapsed >= props.startTime) {

        this._firstUpdate(time);

        this._isInActiveArea = true;
        this.isRepeatCompleted = false;
        this.isRepeatStart = false;
        this.isOnReverseComplete = false;
        this.isStarted = false;
        // active zone or larger then end
        var elapsed2 = (time - props.startTime) % delayDuration;
        var proc = elapsed2 / props.duration;
        this.o.isIt && console.log('proc: ' + proc + ', elapsed2: ' + elapsed2 + ', elapsed: ' + elapsed);

        // |=====|=====|=====| >>>
        //      ^1^2
        var isOnEdge = T > 0 && prevT < T;
        // |=====|=====|=====| <<<
        //      ^2^1
        var isOnReverseEdge = prevT > T;
        // if not yoyo then set the plain progress
        if (!props.yoyo) {

          if (this._wasUknownUpdate) {
            if (this.prevTime < time) {
              this._start(0, time);
              this._repeatStart(time);
              this.setProgress(0, time);
            }

            if (this.prevTime > time) {
              this._repeatComplete(time);
              this.setProgress(1, time);
            }
          }

          if (isOnEdge) {
            // if not just after delay
            // |=====|---=====|---=====| >>>
            //         ^1 ^2
            // because we have already handled
            // 1 and onRepeatComplete in delay gap
            if (this.progress !== 1) {
              this.setProgress(1, time);
              this._repeatComplete(time);
            }
            // if on edge but not at very start
            // |=====|=====|=====| >>>
            // ^not  ^here ^here          
            if (prevT >= 0) {
              this._repeatStart(time);
              this.setProgress(0, time);
            }
          }

          if (isOnReverseEdge) {
            // if on edge but not at very end
            // |=====|=====|=====| <<<
            //       ^here ^here ^not here    
            if (this.progress !== 0 && prevT != TCount) {
              this.setProgress(0, time);
              this._repeatStart(time);
            }

            // if on very end edge
            // |=====|=====|=====| <<<
            //       ^!    ^!    ^here
            if (prevT === TCount) {
              this._complete(1, time);
            }

            this.setProgress(1);
            this._repeatComplete(time);
          }

          if (prevT === 'delay') {
            // if just before delay gap
            // |---=====|---=====|---=====| >>>
            //               ^2    ^1
            if (T < TPrevValue) {
              this.setProgress(1, time);
              this._repeatComplete(time);
            }
            // if just after delay gap
            // |---=====|---=====|---=====| >>>
            //            ^1  ^2
            if (T === TPrevValue) {
              this._repeatStart(time);
              this.setProgress(0, time);
            }
          }

          if (time !== props.endTime) {
            this.setProgress(proc, time);
          }

          // if progress is equal 0 and progress grows
          if (proc === 0) {
            this._repeatStart(time);
          }

          if (time === props.startTime) {
            this._start(0, time);
          }

          // yoyo
        } else {}
          // var isEvenPeriod = (T % 2 === 0);
          // // set 1 or 0 on periods' edge
          // if ( isOnEdge ) {
          //   this.setProgress( (isEvenPeriod) ? 0 : 1 );
          //   this._repeatComplete();
          // }
          // // if yoyo then check if the current duration
          // // period is even. If so set progress, otherwise
          // // set inverted proc value
          // this.setProgress( (isEvenPeriod) ? proc : 1-proc );

          // delay gap
      } else {

        // if was in active area and previous time was larger
        if (this._isInActiveArea && time < this.prevTime) {
          this.setProgress(0, time);
          this._repeatStart(time);
        }

        this._isInActiveArea = false;
        this.isRepeatStart = false;

        this.o.isIt && console.log('in the delay gap');
        // if yoyo and even period we should flip
        // so set flipCoef to 1 if we need flip, otherwise to 0
        var flipCoef = props.yoyo && T % 2 === 0 ? 1 : 0;
        // if flip is 0 - bitwise XOR will leave the numbers as is,
        // if flip is 1 - bitwise XOR will inverse the numbers
        this.setProgress(this.prevTime < time ? 1 ^ flipCoef : 0 ^ flipCoef, time);
        // if reverse direction and in delay gap, then progress will be 0
        // if so we don't need to call the onRepeatComplete callback
        // |=====|---=====|---=====| <<<
        //         ^here    ^here  
        if (this.progress !== 0) {
          this._repeatComplete(time);
        }
      }
      this._wasUknownUpdate = false;
    }

    /*
      Method to set Tween's progress.
      @param {Number} Progress to set.
      @param {Number} Current update time.
    */
  }, {
    key: 'setProgress',
    value: function setProgress(p, time) {
      this.progress = p;
      this.easedProgress = this.props.easing(this.progress);
      if (this.props.prevEasedProgress !== this.easedProgress) {
        if (this.onUpdate != null && typeof this.onUpdate === 'function') {
          this.o.isIt && console.log('********** ONUPDATE ' + p + ' **********');
          this.onUpdate(this.easedProgress, this.progress, time > this.prevTime);
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
      this.pause();this.setProgress(0); /* add smallest time */return this;
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

    /*
      Method to get current period number
      @param {Number} Time to get the period for.
    */
  }, {
    key: '_getPeriod',
    value: function _getPeriod(time) {
      var p = this.props,
          TTime = p.delay + p.duration,
          dTime = time - p.startTime + p.delay,
          T = Math.floor(dTime / TTime),
          elapsed = dTime % TTime;

      // if time is larger then the end time
      if (time > p.endTime) {
        // set equal to the periods count
        T = (p.endTime - p.startTime + p.delay) / TTime;
        // if in delay gap, set _delayT to current
        // period number and return "delay"
      } else if (elapsed > 0 && elapsed < p.delay) {
          this._delayT = T;T = 'delay';
        }
      // if the end of period and there is a delay
      // if ( elapsed === 0 && T > 0 ) { T--; }
      return T;
    }
  }, {
    key: '_visualizeProgress',
    value: function _visualizeProgress(time) {
      var str = '|',
          procStr = ' ',
          p = this.props,
          proc = p.startTime - p.delay;

      while (proc < p.endTime) {
        if (p.delay > 0) {
          var newProc = proc + p.delay;
          if (time > proc && time < newProc) {
            procStr += ' ^ ';
          } else {
            procStr += '   ';
          }
          proc = newProc;
          str += '---';
        }
        var newProc = proc + p.duration;
        if (time > proc && time < newProc) {
          procStr += '  ^   ';
        } else if (time === proc) {
          procStr += '^     ';
        } else if (time === newProc) {
          procStr += '    ^ ';
        } else {
          procStr += '      ';
        }
        proc = newProc;
        str += '=====|';
      }

      console.log(str);
      console.log(procStr);
    }
  }]);

  return Tween;
})();

exports['default'] = Tween;
module.exports = exports['default'];