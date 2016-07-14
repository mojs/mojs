import Bit from './bit';

class Custom extends Bit {
  /*
    Method to declare module's defaults.
    @private
    @overrides @ Bit
  */
  _declareDefaults () {
    super._declareDefaults();

    this._defaults.tag    = 'path';
    this._defaults.parent = null;

    // remove `stroke-width` from `_drawMap`
    // because we need to recal strokeWidth size regarding scale
    for (var i = 0; i < this._drawMap.length; i++) {
      if ( this._drawMap[i] === 'stroke-width' ) {
        this._drawMap.splice( i, 1 );
      }
    }
  }
  /*
    Method to get shape to set on module's path.
    @public
    @returns {String} Empty string.
  */
  getShape () { return ''; }
  /*
    Method to get shape perimeter length.
    @public
    @returns {Number} Default length string.
  */
  getLength () { return 100; }
  /*
    Method to draw the shape.
    Called on every frame.
    @private
    @overrides @ Bit
  */
  _draw () {
    var p     = this._props,
        state = this._state,
        radiusXChange = state[ 'radiusX' ] !== p.radiusX,
        radiusYChange = state[ 'radiusY' ] !== p.radiusY,
        radiusChange  = state[ 'radius' ] !== p.radius;

    // update transform only if one of radiuses changed
    if ( radiusXChange || radiusYChange || radiusChange ) {
      this.el.setAttribute( 'transform', this._getScale() );
      state[ 'radiusX' ] = p.radiusX;
      state[ 'radiusY' ] = p.radiusY;
      state[ 'radius' ]  = p.radius;
    }

    this._setAttrIfChanged( 'stroke-width', p['stroke-width']/p.maxScale );

    super._draw();
  }
  /*
    Method for initial render of the shape.
    @private
    @overrides @ Bit
  */
  _render () {
    if ( this._isRendered ) { return; }
    this._isRendered = true;

    this._length = this.getLength();

    var p = this._props;
    p.parent.innerHTML = `<svg id="js-mojs-shape-canvas" xmlns=\"http://www.w3.org/2000/svg\" xlink=\"http://www.w3.org/1999/xlink\"><g id=\"js-mojs-shape-el\">${this.getShape()}</g></svg>`;

    this._canvas = p.parent.querySelector('#js-mojs-shape-canvas');
    this.el = p.parent.querySelector('#js-mojs-shape-el');
    this._setCanvasSize();
  }
  /*
    Method to get scales for the shape.
    @private
    @mutates @props
  */
  _getScale () {
    var p = this._props,
        radiusX = ( p.radiusX ) ? p.radiusX : p.radius,
        radiusY = ( p.radiusY ) ? p.radiusY : p.radius;
    
    p.scaleX   = (2*radiusX)/100;
    p.scaleY   = (2*radiusY)/100;
    p.maxScale = Math.max( p.scaleX, p.scaleY );

    p.shiftX = (p.width/2  - 50*p.scaleX);
    p.shiftY = (p.height/2 - 50*p.scaleY);

    var translate = `translate(${p.shiftX}, ${p.shiftY})`;
    return `${translate} scale(${ p.scaleX }, ${p.scaleY})`;
  }
  /*
    Method to length of the shape.
    @private
    @returns {Number} Length of the shape.
  */
  _getLength () { return this._length; }
}

export default Custom;