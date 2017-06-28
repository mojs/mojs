import { SvgShape } from './svg-shape.babel.js';

/* --------------------- */
/* The `Circle` class  */
/* --------------------- */

const Super = SvgShape.__mojsClass;
const Circle = Object.create(Super);

const NS = 'http://www.w3.org/2000/svg';

/**
 * `_initializeShape` - function to element for render.
 */
Circle._initializeShape = function () {
  this.shapeEl = document.createElementNS(NS, 'ellipse');

  this.shapeEl.setAttribute('cx', 50);
  this.shapeEl.setAttribute('cy', 50);
  this.root.appendChild(this.shapeEl);
};

/**
 * `_initializeShape` - function to element for render.
 */
Circle.render = function (mainEl, support) {
  // `styleKeys` are keys for visual representation props - `fill`, `stroke` etc
  const { props, pipeObj } = support;
  const { shapeEl, styleKeys } = pipeObj;

  // draw visual stying
  for (let i = 0; i < styleKeys.length; i++) {
    const key = styleKeys[i];
    shapeEl.style[key] = props[key];
  }

  // draw shape
  const sizeX = (props.sizeX !== undefined) ? props.sizeX : props.size;
  const sizeY = (props.sizeY !== undefined) ? props.sizeY : props.size;
  const rx = `calc(${sizeX}/2)`;
  const ry = `calc(${sizeY}/2)`;

  if (rx !== support._rx) {
    shapeEl.setAttribute('rx', rx);
    support._rx = rx;
  }

  if (ry !== support._ry) {
    shapeEl.setAttribute('ry', ry);
    support._ry = ry;
  }
};

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
