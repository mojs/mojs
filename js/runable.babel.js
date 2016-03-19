
import h        from './h';
import Thenable from './thenable';

class Runable extends Thenable {
  /*
    Method to start the animation with optional new options.
    @public
    @param {Object} New options to set on the run.
    @returns {Object} this.
  */
  change (o) {
    // if options object was passed
    if (o && Object.keys(o).length) {
      this._transformHistory(o);
      this._tuneNewOptions(o);
      this._history[0] = h.extend( h.cloneObj(this._o), this._defaults )
      this._tuneSubModules();
      this._resetTweens();
    }
    return this;
  }
  /*
    Method to transform history rewrite new options object chain on run.
    @param {Object} New options to tune for.
  */
  _transformHistory ( o ) {
    var optionsKeys = Object.keys(o);

    for (var i = 0; i < optionsKeys.length; i++ ) {
      var optionsKey   = optionsKeys[i],
          optionsValue = o[optionsKey];

      this._transformHistoryFor( optionsKey, optionsValue );
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
    @returns {Boolean} Returns true if no further
                       history modifications is needed.
  */
  _transformHistoryRecord ( index, key, newValue ) {
    if (newValue == null ) { return null; }

    var currRecord = this._history[index],
        prevRecord = this._history[index-1],
        nextRecord = this._history[index+1],
        oldValue   = currRecord[key];

    // if index is 0 - always save the newValue
    // and return non-delta for subsequent modifications
    if ( index === 0 ) {
      currRecord[key] = newValue;
      if ( this._isDelta(newValue) ) { return h.getDeltaEnd(newValue); }
      else {

        // !h.isTweenProp(key)

        var isNextRecord = ( nextRecord && (nextRecord[key] === oldValue) ),
            isNextDelta  = ( nextRecord && (this._isDelta(nextRecord[key])) );

        return ( isNextRecord || isNextDelta ) ? newValue : null;
      }
    } else {
      // if was delta and came none-deltta - rewrite
      // the start of the delta and stop
      if ( this._isDelta( oldValue ) ) {
        currRecord[key] = { [newValue] : h.getDeltaEnd(oldValue) };
        return null;
      } else {
        // if the old value is not delta and the new one is
        currRecord[key] = newValue;
        // if the next item has the same value - return the
        // item for subsequent modifications or stop
        return ( nextRecord && nextRecord[key] === oldValue )
          ? newValue : null;
      }
    }

  }
  /*
    Method to tune new history options to all the submodules.
    @private
  */
  _tuneSubModules () {
    for ( var i = 1; i < this._modules.length; i++ ) {
      var module = this._modules[i];
      module._tuneNewOptions( this._history[i] );
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

    for (var i = 0; i < tweens.length; i++ ) {
      var tween     = tweens[i],
          prevTween = tweens[i-1];

      shift += (prevTween) ? prevTween._props.repeatTime : 0;
      this._resetTween( tween, this._history[i], shift );
    }
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


export default Runable;