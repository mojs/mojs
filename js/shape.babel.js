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
      // class name for the `el`
      className:        '',
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
      // {Boolean} - if should hide module with `opacity` instead of `display`
      isSoftHide:       true,
      // {Boolean} - if should trigger composite layer for the `el`
      isForce3d:        false,
      // ∆ :: Units :: Possible values: [ number, string ]
      left:             '50%',
      // ∆ :: Units :: Possible values: [ number, string ]
      top:              '50%',
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
      radius:           50,
      // ∆ :: Possible values: [ number ]
      radiusX:          null,
      // ∆ :: Possible values: [ number ]
      radiusY:          null,
      // Possible values: [ boolean ]
      isShowStart:      false,
      // Possible values: [ boolean ]
      isShowEnd:        true,
      // Possible values: [ boolean ]
      isRefreshState:   true,
      // Possible values: [ number > 0 ]
      duration:         400,
      // Possible values: [ number ]

      /* technical ones: */
      // explicit width of the module canvas
      width:            null,
      // explicit height of the module canvas
      height:           null,
      // Possible values: [ number ]
      // sizeGap:          0,
      /* [boolean] :: If should have child shape. */
      isWithShape:      true,
      // context for all the callbacks
      callbacksContext: this
    }
  }
  /*
    Method to start the animation with optional new options.
    @public
    @overrides @ Tunable
    @param {Object} New options to set on the run.
    @returns {Object} this.
  */
  tune (o) {
    super.tune( o );
    // update shapeModule's size to the max in `then` chain
    this._getMaxSizeInChain();
    return this;
  }
  /*
    Method to create a then record for the module.
    @public
    @overrides @ Thenable
    @param    {Object} Options for the next animation.
    @returns  {Object} this.
  */
  then (o) {
    // this._makeTimeline()
    super.then( o );
    // update shapeModule's size to the max in `then` chain
    this._getMaxSizeInChain();
    return this;
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
    // save previous module in the chain
    this._prevChainModule = this._o.prevChainModule;
    // should draw on foreign svg canvas
    this.isForeign        = !!this._o.ctx;
    // this._o.isTimelineLess = true;
    // should take an svg element as self bit
    return this.isForeignBit = !!this._o.shape;
  }
  /*
    Method to initialize modules presentation.
    @private
    @overrides Module
  */
  _render () {
    if (!this._isRendered && !this._isChained) {
      // create `mojs` shape element
      this.el = document.createElement('div');
      // set name on the `el`
      this.el.setAttribute( 'data-name', 'mojs-shape' );
      // set class on the `el`
      this.el.setAttribute( 'class', this._props.className );
      // create shape module
      this._createShape();
      // append `el` to parent
      this._props.parent.appendChild( this.el );
      // set position styles on the el
      this._setElStyles();
      // set initial position for the first module in the chain
      this._setProgress(0, 0);
      // show at start if `isShowStart`
      if (this._props.isShowStart) { this._show(); } else { this._hide(); }
      // set `_isRendered` hatch
      this._isRendered = true;
    } else if ( this._isChained ) {
      // save elements from master module
      this.el = this._masterModule.el;
      this.shapeModule = this._masterModule.shapeModule;
    }

    return this;
  }
  /*
    Method to set el styles on initialization.
    @private
  */
  _setElStyles () {
    if ( !this.el ) { return; }
    // if (!this.isForeign) {
      var p      = this._props,
          style  = this.el.style,
          width  = p.shapeWidth,
          height = p.shapeHeight;

      style.position = 'absolute';
      this._setElSizeStyles( width, height );

      if ( p.isForce3d ) {
        let name = 'backface-visibility';
        style[ `${name}` ] = 'hidden';
        style[ `${h.prefix.css}${name}` ] = 'hidden';
      }
    // }
  }
  /*
    Method to set `width`/`height`/`margins` to the `el` styles.
    @param {Number} Width.
    @param {height} Height.
  */
  _setElSizeStyles ( width, height ) {
    var style  = this.el.style;
    style.width  = `${ width }px`;
    style.height = `${ height }px`;
    style[ 'margin-left' ] = `${ - width/2 }px`;
    style[ 'margin-top' ]  = `${ - height/2 }px`;
  }
  /*
    Method to draw shape.
    @private
  */
  _draw () {
    if (!this.shapeModule) { return; }

    var p  = this._props,
        bP = this.shapeModule._props;
    // set props on bit
    // bP.x                    = this._origin.x;
    // bP.y                    = this._origin.y;
    bP.rx                   = p.rx;
    bP.ry                   = p.ry;
    bP.stroke               = p.stroke;
    bP['stroke-width']      = p.strokeWidth;
    bP['stroke-opacity']    = p.strokeOpacity;
    bP['stroke-dasharray']  = p.strokeDasharray;
    bP['stroke-dashoffset'] = p.strokeDashoffset;
    bP['stroke-linecap']    = p.strokeLinecap;
    bP['fill']              = p.fill;
    bP['fill-opacity']      = p.fillOpacity;
    bP.radius               = p.radius;
    bP.radiusX              = p.radiusX;
    bP.radiusY              = p.radiusY;
    bP.points               = p.points;

    this.shapeModule._draw();
    this._drawEl();
  }
  /*
    Method to set current modules props to main div el.
    @private
  */
  _drawEl () {
    // return;
    if (this.el == null) { return true; }
    var p     = this._props;
    var style = this.el.style;

    // style.opacity = p.opacity;
    this._isPropChanged('opacity') && (style.opacity = p.opacity);
    if (!this.isForeign) {
      this._isPropChanged('left')  && (style.left = p.left);
      this._isPropChanged('top')   && (style.top = p.top);

      var isX = this._isPropChanged('x'),
          isY = this._isPropChanged('y'),
          isTranslate = isX || isY,
          isScaleX = this._isPropChanged('scaleX'),
          isScaleY = this._isPropChanged('scaleY'),
          isScale  = this._isPropChanged('scale'),
          isScale  = isScale || isScaleX || isScaleY,
          isRotate = this._isPropChanged('angle');

      if ( isTranslate || isScale || isRotate ) {
        var transform = this._fillTransform();
        style[`${ h.prefix.css }transform`] = transform;
        style['transform'] = transform;
      }

      if ( this._isPropChanged('origin') || this._deltas[ 'origin' ] ) {
        var origin = this._fillOrigin();
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

    // this._calcSize();
    this._setElStyles();
  }
  /*
    Method to get max radiusX value.
    @private
    @param {String} Radius name.
  */
  _getMaxRadius( name ) {
    var selfSize, selfSizeX;
    selfSize  = this._getRadiusSize('radius');
    return this._getRadiusSize(name, selfSize );
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
  // _increaseSizeWithBitRatio () {
  //   var p   = this._props;
  //   // p.size *= this.shape._props.ratio;
  //   p.size += 2 * p.sizeGap;
  // }
  /*
    Method to get maximum radius size with optional fallback.
    @private
    @param {Object}
      @param key {String} Name of the radius - [radius|radiusX|radiusY].
      @param @optional fallback {Number}  Optional number to set if there
                                          is no value for the key.
  */
  _getRadiusSize ( name, fallback = 0 ) {
    var delta = this._deltas[name];
    // if value is delta value
    if (delta != null) {
      // get maximum number between start and end values of the delta
      return Math.max(Math.abs(delta.end), Math.abs(delta.start));
    } else if (this._props[name] != null) {
      // else get the value from props object
      return parseFloat(this._props[name]);
    } else { return fallback; }
  }
  /*
    Method to get max shape canvas size and save it to _props.
    @private
  */
  _getShapeSize () {
    var p      = this._props,
        // get maximum stroke value
        stroke = this._getMaxStroke();
    // save shape `width` and `height` to `_props`
    p.shapeWidth = (p.width != null)
      ? p.width
      : 2*this._getMaxRadius( 'radiusX' ) + stroke;

    p.shapeHeight = (p.height != null)
      ? p.height
      : 2*this._getMaxRadius( 'radiusY' ) + stroke;
  }
  /*
    Method to create shape.
    @private
  */
  _createShape () {
    // calculate max shape canvas size and set to _props
    this._getShapeSize();
    // don't create actual shape if !`isWithShape`
    if ( !this._props.isWithShape ) { return; }

    var p      = this._props;
    // get shape's class
    var Shape  = shapesMap.getShape(this._props.shape);
    // create `_shape` module
    this.shapeModule = new Shape({
      width:  p.shapeWidth,
      height: p.shapeHeight,
      parent: this.el
    });
  }
  /*
    Method to get max size in `then` chain
    @private
  */
  _getMaxSizeInChain () {
    let p    = this._props,
        maxW = 0,
        maxH = 0;

    for (var i = 0; i < this._modules.length; i++) {
      this._modules[i]._getShapeSize();
      maxW = Math.max( maxW, this._modules[i]._props.shapeWidth );
      maxH = Math.max( maxH, this._modules[i]._props.shapeHeight );
    }

    this.shapeModule && this.shapeModule._setSize( maxW, maxH );
    this._setElSizeStyles( maxW, maxH );
  }
  /*
    Method to get max value of the strokeWidth.
    @private
  */
  _getMaxStroke () {
    var p = this._props;
    var dStroke  = this._deltas[ 'strokeWidth' ];
    return (dStroke != null)
      ? Math.max(dStroke.start, dStroke.end)
      : p.strokeWidth;
  }
  /*
    Method to draw current progress of the deltas.
    @private
    @override @ Module
    @param   {Number}  EasedProgress to set - [0..1].
    @param   {Number}  Progress to set - [0..1].
  */
  _setProgress ( easedProgress, progress ) {
    // call the super on Module
    Module.prototype._setProgress.call(this, easedProgress, progress);
    // draw current progress
    this._draw(easedProgress);
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
      onUpdate: function (ep, p) { return it._setProgress(ep, p); },
      onStart:  function (isFwd) {
        // don't touch main `el` onStart in chained elements
        if ( it._isChained ) { return };
        if ( isFwd ) { it._show(); }
        else { if ( !p.isShowStart ) { it._hide(); } }
      },
      onComplete: function (isFwd) {
        // don't touch main `el` if not the last in `then` chain
        if ( !it._isLastInChain() ) { return; }
        if ( isFwd ) { if ( !p.isShowEnd ) { it._hide(); } }
        else { it._show(); }
      },
      onRefresh: function (isBefore) {
        p.isRefreshState && isBefore && it._refreshBefore();
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
    Method to refresh state befor startTime.
    @private
  */
  _refreshBefore () {
    // call setProgress with eased and normal progress
    this._setProgress( this.tween._props.easing(0), 0 );

    if ( this._props.isShowStart ) { this._show(); } else { this._hide(); }
  }
  /*
    Method that gets called on `soft` show of the module,
    it should restore transform styles of the module.
    @private
    @overrides @ Module
  */
  _showByTransform () {
    // reset the cache of the scale prop
    this._lastSet.scale = null;
    // draw el accroding to it's props
    this._drawEl();
  }
}

export default Shape;
