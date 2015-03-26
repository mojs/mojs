
/*
  :: mo · js :: motion graphics toolbelt for the web
  LegoMushroom - Oleg Solomka 2015 MIT
  v0.108.1 unstable
 */
var Burst, MotionPath, Stagger, Swirl, Timeline, Transit, Tween, circle, h;

window.mojs = {
  revision: '0.108.1',
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

circle = new mojs.Transit({
  x: 155,
  y: 155,
  type: 'rect',
  radius: 3 * 20,
  fill: 'transparent',
  strokeWidth: 2,
  stroke: 'hotpink',
  strokeDasharray: {
    '0 100': '100 rand(10%,50%)'
  },
  delay: 1500,
  duration: 1500,
  angle: {
    45: 100
  },
  isShowInit: true,
  isShowEnd: true
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
