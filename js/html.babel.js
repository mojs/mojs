const h = require('./h');
import Thenable   from './thenable';
import Tween      from './tween/tween';
import Deltas     from './delta/deltas';

// get tween properties
const obj = {};
Tween.prototype._declareDefaults.call( obj )
const keys = Object.keys( obj._defaults );
for (var i = 0; i < keys.length; i++) {
  obj._defaults[keys[i]] = 1;
}
obj._defaults['timeline'] = 1;
const TWEEN_PROPERTIES = obj._defaults;

/*
  TODO:

    - change _props to _propsObj for animations
    - current values in deltas
*/

class Html extends Thenable {

  _declareDefaults () {
    this._defaults = {
      x:          0,
      y:          0,
      z:          0,

      skewX:      0,
      skewY:      0,

      // angle:      0,
      angleX:     0,
      angleY:     0,
      angleZ:     0,

      scale:      1,
      scaleX:     1,
      scaleY:     1,

      isSoftHide:       true,
      isShowStart:      true,
      isShowEnd:        true,
      isForce3d:        false,
      isRefreshState:   true

    }
    // exclude from automatic drawing
    this._drawExclude  = { el: 1 }
    // properties that cause 3d layer
    this._3dProperties = [ 'angleX', 'angleY', 'z' ];
    // properties that have array values
    this._arrayPropertyMap = { transformOrigin: 1, backgroundPosition: 1 }
    // properties that have no units
    this._numberPropertyMap = {
      opacity: 1, scale: 1, scaleX: 1, scaleY: 1,
      // angle: 1,
      angleX: 1, angleY: 1, angleZ: 1,
      skewX: 1, skewY: 1
    }
    // properties that should be prefixed 
    this._prefixPropertyMap = { transform: 1, transformOrigin: 1 }
    // save prefix
    this._prefix = h.prefix.css;
  }

  then (o) {
    // return if nothing was passed
    if ((o == null) || !Object.keys(o).length) { return 1; }

    // get the last item in `then` chain
    var prevModule = h.getLastItem( this._modules );  
    // set deltas to the finish state
    prevModule.deltas.refresh( false );
    // copy finish state to the last history record
    this._history[ this._history.length-1 ] = prevModule._o;
    // call super
    super.then(o);
    // restore the _props
    prevModule.deltas.restore();

    return this;
  }
  /*
    Method to pipe startValue of the delta.
    @private
    @ovarrides @ Thenable
    @param {String} Start property name.
    @param {Any} Start property value.
    @returns {Any} Start property value.
  */
  _checkStartValue (key, value) {
    if ( value == null ) {
      // return default value for transforms
      if ( this._defaults[key] != null ) { return this._defaults[key]; }
      // return default value from _customProps
      if ( this._customProps[key] != null ) { return this._customProps[key]; }
      // try to get the default value
      if ( h.defaultStyles[key] != null ) { return h.defaultStyles[key]; }
      // at the end return 0
      return 0;
    }

    return value;
  }
  /*
    Method to draw _props to el.
    @private
  */
  _draw () {
    const p = this._props;
    for (var i = 0; i < this._drawProps.length; i++) {
      var name = this._drawProps[i];
      this._setStyle( name, p[name] );
    }
    // draw transforms
    this._drawTransform();
    // call custom transform callback if exist
    this._customDraw && this._customDraw( this._props.el, this._props );
  }
  /*
    Method to set transform on element.
    @private
  */
  _drawTransform () {
    const p = this._props;
    const string = ( !this._is3d )
      ? `translate(${p.x}, ${p.y})
          rotate(${p.angleZ}deg)
          skew(${p.skewX}deg, ${p.skewY}deg)
          scale(${p.scaleX}, ${p.scaleY})`

      : `translate3d(${p.x}, ${p.y}, ${p.z})
          rotateX(${p.angleX}deg)
          rotateY(${p.angleY}deg)
          rotateZ(${p.angleZ}deg)
          skew(${p.skewX}deg, ${p.skewY}deg)
          scale(${p.scaleX}, ${p.scaleY})`;

    this._setStyle( 'transform', string );
  }
  /*
    Method to render on initialization.
    @private
    @overrides @ Module
  */
  _render () {
    // return immediately if not the first in `then` chain
    if ( this._o.prevChainModule ) { return; }

    var p = this._props;

    for (var i = 0; i < this._renderProps.length; i++) {
      var name  = this._renderProps[i],
          value = p[name];

      value = (typeof value === 'number') ? `${value}px` : value;
      this._setStyle( name, value );
    }

    this._draw();

    if (!p.isShowStart) { this._hide(); }
  }
  /*
    Method to set style on el.
    @private
    @param {String} Style property name.
    @param {String} Style property value.
  */
  _setStyle ( name, value ) {
    if ( this._state[ name ] !== value ) {
      var style = this._props.el.style;
      // set style
      style[ name ] = value;
      // if prefix needed - set it
      if ( this._prefixPropertyMap[ name ] ) {
        style[ `${this._prefix}${name}` ] = value;
      }
      // cache the last set value
      this._state[ name ] = value;
    }
  }
  /*
    Method to copy `_o` options to `_props` object.
    @private
  */
  _extendDefaults () {
    this._props = this._o.props || {};
    // props for intial render only
    this._renderProps = [];
    // props for draw on every frame update
    this._drawProps   = [];
    // save custom properties if present
    this._saveCustomProperties( this._o );
    // copy the options
    let o = { ...this._o };
    // extend options with defaults
    o = this._addDefaults(o);

    const keys = Object.keys( o );
    for ( var i = 0; i < keys.length; i ++ ) {
      var key = keys[i];
      // include the property if it is not in drawExclude object
      // and not in defaults = not a transform
      var isInclude =
        !this._drawExclude[key] && // not in exclude map
        this._defaults[key] == null && // not transform property
        !TWEEN_PROPERTIES[key]; // not tween property

      var isCustom = this._customProps[key];
      // copy all non-delta properties to the props
      // if not delta then add the property to render
      // list that is called on initialization
      // otherwise add it to the draw list that will
      // be drawed on each frame
      if ( !h.isDelta( o[key] ) && !TWEEN_PROPERTIES[key] ) {
        this._parseOption( key, o[key] );
        if ( key === 'el' ) {
          this._props.el = h.parseEl( o.el );
          this.el = this._props.el;
        }
        if ( isInclude && ! isCustom ) { this._renderProps.push( key ); }
      // copy delta prop but not transforms
      // otherwise push it to draw list that gets traversed on every draw
      } else if ( isInclude && !isCustom ) { this._drawProps.push( key ); }
    }

    this._createDeltas( o );
  }
  /*
    Method to save customProperties to _customProps.
    @param {Object} Options of the module.
  */
  _saveCustomProperties ( o = {} ) {
    this._customProps = o.customProperties || {};
    this._customProps = { ...this._customProps };
    this._customDraw  = this._customProps.draw;
    delete this._customProps.draw;
    delete o.customProperties;

    this._copyDefaultCustomProps();
    
    // if ( this._customProps ) {}
    // this._customProps = this._customProps || {};
  }

  _copyDefaultCustomProps () {
    for (let key in this._customProps) {
      if (this._o[key] == null) {
        this._o[key] = this._customProps[key];
      }
    }
  }
  /*
    Method to reset some flags on merged options object.
    @private
    @overrides @ Thenable
    @param   {Object} Options object.
    @returns {Object} Options object.
  */
  _resetMergedFlags ( o ) {
    super._resetMergedFlags( o );
    o.props = this._props;
    o.customProperties = this._customProps;
    return o;
  }
  /*
    Method to parse option value.
    @private
    @param {String} Option name.
    @param {Any} Option value.
  */
  _parseOption ( key, value ) {
    super._parseOption( key, value );
    // at this point the property is parsed
    var parsed = this._props[key];
    // cast it to string if it is array
    if ( h.isArray(parsed) ) {
      this._props[key] = this._arrToString(parsed);
    }
  }
  /*
    Method cast array to string value.
    @private
    @param {Array} Array of parsed numbers with units.
    @returns {String} Casted array.
  */
  _arrToString (arr) {
    var string = '';
    for (var i = 0; i < arr.length; i++) {
      string += `${arr[i].string} `;
    }
    return string;
  }
  /*
    Method to add defauls to passed object.
    @private
    @param {Object} Object to add defaults to.
  */
  _addDefaults (obj) {
    // flag that after all defaults are set will indicate
    // if user have set the 3d transform
    this._is3d = false;

    for (var key in this._defaults) {
      // skip property if it is listed in _skipProps
      // if (this._skipProps && this._skipProps[key]) { continue; }

      // copy the properties to the _o object
      // if it's null - set the default value
      if ( obj[key] == null ) {
        // scaleX and scaleY should fallback to scale
        if ( key === 'scaleX' || key === 'scaleY' ) {
          obj[key] = (obj['scale'] != null)
            ? obj['scale'] : this._defaults['scale'];
        } else { obj[key] = this._defaults[key]; }
      } else {
        // get if 3d property was set.
        if ( this._3dProperties.indexOf( key ) !== -1 ) { this._is3d = true }
      }
    }

    if (this._o.isForce3d) { this._is3d = true; }

    return obj;
  }
  /*
    Lifecycle method to declare variables.
    @private
  */
  _vars () {
    // set deltas to the last value, so the _props with
    // end values will be copied to the _history, it is
    // crucial for `then` chaining
    this.deltas.refresh(false);
    // call super vars
    super._vars();
    // state of set properties
    this._state = {};
    // restore delta values that we have refreshed before
    this.deltas.restore(false);
  }
  /*
    Method to create deltas from passed object.
    @private
    @param {Object} Options object to pass to the Deltas.
  */
  _createDeltas (options) {
    this.deltas = new Deltas({
      options,
      props:             this._props,
      arrayPropertyMap:  this._arrayPropertyMap,
      numberPropertyMap: this._numberPropertyMap,
      customProps:       this._customProps,
      callbacksContext:  options.callbacksContext || this,
      isChained:         !!this._o.prevChainModule
    });

    // if chained module set timeline to deltas' timeline 
    if ( this._o.prevChainModule ) {
      this.timeline = this.deltas.timeline;
    }
  }
  /* @overrides @ Tweenable */
  _makeTween () {}
  _makeTimeline () {
    // do not create timeline if module if chained
    if ( this._o.prevChainModule ) { return; }
    // add callbacks overrides
    this._o.timeline = this._o.timeline || {};
    this._addCallbackOverrides( this._o.timeline );
    super._makeTimeline();
    this.timeline.add( this.deltas );
  }
  /*
    Method to add callback overrides to passed object object.
    @param {Object} Object to add overrides on.
  */
  _addCallbackOverrides (o) {
    var it = this;
    var p = this._props;
    o.callbackOverrides = {
      onUpdate:  this._draw,
      onRefresh: (this._props.isRefreshState) ? this._draw : void 0,
      onStart: function (isFwd) {
        // don't touch main `el` onStart in chained elements
        if ( it._isChained ) { return };
        // show if was hidden at start
        if ( isFwd && !p.isShowStart) { it._show(); }
        // hide if should be hidden at start
        else { if ( !p.isShowStart ) { it._hide(); } }
      },
      onComplete: function (isFwd) {
        // don't touch main `el` if not the last in `then` chain
        if ( it._isChained ) { return; }
        if ( isFwd ) { if ( !p.isShowEnd ) { it._hide(); } }
        else if (!p.isShowEnd) { it._show(); }
      }
    }
  }

  /*
    Method that gets called on `soft` show of the module,
    it should restore transform styles of the module.
    @private
    @overrides @ Module
  */
  _showByTransform () { this._drawTransform(); }

  /*
    Method to merge `start` and `end` for a property in then record.
    @private
    @param {String} Property name.
    @param {Any}    Start value of the property.
    @param {Any}    End value of the property.
  */
  // !! COVER !!
  _mergeThenProperty ( key, startValue, endValue ) {
    // if isnt tween property
    var isBoolean = typeof endValue === 'boolean',
        curve, easing;
        
    if ( !h.isTweenProp(key) && !this._nonMergeProps[key] && !isBoolean ) {

      const TWEEN_PROPS = {};
      if ( h.isObject( endValue ) && endValue.to != null ) {
        for (let key in endValue ) {
          if ( TWEEN_PROPERTIES[key] || key === 'curve' ) {
            TWEEN_PROPS[key] = endValue[key];
            delete endValue[key];
          }
        }
        // curve    = endValue.curve;
        // easing   = endValue.easing;
        endValue = endValue.to;
      }

      // if end value is delta - just save it
      if ( this._isDelta(endValue) ) {

        const TWEEN_PROPS = {};
        for (let key in endValue ) {
          if ( TWEEN_PROPERTIES[key] || key === 'curve' ) {
            TWEEN_PROPS[key] = endValue[key];
            delete endValue[key];
          }
        }
        var result = this._parseDeltaValues(key, endValue);

        return { ...result, ...TWEEN_PROPS };
      } else {
        var parsedEndValue = this._parsePreArrayProperty(key, endValue);
        // if end value is not delta - merge with start value
        if ( this._isDelta(startValue) ) {
          // if start value is delta - take the end value
          // as start value of the new delta
          return {
            [ h.getDeltaEnd(startValue) ]: parsedEndValue, ...TWEEN_PROPS
          };
        // if both start and end value are not ∆ - make ∆
        } else { return { [ startValue ]: parsedEndValue, ...TWEEN_PROPS }; }
      }
    // copy the tween values unattended
    } else { return endValue; }
  }
}

export default Html;
