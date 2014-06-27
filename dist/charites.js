(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Bit, h;

h = require('../helpers');

Bit = (function() {
  function Bit(o) {
    this.o = o != null ? o : {};
    console.log('bit');
    this.vars();
  }

  Bit.prototype.vars = function() {
    this.size = this.o.size || 100;
    this.size *= h.pixel;
    this.radius = this.o.radius || this.size / 2 || 50;
    this.radius *= h.pixel;
    this.rate = this.o.rate || .15;
    if (!this.o.context) {
      return this.createContext();
    } else {
      return this.context = this.o.context;
    }
  };

  Bit.prototype.createContext = function() {
    this.el = document.createElement('canvas');
    this.el.setAttribute('width', 2 * this.radius);
    this.el.setAttribute('height', 2 * this.radius);
    if (h.pixel > 1) {
      this.el.style.width = "" + this.radius + "px";
      this.el.style.height = "" + this.radius + "px";
    }
    return h.body.appendChild(this.el);
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

  function Bubble(o) {
    this.o = o != null ? o : {};
    Bubble.__super__.constructor.apply(this, arguments);
    this.animate();
  }

  Bubble.prototype.animate = function() {
    var centerX, centerY, ctx, tween;
    ctx = this.el.getContext('2d');
    centerX = this.radius;
    centerY = this.radius;
    return tween = new TWEEN.Tween({
      r: 0,
      p: 0,
      lw: this.radius * this.rate
    }).to({
      r: this.radius,
      p: 1,
      lw: 0
    }, 600).onUpdate(function() {
      ctx.clear();
      ctx.beginPath();
      (this.r < 0) && (this.r = -this.r);
      if (this.lw > this.r) {
        this.lw = this.r;
      }
      ctx.arc(centerX, centerY, this.r, 0, 2 * Math.PI, false);
      ctx.lineWidth = this.lw * h.pixel;
      ctx.strokeStyle = 'deeppink';
      ctx.stroke();
      return this.p === 1 && ctx.clear();
    }).start();
  };

  Bubble.prototype.draw = function() {};

  return Bubble;

})(Bit);

module.exports = (function() {
  return Bubble;
})();


},{"../helpers":4,"../polyfills":5,"./bit":1}],3:[function(require,module,exports){
var Bubble, animationLoop;

Bubble = require('./bits/bubble');

setTimeout(function() {
  return new Bubble({
    radius: 50,
    rate: .5
  });
}, 1000);

animationLoop = function(time) {
  requestAnimationFrame(animationLoop);
  return TWEEN.update(time);
};

animationLoop();


},{"./bits/bubble":2}],4:[function(require,module,exports){
var Helpers;

Helpers = (function() {
  Helpers.prototype.pixel = 1;

  function Helpers(o) {
    this.o = o != null ? o : {};
    console.log('helpers');
  }

  Helpers.prototype.doc = document;

  Helpers.prototype.body = document.body;

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