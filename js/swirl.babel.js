
import Transit from './transit';
import h from './h';

class Swirl extends Transit {
  /*
    Method to declare _defaults and other default objects.
    @private
    @override @ Transit
  */
  _declareDefaults () {
    super._declareDefaults();
    
    this._defaults.swirlSize      = 10;
    this._defaults.swirlFrequency = 3;
    this._defaults.isSwirl        = true;
    this._defaults.radiusScale    = 1;
  }
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
        angle = 90 + Math.atan((y.delta/x.delta) || 0)*(180/Math.PI);

    this._positionDelta = {
      radius: Math.sqrt(x.delta*x.delta + y.delta*y.delta),
      angle: (x.delta < 0) ? angle + 180 : angle,
      x, y
    }

    this._props.signRand = Math.round(h.rand(0, 1)) ? -1 : 1;
  }
  /*

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
    var p     = this._props,
        o     = this._o,
        angle = this._positionDelta.angle, // + this._props.angleShift
        point = h.getRadialPoint({
          angle:  (p.isSwirl) ? angle + this._getSwirl(proc) : angle,
          radius: proc*this._positionDelta.radius*p.radiusScale,
          center: {
            x: this._positionDelta.x.start,
            y: this._positionDelta.y.start
          }
        });

    // if foreign svg canvas - set position without units
    var x = point.x, y = point.y;
    p.x = ( o.ctx ) ? x : x+this._positionDelta.x.units;
    p.y = ( o.ctx ) ? y : y+this._positionDelta.y.units;

    super._setProgress(proc);
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
