import Transit from './transit';
var Swirl = require('./swirl');
var h     = require('./h');

class Burst extends Transit {
  /*
    Method to declare defaults.
    @override Transit.
  */
  _declareDefaults () {
    // DEFAULTS / APIs
    this.defaults = {
      // presentation props
      count:              5,
      degree:             360,
      opacity:            1,
      randomAngle:        0,
      randomRadius:       0,
      // position props/el props
      left:               100,
      top:                100,
      x:                  0,
      y:                  0,
      // size props
      radius:             { 25: 75 },
      radiusX:            undefined,
      radiusY:            undefined,
      angle:              0,
      size:               null,
      sizeGap:            0,
      // callbacks
      easing:             'Linear.None',
      duration:           600,
      delay:              0,
      onStart:            null,
      onComplete:         null,
      onCompleteChain:    null,
      onUpdate:           null,
      isResetAngles:      false
    };
    this.childDefaults = {
      //-- intersection starts
      radius:             { 7 : 0 },
      radiusX:            undefined,
      radiusY:            undefined,
      angle:              0,
      opacity:            1,
      // callbacks
      onStart:            null,
      onComplete:         null,
      onUpdate:           null,
      //-- intersection ends
      points:             3,
      duration:           500,
      delay:              0,
      repeat:             0,
      yoyo:               false,
      easing:             'Linear.None',
      shape:              'circle',
      fill:               'deeppink',
      fillOpacity:        1,
      isSwirl:            false,
      swirlSize:          10,
      swirlFrequency:     3,
      stroke:             'transparent',
      strokeWidth:        0,
      strokeOpacity:      1,
      strokeDasharray:    '',
      strokeDashoffset:   '',
      strokeLinecap:      null
    };
    this.skipProps = { childOptions: 1 };
    this.optionsIntersection = {
      radius:     1,
      radiusX:    1,
      radiusY:    1,
      angle:      1,
      opacity:    1,
      onStart:    1,
      onComplete: 1,
      onUpdate:   1
    };
  }
  /*
    Method to create child transits.
    @private
    @override Transit
  */
  _createBit () {
    this.transits = [];
    for (var i = 0; i < this.props.count; i++) {
      var option = this._getOption(i); option.ctx = this.ctx; option.index = i
      // option.isDrawLess = option.isRunLess = option.isTweenLess = true
      option.isDrawLess = true;
      this.props.randomAngle  && (option.angleShift  = this._generateRandomAngle())
      this.props.randomRadius && (option.radiusScale = this._generateRandomRadius())
      this.transits.push(new Swirl(option));
    }
  }
  /*
    Method to populate each transit with dedicated option.
    @private
  */
  _addBitOptions () {
    var points = this.props.count;
    this.degreeCnt = (this.props.degree % 360 === 0)
      ? points
      : points-1 || 1;
    
    var step = this.props.degree/this.degreeCnt;
    for (var i = 0; i < this.transits.length; i++) {
      var transit = this.transits[i];
      var aShift = transit.props.angleShift || 0;
      var pointStart = this._getSidePoint('start', i*step + aShift);
      var pointEnd   = this._getSidePoint('end',   i*step + aShift);

      transit.o.x = this._getDeltaFromPoints('x', pointStart, pointEnd);
      transit.o.y = this._getDeltaFromPoints('y', pointStart, pointEnd);

      if ( !this.props.isResetAngles ) {
        transit.o.angle = this._getBitAngle(transit.o.angle, i)
      }
      transit._extendDefaults()
    }
  }
  /*
    Method to calculate module's size.
    @private
    @override Transit.
  */
  _calcSize () {
    var largestSize = -1;
    for (var i = 0; i < this.transits.length; i++) {
      var transit = this.transits[i];
      transit._calcSize();
      if (largestSize < transit.props.size) {
        largestSize = transit.props.size;
      }
    }
    var radius = this._calcMaxShapeRadius();
    this.props.size   = largestSize + 2*radius;
    this.props.size   += 2*this.props.sizeGap;
    this.props.center = this.props.size/2;
    this._addBitOptions()
  }
  /*
    Method to draw the burst.
    @private
    @override Transit.
  */
  _draw (progress) { this._drawEl(); }
  /*
    Method to calculate option for specific transit.
    @private
    @param {Number} Index of the transit.
  */
  _getOption (i) {
    var option  = {},
        keys    = Object.keys(this.childDefaults),
        len     = keys.length;

    while(len--) {
      var key = keys[len];
      // firstly try to find the prop in this.o.childOptions
      option[key] = this._getPropByMod({key: key, i: i, from: this.o.childOptions});
      // if fail
      // if the same option could be defined for parent and child
      // get the option from childDefaults and continue
      if ( this.optionsIntersection[key] ) {
        if ( option[key] == null ) {
          option[key] = this._getPropByMod({key: key, i: i, from: this.childDefaults});
        }
        continue;
      }
      // else check the option on parent
      if ( option[key] == null ) {
        option[key] = this._getPropByMod({key: key, i: i, from: this.o});
      }
      if ( option[key] == null ) {
        option[key] = this._getPropByMod({key: key, i: i, from: this.childDefaults});
      }
    }
    return option;
  }
  /*
    Method to get property by modulus.
    @private
    @param {Object} Options object to get the property from.
    @returns {Any} Property.
  */
  _getPropByMod ( o ) {
    var source = (o.from || this.o.childOptions);
    if ( source ) { var prop = source[o.key]; }
    return ( this.h.isArray(prop) )
      ? prop[o.i % prop.length]
      : prop;
  }
  /*
    Method to get radial point.
    @private
    @param {String} Name of the side - [start, end].
    @param {Number} Angle of the radial point.
    @returns radial point.
  */
  _getSidePoint (side, angle) {
    var sideRadius = this._getSideRadius(side);
    return this.h.getRadialPoint({
      radius:  sideRadius.radius,
      radiusX: sideRadius.radiusX,
      radiusY: sideRadius.radiusY,
      angle:   angle,
      center:  { x: this.props.center, y: this.props.center }
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
    Method to get radius by key name.
    @private
    @param {String} Key name.
    @param {String} Side name - [start, end].
  */
  _getRadiusByKey (key, side) {
    if ( this.deltas[key] != null ) { return this.deltas[key][side]; }
    else if ( this.props[key] != null ) { return this.props[key]; }
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
    Method to get transits angle in burst so
    it will follow circular shape.
     
     @param    {Number, Object} Base angle.
     @param    {Number}   Transit's index in burst.
     @returns  {Number}   Radial angle in burst.
  */ 
  _getBitAngle (angle, i) {
    var points = this.props.count,
        degCnt = ( this.props.degree % 360 === 0 )
          ? points
          : points-1 || 1;
    var step = this.props.degree/degCnt;
    var angleAddition = i*step + 90;
    var angleShift = this.transits[i].props.angleShift || 0;
    // if not delta option
    if ( typeof angle !== 'object' ) {
      angle += angleAddition + angleShift;
    } else {
      var keys  = Object.keys(angle),
          start = keys[0],
          end   = angle[start],
          curAngleShift = angleAddition+angleShift,
          newStart      = parseFloat(start) + curAngleShift,
          newEnd        = parseFloat(end)   + curAngleShift,
          delta = {};
          delta[newStart] = newEnd;
      angle = delta;
    }
    return angle;
  }
  /*
    Method to get transform string.
    @private
    @returns {String} Transform string.
  */
  _fillTransform () {
    return `rotate(${this.props.angle}deg) translate(${this.props.x}, ${this.props.y})`;
  }
  /*
    Method to get if need to update new transform.
    @private
    @returns {Boolean} If transform update needed.
  */
  _isNeedsTransform () {
    return  this._isPropChanged('x') ||
            this._isPropChanged('y') ||
            this._isPropChanged('angle');
  }
  /*
    Method to generate random angle.
    @private
    @returns {Number} Rundom angle.
  */
  _generateRandomAngle ( ) {
    var randomness = parseFloat(this.props.randomAngle);
    if ( randomness > 1 ) { randdomness = 1 }
    else if ( randomness < 0 ) { randdomness = 0 }
    return this.h.rand(0, ( randomness ) ? randomness*360 : 180);
  }
  /*
    Method to get random radius.
    @private
    @returns {Number} Random radius.
  */
  _generateRandomRadius () {
    var randomness = parseFloat(this.props.randomRadius);
    if ( randomness > 1 ) { randdomness = 1; }
    else if ( randomness < 0 ) { randdomness = 0; }
    var start = ( randomness ) ? (1-randomness)*100 : (1-.5)*100;
    return this.h.rand(start, 100)/100;
  }
  createTween () {
    super.createTween();
    var i = this.transits.length;
    while(i--) { this.timeline.add(this.transits[i].tween); }
  }

  run (o) {
    if ( o != null && Object.keys(o).length) {
      if ( o.count || ( o.childOptions && o.childOptions.count )) {
        this.h.warn('Sorry, count can not be changed on run');
      }
      this._extendDefaults(o);
      // copy child options to options
      var keys = Object.keys(o.childOptions || {});
      
      if ( this.o.childOptions == null ) { this.o.childOptions = {}; }

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        this.o.childOptions[key] = o.childOptions[key];
      }
      // tune transits
      var len = this.transits.length;
      while(len--) {
        // we should keep transit's angle otherwise
        // it will fallback to default 0 value
        var option = this._getOption(len),
            ref;
        // !o.childOptions?.angle? && ( o.angleShift == null )
        if ( (((ref = o.childOptions) != null ? ref.angle : void 0) == null) && ( o.angleShift == null ) ) {
          option.angle = this.transits[len].o.angle;
        }
        // calculate bit angle if new angle related option passed
        // and not isResetAngles
        else if ( !o.isResetAngles ) {
          option.angle = this._getBitAngle(option.angle, len);
        }
        this.transits[len]._tuneNewOption(option, true);
      }
      this.timeline._recalcTotalDuration()
    }
    if ( this.props.randomAngle || this.props.randomRadius ) {
      var len = this.transits.length;
      while(len--) {
        var tr = this.transits[len];
        this.props.randomAngle  && tr._setProp({angleShift:  this._generateRandomAngle()});
        this.props.randomRadius && tr._setProp({radiusScale: this._generateRandomRadius()})
      }
    }
    this.play();
  }
  /*
    Method to create then chain record.
    @private
    returns {Object} this.
  */
  then (o) {
    this.h.error(`Burst's \"then\" method is under consideration,
      you can vote for it in github repo issues`);
    // 1. merge @o and o
    // 2. get i option from merged object
    // 3. pass the object to transit then
    // 4. transform self chain on run
    // i = this.transits.length
    // while(i--)
    //   this.transits[i].then(o)
    return this;
  }
}

export default Burst;