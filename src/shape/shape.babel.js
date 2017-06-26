import { Surface } from '../surface.babel.js';
import { Circle } from './svg/circle.babel.js';

/* ------------------ */
/* The `Shape` class  */
/* ------------------ */

const Super = Surface.__mojsClass;
const Shape = Object.create(Super);

/*
  TODO:
    - [defaults]: add `size`, `sizeX` and `sizeY` defaults and `types` for them
    - [customProperties]: new `render` should call the original one
    - [customProperties]: should add `isSkipRender: true` to all `non-surface` properties
    - [customProperties]: should create `styleKeys`, `shapeKeys` and `shapeEl` and pass it thru
    - [customProperties]: should not override the original properties type definitions
*/

Shape._createElement = function () {
  // super call
  Super._createElement.call(this);
  // create shape
  this._initializeShape();
};

/**
 * `_createHtml` - function to create `html` module.
 *
 * @extends @Surface
 * @private
 */
Shape._createHtml = function () {
  this._o.customProperties = this._o.customProperties || {};
  // const originalRender = this._o.customProperties.render;

  this._o.customProperties.render = this.shape.render;
  // super call
  Super._createHtml.call(this);
};

/**
 * `_initializeShape` - function to initialize shape.
 */
Shape._initializeShape = function () {
  this.shape = new Circle({
    el: this.el,
  });
};

/**
 * Imitate `class` with wrapper.
 *
 * @param {Object} Options object.
 * @returns {Object} `Html` instance.
 */
const wrap = (o) => {
  const instance = Object.create(Shape);

  return instance.init(o) || instance;
};

wrap.__mojsClass = Shape;

export { wrap as Shape };
