'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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
        callbacksContext: this,
        // previous modules in then chain
        prevChainModule: null
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
      // should draw on foreign svg canvas
      this.isForeign = !!this._o.ctx;
      // this._super_setProgress = Module.prototype._setProgress.bind(this);
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
          h.style(this.ctx, {
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0
          });
          // create main element for the module
          this._moduleEl = document.createElement('div');
          this._moduleEl.appendChild(this.ctx);
          this._moduleEl.setAttribute('data-name', 'mojs-shape-module-el');

          this._createBit();
          this._calcSize();

          // create stacking context wrapper for all elements in `then` chain
          // if the module is the first one in the chain
          if (!this._o.positionEl) {
            // position el - element to set all CSS properties on
            // stays the same for all the modules in the `then` chain
            this._positionEl = document.createElement('div');
            this._positionEl.style['position'] = 'absolute';
            this._positionEl.style['backface-visibility'] = 'hidden';
            // this._positionEl.style['width'] = '0px';
            // this._positionEl.style['height'] = '0px';
            this._positionEl.setAttribute('data-name', 'mojs-shape');
            // shift el simply shifts el to -50% for both x/y to be sure
            // that the module cooordinates start in the center of the module
            this._shiftEl = document.createElement('div');
            this._shiftEl.setAttribute('data-name', 'mojs-shape-shift');
            h.style(this._shiftEl, {
              // position:   'absolute',
              // left:       '0px',
              // top:        '0px',
              // transform:  'translate(-50%, -50%)',
            });
            // the `el` element for all the modules in the chain
            this.el = document.createElement('div');
            this.el.setAttribute('data-name', 'mojs-shape-el');

            // this._shiftEl.appendChild( this.el );
            // this.el.appendChild( this._moduleEl );
            // this._positionEl.appendChild( this._shiftEl );

            this._positionEl.appendChild(this._moduleEl);

            this._props.parent.appendChild(this._positionEl);
          } else {
            // save position el
            this._positionEl = this._o.positionEl;
            this._props.parent.appendChild(this._moduleEl);
          }
        } else {
          this.ctx = this._o.ctx;this._createBit();this._calcSize();
        }
        this.isRendered = true;
      }

      this._setElStyles();

      // if (this.el != null) { this.el.style.opacity = this._props.opacity; }
      if (this._props.isShowStart) {
        this._show();
      } else {
        this._hide();
      }

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
      if (!this._moduleEl) {
        return;
      }
      if (!this.isForeign) {
        var p = this._props,
            style = this._moduleEl.style,
            size = p.size + 'px';
        // style.position = 'absolute';
        style.width = size;
        style.height = size;
      }
    }

    /*
      Method to draw shape.
      @private
    */
  }, {
    key: '_draw',
    value: function _draw() {
      var p = this._props,
          bP = this.bit._props;
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

      this.bit.draw();this._drawEl();
    }

    /*
      Method to set current modules props to main div el.
      @private
    */
  }, {
    key: '_drawEl',
    value: function _drawEl() {
      if (this._positionEl == null) {
        return true;
      }
      var p = this._props,

      // el    = this._positionEl,
      style = this._positionEl.style;

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
      // p.size *= this.bit._props.ratio;
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
      var bitClass = shapesMap.getShape(this._props.shape);
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
      // this._super_setProgress(progress);
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
            // hide previous module in then chain
            it._hidePrevChainModule();
            // hide all modules in the chain (for chain parent only)
            it._hideModuleChain();
          } else {
            !p.isShowStart && it._hide();
            // show previous module in then chain
            it._showPrevChainModule();
          }
        },
        onComplete: function onComplete(isFwd) {
          return isFwd ? !p.isShowEnd && it._hide() : it._show();
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
      p.prevChainModule && p.prevChainModule._hide();
    }

    /*
      Method to show previousChainModule.
      @private
    */
  }, {
    key: '_showPrevChainModule',
    value: function _showPrevChainModule() {
      var p = this._props;
      p.prevChainModule && p.prevChainModule._show();
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
      Method to hide element.
      @private
    */
  }, {
    key: '_show',
    value: function _show() {
      if (!this._moduleEl) {
        return;
      }
      this._moduleEl.style.display = 'block';
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
      return obj;
    }

    /*
      Method to check if the module is first in `then` chain.
      @private
      @returns {Boolean} If the module is the first in module chain.
    */
  }, {
    key: '_isFirstInChain',
    value: function _isFirstInChain() {
      return !this._o.positionEl;
    }
  }]);

  return Shape;
})(_tunable2['default']);

exports['default'] = Shape;
module.exports = exports['default'];