
/*
  :: mo · js :: motion graphics toolbelt for the web
  LegoMushroom - Oleg Solomka 2015 MIT
  v0.106.4 unstable
 */
var Burst, MotionPath, Stagger, Swirl, Timeline, Transit, Tween, burst, h;

window.mojs = {
  revision: '0.106.4',
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

burst = new mojs.Burst({
  x: 300,
  y: 300,
  delay: 1500,
  duration: 3000,
  type: 'line',
  strokeWidth: 2,
  stroke: 'white',
  randomAngle: 1,
  radius: {
    10: 100
  },
  childOptions: {
    radius: 10
  }
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
