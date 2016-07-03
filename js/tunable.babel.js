
import h        from './h';
import Thenable from './thenable';

class Tuneable extends Thenable {
  /*
    Method to start the animation with optional new options.
    @public
    @param {Object} New options to set on the run.
    @returns {Object} this.
  */
  tune (o) {
    // if options object was passed
    if (o && Object.keys(o).length) {
      this._transformHistory(o);
      this._tuneNewOptions(o);
      // restore array prop values because _props
      // contain them as parsed arrays
      // but we need the as strings to store in history
      // and merge in history chains
      this._history[0] = h.cloneObj(this._props);
      for (var key in this._arrayPropertyMap) {
        if (o[key] != null) {
          this._history[0][key] = this._preparsePropValue(key, o[key]);
        }
      }

      this._tuneSubModules();
      this._resetTweens();
    }
    return this;
  }
  /*
    Method to regenerate all the random properties form initial object.
    @public
    @returns this.
  */
  generate () {
    return this.tune( this._o );
  }

  // ^ PUBLIC  METHOD(S) ^
  // v PRIVATE METHOD(S) v

  /*
    Method to preparse options in object.
    @private
    @param {Object} Object to preparse properties on.
    @returns {Object} Passed object with preparsed props.
  */
  // _preParseOptions ( o ) {
  //   for (var key in o) {
  //     o[key] = this._preparsePropValue( key, o[key] );
  //   }
  //   return o;
  // }
  /*
    Method to transform history rewrite new options object chain on run.
    @private
    @param {Object} New options to tune for.
  */
  _transformHistory ( o ) {
    for (var key in o) {
      var value = o[key];
      // don't transform for childOptions
      // if ( key === 'childOptions' ) { continue; }
      this._transformHistoryFor( key, this._preparsePropValue( key, value ) );
    }
  }
  /*
    Method to transform history chain for specific key/value.
    @param {String} Name of the property to transform history for.
    @param {Any} The new property's value.
  */
  _transformHistoryFor ( key, value ) {
    for (var i = 0; i < this._history.length; i++ ) {
      if ( value = this._transformHistoryRecord( i, key, value ) ) {
        // break if no further history modifications needed
        if ( value == null ) { break; }
      }
    }
  }
  /*
    Method to transform history recod with key/value.
    @param {Number} Index of the history record to transform.
    @param {String} Property name to transform.
    @param {Any} Property value to transform to.
    @param {Object} Optional the current history record.
    @param {Object} Optional the next history record.
    @returns {Boolean} Returns true if no further
                       history modifications is needed.
  */
  _transformHistoryRecord ( index, key, newVal, currRecord, nextRecord ) {
    // newVal = this._parseProperty( key, newVal );
    if (newVal == null ) { return null; }

    // fallback to history records, if wasn't specified
    currRecord = (currRecord == null) ? this._history[index]   : currRecord;
    nextRecord = (nextRecord == null) ? this._history[index+1] : nextRecord;
    
    var oldVal  = currRecord[key],
        nextVal = (nextRecord == null) ? null : nextRecord[key];

    // if index is 0 - always save the newVal
    // and return non-delta for subsequent modifications
    if ( index === 0 ) {
      currRecord[key] = newVal;
      // always return on tween properties
      if ( h.isTweenProp(key) && key !== 'duration' ) { return null; }
      // nontween properties
      var isRewriteNext = this._isRewriteNext(oldVal, nextVal),
          returnVal = (this._isDelta(newVal)) ? h.getDeltaEnd(newVal) : newVal;
      return ( isRewriteNext ) ? returnVal : null;
    } else {
      // if was delta and came none-deltta - rewrite
      // the start of the delta and stop
      if ( this._isDelta( oldVal ) ) {
        currRecord[key] = { [newVal] : h.getDeltaEnd(oldVal) };
        return null;
      } else {
        // if the old value is not delta and the new one is
        currRecord[key] = newVal;
        // if the next item has the same value - return the
        // item for subsequent modifications or stop
        return ( this._isRewriteNext(oldVal, nextVal) ) ? newVal : null;
      }
    }
  }
  /*
    Method to check if the next item should
    be rewrited in transform history operation.
    @private
    @param {Any} Current value.
    @param {Any} Next value.
    @returns {Boolean} If need to rewrite the next value.
  */
  _isRewriteNext ( currVal, nextVal ) {
    // return false if nothing to rewrite next
    if (nextVal == null && currVal != null) { return false; }

    var isEqual      = (currVal === nextVal),
        isNextDelta  = this._isDelta(nextVal),
        isDelta      = this._isDelta(currVal),
        isValueDeltaChain = false,
        isDeltaChain = false;

    if ( isDelta && isNextDelta ) {
      if ( h.getDeltaEnd(currVal) == h.getDeltaStart(nextVal) ) {
        isDeltaChain = true;
      }
    } else if ( isNextDelta ) {
      isValueDeltaChain = h.getDeltaStart(nextVal) === `${currVal}`;
    }
    
    return isEqual || isValueDeltaChain || isDeltaChain;
  }
  /*
    Method to tune new history options to all the submodules.
    @private
  */
  _tuneSubModules () {
    for ( var i = 1; i < this._modules.length; i++ ) {
      this._modules[i]._tuneNewOptions( this._history[i] );
    }
  }
  /*
    Method to set new options on run.
    @param {Boolean} If foreign context.
    @private
  */
  _resetTweens () {
    var i      = 0,
        shift  = 0,
        tweens = this.timeline._timelines;

    // if `isTimelineLess` return
    if ( tweens == null ) { return; }

    for (var i = 0; i < tweens.length; i++ ) {
      var tween     = tweens[i],
          prevTween = tweens[i-1];

      shift += (prevTween) ? prevTween._props.repeatTime : 0;
      this._resetTween( tween, this._history[i], shift );
    }
    this.timeline._setProp( this._props.timeline );
    this.timeline._recalcTotalDuration();
  }
  /*
    Method to reset tween with new options.
    @param {Object} Tween to reset.
    @param {Object} Tween's to reset tween with.
    @param {Number} Optional number to shift tween start time.
  */
  _resetTween ( tween, o, shift = 0 ) {
    o.shiftTime = shift; tween._setProp( o );
  }
}


export default Tuneable;