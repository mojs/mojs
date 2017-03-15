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
    this._o = o;

    this._init();
    this.declareDefaults();
    this._extendDefaults();
    this._vars();
    this._render();
  }

  /**
   * _declareDefaults - function to declare `_defaults` object.
   */
  declareDefaults () { this.defaults = {}; }

  /*
    Method to copy `_o` options to `_props` object
    with fallback to `_defaults`.
    @private
  */
  _extendDefaults () {
    this._props  = {
      ...this._defaults,
      ...this._o
    };
  }

  /**
   * _vars - function do declare `variables` after `_defaults` were extended
   *         by `options` and saved to `_props`
   *
   * @return {type}  description
   */
  _vars () { }

  /**
   * _render - method to render on initialization.
   */
  render () { }
}

export default Module;
