const h = require('../h');
import Tween from '../tween/tween';

class Delta {

  constructor ( o = {} ) {
    this._o = o;
    this._createTween( o.tweenOptions );
    // initial properties render
    !this._o.isChained && this.refresh( true );
  }
  /*
    Method to call `_refresh` method on `tween`.
    Use switch between `0` and `1` progress for delta value.
    @public
    @param {Boolean} If refresh before start time or after.
    @returns this.
  */
  refresh (isBefore) {
    this._previousValues = [];

    var deltas = this._o.deltas;
    for (var i = 0; i < deltas.length; i++) {
      var name = deltas[i].name;
      this._previousValues.push({
        name, value: this._o.props[name]
      })      
    }

    this.tween._refresh( isBefore );
    return this;
  }
  /*
    Method to restore all saved properties from `_previousValues` array.
    @public
    @returns this.
  */
  restore () {
    var prev = this._previousValues;
    for (var i = 0; i < prev.length; i++) {
      const record = prev[i];
      this._o.props[record.name] = record.value;
    }
    return this;
  }
  /*
    Method to create tween of the delta.
    @private
    @param {Object} Options object.
  */
  _createTween ( o = {} ) {
    var it = this;
    o.callbackOverrides = {
      onUpdate (ep, p) { it._calcCurrentProps( ep, p ); },
    }
    
    // if not chained - add the onRefresh callback
    // to refresh the tween when needed
    if ( !this._o.isChained ) {
      o.callbackOverrides.onRefresh = function (isBefore, ep, p) {
        it._calcCurrentProps( ep, p );
      }
    }

    o.callbacksContext = this._o.callbacksContext;
    this.tween = new Tween( o );
  }
  /*
    Method to calculate current progress of the deltas.
    @private
    @param {Number} Eased progress to calculate - [0..1].
    @param {Number} Progress to calculate - [0..1].
  */
  _calcCurrentProps ( easedProgress, p ) {
    var deltas = this._o.deltas;
    for (var i = 0; i < deltas.length; i++) {
      var type = deltas[i].type;
      this[`_calcCurrent_${type}`]( deltas[i], easedProgress, p );
    }
  }
  /*
    Method to calc the current color delta value.
    @param {Object} Delta
    @param {Number} Eased progress [0..1].
    @param {Number} Plain progress [0..1].
  */
  _calcCurrent_color (delta, ep, p) {
    var r, g, b, a,
        start = delta.start,
        d     = delta.delta;
    if ( !delta.curve ) {
      r = parseInt(start.r + ep * d.r, 10);
      g = parseInt(start.g + ep * d.g, 10);
      b = parseInt(start.b + ep * d.b, 10);
      a = parseFloat(start.a + ep * d.a);
    } else {
      var cp = delta.curve(p);
      r = parseInt(cp * (start.r + p*d.r), 10);
      g = parseInt(cp * (start.g + p*d.g), 10);
      b = parseInt(cp * (start.b + p*d.b), 10);
      a = parseFloat(cp * (start.a + p*d.a));
    }
    this._o.props[delta.name] = `rgba(${r},${g},${b},${a})`;
  }
  /*
    Method to calc the current number delta value.
    @param {Object} Delta
    @param {Number} Eased progress [0..1].
    @param {Number} Plain progress [0..1].
  */
  _calcCurrent_number (delta, ep, p) {
    this._o.props[delta.name] = (!delta.curve)
          ? delta.start + ep * delta.delta
          : delta.curve(p) * ( delta.start + p * delta.delta );
  }
  /*
    Method to calc the current number with units delta value.
    @param {Object} Delta
    @param {Number} Eased progress [0..1].
    @param {Number} Plain progress [0..1].
  */
  _calcCurrent_unit (delta, ep, p) {
    var currentValue = (!delta.curve)
      ? delta.start.value + ep*delta.delta
      : delta.curve(p) * ( delta.start.value + p * delta.delta );

    this._o.props[delta.name] = `${currentValue}${delta.end.unit}`;
  }
  /*
    Method to calc the current array delta value.
    @param {Object} Delta
    @param {Number} Eased progress [0..1].
    @param {Number} Plain progress [0..1].
  */
  _calcCurrent_array (delta, ep, p) {
    // var arr,
    var name   = delta.name,
        props  = this._o.props,
        string = '';

    // to prevent GC bothering with arrays garbage
    // if ( h.isArray( props[name] ) ) {
    //   arr = props[name];
    //   arr.length = 0;
    // } else { arr = []; }

    // just optimization to prevent curve
    // calculations on every array item
    var proc = (delta.curve) ? delta.curve(p) : null;

    for ( var i = 0; i < delta.delta.length; i++ ) {
      var item = delta.delta[i],
          dash = (!delta.curve)
            ? delta.start[i].value + ep * item.value
            : proc * (delta.start[i].value + p * item.value);

      string += `${dash}${item.unit} `;
      // arr.push({
      //   string: `${dash}${item.unit}`,
      //   value:  dash,
      //   unit:   item.unit,
      // });
    }
    props[name] = string;
  }
}

export default Delta;