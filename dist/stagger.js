
/* istanbul ignore next */
var Stagger, Timeline, Transit, Tween, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

h = require('./h');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

Transit = require('./transit');

Stagger = (function(_super) {
  __extends(Stagger, _super);

  function Stagger() {
    return Stagger.__super__.constructor.apply(this, arguments);
  }

  return Stagger;

})(Transit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Stagger", [], function() {
    return Stagger;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Stagger;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Stagger = Stagger;
}
