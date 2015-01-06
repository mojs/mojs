
/* istanbul ignore next */
var Bit, Byte,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Byte = (function(_super) {
  __extends(Byte, _super);

  Byte.prototype.defaults = {
    radius: 50,
    strokeWidth: 2,
    strokeColor: '#ff00ff',
    fill: 'transparent',
    duration: 500,
    delay: 0
  };

  function Byte(o) {
    this.o = o != null ? o : {};
    this.vars();
  }

  Byte.prototype.vars = function() {};

  return Byte;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Byte", [], function() {
    return Byte;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Byte;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Byte = Byte;
}
