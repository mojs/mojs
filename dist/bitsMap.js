var Bit, BitsMap, Circle, Cross, Equal, Line, Polygon, Rect, Zigzag, h;

Bit = require('./bit');

Circle = require('./circle');

Line = require('./line');

Zigzag = require('./zigzag');

Rect = require('./rect');

Polygon = require('./polygon');

Cross = require('./cross');

Equal = require('./equal');

h = require('./h');

BitsMap = (function() {
  function BitsMap() {}

  BitsMap.prototype.h = h;

  BitsMap.prototype.map = {
    bit: Bit,
    circle: Circle,
    line: Line,
    zigzag: Zigzag,
    rect: Rect,
    polygon: Polygon,
    cross: Cross,
    equal: Equal
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


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = new BitsMap;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.bitsMap = new BitsMap;
}
