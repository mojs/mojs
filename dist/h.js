var Helpers, TWEEN;

TWEEN = require('./vendor/tween');

Helpers = (function() {
  Helpers.prototype.div = document.createElement('div');

  Helpers.prototype.TWEEN = TWEEN;

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

  Helpers.prototype.tweenOptionMap = {
    duration: 1,
    delay: 1,
    repeat: 1,
    easing: 1,
    yoyo: 1,
    onStart: 1,
    onComplete: 1,
    onUpdate: 1
  };

  function Helpers() {
    this.vars();
  }

  Helpers.prototype.vars = function() {
    this.prefix = this.getPrefix();
    this.isFF = this.prefix.lowercase === 'moz';
    this.isIE = this.prefix.lowercase === 'ms';
    return this.animationLoop = this.bind(this.animationLoop, this);
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
    var alpha, b, colorObj, g, isRgb, r, regexString1, regexString2, result, rgbColor;
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
        rgbColor = !this.shortColors[color] ? (this.div.style.color = color, this.isFF || this.isIE ? this.computedStyle(this.div).color : this.div.style.color) : this.shortColors[color];
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

  Helpers.prototype.startAnimationLoop = function() {
    if (this.isAnimateLoop) {
      return this;
    }
    this.isAnimateLoop = true;
    requestAnimationFrame(this.animationLoop);
    return this;
  };

  Helpers.prototype.stopAnimationLoop = function() {
    return this.isAnimateLoop = false;
  };

  Helpers.prototype.animationLoop = function() {
    if (!this.TWEEN.getAll().length) {
      this.isAnimateLoop = false;
    }
    if (!this.isAnimateLoop) {
      return this;
    }
    this.TWEEN.update();
    requestAnimationFrame(this.animationLoop);
    return this;
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
