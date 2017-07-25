import { ClassProto } from '../../class-proto.babel.js';
import { getSvgShapeNameID } from './add-shape.babel.js';

/* --------------------- */
/* The `SvgShape` class  */
/* --------------------- */

const Super = ClassProto;
const SvgShape = Object.create(Super);

const NS = 'http://www.w3.org/2000/svg';

// TODO:
//   - `maxScale` should scale `strokeWidth`

/**
 * _declareDefaults - function to declare `_defaults` object.
 *
 * @extends @ClassProto
 * @private
 */
SvgShape._declareDefaults = function () {
  this._defaults = {
    shape: 'circle',
    size: 100
  };
};

/**
 * `init` - lifecycle initialization function.
 *
 * @extends @ClassProto
 * @private
 */
SvgShape.init = function (o) {
  // super call
  Super.init.call(this, o);
  // create SVG canvas
  this._createSVGCanvas();
};

/**
 * `_createSVGCanvas` - function to create a canvas.
 */
SvgShape._createSVGCanvas = function () {
  this.canvas = document.createElementNS(NS, 'svg');
  this.canvas.style.width = '100%';
  this.canvas.style.height = '100%';
  // create root `<use />` element
  this.canvas.innerHTML = `<use xlink:href="#${getSvgShapeNameID(this._props.shape)}" vector-effect="non-scaling-stroke" />`;
  this.root = this.canvas.firstChild;

  this._o.el.appendChild(this.canvas);
};

/**
 * `render` - function to element for render.
 */
SvgShape.render = function (mainEl, support) {
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
  // const maxScale = Math.max(scaleX, scaleY);

  const transform = `scale(${scaleX}, ${scaleY})`;
  // make sure to set only if changed
  if (support._transform !== transform) {
    root.setAttribute('transform', transform);
    root.setAttribute('x', `${50 * (1 / scaleX)}%`);
    root.setAttribute('y', `${50 * (1 / scaleY)}%`);
    support._transform = transform;
  }
};

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} SvgShape instance.
 */
const wrap = (o) => {
  const instance = Object.create(SvgShape);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = SvgShape;

export { wrap as SvgShape };
