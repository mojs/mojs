var Bit, BitsMap, Circle, Line, Rect, Triangle, h;

Bit = require('./bit');

Circle = require('./circle');

Line = require('./line');

Rect = require('./rect');

Triangle = require('./triangle');

h = require('./h');

BitsMap = (function() {
  function BitsMap() {}

  BitsMap.prototype.h = h;

  BitsMap.prototype.map = {
    bit: Bit,
    circle: Circle,
    line: Line,
    rect: Rect,
    triangle: Triangle
  };

  BitsMap.prototype.getBit = function(name) {
    return this.map[name] || this.h.error("no \"" + name + "\" shape available yet, please choose from this list:", this.map);
  };

  return BitsMap;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("bitsMap", [], function() {
    return new BitsMap;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = new BitsMap;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.bitsMap = new BitsMap;
}
