var Bit;

Bit = (function() {
  Bit.prototype.ns = 'http://www.w3.org/2000/svg';

  Bit.prototype.type = 'line';

  Bit.prototype.defaults = {
    radius: 50,
    strokeWidth: 2,
    strokeColor: 'hotpink',
    fillColor: 'deeppink',
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
    var key, rotate, translate, value, _ref;
    if (this.o.ctx && this.o.ctx.tagName === 'svg') {
      this.ctx = this.o.ctx;
    } else {
      throw Error('You should pass a real context(ctx) to the bit');
    }
    if (this.props == null) {
      this.props = {};
    }
    _ref = this.defaults;
    for (key in _ref) {
      value = _ref[key];
      this.props[key] = this.o[key] || value;
    }
    this.props.cX = this.props.x - this.props.radius;
    this.props.cY = this.props.y - this.props.radius;
    translate = "translate(" + this.props.cX + ", " + this.props.cY + ")";
    rotate = "rotate(" + this.props.deg + ", " + this.props.cX + ", " + this.props.cY + ")";
    return this.props.transform = "" + translate + " " + rotate;
  };

  Bit.prototype.setAttr = function(attr, value) {
    var key, _results;
    if (typeof attr === 'object') {
      _results = [];
      for (key in attr) {
        value = attr[key];
        key = key.split(/(?=[A-Z])/).join('-').toLowerCase();
        _results.push(this.el.setAttribute(key, value));
      }
      return _results;
    } else {
      return this.el.setAttribute(attr, value);
    }
  };

  Bit.prototype.render = function() {
    this.isRendered = true;
    this.el = document.createElementNS(this.ns, 'line');
    !this.o.isDrawLess && this.draw();
    return this.ctx.appendChild(this.el);
  };

  Bit.prototype.draw = function() {};

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

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Bit = Bit;
}
