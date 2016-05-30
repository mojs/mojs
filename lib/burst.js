// import Shape    from './shape';
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _tweenTimeline = require('./tween/timeline');

var _tweenTimeline2 = _interopRequireDefault(_tweenTimeline);

var _shapeSwirl = require('./shape-swirl');

var _shapeSwirl2 = _interopRequireDefault(_shapeSwirl);

var _tunable = require('./tunable');

var _tunable2 = _interopRequireDefault(_tunable);

var _h = require('./h');

var _h2 = _interopRequireDefault(_h);

var Burst = (function (_Tunable) {
  _inherits(Burst, _Tunable);

  function Burst() {
    _classCallCheck(this, Burst);

    _get(Object.getPrototypeOf(Burst.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Burst, [{
    key: '_declareDefaults',

    /*
      Method to declare defaults.
      @override @ ShapeSwirl.
    */
    value: function _declareDefaults() {
      this._defaults = {
        /* [number > 0] :: Quantity of Burst particles. */
        count: 5,
        /* [0 < number < 360] :: Degree of the Burst. */
        degree: 360,
        /* ∆ :: [number > 0] :: Radius of the Burst. */
        radius: { 0: 50 },
        /* ∆ :: [number > 0] :: X radius of the Burst. */
        radiusX: null,
        /* ∆ :: [number > 0] :: Y radius of the Burst. */
        radiusY: null,
        /* [string] :: Easing for the main module (not children). */
        easing: 'linear.none',
        /* [boolean] :: If Burst itself should follow sinusoidal path. */
        isSwirl: false
      };
    }

    /*
      Method to create a then record for the module.
      @public
      overrides @ Thenable
      @param    {Object} Options for the next animation.
      @returns  {Object} this.
    */
  }, {
    key: 'then',
    value: function then(o) {
      // remove tween properties (not callbacks)
      this._removeTweenProperties(o);

      var newMaster = this._masterThen(o),
          newSwirls = this._childThen(o, newMaster);

      this._setSwirlDuration(newMaster, this._calcPackTime(newSwirls));

      this.timeline._recalcTotalDuration();
      return this;
    }

    /*
      Method to start the animation with optional new options.
      @public
      @param {Object} New options to set on the run.
      @returns {Object} this.
    */
  }, {
    key: 'tune',
    value: function tune(o) {
      if (o == null) {
        return this;
      }
      // save timeline options to _timelineOptions
      // and delete the timeline options on o
      // cuz masterSwirl should not get them
      this._saveTimelineOptions(o);

      // add new timeline properties to timeline
      this.timeline._setProp(this._timelineOptions);

      // remove tween options (not callbacks)
      this._removeTweenProperties(o);

      // tune _props
      this._tuneNewOptions(o);

      // tune master swirl
      this.masterSwirl.tune(o);

      // tune child swirls
      this._tuneSwirls(o);

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
  }, {
    key: '_extendDefaults',
    value: function _extendDefaults() {
      // remove tween properties (not callbacks)
      this._removeTweenProperties(this._o);
      _get(Object.getPrototypeOf(Burst.prototype), '_extendDefaults', this).call(this);
    }

    /*
      Method to remove all tween (excluding
      callbacks) props from object.
      @private
      @param {Object} Object which should be cleaned
                      up from tween properties.
    */
  }, {
    key: '_removeTweenProperties',
    value: function _removeTweenProperties(o) {
      for (var key in _h2['default'].tweenOptionMap) {
        // remove all items that are not declared in _defaults
        if (this._defaults[key] == null) {
          delete o[key];
        }
      }
    }

    /*
      Method to recalc modules chain tween
      times after tuning new options.
      @private
    */
  }, {
    key: '_recalcModulesTime',
    value: function _recalcModulesTime() {
      var modules = this.masterSwirl._modules,
          swirls = this._swirls,
          shiftTime = 0;

      for (var i = 0; i < modules.length; i++) {
        var tween = modules[i].tween,
            packTime = this._calcPackTime(swirls[i]);
        tween._setProp({ 'duration': packTime, 'shiftTime': shiftTime });
        shiftTime += packTime;
      }

      this.timeline._recalcTotalDuration();
    }

    /*
      Method to tune Swirls with new options.
      @private
      @param {Object} New options.
    */
  }, {
    key: '_tuneSwirls',
    value: function _tuneSwirls(o) {
      // get swirls in first pack
      var pack0 = this._swirls[0];
      for (var i = 0; i < pack0.length; i++) {
        var swirl = pack0[i],
            option = this._getChildOption(o || {}, i);

        this._addBurstProperties(option, i);
        swirl.tune(option);
      }
    }

    /*
      Method to call then on masterSwirl.
      @param {Object} Then options.
      @returns {Object} New master swirl.
    */
  }, {
    key: '_masterThen',
    value: function _masterThen(o) {
      this.masterSwirl.then(o);
      // get the latest master swirl in then chain
      var newMasterSwirl = _h2['default'].getLastItem(this.masterSwirl._modules);
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
  }, {
    key: '_childThen',
    value: function _childThen(o, newMasterSwirl) {
      var pack = this._swirls[0],
          newPack = [];

      for (var i = 0; i < pack.length; i++) {
        // get option by modulus
        var options = this._getChildOption(o, i);
        // add new Master Swirl as parent of new childswirl
        options.parent = newMasterSwirl.el;
        pack[i].then(options);
        // save the new item in `then` chain
        newPack.push(_h2['default'].getLastItem(pack[i]._modules));
      }
      // save the pack to _swirls object
      this._swirls[this._masterSwirls.length - 1] = newPack;
      return newPack;
    }

    /*
      Method to initialize properties.
      @private
      @overrides @ Thenable
    */
  }, {
    key: '_vars',
    value: function _vars() {
      _get(Object.getPrototypeOf(Burst.prototype), '_vars', this).call(this);
      // just buffer timeline for calculations
      this._bufferTimeline = new _tweenTimeline2['default']();
    }

    /*
      Method for initial render of the module.
    */
  }, {
    key: '_render',
    value: function _render() {
      this._o.isWithShape = false;
      this._o.isSwirl = this._props.isSwirl;
      this._o.callbacksContext = this;
      // save timeline options and remove from _o
      // cuz the master swirl should not get them
      this._saveTimelineOptions(this._o);

      this.masterSwirl = new _shapeSwirl2['default'](this._o);
      this._masterSwirls = [this.masterSwirl];
      this.el = this.masterSwirl.el;

      this._renderSwirls();
    }

    /*
      Method for initial render of swirls.
      @private
    */
  }, {
    key: '_renderSwirls',
    value: function _renderSwirls() {
      var p = this._props,
          pack = [];

      for (var i = 0; i < p.count; i++) {
        var option = this._getChildOption(this._o, i);
        pack.push(new _shapeSwirl2['default'](this._addOptionalProps(option, i)));
      }
      this._swirls = { 0: pack };
      this._setSwirlDuration(this.masterSwirl, this._calcPackTime(pack));
    }

    /*
      Method to save timeline options to _timelineOptions
      and delete the property on the object.
      @private
      @param {Object} The object to save the timeline options from.
    */
  }, {
    key: '_saveTimelineOptions',
    value: function _saveTimelineOptions(o) {
      this._timelineOptions = o.timeline;
      delete o.timeline;
    }

    /*
      Method to calculate total time of array of
      concurrent tweens.
      @param   {Array}  Pack to calculate the total time for.
      @returns {Number} Total pack duration.
    */
  }, {
    key: '_calcPackTime',
    value: function _calcPackTime(pack) {
      var maxTime = 0;
      for (var i = 0; i < pack.length; i++) {
        var tween = pack[i].tween,
            p = tween._props;

        maxTime = Math.max(p.repeatTime / p.speed, maxTime);
      }
      return maxTime;
    }

    /*
      Method to set duration for Swirl.
      @param {Object} Swirl instance to set the duration to.
      @param {Number} Duration to set.
    */
  }, {
    key: '_setSwirlDuration',
    value: function _setSwirlDuration(swirl, duration) {
      swirl.tween._setProp('duration', duration);
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
  }, {
    key: '_getChildOption',
    value: function _getChildOption(obj, i) {
      var options = {};
      for (var key in obj.childOptions) {
        options[key] = this._getPropByMod(key, i, obj.childOptions);
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
  }, {
    key: '_getPropByMod',
    value: function _getPropByMod(name, index) {
      var sourceObj = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var prop = sourceObj[name];
      return _h2['default'].isArray(prop) ? prop[index % prop.length] : prop;
    }

    /*
      Method to add optional Swirls' properties to passed object.
      @private
      @param {Object} Object to add the properties to.
      @param {Number} Index of the property.
    */
  }, {
    key: '_addOptionalProps',
    value: function _addOptionalProps(options, index) {
      options.index = index;
      options.left = '50%';
      options.top = '50%';
      options.parent = this.masterSwirl.el;
      options.isSwirl = options.isSwirl == null ? false : options.isSwirl;

      this._addBurstProperties(options, index);

      return options;
    }

    /*
      Method to add Burst options to object.
      @private
      @param {Object} Options to add the properties to.
      @param {Number} Index of the Swirl.
    */
  }, {
    key: '_addBurstProperties',
    value: function _addBurstProperties(options, index) {
      // save index of the module
      var mainIndex = this._index;
      // temporary change the index to parse index based properties like stagger
      this._index = index;
      // parse degree shift for the bit
      var degreeShift = this._parseProperty('degreeShift', options.degreeShift || 0);
      // put the index of the module back
      this._index = mainIndex;

      var p = this._props,
          degreeCnt = p.degree % 360 === 0 ? p.count : p.count - 1 || 1,
          step = p.degree / degreeCnt,
          pointStart = this._getSidePoint('start', index * step + degreeShift),
          pointEnd = this._getSidePoint('end', index * step + degreeShift);

      options.x = this._getDeltaFromPoints('x', pointStart, pointEnd);
      options.y = this._getDeltaFromPoints('y', pointStart, pointEnd);
      options.angle = this._getBitAngle((options.angle || 0) + degreeShift, index);

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
  }, {
    key: '_getBitAngle',
    value: function _getBitAngle(angleProperty, i) {
      if (angleProperty === undefined) angleProperty = 0;

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
        // center:  { x: p.center, y: p.center }
        center: { x: 0, y: 0 }
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
      Method to create timeline.
      @private
      @override @ Tweenable
    */
  }, {
    key: '_makeTimeline',
    value: function _makeTimeline() {
      // restore timeline options that were deleted in _render method
      this._o.timeline = this._timelineOptions;
      _get(Object.getPrototypeOf(Burst.prototype), '_makeTimeline', this).call(this);
      this.timeline.add(this.masterSwirl, this._swirls[0]);
    }

    /*
      Method to make Tween for the module.
      @private
      @override @ Tweenable
    */
  }, {
    key: '_makeTween',
    value: function _makeTween() {/* don't create any tween */}
  }]);

  return Burst;
})(_tunable2['default']);

exports['default'] = Burst;
module.exports = exports['default'];