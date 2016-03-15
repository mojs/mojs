import h from './h'

/*
  Base class for module. Extends and parses defaults.
*/
class Module {
  constructor ( o = {} ) {
    this._o = o;
    this._declareDefaults();
    this._extendDefaults();
    this._vars();
    this._render();
  }
  /*
    Method to declare defaults.
    @private
  */
  _declareDefaults () {
    this._defaults = { };
  }
  /*
    Method to declare module's variables.
    @private
  */
  _vars () {
    this._index    = this._o.index || 0;
    this._progress = 0;
  }
  /*
    Method to render on initialization.
    @private
  */
  _render () { }
  /*
    Method to set property on the module.
    @private
    @param {String, Object} Name of the property to set
                            or object with properties to set.
    @param {Any} Value for the property to set. Could be
                  undefined if the first param is object.
  */
  _setProp ( attr, value ) {
    if ( typeof attr === 'object' ) {
      for ( var key in attr ) { this._assignProp( key, attr[key] ); }
    } else { this._assignProp( attr, value ); }
  }
  /*
    Method to assign single property's value.
    @private
    @param {String} Property name.
    @param {Any}    Property value.
  */
  _assignProp ( key, value ) {
    this._props[key] = value;
  }
  /*
    Method to show the main div el.
    @private
  */
  _show () {
    if (this._isShown || (this.el == null)) { return; }
    this.el.style.display = 'block';
    this._isShown = true;
  }
  /*
    Method to hide the main div el.
    @private
  */
  _hide () {
    if ((this._isShown === false) || (this.el == null)) { return; }
    this.el.style.display = 'none';
    return this._isShown = false;
  }
  /*
    Method to parse option string.
    Searches for stagger and rand values and parses them.
    Leaves the value unattended otherwise.
    @param {Any} Option value to parse.
    @returns {Number} Parsed options value.
  */
  _parseOptionString (optionsValue) {
    if (typeof optionsValue === 'string') {
      if (optionsValue.match(/stagger/)) {
        optionsValue = h.parseStagger(optionsValue, this._index);
      }
    }
    if (typeof optionsValue === 'string') {
      if (optionsValue.match(/rand/)) {
        optionsValue = h.parseRand(optionsValue);
      }
    }
    return optionsValue;
  }
  /*
    Method to parse postion option.
    @param {String} Property name.
    @returns {String} Parsed options value.
  */
  _parsePositionOption (key) {
    var value = this._props[key];
    if (h.unitOptionMap[key]) { value = h.parseUnit(value).string; }
    return value;
  }
  /*
    Method to parse strokeDash.. option.
    @param {String} Property name.
    @returns {String} Parsed options value.
  */
  _parseStrokeDashOption (key) {
    var value  = this._props[key],
        result = value;
    // parse numeric/percent values for strokeDash.. properties
    if (h.strokeDashPropsMap[key]) {
      var result = [];
      switch (typeof value) {
        case 'number':
          result.push(h.parseUnit(value));
          break;
        case 'string':
          var array = this._props[key].split(' ');
          for (var i = 0; i < array.length; i++ ) {
            var unit = array[i];
            result.push(h.parseUnit(unit));
          }
          break;
      }
    }
    return result;
  }
  /*
    Method to check if the property is delta property.
    @private
    @param {Any} Parameter value to check.
    @returns {Boolean}
  */
  _isDelta ( optionsValue ) {
    var isObject = h.isObject( optionsValue );
    isObject = isObject && !optionsValue.unit;
    return !(!isObject || h.isArray(optionsValue) || h.isDOM(optionsValue));
  }
  /*
    Method to get delta from property and set
    the property's start value to the props object.
    @private
    @param {String} Key name to get delta for.
    @param {Object} Option value to get the delta for.
  */
  _getDelta ( key, optionsValue ) {
    var delta;
    if ((key === 'left' || key === 'top') && !this._o.ctx) {
      h.warn(`Consider to animate x/y properties instead of left/top,
        as it would be much more performant`, optionsValue);
    }
    // skip delta calculation for a property if it is listed
    // in skipPropsDelta object
    if ( this._skipPropsDelta && this._skipPropsDelta[key] ) { return; }
    // get delta
    delta = h.parseDelta(key, optionsValue, this._defaults[key]);
    // if successfully parsed - save it
    if (delta.type != null) { this._deltas[key] = delta; }
    // set props to start value of the delta
    this._props[key] = delta.start;
  }
  /*
    Method to extend module defaults with passed options.
    @param {Object} Optional object to extend defaults with.
  */
  _extendDefaults (o) {
    this._props = this._props || {};
    // reset deltas if no options was passed
    (o == null) && (this._deltas = {});
    var fromObject = o || this._defaults,
        keys       = Object.keys(fromObject),
        len        = keys.length;
    while (len--) {
      var key = keys[len];
      // skip property if it is listed in _skipProps
      if (this._skipProps && this._skipProps[key]) { continue; }
      
      var optionsValue = (o)
        // if fromObject was pass - get the value from passed o
        ? this._o[key] = o[key]
        // if from object wasn't passed - get options value from _o
        // with fallback to defaults
        : ( this._o[key] != null ) ? this._o[key] : this._defaults[key];
      // and delete the key from deltas
      o && (delete this._deltas[key]);
      // if delta property
      if ( this._isDelta(optionsValue) ) { this._getDelta(key, optionsValue); }
      else {
        // parse stagger and rand values
        this._props[key] = this._parseOptionString(optionsValue);
        // parse units for position properties
        this._props[key] = this._parsePositionOption(key);
        // parse numeric/percent values for strokeDash.. properties
        this._props[key] = this._parseStrokeDashOption(key);
      }
    }
  }
  /*
    Method to calculate current progress of the deltas.
    @private
    @param {Number} Progress to calculate - [0..1].
  */
  _calcCurrentProps ( progress ) {
    var a, b, dash, g, i, item, key, keys, len, r, stroke, units, value;
    keys = Object.keys(this._deltas);
    len = keys.length;
    while (len--) {
      key = keys[len];
      value = this._deltas[key];
      this._props[key] = (function() {
        var k, len1, ref;
        switch (value.type) {
          case 'array':
            stroke = [];
            ref = value.delta;
            for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
              item = ref[i];
              dash = value.start[i].value + item.value * this._progress;
              stroke.push({
                value: dash,
                unit: item.unit
              });
            }
            return stroke;
          case 'number':
            return value.start + value.delta * progress;
          case 'unit':
            units = value.end.unit;
            return "" + (value.start.value + value.delta * progress) + units;
          case 'color':
            r = parseInt(value.start.r + value.delta.r * progress, 10);
            g = parseInt(value.start.g + value.delta.g * progress, 10);
            b = parseInt(value.start.b + value.delta.b * progress, 10);
            a = parseInt(value.start.a + value.delta.a * progress, 10);
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }
      }).call(this);
    }
  }
  /*
    Method to calculate current progress and probably draw it in children.
    @private
    @param {Number} Progress to set - [0..1].
  */
  _setProgress ( progress ) {
    this._progress = progress;
    this._calcCurrentProps(progress);
  }
}

export default Module;