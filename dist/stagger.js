
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

  Stagger.prototype.ownDefaults = {
    delay: 'stagger(200)',
    els: null
  };

  Stagger.prototype.vars = function() {
    h.extend(this.ownDefaults, this.defaults);
    this.defaults = this.ownDefaults;
    Stagger.__super__.vars.apply(this, arguments);
    return this.parseEls();
  };

  Stagger.prototype.parseEls = function() {
    var els;
    if (h.isDOM(this.props.els)) {
      if (this.props.els.childNodes) {
        return this.props.els = Array.prototype.slice.call(this.props.els.childNodes, 0);
      }
    } else if (this.props.els + '' === '[object NodeList]') {
      return this.props.els = Array.prototype.slice.call(this.props.els, 0);
    } else if (typeof this.props.els === 'string') {
      els = document.querySelector(this.props.els);
      return this.props.els = Array.prototype.slice.call(els.childNodes, 0);
    }
  };

  Stagger.prototype.createBit = function() {
    var i, len, _i, _results;
    this.transits = [];
    len = this.props.els.length;
    _results = [];
    for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
      _results.push(this.transits.push(new Transit(this.getOption(i))));
    }
    return _results;
  };

  Stagger.prototype.getOption = function(i) {
    var key, option, value, _ref;
    option = {};
    _ref = this.props;
    for (key in _ref) {
      value = _ref[key];
      option[key] = this.getPropByMod(key, i);
    }
    option.bit = this.getPropByMod('els', i);
    return option;
  };

  Stagger.prototype.getPropByMod = function(name, i) {
    var prop;
    prop = this.props[name];
    if (h.isArray(prop)) {
      return prop[i % prop.length];
    } else {
      return prop;
    }
  };

  Stagger.prototype.render = function() {
    this.createBit();
    return this.setProgress(0, true);
  };

  Stagger.prototype.setProgress = function() {};

  Stagger.prototype.calcSize = function() {};

  Stagger.prototype.draw = function() {};

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
