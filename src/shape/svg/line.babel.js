import { SvgShape } from './svg-shape.babel.js';

/* --------------------- */
/* The `Line` class  */
/* --------------------- */

const Super = SvgShape.__mojsClass;
const Line = Object.create(Super);

const NS = 'http://www.w3.org/2000/svg';

/**
 * `_initializeShape` - function to element for render.
 */
Line._initializeShape = function () {
  this.shapeEl = document.createElementNS(NS, 'line');

  this.root.appendChild(this.shapeEl);
};

/**
 * `_initializeShape` - function to element for render.
 */
Line.render = function (mainEl, support) {
  // `styleKeys` are keys for visual representation props - `fill`, `stroke` etc
  const { props, pipeObj } = support;
  const { shapeEl, styleKeys } = pipeObj;

  // draw visual stying
  for (let i = 0; i < styleKeys.length; i++) {
    const key = styleKeys[i];
    const cacheName = `_${key}`;
    const value = props[key];
    if (support[cacheName] !== value) {
      shapeEl.style[key] = value;
    }
    support[cacheName] = value;
  }

  // draw shape
  // const sizeX = (props.sizeX !== undefined) ? props.sizeX : props.size;
  const sizeY = (props.sizeY !== undefined) ? props.sizeY : props.size;
  // const rx = `calc(${sizeX}/2)`;
  // const ry = `calc(${sizeY}/2)`;

  // if (rx !== support._rx) {
  //   shapeEl.style.rx = rx;
  //   support._rx = rx;
  // }

  // if (ry !== support._ry) {
  //   // shapeEl.setAttribute('ry', ry);
  //   shapeEl.style.ry = ry;
  //   support._ry = ry;
  // }
};

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Line instance.
 */
const wrap = (o) => {
  const instance = Object.create(Line);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Line;

export { wrap as Line };
