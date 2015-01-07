(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    return this.calcTransform();
  };

  Bit.prototype.calcTransform = function() {
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



},{"./h":5}],2:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Byte, Circle, Line, Rect, elsMap, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Line = require('./line');

Circle = require('./circle');

Rect = require('./rect');

h = require('./h');

elsMap = {
  circle: Circle,
  line: Line,
  rect: Rect
};

Byte = (function(_super) {
  __extends(Byte, _super);

  function Byte() {
    return Byte.__super__.constructor.apply(this, arguments);
  }

  Byte.prototype.progress = 0;

  Byte.prototype.defaults = {
    radius: 50,
    strokeWidth: 2,
    stroke: '#ff00ff',
    fill: 'transparent',
    duration: 500,
    delay: 0,
    x: 0,
    y: 0,
    deg: 0,
    size: null
  };

  Byte.prototype.vars = function() {
    this.extendDefaults();
    this.calcTransform();
    return this.calcSize();
  };

  Byte.prototype.render = function() {
    var bitClass, size;
    if (this.o.ctx == null) {
      this.el = document.createElement('div');
      size = "" + (this.props.size / 16) + "rem";
      this.el.style.position = 'absolute';
      this.el.style.width = size;
      this.el.style.height = size;
      this.el.style['backface-visibility'] = 'hidden';
      this.el.style["" + h.prefix.css + "backface-visibility"] = 'hidden';
      this.ctx = document.createElementNS(this.ns, 'svg');
      this.ctx.style.position = 'absolute';
      this.ctx.style.width = '100%';
      this.ctx.style.height = '100%';
      this.el.appendChild(this.ctx);
      (this.o.parent || document.body).appendChild(this.el);
    } else {
      this.ctx = this.o.ctx;
    }
    bitClass = elsMap[this.o.type || this.type];
    this.bit = new bitClass({
      ctx: this.ctx,
      isDrawLess: true
    });
    return !this.o.isDrawLess && this.draw();
  };

  Byte.prototype.setProgress = function(progress) {
    var key, value, _ref;
    this.progress = progress < 0 || !progress ? 0 : progress > 1 ? 1 : progress;
    _ref = this.deltas;
    for (key in _ref) {
      value = _ref[key];
      this.props[key] = value.start + value.delta * this.progress;
    }
    return this.draw();
  };

  Byte.prototype.draw = function() {
    this.bit.setProp({
      x: this.props.center,
      y: this.props.center,
      stroke: this.props.stroke,
      strokeWidth: this.props.strokeWidth,
      strokeDasharray: this.props.strokeDasharray,
      strokeDashoffset: this.props.strokeDasharray,
      fill: this.props.fill,
      radius: this.props.radius,
      deg: this.props.deg
    });
    return this.bit.draw();
  };

  Byte.prototype.calcSize = function() {
    var dRadius, dStroke, radius, stroke;
    if ((this.o.size != null) || this.o.ctx) {
      return;
    }
    dRadius = this.deltas['radius'];
    dStroke = this.deltas['strokeWidth'];
    radius = dRadius != null ? Math.max(Math.abs(dRadius.start), Math.abs(dRadius.end)) : this.props.radius;
    stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this.props.strokeWidth;
    this.props.size = 2 * radius + stroke;
    return this.props.center = this.props.size / 2;
  };

  Byte.prototype.extendDefaults = function() {
    var defaultsValue, end, key, optionsValue, start, _ref, _results;
    if (this.props == null) {
      this.props = {};
    }
    if (this.deltas == null) {
      this.deltas = {};
    }
    _ref = this.defaults;
    _results = [];
    for (key in _ref) {
      defaultsValue = _ref[key];
      optionsValue = this.o[key];
      if (optionsValue && typeof optionsValue === 'object') {
        start = Object.keys(optionsValue);
        end = parseFloat(optionsValue[start]);
        start = parseFloat(start);
        this.deltas[key] = {
          start: start,
          end: end,
          delta: end - start
        };
        _results.push(this.props[key] = start);
      } else {
        _results.push(this.props[key] = this.o[key] || defaultsValue);
      }
    }
    return _results;
  };

  return Byte;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Byte", [], function() {
    return Byte;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Byte;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Byte = Byte;
}



},{"./bit":1,"./circle":3,"./h":5,"./line":6,"./rect":8}],3:[function(require,module,exports){

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



},{"./bit":1}],4:[function(require,module,exports){

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



},{"./bit":1}],5:[function(require,module,exports){
var Helpers;

Helpers = (function() {
  function Helpers() {
    this.vars();
  }

  Helpers.prototype.vars = function() {
    return this.prefix = this.getPrefix();
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

  return Helpers;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Helpers", [], function() {
    return new Helpers;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = new Helpers;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.helpers = new Helpers;
}



},{}],6:[function(require,module,exports){

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



},{"./bit":1}],7:[function(require,module,exports){
var Bit, Byte, Circle, Cross, Line, Rect, Triangle, div, rect, svg;

Cross = require('./cross');

Circle = require('./circle');

Triangle = require('./triangle');

Rect = require('./rect');

Line = require('./line');

Bit = require('./bit');

Byte = require('./byte');

svg = document.getElementById('js-svg');

div = document.getElementById('js-div');

rect = new Byte({
  x: 100,
  y: 100,
  deg: 45,
  radius: {
    75: 5
  },
  strokeWidth: {
    0: 10
  },
  type: 'rect'
});

setTimeout(function() {
  var i;
  i = 0;
  return setInterval(function() {
    rect.setProgress(i++ / 10);
    return rect.draw();
  }, 16);
}, 5000);



},{"./bit":1,"./byte":2,"./circle":3,"./cross":4,"./line":6,"./rect":8,"./triangle":9}],8:[function(require,module,exports){

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



},{"./bit":1}],9:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Triangle, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

h = require('./h');

Triangle = (function(_super) {
  __extends(Triangle, _super);

  function Triangle() {
    return Triangle.__super__.constructor.apply(this, arguments);
  }

  Triangle.prototype.type = 'path';

  Triangle.prototype.draw = function() {
    var cnt, d, i, len, nextI, point, points, space, step, _i, _j, _len;
    cnt = 3;
    step = 360 / cnt;
    points = [];
    for (i = _i = 0; 0 <= cnt ? _i < cnt : _i > cnt; i = 0 <= cnt ? ++_i : --_i) {
      points.push(h.getRadialPoint({
        radius: this.props.radius,
        angle: i * step,
        center: {
          x: this.props.x,
          y: this.props.y
        }
      }));
    }
    d = '';
    len = points.length - 1;
    for (i = _j = 0, _len = points.length; _j < _len; i = ++_j) {
      point = points[i];
      nextI = i < len ? i + 1 : 0;
      space = i === 0 ? '' : ' ';
      d += "" + space + "M" + points[i].x + ", " + points[i].y + " L" + points[nextI].x + ", " + points[nextI].y;
    }
    this.setAttr({
      d: d
    });
    return Triangle.__super__.draw.apply(this, arguments);
  };

  return Triangle;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Triangle", [], function() {
    return Triangle;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Triangle;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Triangle = Triangle;
}



},{"./bit":1,"./h":5}]},{},[7])