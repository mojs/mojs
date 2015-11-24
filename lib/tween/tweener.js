'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _h = require('../h');

var _h2 = _interopRequireDefault(_h);

require('../polyfills/raf');
require('../polyfills/performance');

var Tweener = (function () {
  function Tweener() {
    _classCallCheck(this, Tweener);

    this.vars();return this;
  }

  _createClass(Tweener, [{
    key: 'vars',
    value: function vars() {
      this.tweens = [];this.loop = _h2['default'].bind(this.loop, this);
    }
  }, {
    key: 'loop',
    value: function loop() {
      if (!this.isRunning) {
        return false;
      }
      var time = performance.now();this.update(time);
      if (!this.tweens.length) {
        return this.isRunning = false;
      }
      requestAnimationFrame(this.loop);
      return this;
    }
  }, {
    key: 'startLoop',
    value: function startLoop() {
      if (this.isRunning) {
        return;
      };this.isRunning = true;
      requestAnimationFrame(this.loop);
    }
  }, {
    key: 'stopLoop',
    value: function stopLoop() {
      this.isRunning = false;
    }
  }, {
    key: 'update',
    value: function update(time) {
      var i = this.tweens.length;
      while (i--) {
        if (this.tweens[i].update(time) === true) {
          this.remove(i);
        }
      }
    }
  }, {
    key: 'add',
    value: function add(tween) {
      this.tweens.push(tween);this.startLoop();
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.tweens.length = 0;
    }
  }, {
    key: 'remove',
    value: function remove(tween) {
      var index = typeof tween === 'number' ? tween : this.tweens.indexOf(tween);

      if (index !== -1) {
        this.tweens.splice(index, 1);
      }
    }
  }]);

  return Tweener;
})();

var t = new Tweener();
exports['default'] = t;
module.exports = exports['default'];