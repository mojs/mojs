
/*
  :: mo · js :: motion graphics toolbelt for the web
  LegoMushroom - Oleg Solomka 2015 MIT
  v0.104.0 unstable
 */
var Burst, MotionPath, Stagger, Swirl, Timeline, Transit, Tween, h, mp, tr;

window.mojs = {
  revision: '0.104.0',
  isDebug: true
};

h = require('./h');

Burst = require('./burst');

Swirl = require('./Swirl');

Transit = require('./transit');

Stagger = require('./stagger');

MotionPath = require('./motion-path');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

tr = new Transit({
  x: 300,
  y: 300,
  radius: 50,
  isShowInit: true,
  isShowEnd: true,
  strokeWidth: 2,
  stroke: 'deeppink',
  duration: 2000
});

mp = new MotionPath({
  path: '#js-path1',
  el: tr.el,
  duration: 2000,
  delay: 2000,
  onUpdate: function() {
    return console.log('aa');
  }
}).then({
  isReverse: true
});


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("mojs", [], function() {
    return mojs;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = mojs;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs = mojs;
}
