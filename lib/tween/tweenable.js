'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _tween = require('./tween');

var _tween2 = _interopRequireDefault(_tween);

var _timeline = require('./timeline');

/*
  Class to define a module ancestor
  with timeline and tween options and functionality.
  All runable modules should inherit from this class.

  @class Tweenable
*/

var _timeline2 = _interopRequireDefault(_timeline);

var Tweenable = (function () {
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

    this._o = o;
    this._transformTweenOptions();
    this._makeTween();
    this._makeTimeline();
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
      this.tween = new _tween2['default'](this._o);
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
      this.timeline = new _timeline2['default'](this._o.timeline);
      // if tween exist - add it to the timeline there
      // is some modules like stagger that have no tween
      this.tween && this.timeline.add(this.tween);
    }
  }]);

  return Tweenable;
})();

exports['default'] = Tweenable;
module.exports = exports['default'];