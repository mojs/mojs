import { ClassProto } from '../../class-proto';

/* --------------------- */
/* The `SvgShape` class  */
/* --------------------- */

const Super = ClassProto;
const SvgShape = Object.create(Super);

const NS = 'http://www.w3.org/2000/svg';

/**
 * `init` - lifecycle initialization function.
 *
 * @extends @ClassProto
 * @private
 */
SvgShape.init = function(o) {
  // super call
  Super.init.call(this, o);
  // create SVG canvas
  this._createSVGCanvas();
}

/**
 * `_createSVGCanvas` - function to create a canvas.
 */
SvgShape._createSVGCanvas = function() {
  this.canvas = document.createElementNS(NS, 'svg');
  this.canvas.style.width = '100%';
  this.canvas.style.height = '100%';
  // create root `<g>` element
  this.root = document.createElementNS(NS, 'g');
  this.root.setAttribute('vector-effect', 'non-scaling-stroke');
  this.canvas.appendChild(this.root);

  this._o.el.appendChild(this.canvas);
}

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
