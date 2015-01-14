
/* istanbul ignore next */
var Burst, Transit, bitsMap, burst,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

bitsMap = require('./bitsMap');

Transit = require('./transit');

Burst = (function(_super) {
  __extends(Burst, _super);

  function Burst() {
    return Burst.__super__.constructor.apply(this, arguments);
  }

  Burst.prototype.defaults = {
    burstPoints: 5,
    burstRadius: {
      50: 75
    },
    burstDegree: 360,
    strokeWidth: 2,
    strokeOpacity: 1,
    strokeDasharray: '',
    strokeDashoffset: '',
    stroke: '#ff00ff',
    fill: 'transparent',
    fillOpacity: 'transparent',
    strokeLinecap: '',
    points: 3,
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
    opacity: 1,
    radius: 50,
    angle: 0,
    size: null,
    sizeGap: 0,
    onInit: null,
    onStart: null,
    onComplete: null,
    onCompleteChain: null,
    onUpdate: null,
    duration: 500,
    delay: 0,
    repeat: 1,
    yoyo: false,
    easing: 'Linear.None'
  };

  Burst.prototype.render = function() {
    return Burst.__super__.render.apply(this, arguments);
  };

  return Burst;

})(Transit);

burst = new Burst;


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Burst", [], function() {
    return Burst;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Burst;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Burst = Burst;
}
