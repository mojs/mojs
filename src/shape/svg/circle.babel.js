import { SvgShape } from './svg-shape';

/* --------------------- */
/* The `Circle` class  */
/* --------------------- */

const Super = SvgShape.__mojsClass;
const Circle = Object.create(Super);

const NS = 'http://www.w3.org/2000/svg';

/**
 * `init` - lifecycle initialization function.
 *
 * @extends @ClassProto
 * @private
 */
Circle.init = function(o) {
  // super call
  Super.init.call(this, o);
  // create SVG canvas
  this._initializeShape();
}

/**
 * `_initializeShape` - function to element for render.
 */
Circle._initializeShape = function() {
  this.renderEl = document.createElementNS(NS, 'circle');

  this.renderEl.setAttribute('cx', 50);
  this.root.appendChild(this.renderEl);
}

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Circle instance.
 */
const wrap = (o) => {
  const instance = Object.create(Circle);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Circle;

export { wrap as Circle };
