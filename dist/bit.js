var Bit, h;

h = require('./h');

Bit = (function() {
  Bit.prototype.ns = 'http://www.w3.org/2000/svg';

  Bit.prototype.type = 'line';

  Bit.prototype.defaults = {
    radius: 50,
    radiusX: null,
    radiusY: null,
    strokeWidth: 2,
    stroke: 'hotpink',
    fill: 'transparent',
    strokeDasharray: '',
    strokeDashoffset: '',
    x: 0,
    y: 0,
    deg: 0
  };

  function Bit(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.render();
  }

  Bit.prototype.vars = function() {
    if (this.o.ctx && this.o.ctx.tagName === 'svg') {
      this.ctx = this.o.ctx;
    } else {
      throw Error('You should pass a real context(ctx) to the bit');
    }
    this.extendDefaults();
    return this.calcTranform();
  };

  Bit.prototype.calcTranform = function() {
    var rotate;
    rotate = "rotate(" + this.props.deg + ", " + this.props.x + ", " + this.props.y + ")";
    return this.props.transform = "" + rotate;
  };

  Bit.prototype.extendDefaults = function() {
    var key, value, _ref, _results;
    if (this.props == null) {
      this.props = {};
    }
    _ref = this.defaults;
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push(this.props[key] = this.o[key] || value);
    }
    return _results;
  };

  Bit.prototype.setAttr = function(attr, value) {
    var key, val, _results;
    if (typeof attr === 'object') {
      _results = [];
      for (key in attr) {
        val = attr[key];
        key = key.split(/(?=[A-Z])/).join('-').toLowerCase();
        _results.push((value || this.el).setAttribute(key, val));
      }
      return _results;
    } else {
      return this.el.setAttribute(attr, value);
    }
  };

  Bit.prototype.setProp = function(attr, value) {
    var key, val, _results;
    if (typeof attr === 'object') {
      _results = [];
      for (key in attr) {
        val = attr[key];
        _results.push(this.props[key] = val);
      }
      return _results;
    } else {
      return this.props[attr] = value;
    }
  };

  Bit.prototype.render = function() {
    this.isRendered = true;
    this.el = document.createElementNS(this.ns, this.type || 'line');
    !this.o.isDrawLess && this.draw();
    return this.ctx.appendChild(this.el);
  };

  Bit.prototype.draw = function() {
    return this.setAttr({
      stroke: this.props.stroke,
      strokeWidth: this.props.strokeWidth,
      strokeDasharray: this.props.strokeDasharray,
      strokeDashoffset: this.props.strokeDashoffset,
      fill: this.props.fill,
      transform: this.props.transform
    });
  };

  return Bit;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Bit", [], function() {
    return Bit;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Bit;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Bit = Bit;
}
