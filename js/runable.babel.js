
import h        from './h';
import Thenable from './thenable';

class Runable extends Thenable {
  /*
    Method to start the animation with optional new options.
    @public
    @param {Object} New options to set on the run.
    @returns {Object} this.
  */
  run (o) {
    // if options object was passed
    if (o && Object.keys(o).length) {
      this._transformHistory(o);
      this._extendDefaults(o);
      this._resetTweens();
      this._tuneNewOption(o);
      // save to history
      o = h.cloneObj(this._props);
      h.extend(o, this._defaults);
      this._history[0] = o;
    }
    this.stop(); this.play();
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
      if ( this._transformHistoryRecord( i, key, value ) ) {
        break; // break if no further history modifications needed
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
  _transformHistoryRecord ( index, key, value ) {
    var currRecord    = this._history[index],
        prevRecord    = this._history[index-1],
        nextRecord    = this._history[index+1],
        propertyValue = currRecord[key];
    
    if ( this._isDelta(value) ) {
      // if previous history record have been already overriden
      // with the delta, copy only the end property to the start
      if (prevRecord && prevRecord[key] === value) {
        var prevEnd     = h.getDeltaEnd(prevRecord[key]);
        currRecord[key] = { [prevEnd]: h.getDeltaEnd(propertyValue) }
        return true;
      } // else go to very end of this function
    // if new value is delta
    } else {
      // if property value is delta - rewrite it's start
      // and notify parent to stop hitory modifications
      if ( this._isDelta(propertyValue) ) {
        currRecord[key] = { [value] : h.getDeltaEnd(propertyValue) };
        return true;
      // both are not deltas and further in the chain
      } else {
        currRecord[key] = value;
        // if next record isn't delta - we should always override it
        // so do not notify parent
        if (nextRecord && !this._isDelta(nextRecord[key])) {
          // notify that no modifications needed in the next record
          return ( nextRecord[key] !== propertyValue );
        }
      }// else go to very end of this function
    }
    currRecord[key] = value;
  }
  /*
    Method to tune new option on run.
    @private
    @param {Object}  Option to tune on run.
    @param {Boolean} If foreign svg canvas.
  */
  _tuneNewOption (o, isForeign) {
    if ((o != null) && Object.keys(o).length) {
    }
  }
  /*
    Method to set new options on run.
    @param {Boolean} If foreign context.
    @private
  */
  _resetTweens (isForeign) {
    var i      = 0,
        shift  = 0,
        tweens = this.timeline._timelines;

    for (var i = 0; i < tweens.length; i++ ) {
      var tween     = tweens[i],
          prevTween = tweens[i-1];

      shift += (prevTween) ? prevTween._props.repeatTime : 0;
      this._resetTween( tween, this._history[i], shift );
    }
    !isForeign && this.timeline._recalcTotalDuration();
  }
  /*
    Method to reset tween with new options.
    @param {Object} Tween to reset.
    @param {Object} Tween's to reset tween with.
    @param {Number} Optional number to shift tween start time.
  */
  _resetTween ( tween, o, shift = 0 ) {
    o.shiftTime = shift; tween._setProps( o );
  }
}


export default Runable;