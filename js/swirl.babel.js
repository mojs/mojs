
import Transit from './transit';
import h from './h';

/*
  *TODO:*
  ---
  - tweak then chains
*/

class Swirl extends Transit {
  /*
    Method to declare _defaults and other default objects.
    @private
    @override @ Transit
  */
  _declareDefaults () {
    super._declareDefaults();
    // ∆ :: [number > 0]
    this._defaults.swirlSize      = 10;
    // ∆ :: [number > 0]
    this._defaults.swirlFrequency = 3;
    // [boolean]
    this._defaults.isSwirl        = true;
    // ∆ :: [number > 0]
    this._defaults.radiusScale    = 1;
    // ∆ :: [number]
    this._defaults.degreeShift    = 0;
  }

  // ^ PUBLIC  METHOD(S) ^
  // v PRIVATE METHOD(S) v
  
  /*
    Method to copy _o options to _props with
    fallback to _defaults.
    @private
    @override @ Module
  */
  _extendDefaults () {
    super._extendDefaults();

    var p     = this._props,
        x     = this._getPosValue('x'),
        y     = this._getPosValue('y'),
        angle = (90 + Math.atan((y.delta/x.delta) || 0)*h.RAD_TO_DEG);

    this._posData = {
      radius: Math.sqrt(x.delta*x.delta + y.delta*y.delta),
      angle: (x.delta < 0) ? angle + 180 : angle,
      x, y
    }

    p.signRand = Math.round(h.rand(0, 1)) ? -1 : 1;
  }
  /*
    Gets `x` or `y` position value.
    @private
    @param {String} Name of the property.
  */
  _getPosValue (name) {
    if ( this._deltas[name] ) {
      var delta = this._deltas[name];
      // delete from deltas to prevent normal
      // deltas calculation for the property
      delete this._deltas[name];
      return {
        start:  delta.start.value,
        end:    delta.end.value,
        delta:  delta.delta,
        units:  delta.end.unit
      }
    } else {
      var pos = h.parseUnit(this._props[name]);
      return { start: pos.value, end: pos.value, delta: 0, units: pos.unit };
    }
  }
  /*
    Method to calculate the progress of the Swirl.
    @private
    @overrides @ Transit
    @param {Numer} Progress of the Swirl in range of [0..1]
  */
  _setProgress ( proc ) {

    this._progress = proc;
    this._calcCurrentProps(proc);

    var p     = this._props,
        angle = this._posData.angle + p.degreeShift,
        point = h.getRadialPoint({
          angle:  (p.isSwirl) ? angle + this._getSwirl(proc) : angle,
          radius: proc*this._posData.radius*p.radiusScale,
          center: {
            x: this._posData.x.start,
            y: this._posData.y.start
          }
        });

    // if foreign svg canvas - set position without units
    var x = point.x, y = point.y;
    p.x = ( this._o.ctx ) ? x : x+this._posData.x.units;
    p.y = ( this._o.ctx ) ? y : y+this._posData.y.units;

    this._calcOrigin();
    this._draw(proc);
  }
  /*
    Method to get progress of the swirl.
    @private
    @param {Number} Progress of the Swirl.
    @returns {Number} Progress of the swirl.
  */
  _getSwirl (proc) {
    var p = this._props;
    return p.signRand * p.swirlSize * Math.sin(p.swirlFrequency*proc);
  }
}

export default Swirl;
