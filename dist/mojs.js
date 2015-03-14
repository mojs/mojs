
/*
  :: mo · js :: motion graphics toolbelt for the web
  LegoMushroom - Oleg Solomka 2015 MIT
  v0.106.0 unstable
 */
var Burst, MotionPath, Stagger, Swirl, Timeline, Transit, Tween, h, tr;

window.mojs = {
  revision: '0.106.0',
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
  x: 300,
  y: 300,
  radius: {
    50: 75
  },
  isShowInit: true,
  isShowEnd: true,
  strokeWidth: 2,
  stroke: 'cyan',
  duration: 1000,
  delay: 1000
}).then({
  radiusX: 50,
  fill: 'green',
  stroke: 'deeppink'
}).then({
  radiusY: 50,
  fill: 'green',
  stroke: 'deeppink'
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
