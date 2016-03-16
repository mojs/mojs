'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _tweenTweenable = require('./tween/tweenable');

var _tweenTweenable2 = _interopRequireDefault(_tweenTweenable);

var _thenable = require('./thenable');

var _thenable2 = _interopRequireDefault(_thenable);

var _tweenTween = require('./tween/tween');

var _tweenTween2 = _interopRequireDefault(_tweenTween);

var _tweenTimeline = require('./tween/timeline');

// TODO
//  - refactor
//    - add set if changed to Module
//  - move to Runable
//  --
//  - tween for every prop

var _tweenTimeline2 = _interopRequireDefault(_tweenTimeline);

var h = require('./h');
var Bit = require('./shapes/bit');
var shapesMap = require('./shapes/shapesMap');

var Transit = (function (_Thenable) {
  _inherits(Transit, _Thenable);

  function Transit() {
    _classCallCheck(this, Transit);

    _get(Object.getPrototypeOf(Transit.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Transit, [{
    key: '_declareDefaults',

    /*
      Method to declare module's defaults.
      @private
    */
    value: function _declareDefaults() {
      // DEFAULTS / APIs
      this._defaults = {
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
        sizeGap: 0,
        // context for all the callbacks
        callbacksContext: null
      };

      this._skipPropsDelta = this._skipPropsDelta || {
        callbacksContext: 1
      };
    }

    // ^ Public methods / APIs
    // v private methods.

    /*
      Method to declare variables.
      @overrides Thenable
    */
  }, {
    key: '_vars',
    value: function _vars() {
      // call _vars method on Thenable
      _get(Object.getPrototypeOf(Transit.prototype), '_vars', this).call(this);
      this.lastSet = {};
      this.origin = {};
      // should draw on foreign svg canvas
      this.isForeign = !!this._o.ctx;
      // should take an svg element as self bit
      return this.isForeignBit = !!this._o.bit;
    }

    /*
      Method to initialize modules presentation.
      @private
      @overrides Module
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
      Method to draw shape.
      @private
    */
  }, {
    key: '_draw',
    value: function _draw() {
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
          dStroke = this._deltas['strokeWidth'],
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
      var delta = this._deltas[o.key];
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
      @override @ Module
      @param   {Number}  Progress to set - [0..1].
    */
  }, {
    key: '_setProgress',
    value: function _setProgress(progress) {
      // call the super on Module
      _get(Object.getPrototypeOf(Transit.prototype), '_setProgress', this).call(this, progress);
      this._calcOrigin();
      this._draw(progress);
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
      Method to setup tween and timeline options before creating them.
      @override @ Tweenable
      @private  
    */
  }, {
    key: '_transformTweenOptions',
    value: function _transformTweenOptions() {
      // override(or define) tween control callbacks
      // leave onUpdate callback without optimization due to perf reasons
      var it = this,
          // save lexical this, uh oh
      onUpdate = this._o.onUpdate,
          isOnUpdate = onUpdate && typeof onUpdate === 'function';
      // redefine onUpdate for Transit's draw calculation in _setProgress
      this._o.onUpdate = function (pe) {
        // call onUpdate function from options
        isOnUpdate && onUpdate.apply(this, arguments);
        // calcalate and draw Transit's progress
        it._setProgress(pe);
      };

      this._overrideCallback('onStart', function (isForward) {
        isForward ? it._show() : !it._props.isShowStart && it._hide();
      });
      this._overrideCallback('onComplete', function (isForward) {
        isForward ? !it._props.isShowEnd && it._hide() : it._show();
      });
    }

    /*
      Method to override callback for controll pupropes.
      @private
      @param {String}    Callback name.
      @parma {Function}  Method to call  
    */
  }, {
    key: '_overrideCallback',
    value: function _overrideCallback(name, fun) {
      var callback = this._o[name],
          isCallback = callback && typeof callback === 'function';

      this._o[name] = function () {
        // call overriden callback if it exists
        isCallback && callback.apply(this, arguments);
        // call the passed cleanup function
        fun.apply(this, arguments);
      };
    }

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
})(_thenable2['default']);

exports['default'] = Transit;
module.exports = exports['default'];