
/*
  :: mo · js :: motion graphics toolbelt for the web
  LegoMushroom - Oleg Solomka 2015 MIT
  v0.100.2 unstable
 */
var Burst, MotionPath, Stagger, Swirl, Timeline, Transit, Tween, h, mp, tr;

window.mojs = {
  revision: '0.100.2',
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
  type: 'cross',
  radius: 20,
  strokeWidth: 2,
  stroke: 'deeppink',
  isShowInit: true,
  isShowEnd: true
});

mp = new MotionPath({
  delay: 2000,
  duration: 2000,
  path: 'M0.55859375,164.449219 L39.8046875,12.4257812 L136.691406,166.269531 L221.34375,2.3984375 L306.511719,164.144531 L378.007812,2.05078125 L456.144531,157.15625',
  el: tr
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
