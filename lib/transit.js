'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _tweenTweenable = require('./tween/tweenable');

var _tweenTweenable2 = _interopRequireDefault(_tweenTweenable);

var _tweenTween = require('./tween/tween');

var _tweenTween2 = _interopRequireDefault(_tweenTween);

var _tweenTimeline = require('./tween/timeline');

// TODO
//  - properties signatures
//  - move to submodules (Thenable)
//  - move to Deltable
//  - move to Runable
//  --
//  - tween for every prop

var _tweenTimeline2 = _interopRequireDefault(_tweenTimeline);

var h = require('./h');
var Bit = require('./shapes/bit');
var shapesMap = require('./shapes/shapesMap');

var Transit = (function (_Tweenable) {
  _inherits(Transit, _Tweenable);

  _createClass(Transit, [{
    key: '_declareDefaults',

    /*
      Method to declare module's defaults.
      @private
    */
    value: function _declareDefaults() {
      // DEFAULTS / APIs
      this.defaults = {
        // ∆ :: Possible values: [color name, rgb, rgba, hex]
        stroke: 'transparent',
        // ∆ :: Possible values: [ 0..1 ]
        strokeOpacity: 1,
        // Possible values: ['butt' | 'round' | 'square']
        strokeLinecap: '',
        // ∆ :: Possible values: [ number ]
        strokeWidth: 2,
        // ∆ :: Units :: Possible values: [ number, string ]
        strokeDasharray: 0,
        // ∆ :: Units :: Possible values: [ number, string ]
        strokeDashoffset: 0,
        // ∆ :: Possible values: [color name, rgb, rgba, hex]
        fill: 'deeppink',
        // ∆ :: Possible values: [ 0..1 ]
        fillOpacity: 1,
        // ∆ :: Units :: Possible values: [ number, string ]
        left: 0,
        // ∆ :: Units :: Possible values: [ number, string ]
        top: 0,
        // ∆ :: Units :: Possible values: [ number, string ]
        x: 0,
        // ∆ :: Units :: Possible values: [ number, string ]
        y: 0,
        // ∆ :: Units :: Possible values: [ number, string ]
        rx: 0,
        // ∆ :: Units :: Possible values: [ number, string ]
        ry: 0,
        // ∆ :: Possible values: [ number ]
        angle: 0,
        // ∆ :: Possible values: [ number ]
        scale: 1,
        // ∆ :: Possible values: [ 0..1 ]
        opacity: 1,
        // ∆ :: Possible values: [ number ]
        points: 3,
        // ∆ :: Possible values: [ number ]
        radius: { 0: 50 },
        // ∆ :: Possible values: [ number ]
        radiusX: null,
        // ∆ :: Possible values: [ number ]
        radiusY: null,
        // Possible values: [ boolean ]
        isShowStart: false,
        // Possible values: [ boolean ]
        isShowEnd: false,
        // Possible values: [ number ]
        size: null,
        // Possible values: [ number ]
        sizeGap: 0
      };
    }

    /*
      Method to create a then record for the module.
      @public
      @param    {Object} Options for the next animation.
      @returns  {Object} this.
    */
  }, {
    key: 'then',
    value: function then(o) {
      // return if nothing was passed
      if (o == null || !Object.keys(o)) {
        return;
      }
      // merge then options with the current ones
      var merged = this._mergeThenOptions(this.history[this.history.length - 1], o);
      // define onUpdate and onFirstUpdate control callbacks on the object
      this._overrideUpdateCallbacks(merged);
      // set isChaned flag on the tween
      merged.callbacksContext = this;
      // append the tween with the options
      this.timeline.append(new _tweenTween2['default'](merged));
      return this;
    }

    /*
      Method to start the animation with optional new options.
      @public
      @param {Object} New options to set on the run.
      @returns {Object} this.
    */
  }, {
    key: 'run',
    value: function run(o) {
      // if options object was passed
      if (o && Object.keys(o).length) {
        this._transformHistory(o);
        this._tuneNewOption(o);
        // save to history
        o = h.cloneObj(this.history[0]);
        h.extend(o, this.defaults);
        this.history[0] = o;
      }
      this.stop();this.play();
      return this;
    }

    // ^ Public methods / APIs
    // v private methods.
  }]);

  function Transit() {
    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Transit);

    _get(Object.getPrototypeOf(Transit.prototype), 'constructor', this).call(this, o);
    this._o = o;
    this._declareDefaults();
    this._vars();
    this._render();
  }

  /*
    Method to declare variables.
  */

  _createClass(Transit, [{
    key: '_vars',
    value: function _vars() {
      this.progress = 0;
      this._props = {};
      this.lastSet = {};
      this.origin = {};
      this.index = this._o.index || 0;
      this._currentHistoryIndex = 0;
      this._extendDefaults();
      var o = h.cloneObj(this._o);
      h.extend(o, this.defaults);
      this.history = [o];
      // should draw on foreign svg canvas
      this.isForeign = !!this._o.ctx;
      // should take an svg element as self bit
      return this.isForeignBit = !!this._o.bit;
    }

    /*
      Method to override(or define) update callbacks in passed object.
      @param {Object} Object to override callbacks in.
    */
  }, {
    key: '_overrideUpdateCallbacks',
    value: function _overrideUpdateCallbacks(object) {
      var it = this,
          // save lexical this, uh oh
      onUpdate = object.onUpdate,
          isOnUpdate = onUpdate && typeof onUpdate === 'function';
      // redefine onUpdate for Transit's draw calculation in _setProgress
      object.onUpdate = function (pe) {
        // call onUpdate function from options
        isOnUpdate && onUpdate.apply(this, arguments);
        // calcalate and draw Transit's progress
        it._setProgress(pe);
      };

      var onFirstUpdate = object.onFirstUpdate,
          isOnFirstUpdate = onFirstUpdate && typeof onFirstUpdate === 'function';
      // redefine onFirstUpdate for Transit's _tuneHistoryRecord
      object.onFirstUpdate = function onFirstUpdateFunction(isForward) {
        // call onFirstUpdate function from options
        isOnFirstUpdate && onFirstUpdate.apply(this, arguments);
        // call tune options with index of the tween
        it._tuneHistoryRecord(onFirstUpdateFunction.tween.index || 0);
      };
    }

    /*
      Method to parse option string.
      Searches for stagger and rand values and parses them.
      Leaves the value unattended otherwise.
      @param {Any} Option value to parse.
      @returns {Number} Parsed options value.
    */
  }, {
    key: '_parseOptionString',
    value: function _parseOptionString(optionsValue) {
      if (typeof optionsValue === 'string') {
        if (optionsValue.match(/stagger/)) {
          optionsValue = h.parseStagger(optionsValue, this.index);
        }
      }
      if (typeof optionsValue === 'string') {
        if (optionsValue.match(/rand/)) {
          optionsValue = h.parseRand(optionsValue);
        }
      }
      return optionsValue;
    }

    /*
      Method to parse postion option.
      @param {String} Property name.
      @returns {String} Parsed options value.
    */
  }, {
    key: '_parsePositionOption',
    value: function _parsePositionOption(key) {
      var value = this._props[key];
      if (h.unitOptionMap[key]) {
        value = h.parseUnit(value).string;
      }
      return value;
    }

    /*
      Method to parse strokeDash.. option.
      @param {String} Property name.
      @returns {String} Parsed options value.
    */
  }, {
    key: '_parseStrokeDashOption',
    value: function _parseStrokeDashOption(key) {
      var value = this._props[key],
          result = value;
      // parse numeric/percent values for strokeDash.. properties
      if (h.strokeDashPropsMap[key]) {
        var result = [];
        switch (typeof value) {
          case 'number':
            result.push(h.parseUnit(value));
            break;
          case 'string':
            var array = this._props[key].split(' ');
            for (var i = 0; i < array.length; i++) {
              var unit = array[i];
              result.push(h.parseUnit(unit));
            }
            break;
        }
      }
      return result;
    }

    /*
      Method to extend module defaults with passed options.
      @param {Object} Optional object to extend defaults with.
    */
  }, {
    key: '_extendDefaults',
    value: function _extendDefaults(o) {
      // reset deltas if no options was passed
      o == null && (this.deltas = {});
      var fromObject = o || this.defaults,
          keys = Object.keys(fromObject),
          len = keys.length;
      while (len--) {
        var key = keys[len];
        // skip property if it is listed in skipProps
        if (this.skipProps && this.skipProps[key]) {
          continue;
        }

        var optionsValue = o ?
        // if fromObject was pass - get the value from passed o
        this._o[key] = fromObject[key]
        // if from object wasn't passed - get options value from _o
        // with fallback to defaults
        : this._o[key] != null ? this._o[key] : fromObject[key];
        // and delete the key from deltas
        o && delete this.deltas[key];
        // if delta property
        if (this._isDelta(optionsValue)) {
          this._getDelta(key, optionsValue);
        } else {
          // parse stagger and rand values
          this._props[key] = this._parseOptionString(optionsValue);
          // parse units for position properties
          this._props[key] = this._parsePositionOption(key);
          // parse numeric/percent values for strokeDash.. properties
          this._props[key] = this._parseStrokeDashOption(key);
        }
      }
    }

    /*
      Method to initialize modules presentation.
      @private
    */
  }, {
    key: '_render',
    value: function _render() {
      if (!this.isRendered) {
        if (!this.isForeign && !this.isForeignBit) {
          this.ctx = document.createElementNS(h.NS, 'svg');
          this.ctx.style.position = 'absolute';
          this.ctx.style.width = '100%';
          this.ctx.style.height = '100%';
          this._createBit();
          this._calcSize();
          this.el = document.createElement('div');
          this.el.appendChild(this.ctx);
          (this._o.parent || document.body).appendChild(this.el);
        } else {
          this.ctx = this._o.ctx;this._createBit();this._calcSize();
        }
        this.isRendered = true;
      }
      this._setElStyles();

      if (this.el != null) {
        this.el.style.opacity = this._props.opacity;
      }
      if (this._o.isShowStart) {
        this._show();
      } else {
        this._hide();
      }

      this._setProgress(0);
      return this;
    }

    /*
      Method to set el styles on initialization.
      @private
    */
  }, {
    key: '_setElStyles',
    value: function _setElStyles() {
      var marginSize, ref, size;
      if (!this.isForeign) {
        size = this._props.size + "px";
        this.el.style.position = 'absolute';
        this.el.style.top = this._props.top;
        this.el.style.left = this._props.left;
        this.el.style.width = size;
        this.el.style.height = size;
        marginSize = -this._props.size / 2 + "px";
        this.el.style['margin-left'] = marginSize;
        this.el.style['margin-top'] = marginSize;
        this.el.style['marginLeft'] = marginSize;
        this.el.style['marginTop'] = marginSize;
      }
    }

    /*
      Method to show the main div el.
      @private
    */
  }, {
    key: '_show',
    value: function _show() {
      if (this.isShown || this.el == null) {
        return;
      }
      this.el.style.display = 'block';
      this.isShown = true;
    }

    /*
      Method to hide the main div el.
      @private
    */
  }, {
    key: '_hide',
    value: function _hide() {
      if (this.isShown === false || this.el == null) {
        return;
      }
      this.el.style.display = 'none';
      return this.isShown = false;
    }

    /*
      Method to draw shape.
      @private
    */
  }, {
    key: '_draw',
    value: function _draw() {
      // console.log(this._props.radius);
      this.bit.setProp({
        x: this.origin.x,
        y: this.origin.y,
        rx: this._props.rx,
        ry: this._props.ry,
        stroke: this._props.stroke,
        'stroke-width': this._props.strokeWidth,
        'stroke-opacity': this._props.strokeOpacity,
        'stroke-dasharray': this._props.strokeDasharray,
        'stroke-dashoffset': this._props.strokeDashoffset,
        'stroke-linecap': this._props.strokeLinecap,
        fill: this._props.fill,
        'fill-opacity': this._props.fillOpacity,
        radius: this._props.radius,
        radiusX: this._props.radiusX,
        radiusY: this._props.radiusY,
        points: this._props.points,
        transform: this._calcShapeTransform()
      });
      this.bit.draw();this._drawEl();
    }

    /*
      Method to set current modules props to main div el.
      @private
    */
  }, {
    key: '_drawEl',
    value: function _drawEl() {
      if (this.el == null) {
        return true;
      }
      var p = this._props;
      this._isPropChanged('opacity') && (this.el.style.opacity = p.opacity);
      if (!this.isForeign) {
        this._isPropChanged('left') && (this.el.style.left = p.left);
        this._isPropChanged('top') && (this.el.style.top = p.top);
        var isPosChanged = this._isPropChanged('x') || this._isPropChanged('y');
        if (isPosChanged || this._isPropChanged('scale')) {
          h.setPrefixedStyle(this.el, 'transform', this._fillTransform());
        }
      }
    }

    /*
      Method to check if property changed after the latest set.
      @private
      @param {String} Name of the property to check.
      @returns {Boolean}
    */
  }, {
    key: '_isPropChanged',
    value: function _isPropChanged(name) {
      // if there is no recod for the property - create it
      if (this.lastSet[name] == null) {
        this.lastSet[name] = {};
      }
      if (this.lastSet[name].value !== this._props[name]) {
        this.lastSet[name].value = this._props[name];
        return true;
      } else {
        return false;
      }
    }

    /*
      Method to create shape's transform string.
      @private
      @returns {String} Transform string for the shape.
    */
  }, {
    key: '_calcShapeTransform',
    value: function _calcShapeTransform() {
      return 'rotate(' + this._props.angle + ', ' + this.origin.x + ', ' + this.origin.y + ')';
      // this._props.transform = "rotate(" + this._props.angle + "," + this.origin.x + "," + this.origin.y + ")";
    }

    /*
      Method to calculate maximum shape's radius.
      @private
      @returns {Number} Maximum raduis.
    */
  }, {
    key: '_calcMaxShapeRadius',
    value: function _calcMaxShapeRadius() {
      var selfSize, selfSizeX, selfSizeY;
      selfSize = this._getRadiusSize({ key: 'radius' });
      selfSizeX = this._getRadiusSize({ key: 'radiusX', fallback: selfSize });
      selfSizeY = this._getRadiusSize({ key: 'radiusY', fallback: selfSize });
      return Math.max(selfSizeX, selfSizeY);
    }

    /*
      Method to calculate maximum size of the svg canvas.
      @private
    */
  }, {
    key: '_calcSize',
    value: function _calcSize() {
      if (this._o.size) {
        return;
      }
      var p = this._props,
          radius = this._calcMaxShapeRadius(),
          dStroke = this.deltas['strokeWidth'],
          stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this._props.strokeWidth;
      p.size = 2 * radius + 2 * stroke;
      this._increaseSizeWithEasing();
      this._increaseSizeWithBitRatio();
      return p.center = p.size / 2;
    }

    /*
      Method to increase calculated size based on easing.
      @private
    */
  }, {
    key: '_increaseSizeWithEasing',
    value: function _increaseSizeWithEasing() {
      var p = this._props,
          easing = this._o.easing,
          isStringEasing = easing && typeof easing === 'string';
      switch (isStringEasing && easing.toLowerCase()) {
        case 'elastic.out':
        case 'elastic.inout':
          p.size *= 1.25;
          break;
        case 'back.out':
        case 'back.inout':
          p.size *= 1.1;
      }
    }

    /*
      Method to increase calculated size based on bit ratio.
      @private
    */
  }, {
    key: '_increaseSizeWithBitRatio',
    value: function _increaseSizeWithBitRatio() {
      var p = this._props;
      p.size *= this.bit.ratio;
      p.size += 2 * p.sizeGap;
    }

    /*
      Method to get maximum radius size with optional fallback.
      @private
      @param {Object}
        @param key {String} Name of the radius - [radius|radiusX|radiusY].
        @param @optional fallback {Number}  Optional number to set if there
                                            is no value for the key.
    */
  }, {
    key: '_getRadiusSize',
    value: function _getRadiusSize(o) {
      var delta = this.deltas[o.key];
      // if value is delta value
      if (delta != null) {
        // get maximum number between start and end values of the delta
        return Math.max(Math.abs(delta.end), Math.abs(delta.start));
      } else if (this._props[o.key] != null) {
        // else get the value from props object
        return parseFloat(this._props[o.key]);
      } else {
        return o.fallback || 0;
      }
    }

    /*
      Method to find the shape and initialize it.
      @private
    */
  }, {
    key: '_createBit',
    value: function _createBit() {
      var bitClass = shapesMap.getShape(this._o.shape || 'circle');
      this.bit = new bitClass({ ctx: this.ctx, el: this._o.bit, isDrawLess: true });
      // if draw on foreign context
      // or we are animating an svg element outside the module
      if (this.isForeign || this.isForeignBit) {
        return this.el = this.bit.el;
      }
    }

    /*
      Method to draw current progress of the deltas.
      @private
      @param {Number}  Progress to set - [0..1].
      @param {Boolean} If should show module's main div el.
      @returns {Object} this.
    */
  }, {
    key: '_setProgress',
    value: function _setProgress(progress, isShow) {
      this.progress = progress;
      this._calcCurrentProps(progress);
      this._calcOrigin();
      this._draw(progress);
      return this;
    }

    /*
      Method to calculate current progress of the deltas.
      @private
      @param {Number} Progress to calculate - [0..1].
    */
  }, {
    key: '_calcCurrentProps',
    value: function _calcCurrentProps(progress) {
      var a, b, dash, g, i, item, key, keys, len, r, stroke, units, value;
      keys = Object.keys(this.deltas);
      len = keys.length;
      while (len--) {
        key = keys[len];
        value = this.deltas[key];
        this._props[key] = (function () {
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
        }).call(this);
      }
    }

    /*
      Method to calculate transform origin for the element.
      @private
    */
  }, {
    key: '_calcOrigin',
    value: function _calcOrigin() {
      var p = this._props;
      // if drawing context was passed
      // set origin to x and y of the module
      // otherwise set the origin to the center
      this.origin.x = this._o.ctx ? parseFloat(p.x) : p.center;
      this.origin.y = this._o.ctx ? parseFloat(p.y) : p.center;
    }

    /*
      Method to check if the property is delta property.
      @private
      @param {Any} Parameter value to check.
      @returns {Boolean}
    */
  }, {
    key: '_isDelta',
    value: function _isDelta(optionsValue) {
      var isObject = h.isObject(optionsValue);
      isObject = isObject && !optionsValue.unit;
      return !(!isObject || h.isArray(optionsValue) || h.isDOM(optionsValue));
    }

    /*
      Method to get delta from property and set
      the property's start value to the props object.
      @private
      @param {String} Key name to get delta for.
      @param {Object} Option value to get the delta for.
    */
  }, {
    key: '_getDelta',
    value: function _getDelta(key, optionsValue) {
      var delta;
      if ((key === 'left' || key === 'top') && !this._o.ctx) {
        h.warn('Consider to animate x/y properties instead of left/top,\n        as it would be much more performant', optionsValue);
      }
      // skip delta calculation for a property if it is listed
      // in skipPropsDelta object
      if (this.skipPropsDelta && this.skipPropsDelta[key]) {
        return;
      }
      // get delta
      delta = h.parseDelta(key, optionsValue, this.defaults[key]);
      // if successfully parsed - save it
      if (delta.type != null) {
        this.deltas[key] = delta;
      }
      // set props to start value of the delta
      // this._props[key] = delta.start;
    }

    /*
      Method to merge two options into one. Used in .then chains.
      @private
      @param {Object} Start options for the merge.
      @param {Object} End options for the merge.
      @returns {Object} Merged options.
    */
  }, {
    key: '_mergeThenOptions',
    value: function _mergeThenOptions(start, end) {
      var o = {};
      this._mergeStartLoop(o, start);
      this._mergeEndLoop(o, start, end);
      this.history.push(o);
      return o;
    }

    /*
      Originally part of the _mergeThenOptions.
      Loops thru start object and copies all the props from it.
      @param {Object} An object to copy in.
      @parma {Object} Start options object.
    */
  }, {
    key: '_mergeStartLoop',
    value: function _mergeStartLoop(o, start) {
      // loop thru start options object
      for (var key in start) {
        var value = start[key];
        if (start[key] == null) {
          continue;
        };
        // copy all values from start if not tween prop or duration
        if (!h.isTweenProp(key) || key === 'duration') {
          // if delta - copy only the end value
          if (this._isDelta(value)) {
            o[key] = h.getDeltaEnd(value);
          } else {
            o[key] = value;
          }
        }
      }
    }

    /*
      Originally part of the _mergeThenOptions.
      Loops thru start object and copies all the props from it.
      @param {Object} An object to copy in.
      @parma {Object} Start options object.
      @parma {Object} End options object.
    */
  }, {
    key: '_mergeEndLoop',
    value: function _mergeEndLoop(o, start, end) {
      var endKeys = Object.keys(end);

      for (var endP in end) {
        // get key/value of the end object
        // endKey - name of the property, endValue - value of the property
        var endValue = end[endP],
            startValue = start[endP] != null ? start[endP] : this.defaults[endP];
        if (endValue == null) {
          continue;
        };
        // make ∆ of start -> end
        // if key name is radiusX/radiusY and
        // the startValue is not set fallback to radius value
        var isSubRadius = endP === 'radiusX' || endP === 'radiusY';
        if (isSubRadius && startValue == null) {
          startValue = start.radius;
        }
        // if isnt tween property
        if (!h.isTweenProp(endP)) {
          // if end value is delta - just save it
          if (this._isDelta(endValue)) {
            o[endP] = endValue;
          } else {
            // if end value is not delta - merge with start value
            if (this._isDelta(startValue)) {
              // if start value is delta - take the end value
              // as start value of the new delta
              o[endP] = _defineProperty({}, h.getDeltaEnd(startValue), endValue);
              // if start value is not delta - make delta
            } else {
                o[endP] = _defineProperty({}, startValue, endValue);
              }
          }
          // copy the tween values unattended
        } else {
            o[endP] = endValue;
          }
      }
    }

    /*
      Method to retrieve history record by index
      and pass it to the _tuneOptions method.
      @param {Number} Index of the history record.
    */
  }, {
    key: '_tuneHistoryRecord',
    value: function _tuneHistoryRecord(index) {
      if (this._currentHistoryIndex === index) {
        return 1;
      }
      this._tuneOptions(this.history[index]);
      this._currentHistoryIndex = index;
    }

    /*
      Method to tune new options on history traversal.
      @param {Object} Options values to tune to.
      @private
    */
  }, {
    key: '_tuneOptions',
    value: function _tuneOptions(o) {
      this._extendDefaults(o);this._calcSize();this._setElStyles();
    }

    /*
      Method to setup tween and timeline options before creating them.
      @private  
    */
  }, {
    key: '_transformTweenOptions',
    value: function _transformTweenOptions() {
      this._makeTweenControls();
      this._makeTimelineControls();
    }

    /*
      Method to make tween's control callbacks.
      Tween's onUpdate one is used to tackle the _setProgress method,
      onStart one is used to show/hide module.
      @private
    */
  }, {
    key: '_makeTweenControls',
    value: function _makeTweenControls() {
      var it = this; // save lexical this, uh oh
      // override(or define) tween control callbacks
      this._overrideUpdateCallbacks(this._o);

      var onStart = this._o.onStart,
          isOnStart = onStart && typeof onStart === 'function';
      // redefine onStart to show/hide Transit
      this._o.onStart = function (isForward) {
        // call onStart function from options
        isOnStart && onStart.apply(this, arguments);
        // show the Transit on start
        // hide the Transit on reverse complete if isShowStart is not set
        isForward ? it._show() : !it._props.isShowStart && it._hide();
      };
    }

    /*
      Method to make timelines' control callbacks.
      onComplete is used to hide module at the end of animation.
      @private
    */
  }, {
    key: '_makeTimelineControls',
    value: function _makeTimelineControls() {
      // make timeline options object if is not defined
      this._o.timeline = this._o.timeline || {};
      // redefine onStart for Transit's purposes
      var it = this,
          onComplete = this._o.timeline.onComplete,
          isOnComplete = onComplete && typeof onComplete === 'function';

      this._o.timeline.onComplete = function (isForward) {
        // call timeline's onComplete function from options
        isOnComplete && onComplete.apply(it.timeline, arguments);
        // hide the Transit at the end / show transit at reverse start
        isForward ? !it._props.isShowEnd && it._hide() : it._show();
      };
    }

    /*
      Method to transform history rewrite new options object chain on run.
      @param {Object} New options to tune for.
    */
  }, {
    key: '_transformHistory',
    value: function _transformHistory(o) {
      var optionsKeys = Object.keys(o);

      for (var i = 0; i < optionsKeys.length; i++) {
        var optionsKey = optionsKeys[i],
            optionsValue = o[optionsKey];

        this._transformHistoryFor(optionsKey, optionsValue);
      }
    }

    /*
      Method to transform history chain for specific key/value.
      @param {String} Name of the property to transform history for.
      @param {Any} The new property's value.
    */
  }, {
    key: '_transformHistoryFor',
    value: function _transformHistoryFor(key, value) {
      for (var i = 0; i < this.history.length; i++) {
        if (this._transformHistoryRecord(i, key, value)) {
          break; // break if no further history modifications needed
        }
      }
    }

    /*
      Method to transform history recod with key/value.
      @param {Number} Index of the history record to transform.
      @param {String} Property name to transform.
      @param {Any} Property value to transform to.
      @returns {Boolean} Returns true if no further
                         history modifications is needed.
    */
  }, {
    key: '_transformHistoryRecord',
    value: function _transformHistoryRecord(index, key, value) {
      var currRecord = this.history[index],
          prevRecord = this.history[index - 1],
          nextRecord = this.history[index + 1],
          propertyValue = currRecord[key];

      if (this._isDelta(value)) {
        // if previous history record have been already overriden
        // with the delta, copy only the end property to the start
        if (prevRecord && prevRecord[key] === value) {
          var prevEnd = h.getDeltaEnd(prevRecord[key]);
          currRecord[key] = _defineProperty({}, prevEnd, h.getDeltaEnd(propertyValue));
          return true;
        } // else go to very end of this function
        // if new value is delta
      } else {
        // if property value is delta - rewrite it's start
        // and notify parent to stop hitory modifications
        if (this._isDelta(propertyValue)) {
          currRecord[key] = _defineProperty({}, value, h.getDeltaEnd(propertyValue));
          return true;
          // both are not deltas and further in the chain
        } else {
            currRecord[key] = value;
            // if next record isn't delta - we should always override it
            // so do not notify parent
            if (nextRecord && !this._isDelta(nextRecord[key])) {
              // notify that no modifications needed in the next record
              return nextRecord[key] !== propertyValue;
            }
          } // else go to very end of this function
      }
      currRecord[key] = value;
    }

    /*
      Method to tune new option on run.
      @private
      @param {Object}  Option to tune on run.
      @param {Boolean} If foreign svg canvas.
    */
  }, {
    key: '_tuneNewOption',
    value: function _tuneNewOption(o, isForeign) {
      if (o != null && o.shape != null && o.shape !== (this._o.shape || 'circle')) {
        h.warn('Sorry, shape can not be changed on run');
        delete o.shape;
      }
      if (o != null && Object.keys(o).length) {
        this._extendDefaults(o);
        this._resetTweens(isForeign);
        this._calcSize();
        return !isForeign && this._setElStyles();
      }
    }

    /*
      Method to set new options on run.
      @param {Boolean} If foreign context.
      @private
    */
  }, {
    key: '_resetTweens',
    value: function _resetTweens(isForeign) {
      var i = 0,
          shift = 0,
          tweens = this.timeline._timelines;

      for (var i = 0; i < tweens.length; i++) {
        var tween = tweens[i],
            prevTween = tweens[i - 1];

        shift += prevTween ? prevTween._props.repeatTime : 0;
        this._resetTween(tween, this.history[i], shift);
      }
      !isForeign && this.timeline._recalcTotalDuration();
    }

    /*
      Method to reset tween with new options.
      @param {Object} Tween to reset.
      @param {Object} Tween's to reset tween with.
      @param {Number} Optional number to shift tween start time.
    */
  }, {
    key: '_resetTween',
    value: function _resetTween(tween, o) {
      var shift = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      o.shiftTime = shift;tween._setProps(o);
    }

    /*
      Method to set property on the module.
      @private
      @param {String, Object} Name of the property to set
                              or object with properties to set.
      @param {Any} Value for the property to set. Could be
                    undefined if the first param is object.
    */
  }, {
    key: '_setProp',
    value: function _setProp(attr, value) {
      if (typeof attr === 'object') {
        var keys = Object.keys(attr);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i],
              val = keys[key];
          this._props[key] = val;
        }
      } else {
        this._props[attr] = value;
      }
    }

    // /*
    //   Method to get if the x/y values changed.
    // */
    // _isNeedsTransform () {
    //   return this._isPropChanged('x') || this._isPropChanged('y');
    // }
    /*
      Method to create transform string;
      @private
      @returns {String} Transform string.
    */
  }, {
    key: '_fillTransform',
    value: function _fillTransform() {
      var p = this._props;
      return 'translate(' + p.x + ', ' + p.y + ') scale(' + p.scale + ')';
    }
  }]);

  return Transit;
})(_tweenTweenable2['default']);

exports['default'] = Transit;
module.exports = exports['default'];