'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

require('../polyfills/raf');

require('../polyfills/performance');

var _h = require('../h');

var _h2 = _interopRequireDefault(_h);

var Tweener = (function () {
  function Tweener() {
    _classCallCheck(this, Tweener);

    this._vars();return this;
  }

  _createClass(Tweener, [{
    key: '_vars',
    value: function _vars() {
      this.tweens = [];this._loop = this._loop.bind(this);
    }

    /*
      Main animation loop. Should have only one concurrent loop.
      @private
      @returns this
    */
  }, {
    key: '_loop',
    value: function _loop() {
      if (!this._isRunning) {
        return false;
      }
      var time = performance.now();this._update(time);
      if (!this.tweens.length) {
        return this._isRunning = false;
      }
      requestAnimationFrame(this._loop);
      return this;
    }

    /*
      Method to start animation loop.
      @private
    */
  }, {
    key: '_startLoop',
    value: function _startLoop() {
      if (this._isRunning) {
        return;
      };this._isRunning = true;
      requestAnimationFrame(this._loop);
    }

    /*
      Method to stop animation loop.
      @private
    */
  }, {
    key: '_stopLoop',
    value: function _stopLoop() {
      this._isRunning = false;
    }

    /*
      Method to update every tween/timeline on animation frame.
      @private
    */
  }, {
    key: '_update',
    value: function _update(time) {
      var i = this.tweens.length;
      while (i--) {
        // cache the current tween
        var tween = this.tweens[i];
        if (tween && tween._update(time) === true) {
          this.remove(i);
          tween._onTweenerFinish();
          tween._prevTime = null;
        }
      }
    }

    /*
      Method to add a Tween/Timeline to loop pool.
      @param {Object} Tween/Timeline to add.
    */
  }, {
    key: 'add',
    value: function add(tween) {
      // return if tween is already running
      if (tween._isRunning) {
        return;
      }
      tween._isRunning = true;
      this.tweens.push(tween);
      this._startLoop();
    }

    /*
      Method stop updating all the child tweens/timelines.
      @private
    */
  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.tweens.length = 0;
    }

    /*
      Method to remove specific tween/timeline form updating.
      @private
    */
  }, {
    key: 'remove',
    value: function remove(tween) {
      var index = typeof tween === 'number' ? tween : this.tweens.indexOf(tween);

      if (index !== -1) {
        tween = this.tweens[index];
        if (tween) {
          tween._isRunning = false;
          this.tweens.splice(index, 1);
          tween._onTweenerRemove();
        }
      }
    }
  }]);

  return Tweener;
})();

var t = new Tweener();
exports['default'] = t;
module.exports = exports['default'];