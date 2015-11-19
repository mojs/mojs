(function() {
  var Helpers, h;

  Helpers = (function() {
    Helpers.prototype.NS = 'http://www.w3.org/2000/svg';

    Helpers.prototype.logBadgeCss = 'background:#3A0839;color:#FF512F;border-radius:5px; padding: 1px 5px 2px; border: 1px solid #FF512F;';

    Helpers.prototype.shortColors = {
      transparent: 'rgba(0,0,0,0)',
      none: 'rgba(0,0,0,0)',
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

    Helpers.prototype.callbacksMap = {
      onStart: 1,
      onComplete: 1,
      onCompleteChain: 1,
      onUpdate: 1
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

    Helpers.prototype.strokeDashPropsMap = {
      strokeDasharray: 1,
      strokeDashoffset: 1
    };

    Helpers.prototype.RAD_TO_DEG = 180 / Math.PI;

    function Helpers() {
      this.vars();
    }

    Helpers.prototype.vars = function() {
      var ua;
      this.prefix = this.getPrefix();
      this.getRemBase();
      this.isFF = this.prefix.lowercase === 'moz';
      this.isIE = this.prefix.lowercase === 'ms';
      ua = navigator.userAgent;
      this.isOldOpera = ua.match(/presto/gim);
      this.isSafari = ua.indexOf('Safari') > -1;
      this.isChrome = ua.indexOf('Chrome') > -1;
      this.isOpera = ua.toLowerCase().indexOf("op") > -1;
      this.isChrome && this.isSafari && (this.isSafari = false);
      (ua.match(/PhantomJS/gim)) && (this.isSafari = false);
      this.isChrome && this.isOpera && (this.isChrome = false);
      this.is3d = this.checkIf3d();
      this.uniqIDs = -1;
      this.div = document.createElement('div');
      return document.body.appendChild(this.div);
    };

    Helpers.prototype.cloneObj = function(obj, exclude) {
      var i, key, keys, newObj;
      keys = Object.keys(obj);
      newObj = {};
      i = keys.length;
      while (i--) {
        key = keys[i];
        if (exclude != null) {
          if (!exclude[key]) {
            newObj[key] = obj[key];
          }
        } else {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    };

    Helpers.prototype.extend = function(objTo, objFrom) {
      var key, value;
      for (key in objFrom) {
        value = objFrom[key];
        if (objTo[key] == null) {
          objTo[key] = objFrom[key];
        }
      }
      return objTo;
    };

    Helpers.prototype.getRemBase = function() {
      var html, style;
      html = document.querySelector('html');
      style = getComputedStyle(html);
      return this.remBase = parseFloat(style.fontSize);
    };

    Helpers.prototype.clamp = function(value, min, max) {
      if (value < min) {
        return min;
      } else if (value > max) {
        return max;
      } else {
        return value;
      }
    };

    Helpers.prototype.setPrefixedStyle = function(el, name, value, isIt) {
      if (name.match(/transform/gim)) {
        el.style["" + name] = value;
        return el.style["" + this.prefix.css + name] = value;
      } else {
        return el.style[name] = value;
      }
    };

    Helpers.prototype.style = function(el, name, value) {
      var key, keys, len, _results;
      if (typeof name === 'object') {
        keys = Object.keys(name);
        len = keys.length;
        _results = [];
        while (len--) {
          key = keys[len];
          value = name[key];
          _results.push(this.setPrefixedStyle(el, key, value));
        }
        return _results;
      } else {
        return this.setPrefixedStyle(el, name, value);
      }
    };

    Helpers.prototype.prepareForLog = function(args) {
      args = Array.prototype.slice.apply(args);
      args.unshift('::');
      args.unshift(this.logBadgeCss);
      args.unshift('%cmo·js%c');
      return args;
    };

    Helpers.prototype.log = function() {
      if (mojs.isDebug === false) {
        return;
      }
      return console.log.apply(console, this.prepareForLog(arguments));
    };

    Helpers.prototype.warn = function() {
      if (mojs.isDebug === false) {
        return;
      }
      return console.warn.apply(console, this.prepareForLog(arguments));
    };

    Helpers.prototype.error = function() {
      if (mojs.isDebug === false) {
        return;
      }
      return console.error.apply(console, this.prepareForLog(arguments));
    };

    Helpers.prototype.parseUnit = function(value) {
      var amount, isStrict, regex, returnVal, unit, _ref;
      if (typeof value === 'number') {
        return returnVal = {
          unit: 'px',
          isStrict: false,
          value: value,
          string: "" + value + "px"
        };
      } else if (typeof value === 'string') {
        regex = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin/gim;
        unit = (_ref = value.match(regex)) != null ? _ref[0] : void 0;
        isStrict = true;
        if (!unit) {
          unit = 'px';
          isStrict = false;
        }
        amount = parseFloat(value);
        return returnVal = {
          unit: unit,
          isStrict: isStrict,
          value: amount,
          string: "" + amount + unit
        };
      }
      return value;
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
      var point, radAngle, radiusX, radiusY;
      if (o == null) {
        o = {};
      }
      if ((o.radius == null) || (o.angle == null) || (o.center == null)) {
        return;
      }
      radAngle = (o.angle - 90) * (Math.PI / 180);
      radiusX = o.radiusX != null ? o.radiusX : o.radius;
      radiusY = o.radiusY != null ? o.radiusY : o.radius;
      return point = {
        x: o.center.x + (Math.cos(radAngle) * radiusX),
        y: o.center.y + (Math.sin(radAngle) * radiusY)
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
        arr.push(this.parseUnit(string));
        return arr;
      }
      string.trim().split(/\s+/gim).forEach((function(_this) {
        return function(str) {
          return arr.push(_this.parseUnit(_this.parseIfRand(str)));
        };
      })(this));
      return arr;
    };

    Helpers.prototype.calcArrDelta = function(arr1, arr2) {
      var delta, i, num, _i, _len;
      delta = [];
      for (i = _i = 0, _len = arr1.length; _i < _len; i = ++_i) {
        num = arr1[i];
        delta[i] = this.parseUnit("" + (arr2[i].value - arr1[i].value) + arr2[i].unit);
      }
      return delta;
    };

    Helpers.prototype.isArray = function(variable) {
      return variable instanceof Array;
    };

    Helpers.prototype.normDashArrays = function(arr1, arr2) {
      var arr1Len, arr2Len, currItem, i, lenDiff, startI, _i, _j;
      arr1Len = arr1.length;
      arr2Len = arr2.length;
      if (arr1Len > arr2Len) {
        lenDiff = arr1Len - arr2Len;
        startI = arr2.length;
        for (i = _i = 0; 0 <= lenDiff ? _i < lenDiff : _i > lenDiff; i = 0 <= lenDiff ? ++_i : --_i) {
          currItem = i + startI;
          arr2.push(this.parseUnit("0" + arr1[currItem].unit));
        }
      } else if (arr2Len > arr1Len) {
        lenDiff = arr2Len - arr1Len;
        startI = arr1.length;
        for (i = _j = 0; 0 <= lenDiff ? _j < lenDiff : _j > lenDiff; i = 0 <= lenDiff ? ++_j : --_j) {
          currItem = i + startI;
          arr1.push(this.parseUnit("0" + arr2[currItem].unit));
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
          rgbColor = !this.shortColors[color] ? (this.div.style.color = color, this.computedStyle(this.div).color) : this.shortColors[color];
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

    Helpers.prototype.parseStagger = function(string, index) {
      var base, number, splittedValue, unit, unitValue, value;
      value = string.split(/stagger\(|\)$/)[1].toLowerCase();
      splittedValue = value.split(/(rand\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/gim);
      value = splittedValue.length > 3 ? (base = this.parseUnit(this.parseIfRand(splittedValue[1])), splittedValue[3]) : (base = this.parseUnit(0), splittedValue[1]);
      value = this.parseIfRand(value);
      unitValue = this.parseUnit(value);
      number = index * unitValue.value + base.value;
      unit = base.isStrict ? base.unit : unitValue.isStrict ? unitValue.unit : '';
      if (unit) {
        return "" + number + unit;
      } else {
        return number;
      }
    };

    Helpers.prototype.parseIfStagger = function(value, i) {
      if (!(typeof value === 'string' && value.match(/stagger/g))) {
        return value;
      } else {
        return this.parseStagger(value, i);
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
      var delta, end, endArr, endColorObj, i, start, startArr, startColorObj, _i, _len;
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
        for (i = _i = 0, _len = startArr.length; _i < _len; i = ++_i) {
          start = startArr[i];
          end = endArr[i];
          this.mergeUnits(start, end, key);
        }
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
            this.mergeUnits(start, end, key);
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

    Helpers.prototype.mergeUnits = function(start, end, key) {
      if (!end.isStrict && start.isStrict) {
        end.unit = start.unit;
        return end.string = "" + end.value + end.unit;
      } else if (end.isStrict && !start.isStrict) {
        start.unit = end.unit;
        return start.string = "" + start.value + start.unit;
      } else if (end.isStrict && start.isStrict) {
        if (end.unit !== start.unit) {
          start.unit = end.unit;
          start.string = "" + start.value + start.unit;
          return this.warn("Two different units were specified on \"" + key + "\" delta property, mo · js will fallback to end \"" + end.unit + "\" unit ");
        }
      }
    };

    Helpers.prototype.rand = function(min, max) {
      return (Math.random() * (max - min)) + min;
    };

    Helpers.prototype.isDOM = function(o) {
      var isNode;
      if (o == null) {
        return false;
      }
      isNode = typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
      return typeof o === 'object' && isNode;
    };

    Helpers.prototype.getChildElements = function(element) {
      var childNodes, children, i;
      childNodes = element.childNodes;
      children = [];
      i = childNodes.length;
      while (i--) {
        if (childNodes[i].nodeType === 1) {
          children.unshift(childNodes[i]);
        }
      }
      return children;
    };

    Helpers.prototype.delta = function(start, end) {
      var isType1, isType2, obj, type1, type2;
      type1 = typeof start;
      type2 = typeof end;
      isType1 = type1 === 'string' || type1 === 'number' && !isNaN(start);
      isType2 = type2 === 'string' || type2 === 'number' && !isNaN(end);
      if (!isType1 || !isType2) {
        this.error("delta method expects Strings or Numbers at input but got - " + start + ", " + end);
        return;
      }
      obj = {};
      obj[start] = end;
      return obj;
    };

    Helpers.prototype.getUniqID = function() {
      return ++this.uniqIDs;
    };

    Helpers.prototype.parsePath = function(path) {
      var domPath;
      if (typeof path === 'string') {
        if (path.charAt(0).toLowerCase() === 'm') {
          domPath = document.createElementNS(this.NS, 'path');
          domPath.setAttributeNS(null, 'd', path);
          return domPath;
        } else {
          return document.querySelector(path);
        }
      }
      if (path.style) {
        return path;
      }
    };

    Helpers.prototype.closeEnough = function(num1, num2, eps) {
      return Math.abs(num1 - num2) < eps;
    };

    Helpers.prototype.checkIf3d = function() {
      var div, prefixed, style, tr;
      div = document.createElement('div');
      this.style(div, 'transform', 'translateZ(0)');
      style = div.style;
      prefixed = "" + this.prefix.css + "transform";
      tr = style[prefixed] != null ? style[prefixed] : style.transform;
      return tr !== '';
    };

    return Helpers;

  })();

  h = new Helpers;

  module.exports = h;

}).call(this);
