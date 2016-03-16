
import Thenable from './thenable';

class Runable extends Thenable {
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

}


export default Runable;