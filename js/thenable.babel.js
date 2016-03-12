import Tweenable from './tween/tweenable';
import h from './h';

class Thenable extends Tweenable {
  /*
    Method to initialize properties.
    @private
  */
  _vars () {
    // we are expect that the _o object
    // have been already extended by defaults
    this._history = [ h.cloneObj(this._o) ];
  }
  /*
    Method to create a then record for the module.
    @public
    @param    {Object} Options for the next animation.
    @returns  {Object} this.
  */
  then () {
    return this;
  }
}

export default Thenable;