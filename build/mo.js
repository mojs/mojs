/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Swirl, Transit,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Transit = __webpack_require__(13);

	Swirl = (function(superClass) {
	  extend(Swirl, superClass);

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
	    var angle, base, x, y;
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
	    if ((base = this.o).radiusScale == null) {
	      base.radiusScale = 1;
	    }
	    this.props.angleShift = this.h.parseIfRand(this.o.angleShift || 0);
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
	    angle = this.positionDelta.angle;
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
	    var base, base1;
	    this.props.signRand = Math.round(this.h.rand(0, 1)) ? -1 : 1;
	    if ((base = this.o).swirlSize == null) {
	      base.swirlSize = 10;
	    }
	    if ((base1 = this.o).swirlFrequency == null) {
	      base1.swirlFrequency = 3;
	    }
	    this.props.swirlSize = this.h.parseIfRand(this.o.swirlSize);
	    return this.props.swirlFrequency = this.h.parseIfRand(this.o.swirlFrequency);
	  };

	  Swirl.prototype.getSwirl = function(progress) {
	    return this.props.signRand * this.props.swirlSize * Math.sin(this.props.swirlFrequency * progress);
	  };

	  return Swirl;

	})(Transit);

	module.exports = Swirl;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	    var key, keys, len, results;
	    if (typeof name === 'object') {
	      keys = Object.keys(name);
	      len = keys.length;
	      results = [];
	      while (len--) {
	        key = keys[len];
	        value = name[key];
	        results.push(this.setPrefixedStyle(el, key, value));
	      }
	      return results;
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
	    var amount, isStrict, ref, regex, returnVal, unit;
	    if (typeof value === 'number') {
	      return returnVal = {
	        unit: 'px',
	        isStrict: false,
	        value: value,
	        string: value + "px"
	      };
	    } else if (typeof value === 'string') {
	      regex = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin/gim;
	      unit = (ref = value.match(regex)) != null ? ref[0] : void 0;
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
	    var delta, i, j, len1, num;
	    delta = [];
	    for (i = j = 0, len1 = arr1.length; j < len1; i = ++j) {
	      num = arr1[i];
	      delta[i] = this.parseUnit("" + (arr2[i].value - arr1[i].value) + arr2[i].unit);
	    }
	    return delta;
	  };

	  Helpers.prototype.isArray = function(variable) {
	    return variable instanceof Array;
	  };

	  Helpers.prototype.normDashArrays = function(arr1, arr2) {
	    var arr1Len, arr2Len, currItem, i, j, k, lenDiff, ref, ref1, startI;
	    arr1Len = arr1.length;
	    arr2Len = arr2.length;
	    if (arr1Len > arr2Len) {
	      lenDiff = arr1Len - arr2Len;
	      startI = arr2.length;
	      for (i = j = 0, ref = lenDiff; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	        currItem = i + startI;
	        arr2.push(this.parseUnit("0" + arr1[currItem].unit));
	      }
	    } else if (arr2Len > arr1Len) {
	      lenDiff = arr2Len - arr1Len;
	      startI = arr1.length;
	      for (i = k = 0, ref1 = lenDiff; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
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
	    var delta, end, endArr, endColorObj, i, j, len1, start, startArr, startColorObj;
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
	      for (i = j = 0, len1 = startArr.length; j < len1; i = ++j) {
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
	    prefixed = this.prefix.css + "transform";
	    tr = style[prefixed] != null ? style[prefixed] : style.transform;
	    return tr !== '';
	  };

	  return Helpers;

	})();

	h = new Helpers;

	module.exports = h;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Bit, h;

	h = __webpack_require__(2);

	Bit = (function() {
	  Bit.prototype.ns = 'http://www.w3.org/2000/svg';

	  Bit.prototype.type = 'line';

	  Bit.prototype.ratio = 1;

	  Bit.prototype.defaults = {
	    radius: 50,
	    radiusX: void 0,
	    radiusY: void 0,
	    points: 3,
	    x: 0,
	    y: 0,
	    angle: 0,
	    'stroke': 'hotpink',
	    'stroke-width': 2,
	    'stroke-opacity': 1,
	    'fill': 'transparent',
	    'fill-opacity': 1,
	    'stroke-dasharray': '',
	    'stroke-dashoffset': '',
	    'stroke-linecap': ''
	  };

	  function Bit(o) {
	    this.o = o != null ? o : {};
	    this.init();
	    this;
	  }

	  Bit.prototype.init = function() {
	    this.vars();
	    this.render();
	    return this;
	  };

	  Bit.prototype.vars = function() {
	    if (this.o.ctx && this.o.ctx.tagName === 'svg') {
	      this.ctx = this.o.ctx;
	    } else if (!this.o.el) {
	      h.error('You should pass a real context(ctx) to the bit');
	    }
	    this.state = {};
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
	    var key, ref, results, value;
	    if (this.props == null) {
	      this.props = {};
	    }
	    ref = this.defaults;
	    results = [];
	    for (key in ref) {
	      value = ref[key];
	      results.push(this.props[key] = this.o[key] != null ? this.o[key] : value);
	    }
	    return results;
	  };

	  Bit.prototype.setAttr = function(attr, value) {
	    var el, key, keys, len, results, val;
	    if (typeof attr === 'object') {
	      keys = Object.keys(attr);
	      len = keys.length;
	      el = value || this.el;
	      results = [];
	      while (len--) {
	        key = keys[len];
	        val = attr[key];
	        results.push(el.setAttribute(key, val));
	      }
	      return results;
	    } else {
	      return this.el.setAttribute(attr, value);
	    }
	  };

	  Bit.prototype.setProp = function(attr, value) {
	    var key, results, val;
	    if (typeof attr === 'object') {
	      results = [];
	      for (key in attr) {
	        val = attr[key];
	        results.push(this.props[key] = val);
	      }
	      return results;
	    } else {
	      return this.props[attr] = value;
	    }
	  };

	  Bit.prototype.render = function() {
	    this.isRendered = true;
	    if (this.o.el != null) {
	      this.el = this.o.el;
	      return this.isForeign = true;
	    } else {
	      this.el = document.createElementNS(this.ns, this.type || 'line');
	      !this.o.isDrawLess && this.draw();
	      return this.ctx.appendChild(this.el);
	    }
	  };

	  Bit.prototype.drawMap = ['stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill', 'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform'];

	  Bit.prototype.draw = function() {
	    var len, name;
	    this.props.length = this.getLength();
	    len = this.drawMapLength;
	    while (len--) {
	      name = this.drawMap[len];
	      switch (name) {
	        case 'stroke-dasharray':
	        case 'stroke-dashoffset':
	          this.castStrokeDash(name);
	      }
	      this.setAttrsIfChanged(name, this.props[name]);
	    }
	    return this.state.radius = this.props.radius;
	  };

	  Bit.prototype.castStrokeDash = function(name) {
	    var cast, dash, i, j, len1, ref, stroke;
	    if (h.isArray(this.props[name])) {
	      stroke = '';
	      ref = this.props[name];
	      for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	        dash = ref[i];
	        cast = dash.unit === '%' ? this.castPercent(dash.value) : dash.value;
	        stroke += cast + " ";
	      }
	      this.props[name] = stroke === '0 ' ? stroke = '' : stroke;
	      return this.props[name] = stroke;
	    }
	    if (typeof this.props[name] === 'object') {
	      stroke = this.props[name].unit === '%' ? this.castPercent(this.props[name].value) : this.props[name].value;
	      return this.props[name] = stroke === 0 ? stroke = '' : stroke;
	    }
	  };

	  Bit.prototype.castPercent = function(percent) {
	    return percent * (this.props.length / 100);
	  };

	  Bit.prototype.setAttrsIfChanged = function(name, value) {
	    var key, keys, len, results;
	    if (typeof name === 'object') {
	      keys = Object.keys(name);
	      len = keys.length;
	      results = [];
	      while (len--) {
	        key = keys[len];
	        value = name[key];
	        results.push(this.setAttrIfChanged(key, value));
	      }
	      return results;
	    } else {
	      if (value == null) {
	        value = this.props[name];
	      }
	      return this.setAttrIfChanged(name, value);
	    }
	  };

	  Bit.prototype.setAttrIfChanged = function(name, value) {
	    if (this.isChanged(name, value)) {
	      this.el.setAttribute(name, value);
	      return this.state[name] = value;
	    }
	  };

	  Bit.prototype.isChanged = function(name, value) {
	    if (value == null) {
	      value = this.props[name];
	    }
	    return this.state[name] !== value;
	  };

	  Bit.prototype.getLength = function() {
	    var ref;
	    if ((((ref = this.el) != null ? ref.getTotalLength : void 0) != null) && this.el.getAttribute('d')) {
	      return this.el.getTotalLength();
	    } else {
	      return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
	    }
	  };

	  return Bit;

	})();

	module.exports = Bit;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Bit, BitsMap, Circle, Cross, Equal, Line, Polygon, Rect, Zigzag, h;

	Bit = __webpack_require__(3);

	Circle = __webpack_require__(5);

	Line = __webpack_require__(7);

	Zigzag = __webpack_require__(11);

	Rect = __webpack_require__(8);

	Polygon = __webpack_require__(9);

	Cross = __webpack_require__(6);

	Equal = __webpack_require__(10);

	h = __webpack_require__(2);

	BitsMap = (function() {
	  function BitsMap() {}

	  BitsMap.prototype.h = h;

	  BitsMap.prototype.map = {
	    bit: Bit,
	    circle: Circle,
	    line: Line,
	    zigzag: Zigzag,
	    rect: Rect,
	    polygon: Polygon,
	    cross: Cross,
	    equal: Equal
	  };

	  BitsMap.prototype.getBit = function(name) {
	    return this.map[name] || this.h.error("no \"" + name + "\" shape available yet, please choose from this list:", this.map);
	  };

	  return BitsMap;

	})();

	module.exports = new BitsMap;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Circle,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(3);

	Circle = (function(superClass) {
	  extend(Circle, superClass);

	  function Circle() {
	    return Circle.__super__.constructor.apply(this, arguments);
	  }

	  Circle.prototype.type = 'ellipse';

	  Circle.prototype.draw = function() {
	    var rx, ry;
	    rx = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    ry = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    this.setAttrsIfChanged({
	      rx: rx,
	      ry: ry,
	      cx: this.props.x,
	      cy: this.props.y
	    });
	    return Circle.__super__.draw.apply(this, arguments);
	  };

	  Circle.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * Math.PI * Math.sqrt((Math.pow(radiusX, 2) + Math.pow(radiusY, 2)) / 2);
	  };

	  return Circle;

	})(Bit);

	module.exports = Circle;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Cross,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(3);

	Cross = (function(superClass) {
	  extend(Cross, superClass);

	  function Cross() {
	    return Cross.__super__.constructor.apply(this, arguments);
	  }

	  Cross.prototype.type = 'path';

	  Cross.prototype.draw = function() {
	    var d, line1, line2, radiusX, radiusY, x1, x2, y1, y2;
	    Cross.__super__.draw.apply(this, arguments);
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    x1 = this.props.x - radiusX;
	    x2 = this.props.x + radiusX;
	    line1 = "M" + x1 + "," + this.props.y + " L" + x2 + "," + this.props.y;
	    y1 = this.props.y - radiusY;
	    y2 = this.props.y + radiusY;
	    line2 = "M" + this.props.x + "," + y1 + " L" + this.props.x + "," + y2;
	    d = line1 + " " + line2;
	    return this.setAttr({
	      d: d
	    });
	  };

	  Cross.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * (radiusX + radiusY);
	  };

	  return Cross;

	})(Bit);

	module.exports = Cross;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Line,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(3);

	Line = (function(superClass) {
	  extend(Line, superClass);

	  function Line() {
	    return Line.__super__.constructor.apply(this, arguments);
	  }

	  Line.prototype.draw = function() {
	    var radiusX;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    this.setAttrsIfChanged({
	      x1: this.props.x - radiusX,
	      x2: this.props.x + radiusX,
	      y1: this.props.y,
	      y2: this.props.y
	    });
	    return Line.__super__.draw.apply(this, arguments);
	  };

	  return Line;

	})(Bit);

	module.exports = Line;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Rect,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(3);

	Rect = (function(superClass) {
	  extend(Rect, superClass);

	  function Rect() {
	    return Rect.__super__.constructor.apply(this, arguments);
	  }

	  Rect.prototype.type = 'rect';

	  Rect.prototype.ratio = 1.43;

	  Rect.prototype.draw = function() {
	    var radiusX, radiusY;
	    Rect.__super__.draw.apply(this, arguments);
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return this.setAttrsIfChanged({
	      width: 2 * radiusX,
	      height: 2 * radiusY,
	      x: this.props.x - radiusX,
	      y: this.props.y - radiusY
	    });
	  };

	  Rect.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * radiusX + 2 * radiusY;
	  };

	  return Rect;

	})(Bit);

	module.exports = Rect;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Polygon, h,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(3);

	h = __webpack_require__(2);

	Polygon = (function(superClass) {
	  extend(Polygon, superClass);

	  function Polygon() {
	    return Polygon.__super__.constructor.apply(this, arguments);
	  }

	  Polygon.prototype.type = 'path';

	  Polygon.prototype.draw = function() {
	    this.drawShape();
	    return Polygon.__super__.draw.apply(this, arguments);
	  };

	  Polygon.prototype.drawShape = function() {
	    var char, d, i, j, k, len, point, ref, ref1, step;
	    step = 360 / this.props.points;
	    this.radialPoints = [];
	    for (i = j = 0, ref = this.props.points; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      this.radialPoints.push(h.getRadialPoint({
	        radius: this.props.radius,
	        radiusX: this.props.radiusX,
	        radiusY: this.props.radiusY,
	        angle: i * step,
	        center: {
	          x: this.props.x,
	          y: this.props.y
	        }
	      }));
	    }
	    d = '';
	    ref1 = this.radialPoints;
	    for (i = k = 0, len = ref1.length; k < len; i = ++k) {
	      point = ref1[i];
	      char = i === 0 ? 'M' : 'L';
	      d += "" + char + (point.x.toFixed(4)) + "," + (point.y.toFixed(4)) + " ";
	    }
	    return this.setAttr({
	      d: d += 'z'
	    });
	  };

	  Polygon.prototype.getLength = function() {
	    return this.el.getTotalLength();
	  };

	  return Polygon;

	})(Bit);

	module.exports = Polygon;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Equal,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(3);

	Equal = (function(superClass) {
	  extend(Equal, superClass);

	  function Equal() {
	    return Equal.__super__.constructor.apply(this, arguments);
	  }

	  Equal.prototype.type = 'path';

	  Equal.prototype.ratio = 1.43;

	  Equal.prototype.draw = function() {
	    var d, i, j, radiusX, radiusY, ref, x1, x2, y, yStart, yStep;
	    Equal.__super__.draw.apply(this, arguments);
	    if (!this.props.points) {
	      return;
	    }
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    x1 = this.props.x - radiusX;
	    x2 = this.props.x + radiusX;
	    d = '';
	    yStep = 2 * radiusY / (this.props.points - 1);
	    yStart = this.props.y - radiusY;
	    for (i = j = 0, ref = this.props.points; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      y = "" + (i * yStep + yStart);
	      d += "M" + x1 + ", " + y + " L" + x2 + ", " + y + " ";
	    }
	    return this.setAttr({
	      d: d
	    });
	  };

	  Equal.prototype.getLength = function() {
	    return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
	  };

	  return Equal;

	})(Bit);

	module.exports = Equal;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Zigzag,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(3);

	Zigzag = (function(superClass) {
	  extend(Zigzag, superClass);

	  function Zigzag() {
	    return Zigzag.__super__.constructor.apply(this, arguments);
	  }

	  Zigzag.prototype.type = 'path';

	  Zigzag.prototype.ratio = 1.43;

	  Zigzag.prototype.draw = function() {
	    var char, i, iX, iX2, iY, iY2, j, points, radiusX, radiusY, ref, stepX, stepY, strokeWidth, xStart, yStart;
	    if (!this.props.points) {
	      return;
	    }
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    points = '';
	    stepX = 2 * radiusX / this.props.points;
	    stepY = 2 * radiusY / this.props.points;
	    strokeWidth = this.props['stroke-width'];
	    xStart = this.props.x - radiusX;
	    yStart = this.props.y - radiusY;
	    for (i = j = ref = this.props.points; ref <= 0 ? j < 0 : j > 0; i = ref <= 0 ? ++j : --j) {
	      iX = xStart + i * stepX + strokeWidth;
	      iY = yStart + i * stepY + strokeWidth;
	      iX2 = xStart + (i - 1) * stepX + strokeWidth;
	      iY2 = yStart + (i - 1) * stepY + strokeWidth;
	      char = i === this.props.points ? 'M' : 'L';
	      points += "" + char + iX + "," + iY + " l0, -" + stepY + " l-" + stepX + ", 0";
	    }
	    this.setAttr({
	      d: points
	    });
	    return Zigzag.__super__.draw.apply(this, arguments);
	  };

	  return Zigzag;

	})(Bit);

	module.exports = Zigzag;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Burst, Swirl, Transit, bitsMap, h,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	bitsMap = __webpack_require__(4);

	Transit = __webpack_require__(13);

	Swirl = __webpack_require__(1);

	h = __webpack_require__(2);

	Burst = (function(superClass) {
	  extend(Burst, superClass);

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
	    easing: 'Linear.None',
	    radius: {
	      25: 75
	    },
	    radiusX: void 0,
	    radiusY: void 0,
	    angle: 0,
	    size: null,
	    sizeGap: 0,
	    duration: 600,
	    delay: 0,
	    onStart: null,
	    onComplete: null,
	    onCompleteChain: null,
	    onUpdate: null,
	    isResetAngles: false
	  };

	  Burst.prototype.childDefaults = {
	    radius: {
	      7: 0
	    },
	    radiusX: void 0,
	    radiusY: void 0,
	    angle: 0,
	    opacity: 1,
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
	    radiusX: 1,
	    radiusY: 1,
	    angle: 1,
	    opacity: 1,
	    onStart: 1,
	    onComplete: 1,
	    onUpdate: 1
	  };

	  Burst.prototype.run = function(o) {
	    var base, i, j, key, keys, len, len1, option, ref, ref1, tr;
	    if ((o != null) && Object.keys(o).length) {
	      if (o.count || ((ref = o.childOptions) != null ? ref.count : void 0)) {
	        this.h.warn('Sorry, count can not be changed on run');
	      }
	      this.extendDefaults(o);
	      keys = Object.keys(o.childOptions || {});
	      if ((base = this.o).childOptions == null) {
	        base.childOptions = {};
	      }
	      for (i = j = 0, len1 = keys.length; j < len1; i = ++j) {
	        key = keys[i];
	        this.o.childOptions[key] = o.childOptions[key];
	      }
	      len = this.transits.length;
	      while (len--) {
	        option = this.getOption(len);
	        if ((((ref1 = o.childOptions) != null ? ref1.angle : void 0) == null) && (o.angleShift == null)) {
	          option.angle = this.transits[len].o.angle;
	        } else if (!o.isResetAngles) {
	          option.angle = this.getBitAngle(option.angle, len);
	        }
	        this.transits[len].tuneNewOption(option, true);
	      }
	      this.timeline.recalcDuration();
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
	    var i, j, option, ref, results;
	    this.transits = [];
	    results = [];
	    for (i = j = 0, ref = this.props.count; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      option = this.getOption(i);
	      option.ctx = this.ctx;
	      option.index = i;
	      option.isDrawLess = option.isRunLess = option.isTweenLess = true;
	      this.props.randomAngle && (option.angleShift = this.generateRandomAngle());
	      this.props.randomRadius && (option.radiusScale = this.generateRandomRadius());
	      results.push(this.transits.push(new Swirl(option)));
	    }
	    return results;
	  };

	  Burst.prototype.addBitOptions = function() {
	    var aShift, i, j, len1, pointEnd, pointStart, points, ref, results, step, transit;
	    points = this.props.count;
	    this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
	    step = this.props.degree / this.degreeCnt;
	    ref = this.transits;
	    results = [];
	    for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	      transit = ref[i];
	      aShift = transit.props.angleShift || 0;
	      pointStart = this.getSidePoint('start', i * step + aShift);
	      pointEnd = this.getSidePoint('end', i * step + aShift);
	      transit.o.x = this.getDeltaFromPoints('x', pointStart, pointEnd);
	      transit.o.y = this.getDeltaFromPoints('y', pointStart, pointEnd);
	      if (!this.props.isResetAngles) {
	        transit.o.angle = this.getBitAngle(transit.o.angle, i);
	      }
	      results.push(transit.extendDefaults());
	    }
	    return results;
	  };

	  Burst.prototype.getBitAngle = function(angle, i) {
	    var angleAddition, angleShift, curAngleShift, degCnt, delta, end, keys, newEnd, newStart, points, start, step;
	    points = this.props.count;
	    degCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
	    step = this.props.degree / degCnt;
	    angleAddition = i * step + 90;
	    angleShift = this.transits[i].props.angleShift || 0;
	    angle = typeof angle !== 'object' ? angle + angleAddition + angleShift : (keys = Object.keys(angle), start = keys[0], end = angle[start], curAngleShift = angleAddition + angleShift, newStart = parseFloat(start) + curAngleShift, newEnd = parseFloat(end) + curAngleShift, delta = {}, delta[newStart] = newEnd, delta);
	    return angle;
	  };

	  Burst.prototype.getSidePoint = function(side, angle) {
	    var pointStart, sideRadius;
	    sideRadius = this.getSideRadius(side);
	    return pointStart = this.h.getRadialPoint({
	      radius: sideRadius.radius,
	      radiusX: sideRadius.radiusX,
	      radiusY: sideRadius.radiusY,
	      angle: angle,
	      center: {
	        x: this.props.center,
	        y: this.props.center
	      }
	    });
	  };

	  Burst.prototype.getSideRadius = function(side) {
	    return {
	      radius: this.getRadiusByKey('radius', side),
	      radiusX: this.getRadiusByKey('radiusX', side),
	      radiusY: this.getRadiusByKey('radiusY', side)
	    };
	  };

	  Burst.prototype.getRadiusByKey = function(key, side) {
	    if (this.deltas[key] != null) {
	      return this.deltas[key][side];
	    } else if (this.props[key] != null) {
	      return this.props[key];
	    }
	  };

	  Burst.prototype.getDeltaFromPoints = function(key, pointStart, pointEnd) {
	    var delta;
	    delta = {};
	    if (pointStart[key] === pointEnd[key]) {
	      return delta = pointStart[key];
	    } else {
	      delta[pointStart[key]] = pointEnd[key];
	      return delta;
	    }
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
	    var i, results;
	    Burst.__super__.createTween.apply(this, arguments);
	    i = this.transits.length;
	    results = [];
	    while (i--) {
	      results.push(this.timeline.add(this.transits[i].tween));
	    }
	    return results;
	  };

	  Burst.prototype.calcSize = function() {
	    var i, j, largestSize, len1, radius, ref, transit;
	    largestSize = -1;
	    ref = this.transits;
	    for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	      transit = ref[i];
	      transit.calcSize();
	      if (largestSize < transit.props.size) {
	        largestSize = transit.props.size;
	      }
	    }
	    radius = this.calcMaxRadius();
	    this.props.size = largestSize + 2 * radius;
	    this.props.size += 2 * this.props.sizeGap;
	    this.props.center = this.props.size / 2;
	    return this.addBitOptions();
	  };

	  Burst.prototype.getOption = function(i) {
	    var key, keys, len, option;
	    option = {};
	    keys = Object.keys(this.childDefaults);
	    len = keys.length;
	    while (len--) {
	      key = keys[len];
	      option[key] = this.getPropByMod({
	        key: key,
	        i: i,
	        from: this.o.childOptions
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
	    var prop, ref;
	    prop = (ref = o.from || this.o.childOptions) != null ? ref[o.key] : void 0;
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

	  Burst.prototype.then = function(o) {
	    this.h.error("Burst's \"then\" method is under consideration, you can vote for it in github repo issues");
	    return this;
	  };

	  return Burst;

	})(Transit);

	module.exports = Burst;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Timeline, Transit, Tween, bitsMap, h,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	h = __webpack_require__(2);

	bitsMap = __webpack_require__(4);

	Tween = __webpack_require__(19);

	Timeline = __webpack_require__(20);

	Transit = (function(superClass) {
	  extend(Transit, superClass);

	  function Transit() {
	    return Transit.__super__.constructor.apply(this, arguments);
	  }

	  Transit.prototype.progress = 0;

	  Transit.prototype.defaults = {
	    strokeWidth: 2,
	    strokeOpacity: 1,
	    strokeDasharray: 0,
	    strokeDashoffset: 0,
	    stroke: 'transparent',
	    fill: 'deeppink',
	    fillOpacity: 'transparent',
	    strokeLinecap: '',
	    points: 3,
	    x: 0,
	    y: 0,
	    shiftX: 0,
	    shiftY: 0,
	    opacity: 1,
	    radius: {
	      0: 50
	    },
	    radiusX: void 0,
	    radiusY: void 0,
	    angle: 0,
	    size: null,
	    sizeGap: 0,
	    onStart: null,
	    onComplete: null,
	    onUpdate: null,
	    duration: 500,
	    delay: 0,
	    repeat: 0,
	    yoyo: false,
	    easing: 'Linear.None'
	  };

	  Transit.prototype.vars = function() {
	    var o;
	    if (this.h == null) {
	      this.h = h;
	    }
	    if (this.lastSet == null) {
	      this.lastSet = {};
	    }
	    this.index = this.o.index || 0;
	    if (this.runCount == null) {
	      this.runCount = 0;
	    }
	    this.extendDefaults();
	    o = this.h.cloneObj(this.o);
	    this.h.extend(o, this.defaults);
	    this.history = [o];
	    this.isForeign = !!this.o.ctx;
	    this.isForeignBit = !!this.o.bit;
	    return this.timelines = [];
	  };

	  Transit.prototype.render = function() {
	    if (!this.isRendered) {
	      if (!this.isForeign && !this.isForeignBit) {
	        this.ctx = document.createElementNS(this.ns, 'svg');
	        this.ctx.style.position = 'absolute';
	        this.ctx.style.width = '100%';
	        this.ctx.style.height = '100%';
	        this.createBit();
	        this.calcSize();
	        this.el = document.createElement('div');
	        this.el.appendChild(this.ctx);
	        (this.o.parent || document.body).appendChild(this.el);
	      } else {
	        this.ctx = this.o.ctx;
	        this.createBit();
	        this.calcSize();
	      }
	      this.isRendered = true;
	    }
	    this.setElStyles();
	    this.setProgress(0, true);
	    this.createTween();
	    return this;
	  };

	  Transit.prototype.setElStyles = function() {
	    var marginSize, ref, size;
	    if (!this.isForeign) {
	      size = this.props.size + "px";
	      marginSize = (-this.props.size / 2) + "px";
	      this.el.style.position = 'absolute';
	      this.el.style.top = this.props.y;
	      this.el.style.left = this.props.x;
	      this.el.style.width = size;
	      this.el.style.height = size;
	      this.el.style['margin-left'] = marginSize;
	      this.el.style['margin-top'] = marginSize;
	      this.el.style['marginLeft'] = marginSize;
	      this.el.style['marginTop'] = marginSize;
	    }
	    if ((ref = this.el) != null) {
	      ref.style.opacity = this.props.opacity;
	    }
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
	      radiusX: this.props.radiusX,
	      radiusY: this.props.radiusY,
	      points: this.props.points,
	      transform: this.calcTransform()
	    });
	    this.bit.draw();
	    return this.drawEl();
	  };

	  Transit.prototype.drawEl = function() {
	    if (this.el == null) {
	      return true;
	    }
	    this.isPropChanged('opacity') && (this.el.style.opacity = this.props.opacity);
	    if (!this.isForeign) {
	      this.isPropChanged('x') && (this.el.style.left = this.props.x);
	      this.isPropChanged('y') && (this.el.style.top = this.props.y);
	      if (this.isNeedsTransform()) {
	        return this.h.setPrefixedStyle(this.el, 'transform', this.fillTransform());
	      }
	    }
	  };

	  Transit.prototype.fillTransform = function() {
	    return "translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
	  };

	  Transit.prototype.isNeedsTransform = function() {
	    var isX, isY;
	    isX = this.isPropChanged('shiftX');
	    isY = this.isPropChanged('shiftY');
	    return isX || isY;
	  };

	  Transit.prototype.isPropChanged = function(name) {
	    var base;
	    if ((base = this.lastSet)[name] == null) {
	      base[name] = {};
	    }
	    if (this.lastSet[name].value !== this.props[name]) {
	      this.lastSet[name].value = this.props[name];
	      return true;
	    } else {
	      return false;
	    }
	  };

	  Transit.prototype.calcTransform = function() {
	    return this.props.transform = "rotate(" + this.props.angle + "," + this.origin.x + "," + this.origin.y + ")";
	  };

	  Transit.prototype.calcSize = function() {
	    var base, dStroke, radius, stroke;
	    if (this.o.size) {
	      return;
	    }
	    radius = this.calcMaxRadius();
	    dStroke = this.deltas['strokeWidth'];
	    stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this.props.strokeWidth;
	    this.props.size = 2 * radius + 2 * stroke;
	    switch (typeof (base = this.props.easing).toLowerCase === "function" ? base.toLowerCase() : void 0) {
	      case 'elastic.out':
	      case 'elastic.inout':
	        this.props.size *= 1.25;
	        break;
	      case 'back.out':
	      case 'back.inout':
	        this.props.size *= 1.1;
	    }
	    this.props.size *= this.bit.ratio;
	    this.props.size += 2 * this.props.sizeGap;
	    return this.props.center = this.props.size / 2;
	  };

	  Transit.prototype.calcMaxRadius = function() {
	    var selfSize, selfSizeX, selfSizeY;
	    selfSize = this.getRadiusSize({
	      key: 'radius'
	    });
	    selfSizeX = this.getRadiusSize({
	      key: 'radiusX',
	      fallback: selfSize
	    });
	    selfSizeY = this.getRadiusSize({
	      key: 'radiusY',
	      fallback: selfSize
	    });
	    return Math.max(selfSizeX, selfSizeY);
	  };

	  Transit.prototype.getRadiusSize = function(o) {
	    if (this.deltas[o.key] != null) {
	      return Math.max(Math.abs(this.deltas[o.key].end), Math.abs(this.deltas[o.key].start));
	    } else if (this.props[o.key] != null) {
	      return parseFloat(this.props[o.key]);
	    } else {
	      return o.fallback || 0;
	    }
	  };

	  Transit.prototype.createBit = function() {
	    var bitClass;
	    bitClass = bitsMap.getBit(this.o.type || this.type);
	    this.bit = new bitClass({
	      ctx: this.ctx,
	      el: this.o.bit,
	      isDrawLess: true
	    });
	    if (this.isForeign || this.isForeignBit) {
	      return this.el = this.bit.el;
	    }
	  };

	  Transit.prototype.setProgress = function(progress, isShow) {
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
	    return this;
	  };

	  Transit.prototype.calcCurrentProps = function(progress) {
	    var a, b, dash, g, i, item, key, keys, len, r, results, stroke, units, value;
	    keys = Object.keys(this.deltas);
	    len = keys.length;
	    results = [];
	    while (len--) {
	      key = keys[len];
	      value = this.deltas[key];
	      results.push(this.props[key] = (function() {
	        var k, len1, ref;
	        switch (value.type) {
	          case 'array':
	            stroke = [];
	            ref = value.delta;
	            for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
	              item = ref[i];
	              dash = value.start[i].value + item.value * this.progress;
	              stroke.push({
	                value: dash,
	                unit: item.unit
	              });
	            }
	            return stroke;
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
	    return results;
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
	    var array, defaultsValue, fromObject, i, k, key, keys, len, len1, optionsValue, property, ref, unit, value;
	    if (this.props == null) {
	      this.props = {};
	    }
	    fromObject = o || this.defaults;
	    (o == null) && (this.deltas = {});
	    keys = Object.keys(fromObject);
	    len = keys.length;
	    while (len--) {
	      key = keys[len];
	      defaultsValue = fromObject[key];
	      if ((ref = this.skipProps) != null ? ref[key] : void 0) {
	        continue;
	      }
	      if (o) {
	        this.o[key] = defaultsValue;
	        optionsValue = defaultsValue;
	        delete this.deltas[key];
	      } else {
	        optionsValue = this.o[key] != null ? this.o[key] : defaultsValue;
	      }
	      if (!this.isDelta(optionsValue)) {
	        if (typeof optionsValue === 'string') {
	          if (optionsValue.match(/stagger/)) {
	            optionsValue = this.h.parseStagger(optionsValue, this.index);
	          }
	        }
	        if (typeof optionsValue === 'string') {
	          if (optionsValue.match(/rand/)) {
	            optionsValue = this.h.parseRand(optionsValue);
	          }
	        }
	        this.props[key] = optionsValue;
	        if (key === 'radius') {
	          if (this.o.radiusX == null) {
	            this.props.radiusX = optionsValue;
	          }
	          if (this.o.radiusY == null) {
	            this.props.radiusY = optionsValue;
	          }
	        }
	        if (this.h.posPropsMap[key]) {
	          this.props[key] = this.h.parseUnit(this.props[key]).string;
	        }
	        if (this.h.strokeDashPropsMap[key]) {
	          property = this.props[key];
	          value = [];
	          switch (typeof property) {
	            case 'number':
	              value.push(this.h.parseUnit(property));
	              break;
	            case 'string':
	              array = this.props[key].split(' ');
	              for (i = k = 0, len1 = array.length; k < len1; i = ++k) {
	                unit = array[i];
	                value.push(this.h.parseUnit(unit));
	              }
	          }
	          this.props[key] = value;
	        }
	        continue;
	      }
	      this.isSkipDelta || this.getDelta(key, optionsValue);
	    }
	    return this.onUpdate = this.props.onUpdate;
	  };

	  Transit.prototype.isDelta = function(optionsValue) {
	    var isObject;
	    isObject = (optionsValue != null) && (typeof optionsValue === 'object');
	    isObject = isObject && !optionsValue.unit;
	    return !(!isObject || this.h.isArray(optionsValue) || h.isDOM(optionsValue));
	  };

	  Transit.prototype.getDelta = function(key, optionsValue) {
	    var delta, ref;
	    if ((key === 'x' || key === 'y') && !this.o.ctx) {
	      this.h.warn('Consider to animate shiftX/shiftY properties instead of x/y, as it would be much more performant', optionsValue);
	    }
	    if ((ref = this.skipPropsDelta) != null ? ref[key] : void 0) {
	      return;
	    }
	    delta = this.h.parseDelta(key, optionsValue, this.defaults[key]);
	    if (delta.type != null) {
	      this.deltas[key] = delta;
	    }
	    return this.props[key] = delta.start;
	  };

	  Transit.prototype.mergeThenOptions = function(start, end) {
	    var endValue, i, isFunction, key, keys, o, startKey, startKeys, value;
	    o = {};
	    for (key in start) {
	      value = start[key];
	      if (!this.h.tweenOptionMap[key] && !this.h.callbacksMap[key] || key === 'duration') {
	        o[key] = value;
	      } else {
	        o[key] = key === 'easing' ? '' : void 0;
	      }
	    }
	    keys = Object.keys(end);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      endValue = end[key];
	      isFunction = typeof endValue === 'function';
	      if (this.h.tweenOptionMap[key] || typeof endValue === 'object' || isFunction) {
	        o[key] = endValue != null ? endValue : start[key];
	        continue;
	      }
	      startKey = start[key];
	      if (startKey == null) {
	        startKey = this.defaults[key];
	      }
	      if ((key === 'radiusX' || key === 'radiusY') && (startKey == null)) {
	        startKey = start.radius;
	      }
	      if (typeof startKey === 'object' && (startKey != null)) {
	        startKeys = Object.keys(startKey);
	        startKey = startKey[startKeys[0]];
	      }
	      if (endValue != null) {
	        o[key] = {};
	        o[key][startKey] = endValue;
	      }
	    }
	    return o;
	  };

	  Transit.prototype.then = function(o) {
	    var i, it, keys, len, merged, opts;
	    if ((o == null) || !Object.keys(o)) {
	      return;
	    }
	    merged = this.mergeThenOptions(this.history[this.history.length - 1], o);
	    this.history.push(merged);
	    keys = Object.keys(this.h.tweenOptionMap);
	    i = keys.length;
	    opts = {};
	    while (i--) {
	      opts[keys[i]] = merged[keys[i]];
	    }
	    it = this;
	    len = it.history.length;
	    (function(_this) {
	      return (function(len) {
	        opts.onUpdate = function(p) {
	          return _this.setProgress(p);
	        };
	        opts.onStart = function() {
	          var ref;
	          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	        };
	        opts.onComplete = function() {
	          var ref;
	          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	        };
	        opts.onFirstUpdate = function() {
	          return it.tuneOptions(it.history[this.index]);
	        };
	        opts.isChained = !o.delay;
	        return _this.timeline.append(new Tween(opts));
	      });
	    })(this)(len);
	    return this;
	  };

	  Transit.prototype.tuneOptions = function(o) {
	    this.extendDefaults(o);
	    this.calcSize();
	    return this.setElStyles();
	  };

	  Transit.prototype.createTween = function() {
	    var it;
	    it = this;
	    this.createTimeline();
	    this.timeline = new Timeline({
	      onComplete: (function(_this) {
	        return function() {
	          var ref;
	          !_this.o.isShowEnd && _this.hide();
	          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	        };
	      })(this)
	    });
	    this.timeline.add(this.tween);
	    return !this.o.isRunLess && this.startTween();
	  };

	  Transit.prototype.createTimeline = function() {
	    return this.tween = new Tween({
	      duration: this.props.duration,
	      delay: this.props.delay,
	      repeat: this.props.repeat,
	      yoyo: this.props.yoyo,
	      easing: this.props.easing,
	      onUpdate: (function(_this) {
	        return function(p) {
	          return _this.setProgress(p);
	        };
	      })(this),
	      onStart: (function(_this) {
	        return function() {
	          var ref;
	          _this.show();
	          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	        };
	      })(this),
	      onFirstUpdateBackward: (function(_this) {
	        return function() {
	          return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
	        };
	      })(this),
	      onReverseComplete: (function(_this) {
	        return function() {
	          var ref;
	          !_this.o.isShowInit && _this.hide();
	          return (ref = _this.props.onReverseComplete) != null ? ref.apply(_this) : void 0;
	        };
	      })(this)
	    });
	  };

	  Transit.prototype.run = function(o) {
	    var key, keys, len;
	    this.runCount++;
	    if (o && Object.keys(o).length) {
	      if (this.history.length > 1) {
	        keys = Object.keys(o);
	        len = keys.length;
	        while (len--) {
	          key = keys[len];
	          if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
	            h.warn("the property \"" + key + "\" property can not be overridden on run with \"then\" chain yet");
	            delete o[key];
	          }
	        }
	      }
	      this.transformHistory(o);
	      this.tuneNewOption(o);
	      o = this.h.cloneObj(this.o);
	      this.h.extend(o, this.defaults);
	      this.history[0] = o;
	      !this.o.isDrawLess && this.setProgress(0, true);
	    } else {
	      this.tuneNewOption(this.history[0]);
	    }
	    return this.startTween();
	  };

	  Transit.prototype.transformHistory = function(o) {
	    var historyLen, i, j, key, keys, len, optionRecord, results, value, value2, valueKeys, valueKeys2;
	    keys = Object.keys(o);
	    i = -1;
	    len = keys.length;
	    historyLen = this.history.length;
	    results = [];
	    while (++i < len) {
	      key = keys[i];
	      j = 0;
	      results.push((function() {
	        var results1;
	        results1 = [];
	        while (++j < historyLen) {
	          optionRecord = this.history[j][key];
	          if (typeof optionRecord === 'object') {
	            valueKeys = Object.keys(optionRecord);
	            value = optionRecord[valueKeys[0]];
	            delete this.history[j][key][valueKeys[0]];
	            if (typeof o[key] === 'object') {
	              valueKeys2 = Object.keys(o[key]);
	              value2 = o[key][valueKeys2[0]];
	              this.history[j][key][value2] = value;
	            } else {
	              this.history[j][key][o[key]] = value;
	            }
	            break;
	          } else {
	            results1.push(this.history[j][key] = o[key]);
	          }
	        }
	        return results1;
	      }).call(this));
	    }
	    return results;
	  };

	  Transit.prototype.tuneNewOption = function(o, isForeign) {
	    if ((o != null) && (o.type != null) && o.type !== (this.o.type || this.type)) {
	      this.h.warn('Sorry, type can not be changed on run');
	      delete o.type;
	    }
	    if ((o != null) && Object.keys(o).length) {
	      this.extendDefaults(o);
	      this.resetTimeline();
	      !isForeign && this.timeline.recalcDuration();
	      this.calcSize();
	      return !isForeign && this.setElStyles();
	    }
	  };

	  Transit.prototype.startTween = function() {
	    return setTimeout(((function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.timeline) != null ? ref.play() : void 0;
	      };
	    })(this)), 1);
	  };

	  Transit.prototype.resetTimeline = function() {
	    var i, k, key, len1, ref, timelineOptions;
	    timelineOptions = {};
	    ref = Object.keys(this.h.tweenOptionMap);
	    for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
	      key = ref[i];
	      timelineOptions[key] = this.props[key];
	    }
	    timelineOptions.onStart = this.props.onStart;
	    timelineOptions.onComplete = this.props.onComplete;
	    return this.tween.setProp(timelineOptions);
	  };

	  Transit.prototype.getBitLength = function() {
	    this.props.bitLength = this.bit.getLength();
	    return this.props.bitLength;
	  };

	  return Transit;

	})(bitsMap.map.bit);

	module.exports = Transit;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;window.mojs = {
	  revision: '0.151.0',
	  isDebug: true,
	  helpers: __webpack_require__(2),
	  Bit: __webpack_require__(3),
	  bitsMap: __webpack_require__(4),
	  Circle: __webpack_require__(5),
	  Cross: __webpack_require__(6),
	  Line: __webpack_require__(7),
	  Rect: __webpack_require__(8),
	  Polygon: __webpack_require__(9),
	  Equal: __webpack_require__(10),
	  Zigzag: __webpack_require__(11),
	  Burst: __webpack_require__(12),
	  Transit: __webpack_require__(13),
	  Swirl: __webpack_require__(1),
	  Stagger: __webpack_require__(15),
	  Spriter: __webpack_require__(16),
	  MotionPath: __webpack_require__(17),
	  Tween: __webpack_require__(19),
	  Timeline: __webpack_require__(20),
	  tweener: __webpack_require__(21),
	  easing: __webpack_require__(18)
	};

	mojs.h = mojs.helpers;

	mojs.delta = mojs.h.delta;


	/* istanbul ignore next */

	if (true) {
	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return mojs;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}


	/* istanbul ignore next */

	if ((typeof module === "object") && (typeof module.exports === "object")) {
	  module.exports = mojs;
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Stagger, StaggerWrapper, Timeline, h;

	h = __webpack_require__(2);

	Timeline = __webpack_require__(20);

	Stagger = (function() {
	  function Stagger(options, Module) {
	    this.init(options, Module);
	  }

	  Stagger.prototype._getOptionByMod = function(name, i, store) {
	    var props, value;
	    props = store[name];
	    if (props + '' === '[object NodeList]') {
	      props = Array.prototype.slice.call(props, 0);
	    }
	    if (props + '' === '[object HTMLCollection]') {
	      props = Array.prototype.slice.call(props, 0);
	    }
	    value = h.isArray(props) ? props[i % props.length] : props;
	    return h.parseIfStagger(value, i);
	  };

	  Stagger.prototype._getOptionByIndex = function(i, store) {
	    var key, options, value;
	    options = {};
	    for (key in store) {
	      value = store[key];
	      options[key] = this._getOptionByMod(key, i, store);
	    }
	    return options;
	  };

	  Stagger.prototype._getChildQuantity = function(name, store) {
	    var ary, quantifier;
	    if (typeof name === 'number') {
	      return name;
	    }
	    quantifier = store[name];
	    if (h.isArray(quantifier)) {
	      return quantifier.length;
	    } else if (quantifier + '' === '[object NodeList]') {
	      return quantifier.length;
	    } else if (quantifier + '' === '[object HTMLCollection]') {
	      ary = Array.prototype.slice.call(quantifier, 0);
	      return ary.length;
	    } else if (quantifier instanceof HTMLElement) {
	      return 1;
	    } else if (typeof quantifier === 'string') {
	      return 1;
	    }
	  };

	  Stagger.prototype._createTimeline = function(options) {
	    if (options == null) {
	      options = {};
	    }
	    return this.timeline = new Timeline({
	      onStart: options.onStaggerStart,
	      onUpdate: options.onStaggerUpdate,
	      onComplete: options.onStaggerComplete,
	      onReverseComplete: options.onStaggerReverseComplete,
	      delay: options.moduleDelay
	    });
	  };

	  Stagger.prototype.init = function(options, Module) {
	    var count, i, j, module, option, ref;
	    count = this._getChildQuantity(options.quantifier || 'el', options);
	    this._createTimeline(options);
	    this.childModules = [];
	    for (i = j = 0, ref = count; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      option = this._getOptionByIndex(i, options);
	      option.isRunLess = true;
	      module = new Module(option);
	      this.childModules.push(module);
	      this.timeline.add(module);
	    }
	    return this;
	  };

	  Stagger.prototype.run = function() {
	    return this.timeline.play();
	  };

	  return Stagger;

	})();

	StaggerWrapper = (function() {
	  function StaggerWrapper(Module) {
	    var M;
	    M = Module;
	    return function(options) {
	      return new Stagger(options, M);
	    };
	  }

	  return StaggerWrapper;

	})();

	module.exports = StaggerWrapper;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Spriter, Timeline, Tween, h;

	h = __webpack_require__(2);

	Tween = __webpack_require__(19);

	Timeline = __webpack_require__(20);

	Spriter = (function() {
	  Spriter.prototype._defaults = {
	    duration: 500,
	    delay: 0,
	    easing: 'linear.none',
	    repeat: 0,
	    yoyo: false,
	    isRunLess: false,
	    isShowEnd: false,
	    onStart: null,
	    onUpdate: null,
	    onComplete: null
	  };

	  function Spriter(o1) {
	    this.o = o1 != null ? o1 : {};
	    if (this.o.el == null) {
	      return h.error('No "el" option specified, aborting');
	    }
	    this._vars();
	    this._extendDefaults();
	    this._parseFrames();
	    if (this._frames.length <= 2) {
	      h.warn("Spriter: only " + this._frames.length + " frames found");
	    }
	    if (this._frames.length < 1) {
	      h.error("Spriter: there is no frames to animate, aborting");
	    }
	    this._createTween();
	    this;
	  }

	  Spriter.prototype._vars = function() {
	    this._props = h.cloneObj(this.o);
	    this.el = this.o.el;
	    return this._frames = [];
	  };

	  Spriter.prototype.run = function(o) {
	    return this._timeline.play();
	  };

	  Spriter.prototype._extendDefaults = function() {
	    return h.extend(this._props, this._defaults);
	  };

	  Spriter.prototype._parseFrames = function() {
	    var frame, i, j, len, ref;
	    this._frames = Array.prototype.slice.call(this.el.children, 0);
	    ref = this._frames;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      frame = ref[i];
	      frame.style.opacity = 0;
	    }
	    return this._frameStep = 1 / this._frames.length;
	  };

	  Spriter.prototype._createTween = function() {
	    this._tween = new Tween({
	      duration: this._props.duration,
	      delay: this._props.delay,
	      yoyo: this._props.yoyo,
	      repeat: this._props.repeat,
	      easing: this._props.easing,
	      onStart: (function(_this) {
	        return function() {
	          var base;
	          return typeof (base = _this._props).onStart === "function" ? base.onStart() : void 0;
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          var base;
	          return typeof (base = _this._props).onComplete === "function" ? base.onComplete() : void 0;
	        };
	      })(this),
	      onUpdate: (function(_this) {
	        return function(p) {
	          return _this._setProgress(p);
	        };
	      })(this)
	    });
	    this._timeline = new Timeline;
	    this._timeline.add(this._tween);
	    return !this._props.isRunLess && this._startTween();
	  };

	  Spriter.prototype._startTween = function() {
	    return setTimeout(((function(_this) {
	      return function() {
	        return _this._timeline.play();
	      };
	    })(this)), 1);
	  };

	  Spriter.prototype._setProgress = function(p) {
	    var base, currentNum, proc, ref, ref1;
	    proc = Math.floor(p / this._frameStep);
	    if (this._prevFrame !== this._frames[proc]) {
	      if ((ref = this._prevFrame) != null) {
	        ref.style.opacity = 0;
	      }
	      currentNum = p === 1 && this._props.isShowEnd ? proc - 1 : proc;
	      if ((ref1 = this._frames[currentNum]) != null) {
	        ref1.style.opacity = 1;
	      }
	      this._prevFrame = this._frames[proc];
	    }
	    return typeof (base = this._props).onUpdate === "function" ? base.onUpdate(p) : void 0;
	  };

	  return Spriter;

	})();

	module.exports = Spriter;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var MotionPath, Timeline, Tween, h, resize,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	h = __webpack_require__(2);

	resize = __webpack_require__(22);

	Tween = __webpack_require__(19);

	Timeline = __webpack_require__(20);

	MotionPath = (function() {
	  MotionPath.prototype.defaults = {
	    path: null,
	    curvature: {
	      x: '75%',
	      y: '50%'
	    },
	    isCompositeLayer: true,
	    delay: 0,
	    duration: 1000,
	    easing: null,
	    repeat: 0,
	    yoyo: false,
	    offsetX: 0,
	    offsetY: 0,
	    angleOffset: null,
	    pathStart: 0,
	    pathEnd: 1,
	    motionBlur: 0,
	    transformOrigin: null,
	    isAngle: false,
	    isReverse: false,
	    isRunLess: false,
	    isPresetPosition: true,
	    onStart: null,
	    onComplete: null,
	    onUpdate: null
	  };

	  function MotionPath(o1) {
	    this.o = o1 != null ? o1 : {};
	    this.calcHeight = bind(this.calcHeight, this);
	    if (this.vars()) {
	      return;
	    }
	    this.createTween();
	    this;
	  }

	  MotionPath.prototype.vars = function() {
	    this.getScaler = h.bind(this.getScaler, this);
	    this.resize = resize;
	    this.props = h.cloneObj(this.defaults);
	    this.extendOptions(this.o);
	    this.isMotionBlurReset = h.isSafari || h.isIE;
	    this.isMotionBlurReset && (this.props.motionBlur = 0);
	    this.history = [h.cloneObj(this.props)];
	    return this.postVars();
	  };

	  MotionPath.prototype.curveToPath = function(o) {
	    var angle, curvature, curvatureX, curvatureY, curvePoint, curveXPoint, dX, dY, endPoint, path, percent, radius, start;
	    path = document.createElementNS(h.NS, 'path');
	    start = o.start;
	    endPoint = {
	      x: start.x + o.shift.x,
	      y: start.x + o.shift.y
	    };
	    curvature = o.curvature;
	    dX = o.shift.x;
	    dY = o.shift.y;
	    radius = Math.sqrt(dX * dX + dY * dY);
	    percent = radius / 100;
	    angle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
	    if (o.shift.x < 0) {
	      angle = angle + 180;
	    }
	    curvatureX = h.parseUnit(curvature.x);
	    curvatureX = curvatureX.unit === '%' ? curvatureX.value * percent : curvatureX.value;
	    curveXPoint = h.getRadialPoint({
	      center: {
	        x: start.x,
	        y: start.y
	      },
	      radius: curvatureX,
	      angle: angle
	    });
	    curvatureY = h.parseUnit(curvature.y);
	    curvatureY = curvatureY.unit === '%' ? curvatureY.value * percent : curvatureY.value;
	    curvePoint = h.getRadialPoint({
	      center: {
	        x: curveXPoint.x,
	        y: curveXPoint.y
	      },
	      radius: curvatureY,
	      angle: angle + 90
	    });
	    path.setAttribute('d', "M" + start.x + "," + start.y + " Q" + curvePoint.x + "," + curvePoint.y + " " + endPoint.x + "," + endPoint.y);
	    return path;
	  };

	  MotionPath.prototype.postVars = function() {
	    this.props.pathStart = h.clamp(this.props.pathStart, 0, 1);
	    this.props.pathEnd = h.clamp(this.props.pathEnd, this.props.pathStart, 1);
	    this.angle = 0;
	    this.speedX = 0;
	    this.speedY = 0;
	    this.blurX = 0;
	    this.blurY = 0;
	    this.prevCoords = {};
	    this.blurAmount = 20;
	    this.props.motionBlur = h.clamp(this.props.motionBlur, 0, 1);
	    this.onUpdate = this.props.onUpdate;
	    if (!this.o.el) {
	      h.error('Missed "el" option. It could be a selector, DOMNode or another module.');
	      return true;
	    }
	    this.el = this.parseEl(this.props.el);
	    this.props.motionBlur > 0 && this.createFilter();
	    this.path = this.getPath();
	    if (!this.path.getAttribute('d')) {
	      h.error('Path has no coordinates to work with, aborting');
	      return true;
	    }
	    this.len = this.path.getTotalLength();
	    this.slicedLen = this.len * (this.props.pathEnd - this.props.pathStart);
	    this.startLen = this.props.pathStart * this.len;
	    this.fill = this.props.fill;
	    if (this.fill != null) {
	      this.container = this.parseEl(this.props.fill.container);
	      this.fillRule = this.props.fill.fillRule || 'all';
	      this.getScaler();
	      if (this.container != null) {
	        this.removeEvent(this.container, 'onresize', this.getScaler);
	        return this.addEvent(this.container, 'onresize', this.getScaler);
	      }
	    }
	  };

	  MotionPath.prototype.addEvent = function(el, type, handler) {
	    return el.addEventListener(type, handler, false);
	  };

	  MotionPath.prototype.removeEvent = function(el, type, handler) {
	    return el.removeEventListener(type, handler, false);
	  };

	  MotionPath.prototype.createFilter = function() {
	    var div, svg;
	    div = document.createElement('div');
	    this.filterID = "filter-" + (h.getUniqID());
	    div.innerHTML = "<svg id=\"svg-" + this.filterID + "\"\n    style=\"visibility:hidden; width:0px; height:0px\">\n  <filter id=\"" + this.filterID + "\" y=\"-20\" x=\"-20\" width=\"40\" height=\"40\">\n    <feOffset\n      id=\"blur-offset\" in=\"SourceGraphic\"\n      dx=\"0\" dy=\"0\" result=\"offset2\"></feOffset>\n    <feGaussianblur\n      id=\"blur\" in=\"offset2\"\n      stdDeviation=\"0,0\" result=\"blur2\"></feGaussianblur>\n    <feMerge>\n      <feMergeNode in=\"SourceGraphic\"></feMergeNode>\n      <feMergeNode in=\"blur2\"></feMergeNode>\n    </feMerge>\n  </filter>\n</svg>";
	    svg = div.querySelector("#svg-" + this.filterID);
	    this.filter = svg.querySelector('#blur');
	    this.filterOffset = svg.querySelector('#blur-offset');
	    document.body.insertBefore(svg, document.body.firstChild);
	    this.el.style['filter'] = "url(#" + this.filterID + ")";
	    return this.el.style[h.prefix.css + "filter"] = "url(#" + this.filterID + ")";
	  };

	  MotionPath.prototype.parseEl = function(el) {
	    if (typeof el === 'string') {
	      return document.querySelector(el);
	    }
	    if (el instanceof HTMLElement) {
	      return el;
	    }
	    if (el.setProp != null) {
	      this.isModule = true;
	      return el;
	    }
	  };

	  MotionPath.prototype.getPath = function() {
	    var path;
	    path = h.parsePath(this.props.path);
	    if (path) {
	      return path;
	    }
	    if (this.props.path.x || this.props.path.y) {
	      return this.curveToPath({
	        start: {
	          x: 0,
	          y: 0
	        },
	        shift: {
	          x: this.props.path.x || 0,
	          y: this.props.path.y || 0
	        },
	        curvature: {
	          x: this.props.curvature.x || this.defaults.curvature.x,
	          y: this.props.curvature.y || this.defaults.curvature.y
	        }
	      });
	    }
	  };

	  MotionPath.prototype.getScaler = function() {
	    var end, size, start;
	    this.cSize = {
	      width: this.container.offsetWidth || 0,
	      height: this.container.offsetHeight || 0
	    };
	    start = this.path.getPointAtLength(0);
	    end = this.path.getPointAtLength(this.len);
	    size = {};
	    this.scaler = {};
	    size.width = end.x >= start.x ? end.x - start.x : start.x - end.x;
	    size.height = end.y >= start.y ? end.y - start.y : start.y - end.y;
	    switch (this.fillRule) {
	      case 'all':
	        this.calcWidth(size);
	        return this.calcHeight(size);
	      case 'width':
	        this.calcWidth(size);
	        return this.scaler.y = this.scaler.x;
	      case 'height':
	        this.calcHeight(size);
	        return this.scaler.x = this.scaler.y;
	    }
	  };

	  MotionPath.prototype.calcWidth = function(size) {
	    this.scaler.x = this.cSize.width / size.width;
	    return !isFinite(this.scaler.x) && (this.scaler.x = 1);
	  };

	  MotionPath.prototype.calcHeight = function(size) {
	    this.scaler.y = this.cSize.height / size.height;
	    return !isFinite(this.scaler.y) && (this.scaler.y = 1);
	  };

	  MotionPath.prototype.run = function(o) {
	    var fistItem, key, value;
	    if (o) {
	      fistItem = this.history[0];
	      for (key in o) {
	        value = o[key];
	        if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
	          h.warn("the property \"" + key + "\" property can not be overridden on run yet");
	          delete o[key];
	        } else {
	          this.history[0][key] = value;
	        }
	      }
	      this.tuneOptions(o);
	    }
	    return this.startTween();
	  };

	  MotionPath.prototype.createTween = function() {
	    this.tween = new Tween({
	      duration: this.props.duration,
	      delay: this.props.delay,
	      yoyo: this.props.yoyo,
	      repeat: this.props.repeat,
	      easing: this.props.easing,
	      onStart: (function(_this) {
	        return function() {
	          var ref;
	          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          var ref;
	          _this.props.motionBlur && _this.setBlur({
	            blur: {
	              x: 0,
	              y: 0
	            },
	            offset: {
	              x: 0,
	              y: 0
	            }
	          });
	          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	        };
	      })(this),
	      onUpdate: (function(_this) {
	        return function(p) {
	          return _this.setProgress(p);
	        };
	      })(this),
	      onFirstUpdateBackward: (function(_this) {
	        return function() {
	          return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
	        };
	      })(this)
	    });
	    this.timeline = new Timeline;
	    this.timeline.add(this.tween);
	    !this.props.isRunLess && this.startTween();
	    return this.props.isPresetPosition && this.setProgress(0, true);
	  };

	  MotionPath.prototype.startTween = function() {
	    return setTimeout(((function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.timeline) != null ? ref.play() : void 0;
	      };
	    })(this)), 1);
	  };

	  MotionPath.prototype.setProgress = function(p, isInit) {
	    var len, point, x, y;
	    len = this.startLen + (!this.props.isReverse ? p * this.slicedLen : (1 - p) * this.slicedLen);
	    point = this.path.getPointAtLength(len);
	    x = point.x + this.props.offsetX;
	    y = point.y + this.props.offsetY;
	    this._getCurrentAngle(point, len, p);
	    this._setTransformOrigin(p);
	    this._setTransform(x, y, p, isInit);
	    return this.props.motionBlur && this.makeMotionBlur(x, y);
	  };

	  MotionPath.prototype.setElPosition = function(x, y, p) {
	    var composite, isComposite, rotate, transform;
	    rotate = this.angle !== 0 ? "rotate(" + this.angle + "deg)" : '';
	    isComposite = this.props.isCompositeLayer && h.is3d;
	    composite = isComposite ? 'translateZ(0)' : '';
	    transform = "translate(" + x + "px," + y + "px) " + rotate + " " + composite;
	    return h.setPrefixedStyle(this.el, 'transform', transform);
	  };

	  MotionPath.prototype.setModulePosition = function(x, y) {
	    this.el.setProp({
	      shiftX: x + "px",
	      shiftY: y + "px",
	      angle: this.angle
	    });
	    return this.el.draw();
	  };

	  MotionPath.prototype._getCurrentAngle = function(point, len, p) {
	    var atan, isTransformFunOrigin, prevPoint, x1, x2;
	    isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
	    if (this.props.isAngle || (this.props.angleOffset != null) || isTransformFunOrigin) {
	      prevPoint = this.path.getPointAtLength(len - 1);
	      x1 = point.y - prevPoint.y;
	      x2 = point.x - prevPoint.x;
	      atan = Math.atan(x1 / x2);
	      !isFinite(atan) && (atan = 0);
	      this.angle = atan * h.RAD_TO_DEG;
	      if ((typeof this.props.angleOffset) !== 'function') {
	        return this.angle += this.props.angleOffset || 0;
	      } else {
	        return this.angle = this.props.angleOffset.call(this, this.angle, p);
	      }
	    } else {
	      return this.angle = 0;
	    }
	  };

	  MotionPath.prototype._setTransform = function(x, y, p, isInit) {
	    var transform;
	    if (this.scaler) {
	      x *= this.scaler.x;
	      y *= this.scaler.y;
	    }
	    transform = null;
	    if (!isInit) {
	      transform = typeof this.onUpdate === "function" ? this.onUpdate(p, {
	        x: x,
	        y: y,
	        angle: this.angle
	      }) : void 0;
	    }
	    if (this.isModule) {
	      return this.setModulePosition(x, y);
	    } else {
	      if (typeof transform !== 'string') {
	        return this.setElPosition(x, y, p);
	      } else {
	        return h.setPrefixedStyle(this.el, 'transform', transform);
	      }
	    }
	  };

	  MotionPath.prototype._setTransformOrigin = function(p) {
	    var isTransformFunOrigin, tOrigin;
	    if (this.props.transformOrigin) {
	      isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
	      tOrigin = !isTransformFunOrigin ? this.props.transformOrigin : this.props.transformOrigin(this.angle, p);
	      return h.setPrefixedStyle(this.el, 'transform-origin', tOrigin);
	    }
	  };

	  MotionPath.prototype.makeMotionBlur = function(x, y) {
	    var absoluteAngle, coords, dX, dY, signX, signY, tailAngle;
	    tailAngle = 0;
	    signX = 1;
	    signY = 1;
	    if ((this.prevCoords.x == null) || (this.prevCoords.y == null)) {
	      this.speedX = 0;
	      this.speedY = 0;
	    } else {
	      dX = x - this.prevCoords.x;
	      dY = y - this.prevCoords.y;
	      if (dX > 0) {
	        signX = -1;
	      }
	      if (signX < 0) {
	        signY = -1;
	      }
	      this.speedX = Math.abs(dX);
	      this.speedY = Math.abs(dY);
	      tailAngle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
	    }
	    absoluteAngle = tailAngle - this.angle;
	    coords = this.angToCoords(absoluteAngle);
	    this.blurX = h.clamp((this.speedX / 16) * this.props.motionBlur, 0, 1);
	    this.blurY = h.clamp((this.speedY / 16) * this.props.motionBlur, 0, 1);
	    this.setBlur({
	      blur: {
	        x: 3 * this.blurX * this.blurAmount * Math.abs(coords.x),
	        y: 3 * this.blurY * this.blurAmount * Math.abs(coords.y)
	      },
	      offset: {
	        x: 3 * signX * this.blurX * coords.x * this.blurAmount,
	        y: 3 * signY * this.blurY * coords.y * this.blurAmount
	      }
	    });
	    this.prevCoords.x = x;
	    return this.prevCoords.y = y;
	  };

	  MotionPath.prototype.setBlur = function(o) {
	    if (!this.isMotionBlurReset) {
	      this.filter.setAttribute('stdDeviation', o.blur.x + "," + o.blur.y);
	      this.filterOffset.setAttribute('dx', o.offset.x);
	      return this.filterOffset.setAttribute('dy', o.offset.y);
	    }
	  };

	  MotionPath.prototype.extendDefaults = function(o) {
	    var key, results, value;
	    results = [];
	    for (key in o) {
	      value = o[key];
	      results.push(this[key] = value);
	    }
	    return results;
	  };

	  MotionPath.prototype.extendOptions = function(o) {
	    var key, results, value;
	    results = [];
	    for (key in o) {
	      value = o[key];
	      results.push(this.props[key] = value);
	    }
	    return results;
	  };

	  MotionPath.prototype.then = function(o) {
	    var it, key, opts, prevOptions, value;
	    prevOptions = this.history[this.history.length - 1];
	    opts = {};
	    for (key in prevOptions) {
	      value = prevOptions[key];
	      if (!h.callbacksMap[key] && !h.tweenOptionMap[key] || key === 'duration') {
	        if (o[key] == null) {
	          o[key] = value;
	        }
	      } else {
	        if (o[key] == null) {
	          o[key] = void 0;
	        }
	      }
	      if (h.tweenOptionMap[key]) {
	        opts[key] = key !== 'duration' ? o[key] : o[key] != null ? o[key] : prevOptions[key];
	      }
	    }
	    this.history.push(o);
	    it = this;
	    opts.onUpdate = (function(_this) {
	      return function(p) {
	        return _this.setProgress(p);
	      };
	    })(this);
	    opts.onStart = (function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	      };
	    })(this);
	    opts.onComplete = (function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	      };
	    })(this);
	    opts.onFirstUpdate = function() {
	      return it.tuneOptions(it.history[this.index]);
	    };
	    opts.isChained = !o.delay;
	    this.timeline.append(new Tween(opts));
	    return this;
	  };

	  MotionPath.prototype.tuneOptions = function(o) {
	    this.extendOptions(o);
	    return this.postVars();
	  };

	  MotionPath.prototype.angToCoords = function(angle) {
	    var radAngle, x, y;
	    angle = angle % 360;
	    radAngle = ((angle - 90) * Math.PI) / 180;
	    x = Math.cos(radAngle);
	    y = Math.sin(radAngle);
	    x = x < 0 ? Math.max(x, -0.7) : Math.min(x, .7);
	    y = y < 0 ? Math.max(y, -0.7) : Math.min(y, .7);
	    return {
	      x: x * 1.428571429,
	      y: y * 1.428571429
	    };
	  };

	  return MotionPath;

	})();

	module.exports = MotionPath;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Easing, PathEasing, bezier, easing, h, mix;

	bezier = __webpack_require__(23);

	PathEasing = __webpack_require__(24);

	mix = __webpack_require__(25);

	h = __webpack_require__(2);

	Easing = (function() {
	  function Easing() {}

	  Easing.prototype.bezier = bezier;

	  Easing.prototype.PathEasing = PathEasing;

	  Easing.prototype.path = (new PathEasing('creator')).create;

	  Easing.prototype.inverse = function(p) {
	    return 1 - p;
	  };

	  Easing.prototype.linear = {
	    none: function(k) {
	      return k;
	    }
	  };

	  Easing.prototype.ease = {
	    "in": bezier.apply(Easing, [0.42, 0, 1, 1]),
	    out: bezier.apply(Easing, [0, 0, 0.58, 1]),
	    inout: bezier.apply(Easing, [0.42, 0, 0.58, 1])
	  };

	  Easing.prototype.quad = {
	    "in": function(k) {
	      return k * k;
	    },
	    out: function(k) {
	      return k * (2 - k);
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k;
	      }
	      return -0.5 * (--k * (k - 2) - 1);
	    }
	  };

	  Easing.prototype.cubic = {
	    "in": function(k) {
	      return k * k * k;
	    },
	    out: function(k) {
	      return --k * k * k + 1;
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k;
	      }
	      return 0.5 * ((k -= 2) * k * k + 2);
	    }
	  };

	  Easing.prototype.quart = {
	    "in": function(k) {
	      return k * k * k * k;
	    },
	    out: function(k) {
	      return 1 - (--k * k * k * k);
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k * k;
	      }
	      return -0.5 * ((k -= 2) * k * k * k - 2);
	    }
	  };

	  Easing.prototype.quint = {
	    "in": function(k) {
	      return k * k * k * k * k;
	    },
	    out: function(k) {
	      return --k * k * k * k * k + 1;
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k * k * k;
	      }
	      return 0.5 * ((k -= 2) * k * k * k * k + 2);
	    }
	  };

	  Easing.prototype.sin = {
	    "in": function(k) {
	      return 1 - Math.cos(k * Math.PI / 2);
	    },
	    out: function(k) {
	      return Math.sin(k * Math.PI / 2);
	    },
	    inout: function(k) {
	      return 0.5 * (1 - Math.cos(Math.PI * k));
	    }
	  };

	  Easing.prototype.expo = {
	    "in": function(k) {
	      if (k === 0) {
	        return 0;
	      } else {
	        return Math.pow(1024, k - 1);
	      }
	    },
	    out: function(k) {
	      if (k === 1) {
	        return 1;
	      } else {
	        return 1 - Math.pow(2, -10 * k);
	      }
	    },
	    inout: function(k) {
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

	  Easing.prototype.circ = {
	    "in": function(k) {
	      return 1 - Math.sqrt(1 - k * k);
	    },
	    out: function(k) {
	      return Math.sqrt(1 - (--k * k));
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return -0.5 * (Math.sqrt(1 - k * k) - 1);
	      }
	      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	    }
	  };

	  Easing.prototype.back = {
	    "in": function(k) {
	      var s;
	      s = 1.70158;
	      return k * k * ((s + 1) * k - s);
	    },
	    out: function(k) {
	      var s;
	      s = 1.70158;
	      return --k * k * ((s + 1) * k + s) + 1;
	    },
	    inout: function(k) {
	      var s;
	      s = 1.70158 * 1.525;
	      if ((k *= 2) < 1) {
	        return 0.5 * (k * k * ((s + 1) * k - s));
	      }
	      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	    }
	  };

	  Easing.prototype.elastic = {
	    "in": function(k) {
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
	    out: function(k) {
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
	    inout: function(k) {
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

	  Easing.prototype.bounce = {
	    "in": function(k) {
	      return 1 - easing.bounce.out(1 - k);
	    },
	    out: function(k) {
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
	    inout: function(k) {
	      if (k < 0.5) {
	        return easing.bounce["in"](k * 2) * 0.5;
	      }
	      return easing.bounce.out(k * 2 - 1) * 0.5 + 0.5;
	    }
	  };

	  Easing.prototype.parseEasing = function(easing) {
	    var easingParent, type;
	    type = typeof easing;
	    if (type === 'string') {
	      if (easing.charAt(0).toLowerCase() === 'm') {
	        return this.path(easing);
	      } else {
	        easing = this._splitEasing(easing);
	        easingParent = this[easing[0]];
	        if (!easingParent) {
	          h.error("Easing with name \"" + easing[0] + "\" was not found, fallback to \"linear.none\" instead");
	          return this['linear']['none'];
	        }
	        return easingParent[easing[1]];
	      }
	    }
	    if (h.isArray(easing)) {
	      return this.bezier.apply(this, easing);
	    }
	    if ('function') {
	      return easing;
	    }
	  };

	  Easing.prototype._splitEasing = function(string) {
	    var firstPart, secondPart, split;
	    if (typeof string === 'function') {
	      return string;
	    }
	    if (typeof string === 'string' && string.length) {
	      split = string.split('.');
	      firstPart = split[0].toLowerCase() || 'linear';
	      secondPart = split[1].toLowerCase() || 'none';
	      return [firstPart, secondPart];
	    } else {
	      return ['linear', 'none'];
	    }
	  };

	  return Easing;

	})();

	easing = new Easing;

	easing.mix = mix(easing);

	module.exports = easing;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _prototypeProperties = function (child, staticProps, instanceProps) {
	  if (staticProps) Object.defineProperties(child, staticProps);
	  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
	};

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var _core = _interopRequire(__webpack_require__(28));

	var h = _interopRequire(__webpack_require__(2));

	var t = _interopRequire(__webpack_require__(21));

	var easing = _interopRequire(__webpack_require__(18));

	// TODO: all public methods should return this

	var Tween = (function () {
	  function Tween() {
	    var o = arguments[0] === undefined ? {} : arguments[0];
	    this.o = o;
	    this.declareDefaults();this.extendDefaults();this.vars();return this;
	  }

	  _prototypeProperties(Tween, null, {
	    declareDefaults: {
	      value: function declareDefaults() {
	        this.defaults = {
	          duration: 600,
	          delay: 0,
	          repeat: 0,
	          yoyo: false,
	          easing: "Linear.None",
	          onStart: null,
	          onComplete: null,
	          onRepeatStart: null,
	          onRepeatComplete: null,
	          onFirstUpdate: null,
	          onUpdate: null,
	          isChained: false
	        };
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    vars: {
	      value: function vars() {
	        this.h = h;this.progress = 0;this.prevTime = -1;
	        return this.calcDimentions();
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    calcDimentions: {
	      value: function calcDimentions() {
	        this.props.time = this.props.duration + this.props.delay;
	        this.props.repeatTime = this.props.time * (this.props.repeat + 1);
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    extendDefaults: {
	      value: function extendDefaults() {
	        this.props = {};
	        for (var key in this.defaults) {
	          if (Object.hasOwnProperty.call(this.defaults, key)) {
	            var value = this.defaults[key];
	            this.props[key] = this.o[key] != null ? this.o[key] : value;
	            this.props.easing = easing.parseEasing(this.o.easing || this.defaults.easing);
	            this.onUpdate = this.props.onUpdate;
	          }
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    setStartTime: {
	      /*
	        Method for setting start and end time to props.
	        @param {Number(Timestamp)}, {Null}
	        @returns this
	      */
	      value: function setStartTime(time) {
	        var props = this.props;
	        this.isCompleted = false;this.isRepeatCompleted = false;
	        this.isStarted = false;

	        time = time == null ? performance.now() : time;
	        props.startTime = time + props.delay + (props.shiftTime || 0);
	        props.endTime = props.startTime + props.repeatTime - props.delay;

	        return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    update: {
	      /*
	        Method to update tween's progress.
	        @param {Number}   Time from the parent regarding it's period size.
	        @param {Boolean}  Indicates if parent progress grows.
	        @param {Number}   Parent's current period number.
	        @param {Number}   Parent's previous period number.
	      */
	      value: function update(time, isGrow) {
	        var props = this.props;

	        // We need to know what direction we are heading in with this tween,
	        // so if we don't have the previous update value - this is very first
	        // update, - skip it entirely and wait for the next value
	        if (this.prevTime === -1) {
	          this.o.isIt && console.log("=========");
	          this.o.isIt && console.log("tween: SKIP");
	          this.o.isIt && this._visualizeProgress(time);
	          this.prevTime = time;
	          this._wasUknownUpdate = true;
	          return false;
	        }

	        /*
	          if time is inside the active area of the tween.
	          active area is the area from start time to end time,
	          with all the repeat and delays in it
	        */
	        if (time >= this.props.startTime && time <= this.props.endTime) {
	          this._updateInActiveArea(time);
	        } else {
	          this.isFirstUpdate = false;
	          // complete if time is larger then end time
	          if (time > this.props.endTime && !this.isCompleted && this._isInActiveArea) {
	            // get period number
	            var props = this.props,
	                startPoint = props.startTime - props.delay,
	                periodNumber = Math.floor((props.endTime - startPoint) / (props.delay + props.duration));

	            // if ( isGrow == null ) { isGrow = time > this.prevTime; }
	            this._complete(this.o.yoyo && periodNumber % 2 === 0 ? 0 : 1, time);
	          }

	          // if was active and went to - inactive area "-"
	          if (time < this.prevTime && time < this.props.startTime) {
	            if (!this.isOnReverseComplete && this._isInActiveArea) {
	              this._start(0, time);
	              this.setProgress(0);
	              this._repeatStart(time);
	              this.isOnReverseComplete = true;
	            }
	          }

	          this._isInActiveArea = false;
	        }

	        this.prevTime = time;
	        return this.isCompleted;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _start: {

	      /*
	        Method to set tween's state to start
	        @method _start
	        @param {Numner} Progress to set.
	      */
	      value: function Start(progress, time) {
	        var progress = arguments[0] === undefined ? 0 : arguments[0];
	        if (this.isStarted) {
	          return;
	        }
	        this.setProgress(progress);
	        // this._repeatStart();
	        if (this.props.onStart != null && typeof this.props.onStart === "function") {
	          this.o.isIt && console.log("********** START **********");
	          this.props.onStart.call(this, time > this.prevTime);
	        }
	        this.isCompleted = false;this.isStarted = true;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _complete: {

	      /*
	        Method to set tween's state to complete.
	        @method _complete
	        @param {Number} Progress to set.
	        @param {Number} Current time.
	      */
	      value: function Complete(progress, time) {
	        var progress = arguments[0] === undefined ? 1 : arguments[0];
	        this.setProgress(progress);
	        this._repeatComplete(time);
	        if (this.props.onComplete != null && typeof this.props.onComplete === "function") {
	          this.o.isIt && console.log("********** COMPLETE **********");
	          this.props.onComplete.call(this, time > this.prevTime);
	        }
	        this.isCompleted = true;this.isStarted = false;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _firstUpdate: {

	      /*
	        Method to run onFirstUpdate callback.
	        @method _firstUpdate
	      */
	      value: function FirstUpdate() {
	        if (this.isFirstUpdate) {
	          return;
	        }
	        if (this.props.onFirstUpdate != null && typeof this.props.onFirstUpdate === "function") {
	          this.o.isIt && console.log("********** ON_FIRST_UPDATE **********");
	          this.props.onFirstUpdate.apply(this);
	        }
	        this.isCompleted = false;
	        this.isFirstUpdate = true;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _repeatComplete: {

	      /*
	        Method call onRepeatComplete calback and set flags.
	        @param {Number} Current update time.
	      */
	      value: function RepeatComplete(time) {
	        if (this.isRepeatCompleted) {
	          return;
	        }
	        if (this.props.onRepeatComplete != null && typeof this.props.onRepeatComplete === "function") {
	          this.o.isIt && console.log("********** REPEAT COMPLETE **********");
	          this.props.onRepeatComplete.call(this, time > this.prevTime);
	        }
	        this.isRepeatCompleted = true;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _repeatStart: {

	      /*
	        Method call onRepeatStart calback and set flags.
	      */
	      value: function RepeatStart(time) {
	        if (this.isRepeatStart) {
	          return;
	        }
	        if (this.props.onRepeatStart != null && typeof this.props.onRepeatStart === "function") {
	          this.o.isIt && console.log("********** REPEAT START **********");
	          this.props.onRepeatStart.call(this, time > this.prevTime);
	        }
	        this.isRepeatStart = true;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _updateInActiveArea: {
	      value: function UpdateInActiveArea(time) {
	        // reset callback flags
	        this.isOnReverseComplete = false;this.isCompleted = false;

	        if (time === this.props.endTime) {
	          this._wasUknownUpdate = false;
	          return this._complete(1, time);
	        }

	        var props = this.props,
	            delayDuration = props.delay + props.duration,
	            startPoint = props.startTime - props.delay,
	            elapsed = (time - props.startTime + props.delay) % delayDuration,
	            TCount = (props.endTime - props.startTime + props.delay) / delayDuration,
	            T = this._getPeriod(time),
	            TValue = this._delayT,
	            prevT = this._getPeriod(this.prevTime),
	            TPrevValue = this._delayT;

	        this.o.isIt && console.log("=========");
	        this.o.isIt && console.log("tween:");
	        this.o.isIt && console.log("TCount: " + TCount);
	        // this.o.isIt && console.log(`time: ${time}, start: ${props.startTime}, end: ${props.endTime}`);
	        this.o.isIt && console.log("T: " + T + ", prevT: " + prevT + ", time: " + time + " prevTime: " + this.prevTime);
	        // this.o.isIt && console.log(`TValue: ${TValue}, TPrevValue: ${TPrevValue}`);
	        this.o.isIt && this._visualizeProgress(time);

	        // if time is inside the duration area of the tween
	        if (startPoint + elapsed >= props.startTime) {
	          this._firstUpdate();

	          this._isInActiveArea = true;
	          this.isRepeatCompleted = false;
	          this.isRepeatStart = false;
	          this.isOnReverseComplete = false;
	          this.isStarted = false;
	          // active zone or larger then end
	          var elapsed2 = (time - props.startTime) % delayDuration;
	          var proc = elapsed2 / props.duration;
	          this.o.isIt && console.log("proc: " + proc + ", elapsed2: " + elapsed2 + ", elapsed: " + elapsed);

	          // |=====|=====|=====| >>>
	          //      ^1^2
	          var isOnEdge = T > 0 && prevT < T;
	          // |=====|=====|=====| <<<
	          //      ^2^1
	          var isOnReverseEdge = prevT > T;
	          // if not yoyo then set the plain progress
	          if (!props.yoyo) {
	            if (this._wasUknownUpdate) {
	              if (this.prevTime < time) {
	                this._start(0, time);
	                this._repeatStart(time);
	                this.setProgress(0);
	              }

	              if (this.prevTime > time) {
	                this._repeatComplete(time);
	                this.setProgress(1);
	              }
	            }

	            if (isOnEdge) {
	              // if not just after delay
	              // |=====|---=====|---=====| >>>
	              //         ^1 ^2
	              // because we have already handled
	              // 1 and onRepeatComplete in delay gap
	              if (this.progress !== 1) {
	                this.setProgress(1);
	                this._repeatComplete(time);
	              }
	              // if on edge but not at very start
	              // |=====|=====|=====| >>>
	              // ^not  ^here ^here          
	              if (prevT >= 0) {
	                this._repeatStart(time);
	                this.setProgress(0);
	              }
	            }

	            if (isOnReverseEdge) {
	              // if on edge but not at very end
	              // |=====|=====|=====| <<<
	              //       ^here ^here ^not here    
	              if (this.progress !== 0 && prevT != TCount) {
	                this.setProgress(0);
	                this._repeatStart(time);
	              }

	              // if on very end edge
	              // |=====|=====|=====| <<<
	              //       ^!    ^!    ^here
	              if (prevT === TCount) {
	                this._complete(1, time);
	              }

	              this.setProgress(1);
	              this._repeatComplete(time);
	            }

	            if (prevT === "delay") {
	              // if just before delay gap
	              // |---=====|---=====|---=====| >>>
	              //               ^2    ^1
	              if (T < TPrevValue) {
	                this.setProgress(1);
	                this._repeatComplete(time);
	              }
	              // if just after delay gap
	              // |---=====|---=====|---=====| >>>
	              //            ^1  ^2
	              if (T === TPrevValue) {
	                this._repeatStart(time);
	                this.setProgress(0);
	              }
	            }

	            if (time !== props.endTime) {
	              this.setProgress(proc);
	            }

	            // if progress is equal 0 and progress grows
	            if (proc === 0) {
	              this._repeatStart(time);
	            }

	            if (time === props.startTime) {
	              this._start(0, time);
	            }

	            // yoyo
	          } else {}
	          // delay gap
	        } else {
	          // if was in active area and previous time was larger
	          if (this._isInActiveArea && time < this.prevTime) {
	            this.setProgress(0);
	            this._repeatStart(time);
	          }

	          this._isInActiveArea = false;
	          this.isRepeatStart = false;

	          this.o.isIt && console.log("in the delay gap");
	          // if yoyo and even period we should flip
	          // so set flipCoef to 1 if we need flip, otherwise to 0
	          var flipCoef = props.yoyo && T % 2 === 0 ? 1 : 0;
	          // if flip is 0 - bitwise XOR will leave the numbers as is,
	          // if flip is 1 - bitwise XOR will inverse the numbers
	          this.setProgress(this.prevTime < time ? 1 ^ flipCoef : 0 ^ flipCoef);
	          // if reverse direction and in delay gap, then progress will be 0
	          // if so we don't need to call the onRepeatComplete callback
	          // |=====|---=====|---=====| <<<
	          //         ^here    ^here  
	          if (this.progress !== 0) {
	            this._repeatComplete(time);
	          }
	        }
	        this._wasUknownUpdate = false;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    setProgress: {

	      /*
	        Method to set Tween's progress
	        @param {Number} Progress to set
	        @param {Boolean} ?
	      */
	      value: function setProgress(p) {
	        var isCallback = arguments[1] === undefined ? true : arguments[1];
	        this.progress = p;
	        this.easedProgress = this.props.easing(this.progress);
	        if (this.props.prevEasedProgress !== this.easedProgress && isCallback) {
	          if (this.onUpdate != null && typeof this.onUpdate === "function") {
	            this.o.isIt && console.log("********** ONUPDATE " + p + " **********");
	            this.onUpdate(this.easedProgress, this.progress);
	          }
	        }
	        this.props.prevEasedProgress = this.easedProgress;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    setProp: {

	      /*
	        Method to set property[s] on Tween
	        @param {Object, String} Hash object of key/value pairs, or property name
	        @param {_} Property's value to set
	      */
	      value: function setProp(obj, value) {
	        // handle hash object case
	        if (typeof obj === "object") {
	          for (var key in obj) {
	            if (Object.prototype.hasOwnProperty.call(obj, key)) {
	              this.props[key] = obj[key];
	              if (key === "easing") {
	                this.props.easing = easing.parseEasing(this.props.easing);
	              }
	            }
	          }
	          // handle key, value case
	        } else if (typeof obj === "string") {
	          // if key is easing - parse it immediately
	          if (obj === "easing") {
	            this.props.easing = easing.parseEasing(value);
	          }
	          // else just save it to props
	          else {
	            this.props[obj] = value;
	          }
	        }
	        this.calcDimentions();
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    play: {

	      /*
	        Method to run the Tween
	        @param  {Number} Start time
	        @return {Object} Self
	      */
	      value: function play(time) {
	        this.setStartTime(time);
	        !time && t.add(this); // this.state = 'play'
	        return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    stop: {

	      /*
	        Method to stop the Tween.
	        @returns {Object} Self
	      */
	      value: function stop() {
	        this.pause();this.setProgress(0);return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    pause: {

	      /*
	        Method to pause Tween.
	        @returns {Object} Self
	      */
	      value: function pause() {
	        this._removeFromTweener();return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _removeFromTweener: {

	      /*
	        Method to remove the Tween from the tweener.
	      */
	      value: function RemoveFromTweener() {
	        t.remove(this);return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _getPeriod: {

	      /*
	        Method to get current period number
	        @param {Number} Time to get the period for.
	      */
	      value: function GetPeriod(time) {
	        var p = this.props,
	            TTime = p.delay + p.duration,
	            dTime = time - p.startTime + p.delay,
	            T = Math.floor(dTime / TTime),
	            elapsed = dTime % TTime;

	        // if time is larger then the end time
	        if (time > p.endTime) {
	          // set equal to the periods count
	          T = (p.endTime - p.startTime + p.delay) / TTime;
	          // if in delay gap, set _delayT to current
	          // period number and return "delay"
	        } else if (elapsed > 0 && elapsed < p.delay) {
	          this._delayT = T;T = "delay";
	        }
	        // if the end of period and there is a delay
	        // if ( elapsed === 0 && T > 0 ) { T--; }
	        return T;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _visualizeProgress: {
	      value: function VisualizeProgress(time) {
	        var str = "|",
	            procStr = " ",
	            p = this.props,
	            proc = p.startTime - p.delay;

	        while (proc < p.endTime) {
	          if (p.delay > 0) {
	            var newProc = proc + p.delay;
	            if (time > proc && time < newProc) {
	              procStr += " ^ ";
	            } else {
	              procStr += "   ";
	            }
	            proc = newProc;
	            str += "---";
	          }
	          var newProc = proc + p.duration;
	          if (time > proc && time < newProc) {
	            procStr += "  ^   ";
	          } else if (time === proc) {
	            procStr += "^     ";
	          } else if (time === newProc) {
	            procStr += "    ^ ";
	          } else {
	            procStr += "      ";
	          }
	          proc = newProc;
	          str += "=====|";
	        }

	        console.log(str);
	        console.log(procStr);
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    }
	  });

	  return Tween;
	})();

	module.exports = Tween;
	// var isEvenPeriod = (T % 2 === 0);
	// // set 1 or 0 on periods' edge
	// if ( isOnEdge ) {
	//   this.setProgress( (isEvenPeriod) ? 0 : 1 );
	//   this._repeatComplete();
	// }
	// // if yoyo then check if the current duration
	// // period is even. If so set progress, otherwise
	// // set inverted proc value
	// this.setProgress( (isEvenPeriod) ? proc : 1-proc );

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _prototypeProperties = function (child, staticProps, instanceProps) {
	  if (staticProps) Object.defineProperties(child, staticProps);
	  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
	};

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var _core = _interopRequire(__webpack_require__(28));

	var h = _interopRequire(__webpack_require__(2));

	var t = _interopRequire(__webpack_require__(21));

	var Timeline = (function () {
	  function Timeline() {
	    var o = arguments[0] === undefined ? {} : arguments[0];
	    this.o = o;
	    this.vars();
	    this._extendDefaults();
	    return this;
	  }

	  _prototypeProperties(Timeline, null, {
	    vars: {
	      value: function vars() {
	        this.state = "stop";
	        this.defaults = { repeat: 0, delay: 0 };
	        this.timelines = [];
	        this.props = { time: 0, repeatTime: 0, shiftedRepeatTime: 0 };
	        this.loop = h.bind(this.loop, this);
	        this.onUpdate = this.o.onUpdate;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    add: {
	      value: function add() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        this.pushTimelineArray(args);return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    pushTimelineArray: {
	      value: function pushTimelineArray(array) {
	        for (var i = 0; i < array.length; i++) {
	          var tm = array[i];
	          // recursive push to handle arrays of arrays
	          if (h.isArray(tm)) {
	            this.pushTimelineArray(tm);
	          } else {
	            this.pushTimeline(tm);
	          }
	        };
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _extendDefaults: {

	      /*
	        Method to extend defaults by options and save
	        the result to props object
	      */
	      value: function ExtendDefaults() {
	        for (var key in this.defaults) {
	          if (this.defaults.hasOwnProperty(key)) {
	            this.props[key] = this.o[key] != null ? this.o[key] : this.defaults[key];
	          }
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    setProp: {

	      /*
	        Method to add a prop to the props object.
	      */
	      value: function setProp(props) {
	        for (var key in props) {
	          if (props.hasOwnProperty(key)) {
	            this.props[key] = props[key];
	          }
	        }
	        return this.recalcDuration();
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    pushTimeline: {
	      value: function pushTimeline(timeline, shift) {
	        // if timeline is a module with timeline property then extract it
	        if (timeline.timeline instanceof Timeline) {
	          timeline = timeline.timeline;
	        }
	        // add self delay to the timeline
	        shift != null && timeline.setProp({ shiftTime: shift });
	        this.timelines.push(timeline);
	        return this._recalcTimelineDuration(timeline);
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    remove: {
	      value: function remove(timeline) {
	        var index = this.timelines.indexOf(timeline);
	        if (index !== -1) {
	          this.timelines.splice(index, 1);
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    append: {

	      /*  Method to append the tween to the end of the
	          timeline. Each argument is treated as a new 
	          append. Array of tweens is treated as a parallel
	          sequence. 
	          @param {Object, Array} Tween to append or array of such.
	      */
	      value: function append() {
	        for (var _len2 = arguments.length, timeline = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          timeline[_key2] = arguments[_key2];
	        }

	        for (var _iterator = _core.$for.getIterator(timeline), _step; !(_step = _iterator.next()).done;) {
	          var tm = _step.value;
	          if (h.isArray(tm)) {
	            this._appendTimelineArray(tm);
	          } else this.appendTimeline(tm, this.timelines.length);
	        }

	        return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _appendTimelineArray: {
	      value: function AppendTimelineArray(timelineArray) {
	        var i = timelineArray.length;
	        var time = this.props.repeatTime - this.props.delay;
	        var len = this.timelines.length;

	        while (i--) {
	          this.appendTimeline(timelineArray[i], len, time);
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    appendTimeline: {
	      value: function appendTimeline(timeline, index, time) {
	        var shift = time != null ? time : this.props.time;
	        shift += timeline.props.shiftTime || 0;
	        timeline.index = index;this.pushTimeline(timeline, shift);
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    recalcDuration: {
	      value: function recalcDuration() {
	        var len = this.timelines.length;
	        this.props.time = 0;this.props.repeatTime = 0;this.props.shiftedRepeatTime = 0;
	        while (len--) {
	          this._recalcTimelineDuration(this.timelines[len]);
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _recalcTimelineDuration: {
	      value: function RecalcTimelineDuration(timeline) {
	        var timelineTime = timeline.props.repeatTime + (timeline.props.shiftTime || 0);
	        this.props.time = Math.max(timelineTime, this.props.time);
	        this.props.repeatTime = (this.props.time + this.props.delay) * (this.props.repeat + 1);
	        this.props.shiftedRepeatTime = this.props.repeatTime + (this.props.shiftTime || 0);
	        this.props.shiftedRepeatTime -= this.props.delay;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    update: {

	      /*  Method to take care of the current time.
	          @param {Number} The current time
	          @return {Undefined, Boolean} Returns true if the tween
	          had ended it execution so should be removed form the 
	          tweener's active tweens array
	      */
	      value: function update(time, isGrow) {
	        var props = this.props;
	        this.o.isIt && console.log("------------------------------------------------");
	        this.o.isIt && console.log("timeline:");
	        this.o.isIt && console.log("time: " + time + ", prevTime: " + this._previousUpdateTime);
	        this.o.isIt && console.log("start: " + props.startTime + ", end: " + props.endTime);
	        // don't go further then the endTime
	        if (time > this.props.endTime) {
	          time = this.props.endTime;
	        }
	        // return true if timeline was already completed
	        if (time === this.props.endTime && this.isCompleted) {
	          return true;
	        }
	        // set the time to timelines
	        this._updateTimelines(time, isGrow);
	        /*  check the callbacks for the current time
	            NOTE: _checkCallbacks method should be returned
	            from this update function, because it returns true
	            if the tween was completed, to indicate the tweener
	            module to remove it from the active tweens array for 
	            performance purposes
	        */
	        return this._checkCallbacks(time);
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _updateTimelines: {

	      /*
	        Method to set time on timelines,
	        with respect to repeat periods **if present**
	        @param {Number} Time to set
	      */
	      value: function UpdateTimelines(time, isGrow) {
	        // get elapsed with respect to repeat option
	        // so take a modulo of the elapsed time
	        var props = this.props;
	        var startPoint = props.startTime - props.delay;
	        var elapsed = (time - startPoint) % (props.delay + props.time);

	        var timeToTimelines = null;
	        // get the time for timelines
	        if (time === props.endTime) {
	          timeToTimelines = props.endTime;
	        }
	        // after delay
	        else if (startPoint + elapsed >= props.startTime) {
	          if (time >= props.endTime) {
	            timeToTimelines = props.endTime;
	          } else {
	            timeToTimelines = startPoint + elapsed;
	          }
	        } else {
	          if (time > props.startTime + props.time) {
	            timeToTimelines = props.startTime + props.time;
	          } else {
	            timeToTimelines = null;
	          }
	        }

	        // set the normalized time to the timelines
	        if (timeToTimelines != null) {
	          var i = -1,
	              len = this.timelines.length - 1;

	          // calculate current and previous periods
	          var delayDuration = props.delay + props.time;
	          var T = Math.floor((time - startPoint) / delayDuration);
	          var prevT = Math.floor((this._previousUpdateTime - startPoint) / delayDuration);

	          this.o.isIt && console.log("T: " + T + ", prevT: " + prevT);
	          // if on edge of the periods
	          if (T > 0 && T > prevT) {
	            // get the time we have missed
	            var missedTime = props.startTime + T * (props.delay + props.time);
	            // update child timelines with missed time
	            this.o.isIt && console.log("xxxxxxx missed time: " + missedTime + ", time: " + props.time);
	            var j = -1;
	            while (j++ < len) {
	              this.timelines[j].update(missedTime);
	            }
	          }

	          // if on edge of the periods
	          if (T < prevT) {
	            // get the time we have missed
	            var missedTime = props.startTime + T * (props.delay + props.time) - 2 * props.time;
	            // update child timelines with missed time
	            this.o.isIt && console.log("******* missed time: " + missedTime + ", time: " + props.time);
	            var j = -1;
	            while (j++ < len) {
	              this.timelines[j].update(missedTime);
	            }
	          }

	          // check if progress grows
	          isGrow = isGrow == null ? time > (this._previousUpdateTime || 0) : isGrow;
	          while (i++ < len) {
	            this.timelines[i].update(timeToTimelines, isGrow);
	          }
	        }
	        return this._previousUpdateTime = time;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    _checkCallbacks: {
	      /*
	        Method to check the callbacks
	        for the current time
	        @param {Number} The current time
	      */
	      value: function CheckCallbacks(time) {
	        // dont care about the multiple exact same time calls
	        if (this.prevTime === time) {
	          return;
	        }

	        // if there is no prevTime - so it wasnt called ever at all
	        // or if it was called but have been completed already
	        // and it wasnt started yet -- then start!
	        if (!this.prevTime || this.isCompleted && !this.isStarted) {
	          if (this.o.onStart != null && typeof this.o.onStart === "function") {
	            this.o.onStart.apply(this);
	          }
	          this.isStarted = true;this.isCompleted = false;
	        }
	        // if isn't complete
	        if (time >= this.props.startTime && time < this.props.endTime) {
	          if (this.onUpdate != null && typeof this.onUpdate === "function") {
	            this.onUpdate((time - this.props.startTime) / this.props.repeatTime);
	          }
	        }

	        // if reverse completed
	        if (this.prevTime > time && time <= this.props.startTime) {
	          if (this.o.onReverseComplete != null && typeof this.o.onReverseComplete === "function") {
	            this.o.onReverseComplete.apply(this);
	          }
	        }

	        // save the current time as previous for future
	        this.prevTime = time;
	        // if completed
	        if (time === this.props.endTime && !this.isCompleted) {
	          if (this.onUpdate != null && typeof this.onUpdate === "function") {
	            this.onUpdate(1);
	          }
	          if (this.o.onComplete != null && typeof this.o.onComplete === "function") {
	            this.o.onComplete.apply(this);
	          }
	          this.isCompleted = true;this.isStarted = false;return true;
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    play: {
	      value: function play(time) {
	        this.setStartTime(time);
	        if (!time) {
	          t.add(this);this.state = "play";
	        };
	        return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    pause: {
	      value: function pause() {
	        this.removeFromTweener();this.state = "pause";return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    stop: {
	      value: function stop() {
	        this.removeFromTweener();this.setProgress(0);
	        this.state = "stop";return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    restart: {
	      value: function restart() {
	        this.stop();this.play();return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    removeFromTweener: {
	      value: function removeFromTweener() {
	        t.remove(this);return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    setStartTime: {
	      value: function setStartTime(time) {
	        this.getDimentions(time);this.startTimelines(this.props.startTime);
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    startTimelines: {
	      value: function startTimelines(time) {
	        var i = this.timelines.length;
	        time == null && (time = this.props.startTime);
	        while (i--) {
	          this.timelines[i].setStartTime(time);
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    setProgress: {
	      value: function setProgress(progress) {
	        if (this.props.startTime == null) {
	          this.setStartTime();
	        }
	        progress = h.clamp(progress, 0, 1);
	        this.update(this.props.startTime + progress * this.props.repeatTime);
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    getDimentions: {
	      value: function getDimentions(time) {
	        time = time == null ? performance.now() : time;
	        this.props.startTime = time + this.props.delay + (this.props.shiftTime || 0);
	        this.props.endTime = this.props.startTime + this.props.shiftedRepeatTime;
	        this.props.endTime -= this.props.shiftTime || 0;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    }
	  });

	  return Timeline;
	})();

	module.exports = Timeline;


	/*
	  Method to append the tween to the end of the
	  timeline. Each argument is treated as a new 
	  append. Array of tweens is treated as a parallel
	  sequence. 
	  @param {Object, Array} Tween to append or array of such.
	*/

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _prototypeProperties = function (child, staticProps, instanceProps) {
	  if (staticProps) Object.defineProperties(child, staticProps);
	  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
	};

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var _core = _interopRequire(__webpack_require__(28));

	__webpack_require__(26);
	__webpack_require__(27);
	var h = _interopRequire(__webpack_require__(2));

	var Tweener = (function () {
	  function Tweener() {
	    this.vars();return this;
	  }

	  _prototypeProperties(Tweener, null, {
	    vars: {
	      value: function vars() {
	        this.tweens = [];this.loop = h.bind(this.loop, this);
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    loop: {
	      value: function loop() {
	        if (!this.isRunning) {
	          return false;
	        }
	        var time = performance.now();this.update(time);
	        if (!this.tweens.length) {
	          return this.isRunning = false;
	        }
	        requestAnimationFrame(this.loop);
	        return this;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    startLoop: {
	      value: function startLoop() {
	        if (this.isRunning) {
	          return;
	        };this.isRunning = true;
	        requestAnimationFrame(this.loop);
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    stopLoop: {
	      value: function stopLoop() {
	        this.isRunning = false;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    update: {
	      value: function update(time) {
	        var i = this.tweens.length;
	        while (i--) {
	          if (this.tweens[i].update(time) === true) {
	            this.remove(i);
	          }
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    add: {
	      value: function add(tween) {
	        this.tweens.push(tween);this.startLoop();
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    removeAll: {
	      value: function removeAll() {
	        this.tweens.length = 0;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    remove: {
	      value: function remove(tween) {
	        var index = typeof tween === "number" ? tween : this.tweens.indexOf(tween);

	        if (index !== -1) {
	          this.tweens.splice(index, 1);
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    }
	  });

	  return Tweener;
	})();

	var t = new Tweener();
	module.exports = t;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	/*!
	  LegoMushroom @legomushroom http://legomushroom.com
	  MIT License 2014
	 */

	/* istanbul ignore next */
	(function() {
	  var Main;
	  Main = (function() {
	    function Main(o) {
	      this.o = o != null ? o : {};
	      if (window.isAnyResizeEventInited) {
	        return;
	      }
	      this.vars();
	      this.redefineProto();
	    }

	    Main.prototype.vars = function() {
	      window.isAnyResizeEventInited = true;
	      this.allowedProtos = [HTMLDivElement, HTMLFormElement, HTMLLinkElement, HTMLBodyElement, HTMLParagraphElement, HTMLFieldSetElement, HTMLLegendElement, HTMLLabelElement, HTMLButtonElement, HTMLUListElement, HTMLOListElement, HTMLLIElement, HTMLHeadingElement, HTMLQuoteElement, HTMLPreElement, HTMLBRElement, HTMLFontElement, HTMLHRElement, HTMLModElement, HTMLParamElement, HTMLMapElement, HTMLTableElement, HTMLTableCaptionElement, HTMLImageElement, HTMLTableCellElement, HTMLSelectElement, HTMLInputElement, HTMLTextAreaElement, HTMLAnchorElement, HTMLObjectElement, HTMLTableColElement, HTMLTableSectionElement, HTMLTableRowElement];
	      return this.timerElements = {
	        img: 1,
	        textarea: 1,
	        input: 1,
	        embed: 1,
	        object: 1,
	        svg: 1,
	        canvas: 1,
	        tr: 1,
	        tbody: 1,
	        thead: 1,
	        tfoot: 1,
	        a: 1,
	        select: 1,
	        option: 1,
	        optgroup: 1,
	        dl: 1,
	        dt: 1,
	        br: 1,
	        basefont: 1,
	        font: 1,
	        col: 1,
	        iframe: 1
	      };
	    };

	    Main.prototype.redefineProto = function() {
	      var i, it, proto, t;
	      it = this;
	      return t = (function() {
	        var j, len, ref, results;
	        ref = this.allowedProtos;
	        results = [];
	        for (i = j = 0, len = ref.length; j < len; i = ++j) {
	          proto = ref[i];
	          if (proto.prototype == null) {
	            continue;
	          }
	          results.push((function(proto) {
	            var listener, remover;
	            listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
	            (function(listener) {
	              var wrappedListener;
	              wrappedListener = function() {
	                var option;
	                if (this !== window || this !== document) {
	                  option = arguments[0] === 'onresize' && !this.isAnyResizeEventInited;
	                  option && it.handleResize({
	                    args: arguments,
	                    that: this
	                  });
	                }
	                return listener.apply(this, arguments);
	              };
	              if (proto.prototype.addEventListener) {
	                return proto.prototype.addEventListener = wrappedListener;
	              } else if (proto.prototype.attachEvent) {
	                return proto.prototype.attachEvent = wrappedListener;
	              }
	            })(listener);
	            remover = proto.prototype.removeEventListener || proto.prototype.detachEvent;
	            return (function(remover) {
	              var wrappedRemover;
	              wrappedRemover = function() {
	                this.isAnyResizeEventInited = false;
	                this.iframe && this.removeChild(this.iframe);
	                return remover.apply(this, arguments);
	              };
	              if (proto.prototype.removeEventListener) {
	                return proto.prototype.removeEventListener = wrappedRemover;
	              } else if (proto.prototype.detachEvent) {
	                return proto.prototype.detachEvent = wrappedListener;
	              }
	            })(remover);
	          })(proto));
	        }
	        return results;
	      }).call(this);
	    };

	    Main.prototype.handleResize = function(args) {
	      var computedStyle, el, iframe, isEmpty, isNoPos, isStatic, ref;
	      el = args.that;
	      if (!this.timerElements[el.tagName.toLowerCase()]) {
	        iframe = document.createElement('iframe');
	        el.appendChild(iframe);
	        iframe.style.width = '100%';
	        iframe.style.height = '100%';
	        iframe.style.position = 'absolute';
	        iframe.style.zIndex = -999;
	        iframe.style.opacity = 0;
	        iframe.style.top = 0;
	        iframe.style.left = 0;
	        computedStyle = window.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
	        isNoPos = el.style.position === '';
	        isStatic = computedStyle.position === 'static' && isNoPos;
	        isEmpty = computedStyle.position === '' && el.style.position === '';
	        if (isStatic || isEmpty) {
	          el.style.position = 'relative';
	        }
	        if ((ref = iframe.contentWindow) != null) {
	          ref.onresize = (function(_this) {
	            return function(e) {
	              return _this.dispatchEvent(el);
	            };
	          })(this);
	        }
	        el.iframe = iframe;
	      } else {
	        this.initTimer(el);
	      }
	      return el.isAnyResizeEventInited = true;
	    };

	    Main.prototype.initTimer = function(el) {
	      var height, width;
	      width = 0;
	      height = 0;
	      return this.interval = setInterval((function(_this) {
	        return function() {
	          var newHeight, newWidth;
	          newWidth = el.offsetWidth;
	          newHeight = el.offsetHeight;
	          if (newWidth !== width || newHeight !== height) {
	            _this.dispatchEvent(el);
	            width = newWidth;
	            return height = newHeight;
	          }
	        };
	      })(this), this.o.interval || 62.5);
	    };

	    Main.prototype.dispatchEvent = function(el) {
	      var e;
	      if (document.createEvent) {
	        e = document.createEvent('HTMLEvents');
	        e.initEvent('onresize', false, false);
	        return el.dispatchEvent(e);
	      } else if (document.createEventObject) {
	        e = document.createEventObject();
	        return el.fireEvent('onresize', e);
	      } else {
	        return false;
	      }
	    };

	    Main.prototype.destroy = function() {
	      var i, it, j, len, proto, ref, results;
	      clearInterval(this.interval);
	      this.interval = null;
	      window.isAnyResizeEventInited = false;
	      it = this;
	      ref = this.allowedProtos;
	      results = [];
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        proto = ref[i];
	        if (proto.prototype == null) {
	          continue;
	        }
	        results.push((function(proto) {
	          var listener;
	          listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
	          if (proto.prototype.addEventListener) {
	            proto.prototype.addEventListener = Element.prototype.addEventListener;
	          } else if (proto.prototype.attachEvent) {
	            proto.prototype.attachEvent = Element.prototype.attachEvent;
	          }
	          if (proto.prototype.removeEventListener) {
	            return proto.prototype.removeEventListener = Element.prototype.removeEventListener;
	          } else if (proto.prototype.detachEvent) {
	            return proto.prototype.detachEvent = Element.prototype.detachEvent;
	          }
	        })(proto));
	      }
	      return results;
	    };

	    return Main;

	  })();
	  if (true) {
	    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return new Main;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "object") && (typeof module.exports === "object")) {
	    return module.exports = new Main;
	  } else {
	    if (typeof window !== "undefined" && window !== null) {
	      window.AnyResizeEvent = Main;
	    }
	    return typeof window !== "undefined" && window !== null ? window.anyResizeEvent = new Main : void 0;
	  }
	})();


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var BezierEasing, bezierEasing, h,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	h = __webpack_require__(2);


	/**
	 * Copyright (c) 2014 Gaëtan Renaudeau http://goo.gl/El3k7u
	 * Adopted from https://github.com/gre/bezier-easing
	 */

	BezierEasing = (function() {
	  function BezierEasing(o) {
	    this.vars();
	    return this.generate;
	  }

	  BezierEasing.prototype.vars = function() {
	    return this.generate = h.bind(this.generate, this);
	  };

	  BezierEasing.prototype.generate = function(mX1, mY1, mX2, mY2) {
	    var A, B, C, NEWTON_ITERATIONS, NEWTON_MIN_SLOPE, SUBDIVISION_MAX_ITERATIONS, SUBDIVISION_PRECISION, _precomputed, arg, binarySubdivide, calcBezier, calcSampleValues, f, float32ArraySupported, getSlope, getTForX, i, j, kSampleStepSize, kSplineTableSize, mSampleValues, newtonRaphsonIterate, precompute, str;
	    if (arguments.length < 4) {
	      return this.error('Bezier function expects 4 arguments');
	    }
	    for (i = j = 0; j < 4; i = ++j) {
	      arg = arguments[i];
	      if (typeof arg !== "number" || isNaN(arg) || !isFinite(arg)) {
	        return this.error('Bezier function expects 4 arguments');
	      }
	    }
	    if (mX1 < 0 || mX1 > 1 || mX2 < 0 || mX2 > 1) {
	      return this.error('Bezier x values should be > 0 and < 1');
	    }
	    NEWTON_ITERATIONS = 4;
	    NEWTON_MIN_SLOPE = 0.001;
	    SUBDIVISION_PRECISION = 0.0000001;
	    SUBDIVISION_MAX_ITERATIONS = 10;
	    kSplineTableSize = 11;
	    kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
	    float32ArraySupported = indexOf.call(global, 'Float32Array') >= 0;
	    A = function(aA1, aA2) {
	      return 1.0 - 3.0 * aA2 + 3.0 * aA1;
	    };
	    B = function(aA1, aA2) {
	      return 3.0 * aA2 - 6.0 * aA1;
	    };
	    C = function(aA1) {
	      return 3.0 * aA1;
	    };
	    calcBezier = function(aT, aA1, aA2) {
	      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
	    };
	    getSlope = function(aT, aA1, aA2) {
	      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
	    };
	    newtonRaphsonIterate = function(aX, aGuessT) {
	      var currentSlope, currentX;
	      i = 0;
	      while (i < NEWTON_ITERATIONS) {
	        currentSlope = getSlope(aGuessT, mX1, mX2);

	        /* istanbul ignore if */
	        if (currentSlope === 0.0) {
	          return aGuessT;
	        }
	        currentX = calcBezier(aGuessT, mX1, mX2) - aX;
	        aGuessT -= currentX / currentSlope;
	        ++i;
	      }
	      return aGuessT;
	    };
	    calcSampleValues = function() {
	      i = 0;
	      while (i < kSplineTableSize) {
	        mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	        ++i;
	      }
	    };

	    /* istanbul ignore next */
	    binarySubdivide = function(aX, aA, aB) {
	      var currentT, currentX, isBig;
	      currentX = void 0;
	      currentT = void 0;
	      i = 0;
	      while (true) {
	        currentT = aA + (aB - aA) / 2.0;
	        currentX = calcBezier(currentT, mX1, mX2) - aX;
	        if (currentX > 0.0) {
	          aB = currentT;
	        } else {
	          aA = currentT;
	        }
	        isBig = Math.abs(currentX) > SUBDIVISION_PRECISION;
	        if (!(isBig && ++i < SUBDIVISION_MAX_ITERATIONS)) {
	          break;
	        }
	      }
	      return currentT;
	    };
	    getTForX = function(aX) {
	      var currentSample, delta, dist, guessForT, initialSlope, intervalStart, lastSample;
	      intervalStart = 0.0;
	      currentSample = 1;
	      lastSample = kSplineTableSize - 1;
	      while (currentSample !== lastSample && mSampleValues[currentSample] <= aX) {
	        intervalStart += kSampleStepSize;
	        ++currentSample;
	      }
	      --currentSample;
	      delta = mSampleValues[currentSample + 1] - mSampleValues[currentSample];
	      dist = (aX - mSampleValues[currentSample]) / delta;
	      guessForT = intervalStart + dist * kSampleStepSize;
	      initialSlope = getSlope(guessForT, mX1, mX2);
	      if (initialSlope >= NEWTON_MIN_SLOPE) {
	        return newtonRaphsonIterate(aX, guessForT);
	      } else {

	        /* istanbul ignore next */
	        if (initialSlope === 0.0) {
	          return guessForT;
	        } else {
	          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
	        }
	      }
	    };
	    precompute = function() {
	      var _precomputed;
	      _precomputed = true;
	      if (mX1 !== mY1 || mX2 !== mY2) {
	        return calcSampleValues();
	      }
	    };
	    mSampleValues = !float32ArraySupported ? new Array(kSplineTableSize) : new Float32Array(kSplineTableSize);
	    _precomputed = false;
	    f = function(aX) {
	      if (!_precomputed) {
	        precompute();
	      }
	      if (mX1 === mY1 && mX2 === mY2) {
	        return aX;
	      }
	      if (aX === 0) {
	        return 0;
	      }
	      if (aX === 1) {
	        return 1;
	      }
	      return calcBezier(getTForX(aX), mY1, mY2);
	    };
	    str = "bezier(" + [mX1, mY1, mX2, mY2] + ")";
	    f.toStr = function() {
	      return str;
	    };
	    return f;
	  };

	  BezierEasing.prototype.error = function(msg) {
	    return h.error(msg);
	  };

	  return BezierEasing;

	})();

	bezierEasing = new BezierEasing;

	module.exports = bezierEasing;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var PathEasing, h;

	h = __webpack_require__(2);

	PathEasing = (function() {
	  PathEasing.prototype._vars = function() {
	    this._precompute = h.clamp(this.o.precompute || 1450, 100, 10000);
	    this._step = 1 / this._precompute;
	    this._rect = this.o.rect || 100;
	    this._approximateMax = this.o.approximateMax || 5;
	    this._eps = this.o.eps || 0.001;
	    return this._boundsPrevProgress = -1;
	  };

	  function PathEasing(path, o1) {
	    this.o = o1 != null ? o1 : {};
	    if (path === 'creator') {
	      return;
	    }
	    this.path = h.parsePath(path);
	    if (this.path == null) {
	      return h.error('Error while parsing the path');
	    }
	    this._vars();
	    this.path.setAttribute('d', this._normalizePath(this.path.getAttribute('d')));
	    this.pathLength = this.path.getTotalLength();
	    this.sample = h.bind(this.sample, this);
	    this._hardSample = h.bind(this._hardSample, this);
	    this._preSample();
	    this;
	  }

	  PathEasing.prototype._preSample = function() {
	    var i, j, length, point, progress, ref, results;
	    this._samples = [];
	    results = [];
	    for (i = j = 0, ref = this._precompute; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      progress = i * this._step;
	      length = this.pathLength * progress;
	      point = this.path.getPointAtLength(length);
	      results.push(this._samples[i] = {
	        point: point,
	        length: length,
	        progress: progress
	      });
	    }
	    return results;
	  };

	  PathEasing.prototype._findBounds = function(array, p) {
	    var buffer, direction, end, i, j, len, loopEnd, pointP, pointX, ref, ref1, start, value;
	    if (p === this._boundsPrevProgress) {
	      return this._prevBounds;
	    }
	    if (this._boundsStartIndex == null) {
	      this._boundsStartIndex = 0;
	    }
	    len = array.length;
	    if (this._boundsPrevProgress > p) {
	      loopEnd = 0;
	      direction = 'reverse';
	    } else {
	      loopEnd = len;
	      direction = 'forward';
	    }
	    if (direction === 'forward') {
	      start = array[0];
	      end = array[array.length - 1];
	    } else {
	      start = array[array.length - 1];
	      end = array[0];
	    }
	    for (i = j = ref = this._boundsStartIndex, ref1 = loopEnd; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
	      value = array[i];
	      pointX = value.point.x / this._rect;
	      pointP = p;
	      if (direction === 'reverse') {
	        buffer = pointX;
	        pointX = pointP;
	        pointP = buffer;
	      }
	      if (pointX < pointP) {
	        start = value;
	        this._boundsStartIndex = i;
	      } else {
	        end = value;
	        break;
	      }
	    }
	    this._boundsPrevProgress = p;
	    return this._prevBounds = {
	      start: start,
	      end: end
	    };
	  };

	  PathEasing.prototype.sample = function(p) {
	    var bounds, res;
	    p = h.clamp(p, 0, 1);
	    bounds = this._findBounds(this._samples, p);
	    res = this._checkIfBoundsCloseEnough(p, bounds);
	    if (res != null) {
	      return res;
	    }
	    return this._findApproximate(p, bounds.start, bounds.end);
	  };

	  PathEasing.prototype._checkIfBoundsCloseEnough = function(p, bounds) {
	    var point, y;
	    point = void 0;
	    y = this._checkIfPointCloseEnough(p, bounds.start.point);
	    if (y != null) {
	      return y;
	    }
	    return this._checkIfPointCloseEnough(p, bounds.end.point);
	  };

	  PathEasing.prototype._checkIfPointCloseEnough = function(p, point) {
	    if (h.closeEnough(p, point.x / this._rect, this._eps)) {
	      return this._resolveY(point);
	    }
	  };

	  PathEasing.prototype._approximate = function(start, end, p) {
	    var deltaP, percentP;
	    deltaP = end.point.x - start.point.x;
	    percentP = (p - (start.point.x / this._rect)) / (deltaP / this._rect);
	    return start.length + percentP * (end.length - start.length);
	  };

	  PathEasing.prototype._findApproximate = function(p, start, end, approximateMax) {
	    var approximation, args, newPoint, point, x;
	    if (approximateMax == null) {
	      approximateMax = this._approximateMax;
	    }
	    approximation = this._approximate(start, end, p);
	    point = this.path.getPointAtLength(approximation);
	    x = point.x / this._rect;
	    if (h.closeEnough(p, x, this._eps)) {
	      return this._resolveY(point);
	    } else {
	      if (--approximateMax < 1) {
	        return this._resolveY(point);
	      }
	      newPoint = {
	        point: point,
	        length: approximation
	      };
	      args = p < x ? [p, start, newPoint, approximateMax] : [p, newPoint, end, approximateMax];
	      return this._findApproximate.apply(this, args);
	    }
	  };

	  PathEasing.prototype._resolveY = function(point) {
	    return 1 - (point.y / this._rect);
	  };

	  PathEasing.prototype._normalizePath = function(path) {
	    var commands, endIndex, normalizedPath, points, startIndex, svgCommandsRegexp;
	    svgCommandsRegexp = /[M|L|H|V|C|S|Q|T|A]/gim;
	    points = path.split(svgCommandsRegexp);
	    points.shift();
	    commands = path.match(svgCommandsRegexp);
	    startIndex = 0;
	    points[startIndex] = this._normalizeSegment(points[startIndex]);
	    endIndex = points.length - 1;
	    points[endIndex] = this._normalizeSegment(points[endIndex], this._rect || 100);
	    return normalizedPath = this._joinNormalizedPath(commands, points);
	  };

	  PathEasing.prototype._joinNormalizedPath = function(commands, points) {
	    var command, i, j, len1, normalizedPath, space;
	    normalizedPath = '';
	    for (i = j = 0, len1 = commands.length; j < len1; i = ++j) {
	      command = commands[i];
	      space = i === 0 ? '' : ' ';
	      normalizedPath += "" + space + command + (points[i].trim());
	    }
	    return normalizedPath;
	  };

	  PathEasing.prototype._normalizeSegment = function(segment, value) {
	    var i, j, lastPoint, len1, nRgx, pairs, parsedX, point, space, x;
	    if (value == null) {
	      value = 0;
	    }
	    segment = segment.trim();
	    nRgx = /(-|\+)?((\d+(\.(\d|\e(-|\+)?)+)?)|(\.?(\d|\e|(\-|\+))+))/gim;
	    pairs = this._getSegmentPairs(segment.match(nRgx));
	    lastPoint = pairs[pairs.length - 1];
	    x = lastPoint[0];
	    parsedX = Number(x);
	    if (parsedX !== value) {
	      segment = '';
	      lastPoint[0] = value;
	      for (i = j = 0, len1 = pairs.length; j < len1; i = ++j) {
	        point = pairs[i];
	        space = i === 0 ? '' : ' ';
	        segment += "" + space + point[0] + "," + point[1];
	      }
	    }
	    return segment;
	  };

	  PathEasing.prototype._getSegmentPairs = function(array) {
	    var i, j, len1, newArray, pair, value;
	    if (array.length % 2 !== 0) {
	      h.error('Failed to parse the path - segment pairs are not even.', array);
	    }
	    newArray = [];
	    for (i = j = 0, len1 = array.length; j < len1; i = j += 2) {
	      value = array[i];
	      pair = [array[i], array[i + 1]];
	      newArray.push(pair);
	    }
	    return newArray;
	  };

	  PathEasing.prototype.create = function(path, o) {
	    var handler;
	    handler = new PathEasing(path, o);
	    handler.sample.path = handler.path;
	    return handler.sample;
	  };

	  return PathEasing;

	})();

	module.exports = PathEasing;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var create, easing, getNearest, mix, parseIfEasing, sort,
	  slice = [].slice;

	easing = null;

	parseIfEasing = function(item) {
	  if (typeof item.value === 'number') {
	    return item.value;
	  } else {
	    return easing.parseEasing(item.value);
	  }
	};

	sort = function(a, b) {
	  var returnValue;
	  a.value = parseIfEasing(a);
	  b.value = parseIfEasing(b);
	  returnValue = 0;
	  a.to < b.to && (returnValue = -1);
	  a.to > b.to && (returnValue = 1);
	  return returnValue;
	};

	getNearest = function(array, progress) {
	  var i, index, j, len, value;
	  index = 0;
	  for (i = j = 0, len = array.length; j < len; i = ++j) {
	    value = array[i];
	    index = i;
	    if (value.to > progress) {
	      break;
	    }
	  }
	  return index;
	};

	mix = function() {
	  var args;
	  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	  if (args.length > 1) {
	    args = args.sort(sort);
	  } else {
	    args[0].value = parseIfEasing(args[0]);
	  }
	  return function(progress) {
	    var index, value;
	    index = getNearest(args, progress);
	    if (index !== -1) {
	      value = args[index].value;
	      if (index === args.length - 1 && progress > args[index].to) {
	        return 1;
	      }
	      if (typeof value === 'function') {
	        return value(progress);
	      } else {
	        return value;
	      }
	    }
	  };
	};

	create = function(e) {
	  easing = e;
	  return mix;
	};

	module.exports = create;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	(function() {
	  'use strict';
	  var cancel, i, isOldBrowser, lastTime, vendors, vp, w;
	  vendors = ['webkit', 'moz'];
	  i = 0;
	  w = window;
	  while (i < vendors.length && !w.requestAnimationFrame) {
	    vp = vendors[i];
	    w.requestAnimationFrame = w[vp + 'RequestAnimationFrame'];
	    cancel = w[vp + 'CancelAnimationFrame'];
	    w.cancelAnimationFrame = cancel || w[vp + 'CancelRequestAnimationFrame'];
	    ++i;
	  }
	  isOldBrowser = !w.requestAnimationFrame || !w.cancelAnimationFrame;
	  if (/iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent) || isOldBrowser) {
	    lastTime = 0;
	    w.requestAnimationFrame = function(callback) {
	      var nextTime, now;
	      now = Date.now();
	      nextTime = Math.max(lastTime + 16, now);
	      return setTimeout((function() {
	        callback(lastTime = nextTime);
	      }), nextTime - now);
	    };
	    w.cancelAnimationFrame = clearTimeout;
	  }
	})();


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	(function(root) {
	  var offset, ref, ref1;
	  if (root.performance == null) {
	    root.performance = {};
	  }
	  Date.now = Date.now || function() {
	    return (new Date).getTime();
	  };
	  if (root.performance.now == null) {
	    offset = ((ref = root.performance) != null ? (ref1 = ref.timing) != null ? ref1.navigationStart : void 0 : void 0) ? performance.timing.navigationStart : Date.now();
	    return root.performance.now = function() {
	      return Date.now() - offset;
	    };
	  }
	})(window);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Core.js 0.4.10
	 * https://github.com/zloirock/core-js
	 * License: http://rock.mit-license.org
	 * © 2015 Denis Pushkarev
	 */
	!function(global, framework, undefined){
	'use strict';

	/******************************************************************************
	 * Module : common                                                            *
	 ******************************************************************************/

	  // Shortcuts for [[Class]] & property names
	var OBJECT          = 'Object'
	  , FUNCTION        = 'Function'
	  , ARRAY           = 'Array'
	  , STRING          = 'String'
	  , NUMBER          = 'Number'
	  , REGEXP          = 'RegExp'
	  , DATE            = 'Date'
	  , MAP             = 'Map'
	  , SET             = 'Set'
	  , WEAKMAP         = 'WeakMap'
	  , WEAKSET         = 'WeakSet'
	  , SYMBOL          = 'Symbol'
	  , PROMISE         = 'Promise'
	  , MATH            = 'Math'
	  , ARGUMENTS       = 'Arguments'
	  , PROTOTYPE       = 'prototype'
	  , CONSTRUCTOR     = 'constructor'
	  , TO_STRING       = 'toString'
	  , TO_STRING_TAG   = TO_STRING + 'Tag'
	  , TO_LOCALE       = 'toLocaleString'
	  , HAS_OWN         = 'hasOwnProperty'
	  , FOR_EACH        = 'forEach'
	  , ITERATOR        = 'iterator'
	  , FF_ITERATOR     = '@@' + ITERATOR
	  , PROCESS         = 'process'
	  , CREATE_ELEMENT  = 'createElement'
	  // Aliases global objects and prototypes
	  , Function        = global[FUNCTION]
	  , Object          = global[OBJECT]
	  , Array           = global[ARRAY]
	  , String          = global[STRING]
	  , Number          = global[NUMBER]
	  , RegExp          = global[REGEXP]
	  , Date            = global[DATE]
	  , Map             = global[MAP]
	  , Set             = global[SET]
	  , WeakMap         = global[WEAKMAP]
	  , WeakSet         = global[WEAKSET]
	  , Symbol          = global[SYMBOL]
	  , Math            = global[MATH]
	  , TypeError       = global.TypeError
	  , setTimeout      = global.setTimeout
	  , setImmediate    = global.setImmediate
	  , clearImmediate  = global.clearImmediate
	  , process         = global[PROCESS]
	  , nextTick        = process && process.nextTick
	  , document        = global.document
	  , html            = document && document.documentElement
	  , navigator       = global.navigator
	  , define          = global.define
	  , ArrayProto      = Array[PROTOTYPE]
	  , ObjectProto     = Object[PROTOTYPE]
	  , FunctionProto   = Function[PROTOTYPE]
	  , Infinity        = 1 / 0
	  , DOT             = '.';

	// http://jsperf.com/core-js-isobject
	function isObject(it){
	  return it != null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	// Native function?
	var isNative = ctx(/./.test, /\[native code\]\s*\}\s*$/, 1);

	// Object internal [[Class]] or toStringTag
	// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring
	var buildIn = {
	  Undefined: 1, Null: 1, Array: 1, String: 1, Arguments: 1,
	  Function: 1, Error: 1, Boolean: 1, Number: 1, Date: 1, RegExp:1 
	} , toString = ObjectProto[TO_STRING];
	function setToStringTag(it, tag, stat){
	  if(it && !has(it = stat ? it : it[PROTOTYPE], SYMBOL_TAG))hidden(it, SYMBOL_TAG, tag);
	}
	function cof(it){
	  return it == undefined ? it === undefined
	    ? 'Undefined' : 'Null' : toString.call(it).slice(8, -1);
	}
	function classof(it){
	  var klass = cof(it), tag;
	  return klass == OBJECT && (tag = it[SYMBOL_TAG]) ? has(buildIn, tag) ? '~' + tag : tag : klass;
	}

	// Function
	var call  = FunctionProto.call
	  , apply = FunctionProto.apply
	  , REFERENCE_GET;
	// Partial apply
	function part(/* ...args */){
	  var fn     = assertFunction(this)
	    , length = arguments.length
	    , args   = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((args[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that    = this
	      , _length = arguments.length
	      , i = 0, j = 0, _args;
	    if(!holder && !_length)return invoke(fn, args, that);
	    _args = args.slice();
	    if(holder)for(;length > i; i++)if(_args[i] === _)_args[i] = arguments[j++];
	    while(_length > j)_args.push(arguments[j++]);
	    return invoke(fn, _args, that);
	  }
	}
	// Optional / simple context binding
	function ctx(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    }
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    }
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    }
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	  }
	}
	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	function invoke(fn, args, that){
	  var un = that === undefined;
	  switch(args.length | 0){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	}
	function construct(target, argumentsList /*, newTarget*/){
	  var proto    = assertFunction(arguments.length < 3 ? target : arguments[2])[PROTOTYPE]
	    , instance = create(isObject(proto) ? proto : ObjectProto)
	    , result   = apply.call(target, instance, argumentsList);
	  return isObject(result) ? result : instance;
	}

	// Object:
	var create           = Object.create
	  , getPrototypeOf   = Object.getPrototypeOf
	  , setPrototypeOf   = Object.setPrototypeOf
	  , defineProperty   = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , getOwnDescriptor = Object.getOwnPropertyDescriptor
	  , getKeys          = Object.keys
	  , getNames         = Object.getOwnPropertyNames
	  , getSymbols       = Object.getOwnPropertySymbols
	  , isFrozen         = Object.isFrozen
	  , has              = ctx(call, ObjectProto[HAS_OWN], 2)
	  // Dummy, fix for not array-like ES3 string in es5 module
	  , ES5Object        = Object
	  , Dict;
	function toObject(it){
	  return ES5Object(assertDefined(it));
	}
	function returnIt(it){
	  return it;
	}
	function returnThis(){
	  return this;
	}
	function get(object, key){
	  if(has(object, key))return object[key];
	}
	function ownKeys(it){
	  assertObject(it);
	  return getSymbols ? getNames(it).concat(getSymbols(it)) : getNames(it);
	}
	// 19.1.2.1 Object.assign(target, source, ...)
	var assign = Object.assign || function(target, source){
	  var T = Object(assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = ES5Object(arguments[i++])
	      , keys   = getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	}
	function keyOf(object, el){
	  var O      = toObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	}

	// Array
	// array('str1,str2,str3') => ['str1', 'str2', 'str3']
	function array(it){
	  return String(it).split(',');
	}
	var push    = ArrayProto.push
	  , unshift = ArrayProto.unshift
	  , slice   = ArrayProto.slice
	  , splice  = ArrayProto.splice
	  , indexOf = ArrayProto.indexOf
	  , forEach = ArrayProto[FOR_EACH];
	/*
	 * 0 -> forEach
	 * 1 -> map
	 * 2 -> filter
	 * 3 -> some
	 * 4 -> every
	 * 5 -> find
	 * 6 -> findIndex
	 */
	function createArrayMethod(type){
	  var isMap       = type == 1
	    , isFilter    = type == 2
	    , isSome      = type == 3
	    , isEvery     = type == 4
	    , isFindIndex = type == 6
	    , noholes     = type == 5 || isFindIndex;
	  return function(callbackfn/*, that = undefined */){
	    var O      = Object(assertDefined(this))
	      , that   = arguments[1]
	      , self   = ES5Object(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = isMap ? Array(length) : isFilter ? [] : undefined
	      , val, res;
	    for(;length > index; index++)if(noholes || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(type){
	        if(isMap)result[index] = res;             // map
	        else if(res)switch(type){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(isEvery)return false;           // every
	      }
	    }
	    return isFindIndex ? -1 : isSome || isEvery ? isEvery : result;
	  }
	}
	function createArrayContains(isContains){
	  return function(el /*, fromIndex = 0 */){
	    var O      = toObject(this)
	      , length = toLength(O.length)
	      , index  = toIndex(arguments[1], length);
	    if(isContains && el != el){
	      for(;length > index; index++)if(sameNaN(O[index]))return isContains || index;
	    } else for(;length > index; index++)if(isContains || index in O){
	      if(O[index] === el)return isContains || index;
	    } return !isContains && -1;
	  }
	}
	function generic(A, B){
	  // strange IE quirks mode bug -> use typeof vs isFunction
	  return typeof A == 'function' ? A : B;
	}

	// Math
	var MAX_SAFE_INTEGER = 0x1fffffffffffff // pow(2, 53) - 1 == 9007199254740991
	  , ceil   = Math.ceil
	  , floor  = Math.floor
	  , max    = Math.max
	  , min    = Math.min
	  , random = Math.random
	  , trunc  = Math.trunc || function(it){
	      return (it > 0 ? floor : ceil)(it);
	    }
	// 20.1.2.4 Number.isNaN(number)
	function sameNaN(number){
	  return number != number;
	}
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it) ? 0 : trunc(it);
	}
	// 7.1.15 ToLength
	function toLength(it){
	  return it > 0 ? min(toInteger(it), MAX_SAFE_INTEGER) : 0;
	}
	function toIndex(index, length){
	  var index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	}

	function createReplacer(regExp, replace, isStatic){
	  var replacer = isObject(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(isStatic ? it : this).replace(regExp, replacer);
	  }
	}
	function createPointAt(toString){
	  return function(pos){
	    var s = String(assertDefined(this))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return toString ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? toString ? s.charAt(i) : a
	      : toString ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  }
	}

	// Assertion & errors
	var REDUCE_ERROR = 'Reduce of empty object with no initial value';
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError('Function called on null or undefined');
	  return it;
	}
	function assertFunction(it){
	  assert(isFunction(it), it, ' is not a function!');
	  return it;
	}
	function assertObject(it){
	  assert(isObject(it), it, ' is not an object!');
	  return it;
	}
	function assertInstance(it, Constructor, name){
	  assert(it instanceof Constructor, name, ": use the 'new' operator!");
	}

	// Property descriptors & Symbol
	function descriptor(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  }
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return defineProperty(object, key, descriptor(bitmap, value));
	  } : simpleSet;
	}
	function uid(key){
	  return SYMBOL + '(' + key + ')_' + (++sid + random())[TO_STRING](36);
	}
	function getWellKnownSymbol(name, setter){
	  return (Symbol && Symbol[name]) || (setter ? Symbol : safeSymbol)(SYMBOL + DOT + name);
	}
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC   = !!function(){try{return defineProperty({}, DOT, ObjectProto)}catch(e){}}()
	  , sid    = 0
	  , hidden = createDefiner(1)
	  , set    = Symbol ? simpleSet : hidden
	  , safeSymbol = Symbol || uid;
	function assignHidden(target, src){
	  for(var key in src)hidden(target, key, src[key]);
	  return target;
	}

	var SYMBOL_UNSCOPABLES = getWellKnownSymbol('unscopables')
	  , ArrayUnscopables   = ArrayProto[SYMBOL_UNSCOPABLES] || {}
	  , SYMBOL_SPECIES     = getWellKnownSymbol('species');
	function setSpecies(C){
	  if(framework || !isNative(C))defineProperty(C, SYMBOL_SPECIES, {
	    configurable: true,
	    get: returnThis
	  });
	}

	// Iterators
	var SYMBOL_ITERATOR = getWellKnownSymbol(ITERATOR)
	  , SYMBOL_TAG      = getWellKnownSymbol(TO_STRING_TAG)
	  , SUPPORT_FF_ITER = FF_ITERATOR in ArrayProto
	  , ITER  = safeSymbol('iter')
	  , KEY   = 1
	  , VALUE = 2
	  , Iterators = {}
	  , IteratorPrototype = {}
	  , NATIVE_ITERATORS = SYMBOL_ITERATOR in ArrayProto
	    // Safari define byggy iterators w/o `next`
	  , BUGGY_ITERATORS = 'keys' in ArrayProto && !('next' in [].keys());
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, returnThis);
	function setIterator(O, value){
	  hidden(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  SUPPORT_FF_ITER && hidden(O, FF_ITERATOR, value);
	}
	function createIterator(Constructor, NAME, next, proto){
	  Constructor[PROTOTYPE] = create(proto || IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	}
	function defineIterator(Constructor, NAME, value, DEFAULT){
	  var proto = Constructor[PROTOTYPE]
	    , iter  = get(proto, SYMBOL_ITERATOR) || get(proto, FF_ITERATOR) || (DEFAULT && get(proto, DEFAULT)) || value;
	  if(framework){
	    // Define iterator
	    setIterator(proto, iter);
	    if(iter !== value){
	      var iterProto = getPrototypeOf(iter.call(new Constructor));
	      // Set @@toStringTag to native iterators
	      setToStringTag(iterProto, NAME + ' Iterator', true);
	      // FF fix
	      has(proto, FF_ITERATOR) && setIterator(iterProto, returnThis);
	    }
	  }
	  // Plug for library
	  Iterators[NAME] = iter;
	  // FF & v8 fix
	  Iterators[NAME + ' Iterator'] = returnThis;
	  return iter;
	}
	function defineStdIterators(Base, NAME, Constructor, next, DEFAULT, IS_SET){
	  function createIter(kind){
	    return function(){
	      return new Constructor(this, kind);
	    }
	  }
	  createIterator(Constructor, NAME, next);
	  var entries = createIter(KEY+VALUE)
	    , values  = createIter(VALUE);
	  if(DEFAULT == VALUE)values = defineIterator(Base, NAME, values, 'values');
	  else entries = defineIterator(Base, NAME, entries, 'entries');
	  if(DEFAULT){
	    $define(PROTO + FORCED * BUGGY_ITERATORS, NAME, {
	      entries: entries,
	      keys: IS_SET ? values : createIter(KEY),
	      values: values
	    });
	  }
	}
	function iterResult(done, value){
	  return {value: value, done: !!done};
	}
	function isIterable(it){
	  var O      = Object(it)
	    , Symbol = global[SYMBOL]
	    , hasExt = (Symbol && Symbol[ITERATOR] || FF_ITERATOR) in O;
	  return hasExt || SYMBOL_ITERATOR in O || has(Iterators, classof(O));
	}
	function getIterator(it){
	  var Symbol  = global[SYMBOL]
	    , ext     = it[Symbol && Symbol[ITERATOR] || FF_ITERATOR]
	    , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[classof(it)];
	  return assertObject(getIter.call(it));
	}
	function stepCall(fn, value, entries){
	  return entries ? invoke(fn, value) : fn(value);
	}
	function forOf(iterable, entries, fn, that){
	  var iterator = getIterator(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done)if(stepCall(f, step.value, entries) === false)return;
	}

	// core
	var NODE = cof(process) == PROCESS
	  , core = {}
	  , path = framework ? global : core
	  , old  = global.core
	  , exportGlobal
	  // type bitmap
	  , FORCED = 1
	  , GLOBAL = 2
	  , STATIC = 4
	  , PROTO  = 8
	  , BIND   = 16
	  , WRAP   = 32;
	function $define(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & GLOBAL
	    , target   = isGlobal ? global : (type & STATIC)
	        ? global[name] : (global[name] || ObjectProto)[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // there is a similar native
	    own = !(type & FORCED) && target && key in target
	      && (!isFunction(target[key]) || isNative(target[key]));
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    if(type & BIND && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & WRAP && !framework && target[key] == out){
	      exp = function(param){
	        return this instanceof out ? new out(param) : out(param);
	      }
	      exp[PROTOTYPE] = out[PROTOTYPE];
	    } else exp = type & PROTO && isFunction(out) ? ctx(call, out) : out;
	    // export
	    if(exports[key] != out)hidden(exports, key, exp);
	    // extend global
	    if(framework && target && !own){
	      if(isGlobal)target[key] = out;
	      else delete target[key] && hidden(target, key, out);
	    }
	  }
	}
	// CommonJS export
	if(typeof module != 'undefined' && module.exports)module.exports = core;
	// RequireJS export
	else if(isFunction(define) && define.amd)define(function(){return core});
	// Export to global object
	else exportGlobal = true;
	if(exportGlobal || framework){
	  core.noConflict = function(){
	    global.core = old;
	    return core;
	  }
	  global.core = core;
	}

	/******************************************************************************
	 * Module : global                                                            *
	 ******************************************************************************/

	$define(GLOBAL + FORCED, {global: global});

	/******************************************************************************
	 * Module : es6_symbol                                                        *
	 ******************************************************************************/

	// ECMAScript 6 symbols shim
	!function(TAG, SymbolRegistry, AllSymbols, setter){
	  // 19.4.1.1 Symbol([description])
	  if(!isNative(Symbol)){
	    Symbol = function(description){
	      assert(!(this instanceof Symbol), SYMBOL + ' is not a ' + CONSTRUCTOR);
	      var tag = uid(description)
	        , sym = set(create(Symbol[PROTOTYPE]), TAG, tag);
	      AllSymbols[tag] = sym;
	      DESC && setter && defineProperty(ObjectProto, tag, {
	        configurable: true,
	        set: function(value){
	          hidden(this, tag, value);
	        }
	      });
	      return sym;
	    }
	    hidden(Symbol[PROTOTYPE], TO_STRING, function(){
	      return this[TAG];
	    });
	  }
	  $define(GLOBAL + WRAP, {Symbol: Symbol});
	  
	  var symbolStatics = {
	    // 19.4.2.1 Symbol.for(key)
	    'for': function(key){
	      return has(SymbolRegistry, key += '')
	        ? SymbolRegistry[key]
	        : SymbolRegistry[key] = Symbol(key);
	    },
	    // 19.4.2.4 Symbol.iterator
	    iterator: SYMBOL_ITERATOR,
	    // 19.4.2.5 Symbol.keyFor(sym)
	    keyFor: part.call(keyOf, SymbolRegistry),
	    // 19.4.2.10 Symbol.species
	    species: SYMBOL_SPECIES,
	    // 19.4.2.13 Symbol.toStringTag
	    toStringTag: SYMBOL_TAG = getWellKnownSymbol(TO_STRING_TAG, true),
	    // 19.4.2.14 Symbol.unscopables
	    unscopables: SYMBOL_UNSCOPABLES,
	    pure: safeSymbol,
	    set: set,
	    useSetter: function(){setter = true},
	    useSimple: function(){setter = false}
	  };
	  // 19.4.2.2 Symbol.hasInstance
	  // 19.4.2.3 Symbol.isConcatSpreadable
	  // 19.4.2.6 Symbol.match
	  // 19.4.2.8 Symbol.replace
	  // 19.4.2.9 Symbol.search
	  // 19.4.2.11 Symbol.split
	  // 19.4.2.12 Symbol.toPrimitive
	  forEach.call(array('hasInstance,isConcatSpreadable,match,replace,search,split,toPrimitive'),
	    function(it){
	      symbolStatics[it] = getWellKnownSymbol(it);
	    }
	  );
	  $define(STATIC, SYMBOL, symbolStatics);
	  
	  setToStringTag(Symbol, SYMBOL);
	  
	  $define(STATIC + FORCED * !isNative(Symbol), OBJECT, {
	    // 19.1.2.7 Object.getOwnPropertyNames(O)
	    getOwnPropertyNames: function(it){
	      var names = getNames(toObject(it)), result = [], key, i = 0;
	      while(names.length > i)has(AllSymbols, key = names[i++]) || result.push(key);
	      return result;
	    },
	    // 19.1.2.8 Object.getOwnPropertySymbols(O)
	    getOwnPropertySymbols: function(it){
	      var names = getNames(toObject(it)), result = [], key, i = 0;
	      while(names.length > i)has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
	      return result;
	    }
	  });
	}(safeSymbol('tag'), {}, {}, true);

	/******************************************************************************
	 * Module : es6                                                               *
	 ******************************************************************************/

	// ECMAScript 6 shim
	!function(RegExpProto, isFinite, tmp, NAME){
	  var RangeError = global.RangeError
	      // 20.1.2.3 Number.isInteger(number)
	    , isInteger = Number.isInteger || function(it){
	        return !isObject(it) && isFinite(it) && floor(it) === it;
	      }
	      // 20.2.2.28 Math.sign(x)
	    , sign = Math.sign || function sign(x){
	        return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	      }
	    , E    = Math.E
	    , pow  = Math.pow
	    , abs  = Math.abs
	    , exp  = Math.exp
	    , log  = Math.log
	    , sqrt = Math.sqrt
	    , fcc  = String.fromCharCode
	    , at   = createPointAt(true);
	  
	  var objectStatic = {
	    // 19.1.3.1 Object.assign(target, source)
	    assign: assign,
	    // 19.1.3.10 Object.is(value1, value2)
	    is: function(x, y){
	      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	    }
	  };
	  // 19.1.3.19 Object.setPrototypeOf(O, proto)
	  // Works with __proto__ only. Old v8 can't works with null proto objects.
	  '__proto__' in ObjectProto && function(buggy, set){
	    try {
	      set = ctx(call, getOwnDescriptor(ObjectProto, '__proto__').set, 2);
	      set({}, ArrayProto);
	    } catch(e){ buggy = true }
	    objectStatic.setPrototypeOf = setPrototypeOf = setPrototypeOf || function(O, proto){
	      assertObject(O);
	      assert(proto === null || isObject(proto), proto, ": can't set as prototype!");
	      if(buggy)O.__proto__ = proto;
	      else set(O, proto);
	      return O;
	    }
	  }();
	  $define(STATIC, OBJECT, objectStatic);
	  
	  // 20.2.2.5 Math.asinh(x)
	  function asinh(x){
	    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
	  }
	  // 20.2.2.14 Math.expm1(x)
	  function expm1(x){
	    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
	  }
	  
	  $define(STATIC, NUMBER, {
	    // 20.1.2.1 Number.EPSILON
	    EPSILON: pow(2, -52),
	    // 20.1.2.2 Number.isFinite(number)
	    isFinite: function(it){
	      return typeof it == 'number' && isFinite(it);
	    },
	    // 20.1.2.3 Number.isInteger(number)
	    isInteger: isInteger,
	    // 20.1.2.4 Number.isNaN(number)
	    isNaN: sameNaN,
	    // 20.1.2.5 Number.isSafeInteger(number)
	    isSafeInteger: function(number){
	      return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
	    },
	    // 20.1.2.6 Number.MAX_SAFE_INTEGER
	    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
	    // 20.1.2.10 Number.MIN_SAFE_INTEGER
	    MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
	    // 20.1.2.12 Number.parseFloat(string)
	    parseFloat: parseFloat,
	    // 20.1.2.13 Number.parseInt(string, radix)
	    parseInt: parseInt
	  });
	  
	  $define(STATIC, MATH, {
	    // 20.2.2.3 Math.acosh(x)
	    acosh: function(x){
	      return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
	    },
	    // 20.2.2.5 Math.asinh(x)
	    asinh: asinh,
	    // 20.2.2.7 Math.atanh(x)
	    atanh: function(x){
	      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
	    },
	    // 20.2.2.9 Math.cbrt(x)
	    cbrt: function(x){
	      return sign(x = +x) * pow(abs(x), 1 / 3);
	    },
	    // 20.2.2.11 Math.clz32(x)
	    clz32: function(x){
	      return (x >>>= 0) ? 32 - x[TO_STRING](2).length : 32;
	    },
	    // 20.2.2.12 Math.cosh(x)
	    cosh: function(x){
	      return (exp(x = +x) + exp(-x)) / 2;
	    },
	    // 20.2.2.14 Math.expm1(x)
	    expm1: expm1,
	    // 20.2.2.16 Math.fround(x)
	    // TODO: fallback for IE9-
	    fround: function(x){
	      return new Float32Array([x])[0];
	    },
	    // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	    hypot: function(value1, value2){
	      var sum  = 0
	        , len1 = arguments.length
	        , len2 = len1
	        , args = Array(len1)
	        , larg = -Infinity
	        , arg;
	      while(len1--){
	        arg = args[len1] = +arguments[len1];
	        if(arg == Infinity || arg == -Infinity)return Infinity;
	        if(arg > larg)larg = arg;
	      }
	      larg = arg || 1;
	      while(len2--)sum += pow(args[len2] / larg, 2);
	      return larg * sqrt(sum);
	    },
	    // 20.2.2.18 Math.imul(x, y)
	    imul: function(x, y){
	      var UInt16 = 0xffff
	        , xn = +x
	        , yn = +y
	        , xl = UInt16 & xn
	        , yl = UInt16 & yn;
	      return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
	    },
	    // 20.2.2.20 Math.log1p(x)
	    log1p: function(x){
	      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
	    },
	    // 20.2.2.21 Math.log10(x)
	    log10: function(x){
	      return log(x) / Math.LN10;
	    },
	    // 20.2.2.22 Math.log2(x)
	    log2: function(x){
	      return log(x) / Math.LN2;
	    },
	    // 20.2.2.28 Math.sign(x)
	    sign: sign,
	    // 20.2.2.30 Math.sinh(x)
	    sinh: function(x){
	      return (abs(x = +x) < 1) ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
	    },
	    // 20.2.2.33 Math.tanh(x)
	    tanh: function(x){
	      var a = expm1(x = +x)
	        , b = expm1(-x);
	      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	    },
	    // 20.2.2.34 Math.trunc(x)
	    trunc: trunc
	  });
	  // 20.2.1.9 Math[@@toStringTag]
	  setToStringTag(Math, MATH, true);
	  
	  function assertNotRegExp(it){
	    if(cof(it) == REGEXP)throw TypeError();
	  }
	  $define(STATIC, STRING, {
	    // 21.1.2.2 String.fromCodePoint(...codePoints)
	    fromCodePoint: function(x){
	      var res = []
	        , len = arguments.length
	        , i   = 0
	        , code
	      while(len > i){
	        code = +arguments[i++];
	        if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	        res.push(code < 0x10000
	          ? fcc(code)
	          : fcc(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	        );
	      } return res.join('');
	    },
	    // 21.1.2.4 String.raw(callSite, ...substitutions)
	    raw: function(callSite){
	      var raw = toObject(callSite.raw)
	        , len = toLength(raw.length)
	        , sln = arguments.length
	        , res = []
	        , i   = 0;
	      while(len > i){
	        res.push(String(raw[i++]));
	        if(i < sln)res.push(String(arguments[i]));
	      } return res.join('');
	    }
	  });
	  $define(PROTO, STRING, {
	    // 21.1.3.3 String.prototype.codePointAt(pos)
	    codePointAt: createPointAt(false),
	    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	    endsWith: function(searchString /*, endPosition = @length */){
	      assertNotRegExp(searchString);
	      var that = String(assertDefined(this))
	        , endPosition = arguments[1]
	        , len = toLength(that.length)
	        , end = endPosition === undefined ? len : min(toLength(endPosition), len);
	      searchString += '';
	      return that.slice(end - searchString.length, end) === searchString;
	    },
	    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
	    includes: function(searchString /*, position = 0 */){
	      assertNotRegExp(searchString);
	      return !!~String(assertDefined(this)).indexOf(searchString, arguments[1]);
	    },
	    // 21.1.3.13 String.prototype.repeat(count)
	    repeat: function(count){
	      var str = String(assertDefined(this))
	        , res = ''
	        , n   = toInteger(count);
	      if(0 > n || n == Infinity)throw RangeError("Count can't be negative");
	      for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	      return res;
	    },
	    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	    startsWith: function(searchString /*, position = 0 */){
	      assertNotRegExp(searchString);
	      var that  = String(assertDefined(this))
	        , index = toLength(min(arguments[1], that.length));
	      searchString += '';
	      return that.slice(index, index + searchString.length) === searchString;
	    }
	  });
	  // 21.1.3.27 String.prototype[@@iterator]()
	  defineStdIterators(String, STRING, function(iterated){
	    set(this, ITER, {o: String(iterated), i: 0});
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	  }, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , index = iter.i
	      , point;
	    if(index >= O.length)return iterResult(1);
	    point = at.call(O, index);
	    iter.i += point.length;
	    return iterResult(0, point);
	  });
	  
	  $define(STATIC, ARRAY, {
	    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	    from: function(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	      var O       = Object(assertDefined(arrayLike))
	        , result  = new (generic(this, Array))
	        , mapfn   = arguments[1]
	        , that    = arguments[2]
	        , mapping = mapfn !== undefined
	        , f       = mapping ? ctx(mapfn, that, 2) : undefined
	        , index   = 0
	        , length;
	      if(isIterable(O))for(var iter = getIterator(O), step; !(step = iter.next()).done; index++){
	        result[index] = mapping ? f(step.value, index) : step.value;
	      } else for(length = toLength(O.length); length > index; index++){
	        result[index] = mapping ? f(O[index], index) : O[index];
	      }
	      result.length = index;
	      return result;
	    },
	    // 22.1.2.3 Array.of( ...items)
	    of: function(/* ...args */){
	      var index  = 0
	        , length = arguments.length
	        , result = new (generic(this, Array))(length);
	      while(length > index)result[index] = arguments[index++];
	      result.length = length;
	      return result;
	    }
	  });
	  $define(PROTO, ARRAY, {
	    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	    copyWithin: function(target /* = 0 */, start /* = 0, end = @length */){
	      var O     = Object(assertDefined(this))
	        , len   = toLength(O.length)
	        , to    = toIndex(target, len)
	        , from  = toIndex(start, len)
	        , end   = arguments[2]
	        , fin   = end === undefined ? len : toIndex(end, len)
	        , count = min(fin - from, len - to)
	        , inc   = 1;
	      if(from < to && to < from + count){
	        inc  = -1;
	        from = from + count - 1;
	        to   = to + count - 1;
	      }
	      while(count-- > 0){
	        if(from in O)O[to] = O[from];
	        else delete O[to];
	        to += inc;
	        from += inc;
	      } return O;
	    },
	    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	    fill: function(value /*, start = 0, end = @length */){
	      var O      = Object(assertDefined(this))
	        , length = toLength(O.length)
	        , index  = toIndex(arguments[1], length)
	        , end    = arguments[2]
	        , endPos = end === undefined ? length : toIndex(end, length);
	      while(endPos > index)O[index++] = value;
	      return O;
	    },
	    // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	    find: createArrayMethod(5),
	    // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	    findIndex: createArrayMethod(6)
	  });
	  // 22.1.3.4 Array.prototype.entries()
	  // 22.1.3.13 Array.prototype.keys()
	  // 22.1.3.29 Array.prototype.values()
	  // 22.1.3.30 Array.prototype[@@iterator]()
	  defineStdIterators(Array, ARRAY, function(iterated, kind){
	    set(this, ITER, {o: toObject(iterated), i: 0, k: kind});
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	  }, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , kind  = iter.k
	      , index = iter.i++;
	    if(!O || index >= O.length)return iter.o = undefined, iterResult(1);
	    if(kind == KEY)  return iterResult(0, index);
	    if(kind == VALUE)return iterResult(0, O[index]);
	                     return iterResult(0, [index, O[index]]);
	  }, VALUE);
	  
	  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	  Iterators[ARGUMENTS] = Iterators[ARRAY];
	  
	  // 24.3.3 JSON[@@toStringTag]
	  setToStringTag(global.JSON, 'JSON', true);
	  
	  // Object static methods accept primitives
	  function wrapObjectMethod(key, MODE){
	    var fn  = Object[key]
	      , exp = core[OBJECT][key]
	      , f   = 0
	      , o   = {};
	    if(!exp || isNative(exp)){
	      o[key] =
	        MODE == 1 ? function(it){ return isObject(it) ? fn(it) : it } :
	        MODE == 2 ? function(it){ return isObject(it) ? fn(it) : true } :
	        MODE == 3 ? function(it){ return isObject(it) ? fn(it) : false } :
	        MODE == 4 ? function(it, key){ return fn(toObject(it), key) } :
	                    function(it){ return fn(toObject(it)) }
	      try { fn(DOT) }
	      catch(e){ f = 1}
	      $define(STATIC + FORCED * f, OBJECT, o);
	    }
	  }
	  wrapObjectMethod('freeze', 1);
	  wrapObjectMethod('seal', 1);
	  wrapObjectMethod('preventExtensions', 1);
	  wrapObjectMethod('isFrozen', 2);
	  wrapObjectMethod('isSealed', 2);
	  wrapObjectMethod('isExtensible', 3);
	  wrapObjectMethod('getOwnPropertyDescriptor', 4);
	  wrapObjectMethod('getPrototypeOf');
	  wrapObjectMethod('keys');
	  wrapObjectMethod('getOwnPropertyNames');
	  
	  if(framework){
	    // 19.1.3.6 Object.prototype.toString()
	    tmp[SYMBOL_TAG] = DOT;
	    if(cof(tmp) != DOT)hidden(ObjectProto, TO_STRING, function(){
	      return '[object ' + classof(this) + ']';
	    });
	    
	    // 19.2.4.2 name
	    NAME in FunctionProto || defineProperty(FunctionProto, NAME, {
	      configurable: true,
	      get: function(){
	        var match = String(this).match(/^\s*function ([^ (]*)/)
	          , name  = match ? match[1] : '';
	        has(this, NAME) || defineProperty(this, NAME, descriptor(5, name));
	        return name;
	      },
	      set: function(value){
	        has(this, NAME) || defineProperty(this, NAME, descriptor(0, value));
	      }
	    });
	    
	    // RegExp allows a regex with flags as the pattern
	    if(DESC && !function(){try{return RegExp(/a/g, 'i') == '/a/i'}catch(e){}}()){
	      var _RegExp = RegExp;
	      RegExp = function RegExp(pattern, flags){
	        return new _RegExp(cof(pattern) == REGEXP && flags !== undefined
	          ? pattern.source : pattern, flags);
	      }
	      forEach.call(getNames(_RegExp), function(key){
	        key in RegExp || defineProperty(RegExp, key, {
	          configurable: true,
	          get: function(){ return _RegExp[key] },
	          set: function(it){ _RegExp[key] = it }
	        });
	      });
	      RegExpProto[CONSTRUCTOR] = RegExp;
	      RegExp[PROTOTYPE] = RegExpProto;
	      hidden(global, REGEXP, RegExp);
	    }
	    
	    // 21.2.5.3 get RegExp.prototype.flags()
	    if(/./g.flags != 'g')defineProperty(RegExpProto, 'flags', {
	      configurable: true,
	      get: createReplacer(/^.*\/(\w*)$/, '$1')
	    });
	    
	    // 22.1.3.31 Array.prototype[@@unscopables]
	    forEach.call(array('find,findIndex,fill,copyWithin,entries,keys,values'), function(it){
	      ArrayUnscopables[it] = true;
	    });
	    SYMBOL_UNSCOPABLES in ArrayProto || hidden(ArrayProto, SYMBOL_UNSCOPABLES, ArrayUnscopables);
	  }
	  
	  setSpecies(RegExp);
	  setSpecies(Array);
	}(RegExp[PROTOTYPE], isFinite, {}, 'name');

	/******************************************************************************
	 * Module : immediate                                                         *
	 ******************************************************************************/

	// setImmediate shim
	// Node.js 0.9+ & IE10+ has setImmediate, else:
	isFunction(setImmediate) && isFunction(clearImmediate) || function(ONREADYSTATECHANGE){
	  var postMessage      = global.postMessage
	    , addEventListener = global.addEventListener
	    , MessageChannel   = global.MessageChannel
	    , counter          = 0
	    , queue            = {}
	    , defer, channel, port;
	  setImmediate = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    }
	    defer(counter);
	    return counter;
	  }
	  clearImmediate = function(id){
	    delete queue[id];
	  }
	  function run(id){
	    if(has(queue, id)){
	      var fn = queue[id];
	      delete queue[id];
	      fn();
	    }
	  }
	  function listner(event){
	    run(event.data);
	  }
	  // Node.js 0.8-
	  if(NODE){
	    defer = function(id){
	      nextTick(part.call(run, id));
	    }
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
	    defer = function(id){
	      postMessage(id, '*');
	    }
	    addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(document && ONREADYSTATECHANGE in document[CREATE_ELEMENT]('script')){
	    defer = function(id){
	      html.appendChild(document[CREATE_ELEMENT]('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run(id);
	      }
	    }
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(part.call(run, id), 0);
	    }
	  }
	}('onreadystatechange');
	$define(GLOBAL + BIND, {
	  setImmediate:   setImmediate,
	  clearImmediate: clearImmediate
	});

	/******************************************************************************
	 * Module : es6_promise                                                       *
	 ******************************************************************************/

	// ES6 promises shim
	// Based on https://github.com/getify/native-promise-only/
	!function(Promise, test){
	  isFunction(Promise) && isFunction(Promise.resolve)
	  && Promise.resolve(test = new Promise(function(){})) == test
	  || function(asap, DEF){
	    function isThenable(o){
	      var then;
	      if(isObject(o))then = o.then;
	      return isFunction(then) ? then : false;
	    }
	    function notify(def){
	      var chain = def.chain;
	      chain.length && asap(function(){
	        var msg = def.msg
	          , ok  = def.state == 1
	          , i   = 0;
	        while(chain.length > i)!function(react){
	          var cb = ok ? react.ok : react.fail
	            , ret, then;
	          try {
	            if(cb){
	              ret = cb === true ? msg : cb(msg);
	              if(ret === react.P){
	                react.rej(TypeError(PROMISE + '-chain cycle'));
	              } else if(then = isThenable(ret)){
	                then.call(ret, react.res, react.rej);
	              } else react.res(ret);
	            } else react.rej(msg);
	          } catch(err){
	            react.rej(err);
	          }
	        }(chain[i++]);
	        chain.length = 0;
	      });
	    }
	    function resolve(msg){
	      var def = this
	        , then, wrapper;
	      if(def.done)return;
	      def.done = true;
	      def = def.def || def; // unwrap
	      try {
	        if(then = isThenable(msg)){
	          wrapper = {def: def, done: false}; // wrap
	          then.call(msg, ctx(resolve, wrapper, 1), ctx(reject, wrapper, 1));
	        } else {
	          def.msg = msg;
	          def.state = 1;
	          notify(def);
	        }
	      } catch(err){
	        reject.call(wrapper || {def: def, done: false}, err); // wrap
	      }
	    }
	    function reject(msg){
	      var def = this;
	      if(def.done)return;
	      def.done = true;
	      def = def.def || def; // unwrap
	      def.msg = msg;
	      def.state = 2;
	      notify(def);
	    }
	    function getConstructor(C){
	      var S = assertObject(C)[SYMBOL_SPECIES];
	      return S != undefined ? S : C;
	    }
	    // 25.4.3.1 Promise(executor)
	    Promise = function(executor){
	      assertFunction(executor);
	      assertInstance(this, Promise, PROMISE);
	      var def = {chain: [], state: 0, done: false, msg: undefined};
	      hidden(this, DEF, def);
	      try {
	        executor(ctx(resolve, def, 1), ctx(reject, def, 1));
	      } catch(err){
	        reject.call(def, err);
	      }
	    }
	    assignHidden(Promise[PROTOTYPE], {
	      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	      then: function(onFulfilled, onRejected){
	        var S = assertObject(assertObject(this)[CONSTRUCTOR])[SYMBOL_SPECIES];
	        var react = {
	          ok:   isFunction(onFulfilled) ? onFulfilled : true,
	          fail: isFunction(onRejected)  ? onRejected  : false
	        } , P = react.P = new (S != undefined ? S : Promise)(function(resolve, reject){
	          react.res = assertFunction(resolve);
	          react.rej = assertFunction(reject);
	        }), def = this[DEF];
	        def.chain.push(react);
	        def.state && notify(def);
	        return P;
	      },
	      // 25.4.5.1 Promise.prototype.catch(onRejected)
	      'catch': function(onRejected){
	        return this.then(undefined, onRejected);
	      }
	    });
	    assignHidden(Promise, {
	      // 25.4.4.1 Promise.all(iterable)
	      all: function(iterable){
	        var Promise = getConstructor(this)
	          , values  = [];
	        return new Promise(function(resolve, reject){
	          forOf(iterable, false, push, values);
	          var remaining = values.length
	            , results   = Array(remaining);
	          if(remaining)forEach.call(values, function(promise, index){
	            Promise.resolve(promise).then(function(value){
	              results[index] = value;
	              --remaining || resolve(results);
	            }, reject);
	          });
	          else resolve(results);
	        });
	      },
	      // 25.4.4.4 Promise.race(iterable)
	      race: function(iterable){
	        var Promise = getConstructor(this);
	        return new Promise(function(resolve, reject){
	          forOf(iterable, false, function(promise){
	            Promise.resolve(promise).then(resolve, reject);
	          });
	        });
	      },
	      // 25.4.4.5 Promise.reject(r)
	      reject: function(r){
	        return new (getConstructor(this))(function(resolve, reject){
	          reject(r);
	        });
	      },
	      // 25.4.4.6 Promise.resolve(x)
	      resolve: function(x){
	        return isObject(x) && DEF in x && getPrototypeOf(x) === this[PROTOTYPE]
	          ? x : new (getConstructor(this))(function(resolve, reject){
	            resolve(x);
	          });
	      }
	    });
	  }(nextTick || setImmediate, safeSymbol('def'));
	  setToStringTag(Promise, PROMISE);
	  setSpecies(Promise);
	  $define(GLOBAL + FORCED * !isNative(Promise), {Promise: Promise});
	}(global[PROMISE]);

	/******************************************************************************
	 * Module : es6_collections                                                   *
	 ******************************************************************************/

	// ECMAScript 6 collections shim
	!function(){
	  var UID   = safeSymbol('uid')
	    , O1    = safeSymbol('O1')
	    , WEAK  = safeSymbol('weak')
	    , LEAK  = safeSymbol('leak')
	    , LAST  = safeSymbol('last')
	    , FIRST = safeSymbol('first')
	    , SIZE  = DESC ? safeSymbol('size') : 'size'
	    , uid   = 0
	    , tmp   = {};
	  
	  function getCollection(C, NAME, methods, commonMethods, isMap, isWeak){
	    var ADDER = isMap ? 'set' : 'add'
	      , proto = C && C[PROTOTYPE]
	      , O     = {};
	    function initFromIterable(that, iterable){
	      if(iterable != undefined)forOf(iterable, isMap, that[ADDER], that);
	      return that;
	    }
	    function fixSVZ(key, chain){
	      var method = proto[key];
	      if(framework)proto[key] = function(a, b){
	        var result = method.call(this, a === 0 ? 0 : a, b);
	        return chain ? this : result;
	      };
	    }
	    if(!isNative(C) || !(isWeak || (!BUGGY_ITERATORS && has(proto, FOR_EACH) && has(proto, 'entries')))){
	      // create collection constructor
	      C = isWeak
	        ? function(iterable){
	            assertInstance(this, C, NAME);
	            set(this, UID, uid++);
	            initFromIterable(this, iterable);
	          }
	        : function(iterable){
	            var that = this;
	            assertInstance(that, C, NAME);
	            set(that, O1, create(null));
	            set(that, SIZE, 0);
	            set(that, LAST, undefined);
	            set(that, FIRST, undefined);
	            initFromIterable(that, iterable);
	          };
	      assignHidden(assignHidden(C[PROTOTYPE], methods), commonMethods);
	      isWeak || defineProperty(C[PROTOTYPE], 'size', {get: function(){
	        return assertDefined(this[SIZE]);
	      }});
	    } else {
	      var Native = C
	        , inst   = new C
	        , chain  = inst[ADDER](isWeak ? {} : -0, 1)
	        , buggyZero;
	      // wrap to init collections from iterable
	      if(!NATIVE_ITERATORS || !C.length){
	        C = function(iterable){
	          assertInstance(this, C, NAME);
	          return initFromIterable(new Native, iterable);
	        }
	        C[PROTOTYPE] = proto;
	        if(framework)proto[CONSTRUCTOR] = C;
	      }
	      isWeak || inst[FOR_EACH](function(val, key){
	        buggyZero = 1 / key === -Infinity;
	      });
	      // fix converting -0 key to +0
	      if(buggyZero){
	        fixSVZ('delete');
	        fixSVZ('has');
	        isMap && fixSVZ('get');
	      }
	      // + fix .add & .set for chaining
	      if(buggyZero || chain !== inst)fixSVZ(ADDER, true);
	    }
	    setToStringTag(C, NAME);
	    setSpecies(C);
	    
	    O[NAME] = C;
	    $define(GLOBAL + WRAP + FORCED * !isNative(C), O);
	    
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    isWeak || defineStdIterators(C, NAME, function(iterated, kind){
	      set(this, ITER, {o: iterated, k: kind});
	    }, function(){
	      var iter  = this[ITER]
	        , kind  = iter.k
	        , entry = iter.l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
	        // or finish the iteration
	        return iter.o = undefined, iterResult(1);
	      }
	      // return step by kind
	      if(kind == KEY)  return iterResult(0, entry.k);
	      if(kind == VALUE)return iterResult(0, entry.v);
	                       return iterResult(0, [entry.k, entry.v]);   
	    }, isMap ? KEY+VALUE : VALUE, !isMap);
	    
	    return C;
	  }
	  
	  function fastKey(it, create){
	    // return primitive with prefix
	    if(!isObject(it))return (typeof it == 'string' ? 'S' : 'P') + it;
	    // can't set id to frozen object
	    if(isFrozen(it))return 'F';
	    if(!has(it, UID)){
	      // not necessary to add id
	      if(!create)return 'E';
	      // add missing object id
	      hidden(it, UID, ++uid);
	    // return object id with prefix
	    } return 'O' + it[UID];
	  }
	  function getEntry(that, key){
	    // fast case
	    var index = fastKey(key), entry;
	    if(index != 'F')return that[O1][index];
	    // frozen object case
	    for(entry = that[FIRST]; entry; entry = entry.n){
	      if(entry.k == key)return entry;
	    }
	  }
	  function def(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry)entry.v = value;
	    // create new entry
	    else {
	      that[LAST] = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that[LAST],          // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that[FIRST])that[FIRST] = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index != 'F')that[O1][index] = entry;
	    } return that;
	  }

	  var collectionMethods = {
	    // 23.1.3.1 Map.prototype.clear()
	    // 23.2.3.2 Set.prototype.clear()
	    clear: function(){
	      for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
	        entry.r = true;
	        entry.p = entry.n = undefined;
	        delete data[entry.i];
	      }
	      that[FIRST] = that[LAST] = undefined;
	      that[SIZE] = 0;
	    },
	    // 23.1.3.3 Map.prototype.delete(key)
	    // 23.2.3.4 Set.prototype.delete(value)
	    'delete': function(key){
	      var that  = this
	        , entry = getEntry(that, key);
	      if(entry){
	        var next = entry.n
	          , prev = entry.p;
	        delete that[O1][entry.i];
	        entry.r = true;
	        if(prev)prev.n = next;
	        if(next)next.p = prev;
	        if(that[FIRST] == entry)that[FIRST] = next;
	        if(that[LAST] == entry)that[LAST] = prev;
	        that[SIZE]--;
	      } return !!entry;
	    },
	    // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	    // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	    forEach: function(callbackfn /*, that = undefined */){
	      var f = ctx(callbackfn, arguments[1], 3)
	        , entry;
	      while(entry = entry ? entry.n : this[FIRST]){
	        f(entry.v, entry.k, this);
	        // revert to the last existing entry
	        while(entry && entry.r)entry = entry.p;
	      }
	    },
	    // 23.1.3.7 Map.prototype.has(key)
	    // 23.2.3.7 Set.prototype.has(value)
	    has: function(key){
	      return !!getEntry(this, key);
	    }
	  }
	  
	  // 23.1 Map Objects
	  Map = getCollection(Map, MAP, {
	    // 23.1.3.6 Map.prototype.get(key)
	    get: function(key){
	      var entry = getEntry(this, key);
	      return entry && entry.v;
	    },
	    // 23.1.3.9 Map.prototype.set(key, value)
	    set: function(key, value){
	      return def(this, key === 0 ? 0 : key, value);
	    }
	  }, collectionMethods, true);
	  
	  // 23.2 Set Objects
	  Set = getCollection(Set, SET, {
	    // 23.2.3.1 Set.prototype.add(value)
	    add: function(value){
	      return def(this, value = value === 0 ? 0 : value, value);
	    }
	  }, collectionMethods);
	  
	  function defWeak(that, key, value){
	    if(isFrozen(assertObject(key)))leakStore(that).set(key, value);
	    else {
	      has(key, WEAK) || hidden(key, WEAK, {});
	      key[WEAK][that[UID]] = value;
	    } return that;
	  }
	  function leakStore(that){
	    return that[LEAK] || hidden(that, LEAK, new Map)[LEAK];
	  }
	  
	  var weakMethods = {
	    // 23.3.3.2 WeakMap.prototype.delete(key)
	    // 23.4.3.3 WeakSet.prototype.delete(value)
	    'delete': function(key){
	      if(!isObject(key))return false;
	      if(isFrozen(key))return leakStore(this)['delete'](key);
	      return has(key, WEAK) && has(key[WEAK], this[UID]) && delete key[WEAK][this[UID]];
	    },
	    // 23.3.3.4 WeakMap.prototype.has(key)
	    // 23.4.3.4 WeakSet.prototype.has(value)
	    has: function(key){
	      if(!isObject(key))return false;
	      if(isFrozen(key))return leakStore(this).has(key);
	      return has(key, WEAK) && has(key[WEAK], this[UID]);
	    }
	  };
	  
	  // 23.3 WeakMap Objects
	  WeakMap = getCollection(WeakMap, WEAKMAP, {
	    // 23.3.3.3 WeakMap.prototype.get(key)
	    get: function(key){
	      if(isObject(key)){
	        if(isFrozen(key))return leakStore(this).get(key);
	        if(has(key, WEAK))return key[WEAK][this[UID]];
	      }
	    },
	    // 23.3.3.5 WeakMap.prototype.set(key, value)
	    set: function(key, value){
	      return defWeak(this, key, value);
	    }
	  }, weakMethods, true, true);
	  
	  // IE11 WeakMap frozen keys fix
	  if(framework && DESC && new WeakMap([[Object.freeze(tmp), 7]]).get(tmp) != 7){
	    forEach.call(array('delete,has,get,set'), function(key){
	      var method = WeakMap[PROTOTYPE][key];
	      WeakMap[PROTOTYPE][key] = function(a, b){
	        // store frozen objects on leaky map
	        if(isObject(a) && isFrozen(a)){
	          var result = leakStore(this)[key](a, b);
	          return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	        } return method.call(this, a, b);
	      };
	    });
	  }
	  
	  // 23.4 WeakSet Objects
	  WeakSet = getCollection(WeakSet, WEAKSET, {
	    // 23.4.3.1 WeakSet.prototype.add(value)
	    add: function(value){
	      return defWeak(this, value, true);
	    }
	  }, weakMethods, false, true);
	}();

	/******************************************************************************
	 * Module : es6_reflect                                                       *
	 ******************************************************************************/

	!function(){
	  function Enumerate(iterated){
	    var keys = [], key;
	    for(key in iterated)keys.push(key);
	    set(this, ITER, {o: iterated, a: keys, i: 0});
	  }
	  createIterator(Enumerate, OBJECT, function(){
	    var iter = this[ITER]
	      , keys = iter.a
	      , key;
	    do {
	      if(iter.i >= keys.length)return iterResult(1);
	    } while(!((key = keys[iter.i++]) in iter.o));
	    return iterResult(0, key);
	  });
	  
	  function wrap(fn){
	    return function(it){
	      assertObject(it);
	      try {
	        return fn.apply(undefined, arguments), true;
	      } catch(e){
	        return false;
	      }
	    }
	  }
	  
	  function reflectGet(target, propertyKey/*, receiver*/){
	    var receiver = arguments.length < 3 ? target : arguments[2]
	      , desc = getOwnDescriptor(assertObject(target), propertyKey), proto;
	    if(desc)return desc.get ? desc.get.call(receiver) : desc.value;
	    return isObject(proto = getPrototypeOf(target)) ? reflectGet(proto, propertyKey, receiver) : undefined;
	  }
	  function reflectSet(target, propertyKey, V/*, receiver*/){
	    var receiver = arguments.length < 4 ? target : arguments[3]
	      , desc = getOwnDescriptor(assertObject(target), propertyKey), proto;
	    if(desc){
	      if(desc.writable === false)return false;
	      if(desc.set)return desc.set.call(receiver, V), true;
	    }
	    if(isObject(proto = getPrototypeOf(target)))return reflectSet(proto, propertyKey, V, receiver);
	    desc = getOwnDescriptor(receiver, propertyKey) || descriptor(0);
	    desc.value = V;
	    return defineProperty(receiver, propertyKey, desc), true;
	  }
	  var isExtensible = Object.isExtensible || returnIt;
	  
	  var reflect = {
	    // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	    apply: ctx(call, apply, 3),
	    // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	    construct: construct,
	    // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	    defineProperty: wrap(defineProperty),
	    // 26.1.4 Reflect.deleteProperty(target, propertyKey)
	    deleteProperty: function(target, propertyKey){
	      var desc = getOwnDescriptor(assertObject(target), propertyKey);
	      return desc && !desc.configurable ? false : delete target[propertyKey];
	    },
	    // 26.1.5 Reflect.enumerate(target)
	    enumerate: function(target){
	      return new Enumerate(assertObject(target));
	    },
	    // 26.1.6 Reflect.get(target, propertyKey [, receiver])
	    get: reflectGet,
	    // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	    getOwnPropertyDescriptor: function(target, propertyKey){
	      return getOwnDescriptor(assertObject(target), propertyKey);
	    },
	    // 26.1.8 Reflect.getPrototypeOf(target)
	    getPrototypeOf: function(target){
	      return getPrototypeOf(assertObject(target));
	    },
	    // 26.1.9 Reflect.has(target, propertyKey)
	    has: function(target, propertyKey){
	      return propertyKey in target;
	    },
	    // 26.1.10 Reflect.isExtensible(target)
	    isExtensible: function(target){
	      return !!isExtensible(assertObject(target));
	    },
	    // 26.1.11 Reflect.ownKeys(target)
	    ownKeys: ownKeys,
	    // 26.1.12 Reflect.preventExtensions(target)
	    preventExtensions: wrap(Object.preventExtensions || returnIt),
	    // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	    set: reflectSet
	  }
	  // 26.1.14 Reflect.setPrototypeOf(target, proto)
	  if(setPrototypeOf)reflect.setPrototypeOf = function(target, proto){
	    return setPrototypeOf(assertObject(target), proto), true;
	  };
	  
	  $define(GLOBAL, {Reflect: {}});
	  $define(STATIC, 'Reflect', reflect);
	}();

	/******************************************************************************
	 * Module : es7                                                               *
	 ******************************************************************************/

	!function(){
	  $define(PROTO, ARRAY, {
	    // https://github.com/domenic/Array.prototype.includes
	    includes: createArrayContains(true)
	  });
	  $define(PROTO, STRING, {
	    // https://github.com/mathiasbynens/String.prototype.at
	    at: createPointAt(true)
	  });
	  
	  function createObjectToArray(isEntries){
	    return function(object){
	      var O      = toObject(object)
	        , keys   = getKeys(object)
	        , length = keys.length
	        , i      = 0
	        , result = Array(length)
	        , key;
	      if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
	      else while(length > i)result[i] = O[keys[i++]];
	      return result;
	    }
	  }
	  $define(STATIC, OBJECT, {
	    // https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-04/apr-9.md#51-objectentries-objectvalues
	    values: createObjectToArray(false),
	    entries: createObjectToArray(true)
	  });
	  $define(STATIC, REGEXP, {
	    // https://gist.github.com/kangax/9698100
	    escape: createReplacer(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)
	  });
	}();

	/******************************************************************************
	 * Module : es7_refs                                                          *
	 ******************************************************************************/

	// https://github.com/zenparsing/es-abstract-refs
	!function(REFERENCE){
	  REFERENCE_GET = getWellKnownSymbol(REFERENCE+'Get', true);
	  var REFERENCE_SET = getWellKnownSymbol(REFERENCE+SET, true)
	    , REFERENCE_DELETE = getWellKnownSymbol(REFERENCE+'Delete', true);
	  
	  $define(STATIC, SYMBOL, {
	    referenceGet: REFERENCE_GET,
	    referenceSet: REFERENCE_SET,
	    referenceDelete: REFERENCE_DELETE
	  });
	  
	  hidden(FunctionProto, REFERENCE_GET, returnThis);
	  
	  function setMapMethods(Constructor){
	    if(Constructor){
	      var MapProto = Constructor[PROTOTYPE];
	      hidden(MapProto, REFERENCE_GET, MapProto.get);
	      hidden(MapProto, REFERENCE_SET, MapProto.set);
	      hidden(MapProto, REFERENCE_DELETE, MapProto['delete']);
	    }
	  }
	  setMapMethods(Map);
	  setMapMethods(WeakMap);
	}('reference');

	/******************************************************************************
	 * Module : dom_itarable                                                      *
	 ******************************************************************************/

	!function(NodeList){
	  if(framework && NodeList && !(SYMBOL_ITERATOR in NodeList[PROTOTYPE])){
	    hidden(NodeList[PROTOTYPE], SYMBOL_ITERATOR, Iterators[ARRAY]);
	  }
	  Iterators.NodeList = Iterators[ARRAY];
	}(global.NodeList);

	/******************************************************************************
	 * Module : dict                                                              *
	 ******************************************************************************/

	!function(DICT){
	  Dict = function(iterable){
	    var dict = create(null);
	    if(iterable != undefined){
	      if(isIterable(iterable)){
	        for(var iter = getIterator(iterable), step, value; !(step = iter.next()).done;){
	          value = step.value;
	          dict[value[0]] = value[1];
	        }
	      } else assign(dict, iterable);
	    }
	    return dict;
	  }
	  Dict[PROTOTYPE] = null;
	  
	  function DictIterator(iterated, kind){
	    set(this, ITER, {o: toObject(iterated), a: getKeys(iterated), i: 0, k: kind});
	  }
	  createIterator(DictIterator, DICT, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , keys  = iter.a
	      , kind  = iter.k
	      , key;
	    do {
	      if(iter.i >= keys.length)return iterResult(1);
	    } while(!has(O, key = keys[iter.i++]));
	    if(kind == KEY)  return iterResult(0, key);
	    if(kind == VALUE)return iterResult(0, O[key]);
	                     return iterResult(0, [key, O[key]]);
	  });
	  function createDictIter(kind){
	    return function(it){
	      return new DictIterator(it, kind);
	    }
	  }
	  
	  /*
	   * 0 -> forEach
	   * 1 -> map
	   * 2 -> filter
	   * 3 -> some
	   * 4 -> every
	   * 5 -> find
	   * 6 -> findKey
	   * 7 -> mapPairs
	   */
	  function createDictMethod(type){
	    var isMap    = type == 1
	      , isEvery  = type == 4;
	    return function(object, callbackfn, that /* = undefined */){
	      var f      = ctx(callbackfn, that, 3)
	        , O      = toObject(object)
	        , result = isMap || type == 7 || type == 2 ? new (generic(this, Dict)) : undefined
	        , key, val, res;
	      for(key in O)if(has(O, key)){
	        val = O[key];
	        res = f(val, key, object);
	        if(type){
	          if(isMap)result[key] = res;             // map
	          else if(res)switch(type){
	            case 2: result[key] = val; break      // filter
	            case 3: return true;                  // some
	            case 5: return val;                   // find
	            case 6: return key;                   // findKey
	            case 7: result[res[0]] = res[1];      // mapPairs
	          } else if(isEvery)return false;         // every
	        }
	      }
	      return type == 3 || isEvery ? isEvery : result;
	    }
	  }
	  function createDictReduce(isTurn){
	    return function(object, mapfn, init){
	      assertFunction(mapfn);
	      var O      = toObject(object)
	        , keys   = getKeys(O)
	        , length = keys.length
	        , i      = 0
	        , memo, key, result;
	      if(isTurn)memo = init == undefined ? new (generic(this, Dict)) : Object(init);
	      else if(arguments.length < 3){
	        assert(length, REDUCE_ERROR);
	        memo = O[keys[i++]];
	      } else memo = Object(init);
	      while(length > i)if(has(O, key = keys[i++])){
	        result = mapfn(memo, O[key], key, object);
	        if(isTurn){
	          if(result === false)break;
	        } else memo = result;
	      }
	      return memo;
	    }
	  }
	  var findKey = createDictMethod(6);
	  function includes(object, el){
	    return (el == el ? keyOf(object, el) : findKey(object, sameNaN)) !== undefined;
	  }
	  
	  var dictMethods = {
	    keys:    createDictIter(KEY),
	    values:  createDictIter(VALUE),
	    entries: createDictIter(KEY+VALUE),
	    forEach: createDictMethod(0),
	    map:     createDictMethod(1),
	    filter:  createDictMethod(2),
	    some:    createDictMethod(3),
	    every:   createDictMethod(4),
	    find:    createDictMethod(5),
	    findKey: findKey,
	    mapPairs:createDictMethod(7),
	    reduce:  createDictReduce(false),
	    turn:    createDictReduce(true),
	    keyOf:   keyOf,
	    includes:includes,
	    // Has / get / set own property
	    has: has,
	    get: get,
	    set: createDefiner(0),
	    isDict: function(it){
	      return isObject(it) && getPrototypeOf(it) === Dict[PROTOTYPE];
	    }
	  };
	  
	  if(REFERENCE_GET)for(var key in dictMethods)!function(fn){
	    function method(){
	      for(var args = [this], i = 0; i < arguments.length;)args.push(arguments[i++]);
	      return invoke(fn, args);
	    }
	    fn[REFERENCE_GET] = function(){
	      return method;
	    }
	  }(dictMethods[key]);
	  
	  $define(GLOBAL + FORCED, {Dict: assignHidden(Dict, dictMethods)});
	}('Dict');

	/******************************************************************************
	 * Module : $for                                                              *
	 ******************************************************************************/

	!function(ENTRIES, FN){  
	  function $for(iterable, entries){
	    if(!(this instanceof $for))return new $for(iterable, entries);
	    this[ITER]    = getIterator(iterable);
	    this[ENTRIES] = !!entries;
	  }
	  
	  createIterator($for, 'Wrapper', function(){
	    return this[ITER].next();
	  });
	  var $forProto = $for[PROTOTYPE];
	  setIterator($forProto, function(){
	    return this[ITER]; // unwrap
	  });
	  
	  function createChainIterator(next){
	    function Iter(I, fn, that){
	      this[ITER]    = getIterator(I);
	      this[ENTRIES] = I[ENTRIES];
	      this[FN]      = ctx(fn, that, I[ENTRIES] ? 2 : 1);
	    }
	    createIterator(Iter, 'Chain', next, $forProto);
	    setIterator(Iter[PROTOTYPE], returnThis); // override $forProto iterator
	    return Iter;
	  }
	  
	  var MapIter = createChainIterator(function(){
	    var step = this[ITER].next();
	    return step.done ? step : iterResult(0, stepCall(this[FN], step.value, this[ENTRIES]));
	  });
	  
	  var FilterIter = createChainIterator(function(){
	    for(;;){
	      var step = this[ITER].next();
	      if(step.done || stepCall(this[FN], step.value, this[ENTRIES]))return step;
	    }
	  });
	  
	  assignHidden($forProto, {
	    of: function(fn, that){
	      forOf(this, this[ENTRIES], fn, that);
	    },
	    array: function(fn, that){
	      var result = [];
	      forOf(fn != undefined ? this.map(fn, that) : this, false, push, result);
	      return result;
	    },
	    filter: function(fn, that){
	      return new FilterIter(this, fn, that);
	    },
	    map: function(fn, that){
	      return new MapIter(this, fn, that);
	    }
	  });
	  
	  $for.isIterable  = isIterable;
	  $for.getIterator = getIterator;
	  
	  $define(GLOBAL + FORCED, {$for: $for});
	}('entries', safeSymbol('fn'));

	/******************************************************************************
	 * Module : binding                                                           *
	 ******************************************************************************/

	!function(_, toLocaleString){
	  // Placeholder
	  core._ = path._ = path._ || {};

	  $define(PROTO + FORCED, FUNCTION, {
	    part: part,
	    only: function(numberArguments, that /* = @ */){
	      var fn     = assertFunction(this)
	        , n      = toLength(numberArguments)
	        , isThat = arguments.length > 1;
	      return function(/* ...args */){
	        var length = min(n, arguments.length)
	          , args   = Array(length)
	          , i      = 0;
	        while(length > i)args[i] = arguments[i++];
	        return invoke(fn, args, isThat ? that : this);
	      }
	    }
	  });
	  
	  function tie(key){
	    var that  = this
	      , bound = {};
	    return hidden(that, _, function(key){
	      if(key === undefined || !(key in that))return toLocaleString.call(that);
	      return has(bound, key) ? bound[key] : (bound[key] = ctx(that[key], that, -1));
	    })[_](key);
	  }
	  
	  hidden(path._, TO_STRING, function(){
	    return _;
	  });
	  
	  hidden(ObjectProto, _, tie);
	  DESC || hidden(ArrayProto, _, tie);
	  // IE8- dirty hack - redefined toLocaleString is not enumerable
	}(DESC ? uid('tie') : TO_LOCALE, ObjectProto[TO_LOCALE]);

	/******************************************************************************
	 * Module : object                                                            *
	 ******************************************************************************/

	!function(){
	  function define(target, mixin){
	    var keys   = ownKeys(toObject(mixin))
	      , length = keys.length
	      , i = 0, key;
	    while(length > i)defineProperty(target, key = keys[i++], getOwnDescriptor(mixin, key));
	    return target;
	  };
	  $define(STATIC + FORCED, OBJECT, {
	    isObject: isObject,
	    classof: classof,
	    define: define,
	    make: function(proto, mixin){
	      return define(create(proto), mixin);
	    }
	  });
	}();

	/******************************************************************************
	 * Module : array                                                             *
	 ******************************************************************************/

	$define(PROTO + FORCED, ARRAY, {
	  turn: function(fn, target /* = [] */){
	    assertFunction(fn);
	    var memo   = target == undefined ? [] : Object(target)
	      , O      = ES5Object(this)
	      , length = toLength(O.length)
	      , index  = 0;
	    while(length > index)if(fn(memo, O[index], index++, this) === false)break;
	    return memo;
	  }
	});
	if(framework)ArrayUnscopables.turn = true;

	/******************************************************************************
	 * Module : array_statics                                                     *
	 ******************************************************************************/

	// JavaScript 1.6 / Strawman array statics shim
	!function(arrayStatics){
	  function setArrayStatics(keys, length){
	    forEach.call(array(keys), function(key){
	      if(key in ArrayProto)arrayStatics[key] = ctx(call, ArrayProto[key], length);
	    });
	  }
	  setArrayStatics('pop,reverse,shift,keys,values,entries', 1);
	  setArrayStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	  setArrayStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	                  'reduce,reduceRight,copyWithin,fill,turn');
	  $define(STATIC, ARRAY, arrayStatics);
	}({});

	/******************************************************************************
	 * Module : number                                                            *
	 ******************************************************************************/

	!function(numberMethods){  
	  function NumberIterator(iterated){
	    set(this, ITER, {l: toLength(iterated), i: 0});
	  }
	  createIterator(NumberIterator, NUMBER, function(){
	    var iter = this[ITER]
	      , i    = iter.i++;
	    return i < iter.l ? iterResult(0, i) : iterResult(1);
	  });
	  defineIterator(Number, NUMBER, function(){
	    return new NumberIterator(this);
	  });
	  
	  numberMethods.random = function(lim /* = 0 */){
	    var a = +this
	      , b = lim == undefined ? 0 : +lim
	      , m = min(a, b);
	    return random() * (max(a, b) - m) + m;
	  };

	  forEach.call(array(
	      // ES3:
	      'round,floor,ceil,abs,sin,asin,cos,acos,tan,atan,exp,sqrt,max,min,pow,atan2,' +
	      // ES6:
	      'acosh,asinh,atanh,cbrt,clz32,cosh,expm1,hypot,imul,log1p,log10,log2,sign,sinh,tanh,trunc'
	    ), function(key){
	      var fn = Math[key];
	      if(fn)numberMethods[key] = function(/* ...args */){
	        // ie9- dont support strict mode & convert `this` to object -> convert it to number
	        var args = [+this]
	          , i    = 0;
	        while(arguments.length > i)args.push(arguments[i++]);
	        return invoke(fn, args);
	      }
	    }
	  );
	  
	  $define(PROTO + FORCED, NUMBER, numberMethods);
	}({});

	/******************************************************************************
	 * Module : string                                                            *
	 ******************************************************************************/

	!function(){
	  var escapeHTMLDict = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&apos;'
	  }, unescapeHTMLDict = {}, key;
	  for(key in escapeHTMLDict)unescapeHTMLDict[escapeHTMLDict[key]] = key;
	  $define(PROTO + FORCED, STRING, {
	    escapeHTML:   createReplacer(/[&<>"']/g, escapeHTMLDict),
	    unescapeHTML: createReplacer(/&(?:amp|lt|gt|quot|apos);/g, unescapeHTMLDict)
	  });
	}();

	/******************************************************************************
	 * Module : date                                                              *
	 ******************************************************************************/

	!function(formatRegExp, flexioRegExp, locales, current, SECONDS, MINUTES, HOURS, MONTH, YEAR){
	  function createFormat(prefix){
	    return function(template, locale /* = current */){
	      var that = this
	        , dict = locales[has(locales, locale) ? locale : current];
	      function get(unit){
	        return that[prefix + unit]();
	      }
	      return String(template).replace(formatRegExp, function(part){
	        switch(part){
	          case 's'  : return get(SECONDS);                  // Seconds : 0-59
	          case 'ss' : return lz(get(SECONDS));              // Seconds : 00-59
	          case 'm'  : return get(MINUTES);                  // Minutes : 0-59
	          case 'mm' : return lz(get(MINUTES));              // Minutes : 00-59
	          case 'h'  : return get(HOURS);                    // Hours   : 0-23
	          case 'hh' : return lz(get(HOURS));                // Hours   : 00-23
	          case 'D'  : return get(DATE);                     // Date    : 1-31
	          case 'DD' : return lz(get(DATE));                 // Date    : 01-31
	          case 'W'  : return dict[0][get('Day')];           // Day     : Понедельник
	          case 'N'  : return get(MONTH) + 1;                // Month   : 1-12
	          case 'NN' : return lz(get(MONTH) + 1);            // Month   : 01-12
	          case 'M'  : return dict[2][get(MONTH)];           // Month   : Январь
	          case 'MM' : return dict[1][get(MONTH)];           // Month   : Января
	          case 'Y'  : return get(YEAR);                     // Year    : 2014
	          case 'YY' : return lz(get(YEAR) % 100);           // Year    : 14
	        } return part;
	      });
	    }
	  }
	  function lz(num){
	    return num > 9 ? num : '0' + num;
	  }
	  function addLocale(lang, locale){
	    function split(index){
	      var result = [];
	      forEach.call(array(locale.months), function(it){
	        result.push(it.replace(flexioRegExp, '$' + index));
	      });
	      return result;
	    }
	    locales[lang] = [array(locale.weekdays), split(1), split(2)];
	    return core;
	  }
	  $define(PROTO + FORCED, DATE, {
	    format:    createFormat('get'),
	    formatUTC: createFormat('getUTC')
	  });
	  addLocale(current, {
	    weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
	    months: 'January,February,March,April,May,June,July,August,September,October,November,December'
	  });
	  addLocale('ru', {
	    weekdays: 'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота',
	    months: 'Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,' +
	            'Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь'
	  });
	  core.locale = function(locale){
	    return has(locales, locale) ? current = locale : current;
	  };
	  core.addLocale = addLocale;
	}(/\b\w\w?\b/g, /:(.*)\|(.*)$/, {}, 'en', 'Seconds', 'Minutes', 'Hours', 'Month', 'FullYear');
	}(typeof self != 'undefined' && self.Math === Math ? self : Function('return this')(), false);

/***/ }
/******/ ]);