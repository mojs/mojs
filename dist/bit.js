var Bit, h;

h = require('./h');

Bit = (function() {
  Bit.prototype.ns = 'http://www.w3.org/2000/svg';

  Bit.prototype.type = 'line';

  Bit.prototype.ratio = 1;

  Bit.prototype.defaults = {
    radius: 50,
    radiusX: void 0,
    radiusY: void 0,
    'stroke': 'hotpink',
    'stroke-width': 2,
    'stroke-opacity': 1,
    'fill': 'transparent',
    'fill-opacity': 1,
    'stroke-dasharray': '',
    'stroke-dashoffset': '',
    'stroke-linecap': '',
    points: 3,
    x: 0,
    y: 0,
    angle: 0
  };

  function Bit(o) {
    this.o = o != null ? o : {};
    this.init();
  }

  Bit.prototype.init = function() {
    this.vars();
    this.render();
    return this;
  };

  Bit.prototype.vars = function() {
    if (this.o.ctx && this.o.ctx.tagName === 'svg') {
      this.ctx = this.o.ctx;
    } else {
      throw Error('You should pass a real context(ctx) to the bit');
    }
    this.state = [];
    this.drawMapLength = this.drawMap.length;
    this.extendDefaults();
    return this.calcTransform();
  };

  Bit.prototype.calcTransform = function() {
    var rotate;
    rotate = "rotate(" + this.props.angle + ", " + this.props.x + ", " + this.props.y + ")";
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
    var el, key, keys, len, val, _results;
    if (typeof attr === 'object') {
      keys = Object.keys(attr);
      len = keys.length;
      el = value || this.el;
      _results = [];
      while (len--) {
        key = keys[len];
        val = attr[key];
        _results.push(el.setAttribute(key, val));
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

  Bit.prototype.drawMap = ['stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill', 'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform'];

  Bit.prototype.draw = function() {
    var len, name, _results;
    len = this.drawMapLength;
    _results = [];
    while (len--) {
      name = this.drawMap[len];
      _results.push(this.setAttrIfChanged(name, this.props[name]));
    }
    return _results;
  };

  Bit.prototype.setAttrIfChanged = function(name) {
    var value;
    if (this.state[name] !== (value = this.props[name])) {
      this.el.setAttribute(name, value);
      return this.state[name] = value;
    }
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
