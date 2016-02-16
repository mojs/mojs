// import h from './h';
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _tweenTween = require('./tween/tween');

var _tweenTween2 = _interopRequireDefault(_tweenTween);

var _tweenTimeline = require('./tween/timeline');

/*
  Class for toggling opacity on bunch of elements
  @class Spriter
  @todo
    - add isForce3d option
    - add run new option merging
    - add then chains
*/

var _tweenTimeline2 = _interopRequireDefault(_tweenTimeline);

var Tweenable = (function () {
  _createClass(Tweenable, [{
    key: '_declareDefaults',

    /*
      Defaults/APIs
    */
    value: function _declareDefaults() {
      this._defaults = {
        /*
          Duration
          @property duration
          @type     {Number}
        */
        duration: 500,
        /*
          Delay
          @property delay
          @type     {Number}
        */
        delay: 0,
        /*
          Easing. Please see the 
          [timeline module parseEasing function](timeline.coffee.html#parseEasing)
          for all avaliable options.
           @property easing
          @type     {String, Function}
        */
        easing: 'linear.none',
        /*
          Repeat times count
          
          @property repeat
          @type     {Number}
        */
        repeat: 0,
        /*
          Yoyo option defines if animation should be altered on repeat.
          
          @property yoyo
          @type     {Boolean}
        */
        yoyo: false,
        /*
          isRunLess option prevents animation from running immediately after
          initialization.
          
          @property isRunLess
          @type     {Boolean}
        */
        isRunLess: false,
        /*
          isShowEnd option defines if the last frame should be shown when
          animation completed.
          
          @property isShowEnd
          @type     {Boolean}
        */
        isShowEnd: false,
        /*
          onStart callback will be called once on animation start.
          
          @property onStart
          @type     {Function}
        */
        onStart: null,
        /*
          onUpdate callback will be called on every frame of the animation.
          The current progress in range **[0,1]** will be passed to the callback.
          
          @property onUpdate
          @type     {Function}
        */
        onUpdate: null,
        /*
          onComplete callback will be called once on animation complete.
          
          @property onComplete
          @type     {Function}
        */
        onComplete: null
      };
    }
  }]);

  function Tweenable() {
    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Tweenable);

    this.o = o;
    if (!this.o.el) {
      return h.error('No "el" option specified, aborting');
    }
    this._vars();this._declareDefaults();this._extendDefaults();this._parseFrames();
    if (this._frames.length <= 2) h.warn('Spriter: only ' + this._frames.length + ' frames found');
    if (this._frames.length < 1) h.error("Spriter: there is no frames to animate, aborting");
    this._createTween();
    return this;
  }

  /*
    Method to declare some variables.
    
    @method run
    @param  {Object} New options
    @todo   Implement new object merging
  */

  _createClass(Tweenable, [{
    key: '_vars',
    value: function _vars() {
      this._props = h.cloneObj(this.o);
      this.el = this.o.el;
      this._frames = [];
    }

    /*
      Method to run the spriter on demand.
      
      @method run
      @param  {Object} New options
      @todo   Implement new object merging
    */
  }, {
    key: 'run',
    value: function run(o) {
      return this.timeline.play();
    }

    /*
      Method to extend _props by options(this.o)
      
      @method _extendDefaults
    */
  }, {
    key: '_extendDefaults',
    value: function _extendDefaults() {
      return h.extend(this._props, this._defaults);
    }

    /*
      Method to parse frames as child nodes of el.
      
      @method _parseFrames
    */
  }, {
    key: '_parseFrames',
    value: function _parseFrames() {
      this._frames = Array.prototype.slice.call(this.el.children, 0);
      this._frames.forEach(function (frame, i) {
        return frame.style.opacity = 0;
      });
      this._frameStep = 1 / this._frames.length;
    }

    /*
      Method to create tween and timeline and supply callbacks.
      
      @method _createTween
    */
  }, {
    key: '_createTween',
    value: function _createTween() {
      var _this = this;

      this._tween = new _tweenTween2['default']({
        duration: this._props.duration,
        delay: this._props.delay,
        yoyo: this._props.yoyo,
        repeat: this._props.repeat,
        easing: this._props.easing,
        onStart: function onStart() {
          return _this._props.onStart && _this._props.onStart();
        },
        onComplete: function onComplete() {
          return _this._props.onComplete && _this._props.onComplete();
        },
        onUpdate: function onUpdate(p) {
          return _this._setProgress(p);
        }
      });
      this.timeline = new _tweenTimeline2['default']();this.timeline.add(this._tween);
      if (!this._props.isRunLess) this._startTween();
    }

    /*
      Method to start tween
      
      @method _startTween
    */
  }, {
    key: '_startTween',
    value: function _startTween() {
      var _this2 = this;

      setTimeout(function () {
        return _this2.timeline.play();
      }, 1);
    }

    /*
      Method to set progress of the sprite
      
      @method _setProgress
      @param  {Number} Progress in range **[0,1]**
    */
  }, {
    key: '_setProgress',
    value: function _setProgress(p) {
      // get the frame number
      var proc = Math.floor(p / this._frameStep);
      // react only if frame changes
      if (this._prevFrame != this._frames[proc]) {
        // if previous frame isnt current one, hide it
        if (this._prevFrame) {
          this._prevFrame.style.opacity = 0;
        }
        // if end of animation and isShowEnd flag was specified
        // then show the last frame else show current frame
        var currentNum = p === 1 && this._props.isShowEnd ? proc - 1 : proc;
        // show the current frame
        if (this._frames[currentNum]) {
          this._frames[currentNum].style.opacity = 1;
        }
        // set previous frame as current
        this._prevFrame = this._frames[proc];
      }
      if (this._props.onUpdate) {
        this._props.onUpdate(p);
      }
    }
  }]);

  return Tweenable;
})();

exports['default'] = Tweenable;
module.exports = exports['default'];