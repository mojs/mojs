
const h         = require('./h');
const Bit       = require('./shapes/bit');
const shapesMap = require('./shapes/shapesMap');
import Tweenable  from './tween/tweenable';
import Thenable   from './thenable';
import Tunable    from './tunable';
import Tween      from './tween/tween';
import Timeline   from './tween/timeline';

// TODO
//  - refactor
//    - add setIfChanged to Module
//  --
//  - tween for every prop

class Transit extends Tunable {
  /*
    Method to declare module's defaults.
    @private
  */
  _declareDefaults () {
    // DEFAULTS / APIs
    this._defaults = {
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
      // ∆ :: Units :: Possible values: [ number, string ]
      rx:               0,
      // ∆ :: Units :: Possible values: [ number, string ]
      ry:               0,
      // ∆ :: Possible values: [ number ]
      angle:            0,
      // ∆ :: Possible values: [ number ]
      scale:            1,
      // ∆ :: Possible values: [ 0..1 ]
      opacity:          1,
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
      isShowEnd:        false,
      // // Possible values: [ number > 0 ]
      // duration:         400,
      
      // Possible values: [ number ]
      size:             null,
      // Possible values: [ number ]
      sizeGap:          0,
      // context for all the callbacks
      callbacksContext: null,
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
        (this._o.parent || document.body).appendChild(this.el);
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
      size = this._props.size + "px";
      this.el.style.position = 'absolute';
      this.el.style.top      = p.top;
      this.el.style.left     = p.left;
      this.el.style.width    = size;
      this.el.style.height   = size;
      this.el.style.opacity  = p.opacity;
      marginSize = (-this._props.size / 2) + "px";
      this.el.style['margin-left'] = marginSize;
      this.el.style['margin-top']  = marginSize;
      this.el.style['marginLeft']  = marginSize;
      this.el.style['marginTop']   = marginSize;
    }
  }
  /*
    Method to draw shape.
    @private
  */
  _draw () {
    this.bit.setProp({
      x:                    this._origin.x,
      y:                    this._origin.y,
      rx:                   this._props.rx,
      ry:                   this._props.ry,
      stroke:               this._props.stroke,
      'stroke-width':       this._props.strokeWidth,
      'stroke-opacity':     this._props.strokeOpacity,
      'stroke-dasharray':   this._props.strokeDasharray,
      'stroke-dashoffset':  this._props.strokeDashoffset,
      'stroke-linecap':     this._props.strokeLinecap,
      fill:                 this._props.fill,
      'fill-opacity':       this._props.fillOpacity,
      radius:               this._props.radius,
      radiusX:              this._props.radiusX,
      radiusY:              this._props.radiusY,
      points:               this._props.points,
      // transform:            this._calcShapeTransform()
    });
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
      var isTranslate = this._isPropChanged('x') || this._isPropChanged('y'),
          isScaleRotate = this._isPropChanged('scale') || this._isPropChanged('angle');
      if ( isTranslate || isScaleRotate ) {
        h.setPrefixedStyle(this.el, 'transform', this._fillTransform());
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

    // this.tween._setProp(o);
    // this.timeline && this.timeline._recalcTotalDuration && this.timeline._recalcTotalDuration();
    
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
    p.size = 2 * radius + 2 * stroke;
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
    var bitClass = shapesMap.getShape(this._o.shape || 'circle');
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
    super._setProgress( progress );
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
      onStart: function (isFwd) {
        return isFwd ? it._show() : (!p.isShowStart && it._hide());
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
    Method to create transform string;
    @private
    @returns {String} Transform string.
  */
  _fillTransform () {
    var p = this._props;
    return `scale(${p.scale}) translate(${p.x}, ${p.y}) rotate(${p.angle}deg)`;
  }
}

export default Transit;
