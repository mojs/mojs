(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



},{}],2:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Line,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Line = (function(_super) {
  __extends(Line, _super);

  function Line() {
    return Line.__super__.constructor.apply(this, arguments);
  }

  Line.prototype.draw = function() {
    return this.setAttr({
      x1: 0,
      x2: 2 * this.props.radius,
      y1: this.props.radius,
      y2: this.props.radius,
      stroke: this.props.strokeColor,
      strokeWidth: this.props.strokeWidth,
      transform: this.props.transform
    });
  };

  return Line;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Line", [], function() {
    return Line;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Line;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Line = Line;
}



},{"./bit":1}],3:[function(require,module,exports){
var Bit, Line, line, svg;

Line = require('./line');

Bit = require('./bit');

svg = document.getElementById('js-svg');

console.log(svg);

line = new Line({
  ctx: svg,
  x: 100,
  y: 100,
  deg: 90,
  isDrawLess: true
});

line.draw();



},{"./bit":1,"./line":2}]},{},[3])