import Transit from './transit';
import Swirl from './swirl';
import h     from './h';

class Burst extends Swirl {
  /*
    Method to declare defaults.
    @override @ Swirl.
  */
  _declareDefaults () {
    // call super @ Swirl
    super._declareDefaults();

    /* CHILD DEFAULTS - SWIRL's DEFAULTS WITH ADDITIONS*/
    // copy the defaults to the childDefaults property
    this._childDefaults = h.cloneObj( this._defaults );
    // modify default radius ∆ of the children
    this._childDefaults.radius   = { 5: 0 };
    // copy tween options and callbacks
    for (var key in h.tweenOptionMap) { this._childDefaults[key] = null; }
    for (var key in h.callbacksMap)   { this._childDefaults[key] = null; }

    /* DEFAULTS - EXTEND SWIRL's BY THE NEXT ONES: */
    // add childOptions property to have it in _extendDefaults loop
    // this._defaults.childOptions = null;
    // Amount of Burst's point: [number > 0]
    this._defaults.count        = 5;
    // Degree for the Burst's points : [0..360]
    this._defaults.degree       = 360;
    // Randomness for the Burst's points fly degree [0...1]
    this._defaults.randomAngle  = 0;
    // Randomness for the Burst's points fly radius [0...1]
    this._defaults.randomRadius = 0;

    // add options intersection hash - map that holds the property
    // names that could be on both parent module and child ones
    this._optionsIntersection = {
      // SWIRL OPTIONS
      radius: 1, radiusX: 1, radiusY: 1, angle:  1, scale: 1, opacity: 1
    }
  }
  /*
    Method to copy _o options to _props with fallback to _defaults.
    @private
    @override @ Swirl
  */
  _extendDefaults () {
    // call super extendDefaults on Swirl
    super._extendDefaults();
    // calc size immedietely, the Swirls' options rely on size
    this._calcSize();
  }
  /*
    Method to create child transits.
    @private
    @override Transit
  */
  _createBit () {
    this._swirls = [];
    for (var index = 0; index < this._props.count; index++) {
      var option = this._getOption( index );
      // this._props.randomAngle  && (option.angleShift  = this._generateRandomAngle())
      // this._props.randomRadius && (option.radiusScale = this._generateRandomRadius())
      this._swirls.push( new Swirl(option) );
    }
  }
  /*
    Method to calculate option for specific transit.
    @private
    @param {Number} Index of the swirl.
  */
  _getOption (i) {
    var option  = {};

    for (var key in this._childDefaults) {
      // this is priorty for the property lookup
      // firstly try to find the prop in this._o.childOptions
      var prop = this._getPropByMod( key, i, this._o.childOptions );
      // if non-intersected option - need to check in _o
      prop = ( prop == null && !this._optionsIntersection[key] )
        ? this._getPropByMod( key, i, this._o ) : prop;
      // lastly fallback to defaults
      prop = ( prop == null )
        ? this._getPropByMod( key, i, this._childDefaults ) : prop;

      prop = h.parseIfStagger(prop, i);
      prop = h.parseIfRand(prop, i);

      option[key] = prop;
    }

    return this._addOptionalProperties( option, i );
  }
  /*
    Method to add optional Swirls' properties to passed object.
    @private
    @param {Object} Object to add the properties to.
    @param {Number} Index of the property.
  */
  _addOptionalProperties (options, index) {
    options.index          = index;
    options.left           = '50%';
    options.top            = '50%';
    options.parent         = this.el;
    options.isTimelineLess = true;
    // option.callbacksContext = this;  ?

    var p          = this._props,
        points     = p.count,
        degreeCnt  = (p.degree % 360 === 0) ? points : points-1 || 1,
        step       = p.degree/degreeCnt,
        pointStart = this._getSidePoint('start', index*step ),
        pointEnd   = this._getSidePoint('end',   index*step );

    options.x = this._getDeltaFromPoints('x', pointStart, pointEnd);
    options.y = this._getDeltaFromPoints('y', pointStart, pointEnd);

    options.angle = this._getBitAngle( options.angle, index );

    return options;
  }
  /* 
    Method to get transits angle in burst so
    it will follow circular shape.
     
     @param    {Number, Object} Base angle.
     @param    {Number}         Transit's index in burst.
     @returns  {Number}         Angle in burst.
  */ 
  _getBitAngle (angle, i) {
    var p = this._props,
        points = p.count,
        degCnt = ( p.degree % 360 === 0 ) ? points : points-1 || 1,
        step = p.degree/degCnt,
        angleAddition = i*step + 90;
    // if not delta option
    if ( !this._isDelta(angle) ) { angle += angleAddition; }
    else {
      var keys  = Object.keys(angle),
          start = keys[0],
          end   = angle[start],
          curAngleShift   = angleAddition,
          newStart        = parseFloat(start) + curAngleShift,
          newEnd          = parseFloat(end)   + curAngleShift,
          delta           = {};
          delta[newStart] = newEnd;
      angle = delta;
    }
    return angle;
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
      center:  { x: p.center, y: p.center }
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
    Method to get property by modulus.
    @private
    @param {String} Name of the property.
    @param {Number} Index for the modulus.
    @param {Object} Source object to check in.
    @returns {Any} Property.
  */
  _getPropByMod ( name, index, sourceObj = {} ) {
    var prop   = sourceObj[name];
    return h.isArray(prop) ? prop[index % prop.length] : prop;
  }
  /*
    Method to draw self DIV element.
    @private
    @override @ Transit
  */
  _draw () { this._drawEl(); }
  /*
    Method to calculate maximum size of element.
    @private
    @override @ Transit
  */
  _calcSize () {
    var p = this._props;
    p.size   = ( p.size == null ) ? 2 : p.size;
    p.center = p.size / 2;
  }
  /*
    Method to setup  timeline options before creating the Timeline instance.
    @override @ Transit
    @private
  */
  _transformTweenOptions () {
    this._o.timeline = this._o.timeline || {};
    this._applyCallbackOverrides( this._o.timeline );
  }
  /*
    Method to create timeline.
    @private
    @override @ Tweenable
    @param {Object} Timeline's options.
                    An object which contains "timeline" property with
                    timeline options.
  */
  _makeTimeline () {
    super._makeTimeline();
    this.timeline.add( ...this._swirls );
  }
  /*
    Method to make Tween for the module.
    @private
    @override @ Tweenable
  */
  _makeTween () { /* don't create any tween */ }

  // /*
  //   Method to populate each transit with dedicated option.
  //   @private
  // */
  // _addBitOptions () {
  //   var points = this._props.count;
  //   this.degreeCnt = (this._props.degree % 360 === 0)
  //     ? points
  //     : points-1 || 1;
    
  //   var step = this._props.degree/this.degreeCnt;
  //   for (var i = 0; i < this._swirls.length; i++) {
  //     var transit    = this._swirls[i],
  //         aShift     = transit._props.angleShift || 0,
  //         pointStart = this._getSidePoint('start', i*step + aShift),
  //         pointEnd   = this._getSidePoint('end',   i*step + aShift);

  //     transit._o.x = this._getDeltaFromPoints('x', pointStart, pointEnd);
  //     transit._o.y = this._getDeltaFromPoints('y', pointStart, pointEnd);

  //     if ( !this._props.isResetAngles ) {
  //       transit._o.angle = this._getBitAngle(transit._o.angle, i)
  //     }
  //     transit._extendDefaults()
  //   }
  // }
  // /*
  //   Method to calculate module's size.
  //   @private
  //   @override Transit.
  // */
  // _calcSize () {
  //   var largestSize = -1;
  //   for (var i = 0; i < this._swirls.length; i++) {
  //     var transit = this._swirls[i];
  //     transit._calcSize();
  //     if (largestSize < transit._props.size) {
  //       largestSize = transit._props.size;
  //     }
  //   }
  //   var radius = this._calcMaxShapeRadius();
  //   this._props.size   = largestSize + 2*radius;
  //   this._props.size   += 2*this._props.sizeGap;
  //   this._props.center = this._props.size/2;
  //   this._addBitOptions()
  // }
  // /*
  //   Method to draw the burst.
  //   @private
  //   @override Transit.
  // */
  // _draw () { this._drawEl(); }
  // /*
  //   Method to get if need to update new transform.
  //   @private
  //   @returns {Boolean} If transform update needed.
  // */
  // // _isNeedsTransform () {
  // //   return  this._isPropChanged('x') ||
  // //           this._isPropChanged('y') ||
  // //           this._isPropChanged('angle');
  // // }
  // /*
  //   Method to generate random angle.
  //   @private
  //   @returns {Number} Rundom angle.
  // */
  // _generateRandomAngle ( ) {
  //   var randomness = parseFloat(this._props.randomAngle);
  //   if ( randomness > 1 ) { randdomness = 1 }
  //   else if ( randomness < 0 ) { randdomness = 0 }
  //   return h.rand(0, ( randomness ) ? randomness*360 : 180);
  // }
  // /*
  //   Method to get random radius.
  //   @private
  //   @returns {Number} Random radius.
  // */
  // _generateRandomRadius () {
  //   var randomness = parseFloat(this._props.randomRadius);
  //   if ( randomness > 1 ) { randdomness = 1; }
  //   else if ( randomness < 0 ) { randdomness = 0; }
  //   var start = ( randomness ) ? (1-randomness)*100 : (1-.5)*100;
  //   return h.rand(start, 100)/100;
  // }
  // createTween () {
  //   super.createTween();
  //   var i = this._swirls.length;
  //   while(i--) { this.timeline.add(this._swirls[i].tween); }
  // }
  /*
    Method to run tween with new options.
    @public
    @param {Object} New options object.
    @returns {Object} this.
  */
  // run ( o ) {
  //   if ( o != null && Object.keys(o).length) {
  //     if ( o.count || ( o.childOptions && o.childOptions.count )) {
  //       h.warn('Sorry, count can not be changed on run');
  //     }
  //     this._extendDefaults(o);
  //     // copy child options to options
  //     var keys = Object.keys(o.childOptions || {});
      
  //     if ( this._o.childOptions == null ) { this._o.childOptions = {}; }

  //     for (var i = 0; i < keys.length; i++) {
  //       var key = keys[i];
  //       this._o.childOptions[key] = o.childOptions[key];
  //     }
  //     // tune transits
  //     var len = this._swirls.length;
  //     while(len--) {
  //       // we should keep transit's angle otherwise
  //       // it will fallback to default 0 value
  //       var option = this._getOption(len),
  //           ref;

  //       if ( (((ref = o.childOptions) != null ? ref.angle : void 0) == null) && ( o.angleShift == null ) ) {
  //         option.angle = this._swirls[len]._o.angle;
  //       }
  //       // calculate bit angle if new angle related option passed
  //       // and not isResetAngles
  //       else if ( !o.isResetAngles ) {
  //         option.angle = this._getBitAngle(option.angle, len);
  //       }
  //       this._swirls[len]._tuneNewOption(option, true);
  //     }
  //     this.timeline._recalcTotalDuration()
  //   }
  //   if ( this._props.randomAngle || this._props.randomRadius ) {
  //     var len = this._swirls.length;
  //     while(len--) {
  //       var tr = this._swirls[len];
  //       this._props.randomAngle  && tr._setProp({angleShift:  this._generateRandomAngle()});
  //       this._props.randomRadius && tr._setProp({radiusScale: this._generateRandomRadius()})
  //     }
  //   }
  //   this.play();
  //   return this;
  // }
  /*
    Method to create then chain record.
    @private
    returns {Object} this.
  */
  // then (o) {
  //   h.error(`Burst's \"then\" method is under consideration,
  //     you can vote for it in github repo issues`);
  //   // 1. merge @o and o
  //   // 2. get i option from merged object
  //   // 3. pass the object to transit then
  //   // 4. transform self chain on run
  //   // i = this._swirls.length
  //   // while(i--) { this._swirls[i].then(o); }
  //   //   
  //   return this;
  // }
}

export default Burst;