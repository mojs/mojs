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
 * `get` - Method to get a property from `_props`.
 *
 * @public
 * @param {String} Key.
 * @returns {Any} Value from the `_props` by `key`.
 */
ClassProto.get = function(key) {
  return this._props[key];
};

/**
 * `set` - Method to get a property from `_props`.
 *
 * @public
 * @param {String} Key.
 * @param {Any} Value.
 */
ClassProto.set = function(key, value) {
  this._props[key] = value;
};

/**
 * `setIfNotSet` - function to set a property if it isn't
 *                 present in the initialization options.
 *
 * @public
 * @param {String} Key.
 * @param {Any} Value.
 * @returns {Object} This instance.
 */
ClassProto.setIfNotSet = function(key, value) {
  if (this._o[key] === undefined) {
      this.set(key, value);
  }

  return this;
};

/**
 * _init - lifecycle initialization function.
 *
 * @private
 */
ClassProto.init = function(o = {}) {
  // save options
  this._o = { ...o };
  // parse index and delete it from options
  this.index = this._o.index || 0;
  delete this._o.index;
  // invoke lifecycle functions
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

export { ClassProto };
