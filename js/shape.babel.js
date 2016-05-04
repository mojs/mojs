
const h         = require('./h');
const Bit       = require('./shapes/bit');
const shapesMap = require('./shapes/shapesMap');
import Module     from './module';
import Thenable   from './thenable';
import Tunable    from './tunable';
import Tweenable  from './tween/tweenable';
import Tween      from './tween/tween';
import Timeline   from './tween/timeline';

// TODO
//  - refactor
//    - add setIfChanged to Module
//  --
//  - tween for every prop

class Shape extends Tunable {
  /*
    Method to declare module's defaults.
    @private
  */
  _declareDefaults () {
    // DEFAULTS / APIs
    this._defaults = {
      // where to append the module to [selector, HTMLElement]
      parent:           document.body,
      // Possible values: [circle, line, zigzag, rect, polygon, cross, equal ]
      shape:            'circle',
      // ∆ :: Possible values: [color name, rgb, rgba, hex]
      stroke:           'transparent',
      // ∆ :: Possible values: [ 0..1 ]
      strokeOpacity:    1,
      // Possible values: ['butt' | 'round' | 'square']
      strokeLinecap:    '',
      // ∆ :: Possible values: [ number ]
      strokeWidth:      2,
      // ∆ :: Units :: Possible values: [ number, string ]
      strokeDasharray:  0,
      // ∆ :: Units :: Possible values: [ number, string ]
      strokeDashoffset: 0,
      // ∆ :: Possible values: [color name, rgb, rgba, hex]
      fill:             'deeppink',
      // ∆ :: Possible values: [ 0..1 ]
      fillOpacity:      1,
      // ∆ :: Units :: Possible values: [ number, string ]
      left:             0,
      // ∆ :: Units :: Possible values: [ number, string ]
      top:              0,
      // ∆ :: Units :: Possible values: [ number, string ]
      x:                0,
      // ∆ :: Units :: Possible values: [ number, string ]
      y:                0,
      // ∆ :: Possible values: [ number ]
      angle:            0,
      // ∆ :: Possible values: [ number ]
      scale:            1,
      // ∆ :: Possible values: [ number ] Fallbacks to `scale`.
      scaleX:           null,
      // ∆ :: Possible values: [ number ] Fallbacks to `scale`.
      scaleY:           null,
      // ∆ :: Possible values: [ number, string ]
      origin:           '50% 50%',
      // ∆ :: Possible values: [ 0..1 ]
      opacity:          1,
      // ∆ :: Units :: Possible values: [ number, string ]
      rx:               0,
      // ∆ :: Units :: Possible values: [ number, string ]
      ry:               0,
      // ∆ :: Possible values: [ number ]
      points:           3,
      // ∆ :: Possible values: [ number ]
      radius:           { 0: 50 },
      // ∆ :: Possible values: [ number ]
      radiusX:          null,
      // ∆ :: Possible values: [ number ]
      radiusY:          null,
      // Possible values: [ boolean ]
      isShowStart:      false,
      // Possible values: [ boolean ]
      isShowEnd:        true,
      // Possible values: [ number > 0 ]
      duration:         400,
      // Possible values: [ number ]
      size:             null,
      // Possible values: [ number ]
      sizeGap:          0,
      // context for all the callbacks
      callbacksContext: this,
      // previous modules in then chain
      prevChainModule:  null,
    }
  }

  // ^ PUBLIC  METHOD(S) ^
  // v PRIVATE METHOD(S) v

  /*
    Method to declare variables.
    @overrides Thenable
  */
  _vars () {
    // call _vars method on Thenable
    super._vars();
    this._lastSet = {};
    this._origin   = {};
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
  _render () {
    if (!this.isRendered) {
      if (!this.isForeign && !this.isForeignBit) {
        this.ctx = document.createElementNS(h.NS, 'svg');
        this.ctx.style.position = 'absolute';
        this.ctx.style.width    = '100%';
        this.ctx.style.height   = '100%';
        this.ctx.style.left     = '0';
        this.ctx.style.top      = '0';

        this.el = document.createElement('div');
        this.el.appendChild(this.ctx);

        this._createBit();
        this._calcSize();
        
        // create stacking context wrapper for all elements in `then` chain
        // if the module is the first one in the chain
        if ( !this._props.prevChainModule ) {
          this.wrapperEl = document.createElement('div');
          // h.setPrefixedStyle( this.wrapperEl, 'transform', 'translate(0, 0)' );
          this.wrapperEl.style.opacity = '0.99999'
          this.wrapperEl.appendChild( this.el );
          this.wrapperEl.setAttribute( 'data-name', 'mojs-shape' );
          this._props.parent.appendChild( this.wrapperEl );
        } else {
          this._props.parent.appendChild(this.el);
        }

      } else { this.ctx = this._o.ctx; this._createBit(); this._calcSize(); }
      this.isRendered = true;
    }
    this._setElStyles();
    
    // if (this.el != null) { this.el.style.opacity = this._props.opacity; }
    if (this._o.isShowStart) { this._show(); } else { this._hide(); }

    this._setProgress( 0 );
    return this;
  }
  /*
    Method to set el styles on initialization.
    @private
  */
  _setElStyles () {
    var marginSize, ref, size,
        p = this._props;
    if (!this.isForeign) {
      let style = this.el.style;
      size           = `${ p.size }px`;
      marginSize     = `${ -p.size / 2 }px`;
      style.position = 'absolute';
      style.top      = p.top;
      style.left     = p.left;
      style.width    = size;
      style.height   = size;
      style.opacity  = p.opacity;
      style['margin-left'] = marginSize;
      style['margin-top']  = marginSize;
      style['marginLeft']  = marginSize;
      style['marginTop']   = marginSize;
    }
  }
  /*
    Method to draw shape.
    @private
  */
  _draw () {
    var p  = this._props,
        bP = this.bit._props;
    // set props on bit
    bP.x                    = this._origin.x;
    bP.y                    = this._origin.y;
    bP.rx                   = p.rx;
    bP.ry                   = p.ry;
    bP.stroke               = p.stroke;
    bP['stroke-width']      = p.strokeWidth;
    bP['stroke-opacity']    = p.strokeOpacity;
    bP['stroke-dasharray']  = p.strokeDasharray;
    bP['stroke-dashoffset'] = p.strokeDashoffset;
    bP['stroke-linecap']    = p.strokeLinecap;
    bP.fill                 = p.fill;
    bP['fill-opacity']      = p.fillOpacity;
    bP.radius               = p.radius;
    bP.radiusX              = p.radiusX;
    bP.radiusY              = p.radiusY;
    bP.points               = p.points;

    this.bit.draw(); this._drawEl();
  }
  /*
    Method to set current modules props to main div el.
    @private
  */
  _drawEl () {
    if (this.el == null) { return true; }
    var p = this._props;
    this._isPropChanged('opacity') && (this.el.style.opacity = p.opacity);
    if (!this.isForeign) {
      this._isPropChanged('left')  && (this.el.style.left = p.left);
      this._isPropChanged('top')   && (this.el.style.top = p.top);
      
      var isX = this._isPropChanged('x'),
          isY = this._isPropChanged('y'),
          isTranslate = isX || isY,
          isScaleX = this._isPropChanged('scaleX'),
          isScaleY = this._isPropChanged('scaleY'),
          isScale  = this._isPropChanged('scale'),
          isScale = isScale || isScaleX || isScaleY,
          isRotate = this._isPropChanged('angle');

      if ( isTranslate || isScale || isRotate ) {
        var transform = this._fillTransform(),
            style     = this.el.style;
        style[`${ h.prefix.css }transform`] = transform;
        style['transform'] = transform;
      }

      if ( this._isPropChanged('origin') || this._deltas[ 'origin' ] ) {
        var origin = this._fillOrigin(),
            style  = this.el.style;
        style[`${ h.prefix.css }transform-origin`] = origin;
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
  _isPropChanged ( name ) {
    // if there is no recod for the property - create it
    if (this._lastSet[name] == null) { this._lastSet[name] = {}; }
    if (this._lastSet[name].value !== this._props[name]) {
      this._lastSet[name].value = this._props[name];
      return true;
    } else { return false; }
  }
  /*
    Method to create shape's transform string.
    @private
    @returns {String} Transform string for the shape.
  */
  _calcShapeTransform () {
    return `rotate(${this._props.angle}, ${this._origin.x}, ${this._origin.y})`;
  }
  /*
    Method to tune new option on run.
    @private
    @override @ Module
    @param {Object}  Option to tune on run.
  */
  _tuneNewOptions (o) {
    // call super on Module
    super._tuneNewOptions(o);
    // return if empty object
    if ( !((o != null) && Object.keys(o).length) ) { return 1; }

    this._calcSize();
    this._setElStyles();
  }
  /*
    Method to calculate maximum shape's radius.
    @private
    @returns {Number} Maximum raduis.
  */
  _calcMaxShapeRadius () {
    var selfSize, selfSizeX, selfSizeY;
    selfSize  = this._getRadiusSize({ key: 'radius' });
    selfSizeX = this._getRadiusSize({ key: 'radiusX', fallback: selfSize });
    selfSizeY = this._getRadiusSize({ key: 'radiusY', fallback: selfSize });
    return Math.max(selfSizeX, selfSizeY);
  }
  /*
    Method to calculate maximum size of the svg canvas.
    @private
  */
  _calcSize () {
    if (this._o.size) { return; }
    var p = this._props,
        radius  = this._calcMaxShapeRadius(),
        dStroke = this._deltas['strokeWidth'],
        stroke  = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this._props.strokeWidth;
    p.size = 2 * radius + stroke;
    this._increaseSizeWithEasing();
    this._increaseSizeWithBitRatio();
    return p.center = p.size / 2;
  }
  /*
    Method to increase calculated size based on easing.
    @private
  */
  _increaseSizeWithEasing () {
    var p              = this._props,
        easing         = this._o.easing,
        isStringEasing = easing && typeof easing === 'string';

    switch ( isStringEasing && easing.toLowerCase() ) {
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
  _increaseSizeWithBitRatio () {
    var p   = this._props;
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
  _getRadiusSize (o) {
    var delta = this._deltas[o.key];
    // if value is delta value
    if (delta != null) {
      // get maximum number between start and end values of the delta
      return Math.max(Math.abs(delta.end), Math.abs(delta.start));
    } else if (this._props[o.key] != null) {
      // else get the value from props object
      return parseFloat(this._props[o.key]);
    } else { return o.fallback || 0; }
  }
  /*
    Method to find the shape and initialize it.
    @private
  */
  _createBit () {
    var bitClass = shapesMap.getShape(this._props.shape);
    this.bit = new bitClass({ ctx: this.ctx, el: this._o.bit, isDrawLess: true });
    // if draw on foreign context
    // or we are animating an svg element outside the module
    if (this.isForeign || this.isForeignBit) { return this.el = this.bit.el; }
  }
  /*
    Method to draw current progress of the deltas.
    @private
    @override @ Module
    @param   {Number}  Progress to set - [0..1].
  */
  _setProgress ( progress ) {
    // call the super on Module
    // this._super_setProgress(progress);
    Module.prototype._setProgress.call(this, progress);
    // super._setProgress( progress );
    this._calcOrigin();
    this._draw(progress);
  }
  /*
    Method to calculate transform origin for the element.
    @private
  */
  _calcOrigin () {
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
  _applyCallbackOverrides (obj) {
    var it = this,
        p  = this._props;
    // specify control functions for the module
    obj.callbackOverrides = {
      onUpdate: function (pe) { return it._setProgress(pe); },
      onStart:  function (isFwd) {
        if ( isFwd ) {
          it._show();
          // hide previous module in then chain
          it._hidePrevChainModule();
          // hide all modules in the chain (for chain parent only)
          it._hideModuleChain();
        } else {
          (!p.isShowStart && it._hide())
          // show previous module in then chain
          it._showPrevChainModule();
        }
      },
      onComplete: function (isFwd) {
        return isFwd ? (!p.isShowEnd && it._hide()) : it._show();
      }
    }
  }
  /*
    Method to setup tween and timeline options before creating them.
    @override @ Tweenable
    @private  
  */
  _transformTweenOptions () { this._applyCallbackOverrides( this._o ); }
  /*
    Method to create transform string.
    @private
    @returns {String} Transform string.
  */
  _fillTransform () {
    var p      = this._props,
        scaleX = ( p.scaleX != null ) ? p.scaleX : p.scale,
        scaleY = ( p.scaleY != null ) ? p.scaleY : p.scale,
        scale  = `${ scaleX }, ${scaleY}`;

    return `translate(${p.x}, ${p.y}) rotate(${p.angle}deg) scale(${scale})`;
  }
  /*
    Method to create transform-origin string.
    @private
    @returns {String} Transform string.
  */
  _fillOrigin () {
    var p   = this._props,
        str = '';
    for (var i = 0; i < p.origin.length; i++) {
      str += `${ p.origin[i].string } `;
    }
    return str;
  }
  /*
    Method to hide previousChainModule.
    @private
  */
  _hidePrevChainModule () {
    var p = this._props;
    p.prevChainModule && p.prevChainModule._hide();
  }
  /*
    Method to show previousChainModule.
    @private
  */
  _showPrevChainModule () {
    var p = this._props;
    p.prevChainModule && p.prevChainModule._show();
  }
  /*
    Method to hide all modules in then chain.
    @private
  */
  _hideModuleChain () {
    for (var i = 1; i < this._modules.length; i++ ) {
      this._modules[i]._hide();
    }
  }
}

export default Shape;
