
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

    /* _DEFAULTS ARE - TRANSIT DEFAULTS + THESE: */
    
    /* [boolean] :: If shape should follow sinusoidal path. */
    this._defaults.isSwirl        = true;
    /* ∆ :: [number > 0] :: Degree size of the sinusoidal path. */
    this._defaults.swirlSize      = 10;
    /* ∆ :: [number > 0] :: Frequency of the sinusoidal path. */
    this._defaults.swirlFrequency = 3;
    /* ∆ :: [number > 0] :: Sinusoidal path length scale. */
    this._defaults.pathScale      = 1;
    /* ∆ :: [number] :: Degree shift for the sinusoidal path. */
    this._defaults.degreeShift    = 0;
    /* ∆ :: [number] :: Radius of the shape. */
    this._defaults.radius         = { 5 : 0};
    /* [number: -1, 1] :: Directon of Swirl. */
    this._defaults.direction      = 1;
    /* technical ones: */
    /* [boolean] :: If should have child shape. */
    this._defaults.isWithShape    = true;
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
    this._calcPosData();
  }
  /*
    Method to tune new oprions to _o and _props object.
    @private
    @overrides @ Module
    @param {Object} Options object to tune to.
  */
  _tuneNewOptions (o) {
    if ( o == null ) { return }
      
    super._tuneNewOptions( o );
    if ( o.x != null || o.y != null ) {
      this._calcPosData();
    }
  }
  /*
    Method to calculate Swirl's position data.
    @private
  */
  _calcPosData () {
    var x     = this._getPosValue('x'),
        y     = this._getPosValue('y'),
        angle = (90 + Math.atan((y.delta/x.delta) || 0)*h.RAD_TO_DEG);

    this._posData = {
      radius: Math.sqrt(x.delta*x.delta + y.delta*y.delta),
      angle: (x.delta < 0) ? angle + 180 : angle,
      x, y
    }
    // set the last position to _props
    // this._calcSwirlXY( 1 );
  }
  /*
    Gets `x` or `y` position value.
    @private
    @param {String} Name of the property.
  */
  _getPosValue (name) {
    var delta = this._deltas[name];
    if ( delta ) {
      // delete from deltas to prevent normal
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
    this._calcSwirlXY( proc );
    this._calcOrigin();
    this._draw(proc);
  }
  /*
    Method to calculate x/y for Swirl's progress
    @private
    @mutates _props
    @param {Number} Current progress in [0...1]
  */
  _calcSwirlXY (proc) {
    var p     = this._props,
        angle = this._posData.angle + p.degreeShift,
        point = h.getRadialPoint({
          angle:  (p.isSwirl) ? angle + this._getSwirl(proc) : angle,
          radius: proc*this._posData.radius*p.pathScale,
          center: {
            x: this._posData.x.start,
            y: this._posData.y.start
          }
        });

    // if foreign svg canvas - set position without units
    var x = point.x, y = point.y;
    p.x = ( this._o.ctx ) ? x : x+this._posData.x.units;
    p.y = ( this._o.ctx ) ? y : y+this._posData.y.units;
  }
  /*
    Method to get progress of the swirl.
    @private
    @param {Number} Progress of the Swirl.
    @returns {Number} Progress of the swirl.
  */
  _getSwirl (proc) {
    var p = this._props;
    return p.direction * p.swirlSize * Math.sin(p.swirlFrequency*proc);
  }
  /*
    Method to draw shape.
    If !isWithShape - draw self el only, but not shape.
    @private
    @overrides @ Transit.
  */
  _draw () {
    // call _draw or just _drawEl @ Transit depending if there is `shape`
    Transit.prototype[( this._props.isWithShape ) ? '_draw' : '_drawEl']();
  }
}

export default Swirl;
