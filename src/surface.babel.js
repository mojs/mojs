import { Html } from './html.babel.js';

/* -------------------- */
/* The `Surface` class  */
/* -------------------- */

// It wextends `Html` module, create an HTMLElement and adds it to the DOM,
// after that it passes the newely create element to `el` option of the
// Html module and declares `width`/`height` defaults.
// Thus it cretes a `Surface` that is controlled by `Html` module.

const Super = Html.__mojsClass;
const Surface = Object.create(Super);

/**
 * `init` - function init the class.
 *
 * @public
 * @extends @Html
 */
Surface.init = function (o = {}) {
  // create an Html element
  this._createElement();
  // add element and custom properties definition to the options
  o.el = this.el;
  o.customProperties = {
    ...o.customProperties,
    width: { type: 'unit' },
    height: { type: 'unit' },
  };

  // super call on HTML
  Super.init.call(this, o);
  // add element to DOM - we have `_props` available now
  this._props.parent.appendChild(this.el);
};

/**
 * `_createElement` - function to create `Html` element.
 */
Surface._createElement = function () {
  this.el = document.createElement('div');
};

/**
 * `_declareDefaults` - Method to declare `_defaults`.
 *
 * @private
 * @overrides @ ClassProto
 */
Surface._declareDefaults = function () {
  // super call
  Super._declareDefaults.call(this);
  // save html related defaults
  this._htmlDefaults = { ...this._defaults };
  // declare surface defaults
  this._defaults = {
    ...this._htmlDefaults,
    // add surface properties
    parent: document.body,
    // `width` of the surface, fallbacks to `size`
    width: 100,
    // `height` of the surface, fallbacks to `size`
    height: 100,
  };
};

/**
 * Imitate `class` with wrapper.
 *
 * @param {Object} Options object.
 * @returns {Object} `Html` instance.
 */
const wrap = (o) => {
  const instance = Object.create(Surface);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Surface;

export { wrap as Surface };
