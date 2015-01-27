var Tween, h;

h = require('./h');

Tween = (function() {
  Tween.prototype.defaults = {
    duration: 600,
    delay: 0,
    yoyo: false,
    durationElapsed: 0,
    delayElapsed: 0,
    repeat: 0,
    onStart: null,
    onComplete: null
  };

  function Tween(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.extendDefaults();
  }

  Tween.prototype.vars = function() {
    this.h = h;
    this.progress = 0;
    return this.props = {
      totalElapsed: 0,
      durationElapsed: 0,
      delayElapsed: 0
    };
  };

  Tween.prototype.extendDefaults = function() {
    this.h.extend(this.o, this.defaults);
    return this.onUpdate = this.o.onUpdate;
  };

  Tween.prototype.start = function() {
    var _ref;
    this.props.startTime = Date.now() + this.o.delay;
    this.isStarted = true;
    if (!this.isOnStartFired) {
      if ((_ref = this.o.onStart) != null) {
        _ref.apply(this);
      }
      this.isOnStartFired = true;
    }
    return this;
  };

  return Tween;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Tween", [], function() {
    return Tween;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Tween;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Tween = Tween;
}
