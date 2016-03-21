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
    // copy the defaults to the childDefaults property
    this._childDefaults = h.cloneObj( this._defaults );
    // add childOptions property to have it in _extendDefaults loop
    this._defaults.childOptions = null;
    // Amount of Burst's point: [number > 0]
    this._defaults.count        = 5;
    // Randomness for the Burst's points fly degree [0..1]
    this._defaults.randomAngle  = 0;
    // Randomness for the Burst's points fly radius [0..1]
    this._defaults.randomRadius = 0;
    // add options intersection hash - map that holds the property
    // names that could be on both parent module and child ones
    this._optionsIntersection = {
      radius: 1, radiusX: 1, radiusY: 1, angle:  1, scale: 1, opacity: 1
    }
  }
  // /*
  //   Method to create child transits.
  //   @private
  //   @override Transit
  // */
  // _createBit () {
  //   // this._o.isIt && console.log('create');
  //   this._transits = [];
  //   // this._o.isIt && console.log(this._transits, this._props.count, this._props)
  //   for (var i = 0; i < this._props.count; i++) {
  //     var option = this._getOption(i); option.ctx = this.ctx; option.index = i
  //     // option.isDrawLess = option.isRunLess = option.isTweenLess = true
  //     option.isDrawLess = true;
  //     this._props.randomAngle  && (option.angleShift  = this._generateRandomAngle())
  //     this._props.randomRadius && (option.radiusScale = this._generateRandomRadius())
  //     this._transits.push(new Swirl(option));
  //   }
  // }
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
  //   for (var i = 0; i < this._transits.length; i++) {
  //     var transit    = this._transits[i],
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
  //   for (var i = 0; i < this._transits.length; i++) {
  //     var transit = this._transits[i];
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
  // _draw (progress) { this._drawEl(); }
  // /*
  //   Method to calculate option for specific transit.
  //   @private
  //   @param {Number} Index of the transit.
  // */
  // _getOption (i) {
  //   var option  = {};

  //   for (var key in this._childDefaults) {
  //     // firstly try to find the prop in this._o.childOptions
  //     option[key] = this._getPropByMod({key, i, from: this._o.childOptions});
  //     // if fail
  //     // if the same option could be defined for parent and child
  //     // get the option from childDefaults and continue
  //     if ( this._optionsIntersection[key] ) {
  //       if ( option[key] == null ) {
  //         option[key] = this._getPropByMod({ key, i, from: this._childDefaults});
  //       }
  //       continue;
  //     }
  //     // else check the option on parent
  //     if ( option[key] == null ) {
  //       option[key] = this._getPropByMod({key, i, from: this._o});
  //     }
  //     if ( option[key] == null ) {
  //       this._o.isIt && console.log('yep', key);
  //       option[key] = this._getPropByMod({key, i, from: this._childDefaults});
  //     }
  //   }
  //   return option;
  // }
  // /*
  //   Method to get property by modulus.
  //   @private
  //   @param {Object} Options object to get the property from.
  //   @returns {Any} Property.
  // */
  // _getPropByMod ( o ) {
  //   var source = (o.from || this._o.childOptions);
  //   if ( source ) { var prop = source[o.key]; }
  //   return ( h.isArray(prop) ) ? prop[o.i % prop.length] : prop;
  // }
  
  //   Method to get radial point.
  //   @private
  //   @param {String} Name of the side - [start, end].
  //   @param {Number} Angle of the radial point.
  //   @returns radial point.
  
  // _getSidePoint (side, angle) {
  //   var sideRadius = this._getSideRadius(side);
  //   return h.getRadialPoint({
  //     radius:  sideRadius.radius,
  //     radiusX: sideRadius.radiusX,
  //     radiusY: sideRadius.radiusY,
  //     angle:   angle,
  //     center:  { x: this._props.center, y: this._props.center }
  //   });
  // }
  // /*
  //   Method to get radius of the side.
  //   @private
  //   @param {String} Name of the side - [start, end].
  //   @returns {Object} Radius.
  // */
  // _getSideRadius ( side ) {
  //   return {
  //     radius:  this._getRadiusByKey('radius',  side),
  //     radiusX: this._getRadiusByKey('radiusX', side),
  //     radiusY: this._getRadiusByKey('radiusY', side)
  //   }
  // }
  // /*
  //   Method to get radius by key name.
  //   @private
  //   @param {String} Key name.
  //   @param {String} Side name - [start, end].
  // */
  // _getRadiusByKey (key, side) {
  //   if ( this._deltas[key] != null ) { return this._deltas[key][side]; }
  //   else if ( this._props[key] != null ) { return this._props[key]; }
  // }
  // /*
  //   Method to get delta from start and end position points.
  //   @private
  //   @param {String} Key name.
  //   @param {Object} Start position point.
  //   @param {Object} End position point.
  //   @returns {Object} Delta of the end/start.
  // */
  // _getDeltaFromPoints (key, pointStart, pointEnd) {
  //   var delta = {};
  //   if ( pointStart[key] === pointEnd[key] ) {
  //     delta = pointStart[key];
  //   } else { delta[pointStart[key]] = pointEnd[key]; }
  //   return delta;
  // }
  // /* 
  //   Method to get transits angle in burst so
  //   it will follow circular shape.
     
  //    @param    {Number, Object} Base angle.
  //    @param    {Number}   Transit's index in burst.
  //    @returns  {Number}   Radial angle in burst.
  // */ 
  // _getBitAngle (angle, i) {
  //   var points = this._props.count,
  //       degCnt = ( this._props.degree % 360 === 0 )
  //         ? points
  //         : points-1 || 1;
  //   var step = this._props.degree/degCnt,
  //       angleAddition = i*step + 90,
  //       angleShift = this._transits[i]._props.angleShift || 0;
  //   // if not delta option
  //   if ( typeof angle !== 'object' ) {
  //     angle += angleAddition + angleShift;
  //   } else {
  //     var keys  = Object.keys(angle),
  //         start = keys[0],
  //         end   = angle[start],
  //         curAngleShift   = angleAddition+angleShift,
  //         newStart        = parseFloat(start) + curAngleShift,
  //         newEnd          = parseFloat(end)   + curAngleShift,
  //         delta           = {};
  //         delta[newStart] = newEnd;
  //     angle = delta;
  //   }
  //   return angle;
  // }
  // /*
  //   Method to get transform string.
  //   @private
  //   @returns {String} Transform string.
  // */
  // _fillTransform () {
  //   return `rotate(${this._props.angle}deg) translate(${this._props.x}, ${this._props.y})`;
  // }
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
  //   var i = this._transits.length;
  //   while(i--) { this.timeline.add(this._transits[i].tween); }
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
  //     var len = this._transits.length;
  //     while(len--) {
  //       // we should keep transit's angle otherwise
  //       // it will fallback to default 0 value
  //       var option = this._getOption(len),
  //           ref;

  //       if ( (((ref = o.childOptions) != null ? ref.angle : void 0) == null) && ( o.angleShift == null ) ) {
  //         option.angle = this._transits[len]._o.angle;
  //       }
  //       // calculate bit angle if new angle related option passed
  //       // and not isResetAngles
  //       else if ( !o.isResetAngles ) {
  //         option.angle = this._getBitAngle(option.angle, len);
  //       }
  //       this._transits[len]._tuneNewOption(option, true);
  //     }
  //     this.timeline._recalcTotalDuration()
  //   }
  //   if ( this._props.randomAngle || this._props.randomRadius ) {
  //     var len = this._transits.length;
  //     while(len--) {
  //       var tr = this._transits[len];
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
  //   // i = this._transits.length
  //   // while(i--) { this._transits[i].then(o); }
  //   //   
  //   return this;
  // }
}

export default Burst;