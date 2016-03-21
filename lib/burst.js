'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _transit = require('./transit');

var _transit2 = _interopRequireDefault(_transit);

var _swirl = require('./swirl');

var _swirl2 = _interopRequireDefault(_swirl);

var _h = require('./h');

var _h2 = _interopRequireDefault(_h);

var Burst = (function (_Transit) {
  _inherits(Burst, _Transit);

  function Burst() {
    _classCallCheck(this, Burst);

    _get(Object.getPrototypeOf(Burst.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Burst, [{
    key: '_declareDefaults',

    /*
      Method to declare defaults.
      @override @ Transit.
    */
    value: function _declareDefaults() {
      // DEFAULTS / APIs
      this._defaults = {
        // presentation props
        count: 5,
        degree: 360,
        scale: 1,
        stroke: 'none',
        opacity: 1,
        randomAngle: 0,
        randomRadius: 0,
        // position props/el props
        left: 100,
        top: 100,
        x: 0,
        y: 0,
        // size props
        radius: { 25: 75 },
        radiusX: undefined,
        radiusY: undefined,
        angle: 0,
        size: null,
        sizeGap: 0
      };
      this._childDefaults = {
        duration: 300,
        stroke: 'transparent',
        strokeOpacity: 1,
        strokeLinecap: null,
        strokeWidth: 2,
        //-- intersection starts
        radius: { 7: 0 },
        radiusX: undefined,
        radiusY: undefined,
        angle: 0,
        opacity: 1,
        //-- intersection ends
        points: 3,
        shape: 'circle',
        fill: 'deeppink',
        fillOpacity: 1,
        isSwirl: false,
        swirlSize: 10,
        swirlFrequency: 3,
        strokeDasharray: '',
        strokeDashoffset: ''
      };
      this.skipProps = { childOptions: 1 };
      this._optionsIntersection = {
        radius: 1,
        radiusX: 1,
        radiusY: 1,
        angle: 1,
        opacity: 1
      };
    }

    /*
      Method to create child transits.
      @private
      @override Transit
    */
  }, {
    key: '_createBit',
    // onStart:    1,
    // onComplete: 1,
    // onUpdate:   1
    value: function _createBit() {
      // this._o.isIt && console.log('create');
      this._transits = [];
      // this._o.isIt && console.log(this._transits, this._props.count, this._props)
      for (var i = 0; i < this._props.count; i++) {
        var option = this._getOption(i);option.ctx = this.ctx;option.index = i;
        // option.isDrawLess = option.isRunLess = option.isTweenLess = true
        option.isDrawLess = true;
        this._props.randomAngle && (option.angleShift = this._generateRandomAngle());
        this._props.randomRadius && (option.radiusScale = this._generateRandomRadius());
        this._transits.push(new _swirl2['default'](option));
      }
    }

    /*
      Method to populate each transit with dedicated option.
      @private
    */
  }, {
    key: '_addBitOptions',
    value: function _addBitOptions() {
      var points = this._props.count;
      this.degreeCnt = this._props.degree % 360 === 0 ? points : points - 1 || 1;

      var step = this._props.degree / this.degreeCnt;
      for (var i = 0; i < this._transits.length; i++) {
        var transit = this._transits[i],
            aShift = transit._props.angleShift || 0,
            pointStart = this._getSidePoint('start', i * step + aShift),
            pointEnd = this._getSidePoint('end', i * step + aShift);

        transit._o.x = this._getDeltaFromPoints('x', pointStart, pointEnd);
        transit._o.y = this._getDeltaFromPoints('y', pointStart, pointEnd);

        if (!this._props.isResetAngles) {
          transit._o.angle = this._getBitAngle(transit._o.angle, i);
        }
        transit._extendDefaults();
      }
    }

    /*
      Method to calculate module's size.
      @private
      @override Transit.
    */
  }, {
    key: '_calcSize',
    value: function _calcSize() {
      var largestSize = -1;
      for (var i = 0; i < this._transits.length; i++) {
        var transit = this._transits[i];
        transit._calcSize();
        if (largestSize < transit._props.size) {
          largestSize = transit._props.size;
        }
      }
      var radius = this._calcMaxShapeRadius();
      this._props.size = largestSize + 2 * radius;
      this._props.size += 2 * this._props.sizeGap;
      this._props.center = this._props.size / 2;
      this._addBitOptions();
    }

    /*
      Method to draw the burst.
      @private
      @override Transit.
    */
  }, {
    key: '_draw',
    value: function _draw(progress) {
      this._drawEl();
    }

    /*
      Method to calculate option for specific transit.
      @private
      @param {Number} Index of the transit.
    */
  }, {
    key: '_getOption',
    value: function _getOption(i) {
      var option = {};

      for (var key in this._childDefaults) {
        // firstly try to find the prop in this._o.childOptions
        option[key] = this._getPropByMod({ key: key, i: i, from: this._o.childOptions });
        // if fail
        // if the same option could be defined for parent and child
        // get the option from childDefaults and continue
        if (this._optionsIntersection[key]) {
          if (option[key] == null) {
            option[key] = this._getPropByMod({ key: key, i: i, from: this._childDefaults });
          }
          continue;
        }
        // else check the option on parent
        if (option[key] == null) {
          option[key] = this._getPropByMod({ key: key, i: i, from: this._o });
        }
        if (option[key] == null) {
          this._o.isIt && console.log('yep', key);
          option[key] = this._getPropByMod({ key: key, i: i, from: this._childDefaults });
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
  }, {
    key: '_getPropByMod',
    value: function _getPropByMod(o) {
      var source = o.from || this._o.childOptions;
      if (source) {
        var prop = source[o.key];
      }
      return _h2['default'].isArray(prop) ? prop[o.i % prop.length] : prop;
    }

    /*
      Method to get radial point.
      @private
      @param {String} Name of the side - [start, end].
      @param {Number} Angle of the radial point.
      @returns radial point.
    */
  }, {
    key: '_getSidePoint',
    value: function _getSidePoint(side, angle) {
      var sideRadius = this._getSideRadius(side);
      return _h2['default'].getRadialPoint({
        radius: sideRadius.radius,
        radiusX: sideRadius.radiusX,
        radiusY: sideRadius.radiusY,
        angle: angle,
        center: { x: this._props.center, y: this._props.center }
      });
    }

    /*
      Method to get radius of the side.
      @private
      @param {String} Name of the side - [start, end].
      @returns {Object} Radius.
    */
  }, {
    key: '_getSideRadius',
    value: function _getSideRadius(side) {
      return {
        radius: this._getRadiusByKey('radius', side),
        radiusX: this._getRadiusByKey('radiusX', side),
        radiusY: this._getRadiusByKey('radiusY', side)
      };
    }

    /*
      Method to get radius by key name.
      @private
      @param {String} Key name.
      @param {String} Side name - [start, end].
    */
  }, {
    key: '_getRadiusByKey',
    value: function _getRadiusByKey(key, side) {
      if (this._deltas[key] != null) {
        return this._deltas[key][side];
      } else if (this._props[key] != null) {
        return this._props[key];
      }
    }

    /*
      Method to get delta from start and end position points.
      @private
      @param {String} Key name.
      @param {Object} Start position point.
      @param {Object} End position point.
      @returns {Object} Delta of the end/start.
    */
  }, {
    key: '_getDeltaFromPoints',
    value: function _getDeltaFromPoints(key, pointStart, pointEnd) {
      var delta = {};
      if (pointStart[key] === pointEnd[key]) {
        delta = pointStart[key];
      } else {
        delta[pointStart[key]] = pointEnd[key];
      }
      return delta;
    }

    /* 
      Method to get transits angle in burst so
      it will follow circular shape.
       
       @param    {Number, Object} Base angle.
       @param    {Number}   Transit's index in burst.
       @returns  {Number}   Radial angle in burst.
    */
  }, {
    key: '_getBitAngle',
    value: function _getBitAngle(angle, i) {
      var points = this._props.count,
          degCnt = this._props.degree % 360 === 0 ? points : points - 1 || 1;
      var step = this._props.degree / degCnt,
          angleAddition = i * step + 90,
          angleShift = this._transits[i]._props.angleShift || 0;
      // if not delta option
      if (typeof angle !== 'object') {
        angle += angleAddition + angleShift;
      } else {
        var keys = Object.keys(angle),
            start = keys[0],
            end = angle[start],
            curAngleShift = angleAddition + angleShift,
            newStart = parseFloat(start) + curAngleShift,
            newEnd = parseFloat(end) + curAngleShift,
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
  }, {
    key: '_fillTransform',
    value: function _fillTransform() {
      return 'rotate(' + this._props.angle + 'deg) translate(' + this._props.x + ', ' + this._props.y + ')';
    }

    /*
      Method to get if need to update new transform.
      @private
      @returns {Boolean} If transform update needed.
    */
    // _isNeedsTransform () {
    //   return  this._isPropChanged('x') ||
    //           this._isPropChanged('y') ||
    //           this._isPropChanged('angle');
    // }
    /*
      Method to generate random angle.
      @private
      @returns {Number} Rundom angle.
    */
  }, {
    key: '_generateRandomAngle',
    value: function _generateRandomAngle() {
      var randomness = parseFloat(this._props.randomAngle);
      if (randomness > 1) {
        randdomness = 1;
      } else if (randomness < 0) {
        randdomness = 0;
      }
      return _h2['default'].rand(0, randomness ? randomness * 360 : 180);
    }

    /*
      Method to get random radius.
      @private
      @returns {Number} Random radius.
    */
  }, {
    key: '_generateRandomRadius',
    value: function _generateRandomRadius() {
      var randomness = parseFloat(this._props.randomRadius);
      if (randomness > 1) {
        randdomness = 1;
      } else if (randomness < 0) {
        randdomness = 0;
      }
      var start = randomness ? (1 - randomness) * 100 : (1 - .5) * 100;
      return _h2['default'].rand(start, 100) / 100;
    }

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
  }]);

  return Burst;
})(_transit2['default']);

exports['default'] = Burst;
module.exports = exports['default'];