(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Bit, h;

h = require('../helpers');

Bit = (function() {
  Bit.prototype.oa = {};

  function Bit(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.imidiate && this.animate();
  }

  Bit.prototype.vars = function() {
    this.size = this.o.size || 100;
    this.size *= h.pixel;
    this.radius = this.o.radius || this.size / 2 || 50;
    this.radius *= h.pixel;
    this.color = this["default"]('color', 'deeppink');
    this.rate = this["default"]('rate', .2);
    this.duration = this["default"]('duration', 600);
    this.delay = this["default"]('delay', 0);
    this.easing = this["default"]('easing', 'Linear.None');
    this.easingArr = this.easing.split('.');
    this.imidiate = this.o.imidiate;
    if (this.imidiate == null) {
      this.imidiate = true;
    }
    (this.o.el != null) && (this.foreignContext = true);
    this.x = this.foreignContext && this.o.x ? this.o.x : this.radius;
    this.y = this.foreignContext && this.o.y ? this.o.y : this.radius;
    this.el = this.o.el || this.el || this.createContext();
    return this.ctx = this.ctx || this.el.getContext('2d');
  };

  Bit.prototype.createContext = function() {
    if (this.foreignContext) {
      return;
    }
    this.el = document.createElement('canvas');
    this.el.setAttribute('width', 2 * this.radius);
    this.el.setAttribute('height', 2 * this.radius);
    if (h.pixel > 1) {
      this.el.style.width = "" + this.radius + "px";
      this.el.style.height = "" + this.radius + "px";
    }
    h.body.appendChild(this.el);
    return this.el;
  };

  Bit.prototype["default"] = function(prop, def) {
    return this[prop] = this.oa[prop] || this[prop] || this.o[prop] || def;
  };

  return Bit;

})();

module.exports = (function() {
  return Bit;
})();


},{"../helpers":4}],2:[function(require,module,exports){
var Bit, Bubble, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('../polyfills');

h = require('../helpers');

Bit = require('./bit');

Bubble = (function(_super) {
  __extends(Bubble, _super);

  function Bubble() {
    return Bubble.__super__.constructor.apply(this, arguments);
  }

  Bubble.prototype.animate = function(oa) {
    var it;
    this.oa = oa != null ? oa : {};
    this.vars();
    TWEEN.remove(this.tween);
    it = this;
    return this.tween = new TWEEN.Tween({
      r: 0,
      p: 0,
      lw: this.radius * this.rate
    }).to({
      r: this.radius,
      p: 1,
      lw: 0
    }, this.duration).easing(TWEEN.Easing[this.easingArr[0]][this.easingArr[1]]).onUpdate(function() {
      var ctx;
      ctx = it.ctx;
      (this.r < 0) && (this.r = -this.r);
      if (this.lw > this.r) {
        this.lw = this.r;
      }
      ctx.clear();
      ctx.beginPath();
      ctx.arc(it.x, it.y, this.r, 0, 2 * Math.PI, false);
      ctx.lineWidth = this.lw * h.pixel;
      ctx.strokeStyle = it.color;
      ctx.stroke();
      return this.p === 1 && ctx.clear();
    }).delay(this.delay).start();
  };

  Bubble.prototype.draw = function() {};

  return Bubble;

})(Bit);

module.exports = (function() {
  return Bubble;
})();


},{"../helpers":4,"../polyfills":5,"./bit":1}],3:[function(require,module,exports){
var Bubble, animationLoop, bubble1, canvas, h;

Bubble = require('./bits/bubble');

h = require('./helpers');

canvas = document.getElementById('js-canvas');

bubble1 = new Bubble({
  radius: 50,
  x: 100,
  y: 50
});

window.addEventListener('click', function(e) {
  var size1, style1;
  style1 = h.getStyle(bubble1.el);
  size1 = parseInt(style1.width, 10);
  bubble1.el.style.position = 'absolute';
  bubble1.el.style.top = "" + (e.y - (size1 / 2)) + "px";
  bubble1.el.style.left = "" + (e.x - (size1 / 2)) + "px";
  return bubble1.animate({
    duration: 400
  });
});

animationLoop = function(time) {
  requestAnimationFrame(animationLoop);
  return TWEEN.update(time);
};

animationLoop();


},{"./bits/bubble":2,"./helpers":4}],4:[function(require,module,exports){
var Helpers;

Helpers = (function() {
  Helpers.prototype.pixel = 1;

  function Helpers(o) {
    this.o = o != null ? o : {};
    console.log('helpers');
  }

  Helpers.prototype.doc = document;

  Helpers.prototype.body = document.body;

  Helpers.prototype.getStyle = function(el) {
    var computedStyle;
    if (window.getComputedStyle) {
      return computedStyle = getComputedStyle(el, null);
    } else {
      return computedStyle = el.currentStyle;
    }
  };

  return Helpers;

})();

module.exports = (function() {
  return new Helpers;
})();


},{}],5:[function(require,module,exports){
module.exports = (function() {
  if (!CanvasRenderingContext2D.prototype.clear) {
    return CanvasRenderingContext2D.prototype.clear = function(preserveTransform) {
      if (preserveTransform) {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
      }
      this.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (preserveTransform) {
        this.restore();
      }
    };
  }
})();


},{}]},{},[3])