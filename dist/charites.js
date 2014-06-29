(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Bit, h;

h = require('../helpers');

Bit = (function() {
  Bit.prototype.oa = {};

  function Bit(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.imidiate && this.run();
  }

  Bit.prototype.vars = function() {
    this.size = this.o.size || 100;
    this.size *= h.pixel;
    this.cnt = this["default"]({
      prop: 'cnt',
      def: 0
    });
    this.oldRadius = this.radius;
    this.radius = this["default"]({
      prop: 'radius',
      def: 50
    });
    (this.oa.radius != null) && h.unlock({
      lock: 'bitRadiusLock'
    });
    h.lock({
      lock: 'bitRadiusLock',
      fun: (function(_this) {
        return function() {
          return _this.radius *= h.pixel;
        };
      })(this)
    });
    this["default"]({
      prop: 'lineCap',
      def: 'round'
    });
    this.el = this.o.el || this.el || this.createContext();
    (this.o.el != null) && (this.foreignContext = true);
    this.ctx = this.ctx || this.el.getContext('2d');
    this.radius !== this.oldRadius && this.setElSize();
    this.color = this["default"]({
      prop: 'color',
      def: 'deeppink'
    });
    this.rate = this["default"]({
      prop: 'rate',
      def: .5
    });
    this.fillRate = this["default"]({
      prop: 'fillRate',
      def: .33
    });
    this.duration = this["default"]({
      prop: 'duration',
      def: 600
    });
    this.delay = this["default"]({
      prop: 'delay',
      def: 0
    });
    this.easing = this["default"]({
      prop: 'easing',
      def: 'Linear.None'
    });
    this.easingArr = this.easing.split('.');
    this.imidiate = this.o.imidiate;
    if (this.imidiate == null) {
      this.imidiate = true;
    }
    this.x = this.foreignContext ? this["default"]({
      prop: 'x',
      def: this.radius
    }) : this.radius;
    return this.y = this.foreignContext ? this["default"]({
      prop: 'y',
      def: this.radius
    }) : this.radius;
  };

  Bit.prototype.createContext = function() {
    if (this.foreignContext) {
      return;
    }
    this.el = document.createElement('canvas');
    return h.body.appendChild(this.el);
  };

  Bit.prototype.setElSize = function() {
    this.el.setAttribute('width', 2 * this.radius);
    this.el.setAttribute('height', 2 * this.radius);
    if (h.pixel > 1) {
      this.el.style.width = "" + this.radius + "px";
      this.el.style.height = "" + this.radius + "px";
    }
    return this.el;
  };

  Bit.prototype["default"] = function(o) {
    var def, prop;
    prop = o.prop;
    def = o.def;
    return this[prop] = this.oa[prop] != null ? this.oa[prop] : this[prop] != null ? this[prop] : this.o[prop] != null ? this.o[prop] : def;
  };

  return Bit;

})();

module.exports = (function() {
  return Bit;
})();


},{"../helpers":5}],2:[function(require,module,exports){
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

  Bubble.prototype.run = function(oa) {
    var it;
    this.oa = oa != null ? oa : {};
    this.vars();
    TWEEN.remove(this.tween);
    it = this;
    h.startAnimationLoop();
    return this.tween = new TWEEN.Tween({
      r: this.radius * this.rate,
      p: 0,
      lw: this.radius * this.fillRate
    }).to({
      r: this.radius,
      p: 1,
      lw: 0
    }, this.duration).easing(TWEEN.Easing[this.easingArr[0]][this.easingArr[1]]).onUpdate(function() {
      return it.draw.call(this, it);
    }).onComplete(function() {
      return h.stopAnimationLoop();
    }).delay(this.delay).start();
  };

  Bubble.prototype.draw = function(it) {
    var ctx;
    ctx = it.ctx;
    (this.r < 0) && (this.r = -this.r);
    ctx.clear();
    ctx.beginPath();
    ctx.arc(it.x, it.y, this.r, 0, 2 * Math.PI, false);
    ctx.lineWidth = this.lw * h.pixel;
    ctx.strokeStyle = it.color;
    ctx.stroke();
    return this.p === 1 && ctx.clear();
  };

  return Bubble;

})(Bit);

module.exports = (function() {
  return Bubble;
})();


},{"../helpers":5,"../polyfills":6,"./bit":1}],3:[function(require,module,exports){
var Bit, Burst, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('../polyfills');

h = require('../helpers');

Bit = require('./bit');

Burst = (function(_super) {
  __extends(Burst, _super);

  function Burst() {
    return Burst.__super__.constructor.apply(this, arguments);
  }

  Burst.prototype.run = function(oa) {
    var from, it;
    this.oa = oa != null ? oa : {};
    this.vars();
    TWEEN.remove(this.tween);
    TWEEN.remove(this.tween2);
    it = this;
    this.tween2 = new TWEEN.Tween({
      r: this.radius * this.rate,
      d: this.rotate / 2
    }).to({
      r: this.radius - this.radiusSlice,
      d: this.rotate
    }, this.duration / 2).easing(TWEEN.Easing[this.easingArr[0]][this.easingArr[1]]).onUpdate(function() {
      return it.draw2.call(this, it);
    }).onComplete(function() {
      return h.stopAnimationLoop();
    });
    from = {
      lw: this.radius * this.fillRate,
      r: this.radius * this.rate,
      p: 0,
      d: 0
    };
    h.startAnimationLoop();
    return this.tween = new TWEEN.Tween(from).to({
      r: this.radius - this.radiusSlice,
      p: 1,
      lw: 0,
      d: this.rotate / 2
    }, this.duration / 2).easing(TWEEN.Easing[this.easingArr[0]][this.easingArr[1]]).onUpdate(function() {
      return it.draw.call(this, it);
    }).delay(this.delay).start().delay(this.delay2).chain(this.tween2);
  };

  Burst.prototype.vars = function() {
    Burst.__super__.vars.apply(this, arguments);
    this.degreeRate = 1;
    this.step = (this.degreeRate * 2 * Math.PI) / this.cnt;
    this.rotateStep = this.degreeRate * 360 / this.cnt;
    this.bitWidth = this["default"]({
      prop: 'bitWidth',
      def: 1
    });
    this.initialRotation = this["default"]({
      prop: 'initialRotation',
      def: 0
    });
    this["default"]('delay2', 0);
    h.lock({
      lock: 'burstRotationLock',
      fun: (function(_this) {
        return function() {
          return _this.initialRotation *= Math.PI / 180;
        };
      })(this)
    });
    this["default"]({
      prop: 'rotate',
      def: 0
    });
    (this.oa.rotate != null) && h.unlock({
      lock: 'burstRotateLock'
    });
    h.lock({
      lock: 'burstRotateLock',
      fun: (function(_this) {
        return function() {
          return _this.rotate *= Math.PI / 180;
        };
      })(this)
    });
    return this.radiusSlice = this.lineCap !== 'butt' ? this.bitWidth : 0;
  };

  Burst.prototype.draw = function(it) {
    var angle, ctx, i, x1, x2, y1, y2, _i, _ref;
    ctx = it.ctx;
    ctx.clear();
    ctx.beginPath();
    angle = it.initialRotation;
    for (i = _i = 0, _ref = it.cnt; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      x1 = it.x + (Math.cos(angle + this.d) * (it.radius * it.rate));
      y1 = it.y + (Math.sin(angle + this.d) * (it.radius * it.rate));
      x2 = it.x + (Math.cos(angle + this.d) * this.r);
      y2 = it.y + (Math.sin(angle + this.d) * this.r);
      it.drawLine({
        point1: {
          x: x1,
          y: y1
        },
        point2: {
          x: x2,
          y: y2
        },
        ctx: ctx
      });
      angle += it.step;
    }
    ctx.stroke();
    ctx.lineWidth = it.bitWidth * h.pixel;
    ctx.strokeStyle = it.color;
    ctx.lineCap = it.lineCap;
    return ctx.stroke();
  };

  Burst.prototype.drawLine = function(o) {
    o.ctx.moveTo(o.point1.x, o.point1.y);
    return o.ctx.lineTo(o.point2.x, o.point2.y);
  };

  Burst.prototype.draw2 = function(it) {
    var angle, ctx, i, x1, x2, y1, y2, _i, _ref;
    ctx = it.ctx;
    ctx.clear();
    ctx.beginPath();
    angle = it.initialRotation;
    for (i = _i = 0, _ref = it.cnt; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      x1 = it.x + (Math.cos(angle + this.d) * this.r);
      y1 = it.y + (Math.sin(angle + this.d) * this.r);
      x2 = it.x + (Math.cos(angle + this.d) * (it.radius - it.radiusSlice));
      y2 = it.y + (Math.sin(angle + this.d) * (it.radius - it.radiusSlice));
      it.drawLine({
        point1: {
          x: x1,
          y: y1
        },
        point2: {
          x: x2,
          y: y2
        },
        ctx: ctx
      });
      angle += it.step;
    }
    ctx.stroke();
    ctx.lineWidth = it.bitWidth * h.pixel;
    ctx.strokeStyle = it.color;
    ctx.lineCap = it.lineCap;
    this.p === 1 && ctx.clear();
    return ctx.stroke();
  };

  return Burst;

})(Bit);

module.exports = (function() {
  return Burst;
})();


},{"../helpers":5,"../polyfills":6,"./bit":1}],4:[function(require,module,exports){
var Bubble, Burst, bubble1, canvas, h;

Burst = require('./bits/burst');

Bubble = require('./bits/bubble');

h = require('./helpers');

canvas = document.getElementById('js-canvas');

bubble1 = new Bubble({
  radius: 30,
  duration: 400,
  delay: 200,
  initialRotation: 90,
  cnt: 4,
  rotate: 90
});

window.addEventListener('click', function(e) {
  var size1, style1;
  style1 = h.getStyle(bubble1.el);
  size1 = parseInt(style1.width, 10);
  bubble1.el.style.position = 'absolute';
  bubble1.el.style.top = "" + (e.y - (size1 / 2)) + "px";
  bubble1.el.style.left = "" + (e.x - (size1 / 2)) + "px";
  return bubble1.run({
    radius: h.rand(50, 100),
    rate: .15,
    fillRate: .2
  });
});


},{"./bits/bubble":2,"./bits/burst":3,"./helpers":5}],5:[function(require,module,exports){
var Helpers;

Helpers = (function() {
  Helpers.prototype.pixel = 2;

  Helpers.prototype.doc = document;

  Helpers.prototype.body = document.body;

  function Helpers(o) {
    this.o = o != null ? o : {};
    this.animationLoop = this.animationLoop.bind(this);
  }

  Helpers.prototype.getStyle = function(el) {
    var computedStyle;
    if (window.getComputedStyle) {
      return computedStyle = getComputedStyle(el, null);
    } else {
      return computedStyle = el.currentStyle;
    }
  };

  Helpers.prototype.rand = function(min, max) {
    return Math.floor((Math.random() * ((max + 1) - min)) + min);
  };

  Helpers.prototype.lock = function(o) {
    !this[o.lock] && o.fun();
    return this[o.lock] = true;
  };

  Helpers.prototype.unlock = function(o) {
    return this[o.lock] = false;
  };

  Helpers.prototype.animationLoop = function(time) {
    if (!this.isAnimateLoop) {
      return;
    }
    requestAnimationFrame(this.animationLoop);
    return TWEEN.update(time);
  };

  Helpers.prototype.startAnimationLoop = function() {
    if (this.isAnimateLoop) {
      return;
    }
    this.isAnimateLoop = true;
    return this.animationLoop();
  };

  Helpers.prototype.stopAnimationLoop = function() {
    return this.isAnimateLoop = false;
  };

  return Helpers;

})();

module.exports = (function() {
  return new Helpers;
})();


},{}],6:[function(require,module,exports){
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


},{}]},{},[4])