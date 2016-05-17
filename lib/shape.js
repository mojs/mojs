'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _module2 = require('./module');

var _module3 = _interopRequireDefault(_module2);

var _thenable = require('./thenable');

var _thenable2 = _interopRequireDefault(_thenable);

var _tunable = require('./tunable');

var _tunable2 = _interopRequireDefault(_tunable);

var _tweenTweenable = require('./tween/tweenable');

var _tweenTweenable2 = _interopRequireDefault(_tweenTweenable);

var _tweenTween = require('./tween/tween');

var _tweenTween2 = _interopRequireDefault(_tweenTween);

var _tweenTimeline = require('./tween/timeline');

// TODO
//  - refactor
//    - add setIfChanged to Module
//  --
//  - tween for every prop

var _tweenTimeline2 = _interopRequireDefault(_tweenTimeline);

var h = require('./h');
var Bit = require('./shapes/bit');
var shapesMap = require('./shapes/shapesMap');

var Shape = (function (_Tunable) {
  _inherits(Shape, _Tunable);

  function Shape() {
    _classCallCheck(this, Shape);

    _get(Object.getPrototypeOf(Shape.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Shape, [{
    key: '_declareDefaults',

    /*
      Method to declare module's defaults.
      @private
    */
    value: function _declareDefaults() {
      // DEFAULTS / APIs
      this._defaults = {
        // where to append the module to [selector, HTMLElement]
        parent: document.body,
        // Possible values: [circle, line, zigzag, rect, polygon, cross, equal ]
        shape: 'circle',
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
        // ∆ :: Possible values: [ number ]
        angle: 0,
        // ∆ :: Possible values: [ number ]
        scale: 1,
        // ∆ :: Possible values: [ number ] Fallbacks to `scale`.
        scaleX: null,
        // ∆ :: Possible values: [ number ] Fallbacks to `scale`.
        scaleY: null,
        // ∆ :: Possible values: [ number, string ]
        origin: '50% 50%',
        // ∆ :: Possible values: [ 0..1 ]
        opacity: 1,
        // ∆ :: Units :: Possible values: [ number, string ]
        rx: 0,
        // ∆ :: Units :: Possible values: [ number, string ]
        ry: 0,
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
        isShowEnd: true,
        // Possible values: [ number > 0 ]
        duration: 400,
        // Possible values: [ number ]
        size: null,
        // Possible values: [ number ]
        sizeGap: 0,
        // context for all the callbacks
        callbacksContext: this
      };
    }

    // ^ PUBLIC  METHOD(S) ^
    // v PRIVATE METHOD(S) v

    /*
      Method to declare variables.
      @overrides Thenable
    */
  }, {
    key: '_vars',
    value: function _vars() {
      // call _vars method on Thenable
      _get(Object.getPrototypeOf(Shape.prototype), '_vars', this).call(this);
      this._lastSet = {};
      this._origin = {};
      // save _master module
      this._masterModule = this._o.masterModule;
      // save previous module in the chain
      this._prevChainModule = this._o.prevChainModule;
      // should draw on foreign svg canvas
      this.isForeign = !!this._o.ctx;
      // should take an svg element as self bit
      return this.isForeignBit = !!this._o.shape;
    }

    /*
      Method to initialize modules presentation.
      @private
      @overrides Module
    */
  }, {
    key: '_render',
    value: function _render() {
      if (!this._isRendered) {
        // create `mojs` shape element
        this.el = document.createElement('div');
        this.el.setAttribute('data-name', 'mojs-shape-el');
        // create shape module
        this._createShape();
        // append `el` to parent
        this._props.parent.appendChild(this.el);
        // set `_isRendered` hatch
        this._isRendered = true;
      }

      this._setElStyles();

      // if (this.el != null) { this.el.style.opacity = this._props.opacity; }
      if (this._props.isShowStart) {
        this._show();
      } else {
        this._hide();
      }

      // if ( this._isFirstInChain() && this._props.isShowStart ) {
      //   this._showPositionEl();
      // }
      // set initial position for the first module in the chain
      this._isFirstInChain() && this._setProgress(0);
      return this;
    }

    /*
      Method to set el styles on initialization.
      @private
    */
  }, {
    key: '_setElStyles',
    value: function _setElStyles() {
      if (!this.el) {
        return;
      }
      // if (!this.isForeign) {
      var p = this._props;
      var style = this.el.style;
      var width = p.shapeWidth;
      var height = p.shapeHeight;
      style.position = 'absolute';
      style.width = width + 'px';
      style.height = height + 'px';
      style['margin-left'] = -width / 2 + 'px';
      style['margin-top'] = -height / 2 + 'px';
      // }
    }

    /*
      Method to draw shape.
      @private
    */
  }, {
    key: '_draw',
    value: function _draw() {
      var p = this._props,
          bP = this.shape._props;
      // set props on bit
      bP.x = this._origin.x;
      bP.y = this._origin.y;
      bP.rx = p.rx;
      bP.ry = p.ry;
      bP.stroke = p.stroke;
      bP['stroke-width'] = p.strokeWidth;
      bP['stroke-opacity'] = p.strokeOpacity;
      bP['stroke-dasharray'] = p.strokeDasharray;
      bP['stroke-dashoffset'] = p.strokeDashoffset;
      bP['stroke-linecap'] = p.strokeLinecap;
      bP.fill = p.fill;
      bP['fill-opacity'] = p.fillOpacity;
      bP.radius = p.radius;
      bP.radiusX = p.radiusX;
      bP.radiusY = p.radiusY;
      bP.points = p.points;

      this.shape._draw();this._drawEl();
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
      var style = this.el.style;

      style.opacity = p.opacity;
      this._isPropChanged('opacity') && (style.opacity = p.opacity);
      if (!this.isForeign) {
        this._isPropChanged('left') && (style.left = p.left);
        this._isPropChanged('top') && (style.top = p.top);

        var isX = this._isPropChanged('x'),
            isY = this._isPropChanged('y'),
            isTranslate = isX || isY,
            isScaleX = this._isPropChanged('scaleX'),
            isScaleY = this._isPropChanged('scaleY'),
            isScale = this._isPropChanged('scale'),
            isScale = isScale || isScaleX || isScaleY,
            isRotate = this._isPropChanged('angle');

        if (isTranslate || isScale || isRotate) {
          var transform = this._fillTransform();
          style[h.prefix.css + 'transform'] = transform;
          style['transform'] = transform;
        }

        if (this._isPropChanged('origin') || this._deltas['origin']) {
          var origin = this._fillOrigin();
          style[h.prefix.css + 'transform-origin'] = origin;
          style['transform-origin'] = origin;
        }
      }
    }

    /*
      Method to check if property changed after the latest check.
      @private
      @param {String} Name of the property to check.
      @returns {Boolean}
    */
  }, {
    key: '_isPropChanged',
    value: function _isPropChanged(name) {
      // if there is no recod for the property - create it
      if (this._lastSet[name] == null) {
        this._lastSet[name] = {};
      }
      if (this._lastSet[name].value !== this._props[name]) {
        this._lastSet[name].value = this._props[name];
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
      return 'rotate(' + this._props.angle + ', ' + this._origin.x + ', ' + this._origin.y + ')';
    }

    /*
      Method to tune new option on run.
      @private
      @override @ Module
      @param {Object}  Option to tune on run.
    */
  }, {
    key: '_tuneNewOptions',
    value: function _tuneNewOptions(o) {
      // call super on Module
      _get(Object.getPrototypeOf(Shape.prototype), '_tuneNewOptions', this).call(this, o);
      // return if empty object
      if (!(o != null && Object.keys(o).length)) {
        return 1;
      }

      this._calcSize();
      this._setElStyles();
    }

    /*
      Method to calculate maximum shape's radius.
      @private
      @returns {Number} Maximum raduis.
    */
  }, {
    key: '_calcShapeRadius',
    value: function _calcShapeRadius() {
      var selfSize, selfSizeX, selfSizeY;
      selfSize = this._getRadiusSize('radius');
      selfSizeX = this._getRadiusSize('radiusX', selfSize);
      selfSizeY = this._getRadiusSize('radiusY', selfSize);
      return Math.max(selfSizeX, selfSizeY);
    }

    /*
      Method to get max radiusX value.
      @private
      @param {String} Radius name.
    */
  }, {
    key: '_getMaxRadius',
    value: function _getMaxRadius(name) {
      var selfSize, selfSizeX;
      selfSize = this._getRadiusSize('radius');
      return this._getRadiusSize(name, selfSize);
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
          radius = this._calcShapeRadius(),
          dStroke = this._deltas['strokeWidth'],
          stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : p.strokeWidth;
      p.size = 2 * radius + stroke;
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
      // p.size *= this.shape._props.ratio;
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
    value: function _getRadiusSize(name) {
      var fallback = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      var delta = this._deltas[name];
      // if value is delta value
      if (delta != null) {
        // get maximum number between start and end values of the delta
        return Math.max(Math.abs(delta.end), Math.abs(delta.start));
      } else if (this._props[name] != null) {
        // else get the value from props object
        return parseFloat(this._props[name]);
      } else {
        return fallback;
      }
    }

    /*
      Method to find the shape and initialize it.
      @private
    */
  }, {
    key: '_createBit',
    value: function _createBit() {
      var bitClass = shapesMap.getShape(this._props.shape);
      this.shape = new bitClass({ ctx: this.ctx, el: this._o.bit, isDrawLess: true });
      // if draw on foreign context
      // or we are animating an svg element outside the module
      if (this.isForeign || this.isForeignBit) {
        return this.el = this.shape.el;
      }
    }

    /*
      Method to create shape.
      @private
    */
  }, {
    key: '_createShape',
    value: function _createShape() {
      var p = this._props;
      // get shape's class
      var Shape = shapesMap.getShape(this._props.shape);
      // get maximum stroke value
      var stroke = this._getMaxStroke();
      // save shape `width` and `height` to `_props`
      p.shapeWidth = 2 * this._getMaxRadius('radiusX') + stroke;
      p.shapeHeight = 2 * this._getMaxRadius('radiusY') + stroke;
      // create `_shape`
      this.shape = new Shape({
        width: p.shapeWidth,
        height: p.shapeHeight,
        parent: this.el
      });
    }

    /*
      Method to get max value of the strokeWidth.
      @private
    */
  }, {
    key: '_getMaxStroke',
    value: function _getMaxStroke() {
      var p = this._props;
      var dStroke = this._deltas['stroke'];
      return dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : p.strokeWidth;
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
      _module3['default'].prototype._setProgress.call(this, progress);
      // super._setProgress( progress );
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
      this._origin.x = this._o.ctx ? parseFloat(p.x) : p.center;
      this._origin.y = this._o.ctx ? parseFloat(p.y) : p.center;
    }

    /*
      Method to add callback overrides to passed object.
      @private
      @param {Object} Object to add the overrides to.
    */
  }, {
    key: '_applyCallbackOverrides',
    value: function _applyCallbackOverrides(obj) {
      var it = this,
          p = this._props;
      // specify control functions for the module
      obj.callbackOverrides = {
        onUpdate: function onUpdate(pe) {
          return it._setProgress(pe);
        },
        onStart: function onStart(isFwd) {
          if (isFwd) {
            it._show();
            // it._isFirstInChain() && it._showPositionEl();
            // hide previous module in then chain
            it._hidePrevChainModule();
            // hide all modules in the chain (for chain parent only)
            it._hideModuleChain();
          } else {
            if (!p.isShowStart) {
              it._hide();
              // it._isFirstInChain() && it._hidePositionEl();
            }
            // show previous module in then chain
            it._showPrevChainModule();
          }
        },
        onComplete: function onComplete(isFwd) {
          if (isFwd) {
            if (!p.isShowEnd) {
              it._hide();
              // it._isLastInChain() && it._hidePositionEl();
            }
          } else {
              it._show();
              // it._isLastInChain() && it._showPositionEl();
            }
        }
      };
    }

    /*
      Method to setup tween and timeline options before creating them.
      @override @ Tweenable
      @private  
    */
  }, {
    key: '_transformTweenOptions',
    value: function _transformTweenOptions() {
      this._applyCallbackOverrides(this._o);
    }

    /*
      Method to create transform string.
      @private
      @returns {String} Transform string.
    */
  }, {
    key: '_fillTransform',
    value: function _fillTransform() {
      var p = this._props,
          scaleX = p.scaleX != null ? p.scaleX : p.scale,
          scaleY = p.scaleY != null ? p.scaleY : p.scale,
          scale = scaleX + ', ' + scaleY;

      return 'translate(' + p.x + ', ' + p.y + ') rotate(' + p.angle + 'deg) scale(' + scale + ')';
    }

    /*
      Method to create transform-origin string.
      @private
      @returns {String} Transform string.
    */
  }, {
    key: '_fillOrigin',
    value: function _fillOrigin() {
      var p = this._props,
          str = '';
      for (var i = 0; i < p.origin.length; i++) {
        str += p.origin[i].string + ' ';
      }
      return str;
    }

    /*
      Method to hide previousChainModule.
      @private
    */
  }, {
    key: '_hidePrevChainModule',
    value: function _hidePrevChainModule() {
      var p = this._props;
      this._prevChainModule && this._prevChainModule._hide();
    }

    /*
      Method to show previousChainModule.
      @private
    */
  }, {
    key: '_showPrevChainModule',
    value: function _showPrevChainModule() {
      this._prevChainModule && this._prevChainModule._show();
    }

    /*
      Method to hide all modules in then chain.
      @private
    */
  }, {
    key: '_hideModuleChain',
    value: function _hideModuleChain() {
      for (var i = 1; i < this._modules.length; i++) {
        this._modules[i]._hide();
      }
    }

    /*
      Method to show element.
      @private
    */
  }, {
    key: '_show',
    value: function _show() {
      if (!this._moduleEl) {
        return;
      }
      this._moduleEl.style.display = 'block';

      var shift = this._props.size / 2;
      this._positionEl.style['transform'] = 'translate(' + -shift + 'px, ' + -shift + 'px)';
      this._positionEl.style[h.prefix.css + 'transform'] = 'translate(' + -shift + 'px, ' + -shift + 'px)';
      // h.setPrefixedStyle(
      //   );

      this._isShown = true;
    }

    /*
      Method to hide element.
      @private
    */
  }, {
    key: '_hide',
    value: function _hide() {
      if (!this._moduleEl) {
        return;
      }
      this._moduleEl.style.display = 'none';
      this._isShown = false;
    }

    /*
      Method to show `_positionEl` element.
      @private
    */
    // _showPositionEl () {
    //   if ( !this._positionEl ) { return; }
    //   this._positionEl.style.display = 'block';
    // }
    /*
      Method to hide `_positionEl` element.
      @private
    */
    // _hidePositionEl () {
    //   if ( !this._positionEl ) { return; }
    //   this._positionEl.style.display = 'none';
    // }
    /*
      Method to reset some flags on merged options object.
      @private
      @overrides @ Thenable
      @param   {Object} Options object.
      @returns {Object} Options object.
    */
  }, {
    key: '_resetMergedFlags',
    value: function _resetMergedFlags(obj) {
      _get(Object.getPrototypeOf(Shape.prototype), '_resetMergedFlags', this).call(this, obj);
      // pass the `_positionEl` to the child module
      obj.positionEl = this._positionEl;
      // pass the `_shiftEl` to the child module
      obj.shiftEl = this._shiftEl;
      return obj;
    }
  }]);

  return Shape;
})(_tunable2['default']);

exports['default'] = Shape;
module.exports = exports['default'];