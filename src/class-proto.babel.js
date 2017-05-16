/**
 * ClassProto - base class for module.
 * It is needed to:
 *   - declare `_defaults`
 *   - extend `_defaults` by `options` and save result to `_props`
 *   - declare `_vars` after extention
 *   - call `_render` eventually
 */
const ClassProto = {};

/**
 * get - Method to get a property from `_props`.
 *
 * @public
 * @param {String} Key.
 * @returns {Any} Value from the `_props` by `key`.
 */
ClassProto.get = function(key) {
  return this._props[key];
};

/**
 * get - Method to get a property from `_props`.
 *
 * @public
 * @param {String} Key.
 * @param {Any} Value.
 */
ClassProto.set = function(key, value) {
  this._props[key] = value;
};

/**
 * _init - lifecycle initialization function.
 *
 * @private
 */
ClassProto.init = function(o = {}) {
  // save options
  this._o = o;

  this._declareDefaults();
  this._extendDefaults();
  this._vars();
};

/**
 * _declareDefaults - function to declare `_defaults` object.
 *
 * @private
 */
ClassProto._declareDefaults = function() { this._defaults = {}; };

/**
 * _extendDefaults - Method to copy `_o` options to `_props` object
 *                  with fallback to `_defaults`.
 * @private
 */
ClassProto._extendDefaults = function() {
  this._props = {
    ...this._defaults,
    ...this._o
  };
};

/**
 * _vars - function do declare `variables` after `_defaults` were extended
 *         by `options` and saved to `_props`
 *
 * @return {type}  description
 */
ClassProto._vars = function() {};

export { ClassProto as ClassProto };
