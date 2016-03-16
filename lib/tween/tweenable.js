'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _tween = require('./tween');

var _tween2 = _interopRequireDefault(_tween);

var _timeline = require('./timeline');

var _timeline2 = _interopRequireDefault(_timeline);

var _module2 = require('../module');

/*
  Class to define a module ancestor
  with timeline and tween options and functionality.
  All runable modules should inherit from this class.

  @class Tweenable
*/

var _module3 = _interopRequireDefault(_module2);

var Tweenable = (function (_Module) {
  _inherits(Tweenable, _Module);

  _createClass(Tweenable, [{
    key: 'play',

    /*
      play method for the timeline.
      @public
      @returns this.
    */
    value: function play() {
      this.timeline.play.apply(this.timeline, arguments);
      return this;
    }

    /*
      playBackward method for the timeline.
      @public
      @returns this.
    */
  }, {
    key: 'playBackward',
    value: function playBackward() {
      this.timeline.playBackward.apply(this.timeline, arguments);
      return this;
    }

    /*
      pause method for the timeline.
      @public
      @returns this.
    */
  }, {
    key: 'pause',
    value: function pause() {
      this.timeline.pause.apply(this.timeline, arguments);
      return this;
    }

    /*
      stop method for the timeline.
      @public
      @returns this.
    */
  }, {
    key: 'stop',
    value: function stop() {
      this.timeline.stop.apply(this.timeline, arguments);
      return this;
    }

    /*
      setProgress method for the timeline.
      @public
      @returns this.
    */
  }, {
    key: 'setProgress',
    value: function setProgress() {
      this.timeline.setProgress.apply(this.timeline, arguments);
      return this;
    }

    // ^ API methods.
    // v Private methods.

  }]);

  function Tweenable() {
    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Tweenable);

    // super of Module
    _get(Object.getPrototypeOf(Tweenable.prototype), 'constructor', this).call(this, o);

    this._transformTweenOptions();
    this._makeTween();
    // make timeline only if isTimelineLess option is not set
    !this._o.isTimelineLess && this._makeTimeline();
  }

  /*
    Placeholder method that should be overrided
    and will be called before tween/timeline creation.
    @private
  */

  _createClass(Tweenable, [{
    key: '_transformTweenOptions',
    value: function _transformTweenOptions() {}

    /*
      Method to create tween.
      @private
    */
  }, {
    key: '_makeTween',
    value: function _makeTween() {
      // pass callbacks context
      this._o.callbacksContext = this._o.callbacksContext || this;
      this.tween = new _tween2['default'](this._o);
      // make timeline property point to tween one is "no timeline" mode
      this._o.isTimelineLess && (this.timeline = this.tween);
    }

    /*
      Method to create timeline.
      @private
      @param {Object} Timeline's options.
                      An object which contains "timeline" property with
                      timeline options.
    */
  }, {
    key: '_makeTimeline',
    value: function _makeTimeline() {
      // pass callbacks context
      this._o.timeline = this._o.timeline || {};
      this._o.timeline.callbacksContext = this._o.callbacksContext || this;
      this.timeline = new _timeline2['default'](this._o.timeline);
      // if tween exist - add it to the timeline there
      // is some modules like stagger that have no tween
      this.tween && this.timeline.add(this.tween);
    }
  }]);

  return Tweenable;
})(_module3['default']);

exports['default'] = Tweenable;
module.exports = exports['default'];