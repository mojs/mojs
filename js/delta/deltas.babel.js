/*
  This module's target is to parse options object,
  find deltas in it and send them to `Delta` classes.
  The `Delta` class is dull - they expect actual parsed deltas
  and separated tween options, so we should parse them here.
  The timeline of the module controls the `Delta` modules' tweens.

  @param {Object} props Object to set deltas result to (pass to the Delta classes).
  @param {Object} options Object to parse the deltas from.
  @param {Function} onUpdate onUpdate callback.
  @param optional {Object} arrayPropertyMap List of properties with truthy
                                            values which describe properties
                                            that should be parsed as arrays.
  @param optional {Object} numberPropertyMap List of properties with truthy
                                            values which describe properties
                                            that should be parsed as numbers
                                            without units.
*/

// TODO:
// - colors with curves change alpha level too
// const html = new mojs.Html({
//   el: '#js-el',
//   x: { 0: 100 },
//   onUpdate () {
//     console.log(this._props.originX);
//   },
//   originX: { 'white': 'black', curve: 'M0,100 L100, 0' },
//   customProperties: {
//     originX: {
//       type: 'color',
//       default: 'cyan'
//     },
//     draw() { console.log('draw'); }
//   }
// });


const easing = require('../easing/easing');
const h = require('../h');
import Timeline from '../tween/timeline';
import Tween from '../tween/tween';
import Delta from './delta';

// get tween properties
const obj = {};
Tween.prototype._declareDefaults.call( obj )
const keys = Object.keys( obj._defaults );
for (var i = 0; i < keys.length; i++) {
  obj._defaults[keys[i]] = 1;
}
obj._defaults['timeline'] = 1;
const TWEEN_PROPERTIES = obj._defaults;

class Deltas {
  constructor ( o = {} ) {
    this._o = o;

    this._shortColors = {
      transparent: 'rgba(0,0,0,0)',
      none:        'rgba(0,0,0,0)',
      aqua:        'rgb(0,255,255)',
      black:       'rgb(0,0,0)',
      blue:        'rgb(0,0,255)',
      fuchsia:     'rgb(255,0,255)',
      gray:        'rgb(128,128,128)',
      green:       'rgb(0,128,0)',
      lime:        'rgb(0,255,0)',
      maroon:      'rgb(128,0,0)',
      navy:        'rgb(0,0,128)',
      olive:       'rgb(128,128,0)',
      purple:      'rgb(128,0,128)',
      red:         'rgb(255,0,0)',
      silver:      'rgb(192,192,192)',
      teal:        'rgb(0,128,128)',
      white:       'rgb(255,255,255)',
      yellow:      'rgb(255,255,0)',
      orange:      'rgb(255,128,0)'
    }

    this._ignoreDeltasMap = { prevChainModule: 1, masterModule: 1 }

    this._parseDeltas( o.options );
    this._createDeltas();
    this._createTimeline( this._mainTweenOptions );
  }
  /*
    Method to call `refresh` on all child `delta` objects.
    @public
    @param {Boolean} If before start time (true) or after end time (false).
  */
  refresh (isBefore) {
    for ( var i = 0; i < this._deltas.length; i++ ) {
      this._deltas[i].refresh( isBefore );
    }
    return this;
  }
  /*
    Method to call `restore` on all child `delta` objects.
    @public
  */
  restore () {
    for ( var i = 0; i < this._deltas.length; i++ ) {
      this._deltas[i].restore();
    }
    return this;
  }
  /*
    Method to create Timeline.
    @private
    @param {Object} Timeline options.
  */
  _createTimeline ( opts = {} ) {
    // const o = this._o;
    // opts.timeline = opts.timeline || {};
    // opts.timeline.callbackOverrides = {
    //   onUpdate:   o.onUpdate,
    //   onRefresh:  o.onUpdate
    // }
    // send callbacksContext to timeline if set
    // o.callbacksContext && (opts.timeline.callbacksContext = o.callbacksContext);
    // opts.timeline
    this.timeline = new Timeline;
    this.timeline.add( this._deltas );
  }
  /*
    Method to create Deltas from parsed options.
    @private
  */
  _createDeltas () {
    this._deltas = [];

    // create main delta object
    this._deltas.push(
      this._createDelta( this._mainDeltas, this._mainTweenOptions )
    );

    // create child delta object
    for ( var i = 0; i < this._childDeltas.length; i++ ) {
      var delta = this._childDeltas[i];
      this._deltas.push(
        this._createDelta( [delta.delta], delta.tweenOptions )
      );
    }
  }
  /*
    Method to create Delta object with passed options.
    @private
    @param {Array} Array of deltas.
    @param {Object} Tween properties.
    @returns {Object} Delta object
  */
  _createDelta (deltas, tweenOptions) {
    const o = this._o;
    return new Delta({
      deltas, tweenOptions,
      props:            o.props,
      isChained:        o.isChained,
      callbacksContext: o.callbacksContext,
    });
  }
  /*
    Method to parse delta objects from options.
    @private
    @param {Object} Options object to parse the deltas from.
  */
  _parseDeltas (obj) {
    // spilt main animation properties and main tween properties
    const mainSplit = this._splitTweenOptions( obj );
    // main animation properties
    const opts      = mainSplit.delta;
    // main tween properties
    this._mainTweenOptions = mainSplit.tweenOptions;

    this._mainDeltas  = [];
    this._childDeltas = [];
    const keys = Object.keys( opts );
    // loop thru all properties without tween ones
    for (var i = 0; i < keys.length; i++ ) {
      var key = keys[i];
      // is property is delta - parse it
      if ( this._isDelta( opts[key] ) && !this._ignoreDeltasMap[key] ) {
        var delta = this._splitAndParseDelta( key, opts[key] );
        // if parsed object has no tween values - it's delta of the main object
        if (!delta.tweenOptions) { this._mainDeltas.push( delta.delta ); }
        // otherwise it is distinct delta object
        else { this._childDeltas.push( delta ); }
      }
    }
  }
  /*
    Method to split tween values and parse single delta record.
    @private
    @param {String} Property name.
    @param {Object} Raw delta object.
    @returns {Object} Split object.
                @param {Object} tweenOptions Tween properties.
                @param {Object} delta Parsed delta.
  */
  _splitAndParseDelta (name, object) {
    const split = this._splitTweenOptions( object );
    // parse delta in the object
    split.delta = this._parseDelta( name, split.delta );
    return split;
  }
  /*
    Method to parse delta by delegating the variables to _parse*Delta methods.
    @private
    @param {String} Property name.
    @param {Object} Raw delta object.
    @param {Number} Module index.
  */
  _parseDelta (name, object, index) {
    // if name is in _o.customProps - parse it regarding the type
    return ( this._o.customProps && (this._o.customProps[ name ] != null) )
      ? this._parseDeltaByCustom(name, object, index)
      : this._parseDeltaByGuess(name, object, index);
  }
  /**
    Method to parse delta by taking the type from the customProps object.
    @private
    @param {String} Property name.
    @param {Object} Raw delta object.
    @param {Number} Module index.
  */
  _parseDeltaByCustom (name, object, index) {
    return this._parseNumberDelta( name, object, index ); 
    // const customRecord = this._o.customProps[name];
    // switch ( customRecord.type.toLowerCase() ) {
    //   case 'color':  { return this._parseColorDelta( name, object ); }
    //   case 'array':  { return this._parseArrayDelta( name, object ); }
    //   case 'number': { return this._parseNumberDelta( name, object, index ); }
    //   case 'unit':   { return this._parseUnitDelta( name, object, index ); }
    // }
  }
  /**
    Method to parse delta by reasoning about it's value.
    @private
    @param {String} Property name.
    @param {Object} Raw delta object.
    @param {Number} Module index.
  */
  _parseDeltaByGuess (name, object, index) {
    const { start } = this._preparseDelta( object );
    const o = this._o;

    // color values
    if (isNaN(parseFloat(start)) && !start.match(/rand\(/) && !start.match(/stagger\(/)) {
      return this._parseColorDelta( name, object );
    // array values
    } else if ( o.arrayPropertyMap && o.arrayPropertyMap[ name ] ) {
      return this._parseArrayDelta( name, object );
    // unit or number values
    } else {
      return ( o.numberPropertyMap && o.numberPropertyMap[name] )
        // if the property is in the number property map - parse it like number
        ? this._parseNumberDelta( name, object, index )
        // otherwise - like number with units
        : this._parseUnitDelta( name, object, index );
    }
  }
  /*
    Method to separate tween options from delta properties.
    @param {Object} Object for separation.
    @returns {Object} Object that contains 2 objects
                        - one delta options
                        - one tween options ( could be empty if no tween opts )
  */
  _splitTweenOptions ( delta ) {
    delta = { ...delta };

    const keys = Object.keys( delta ),
          tweenOptions = {};
    var isTween = null;

    for ( var i = 0; i < keys.length; i++ ) {
      let key = keys[i]
      if ( TWEEN_PROPERTIES[key] ) {
        if ( delta[key] != null ) {
          tweenOptions[key] = delta[key];
          isTween = true;
        }
        delete delta[key];
      }
    }
    return {
      delta,
      tweenOptions: (isTween) ? tweenOptions: undefined
    };
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
    Method to parse color delta values.
    @private
    @param {String} Name of the property.
    @param {Any} Property value.
    @returns {Object} Parsed delta.
  */
  _parseColorDelta (key, value) {
    if ( key === 'strokeLinecap' ) {
      h.warn(`Sorry, stroke-linecap property is not animatable yet, using the start(#{start}) value instead`, value);
      return {}
    }
    const preParse = this._preparseDelta( value );

    const startColorObj = this._makeColorObj(preParse.start),
          endColorObj   = this._makeColorObj(preParse.end);

    const delta = {
      type:     'color',
      name:     key,
      start:    startColorObj,
      end:      endColorObj,
      curve:    preParse.curve,
      delta: {
        r: endColorObj.r - startColorObj.r,
        g: endColorObj.g - startColorObj.g,
        b: endColorObj.b - startColorObj.b,
        a: endColorObj.a - startColorObj.a,
      }
    }
    return delta;
  }
  /*
    Method to parse array delta values.
    @private
    @param {String} Name of the property.
    @param {Any} Property value.
    @returns {Object} Parsed delta.
  */
  _parseArrayDelta (key, value) {
    const preParse = this._preparseDelta( value );

    const startArr  = this._strToArr(preParse.start),
          endArr    = this._strToArr(preParse.end);

    h.normDashArrays(startArr, endArr);

    for (var i = 0; i < startArr.length; i++) {
      let end = endArr[i];
      h.mergeUnits(startArr[i], end, key);
    }

    const delta = {
      type:     'array',
      name:     key,
      start:    startArr,
      end:      endArr,
      delta:    h.calcArrDelta(startArr, endArr),
      curve:    preParse.curve
    }

    return delta;
  }
  /*
    Method to parse numeric delta values with units.
    @private
    @param {String} Name of the property.
    @param {Any} Property value.
    @param {Number} Index of the module.
    @returns {Object} Parsed delta.
  */
  _parseUnitDelta (key, value, index) {
    const preParse = this._preparseDelta( value );
    
    const end   = h.parseUnit(h.parseStringOption(preParse.end, index)),
          start = h.parseUnit(h.parseStringOption(preParse.start, index));

    h.mergeUnits(start, end, key);
    const delta = {
      type:     'unit',
      name:     key,
      start:    start,
      end:      end,
      delta:    end.value - start.value,
      curve:    preParse.curve
    }
    return delta;
  }
  /*
    Method to parse numeric delta values without units.
    @private
    @param {String} Name of the property.
    @param {Any} Property value.
    @param {Number} Index of the module.
    @returns {Object} Parsed delta.
  */
  _parseNumberDelta (key, value, index) {
    const preParse = this._preparseDelta( value );

    const end   = parseFloat(h.parseStringOption(preParse.end,   index)),
          start = parseFloat(h.parseStringOption(preParse.start, index));

    const delta = {
      type:     'number',
      name:     key,
      start:    start,
      end:      end,
      delta:    end - start,
      curve:    preParse.curve
    }

    return delta;
  }
  /*
    Method to extract `curve` and `start`/`end` values.
    @private
    @param {Object} Delta object.
    @returns {Object} Preparsed delta.
              @property {String} Start value.
              @property {String, Number} End value.
  */
  _preparseDelta (value) {
    // clone value object
    value = {...value};
    // parse curve if exist
    let curve = value.curve;
    if (curve != null) {
      curve = easing.parseEasing( curve );
      curve._parent = this;
    }
    delete value.curve;
    // parse start and end values
    const start = Object.keys(value)[0],
          end   = value[start];

    return { start, end, curve } 
  }
  /*
    Method to parse color into usable object.
    @private
    @param {String} Color string.
    @returns {Object} Parsed color value.
  */
  _makeColorObj (color) {
    // HEX
    let colorObj = {};
    if (color[0] === '#') {
      const result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);
      if (result) {
        const r = (result[1].length === 2) ? result[1] : result[1]+result[1],
              g = (result[2].length === 2) ? result[2] : result[2]+result[2],
              b = (result[3].length === 2) ? result[3] : result[3]+result[3];

        colorObj = {
          r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16), a: 1
        }
      }
    }
    
    // not HEX
    // shorthand color and rgb()
    if (color[0] !== '#') {
      const isRgb = color[0] === 'r' && color[1] === 'g' && color[2] === 'b'
      let rgbColor;
      // rgb color
      if (isRgb) { rgbColor = color };
      // shorthand color name
      if (!isRgb) {
        if (!this._shortColors[color]) {
          h.div.style.color = color;
          rgbColor = h.computedStyle(h.div).color;
        } else { rgbColor = this._shortColors[color]; }
      }

      const regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),',
            regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$',
            result = new RegExp(regexString1 + regexString2, 'gi').exec(rgbColor),
            alpha  = parseFloat(result[4] || 1);

      if (result) {
        colorObj = {
          r: parseInt(result[1],10),
          g: parseInt(result[2],10),
          b: parseInt(result[3],10),
          a: ((alpha != null) && !isNaN(alpha)) ? alpha : 1
        }
      }
    }

    return colorObj;
  }
  /*
    Method to parse string into array.
    @private
    @param {String, Number} String or number to parse.
    @returns {Array} Parsed array.
  */
  _strToArr (string) {
    const arr = [];
    // plain number
    if (typeof string === 'number' && !isNaN(string)) {
      arr.push(h.parseUnit(string));
      return arr;
    }
    // string array
    string.trim().split(/\s+/gim).forEach( (str) => {
      arr.push(h.parseUnit(h.parseIfRand(str)));
    });
    return arr;
  }

}

export default Deltas;