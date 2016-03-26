'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _transit = require('./transit');

var _transit2 = _interopRequireDefault(_transit);

var _tweenTimeline = require('./tween/timeline');

var _tweenTimeline2 = _interopRequireDefault(_tweenTimeline);

var _swirl = require('./swirl');

var _swirl2 = _interopRequireDefault(_swirl);

var _h = require('./h');

var _h2 = _interopRequireDefault(_h);

var Burst = (function (_Swirl) {
  _inherits(Burst, _Swirl);

  function Burst() {
    _classCallCheck(this, Burst);

    _get(Object.getPrototypeOf(Burst.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Burst, [{
    key: '_declareDefaults',

    /*
      Method to declare defaults.
      @override @ Swirl.
    */
    value: function _declareDefaults() {
      // call super @ Swirl
      _get(Object.getPrototypeOf(Burst.prototype), '_declareDefaults', this).call(this);
      // child defaults declaration
      this._declareChildDefaults();

      /* _DEFAULTS ARE - SWIRL DEFAULTS + THESE: */

      /* :: [number > 0] :: Amount of Burst's points. */
      this._defaults.count = 5;
      /* :: [0 < number < 360] :: Degree of the Burst. */
      this._defaults.degree = 360;
      /* ∆ :: [number > 0] :: Degree for the Burst's points */
      this._defaults.radius = { 5: 50 };

      /* childOptions PROPERTIES ARE -
        `Swirl` DEFAULTS + `Tween` DEFAULTS.
        ONLY `isSwirl` option is `false` by default. */

      // add options intersection hash - map that holds the property
      // names that could be on both parent module and child ones,
      // so setting one of those on parent, affect parent only
      this._optionsIntersection = {
        radius: 1, radiusX: 1, radiusY: 1,
        angle: 1, scale: 1, opacity: 1
      };
      // exclude unitTimeline object from deltas parsing
      this._skipPropsDelta.unitTimeline = 1;
    }

    /*
      Method to copy _o options to _props with fallback to _defaults.
      @private
      @override @ Swirl
    */
  }, {
    key: '_extendDefaults',
    value: function _extendDefaults() {
      // call super extendDefaults on Swirl
      _get(Object.getPrototypeOf(Burst.prototype), '_extendDefaults', this).call(this);
      // calc size immedietely, the Swirls' options rely on size
      this._calcSize();
    }

    /*
      Method to declare `childDefaults` for `childOptions` object.
      @private
    */
  }, {
    key: '_declareChildDefaults',
    value: function _declareChildDefaults() {
      /* CHILD DEFAULTS - SWIRL's DEFAULTS WITH ADDITIONS*/
      // copy the defaults to the childDefaults property
      this._childDefaults = _h2['default'].cloneObj(this._defaults);
      // [boolean] :: If shape should follow sinusoidal path.
      this._childDefaults.isSwirl = false;
      // copy tween options and callbacks
      for (var key in _h2['default'].tweenOptionMap) {
        this._childDefaults[key] = null;
      }
      for (var key in _h2['default'].callbacksMap) {
        this._childDefaults[key] = null;
      }
    }

    /*
      Method to create child transits.
      @private
      @override Transit
    */
  }, {
    key: '_createBit',
    value: function _createBit() {
      this._swirls = [];
      for (var index = 0; index < this._props.count; index++) {
        // console.log(this._getOption( index ).radius)
        this._swirls.push(new _swirl2['default'](this._getOption(index)));
      }
    }

    /*
      Method to calculate option for specific transit.
      @private
      @param {Number} Index of the swirl.
    */
  }, {
    key: '_getOption',
    value: function _getOption(i) {
      var option = {};

      for (var key in this._childDefaults) {
        // this is priorty for the property lookup
        // firstly try to find the prop in this._o.childOptions
        var prop = this._getPropByMod(key, i, this._o.childOptions);
        // if non-intersected option - need to check in _o
        prop = prop == null && !this._optionsIntersection[key] ? this._getPropByMod(key, i, this._o) : prop;
        // lastly fallback to defaults
        prop = prop == null ? this._getPropByMod(key, i, this._childDefaults) : prop;
        // parse `stagger` and `rand` values if needed
        option[key] = _h2['default'].parseStringOption(prop, i);
      }

      return this._addOptionalProperties(option, i);
    }

    /*
      Method to add optional Swirls' properties to passed object.
      @private
      @param {Object} Object to add the properties to.
      @param {Number} Index of the property.
    */
  }, {
    key: '_addOptionalProperties',
    value: function _addOptionalProperties(options, index) {
      options.index = index;
      options.left = '50%';
      options.top = '50%';
      options.parent = this.el;
      options.isTimelineLess = true;
      // option.callbacksContext = this;  ?

      var p = this._props,
          points = p.count,
          degreeCnt = p.degree % 360 === 0 ? points : points - 1 || 1,
          step = p.degree / degreeCnt,
          pointStart = this._getSidePoint('start', index * step),
          pointEnd = this._getSidePoint('end', index * step);

      options.x = this._getDeltaFromPoints('x', pointStart, pointEnd);
      options.y = this._getDeltaFromPoints('y', pointStart, pointEnd);
      options.angle = this._getBitAngle(options.angle, index);

      return options;
    }

    /* 
      Method to get transits angle in burst so
      it will follow circular shape.
       
       @param    {Number, Object} Base angle.
       @param    {Number}         Transit's index in burst.
       @returns  {Number}         Angle in burst.
    */
  }, {
    key: '_getBitAngle',
    value: function _getBitAngle(angleProperty, i) {
      var p = this._props,
          degCnt = p.degree % 360 === 0 ? p.count : p.count - 1 || 1,
          step = p.degree / degCnt,
          angle = i * step + 90;
      // if not delta option
      if (!this._isDelta(angleProperty)) {
        angleProperty += angle;
      } else {
        var delta = {},
            keys = Object.keys(angleProperty),
            start = keys[0],
            end = angleProperty[start];

        start = _h2['default'].parseStringOption(start, i);
        end = _h2['default'].parseStringOption(end, i);
        // new start = newEnd
        delta[parseFloat(start) + angle] = parseFloat(end) + angle;

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
  }, {
    key: '_getSidePoint',
    value: function _getSidePoint(side, angle) {
      var p = this._props,
          sideRadius = this._getSideRadius(side);

      return _h2['default'].getRadialPoint({
        radius: sideRadius.radius,
        radiusX: sideRadius.radiusX,
        radiusY: sideRadius.radiusY,
        angle: angle,
        center: { x: p.center, y: p.center }
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
      Method to get radius from ∆ or plain property.
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
      Method to get property by modulus.
      @private
      @param {String} Name of the property.
      @param {Number} Index for the modulus.
      @param {Object} Source object to check in.
      @returns {Any} Property.
    */
  }, {
    key: '_getPropByMod',
    value: function _getPropByMod(name, index) {
      var sourceObj = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var prop = sourceObj[name];
      return _h2['default'].isArray(prop) ? prop[index % prop.length] : prop;
    }

    /*
      Method to draw self DIV element.
      @private
      @override @ Transit
    */
  }, {
    key: '_draw',
    value: function _draw() {
      this._drawEl();
    }

    /*
      Method to calculate maximum size of element.
      @private
      @override @ Transit
    */
  }, {
    key: '_calcSize',
    value: function _calcSize() {
      var p = this._props;
      p.size = p.size == null ? 2 : p.size;
      p.center = p.size / 2;
    }

    /*
      Method to setup  timeline options before creating the Timeline instance.
      @override @ Transit
      @private
    */
  }, {
    key: '_transformTweenOptions',
    value: function _transformTweenOptions() {
      this._o.unitTimeline = this._o.unitTimeline || {};
      this._o.unitTimeline.callbacksContext = this;
      this._applyCallbackOverrides(this._o.unitTimeline);
    }

    /*
      Method to create timeline.
      @private
      @override @ Tweenable
      @param {Object} Timeline's options.
                      An object which contains "timeline" property with
                      timeline options.
    */
  }, {
    key: '_makeTimeline',
    value: function _makeTimeline() {
      var _unitTimeline;

      // create unit Timeline to controll all Swirls
      this.unitTimeline = new _tweenTimeline2['default'](this._o.unitTimeline);
      (_unitTimeline = this.unitTimeline).add.apply(_unitTimeline, _toConsumableArray(this._swirls));
      // if isTimelineLess wasn't passed to the module - we need
      // to create Master Timeline in case we will have `then` chain,-
      // the master will control all the unitTimelines of the chain.
      if (!this._o.wasTimelineLess) {
        _get(Object.getPrototypeOf(Burst.prototype), '_makeTimeline', this).call(this);
        this.timeline.add(this.unitTimeline);
        // otherwise set the timeline property to the unitTimeline,
        // this will allow to `.append( )` this module to master timeline
        // automatically in the `Thenable.then` method.
      } else {
          this.timeline = this.unitTimeline;
        }
      // reset the timeline and unitTimeline options objects.
      this._o.timeline = null;
      // this._o.unitTimeline = undefined;
    }

    /*
      Method to make Tween for the module.
      @private
      @override @ Tweenable
    */
  }, {
    key: '_makeTween',
    value: function _makeTween() {} /* don't create any tween */
    /*
      Method to tune new history options to all the submodules.
      @private
      @override @ Tunable
    */

  }, {
    key: '_tuneSubModules',
    value: function _tuneSubModules() {
      // call _tuneSubModules on Tunable
      _get(Object.getPrototypeOf(Burst.prototype), '_tuneSubModules', this).call(this);
      // tune swirls including their tweens
      for (var index = 0; index < this._swirls.length; index++) {
        var swirl = this._swirls[index],
            options = this._getOption(index);

        swirl._tuneNewOptions(options);
        this._resetTween(swirl.tween, options);
      }

      this._o.timeline && this.timeline._setProp(this._o.timeline);
      this.timeline._recalcTotalDuration();
    }

    /*
      Method to reset some flags on merged options object.
      @private
      @overrides @ Thenable
      @param   {Object} Options object.
      @returns {Object} Options object.
    */
  }, {
    key: '_resetTweens',
    value: function _resetTweens() {} /* don't reset tweens for now */
    /*
      Method to reset some flags on merged options object.
      @private
      @override @ Thenable
      @param   {Object} Options object.
      @returns {Object} Options object.
    */

  }, {
    key: '_resetMergedFlags',
    value: function _resetMergedFlags(obj) {
      // call super @ Thenable
      _get(Object.getPrototypeOf(Burst.prototype), '_resetMergedFlags', this).call(this, obj);
      obj.wasTimelineLess = obj.isTimelineLess;
      obj.isTimelineLess = false;
      return obj;
    }
  }]);

  return Burst;
})(_swirl2['default']);

exports['default'] = Burst;
module.exports = exports['default'];