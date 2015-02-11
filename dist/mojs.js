(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/* istanbul ignore next */
var Swirl, Transit,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Transit = require('./transit');

Swirl = (function(_super) {
  __extends(Swirl, _super);

  function Swirl() {
    return Swirl.__super__.constructor.apply(this, arguments);
  }

  Swirl.prototype.skipPropsDelta = {
    x: 1,
    y: 1
  };

  Swirl.prototype.vars = function() {
    Swirl.__super__.vars.apply(this, arguments);
    return !this.o.isSwirlLess && this.generateSwirl();
  };

  Swirl.prototype.extendDefaults = function() {
    var angle, x, y, _base, _base1;
    Swirl.__super__.extendDefaults.apply(this, arguments);
    x = this.getPosValue('x');
    y = this.getPosValue('y');
    angle = 90 + Math.atan((y.delta / x.delta) || 0) * (180 / Math.PI);
    if (x.delta < 0) {
      angle += 180;
    }
    this.positionDelta = {
      radius: Math.sqrt(x.delta * x.delta + y.delta * y.delta),
      angle: angle,
      x: x,
      y: y
    };
    if ((_base = this.o).angleShift == null) {
      _base.angleShift = 0;
    }
    if ((_base1 = this.o).radiusScale == null) {
      _base1.radiusScale = 1;
    }
    this.props.angleShift = this.h.parseIfRand(this.o.angleShift);
    return this.props.radiusScale = this.h.parseIfRand(this.o.radiusScale);
  };

  Swirl.prototype.getPosValue = function(name) {
    var optVal, val;
    optVal = this.o[name];
    if (optVal && typeof optVal === 'object') {
      val = this.h.parseDelta(name, optVal);
      return {
        start: val.start.value,
        end: val.end.value,
        delta: val.delta,
        units: val.end.unit
      };
    } else {
      val = parseFloat(optVal || this.defaults[name]);
      return {
        start: val,
        end: val,
        delta: 0,
        units: 'px'
      };
    }
  };

  Swirl.prototype.setProgress = function(progress) {
    var angle, point, x, y;
    angle = this.positionDelta.angle + this.props.angleShift;
    if (this.o.isSwirl) {
      angle += this.getSwirl(progress);
    }
    point = this.h.getRadialPoint({
      angle: angle,
      radius: this.positionDelta.radius * progress * this.props.radiusScale,
      center: {
        x: this.positionDelta.x.start,
        y: this.positionDelta.y.start
      }
    });
    x = point.x.toFixed(4);
    y = point.y.toFixed(4);
    this.props.x = this.o.ctx ? x : x + this.positionDelta.x.units;
    this.props.y = this.o.ctx ? y : y + this.positionDelta.y.units;
    return Swirl.__super__.setProgress.apply(this, arguments);
  };

  Swirl.prototype.generateSwirl = function() {
    var _base, _base1;
    this.props.signRand = Math.round(this.h.rand(0, 1)) ? -1 : 1;
    if ((_base = this.o).swirlSize == null) {
      _base.swirlSize = 10;
    }
    if ((_base1 = this.o).swirlFrequency == null) {
      _base1.swirlFrequency = 3;
    }
    this.props.swirlSize = this.h.parseIfRand(this.o.swirlSize);
    return this.props.swirlFrequency = this.h.parseIfRand(this.o.swirlFrequency);
  };

  Swirl.prototype.getSwirl = function(progress) {
    return this.props.signRand * this.props.swirlSize * Math.sin(this.props.swirlFrequency * progress);
  };

  return Swirl;

})(Transit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Swirl", [], function() {
    return Swirl;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Swirl;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Swirl = Swirl;
}

},{"./transit":15}],2:[function(require,module,exports){
var Bit, h;

h = require('./h');

Bit = (function() {
  Bit.prototype.ns = 'http://www.w3.org/2000/svg';

  Bit.prototype.type = 'line';

  Bit.prototype.ratio = 1;

  Bit.prototype.defaults = {
    radius: 50,
    radiusX: null,
    radiusY: null,
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

},{"./h":8}],3:[function(require,module,exports){
var Bit, BitsMap, Circle, Cross, Line, Polygon, Rect, h;

Bit = require('./bit');

Circle = require('./circle');

Line = require('./line');

Rect = require('./rect');

Polygon = require('./polygon');

Cross = require('./cross');

h = require('./h');

BitsMap = (function() {
  function BitsMap() {}

  BitsMap.prototype.h = h;

  BitsMap.prototype.map = {
    bit: Bit,
    circle: Circle,
    line: Line,
    rect: Rect,
    polygon: Polygon,
    cross: Cross
  };

  BitsMap.prototype.getBit = function(name) {
    return this.map[name] || this.h.error("no \"" + name + "\" shape available yet, please choose from this list:", this.map);
  };

  return BitsMap;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("bitsMap", [], function() {
    return new BitsMap;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = new BitsMap;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.bitsMap = new BitsMap;
}

},{"./bit":2,"./circle":5,"./cross":6,"./h":8,"./line":9,"./polygon":11,"./rect":12}],4:[function(require,module,exports){

/* istanbul ignore next */
var Burst, Swirl, Transit, Tween, bitsMap, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

bitsMap = require('./bitsMap');

Transit = require('./transit');

Swirl = require('./swirl');

h = require('./h');

Tween = require('./tween');

Burst = (function(_super) {
  __extends(Burst, _super);

  function Burst() {
    return Burst.__super__.constructor.apply(this, arguments);
  }

  Burst.prototype.skipProps = {
    childOptions: 1
  };

  Burst.prototype.defaults = {
    count: 5,
    degree: 360,
    opacity: 1,
    randomAngle: 0,
    randomRadius: 0,
    x: 100,
    y: 100,
    shiftX: 0,
    shiftY: 0,
    radius: {
      25: 75
    },
    angle: 0,
    size: null,
    sizeGap: 0,
    onStart: null,
    onComplete: null,
    onCompleteChain: null,
    onUpdate: null
  };

  Burst.prototype.childDefaults = {
    radius: {
      7: 0
    },
    angle: 0,
    onStart: null,
    onComplete: null,
    onUpdate: null,
    points: 3,
    duration: 500,
    delay: 0,
    repeat: 0,
    yoyo: false,
    easing: 'Linear.None',
    type: 'circle',
    fill: 'deeppink',
    fillOpacity: 1,
    isSwirl: false,
    swirlSize: 10,
    swirlFrequency: 3,
    stroke: 'transparent',
    strokeWidth: 0,
    strokeOpacity: 1,
    strokeDasharray: '',
    strokeDashoffset: '',
    strokeLinecap: null
  };

  Burst.prototype.optionsIntersection = {
    radius: 1,
    angle: 1,
    onStart: 1,
    onComplete: 1,
    onUpdate: 1
  };

  Burst.prototype.run = function(o) {
    var i, key, keys, len, tr, transit, _base, _i, _len, _ref;
    if ((o != null) && Object.keys(o).length) {
      if (o.count || ((_ref = o.childOptions) != null ? _ref.count : void 0)) {
        this.h.warn('Sorry, count can not be changed on run');
      }
      this.extendDefaults(o);
      keys = Object.keys(o.childOptions || {});
      if ((_base = this.o).childOptions == null) {
        _base.childOptions = {};
      }
      for (i = _i = 0, _len = keys.length; _i < _len; i = ++_i) {
        key = keys[i];
        this.o.childOptions[key] = o.childOptions[key];
      }
      len = this.transits.length;
      while (len--) {
        transit = this.transits[len];
        transit.tuneNewOption(this.getOption(len), true);
      }
      this.tween.recalcDuration();
    }
    if (this.props.randomAngle || this.props.randomRadius) {
      len = this.transits.length;
      while (len--) {
        tr = this.transits[len];
        this.props.randomAngle && tr.setProp({
          angleShift: this.generateRandomAngle()
        });
        this.props.randomRadius && tr.setProp({
          radiusScale: this.generateRandomRadius()
        });
      }
    }
    return this.startTween();
  };

  Burst.prototype.createBit = function() {
    var i, option, _i, _ref, _results;
    this.transits = [];
    _results = [];
    for (i = _i = 0, _ref = this.props.count; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      option = this.getOption(i);
      option.ctx = this.ctx;
      option.isDrawLess = option.isRunLess = option.isTweenLess = true;
      this.props.randomAngle && (option.angleShift = this.generateRandomAngle());
      this.props.randomRadius && (option.radiusScale = this.generateRandomRadius());
      _results.push(this.transits.push(new Swirl(option)));
    }
    return _results;
  };

  Burst.prototype.addBitOptions = function() {
    var i, pointEnd, pointStart, points, step, transit, x, y, _i, _len, _ref, _results;
    points = this.props.count;
    this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1;
    step = this.props.degree / this.degreeCnt;
    _ref = this.transits;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      transit = _ref[i];
      pointStart = this.h.getRadialPoint({
        radius: this.deltas.radius != null ? this.deltas.radius.start : this.props.radius,
        angle: i * step + this.props.angle,
        center: {
          x: this.props.center,
          y: this.props.center
        }
      });
      pointEnd = this.h.getRadialPoint({
        radius: this.deltas.radius != null ? this.deltas.radius.end : this.props.radius,
        angle: i * step + this.props.angle,
        center: {
          x: this.props.center,
          y: this.props.center
        }
      });
      x = {};
      y = {};
      x[pointStart.x] = pointEnd.x;
      y[pointStart.y] = pointEnd.y;
      transit.o.x = x;
      transit.o.y = y;
      _results.push(transit.extendDefaults());
    }
    return _results;
  };

  Burst.prototype.draw = function(progress) {
    return this.drawEl();
  };

  Burst.prototype.isNeedsTransform = function() {
    return this.isPropChanged('shiftX') || this.isPropChanged('shiftY') || this.isPropChanged('angle');
  };

  Burst.prototype.fillTransform = function() {
    return "rotate(" + this.props.angle + "deg) translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
  };

  Burst.prototype.createTween = function() {
    var i;
    this.tween = new Tween({
      onUpdate: (function(_this) {
        return function(p) {
          var _ref;
          _this.setProgress(p);
          return (_ref = _this.props.onUpdate) != null ? _ref.apply(_this, arguments) : void 0;
        };
      })(this),
      onComplete: (function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
        };
      })(this),
      onStart: (function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
        };
      })(this)
    });
    i = this.transits.length;
    while (i--) {
      this.tween.add(this.transits[i].timeline);
    }
    return !this.o.isRunLess && this.startTween();
  };

  Burst.prototype.calcSize = function() {
    var end, i, largestSize, selfSize, start, transit, _i, _len, _ref;
    largestSize = -1;
    _ref = this.transits;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      transit = _ref[i];
      transit.calcSize();
      if (largestSize < transit.props.size) {
        largestSize = transit.props.size;
      }
    }
    selfSize = this.deltas.radius ? (start = Math.abs(this.deltas.radius.start), end = Math.abs(this.deltas.radius.end), Math.max(start, end)) : parseFloat(this.props.radius);
    this.props.size = largestSize + 2 * selfSize;
    this.props.center = this.props.size / 2;
    return this.addBitOptions();
  };

  Burst.prototype.getOption = function(i) {
    var key, option, value, _ref;
    option = {};
    _ref = this.childDefaults;
    for (key in _ref) {
      value = _ref[key];
      option[key] = this.getPropByMod({
        key: key,
        i: i
      });
      if (this.optionsIntersection[key]) {
        if (option[key] == null) {
          option[key] = this.getPropByMod({
            key: key,
            i: i,
            from: this.childDefaults
          });
        }
        continue;
      }
      if (option[key] == null) {
        option[key] = this.getPropByMod({
          key: key,
          i: i,
          from: this.o
        });
      }
      if (option[key] == null) {
        option[key] = this.getPropByMod({
          key: key,
          i: i,
          from: this.childDefaults
        });
      }
    }
    return option;
  };

  Burst.prototype.getPropByMod = function(o) {
    var prop, _ref;
    prop = (_ref = o.from || this.o.childOptions) != null ? _ref[o.key] : void 0;
    if (this.h.isArray(prop)) {
      return prop[o.i % prop.length];
    } else {
      return prop;
    }
  };

  Burst.prototype.generateRandomAngle = function(i) {
    var randdomness, randomness;
    randomness = parseFloat(this.props.randomAngle);
    randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
    return this.h.rand(0, randomness ? randomness * 360 : 180);
  };

  Burst.prototype.generateRandomRadius = function(i) {
    var randdomness, randomness, start;
    randomness = parseFloat(this.props.randomRadius);
    randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
    start = randomness ? (1 - randomness) * 100 : (1 - .5) * 100;
    return this.h.rand(start, 100) / 100;
  };

  return Burst;

})(Transit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Burst", [], function() {
    return Burst;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Burst;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Burst = Burst;
}

},{"./bitsMap":3,"./h":8,"./swirl":13,"./transit":15,"./tween":16}],5:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Circle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Circle = (function(_super) {
  __extends(Circle, _super);

  function Circle() {
    return Circle.__super__.constructor.apply(this, arguments);
  }

  Circle.prototype.type = 'ellipse';

  Circle.prototype.draw = function() {
    Circle.__super__.draw.apply(this, arguments);
    return this.setAttr({
      rx: this.props.radiusX || this.props.radius,
      ry: this.props.radiusY || this.props.radius,
      cx: this.props.x,
      cy: this.props.y
    });
  };

  return Circle;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Circle", [], function() {
    return Circle;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Circle;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Circle = Circle;
}

},{"./bit":2}],6:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Cross,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Cross = (function(_super) {
  __extends(Cross, _super);

  function Cross() {
    return Cross.__super__.constructor.apply(this, arguments);
  }

  Cross.prototype.type = 'path';

  Cross.prototype.draw = function() {
    var d, line1, line2, x1, x2, y1, y2;
    Cross.__super__.draw.apply(this, arguments);
    x1 = this.props.x - this.props.radius;
    x2 = this.props.x + this.props.radius;
    line1 = "M" + x1 + "," + this.props.y + " L" + x2 + "," + this.props.y;
    y1 = this.props.y - this.props.radius;
    y2 = this.props.y + this.props.radius;
    line2 = "M" + this.props.x + "," + y1 + " L" + this.props.x + "," + y2;
    d = "" + line1 + " " + line2;
    return this.setAttr({
      d: d
    });
  };

  return Cross;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Cross", [], function() {
    return Cross;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Cross;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Cross = Cross;
}

},{"./bit":2}],7:[function(require,module,exports){
var Easing, easing;

Easing = (function() {
  function Easing() {}

  Easing.prototype.Linear = {
    None: function(k) {
      return k;
    }
  };

  Easing.prototype.Quadratic = {
    In: function(k) {
      return k * k;
    },
    Out: function(k) {
      return k * (2 - k);
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k;
      }
      return -0.5 * (--k * (k - 2) - 1);
    }
  };

  Easing.prototype.Cubic = {
    In: function(k) {
      return k * k * k;
    },
    Out: function(k) {
      return --k * k * k + 1;
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k + 2);
    }
  };

  Easing.prototype.Quartic = {
    In: function(k) {
      return k * k * k * k;
    },
    Out: function(k) {
      return 1 - (--k * k * k * k);
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
      }
      return -0.5 * ((k -= 2) * k * k * k - 2);
    }
  };

  Easing.prototype.Quintic = {
    In: function(k) {
      return k * k * k * k * k;
    },
    Out: function(k) {
      return --k * k * k * k * k + 1;
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }
  };

  Easing.prototype.Sinusoidal = {
    In: function(k) {
      return 1 - Math.cos(k * Math.PI / 2);
    },
    Out: function(k) {
      return Math.sin(k * Math.PI / 2);
    },
    InOut: function(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
  };

  Easing.prototype.Exponential = {
    In: function(k) {
      if (k === 0) {
        return 0;
      } else {
        return Math.pow(1024, k - 1);
      }
    },
    Out: function(k) {
      if (k === 1) {
        return 1;
      } else {
        return 1 - Math.pow(2, -10 * k);
      }
    },
    InOut: function(k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
      }
      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    }
  };

  Easing.prototype.Circular = {
    In: function(k) {
      return 1 - Math.sqrt(1 - k * k);
    },
    Out: function(k) {
      return Math.sqrt(1 - (--k * k));
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }
  };

  Easing.prototype.Elastic = {
    In: function(k) {
      var a, p, s;
      s = void 0;
      p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      a = 1;
      s = p / 4;
      return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    },
    Out: function(k) {
      var a, p, s;
      s = void 0;
      p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      a = 1;
      s = p / 4;
      return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
    },
    InOut: function(k) {
      var a, p, s;
      s = void 0;
      p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      a = 1;
      s = p / 4;
      if ((k *= 2) < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
      }
      return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    }
  };

  Easing.prototype.Back = {
    In: function(k) {
      var s;
      s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    Out: function(k) {
      var s;
      s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    InOut: function(k) {
      var s;
      s = 1.70158 * 1.525;
      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
      }
      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }
  };

  Easing.prototype.Bounce = {
    In: function(k) {
      return 1 - easing.Bounce.Out(1 - k);
    },
    Out: function(k) {
      if (k < (1 / 2.75)) {
        return 7.5625 * k * k;
      } else if (k < (2 / 2.75)) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < (2.5 / 2.75)) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },
    InOut: function(k) {
      if (k < 0.5) {
        return easing.Bounce.In(k * 2) * 0.5;
      }
      return easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
    }
  };

  return Easing;

})();

easing = new Easing;


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("easing", [], function() {
    return easing;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = easing;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.easing = easing;
}

},{}],8:[function(require,module,exports){
var Helpers, TWEEN, h;

TWEEN = require('./vendor/tween');

Helpers = (function() {
  Helpers.prototype.TWEEN = TWEEN;

  Helpers.prototype.logBadgeCss = 'background:#3A0839;color:#FF512F;border-radius:5px; padding: 1px 5px 2px; border: 1px solid #FF512F;';

  Helpers.prototype.shortColors = {
    aqua: 'rgb(0,255,255)',
    black: 'rgb(0,0,0)',
    blue: 'rgb(0,0,255)',
    fuchsia: 'rgb(255,0,255)',
    gray: 'rgb(128,128,128)',
    green: 'rgb(0,128,0)',
    lime: 'rgb(0,255,0)',
    maroon: 'rgb(128,0,0)',
    navy: 'rgb(0,0,128)',
    olive: 'rgb(128,128,0)',
    purple: 'rgb(128,0,128)',
    red: 'rgb(255,0,0)',
    silver: 'rgb(192,192,192)',
    teal: 'rgb(0,128,128)',
    white: 'rgb(255,255,255)',
    yellow: 'rgb(255,255,0)',
    orange: 'rgb(255,128,0)'
  };

  Helpers.prototype.chainOptionMap = {
    duration: 1,
    delay: 1,
    repeat: 1,
    easing: 1,
    yoyo: 1,
    onStart: 1,
    onComplete: 1,
    onCompleteChain: 1,
    onUpdate: 1,
    points: 1
  };

  Helpers.prototype.tweenOptionMap = {
    duration: 1,
    delay: 1,
    repeat: 1,
    easing: 1,
    yoyo: 1
  };

  Helpers.prototype.posPropsMap = {
    x: 1,
    y: 1,
    shiftX: 1,
    shiftY: 1,
    burstX: 1,
    burstY: 1,
    burstShiftX: 1,
    burstShiftY: 1
  };

  function Helpers() {
    this.vars();
  }

  Helpers.prototype.vars = function() {
    this.prefix = this.getPrefix();
    this.getRemBase();
    this.isFF = this.prefix.lowercase === 'moz';
    this.isIE = this.prefix.lowercase === 'ms';
    this.isOldOpera = navigator.userAgent.match(/presto/gim);
    this.div = document.createElement('div');
    return document.body.appendChild(this.div);
  };

  Helpers.prototype.extend = function(objTo, objFrom) {
    var key, value, _results;
    _results = [];
    for (key in objFrom) {
      value = objFrom[key];
      _results.push(objTo[key] != null ? objTo[key] : objTo[key] = objFrom[key]);
    }
    return _results;
  };

  Helpers.prototype.getRemBase = function() {
    var html, style;
    html = document.querySelector('html');
    style = getComputedStyle(html);
    return this.remBase = parseFloat(style.fontSize);
  };

  Helpers.prototype.setPrefixedStyle = function(el, name, value) {
    var prefixedName;
    prefixedName = "" + this.prefix.css + name;
    el.style[name] = value;
    return el.style[prefixedName] = value;
  };

  Helpers.prototype.prepareForLog = function(args) {
    args = Array.prototype.slice.apply(args);
    args.unshift('::');
    args.unshift(this.logBadgeCss);
    args.unshift('%cmo·js%c');
    return args;
  };

  Helpers.prototype.log = function() {
    return console.log.apply(console, this.prepareForLog(arguments));
  };

  Helpers.prototype.warn = function() {
    return console.warn.apply(console, this.prepareForLog(arguments));
  };

  Helpers.prototype.error = function() {
    return console.error.apply(console, this.prepareForLog(arguments));
  };

  Helpers.prototype.parseUnit = function(value) {
    var amount, regex, returnVal, unit, _ref;
    if (typeof value === 'number') {
      return returnVal = {
        unit: 'px',
        value: value,
        string: "" + value + "px"
      };
    } else if (typeof value === 'string') {
      regex = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin/gim;
      unit = ((_ref = value.match(regex)) != null ? _ref[0] : void 0) || 'px';
      amount = parseFloat(value);
      return returnVal = {
        unit: unit,
        value: amount,
        string: "" + amount + unit
      };
    }
  };

  Helpers.prototype.bind = function(func, context) {
    var bindArgs, wrapper;
    wrapper = function() {
      var args, unshiftArgs;
      args = Array.prototype.slice.call(arguments);
      unshiftArgs = bindArgs.concat(args);
      return func.apply(context, unshiftArgs);
    };
    bindArgs = Array.prototype.slice.call(arguments, 2);
    return wrapper;
  };

  Helpers.prototype.getRadialPoint = function(o) {
    var point, radAngle;
    if (o == null) {
      o = {};
    }
    if ((o.radius == null) || (o.angle == null) || (o.center == null)) {
      return;
    }
    radAngle = (o.angle - 90) * (Math.PI / 180);
    return point = {
      x: o.center.x + (Math.cos(radAngle) * o.radius),
      y: o.center.y + (Math.sin(radAngle) * o.radius)
    };
  };

  Helpers.prototype.getPrefix = function() {
    var dom, pre, styles, v;
    styles = window.getComputedStyle(document.documentElement, "");
    v = Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/);
    pre = (v || (styles.OLink === "" && ["", "o"]))[1];
    dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1];
    return {
      dom: dom,
      lowercase: pre,
      css: "-" + pre + "-",
      js: pre[0].toUpperCase() + pre.substr(1)
    };
  };

  Helpers.prototype.strToArr = function(string) {
    var arr;
    arr = [];
    if (typeof string === 'number' && !isNaN(string)) {
      arr.push(string);
      return arr;
    }
    string.trim().split(/\s+/gim).forEach(function(str) {
      var number;
      number = parseFloat(str);
      if (isNaN(number)) {
        throw Error('Fail to parse strokeDasharray/strokeDashoffset value, check the syntax please');
      }
      return arr.push(number);
    });
    return arr;
  };

  Helpers.prototype.calcArrDelta = function(arr1, arr2) {
    var delta, i, num, _i, _len;
    if ((arr1 == null) || (arr2 == null)) {
      throw Error('Two arrays should be passed');
    }
    if (!this.isArray(arr1) || !this.isArray(arr2)) {
      throw Error('Two arrays expected');
    }
    delta = [];
    for (i = _i = 0, _len = arr1.length; _i < _len; i = ++_i) {
      num = arr1[i];
      delta[i] = arr2[i] - arr1[i];
    }
    return delta;
  };

  Helpers.prototype.isArray = function(variable) {
    return variable instanceof Array;
  };

  Helpers.prototype.normDashArrays = function(arr1, arr2) {
    var arr1Len, arr2Len, i, _i, _j, _ref, _ref1;
    if ((arr1 == null) || (arr2 == null)) {
      throw Error('Two arrays should be passed');
    }
    arr1Len = arr1.length;
    arr2Len = arr2.length;
    if (arr1Len > arr2Len) {
      for (i = _i = 0, _ref = arr1Len - arr2Len; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        arr2.push(0);
      }
    } else if (arr2Len > arr1Len) {
      for (i = _j = 0, _ref1 = arr2Len - arr1Len; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        arr1.push(0);
      }
    }
    return [arr1, arr2];
  };

  Helpers.prototype.makeColorObj = function(color) {
    var alpha, b, colorObj, g, isRgb, r, regexString1, regexString2, result, rgbColor, style;
    if (color[0] === '#') {
      result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);
      colorObj = {};
      if (result) {
        r = result[1].length === 2 ? result[1] : result[1] + result[1];
        g = result[2].length === 2 ? result[2] : result[2] + result[2];
        b = result[3].length === 2 ? result[3] : result[3] + result[3];
        colorObj = {
          r: parseInt(r, 16),
          g: parseInt(g, 16),
          b: parseInt(b, 16),
          a: 1
        };
      }
    }
    if (color[0] !== '#') {
      isRgb = color[0] === 'r' && color[1] === 'g' && color[2] === 'b';
      if (isRgb) {
        rgbColor = color;
      }
      if (!isRgb) {
        rgbColor = !this.shortColors[color] ? (this.div.style.color = color, this.isFF || this.isIE || this.isOldOpera ? (style = this.computedStyle(this.div), this.computedStyle(this.div).color) : this.div.style.color) : this.shortColors[color];
      }
      regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),';
      regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$';
      result = new RegExp(regexString1 + regexString2, 'gi').exec(rgbColor);
      colorObj = {};
      alpha = parseFloat(result[4] || 1);
      if (result) {
        colorObj = {
          r: parseInt(result[1], 10),
          g: parseInt(result[2], 10),
          b: parseInt(result[3], 10),
          a: (alpha != null) && !isNaN(alpha) ? alpha : 1
        };
      }
    }
    return colorObj;
  };

  Helpers.prototype.computedStyle = function(el) {
    return getComputedStyle(el);
  };

  Helpers.prototype.splitEasing = function(string) {
    var firstPart, secondPart, split;
    if (typeof string === 'function') {
      return string;
    }
    if (typeof string === 'string' && string.length) {
      split = string.split('.');
      firstPart = this.capitalize(split[0] || 'Linear');
      secondPart = this.capitalize(split[1] || 'None');
      return [firstPart, secondPart];
    } else {
      return ['Linear', 'None'];
    }
  };

  Helpers.prototype.capitalize = function(str) {
    if (typeof str !== 'string') {
      throw Error('String expected - nothing to capitalize');
    }
    return str.charAt(0).toUpperCase() + str.substring(1);
  };

  Helpers.prototype.parseRand = function(string) {
    var rand, randArr, units;
    randArr = string.split(/rand\(|\,|\)/);
    units = this.parseUnit(randArr[2]);
    rand = this.rand(parseFloat(randArr[1]), parseFloat(randArr[2]));
    if (units.unit && randArr[2].match(units.unit)) {
      return rand + units.unit;
    } else {
      return rand;
    }
  };

  Helpers.prototype.parseIfRand = function(str) {
    if (typeof str === 'string' && str.match(/rand\(/)) {
      return this.parseRand(str);
    } else {
      return str;
    }
  };

  Helpers.prototype.parseDelta = function(key, value) {
    var delta, end, endArr, endColorObj, start, startArr, startColorObj;
    start = Object.keys(value)[0];
    end = value[start];
    delta = {
      start: start
    };
    if (isNaN(parseFloat(start)) && !start.match(/rand\(/)) {
      if (key === 'strokeLinecap') {
        this.warn("Sorry, stroke-linecap property is not animatable yet, using the start(" + start + ") value instead", value);
        return delta;
      }
      startColorObj = this.makeColorObj(start);
      endColorObj = this.makeColorObj(end);
      delta = {
        start: startColorObj,
        end: endColorObj,
        type: 'color',
        delta: {
          r: endColorObj.r - startColorObj.r,
          g: endColorObj.g - startColorObj.g,
          b: endColorObj.b - startColorObj.b,
          a: endColorObj.a - startColorObj.a
        }
      };
    } else if (key === 'strokeDasharray' || key === 'strokeDashoffset') {
      startArr = this.strToArr(start);
      endArr = this.strToArr(end);
      this.normDashArrays(startArr, endArr);
      delta = {
        start: startArr,
        end: endArr,
        delta: this.calcArrDelta(startArr, endArr),
        type: 'array'
      };
    } else {
      if (!this.chainOptionMap[key]) {
        if (this.posPropsMap[key]) {
          end = this.parseUnit(this.parseIfRand(end));
          start = this.parseUnit(this.parseIfRand(start));
          delta = {
            start: start,
            end: end,
            delta: end.value - start.value,
            type: 'unit'
          };
        } else {
          end = parseFloat(this.parseIfRand(end));
          start = parseFloat(this.parseIfRand(start));
          delta = {
            start: start,
            end: end,
            delta: end - start,
            type: 'number'
          };
        }
      }
    }
    return delta;
  };

  Helpers.prototype.rand = function(min, max) {
    return (Math.random() * (max - min)) + min;
  };

  return Helpers;

})();

h = new Helpers;


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Helpers", [], function() {
    return h;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = h;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.helpers = h;
}

},{"./vendor/tween":18}],9:[function(require,module,exports){

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
    Line.__super__.draw.apply(this, arguments);
    return this.setAttr({
      x1: this.props.x - this.props.radius,
      x2: this.props.x + this.props.radius,
      y1: this.props.y,
      y2: this.props.y
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

},{"./bit":2}],10:[function(require,module,exports){
var Burst, Swirl, Timeline, Transit, Tween, burst, eye, page, pupil;

Burst = require('./burst');

Swirl = require('./Swirl');

Timeline = require('./timeline');

Tween = require('./tween');

Transit = require('./transit');

burst = new Burst({
  type: 'polygon',
  duration: 500,
  count: 3,
  isIt: true,
  radius: {
    0: 75
  },
  points: 5,
  isSwirl: true,
  swirlFrequency: 'rand(0,10)',
  swirlSize: 'rand(0,10)'
});

document.addEventListener('click', function(e) {
  return burst.run({
    x: e.x,
    y: e.y,
    duration: 1000
  });
});

eye = document.querySelector('#js-eye');

pupil = document.querySelector('#js-pupil');

page = document.querySelector('#js-page');

},{"./Swirl":1,"./burst":4,"./timeline":14,"./transit":15,"./tween":16}],11:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Polygon, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

h = require('./h');

Polygon = (function(_super) {
  __extends(Polygon, _super);

  function Polygon() {
    return Polygon.__super__.constructor.apply(this, arguments);
  }

  Polygon.prototype.type = 'polygon';

  Polygon.prototype.draw = function() {
    this.drawShape();
    return Polygon.__super__.draw.apply(this, arguments);
  };

  Polygon.prototype.drawShape = function() {
    var d, i, point, step, _i, _j, _len, _ref, _ref1;
    step = 360 / this.props.points;
    this.radialPoints = [];
    for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      this.radialPoints.push(h.getRadialPoint({
        radius: this.props.radius,
        angle: i * step,
        center: {
          x: this.props.x,
          y: this.props.y
        }
      }));
    }
    d = '';
    _ref1 = this.radialPoints;
    for (i = _j = 0, _len = _ref1.length; _j < _len; i = ++_j) {
      point = _ref1[i];
      d += "" + (point.x.toFixed(4)) + "," + (point.y.toFixed(4)) + " ";
    }
    return this.setAttr({
      points: d
    });
  };

  return Polygon;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Polygon", [], function() {
    return Polygon;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Polygon;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Polygon = Polygon;
}

},{"./bit":2,"./h":8}],12:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Rect,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Rect = (function(_super) {
  __extends(Rect, _super);

  function Rect() {
    return Rect.__super__.constructor.apply(this, arguments);
  }

  Rect.prototype.type = 'rect';

  Rect.prototype.ratio = 1.43;

  Rect.prototype.draw = function() {
    var rad2;
    Rect.__super__.draw.apply(this, arguments);
    rad2 = 2 * this.props.radius;
    return this.setAttr({
      width: rad2,
      height: rad2,
      x: this.props.x - this.props.radius,
      y: this.props.y - this.props.radius
    });
  };

  return Rect;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Rect", [], function() {
    return Rect;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Rect;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Rect = Rect;
}

},{"./bit":2}],13:[function(require,module,exports){
module.exports=require(1)
},{"./transit":15}],14:[function(require,module,exports){
var Easing, Timeline, h;

h = require('./h');

Easing = require('./easing');

Timeline = (function() {
  Timeline.prototype.defaults = {
    duration: 600,
    delay: 0,
    repeat: 0,
    yoyo: false,
    easing: 'Linear.None',
    durationElapsed: 0,
    delayElapsed: 0,
    onStart: null,
    onComplete: null
  };

  function Timeline(o) {
    this.o = o != null ? o : {};
    this.extendDefaults();
    this.vars();
    this;
  }

  Timeline.prototype.vars = function() {
    this.h = h;
    this.props = {};
    this.progress = 0;
    return this.calcDimentions();
  };

  Timeline.prototype.calcDimentions = function() {
    var easing;
    this.props.totalTime = (this.o.repeat + 1) * (this.o.duration + this.o.delay);
    this.props.totalDuration = this.props.totalTime - this.o.delay;
    easing = h.splitEasing(this.o.easing);
    return this.props.easing = typeof easing === 'function' ? easing : Easing[easing[0]][easing[1]];
  };

  Timeline.prototype.extendDefaults = function() {
    h.extend(this.o, this.defaults);
    return this.onUpdate = this.o.onUpdate;
  };

  Timeline.prototype.start = function(time) {
    this.isCompleted = false;
    this.isStarted = false;
    this.props.startTime = (time || Date.now()) + this.o.delay;
    this.props.endTime = this.props.startTime + this.props.totalDuration;
    return this;
  };

  Timeline.prototype.update = function(time) {
    var cnt, elapsed, isFlip, start, _ref, _ref1;
    if ((time >= this.props.startTime) && (time < this.props.endTime)) {
      if (!this.isStarted) {
        if ((_ref = this.o.onStart) != null) {
          _ref.apply(this);
        }
        this.isStarted = true;
      }
      elapsed = time - this.props.startTime;
      if (elapsed <= this.o.duration) {
        this.setProc(elapsed / this.o.duration);
      } else {
        start = this.props.startTime;
        isFlip = false;
        cnt = 0;
        while (start <= time) {
          isFlip = !isFlip;
          start += isFlip ? (cnt++, this.o.duration) : this.o.delay;
        }
        if (isFlip) {
          start = start - this.o.duration;
          elapsed = time - start;
          this.setProc(elapsed / this.o.duration);
          if (this.o.yoyo && this.o.repeat) {
            this.setProc(cnt % 2 === 1 ? this.progress : 1 - (this.progress === 0 ? 1 : this.progress));
          }
        } else {
          this.setProc(0);
        }
      }
      return typeof this.onUpdate === "function" ? this.onUpdate(this.easedProgress) : void 0;
    } else {
      if (time >= this.props.endTime && !this.isCompleted) {
        if ((_ref1 = this.o.onComplete) != null) {
          _ref1.apply(this);
        }
        this.isCompleted = true;
        this.setProc(1);
        return typeof this.onUpdate === "function" ? this.onUpdate(this.easedProgress) : void 0;
      }
    }
  };

  Timeline.prototype.setProc = function(p) {
    this.progress = p;
    return this.easedProgress = this.props.easing(this.progress);
  };

  Timeline.prototype.setProp = function(obj, value) {
    var key, val;
    if (typeof obj === 'object') {
      for (key in obj) {
        val = obj[key];
        this.o[key] = val;
      }
    } else if (typeof obj === 'string') {
      this.o[obj] = value;
    }
    return this.calcDimentions();
  };

  return Timeline;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Timeline", [], function() {
    return Timeline;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Timeline;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Timeline = Timeline;
}

},{"./easing":7,"./h":8}],15:[function(require,module,exports){

/* istanbul ignore next */
var Timeline, Transit, Tween, bitsMap, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

h = require('./h');

bitsMap = require('./bitsMap');

Timeline = require('./timeline');

Tween = require('./tween');

Transit = (function(_super) {
  __extends(Transit, _super);

  function Transit() {
    return Transit.__super__.constructor.apply(this, arguments);
  }

  Transit.prototype.progress = 0;

  Transit.prototype.defaults = {
    strokeWidth: 2,
    strokeOpacity: 1,
    strokeDasharray: '',
    strokeDashoffset: '',
    stroke: '#ff00ff',
    fill: 'transparent',
    fillOpacity: 'transparent',
    strokeLinecap: '',
    points: 3,
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
    opacity: 1,
    radius: 50,
    angle: 0,
    size: null,
    sizeGap: 0,
    onStart: null,
    onComplete: null,
    onUpdate: null,
    duration: 500,
    delay: 0,
    repeat: 1,
    yoyo: false,
    easing: 'Linear.None'
  };

  Transit.prototype.vars = function() {
    if (this.h == null) {
      this.h = h;
    }
    if (this.lastSet == null) {
      this.lastSet = {};
    }
    this.extendDefaults();
    this.history = [];
    this.history.push(this.o);
    return this.timelines = [];
  };

  Transit.prototype.render = function() {
    if (!this.isRendered) {
      if (this.o.ctx == null) {
        if (this.ctx == null) {
          this.ctx = document.createElementNS(this.ns, 'svg');
          this.ctx.style.position = 'absolute';
          this.ctx.style.width = '100%';
          this.ctx.style.height = '100%';
        }
        this.createBit();
        this.calcSize();
        if (this.el == null) {
          this.el = document.createElement('div');
          this.el.appendChild(this.ctx);
          (this.o.parent || document.body).appendChild(this.el);
        }
        this.setElStyles();
      } else {
        this.ctx = this.o.ctx;
        this.createBit();
        this.calcSize();
      }
      this.isRendered = true;
    }
    this.setProgress(0, true);
    this.createTween();
    return this;
  };

  Transit.prototype.setElStyles = function() {
    var marginSize, size;
    size = "" + this.props.size + "px";
    marginSize = "" + (-this.props.size / 2) + "px";
    this.el.style.position = 'absolute';
    this.el.style.top = this.props.y;
    this.el.style.left = this.props.x;
    this.el.style.opacity = this.props.opacity;
    this.el.style.width = size;
    this.el.style.height = size;
    this.el.style['margin-left'] = marginSize;
    this.el.style['margin-top'] = marginSize;
    this.h.setPrefixedStyle(this.el, 'backface-visibility', 'hidden');
    if (this.o.isShowInit) {
      return this.show();
    } else {
      return this.hide();
    }
  };

  Transit.prototype.show = function() {
    if (this.isShown || (this.el == null)) {
      return;
    }
    this.el.style.display = 'block';
    return this.isShown = true;
  };

  Transit.prototype.hide = function() {
    if ((this.isShown === false) || (this.el == null)) {
      return;
    }
    this.el.style.display = 'none';
    return this.isShown = false;
  };

  Transit.prototype.draw = function() {
    this.bit.setProp({
      x: this.origin.x,
      y: this.origin.y,
      stroke: this.props.stroke,
      'stroke-width': this.props.strokeWidth,
      'stroke-opacity': this.props.strokeOpacity,
      'stroke-dasharray': this.props.strokeDasharray,
      'stroke-dashoffset': this.props.strokeDashoffset,
      'stroke-linecap': this.props.strokeLinecap,
      fill: this.props.fill,
      'fill-opacity': this.props.fillOpacity,
      radius: this.props.radius,
      points: this.props.points,
      transform: this.calcTransform()
    });
    this.bit.draw();
    return this.drawEl();
  };

  Transit.prototype.drawEl = function() {
    if (this.el == null) {
      return;
    }
    this.isPropChanged('x') && (this.el.style.left = this.props.x);
    this.isPropChanged('y') && (this.el.style.top = this.props.y);
    this.isPropChanged('opacity') && (this.el.style.opacity = this.props.opacity);
    if (this.isNeedsTransform()) {
      return this.h.setPrefixedStyle(this.el, 'transform', this.fillTransform());
    }
  };

  Transit.prototype.fillTransform = function() {
    return "translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
  };

  Transit.prototype.isNeedsTransform = function() {
    return this.isPropChanged('shiftX') || this.isPropChanged('shiftY');
  };

  Transit.prototype.isPropChanged = function(name) {
    var _base;
    if ((_base = this.lastSet)[name] == null) {
      _base[name] = {};
    }
    return this.lastSet[name].isChanged = this.lastSet[name].value !== this.props[name] ? (this.lastSet[name].value = this.props[name], true) : false;
  };

  Transit.prototype.calcTransform = function() {
    return this.props.transform = "rotate(" + this.props.angle + "," + this.origin.x + "," + this.origin.y + ")";
  };

  Transit.prototype.calcSize = function() {
    var dRadius, dStroke, radius, stroke;
    if (this.o.size) {
      return;
    }
    dRadius = this.deltas['radius'];
    dStroke = this.deltas['strokeWidth'];
    radius = dRadius != null ? Math.max(Math.abs(dRadius.start), Math.abs(dRadius.end)) : this.props.radius;
    stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this.props.strokeWidth;
    this.props.size = 2 * radius + 2 * stroke;
    this.props.size *= this.bit.ratio;
    this.props.size += 2 * this.props.sizeGap;
    return this.props.center = this.props.size / 2;
  };

  Transit.prototype.createBit = function() {
    var bitClass;
    bitClass = bitsMap.getBit(this.o.type || this.type);
    return this.bit = new bitClass({
      ctx: this.ctx,
      isDrawLess: true
    });
  };

  Transit.prototype.setProgress = function(progress, isShow) {
    var _ref;
    if (!isShow) {
      this.show();
      if (typeof this.onUpdate === "function") {
        this.onUpdate(progress);
      }
    }
    this.progress = progress < 0 || !progress ? 0 : progress > 1 ? 1 : progress;
    this.calcCurrentProps(progress);
    this.calcOrigin();
    this.draw(progress);
    if (progress === 1) {
      if ((_ref = this.props.onComplete) != null) {
        _ref.call(this);
      }
    }
    return this;
  };

  Transit.prototype.calcCurrentProps = function(progress) {
    var a, b, g, i, key, keys, len, num, r, str, units, value, _results;
    keys = Object.keys(this.deltas);
    len = keys.length;
    _results = [];
    while (len--) {
      key = keys[len];
      value = this.deltas[key];
      _results.push(this.props[key] = (function() {
        var _i, _len, _ref;
        switch (value.type) {
          case 'array':
            str = '';
            _ref = value.delta;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              num = _ref[i];
              str += "" + (value.start[i] + num * this.progress) + " ";
            }
            return str;
          case 'number':
            return value.start + value.delta * progress;
          case 'unit':
            units = value.end.unit;
            return "" + (value.start.value + value.delta * progress) + units;
          case 'color':
            r = parseInt(value.start.r + value.delta.r * progress, 10);
            g = parseInt(value.start.g + value.delta.g * progress, 10);
            b = parseInt(value.start.b + value.delta.b * progress, 10);
            a = parseInt(value.start.a + value.delta.a * progress, 10);
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }
      }).call(this));
    }
    return _results;
  };

  Transit.prototype.calcOrigin = function() {
    return this.origin = this.o.ctx ? {
      x: parseFloat(this.props.x),
      y: parseFloat(this.props.y)
    } : {
      x: this.props.center,
      y: this.props.center
    };
  };

  Transit.prototype.extendDefaults = function(o) {
    var defaultsValue, delta, fromObject, isObject, key, optionsValue, _ref, _ref1;
    if (this.props == null) {
      this.props = {};
    }
    fromObject = o || this.defaults;
    (o == null) && (this.deltas = {});
    for (key in fromObject) {
      defaultsValue = fromObject[key];
      if ((_ref = this.skipProps) != null ? _ref[key] : void 0) {
        continue;
      }
      if (o) {
        this.o[key] = defaultsValue;
        optionsValue = defaultsValue;
        delete this.deltas[key];
      } else {
        optionsValue = this.o[key] != null ? this.o[key] : defaultsValue;
      }
      isObject = (optionsValue != null) && (typeof optionsValue === 'object');
      if (!isObject || this.h.isArray(optionsValue)) {
        if (typeof optionsValue === 'string' && optionsValue.match(/rand/)) {
          optionsValue = this.h.parseRand(optionsValue);
        }
        this.props[key] = optionsValue;
        if (this.h.posPropsMap[key]) {
          this.props[key] = this.h.parseUnit(this.props[key]).string;
        }
        continue;
      }
      if ((key === 'x' || key === 'y') && !this.o.ctx) {
        this.h.warn('Consider to animate shiftX/shiftY properties instead of x/y, as it would be much more performant', optionsValue);
      }
      if ((_ref1 = this.skipPropsDelta) != null ? _ref1[key] : void 0) {
        continue;
      }
      delta = this.h.parseDelta(key, optionsValue);
      if (delta.type != null) {
        this.deltas[key] = delta;
      }
      this.props[key] = delta.start;
    }
    return this.onUpdate = this.props.onUpdate;
  };

  Transit.prototype.mergeThenOptions = function(start, end) {
    var endKey, i, key, keys, o, startKey, startKeys;
    o = {};
    this.h.extend(o, start);
    keys = Object.keys(end);
    i = keys.length;
    while (i--) {
      key = keys[i];
      endKey = end[key];
      if (this.h.tweenOptionMap[key] || typeof endKey === 'object') {
        o[key] = endKey || start[key];
        continue;
      }
      startKey = start[key];
      if (typeof startKey === 'object') {
        startKeys = Object.keys(startKey);
        startKey = startKey[startKeys[0]];
      }
      if (endKey != null) {
        o[key] = {};
        o[key][startKey] = endKey;
      } else {
        o[key] = startKey;
      }
    }
    return o;
  };

  Transit.prototype.then = function(o) {
    var i, keys, merged, opts;
    merged = this.mergeThenOptions(this.o, o);
    this.history.push(merged);
    keys = Object.keys(this.h.tweenOptionMap);
    i = keys.length;
    opts = {};
    while (i--) {
      opts[keys[i]] = (o != null ? o[keys[i]] : void 0) || this.props[keys[i]];
    }
    return this.tween.add(new Timeline(opts));
  };

  Transit.prototype.createTween = function() {
    var it, onComplete;
    it = this;
    onComplete = this.props.onComplete ? this.h.bind(this.props.onComplete, this) : null;
    this.timeline = new Timeline({
      duration: this.props.duration,
      delay: this.props.delay,
      repeat: this.props.repeat - 1,
      yoyo: this.props.yoyo,
      easing: this.props.easing,
      onUpdate: (function(_this) {
        return function(p) {
          return _this.setProgress(p);
        };
      })(this),
      onComplete: (function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
        };
      })(this),
      onStart: (function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
        };
      })(this)
    });
    if (!this.o.isTweenLess) {
      this.tween = new Tween;
      this.tween.add(this.timeline);
    }
    return !this.o.isRunLess && this.startTween();
  };

  Transit.prototype.run = function(o) {
    this.tuneNewOption(o);
    this.history[0] = this.o;
    !this.o.isDrawLess && this.setProgress(0, true);
    return this.startTween();
  };

  Transit.prototype.tuneNewOption = function(o, isForeign) {
    if ((o != null) && (o.type != null) && o.type !== (this.o.type || this.type)) {
      this.h.warn('Sorry, type can not be changed on run');
      delete o.type;
    }
    if ((o != null) && Object.keys(o).length) {
      this.extendDefaults(o);
      this.resetTimeline();
      !isForeign && this.tween.recalcDuration();
      this.calcSize();
      return !isForeign && this.setElStyles();
    }
  };

  Transit.prototype.startTween = function() {
    var _ref;
    return (_ref = this.tween) != null ? _ref.start() : void 0;
  };

  Transit.prototype.resetTimeline = function() {
    var i, key, timelineOptions, _i, _len, _ref;
    timelineOptions = {};
    _ref = Object.keys(this.h.tweenOptionMap);
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      key = _ref[i];
      timelineOptions[key] = this.props[key];
    }
    timelineOptions.onStart = this.props.onStart;
    timelineOptions.onComplete = this.props.onComplete;
    return this.timeline.setProp(timelineOptions);
  };

  return Transit;

})(bitsMap.map.bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Transit", [], function() {
    return Transit;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Transit;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Transit = Transit;
}

},{"./bitsMap":3,"./h":8,"./timeline":14,"./tween":16}],16:[function(require,module,exports){
var Tween, h, t;

h = require('./h');

t = require('./tweener');

Tween = (function() {
  function Tween(o) {
    this.o = o != null ? o : {};
    this.vars();
    this;
  }

  Tween.prototype.vars = function() {
    this.timelines = [];
    this.duration = 0;
    this.props = {};
    this.loop = h.bind(this.loop, this);
    return this.onUpdate = this.o.onUpdate;
  };

  Tween.prototype.add = function(timeline) {
    this.timelines.push(timeline);
    return this.duration = Math.max(timeline.props.totalTime, this.duration);
  };

  Tween.prototype.remove = function(timeline) {
    var index;
    index = this.timelines.indexOf(timeline);
    if (index !== -1) {
      return this.timelines.splice(index, 1);
    }
  };

  Tween.prototype.append = function(timeline) {
    var i;
    if (!h.isArray(timeline)) {
      this.appendTimeline(timeline);
      return this.duration = Math.max(timeline.props.totalTime, this.duration);
    } else {
      i = timeline.length;
      while (i--) {
        this.appendTimeline(timeline[i]);
      }
      return this.recalcDuration();
    }
  };

  Tween.prototype.appendTimeline = function(timeline) {
    timeline.setProp({
      delay: timeline.o.delay + this.duration
    });
    return this.timelines.push(timeline);
  };

  Tween.prototype.recalcDuration = function() {
    var len, timeline, _results;
    len = this.timelines.length;
    this.duration = 0;
    _results = [];
    while (len--) {
      timeline = this.timelines[len];
      _results.push(this.duration = Math.max(timeline.props.totalTime, this.duration));
    }
    return _results;
  };

  Tween.prototype.update = function(time) {
    var i, _ref;
    if (this.isCompleted) {
      return;
    }
    i = this.timelines.length;
    while (i--) {
      this.timelines[i].update(time);
    }
    if (time >= this.endTime) {
      if ((_ref = this.o.onComplete) != null) {
        _ref.apply(this);
      }
      if (typeof this.onUpdate === "function") {
        this.onUpdate(1);
      }
      return this.isCompleted = true;
    }
    if (time >= this.startTime) {
      return typeof this.onUpdate === "function" ? this.onUpdate((time - this.startTime) / this.duration) : void 0;
    }
  };

  Tween.prototype.start = function() {
    var i, _ref;
    this.isCompleted = false;
    this.getDimentions();
    i = this.timelines.length;
    if ((_ref = this.o.onStart) != null) {
      _ref.apply(this);
    }
    while (i--) {
      this.timelines[i].start(this.startTime);
    }
    t.add(this);
    return this;
  };

  Tween.prototype.stop = function() {
    t.remove(this);
    return this;
  };

  Tween.prototype.getDimentions = function() {
    this.startTime = Date.now();
    return this.endTime = this.startTime + this.duration;
  };

  return Tween;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Tween", [], function() {
    return Tween;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Tween;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Tween = Tween;
}

},{"./h":8,"./tweener":17}],17:[function(require,module,exports){
var Tweener, h, t;

h = require('./h');


/* istanbul ignore next */

(function() {
  var k, lastTime, vendors, x;
  lastTime = 0;
  x = 0;
  vendors = ["ms", "moz", "webkit", "o"];
  while (x < vendors.length && !window.requestAnimationFrame) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    k = window[vendors[x] + "CancelRequestAnimationFrame"];
    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || k;
    ++x;
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime, id, timeToCall;
      currTime = new Date().getTime();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();

Tweener = (function() {
  function Tweener() {
    this.vars();
    this;
  }

  Tweener.prototype.vars = function() {
    this.tweens = [];
    return this.loop = h.bind(this.loop, this);
  };

  Tweener.prototype.loop = function() {
    var time;
    if (!this.isRunning) {
      return;
    }
    time = Date.now();
    this.update(time);
    if (!this.tweens.length) {
      return this.isRunning = false;
    }
    requestAnimationFrame(this.loop);
    return this;
  };

  Tweener.prototype.startLoop = function() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    return requestAnimationFrame(this.loop);
  };

  Tweener.prototype.stopLoop = function() {
    return this.isRunning = false;
  };

  Tweener.prototype.update = function(time) {
    var i, _results;
    i = this.tweens.length;
    _results = [];
    while (i--) {
      if (this.tweens[i].update(time) === true) {
        _results.push(this.remove(this.tweens[i]));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Tweener.prototype.add = function(tween) {
    this.tweens.push(tween);
    return this.startLoop();
  };

  Tweener.prototype.remove = function(tween) {
    var index;
    index = this.tweens.indexOf(tween);
    if (index !== -1) {
      return this.tweens.splice(index, 1);
    }
  };

  return Tweener;

})();

t = new Tweener;


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("tweener", [], function() {
    return t;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = t;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.tweener = t;
}

},{"./h":8}],18:[function(require,module,exports){
/* istanbul ignore next */
;(function(undefined){
	
	/* istanbul ignore next */
	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());
	

	/**
	 * Tween.js - Licensed under the MIT license
	 * https://github.com/sole/tween.js
	 * ----------------------------------------------
	 *
	 * See https://github.com/sole/tween.js/graphs/contributors for the full list of contributors.
	 * Thank you all, you're awesome!
	 */

	// Date.now shim for (ahem) Internet Explo(d|r)er
	if ( Date.now === undefined ) {

		Date.now = function () {

			return new Date().valueOf();

		};

	}

	var TWEEN = TWEEN || ( function () {

		var _tweens = [];

		return {

			REVISION: '14',

			getAll: function () {

				return _tweens;

			},

			removeAll: function () {

				_tweens = [];

			},

			add: function ( tween ) {

				_tweens.push( tween );

			},

			remove: function ( tween ) {

				var i = _tweens.indexOf( tween );

				if ( i !== -1 ) {

					_tweens.splice( i, 1 );

				}

			},

			update: function ( time ) {

				if ( _tweens.length === 0 ) return false;

				var i = 0;

				time = time !== undefined ? time : ( typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now() );

				while ( i < _tweens.length ) {

					if ( _tweens[ i ].update( time ) ) {

						i++;

					} else {

						_tweens.splice( i, 1 );

					}

				}

				return true;

			}
		};

	} )();

	TWEEN.Tween = function ( object ) {

		var _object = object;
		var _valuesStart = {};
		var _valuesEnd = {};
		var _valuesStartRepeat = {};
		var _duration = 1000;
		var _repeat = 0;
		var _yoyo = false;
		var _isPlaying = false;
		var _reversed = false;
		var _delayTime = 0;
		var _startTime = null;
		var _easingFunction = TWEEN.Easing.Linear.None;
		var _interpolationFunction = TWEEN.Interpolation.Linear;
		var _chainedTweens = [];
		var _onStartCallback = null;
		var _onStartCallbackFired = false;
		var _onUpdateCallback = null;
		var _onCompleteCallback = null;
		var _onStopCallback = null;

		// Set all starting values present on the target object
		for ( var field in object ) {

			_valuesStart[ field ] = parseFloat(object[field], 10);

		}

		this.to = function ( properties, duration ) {

			if ( duration !== undefined ) {

				_duration = duration;

			}

			_valuesEnd = properties;

			return this;

		};

		this.start = function ( time ) {
						
			if (_isPlaying && !(this.progress === 1)) { TWEEN.remove( this ); }

			TWEEN.add( this );

			_isPlaying = true;

			_onStartCallbackFired = false;

			_startTime = time !== undefined ? time : ( typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now() );
			_startTime += _delayTime;

			for ( var property in _valuesEnd ) {

				// check if an Array was provided as property value
				if ( _valuesEnd[ property ] instanceof Array ) {

					if ( _valuesEnd[ property ].length === 0 ) {

						continue;

					}

					// create a local copy of the Array with the start value at the front
					_valuesEnd[ property ] = [ _object[ property ] ].concat( _valuesEnd[ property ] );

				}

				_valuesStart[ property ] = _object[ property ];

				if( ( _valuesStart[ property ] instanceof Array ) === false ) {
					_valuesStart[ property ] *= 1.0; // Ensures we're using numbers, not strings
					// set progress value to 0
					_valuesStart[ 'p' ] = 0;
				}

				_valuesStartRepeat[ property ] = _valuesStart[ property ] || 0;

			}

			return this;

		};

		this.stop = function () {

			if ( !_isPlaying ) {
				return this;
			}

			TWEEN.remove( this );
			_isPlaying = false;

			if ( _onStopCallback !== null ) {

				_onStopCallback.call( _object );

			}

			this.stopChainedTweens();
			return this;

		};

		this.stopChainedTweens = function () {

			for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {

				_chainedTweens[ i ].stop();

			}

		};

		this.delay = function ( amount ) {

			_delayTime = amount;
			return this;

		};

		this.repeat = function ( times ) {
			_repeat = times;
			return this;

		};

		this.yoyo = function( yoyo ) {

			_yoyo = yoyo;
			return this;

		};


		this.easing = function ( easing ) {

			_easingFunction = easing;
			return this;

		};

		this.interpolation = function ( interpolation ) {

			_interpolationFunction = interpolation;
			return this;

		};

		this.chain = function () {

			_chainedTweens = arguments;
			return this;

		};

		this.onStart = function ( callback ) {

			_onStartCallback = callback;
			return this;

		};

		this.onUpdate = function ( callback ) {

			_onUpdateCallback = callback;
			return this;

		};

		this.onComplete = function ( callback ) {
			_onCompleteCallback = callback;
			return this;

		};

		this.onStop = function ( callback ) {

			_onStopCallback = callback;
			return this;

		};

		this.update = function ( time ) {

			var property;

			if ( time < _startTime ) {

				return true;

			}

			if ( _onStartCallbackFired === false ) {

				if ( _onStartCallback !== null ) {

					_onStartCallback.call( _object );

				}

				_onStartCallbackFired = true;

			}

			var elapsed = ( time - _startTime ) / _duration;
			elapsed = elapsed > 1 ? 1 : elapsed;

			var value = _easingFunction( elapsed );

			for ( property in _valuesEnd ) {

				var start = _valuesStart[ property ] || 0;
				var end = _valuesEnd[ property ];

				if ( end instanceof Array ) {

					_object[ property ] = _interpolationFunction( end, value );

				} else {

					// Parses relative end values with start as base (e.g.: +10, -3)
					if ( typeof(end) === "string" ) {
						end = start + parseFloat(end, 10);
					}

					// protect against non numeric properties.
					if ( typeof(end) === "number" ) {
						_object[ property ] = start + ( end - start ) * value;
					}

				}

			}

			if ( _onUpdateCallback !== null ) {
				this.progress = _object.p;
				_onUpdateCallback.call( _object, value );
			}

			if ( elapsed == 1 ) {

				if ( _repeat > 0 ) {

					if( isFinite( _repeat ) ) {
						_repeat--;
					}

					// reassign starting values, restart by making startTime = now
					for( property in _valuesStartRepeat ) {

						if ( typeof( _valuesEnd[ property ] ) === "string" ) {
							_valuesStartRepeat[ property ] = _valuesStartRepeat[ property ] + parseFloat(_valuesEnd[ property ], 10);
						}

						if (_yoyo) {
							var tmp = _valuesStartRepeat[ property ];
							_valuesStartRepeat[ property ] = _valuesEnd[ property ];
							_valuesEnd[ property ] = tmp;
						}

						_valuesStart[ property ] = _valuesStartRepeat[ property ];
					}

					if (_yoyo) {
						_reversed = !_reversed;
					}

					_startTime = time + _delayTime;

					return true;

				} else {
					// this.progress = 1;
					// console.log('complete');
					if ( _onCompleteCallback !== null ) {
						_onCompleteCallback.call( _object );
					}

					for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {

						_chainedTweens[ i ].start( time );

					}

					return false;

				}

			}

			return true;

		};

	};


	TWEEN.Easing = {

		Linear: {

			None: function ( k ) {

				return k;

			}

		},

		Quadratic: {

			In: function ( k ) {

				return k * k;

			},

			Out: function ( k ) {

				return k * ( 2 - k );

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
				return - 0.5 * ( --k * ( k - 2 ) - 1 );

			}

		},

		Cubic: {

			In: function ( k ) {

				return k * k * k;

			},

			Out: function ( k ) {

				return --k * k * k + 1;

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
				return 0.5 * ( ( k -= 2 ) * k * k + 2 );

			}

		},

		Quartic: {

			In: function ( k ) {

				return k * k * k * k;

			},

			Out: function ( k ) {

				return 1 - ( --k * k * k * k );

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
				return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

			}

		},

		Quintic: {

			In: function ( k ) {

				return k * k * k * k * k;

			},

			Out: function ( k ) {

				return --k * k * k * k * k + 1;

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
				return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

			}

		},

		Sinusoidal: {

			In: function ( k ) {

				return 1 - Math.cos( k * Math.PI / 2 );

			},

			Out: function ( k ) {

				return Math.sin( k * Math.PI / 2 );

			},

			InOut: function ( k ) {

				return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

			}

		},

		Exponential: {

			In: function ( k ) {

				return k === 0 ? 0 : Math.pow( 1024, k - 1 );

			},

			Out: function ( k ) {

				return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

			},

			InOut: function ( k ) {

				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
				return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

			}

		},

		Circular: {

			In: function ( k ) {

				return 1 - Math.sqrt( 1 - k * k );

			},

			Out: function ( k ) {

				return Math.sqrt( 1 - ( --k * k ) );

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
				return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

			}

		},

		Elastic: {

			In: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

			},

			Out: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

			},

			InOut: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
				return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

			}

		},

		Back: {

			In: function ( k ) {

				var s = 1.70158;
				return k * k * ( ( s + 1 ) * k - s );

			},

			Out: function ( k ) {

				var s = 1.70158;
				return --k * k * ( ( s + 1 ) * k + s ) + 1;

			},

			InOut: function ( k ) {

				var s = 1.70158 * 1.525;
				if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
				return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

			}

		},

		Bounce: {

			In: function ( k ) {

				return 1 - TWEEN.Easing.Bounce.Out( 1 - k );

			},

			Out: function ( k ) {

				if ( k < ( 1 / 2.75 ) ) {

					return 7.5625 * k * k;

				} else if ( k < ( 2 / 2.75 ) ) {

					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

				} else if ( k < ( 2.5 / 2.75 ) ) {

					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

				} else {

					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

				}

			},

			InOut: function ( k ) {

				if ( k < 0.5 ) return TWEEN.Easing.Bounce.In( k * 2 ) * 0.5;
				return TWEEN.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

			}

		}

	};

	TWEEN.Interpolation = {

		Linear: function ( v, k ) {

			var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.Linear;

			if ( k < 0 ) return fn( v[ 0 ], v[ 1 ], f );
			if ( k > 1 ) return fn( v[ m ], v[ m - 1 ], m - f );

			return fn( v[ i ], v[ i + 1 > m ? m : i + 1 ], f - i );

		},

		Bezier: function ( v, k ) {

			var b = 0, n = v.length - 1, pw = Math.pow, bn = TWEEN.Interpolation.Utils.Bernstein, i;

			for ( i = 0; i <= n; i++ ) {
				b += pw( 1 - k, n - i ) * pw( k, i ) * v[ i ] * bn( n, i );
			}

			return b;

		},

		CatmullRom: function ( v, k ) {

			var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.CatmullRom;

			if ( v[ 0 ] === v[ m ] ) {

				if ( k < 0 ) i = Math.floor( f = m * ( 1 + k ) );

				return fn( v[ ( i - 1 + m ) % m ], v[ i ], v[ ( i + 1 ) % m ], v[ ( i + 2 ) % m ], f - i );

			} else {

				if ( k < 0 ) return v[ 0 ] - ( fn( v[ 0 ], v[ 0 ], v[ 1 ], v[ 1 ], -f ) - v[ 0 ] );
				if ( k > 1 ) return v[ m ] - ( fn( v[ m ], v[ m ], v[ m - 1 ], v[ m - 1 ], f - m ) - v[ m ] );

				return fn( v[ i ? i - 1 : 0 ], v[ i ], v[ m < i + 1 ? m : i + 1 ], v[ m < i + 2 ? m : i + 2 ], f - i );

			}

		},

		Utils: {

			Linear: function ( p0, p1, t ) {

				return ( p1 - p0 ) * t + p0;

			},

			Bernstein: function ( n , i ) {

				var fc = TWEEN.Interpolation.Utils.Factorial;
				return fc( n ) / fc( i ) / fc( n - i );

			},

			Factorial: ( function () {

				var a = [ 1 ];

				return function ( n ) {

					var s = 1, i;
					if ( a[ n ] ) return a[ n ];
					for ( i = n; i > 1; i-- ) s *= i;
					return a[ n ] = s;

				};

			} )(),

			CatmullRom: function ( p0, p1, p2, p3, t ) {

				var v0 = ( p2 - p0 ) * 0.5, v1 = ( p3 - p1 ) * 0.5, t2 = t * t, t3 = t * t2;
				return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

			}

		}

	};

	if ((typeof define === "function") && define.amd) {
		define("TWEEN", [], function() { return TWEEN; });
	}
	if ((typeof module === "object") && (typeof module.exports === "object")){
		module.exports = TWEEN;
	}
	
	if (typeof window !== "undefined" && window !== null) {
		if (window.mojs == null) { window.mojs = {}; }
	}
	if (typeof window !== "undefined" && window !== null) {
		window.mojs.TWEEN = TWEEN;
	}

})()


},{}]},{},[10])