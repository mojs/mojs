
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

  Stagger.prototype.isSkipDelta = true;

  Stagger.prototype.ownDefaults = {
    delay: 'stagger(100)',
    els: null,
    fill: 'transparent',
    stroke: ['yellow', 'cyan', 'deeppink'],
    strokeDasharray: '100%',
    strokeDashoffset: {
      '100%': '0%'
    },
    isShowInit: false,
    isShowEnd: false,
    radius: 0,
    type: 'line'
  };

  Stagger.prototype.vars = function() {
    h.extend(this.ownDefaults, this.defaults);
    this.defaults = this.ownDefaults;
    Stagger.__super__.vars.apply(this, arguments);
    return this.parseEls();
  };

  Stagger.prototype.extendDefaults = function(o) {
    var fromObj, key, value, _ref, _results;
    this.props = {};
    this.deltas = {};
    fromObj = o || this.o;
    _ref = this.defaults;
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push(this.props[key] = fromObj[key] != null ? fromObj[key] : this.defaults[key]);
    }
    return _results;
  };

  Stagger.prototype.parseEls = function() {
    var els;
    if (this.props.els + '' === '[object NodeList]') {
      return this.props.els = Array.prototype.slice.call(this.props.els, 0);
    } else if (typeof this.props.els === 'string') {
      els = document.querySelector(this.props.els);
      return this.props.els = h.getChildElements(els);
    } else if (h.isDOM(this.props.els)) {
      return this.props.els = h.getChildElements(this.props.els);
    }
  };

  Stagger.prototype.createBit = function() {
    var i, len, option, _i, _results;
    this.transits = [];
    len = this.props.els.length;
    _results = [];
    for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
      option = this.getOption(i);
      option.index = i;
      option.isRunLess = true;
      _results.push(this.transits.push(new Transit(option)));
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
    this.setProgress(0, true);
    this.createTween();
    return this;
  };

  Stagger.prototype.isDelta = function() {
    return false;
  };

  Stagger.prototype.createTween = function() {
    var i;
    this.tween = new Tween;
    i = -1;
    while (i++ < this.transits.length - 1) {
      this.tween.add(this.transits[i].tween);
    }
    return !this.o.isRunLess && this.startTween();
  };

  Stagger.prototype.draw = function() {
    return this.drawEl();
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
