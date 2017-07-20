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
Custom.getShape = function () {
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

  // const maxScale = Math.max(scaleX,scaleY);
  // calculate shift
  const shiftX = (300 / 2) - (50 * scaleX);
  const shiftY = (300 / 2) - (50 * scaleY);

  const transform = `translate(${shiftX}, ${shiftY}) scale(${scaleX}, ${scaleY})`;
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
