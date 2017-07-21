import { Surface } from '../surface.babel.js';
import { SvgShape } from './svg/svg-shape.babel.js';

/* ------------------ */
/* The `Shape` class  */
/* ------------------ */

const Super = Surface.__mojsClass;
const Shape = Object.create(Super);

// TODO:
//  - remove tween options from the stylesKyes
//  - remove shape from the stylesKEys
//  - add `tune` method

/**
 * `arrayToObj` - function to tranform string[] to `{ [string]: true }` object
 *
 * @param {Array} array Array of strings.
 * @returns {Object} Object of { [key]: true }.
 */
const arrayToObj = (array) => {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const key = array[i];
    obj[key] = true;
  }

  return obj;
};

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
    width: 100,
    height: 100,
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
    ...this._shapeDefaults,
  };

  // create shape module
  this.shape = new SvgShape({
    el: this.el,
    shape: this._o.shape,
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
  const originalCustomProps = { ...customProperties };
  // save original `render`
  const originalRender = originalCustomProps.render;
  delete originalCustomProps.render;
  // save `surfaceOptions` and delete it from `options`
  const { surfaceOptions = [] } = this._o;
  const surfaceOptionsObject = arrayToObj(surfaceOptions);
  delete this._o.surfaceOptions;

  const newCustomProps = {};
  // add `isSkipRender: true` to all `shapeDefaults` properties
  const shapeDefaultsKeys = Object.keys(this._shapeDefaults);
  for (let i = 0; i < shapeDefaultsKeys.length; i++) {
    newCustomProps[shapeDefaultsKeys[i]] = {
      type: 'unit',
      isSkipRender: true,
    };
  }
  // for all `options` check if the property is present on the `surface` defaults,
  // if not present, add `isKipRender` to it
  const styleKeys = [];
  const optionKeys = Object.keys(o);
  for (let i = 0; i < optionKeys.length; i++) {
    const key = optionKeys[i];
    if (key !== 'el') {
      if (!this._surfaceDefaults.hasOwnProperty(key) && !surfaceOptionsObject[key]) {
        newCustomProps[key] = { isSkipRender: true };
        // original `key` record in original `customProperties`
        const originalRecord = originalCustomProps[key] || {};
        // filter out the shape properties and properties
        // that have the `isSkipRender` defined
        const isOnShapeDefaults = this._shapeDefaults.hasOwnProperty(key);
        if (!isOnShapeDefaults && !originalRecord.isSkipRender) {
          styleKeys.push(key);
        }
      }
    }
  }
  // return new `customProperties`
  return {
    ...newCustomProps,
    ...originalCustomProps,
    pipeObj: {
      styleKeys,
      root: this.shape.root,
    },
    render: (mainEl, support, ep, p, isForward) => {
      this.shape.render(mainEl, support, ep, p, isForward);
      // call the original `render` function if defined
      if (originalRender !== undefined) {
        originalRender(mainEl, support, ep, p, isForward);
      }
    },
  };
};

/**
 * Imitate `class` with wrapper.
 *
 * @param {Object} Options object.
 * @returns {Object} `Html` instance.
 */
const wrap = (o) => {
  const instance = Object.create(Shape);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Shape;

export { wrap as Shape };
