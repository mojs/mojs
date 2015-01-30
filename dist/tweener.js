var Tweener, t;

Tweener = (function() {
  function Tweener(o) {
    this.o = o != null ? o : {};
    this.vars();
    this;
  }

  Tweener.prototype.vars = function() {};

  return Tweener;

})();

t = new Tweener;


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("tweener", [], function() {
    return t;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = t;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.tweener = t;
}
