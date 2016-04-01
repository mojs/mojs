'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _transit = require('./transit');

var _transit2 = _interopRequireDefault(_transit);

var _tweenTimeline = require('./tween/timeline');

var _tweenTimeline2 = _interopRequireDefault(_tweenTimeline);

var _swirl = require('./swirl');

var _swirl2 = _interopRequireDefault(_swirl);

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
      @override @ Swirl.
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
      this.masterSwirl.tune(o);

      var pack0 = this._swirls[0];
      for (var i = 0; i < pack0.length; i++) {
        var swirl = pack0[i];
        swirl.tune(this._getChildOption(o.childOptions || {}, i));
      }

      // RECALC CONCURRENT TWEEN DURATIONS
      // if options object was passed
      // if (o && Object.keys(o).length) {
      // }
      return this;
    }

    // ^ PUBLIC  METHODS ^
    // v PRIVATE METHODS v

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
      var newMasterSwirl = this._getLastItem(this.masterSwirl._modules);
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
        newPack.push(this._getLastItem(pack[i]._modules));
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
      Method to get the last item of array.
      @private
      @param {Array} Array to get the last item in.
      @returns {Any} The last item of array.
    */
  }, {
    key: '_getLastItem',
    value: function _getLastItem(arr) {
      return arr[arr.length - 1];
    }

    /*
      Method for initial render of the module.
    */
  }, {
    key: '_render',
    value: function _render() {
      this._o.isWithShape = false;
      this._o.isSwirl = this._props.isSwirl;
      this._o.radius = 0;

      this.masterSwirl = new _swirl2['default'](this._o);
      this._masterSwirls = [this.masterSwirl];

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
        pack.push(new _swirl2['default'](this._addOptionalProps(option, i)));
      }
      this._swirls = { 0: pack };
      this._setSwirlDuration(this.masterSwirl, this._calcPackTime(pack));
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

      // options.isTimelineLess = true;
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
    value: function _makeTween() {} /* don't create any tween */
    // /*
    //   Method to get childOption for then call.
    //   @private
    //   @param   {Object} Object to look in.
    //   @param   {Number} Index of the current Swirl.
    //   @returns {Object} Options for the current swirl.
    // */
    // _getThenOption (obj, i) {
    //   var options = {};

    //   for ( var key in obj.childOptions ) {
    //     options[key] = this._getPropByMod( key, i, obj.childOptions);
    //   }

    //   return options;
    // }
    // /*
    //   Method to copy _o options to _props with fallback to _defaults.
    //   @private
    //   @override @ Swirl
    // */
    // _extendDefaults () {
    //   // call super extendDefaults on Swirl
    //   super._extendDefaults();
    //   // calc size immedietely, the Swirls' options rely on size
    //   this._calcSize();
    // }
    // /*
    //   Method to declare `childDefaults` for `childOptions` object.
    //   @private
    // */
    // _declareChildDefaults () {
    //   /* CHILD DEFAULTS - SWIRL's DEFAULTS WITH ADDITIONS*/
    //   // copy the defaults to the childDefaults property
    //   this._childDefaults = h.cloneObj( this._defaults );
    //   // [boolean] :: If shape should follow sinusoidal path.
    //   this._childDefaults.isSwirl = false;
    //   // copy tween options and callbacks
    //   for (var key in h.tweenOptionMap) { this._childDefaults[key] = null; }
    //   for (var key in h.callbacksMap)   { this._childDefaults[key] = null; }
    // }
    // /*
    //   Method to create child transits.
    //   @private
    //   @override Transit
    // */
    // _createBit () {
    //   this._swirls = [];
    //   for (var index = 0; index < this._props.count; index++) {
    //     this._swirls.push( new Swirl( this._getOption( index ) ) );
    //   }
    // }
    // /*
    //   Method to calculate option for specific transit.
    //   @private
    //   @param {Number} Index of the swirl.
    // */
    // _getOption (i) {
    //   var option  = {};

    //   for (var key in this._childDefaults) {
    //     // this is priorty for the property lookup
    //     // firstly try to find the prop in this._o.childOptions
    //     var prop = this._getPropByMod( key, i, this._o.childOptions );
    //     // lastly fallback to defaults
    //     prop = ( prop == null )
    //       ? this._getPropByMod( key, i, this._childDefaults ) : prop;
    //     // parse `stagger` and `rand` values if needed
    //     option[key] = h.parseStringOption(prop, i);
    //   }

    //   return this._addOptionalProps( option, i );
    // }
    // /*
    //   Method to draw self DIV element.
    //   @private
    //   @override @ Transit
    // */
    // _draw () { this._drawEl(); }
    // /*
    //   Method to calculate maximum size of element.
    //   @private
    //   @override @ Transit
    // */
    // _calcSize () {
    //   var p = this._props;
    //   p.size   = ( p.size == null ) ? 2 : p.size;
    //   p.center = p.size / 2;
    // }
    // /*
    //   Method to setup  timeline options before creating the Timeline instance.
    //   @override @ Transit
    //   @private
    // */
    // _transformTweenOptions () {
    //   this._o.unitTimeline = this._o.unitTimeline || {};
    //   this._o.unitTimeline.callbacksContext = this;
    //   this._applyCallbackOverrides( this._o.unitTimeline );
    // }
    // /*
    //   Method to create timeline.
    //   @private
    //   @override @ Tweenable
    //   @param {Object} Timeline's options.
    //                   An object which contains "timeline" property with
    //                   timeline options.
    // */
    // _makeTimeline () {
    //   // create unit Timeline to controll all Swirls
    //   this.unitTimeline = new Timeline( this._o.unitTimeline );
    //   this.unitTimeline.add(...this._swirls);
    //   // if isTimelineLess wasn't passed to the module - we need
    //   // to create Master Timeline in case we will have `then` chain,-
    //   // the master will control all the unitTimelines of the chain.
    //   if ( !this._o.wasTimelineLess ) {
    //     super._makeTimeline();
    //     this.timeline.add( this.unitTimeline );
    //   // otherwise set the timeline property to the unitTimeline,
    //   // this will allow to `.append( )` this module to master timeline
    //   // automatically in the `Thenable.then` method.
    //   } else { this.timeline = this.unitTimeline; }
    //   // reset the timeline and unitTimeline options objects.
    //   this._o.timeline     = null;
    //   // this._o.unitTimeline = undefined;
    // }
    // /*
    //   Method to tune new history options to all the submodules.
    //   @private
    //   @override @ Tunable
    // */
    // // _tuneSubModules () {
    // //   // call _tuneSubModules on Tunable
    // //   super._tuneSubModules();
    // //   // tune swirls including their tweens
    // //   for (var index = 0; index < this._swirls.length; index++) {
    // //     var swirl   = this._swirls[index],
    // //         options = this._getOption( index );

    // //     swirl._tuneNewOptions( options );
    // //     this._resetTween( swirl.tween, options );
    // //   }

    // //   this._o.timeline && this.timeline._setProp(this._o.timeline);
    // //   this.timeline._recalcTotalDuration();
    // // }

    // /*
    //   Method to reset some flags on merged options object.
    //   @private
    //   @overrides @ Thenable
    //   @param   {Object} Options object.
    //   @returns {Object} Options object.
    // */
    // _resetTweens () { /* don't reset tweens for now */ }
    // /*
    //   Method to reset some flags on merged options object.
    //   @private
    //   @override @ Thenable
    //   @param   {Object} Options object.
    //   @returns {Object} Options object.
    // */
    // _resetMergedFlags (obj) {
    //   // call super @ Thenable
    //   super._resetMergedFlags(obj);
    //   obj.wasTimelineLess = obj.isTimelineLess;
    //   obj.isTimelineLess  = false;
    //   return obj;
    // }

    /*
      Method to merge two options into one. Used in .then chains.
      @private
      @param {Object} Start options for the merge.
      @param {Object} End options for the merge.
      @returns {Object} Merged options.
    */
    // _mergeThenOptions ( start, end ) {
    //   var startChild  = start.childOptions || {},
    //       endChild    = end.childOptions   || {},
    //       mergedChild = super._mergeThenOptions( startChild, endChild, false ),
    //       merged      = super._mergeThenOptions( start, end, false );

    //   merged.childOptions = mergedChild;

    //   this._history.push( merged );

    //   return merged;
    // }

  }]);

  return Burst;
})(_tunable2['default']);

exports['default'] = Burst;
module.exports = exports['default'];