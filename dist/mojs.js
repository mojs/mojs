
/*
  :: mo · js :: motion graphics toolbelt for the web
  LegoMushroom - Oleg Solomka 2015 MIT
  v0.102.0 unstable
 */
var Burst, MotionPath, Stagger, Swirl, Timeline, Transit, Tween, dash, delta, h, paths;

window.mojs = {
  revision: '0.102.0',
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

paths = document.getElementById('js-svg');

dash = "7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7";

delta = {};

delta["0 100% " + dash + " " + dash + " " + dash] = "0 0% " + dash + " " + dash + " " + dash;

console.log(delta);

new Transit({
  radius: 200,
  isShowInit: true,
  isShowEnd: true,
  x: 300,
  y: 300,
  strokeWidth: 2,
  stroke: 'deeppink',
  strokeDasharray: delta,
  duration: 2000
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
