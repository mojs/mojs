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
const TWEEN_PROPERTIES = obj._defaults;

class Deltas {
  constructor ( o = {} ) {
    this._o = o;
    this._parseDeltas( o.options );
    this._createDeltas();
    this._createTimeline(o.timeline);
  }
  /*
    Method to create Timeline.
    @private
    @param {Object} Timeline options.
  */
  _createTimeline ( opts = {} ) {
    opts.timeline = opts.timeline || {};
    opts.timeline.callbackOverrides = { onUpdate: this._o.onUpdate }
    this.timeline = new Timeline(opts.timeline);
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
    return new Delta({ deltas, tweenOptions, props: this._o.props });
  }
  /*
    Method to parse delta objects from options.
    @private
    @param {Object} Options object to parse the deltas from.
  */
  _parseDeltas (obj) {
    const mainSplit = this._splitTweenOptions( obj );
    const opts      = mainSplit.delta;
    this._mainTweenOptions = mainSplit.tweenOptions;

    this._mainDeltas  = [];
    this._childDeltas = [];
    const keys = Object.keys( opts );
    // loop thru all properties without tween ones
    for (var i = 0; i < keys.length; i++ ) {
      var key = keys[i];
      // is property is delta - parse it
      if ( this._isDelta( opts[key] ) ) {
        var delta = this._parseDelta( key, opts[key] );
        // if parsed object has no tween values - it's delta of the main object
        if (!delta.tweenOptions) { this._mainDeltas.push( delta.delta ); }
        // otherwise it is distinct delta object
        else { this._childDeltas.push( delta ); }
      }
    }
  }
  /*
    Method to parse single delta record.
    @private
  */
  _parseDelta (name, object) {
    const split = this._splitTweenOptions( object );
    // parse delta in the object
    split.delta = mojs.h.parseDelta( name, split.delta );
    return split;
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
        tweenOptions[key] = delta[key];
        delete delta[key];
        isTween = true;
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
}

export default Deltas;