import h from './h';

/*
  Base class for module. Extends and parses defaults.
*/
class Module {
  constructor ( o = {} ) {
    // this._isIt = o.isIt;
    // delete o.isIt;
    this._o     = o;
    this._index = this._o.index || 0;
    // map of props that should be
    // parsed to arrays of values
    this._arrayPropertyMap = {
      strokeDashoffset: 1,
      strokeDasharray:  1,
      origin:           1
    }

    this._skipPropsDelta = {
      timeline: 1,
      prevChainModule: 1,
      callbacksContext: 1
    };

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
    this._progress = 0;
    this._strokeDasharrayBuffer = [];
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
    Method to show element.
    @private
  */
  _show () {
    var p = this._props;
    if ( !this.el ) { return; }

    if ( p.isSoftHide ) {
      // this.el.style.opacity = p.opacity;
      this._showByTransform();
    } else { this.el.style.display = 'block'; }

    this._isShown = true;
  }
  /*
    Method to hide element.
    @private
  */
  _hide () {
    if ( !this.el ) { return; }

    if ( this._props.isSoftHide ) {
      // this.el.style.opacity = 0;
      h.setPrefixedStyle( this.el, 'transform', 'scale(0)' );
    } else { this.el.style.display = 'none'; }
    
    this._isShown = false;
  }
  /*
    Method to show element by applying transform back to normal.
    @private
  */
  _showByTransform () {}
  /*
    Method to parse option string.
    Searches for stagger and rand values and parses them.
    Leaves the value unattended otherwise.
    @param {Any} Option value to parse.
    @returns {Number} Parsed options value.
  */
  _parseOptionString (value) {
    if (typeof value === 'string') {
      if (value.match(/stagger/)) {
        value = h.parseStagger(value, this._index);
      }
    }
    if (typeof value === 'string') {
      if (value.match(/rand/)) {
        value = h.parseRand(value);
      }
    }
    return value;
  }
  /*
    Method to parse postion option.
    @param {String} Property name.
    @param {Any} Property Value.
    @returns {String} Parsed options value.
  */
  _parsePositionOption (key, value) {
    if (h.unitOptionMap[key]) { value = h.parseUnit(value).string; }
    return value;
  }
  /*
    Method to parse strokeDash.. option.
    @param {String} Property name.
    @param {Any}    Property value.
    @returns {String} Parsed options value.
  */
  _parseStrokeDashOption (key, value) {
    var result = value;
    // parse numeric/percent values for strokeDash.. properties
    if ( this._arrayPropertyMap[key] ) {
      var result = [];
      switch (typeof value) {
        case 'number':
          result.push(h.parseUnit(value));
          break;
        case 'string':
          var array = value.split(' ');
          for (var i = 0; i < array.length; i++ ) {
            result.push(h.parseUnit(array[i]));
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
    delta = h.parseDelta(key, optionsValue, this._index);
    // if successfully parsed - save it
    if (delta.type != null) { this._deltas[key] = delta; }

    var deltaEnd = ( typeof delta.end === 'object' )
      ? (delta.end.value === 0) ? 0 : delta.end.string
      : delta.end;
    // set props to end value of the delta
    // 0 should be 0 regardless units
    this._props[key] = deltaEnd;
  }
  /*
    Method to copy `_o` options to `_props` object
    with fallback to `_defaults`.
    @private
  */
  _extendDefaults ( ) {
    this._props  = {};
    this._deltas = {};
    for (var key in this._defaults) {
      // skip property if it is listed in _skipProps
      // if (this._skipProps && this._skipProps[key]) { continue; }
      // copy the properties to the _o object
      var value = ( this._o[key] != null ) ? this._o[key] : this._defaults[key];
      // parse option
      this._parseOption( key, value );
    }
  }
  /*
    Method to tune new oprions to _o and _props object.
    @private
    @param {Object} Options object to tune to.
  */
  _tuneNewOptions (o) {
    // hide the module before tuning it's options
    // cuz the user could see the change
    this._hide();
    for (var key in o) {
      // skip property if it is listed in _skipProps
      // if (this._skipProps && this._skipProps[key]) { continue; }
      // copy the properties to the _o object
      // delete the key from deltas
      o && (delete this._deltas[key]);
      // rewrite _o record
      this._o[key] = o[key];
      // save the options to _props
      this._parseOption( key, o[key] );
    }
  }
  /*
    Method to parse option value.
    @private
    @param {String} Option name.
    @param {Any} Option value.
  */
  _parseOption ( name, value ) {
    // if delta property
    if ( this._isDelta( value ) && !this._skipPropsDelta[name] ) {
      this._getDelta( name, value );
      var deltaEnd = h.getDeltaEnd( value );
      return this._assignProp( name, this._parseProperty( name, deltaEnd ) );
    }

    this._assignProp( name, this._parseProperty( name, value ) );
  }
  /*
    Method to parse postion and string props.
    @private
    @param {String} Property name.
    @param {Any}    Property value.
    @returns {Any}  Parsed property value.
  */
  _parsePreArrayProperty ( name, value ) {
    // parse stagger and rand values
    value = this._parseOptionString(value);
    // parse units for position properties
    return this._parsePositionOption(name, value);
  }
  /*
    Method to parse property value.
    @private
    @param {String} Property name.
    @param {Any}    Property value.
    @returns {Any}  Parsed property value.
  */
  _parseProperty ( name, value ) {
    // parse `HTML` element in `parent` option
    if ( name === 'parent' ) { return h.parseEl( value ); }
    // parse `stagger`, `rand` and `position`
    value = this._parsePreArrayProperty( name, value );
    // parse numeric/percent values for strokeDash.. properties
    return this._parseStrokeDashOption(name, value);
  }
  /*
    Method to parse values inside ∆.
    @private
    @param {String} Key name.
    @param {Object} Delta.
    @returns {Object} Delta with parsed parameters.
  */
  _parseDeltaValues (name, delta) {
    // return h.parseDelta( name, delta, this._index );

    var d = {};
    for (var key in delta) {
      var value = delta[key];

      // delete delta[key];
      // add parsed properties
      var newEnd = this._parsePreArrayProperty(name, value);
      d[this._parsePreArrayProperty(name, key)] = newEnd;
    }
    return d;
  }
  /*
    Method to parse delta and nondelta properties.
    @private
    @param {String} Property name.
    @param {Any}    Property value.
    @returns {Any}  Parsed property value.
  */
  _preparsePropValue (key, value) {
    return ( this._isDelta(value) )
      ? this._parseDeltaValues(key, value)
      : this._parsePreArrayProperty( key, value );
  }
  /*
    Method to calculate current progress of the deltas.
    @private
    @param {Number} Eased progress to calculate - [0..1].
    @param {Number} Progress to calculate - [0..1].
  */
  _calcCurrentProps ( easedProgress, p ) {

    for (var key in this._deltas) {

      var value = this._deltas[key];

      // get eased progress from delta easing if defined and not curve
      var isCurve = !!value.curve;
      var ep = ( value.easing != null && !isCurve )
        ? value.easing( p ) : easedProgress;

      if ( value.type === 'array' ) {
        var arr;
        // if prop property is array - reuse it else - create an array
        if ( h.isArray( this._props[key] ) ) {
          arr = this._props[key];
          arr.length = 0;
        } else { arr = []; }

        // just optimization to prevent curve
        // calculations on every array item
        var proc = (isCurve) ? value.curve(p) : null;

        for ( var i = 0; i < value.delta.length; i++ ) {
          var item = value.delta[i],
              dash = (!isCurve)
                    ? value.start[i].value + ep * item.value
                    : proc * (value.start[i].value + p * item.value);
          arr.push({
            string: `${dash}${item.unit}`,
            value:  dash,
            unit:   item.unit,
          });
        }

        this._props[key] = arr;

      } else if ( value.type === 'number' ) {
        this._props[key] = (!isCurve)
          ? value.start + ep * value.delta
          : value.curve(p) * ( value.start + p * value.delta );
      } else if ( value.type === 'unit' ) {
        var currentValue = ( !isCurve )
          ? value.start.value + ep*value.delta
          : value.curve(p) * ( value.start.value + p * value.delta );
        
        this._props[key] = `${currentValue}${value.end.unit}`;

      } else if ( value.type === 'color' ) {
        var r, g, b, a;
        if ( !isCurve ) {
          r = parseInt(value.start.r + ep * value.delta.r, 10);
          g = parseInt(value.start.g + ep * value.delta.g, 10);
          b = parseInt(value.start.b + ep * value.delta.b, 10);
          a = parseFloat(value.start.a + ep * value.delta.a);
        } else {
          var cp = value.curve(p);
          r = parseInt(cp * (value.start.r + p*value.delta.r), 10);
          g = parseInt(cp * (value.start.g + p*value.delta.g), 10);
          b = parseInt(cp * (value.start.b + p*value.delta.b), 10);
          a = parseFloat(cp * (value.start.a + p*value.delta.a));
        }
        this._props[key] = `rgba(${r},${g},${b},${a})`;
      }
    }
  }
  /*
    Method to calculate current progress and probably draw it in children.
    @private
    @param {Number} Eased progress to set - [0..1].
    @param {Number} Progress to set - [0..1].
  */
  _setProgress ( easedProgress, progress ) {
    this._progress = easedProgress;
    this._calcCurrentProps( easedProgress, progress );
  }
}

export default Module;