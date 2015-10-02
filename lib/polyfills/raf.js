
/* istanbul ignore next */

(function() {
  (function() {
    'use strict';
    var cancel, i, isOldBrowser, lastTime, vendors, vp, w;
    vendors = ['webkit', 'moz'];
    i = 0;
    w = window;
    while (i < vendors.length && !w.requestAnimationFrame) {
      vp = vendors[i];
      w.requestAnimationFrame = w[vp + 'RequestAnimationFrame'];
      cancel = w[vp + 'CancelAnimationFrame'];
      w.cancelAnimationFrame = cancel || w[vp + 'CancelRequestAnimationFrame'];
      ++i;
    }
    isOldBrowser = !w.requestAnimationFrame || !w.cancelAnimationFrame;
    if (/iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent) || isOldBrowser) {
      lastTime = 0;
      w.requestAnimationFrame = function(callback) {
        var nextTime, now;
        now = Date.now();
        nextTime = Math.max(lastTime + 16, now);
        return setTimeout((function() {
          callback(lastTime = nextTime);
        }), nextTime - now);
      };
      w.cancelAnimationFrame = clearTimeout;
    }
  })();

}).call(this);
