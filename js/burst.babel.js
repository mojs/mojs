// import Shape    from './shape';
import Timeline   from './tween/timeline';
import ShapeSwirl from './shape-swirl';
import Tunable    from './tunable';
import h          from './h';

class Burst extends Tunable {
  /*
    Method to declare defaults.
    @override @ ShapeSwirl.
  */
  _declareDefaults () {
    this._defaults = {
      /* [number > 0] :: Quantity of Burst particles. */
      count:    5,
      /* [0 < number < 360] :: Degree of the Burst. */
      degree:   360,
      /* ∆ :: [number > 0] :: Radius of the Burst. */
      radius:   { 0: 50 },
      /* ∆ :: [number > 0] :: X radius of the Burst. */
      radiusX:  null,
      /* ∆ :: [number > 0] :: Y radius of the Burst. */
      radiusY:  null,
      // ∆ :: Possible values: [ number ]
      scale:    1,
      /* [string] :: Easing for the main module (not children). */
      easing:  'linear.none',
      /* [boolean] :: If Burst itself should follow sinusoidal path. */
      isSwirl:  false
    }
  }
  /*
    Method to create a then record for the module.
    @public
    overrides @ Thenable
    @param    {Object} Options for the next animation.
    @returns  {Object} this.
  */
  then ( o ) {
    // remove tween properties (not callbacks)
    this._removeTweenProperties( o );

    var newMaster = this._masterThen( o ),
        newSwirls = this._childThen( o, newMaster );

    this._setSwirlDuration( newMaster, this._calcPackTime(newSwirls) );

    this.timeline._recalcTotalDuration();
    return this;
  }
  /*
    Method to start the animation with optional new options.
    @public
    @param {Object} New options to set on the run.
    @returns {Object} this.
  */
  tune (o) {
    if ( o == null ) { return this; }
    // save timeline options to _timelineOptions
    // and delete the timeline options on o
    // cuz masterSwirl should not get them
    this._saveTimelineOptions( o );

    // add new timeline properties to timeline
    this.timeline._setProp( this._timelineOptions );

    // remove tween options (not callbacks)
    this._removeTweenProperties( o );

    // tune _props
    this._tuneNewOptions( o );

    // tune master swirl
    this.masterSwirl.tune( o );

    // tune child swirls
    this._tuneSwirls( o );

    // recalc time for modules
    this._recalcModulesTime();
    return this;
  }

  // ^ PUBLIC  METHODS ^
  // v PRIVATE METHODS v

  /*
    Method to copy `_o` options to `_props` object
    with fallback to `_defaults`.
    @private
    @overrides @ Module
  */
  _extendDefaults () {
    // remove tween properties (not callbacks)
    this._removeTweenProperties( this._o );
    super._extendDefaults();
  }
  /*
    Method to remove all tween (excluding
    callbacks) props from object.
    @private
    @param {Object} Object which should be cleaned
                    up from tween properties.
  */
  _removeTweenProperties ( o ) {
    for (var key in h.tweenOptionMap) {
      // remove all items that are not declared in _defaults
      if ( this._defaults[key] == null ) {
        delete o[key];
      }
    }
  }
  /*
    Method to recalc modules chain tween
    times after tuning new options.
    @private
  */
  _recalcModulesTime () {
    var modules   = this.masterSwirl._modules,
        swirls    = this._swirls,
        shiftTime = 0;

    for (var i = 0; i < modules.length; i++) {
      var tween    = modules[i].tween,
          packTime = this._calcPackTime( swirls[i] );
      tween._setProp({ 'duration': packTime, 'shiftTime': shiftTime });
      shiftTime += packTime;
    }

    this.timeline._recalcTotalDuration()
  }
  /*
    Method to tune Swirls with new options.
    @private
    @param {Object} New options.
  */
  _tuneSwirls ( o ) {
    // get swirls in first pack
    var pack0 = this._swirls[0];
    for (var i = 0; i < pack0.length; i++ ) {
      var swirl  = pack0[i],
          option = this._getChildOption( o || {}, i );

      this._addBurstProperties( option, i );
      swirl.tune( option );
    }
  }
  /*
    Method to call then on masterSwirl.
    @param {Object} Then options.
    @returns {Object} New master swirl.
  */
  _masterThen (o) {
    this.masterSwirl.then(o);
    // get the latest master swirl in then chain
    var newMasterSwirl = h.getLastItem(this.masterSwirl._modules);
    // save to masterSwirls
    this._masterSwirls.push(newMasterSwirl);
    return newMasterSwirl;
  }
  /*
    Method to call then on child swilrs.
    @param {Object} Then options.
    @param {Object} Current master Swirl.
    @return {Array} Array of new Swirls.
  */
  _childThen (o, newMasterSwirl) {
    var pack    = this._swirls[0],
        newPack = [];

    for (var i = 0; i < pack.length; i++) {
      // get option by modulus
      var options = this._getChildOption( o, i );
      // add new Master Swirl as parent of new childswirl
      options.parent = newMasterSwirl.el;
      pack[i].then( options );
      // save the new item in `then` chain
      newPack.push( h.getLastItem(pack[i]._modules) );
    }
    // save the pack to _swirls object
    this._swirls[this._masterSwirls.length-1] = newPack;
    return newPack;
  }
  /*
    Method to initialize properties.
    @private
    @overrides @ Thenable
  */
  _vars () {
    super._vars();
    // just buffer timeline for calculations
    this._bufferTimeline = new Timeline;
  }
  /*
    Method for initial render of the module.
  */
  _render () {
    this._o.isWithShape      = false;
    this._o.isSwirl          = this._props.isSwirl;
    this._o.callbacksContext = this;
    // save timeline options and remove from _o
    // cuz the master swirl should not get them
    this._saveTimelineOptions( this._o );

    // cover!
    this._o.scale = ( this._o.scale != null ) ? this._o.scale : 1;
    // console.log(this._o.scale)

    this.masterSwirl    = new ShapeSwirl( this._o );
    this._masterSwirls  = [ this.masterSwirl ];
    this.el             = this.masterSwirl.el;

    this._renderSwirls();
  }
  /*
    Method for initial render of swirls.
    @private
  */
  _renderSwirls () {
    var p    = this._props,
        pack = [];

    for ( var i = 0; i < p.count; i++ ) {
      var option = this._getChildOption( this._o, i );

      // !COVER!
      option.scale = option.scale != null ? option.scale : { 1: 0 };
      pack.push( new ShapeSwirl( this._addOptionalProps( option, i ) ));
    }
    this._swirls = { 0: pack };
    this._setSwirlDuration( this.masterSwirl, this._calcPackTime(pack) );
  }
  /*
    Method to save timeline options to _timelineOptions
    and delete the property on the object.
    @private
    @param {Object} The object to save the timeline options from.
  */
  _saveTimelineOptions ( o ) {
    this._timelineOptions = o.timeline;
    delete o.timeline;
  }
  /*
    Method to calculate total time of array of
    concurrent tweens.
    @param   {Array}  Pack to calculate the total time for.
    @returns {Number} Total pack duration.
  */
  _calcPackTime ( pack ) {
    var maxTime = 0;
    for (var i = 0; i < pack.length; i++) {
      var tween = pack[i].tween,
          p     = tween._props;

      maxTime = Math.max( p.repeatTime/p.speed, maxTime );
    }
    return maxTime;
  }
  /*
    Method to set duration for Swirl.
    @param {Object} Swirl instance to set the duration to.
    @param {Number} Duration to set.
  */
  _setSwirlDuration ( swirl, duration ) {
    swirl.tween._setProp( 'duration', duration );
    var isRecalc = swirl.timeline && swirl.timeline._recalcTotalDuration;
    isRecalc && swirl.timeline._recalcTotalDuration();
  }
  /*
    Method to get childOption form object call by modulus.
    @private
    @param   {Object} Object to look in.
    @param   {Number} Index of the current Swirl.
    @returns {Object} Options for the current swirl.
  */
  _getChildOption (obj, i) {
    var options = {};
    for ( var key in obj.childOptions ) {
      options[key] = this._getPropByMod( key, i, obj.childOptions);
    }
    return options;
  }
  /*
    Method to get property by modulus.
    @private
    @param {String} Name of the property.
    @param {Number} Index for the modulus.
    @param {Object} Source object to check in.
    @returns {Any} Property.
  */
  _getPropByMod ( name, index, sourceObj = {} ) {
    var prop = sourceObj[name];
    return h.isArray(prop) ? prop[index % prop.length] : prop;
  }
  /*
    Method to add optional Swirls' properties to passed object.
    @private
    @param {Object} Object to add the properties to.
    @param {Number} Index of the property.
  */
  _addOptionalProps (options, index) {
    options.index   = index;
    options.left    = '50%';
    options.top     = '50%';
    options.parent  = this.masterSwirl.el;
    options.isSwirl = (options.isSwirl == null)
                        ? false : options.isSwirl;

    this._addBurstProperties( options, index );

    return options;
  }
  /*
    Method to add Burst options to object.
    @private
    @param {Object} Options to add the properties to.
    @param {Number} Index of the Swirl.
  */
  _addBurstProperties (options, index) { 
    // save index of the module
    var mainIndex = this._index;
    // temporary change the index to parse index based properties like stagger
    this._index = index;
    // parse degree shift for the bit
    var degreeShift = this._parseProperty('degreeShift', options.degreeShift || 0 );
    // put the index of the module back
    this._index = mainIndex;

    var p           = this._props,
        degreeCnt   = (p.degree % 360 === 0) ? p.count : p.count-1 || 1,
        step        = p.degree/degreeCnt,
        pointStart  = this._getSidePoint('start', index*step + degreeShift ),
        pointEnd    = this._getSidePoint('end',   index*step + degreeShift );

    options.x     = this._getDeltaFromPoints('x', pointStart, pointEnd);
    options.y     = this._getDeltaFromPoints('y', pointStart, pointEnd);
    options.angle = this._getBitAngle( (options.angle || 0) + degreeShift, index );

    // reset degreeeShift which will be send to child swirls since
    // burst controls `x`, `y`, `angle` and `degreeShift` of child swirls
    options.degreeShift = 0;
  }
  /* 
    Method to get shapes angle in burst so
    it will follow circular shape.
     
     @param    {Number, Object} Base angle.
     @param    {Number}         Shape's index in burst.
     @returns  {Number}         Angle in burst.
  */ 
  _getBitAngle ( angleProperty = 0, i ) {
    var p      = this._props,
        degCnt = ( p.degree % 360 === 0 ) ? p.count : p.count-1 || 1,
        step   = p.degree/degCnt,
        angle  = i*step + 90;
    // if not delta option
    if ( !this._isDelta(angleProperty) ) { angleProperty += angle; }
    else {
      var delta = {},
          keys  = Object.keys(angleProperty),
          start = keys[0],
          end   = angleProperty[start];
      
      start = h.parseStringOption(start, i);
      end   = h.parseStringOption(end, i);
      // new start = newEnd
      delta[ parseFloat(start) + angle ] = parseFloat(end) + angle;

      angleProperty = delta;
    }
    return angleProperty;
  }
  /*
    Method to get radial point on `start` or `end`.
    @private
    @param {String} Name of the side - [start, end].
    @param {Number} Angle of the radial point.
    @returns radial point.
  */
  _getSidePoint (side, angle) {
    var p          = this._props,
        sideRadius = this._getSideRadius(side);

    return h.getRadialPoint({
      radius:  sideRadius.radius,
      radiusX: sideRadius.radiusX,
      radiusY: sideRadius.radiusY,
      angle:   angle,
      // center:  { x: p.center, y: p.center }
      center:  { x: 0, y: 0 }
    });
  }
  /*
    Method to get radius of the side.
    @private
    @param {String} Name of the side - [start, end].
    @returns {Object} Radius.
  */
  _getSideRadius ( side ) {
    return {
      radius:  this._getRadiusByKey('radius',  side),
      radiusX: this._getRadiusByKey('radiusX', side),
      radiusY: this._getRadiusByKey('radiusY', side)
    }
  }
  /*
    Method to get radius from ∆ or plain property.
    @private
    @param {String} Key name.
    @param {String} Side name - [start, end].
  */
  _getRadiusByKey (key, side) {
    if ( this._deltas[key] != null ) { return this._deltas[key][side]; }
    else if ( this._props[key] != null ) { return this._props[key]; }
  }
  /*
    Method to get delta from start and end position points.
    @private
    @param {String} Key name.
    @param {Object} Start position point.
    @param {Object} End position point.
    @returns {Object} Delta of the end/start.
  */
  _getDeltaFromPoints (key, pointStart, pointEnd) {
    var delta = {};
    if ( pointStart[key] === pointEnd[key] ) {
      delta = pointStart[key];
    } else { delta[pointStart[key]] = pointEnd[key]; }
    return delta;
  }
  /*
    Method to create timeline.
    @private
    @override @ Tweenable
  */
  _makeTimeline () {
    // restore timeline options that were deleted in _render method
    this._o.timeline = this._timelineOptions;
    super._makeTimeline();
    this.timeline.add( this.masterSwirl, this._swirls[0] );
  }
  /*
    Method to make Tween for the module.
    @private
    @override @ Tweenable
  */
  _makeTween () { /* don't create any tween */ }
}

export default Burst;
