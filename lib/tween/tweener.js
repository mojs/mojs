(function() {
  var Tweener, h, i, t;

  require('../polyfills/raf');

  require('../polyfills/performance');

  h = require('../h');

  i = 0;

  Tweener = (function() {
    function Tweener() {
      this.vars();
      this;
    }

    Tweener.prototype.vars = function() {
      this.tweens = [];
      return this.loop = h.bind(this.loop, this);
    };

    Tweener.prototype.loop = function() {
      var time;
      if (!this.isRunning) {
        return false;
      }
      time = performance.now();
      this.update(time);
      if (!this.tweens.length) {
        return this.isRunning = false;
      }
      requestAnimationFrame(this.loop);
      return this;
    };

    Tweener.prototype.startLoop = function() {
      if (this.isRunning) {
        return;
      }
      this.isRunning = true;
      return requestAnimationFrame(this.loop);
    };

    Tweener.prototype.stopLoop = function() {
      return this.isRunning = false;
    };

    Tweener.prototype.update = function(time) {
      var _results;
      i = this.tweens.length;
      _results = [];
      while (i--) {
        if (this.tweens[i].update(time) === true) {
          _results.push(this.remove(i));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Tweener.prototype.add = function(tween) {
      this.tweens.push(tween);
      return this.startLoop();
    };

    Tweener.prototype.removeAll = function() {
      return this.tweens.length = 0;
    };

    Tweener.prototype.remove = function(tween) {
      var index;
      index = typeof tween === 'number' ? tween : this.tweens.indexOf(tween);
      if (index !== -1) {
        return this.tweens.splice(index, 1);
      }
    };

    return Tweener;

  })();

  t = new Tweener;

  module.exports = t;

}).call(this);
