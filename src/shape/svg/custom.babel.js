import { SvgShape } from './svg-shape.babel.js';

/* --------------------- */
/* The `Custom` class  */
/* --------------------- */

const Super = SvgShape.__mojsClass;
const Custom = Object.create(Super);

/**
 * `getShape` - function to define a custom SVG shape markup.
 *              The custom shape expected to be inscribed into 100x100 rectangle.
 * @public
 * @returns {String} String that holds SVG markup of custom shape inscribed into 100x100 rectangle.
 */
Custom.getShape = function() {
  return '<ellipse cx="50" cy="50" rx="50" ry="50" />';
};

/**
 * `_initializeShape` - function to element for render.
 */
Custom._initializeShape = function () {
  this.root.innerHTML = this.getShape();
};

/**
 * `render` - function to element for render.
 */
Custom.render = function (mainEl, support) {
  // `styleKeys` are keys for visual representation props - `fill`, `stroke` etc
  const { props, pipeObj } = support;
  const { root, styleKeys } = pipeObj;
  // draw visual stying
  for (let i = 0; i < styleKeys.length; i++) {
    const key = styleKeys[i];
    const cacheName = `_${key}`;
    const value = props[key];
    if (support[cacheName] !== value) {
      root.style[key] = value;
    }
    support[cacheName] = value;
  }
  // root transform calculation
  const sizeX = (props.sizeX !== undefined) ? props.sizeX : props.size;
  const sizeY = (props.sizeY !== undefined) ? props.sizeY : props.size;
  // calculate scales
  const scaleX = sizeX / 100;
  const scaleY = sizeY / 100;

  const maxScale = Math.max(scaleX,scaleY);
  // calculate shift
  const shiftX = (300 / 2) - (50 * scaleX);
  const shiftY = (300 / 2) - (50 * scaleY);

  const transform = `translate(${0}, ${0}) scale(${scaleX}, ${scaleY})`;
  // make sure to set only if changed
  if (support._transform !== transform) {
    root.setAttribute('transform', transform);
    support._transform = transform;
  }
};

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Custom instance.
 */
const wrap = (o) => {
  const instance = Object.create(Custom);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Custom;

export { wrap as Custom };






// class Custom extends Bit {
//   /*
//     Method to get shape perimeter length.
//     @public
//     @returns {Number} Default length string.
//   */
//   getLength () { return 100; }
//   /*
//     Method to draw the shape.
//     Called on every frame.
//     @private
//     @overrides @ Bit
//   */
//   _draw () {
//     var p     = this._props,
//         state = this._state,
//         radiusXChange = state[ 'radiusX' ] !== p.radiusX,
//         radiusYChange = state[ 'radiusY' ] !== p.radiusY,
//         radiusChange  = state[ 'radius' ] !== p.radius;

//     // update transform only if one of radiuses changed
//     if ( radiusXChange || radiusYChange || radiusChange ) {
//       this.el.setAttribute( 'transform', this._getScale() );
//       state[ 'radiusX' ] = p.radiusX;
//       state[ 'radiusY' ] = p.radiusY;
//       state[ 'radius' ]  = p.radius;
//     }

//     this._setAttrIfChanged( 'stroke-width', p['stroke-width'] / p.maxScale );

//     super._draw();
//   }

//   /*
//     Method to get scales for the shape.
//     @private
//     @mutates @props
//   */
//   _getScale () {
//     var p = this._props,
//         radiusX = ( p.radiusX ) ? p.radiusX : p.radius,
//         radiusY = ( p.radiusY ) ? p.radiusY : p.radius;
    
//     p.scaleX   = (2*radiusX)/100;
//     p.scaleY   = (2*radiusY)/100;
//     p.maxScale = Math.max( p.scaleX, p.scaleY );

//     p.shiftX = (p.width/2  - 50*p.scaleX);
//     p.shiftY = (p.height/2 - 50*p.scaleY);

//     var translate = `translate(${p.shiftX}, ${p.shiftY})`;
//     return `${translate} scale(${ p.scaleX }, ${p.scaleY})`;
//   }
// }

// export default Custom;
