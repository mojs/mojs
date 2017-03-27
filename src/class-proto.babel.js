/**
 * ClassProto - base class for module.
 * It is needed to:
 *   - declare `_defaults`
 *   - extend `_defaults` by `options` and save result to `_props`
 *   - declare `_vars` after extention
 *   - call `_render` eventually
 */
class ClassProto {
  constructor (o = {}) {
    // save options
    this._o = o;

    this._init();
    this._declareDefaults();
    this._extendDefaults();
    this._vars();
  }

  /**
   * _init - lifecycle initialization function.
   *
   * @private
   */
  _init() {}

  /**
   * _declareDefaults - function to declare `_defaults` object.
   *
   * @private
   */
  _declareDefaults() { this._defaults = {}; }

  /**
   * _extendDefaults - Method to copy `_o` options to `_props` object
   *                  with fallback to `_defaults`.
   * @private
   */
  _extendDefaults() {
    this._props  = {
      ...this._defaults,
      ...this._o
    };
  }

  /**
   * _setProp - Method to set property on the module.
   *
   * @private
   * @param {String, Object} Name of the property to set
   *                         or object with properties to set.
   * @param {Any} Value for the property to set. Could be
   *              undefined if the first param is object.
   */
  _setProp(attr, value) {
    if ( typeof attr === 'object' ) {
      for ( var key in attr ) { this._assignProp( key, attr[key] ); }
    } else { this._assignProp( attr, value ); }
  }

  /**
   * _assignProp - Method to assign single property's value.
   *
   * @private
   * @param {String} Property name.
   * @param {Any}    Property value.
   */
  _assignProp(key, value) { this._props[key] = value; }

  /**
   * _vars - function do declare `variables` after `_defaults` were extended
   *         by `options` and saved to `_props`
   *
   * @return {type}  description
   */
  _vars() {}

  /**
   * _render - method to render on initialization.
   */
  _render() {}
}

export default ClassProto;
