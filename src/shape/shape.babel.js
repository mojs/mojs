import { Surface } from '../surface.babel.js';
import { Circle } from './svg/circle.babel.js';

/* ------------------ */
/* The `Shape` class  */
/* ------------------ */

const Super = Surface.__mojsClass;
const Shape = Object.create(Super);

/*
  TODO:
    - [customProperties]: should add `isSkipRender: true` to all `non-surface` properties
    - [customProperties]: should create `styleKeys`, `shapeKeys` and `shapeEl` and pass it thru
    - [customProperties]: new `render` should call the original one
    - [customProperties]: should not override the original properties type definitions
*/

/**
 * `_declareDefaults` - Method to declare `_defaults`.
 *
 * @private
 * @overrides @Surface
 */
Shape._declareDefaults = function () {
  Super._declareDefaults.call(this);
  // save surface property
  this._surfaceDefaults = {
    ...this._defaults,
  };
  // defaults of this module
  this._shapeDefaults = {
    // add `Shape` defaults
    size: 100,
    sizeX: undefined,
    sizeY: undefined,
  };
  // declare shape defaults
  this._defaults = {
    // keep the `Surface` defaults
    ...this._surfaceDefaults,
    // add this module defaults
    ...this._shapeDefaults
  };

  // create shape module
  this.shape = new Circle({
    el: this.el
  });

  // create customProperties
  const newCustomProps = this._createCustomProperties(this._o);
  this._o.customProperties = newCustomProps;
};


/**
 * `_createCustomProperties` - function to create new customProperties.
 *
 * @param {Object} o Options.
 * @return {Object} New custom properties.
 */
Shape._createCustomProperties = function (o) {
  const { customProperties = {} } = o;
  this._originalCustomProps = customProperties;
  const optionsKeys = Object.keys(o);

  const newCustomProps = {};

  newCustomProps.pipeObj = {
    shapeEl: this.shape.shapeEl
  };

  const defaultsKeys = Object.keys(this._shapeDefaults);
  for (let i = 0; i < defaultsKeys.length; i++) {
    const key = defaultsKeys[i];
    newCustomProps[key] = {
      isSkipRender: true
    };
  }

  const optionKeys = Object.keys(o);
  for (let i = 0; i < optionKeys.length; i++) {
    const key = optionKeys[i];
    if (key !== 'el' && this._surfaceDefaults[key] === undefined) {
      newCustomProps[key] = { isSkipRender: true };
    }
  }

  // const originalRender = this._o.customProperties.render;
  // this._o.customProperties.render = this.shape.render;
  return newCustomProps;
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
