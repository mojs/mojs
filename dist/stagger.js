
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

  Stagger.prototype.ownDefaults = {
    delay: 'stagger(200)',
    els: null
  };

  function Stagger(o) {
    this.o = o != null ? o : {};
    this.vars();
  }

  Stagger.prototype.vars = function() {
    h.extend(this.ownDefaults, this.defaults);
    this.defaults = this.ownDefaults;
    Stagger.__super__.vars.apply(this, arguments);
    if (h.isDOM(this.props.els)) {
      if (this.props.els.childNodes) {
        return this.props.els = this.props.els.childNodes;
      }
    }
  };

  Stagger.prototype.createBit = function() {
    return Stagger.__super__.createBit.apply(this, arguments);
  };

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
