import { Html } from './html';
import { Tweenable } from './tween/tweenable';
import { parseElement } from './helpers/parse-element';

/* -------------------- */
/* The `Surface` class  */
/* -------------------- */

const Super = Tweenable.__mojsClass;
const Surface = Object.create(Super);

/**
 * `_declareDefaults` - Method to declare `_defaults`.
 *
 * @private
 * @overrides @ ClassProto
 */
Surface._declareDefaults = function() {
  this._defaults = {
    parent: document.body,
    // `width` of the surface, fallbacks to `size`
    width: 100,
    // `height` of the surface, fallbacks to `size`
    height: 100
  };
};

/**
 * _vars - function do declare `variables` after `_defaults` were extended
 *         by `options` and saved to `_props`
 *
 * @private
 */
Surface._vars = function() {
  // super call
  Super._vars.call(this);
  // create `Html` element
  this._createElement();
  // create `Html` module
  this._createHtml();
};

/**
 * `_createElement` - function to create root html element.
 */
Surface._createElement = function() {
  this.el = document.createElement('div');

  this._props.parent.appendChild(this.el);
};

/**
 * `_createHtml` - function to create `html` module.
 *
 * @private
 */
Surface._createHtml = function() {
  // create object that will be passed to the `html` module
  const htmlOptions = {
    ...this._props
  };
  // delete parent from the object
  delete htmlOptions.parent;
  // create `html`
  this._html = new Html({
    el: this.el,
    ...htmlOptions,
    customProperties: {
      ...this._o.customProperties,
      width: { type: 'unit' },
      height: { type: 'unit' }
    }
  });
  // set `timeline` to `html's` timeline so `tweenable` will work
  this.timeline = this._html.timeline;
}

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
