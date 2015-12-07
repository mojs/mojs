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
        onRepeatStart: null,
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
        // // this.isRepeatCompleted = false;
        // // onFirtUpdate callback
        // if (!this.isFirstUpdate) {
        //   if (this.props.onFirstUpdate != null && typeof this.props.onFirstUpdate === 'function') {
        //     this.props.onFirstUpdate.apply(this); this.isFirstUpdate = true;
        //   }
        // }

        // if (!this.isStarted) {
        //   if (this.props.onStart != null && typeof this.props.onStart === 'function') {
        //     this.props.onStart.apply(this); this.isStarted = true;
        //   }
        // }
        this._updateInActiveArea(time);

        // if ( time < this.prevTime && !this.isFirstUpdateBackward ) {
        //   if (this.props.onFirstUpdateBackward != null && typeof this.props.onFirstUpdateBackward === 'function') {
        //     this.props.onFirstUpdateBackward.apply(this);
        //   }
        //   this.isFirstUpdateBackward = true;
        // }
      } else {
        // complete if time is larger then end time
        if (time > this.props.endTime && !this.isCompleted && this._isInActiveArea) {
          // get period number
          var props = this.props;
          var startPoint = props.startTime - props.delay;
          var periodNumber = Math.floor((props.endTime - startPoint) / (props.delay + props.duration));

          // if ( isGrow == null ) { isGrow = time > this.prevTime; }
          this._complete(this.o.yoyo && periodNumber % 2 === 0 ? 0 : 1);
        }

        // if was active and went to - unactive area
        if (time < this.prevTime && time < this.props.startTime) {

          if (!this.isOnReverseComplete && this._isInActiveArea) {
            // _start()
            this.setProgress(0);
            this._repeatStart();
            this.isOnReverseComplete = true;
          }

          // if (!this.isFirstUpdateBackward) {
          //   if (this.props.onFirstUpdateBackward != null && typeof this.props.onFirstUpdateBackward === 'function') {
          //     this.props.onFirstUpdateBackward.apply(this);
          //   }
          //   this.isFirstUpdateBackward = true;
          // }

          // isGrow indicates if actual parent time is growing.
          // Despite the fact that the time could be < previous time && <= startTime
          // it is actually grows. Tween could be added to a
          // Timeline, and the later will work with Tween's periods, feeding
          // 0 at the end of the period, because period % period === 0.
          // See 182 line of Timline's code for more info.
          // if (isGrow) {
          //   if (!this.isCompleted && this.prevTime < this.props.endTime ) {
          //     this._complete();
          //   }
          // } else if ( !this.isOnReverseComplete /* && this.isFirstUpdate */ ) {
          //   this.isOnReverseComplete = true;
          //   this.setProgress(0, !this.props.isChained);
          //   if (this.props.onReverseComplete != null && typeof this.props.onReverseComplete === 'function') {
          //     this.props.onReverseComplete.apply(this);
          //   }
          // }

          // this.isFirstUpdate = false;
        }

        this._isInActiveArea = false;

        // // rest isFirstUpdate flag if update was out of active zone
        // if ( time > this.props.endTime ) { this.isFirstUpdate = false; }
        // // reset isFirstUpdateBackward flag if progress went further the end time
        // if ( time > this.props.endTime ) { this.isFirstUpdateBackward = false; }
      }

      // // complete if time is larger then end time
      // if ( time > this.props.endTime && !this.isCompleted ) {
      //   // get period number
      //   var props = this.props;
      //   var startPoint = props.startTime - props.delay;
      //   var periodNumber = Math.floor((props.endTime-startPoint) / (props.delay+props.duration));

      //   // if ( isGrow == null ) { isGrow = time > this.prevTime; }
      //   this._complete( (this.o.yoyo && (periodNumber % 2 === 0)) ? 0 : 1 );
      // }

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

    /*
      Method call onRepeatStart calback and set flags.
    */
  }, {
    key: '_repeatStart',
    value: function _repeatStart() {
      if (this.isRepeatStart) {
        return;
      }
      if (this.props.onRepeatStart != null && typeof this.props.onRepeatStart === 'function') {
        this.props.onRepeatStart.apply(this);
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
        return this._complete();
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
      this.o.isIt && console.log('T: ' + T + ', prevT: ' + prevT + ', prevTime: ' + this.prevTime);
      // this.o.isIt && console.log(`TValue: ${TValue}, TPrevValue: ${TPrevValue}`);
      this.o.isIt && this._visualizeProgress(time);

      // if time is inside the duration area of the tween
      if (startPoint + elapsed >= props.startTime) {

        this._isInActiveArea = true;

        this.isRepeatCompleted = false;
        this.isRepeatStart = false;
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
              this._repeatStart();
              this.setProgress(0);
            }

            if (this.prevTime > time) {
              this._repeatComplete();
              this.setProgress(1);
            }
          }

          if (isOnEdge) {
            // if not just after delay
            // |=====|---=====|---=====| >>>
            //         ^1 ^2
            // because we have already handled
            // 1 and onRepeatComplete in delay gap
            if (this.progress !== 1) {
              this.setProgress(1);
              this._repeatComplete();
            }
            // if on edge but not at very start
            // |=====|=====|=====| >>>
            // ^not  ^here ^here          
            if (prevT >= 0) {
              this._repeatStart();
              this.setProgress(0);
            }
          }

          if (isOnReverseEdge) {
            // if on edge but not at very end
            // |=====|=====|=====| <<<
            //       ^here ^here ^not here       
            if (this.progress !== 0 && prevT != TCount) {
              this.setProgress(0);
              this._repeatStart();
            }
            this.setProgress(1);
            this._repeatComplete();
          }

          if (prevT === 'delay') {
            // if just before delay gap
            // |---=====|---=====|---=====| >>>
            //               ^2    ^1
            if (T < TPrevValue) {
              this.setProgress(1);
              this._repeatComplete();
            }
            // if just after delay gap
            // |---=====|---=====|---=====| >>>
            //            ^1  ^2
            if (T === TPrevValue) {
              this._repeatStart();
              this.setProgress(0);
            }
          }

          if (time !== props.endTime) {
            this.setProgress(proc);
          }

          // if progress is equal 0 and progress grows
          if (proc === 0) {
            this._repeatStart();
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
          this.setProgress(0);
          this._repeatStart();
        }

        this._isInActiveArea = false;
        this.isRepeatStart = false;

        this.o.isIt && console.log('in the delay gap');
        // if yoyo and even period we should flip
        // so set flipCoef to 1 if we need flip, otherwise to 0
        var flipCoef = props.yoyo && T % 2 === 0 ? 1 : 0;
        // if flip is 0 - bitwise XOR will leave the numbers as is,
        // if flip is 1 - bitwise XOR will inverse the numbers
        this.setProgress(this.prevTime < time ? 1 ^ flipCoef : 0 ^ flipCoef);
        // if reverse direction and in delay gap, then progress will be 0
        // if so we don't need to call the onRepeatComplete callback
        // |=====|---=====|---=====| <<<
        //         ^here    ^here  
        if (this.progress !== 0) {
          this._repeatComplete();
        }
      }
      this._wasUknownUpdate = false;
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

      // if in delay gap, set _delayT to current
      // period number and return "delay"
      if (elapsed > 0 && elapsed < p.delay) {
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