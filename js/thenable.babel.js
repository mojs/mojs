import Tweenable from './tween/tweenable';
import h from './h';

/*
  The Thenable class adds .then public method and
  the ability to chain API calls.
*/
class Thenable extends Tweenable {
  /*
    Method to create a then record for the module.
    @public
    @param    {Object} Options for the next animation.
    @returns  {Object} this.
  */
  then ( o ) {
    // return if nothing was passed
    if ((o == null) || !Object.keys(o)) { return 1; }
    // merge then options with the current ones
    var prevRecord = this._history[ this._history.length - 1 ],
        prevModule = this._modules[ this._modules.length - 1 ],
        merged     = this._mergeThenOptions( prevRecord, o );

    this._resetMergedFlags( merged );
    // reset isShowEnd flag on prev module
    prevModule._setProp && prevModule._setProp('isShowEnd', false);

    // create a submodule of the same type as the master module
    var module  = new this.constructor( merged );
    // save the modules to the _modules array
    this._modules.push( module );
    // add module's tween to master timeline
    this.timeline.append( module.tween );
    return this;
  }
  /*
    Method to reset some flags on merged options object.
    @param   {Object} Options object.
    @returns {Object} Options object.
  */
  _resetMergedFlags (obj) {
    // set the submodule to be without timeline for perf reasons
    obj.isTimelineLess = true;
    // reset isShowStart flag for the submodules
    obj.isShowStart    = false;
    // set the submodule callbacks context
    obj.callbacksContext = this;
    return obj;
  }
  /*
    Method to initialize properties.
    @private
  */
  _vars () {
    // we are expect that the _o object
    // have been already extended by defaults
    this._history = [ h.cloneObj(this._o) ];
    // the array holds all modules in the then chain
    this._modules = [ this ];
    // the props that to exclude from then merge
    this._nonMergeProps = { shape: 1 };
  }
  /*
    Method to merge two options into one. Used in .then chains.
    @private
    @param {Object} Start options for the merge.
    @param {Object} End options for the merge.
    @returns {Object} Merged options.
  */
  _mergeThenOptions ( start, end ) {
    var o = {};
    this._mergeStartLoop( o, start );
    this._mergeEndLoop( o, start, end );
    this._history.push(o);
    return o;
  }
  /*
    Originally part of the _mergeThenOptions.
    Loops thru start object and copies all the props from it.
    @param {Object} An object to copy in.
    @parma {Object} Start options object.
  */
  _mergeStartLoop ( o, start ) {
    // loop thru start options object
    for (var key in start) {
      var value = start[key];
      if ( start[key] == null ) { continue };
      // copy all values from start if not tween prop or duration
      if ( !h.isTweenProp(key) || key === 'duration' ) {
        // if delta - copy only the end value
        if ( this._isDelta(value) ) { o[key] = h.getDeltaEnd(value); }
        else { o[key] = value; }
      }
    }

  }
  /*
    Originally part of the _mergeThenOptions.
    Loops thru start object and copies all the props from it.
    @param {Object} An object to copy in.
    @parma {Object} Start options object.
    @parma {Object} End options object.
  */
  _mergeEndLoop ( o, start, end ) {
    var endKeys = Object.keys(end);

    for (var endP in end) {
      // get key/value of the end object
      // endKey - name of the property, endValue - value of the property
      var endValue   = end[endP],
          startValue = ( start[endP] != null )
            ? start[endP] : this._defaults[endP];
      if ( endValue == null ) { continue };
      // make ∆ of start -> end
      // if key name is radiusX/radiusY and
      // the startValue is not set fallback to radius value
      var  isSubRadius = (endP === 'radiusX' || endP === 'radiusY');
      if ( isSubRadius && startValue == null ) {
        startValue = start.radius;
      }
      // if isnt tween property
      if ( !h.isTweenProp(endP) && !this._nonMergeProps[endP] ) {
        // if end value is delta - just save it
        if ( this._isDelta(endValue) ) { o[endP] = endValue; }
        else {
          // if end value is not delta - merge with start value
          if ( this._isDelta(startValue) ) {
            // if start value is delta - take the end value
            // as start value of the new delta
            o[endP] = { [ h.getDeltaEnd(startValue) ] : endValue };
          // if start value is not delta - make delta
          } else { o[endP] = { [ startValue ] : endValue }; }
        }
      // copy the tween values unattended
      } else { o[endP] = endValue; }
    }
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

}

export default Thenable;