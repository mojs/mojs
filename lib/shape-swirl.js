'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _h = require('./h');

/*
  *TODO:*
  ---
  - tweak then chains
*/

var _h2 = _interopRequireDefault(_h);

var ShapeSwirl = (function (_Shape) {
  _inherits(ShapeSwirl, _Shape);

  function ShapeSwirl() {
    _classCallCheck(this, ShapeSwirl);

    _get(Object.getPrototypeOf(ShapeSwirl.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ShapeSwirl, [{
    key: '_declareDefaults',

    /*
      Method to declare _defaults and other default objects.
      @private
      @override @ Shape
    */
    value: function _declareDefaults() {
      _get(Object.getPrototypeOf(ShapeSwirl.prototype), '_declareDefaults', this).call(this);

      /* _DEFAULTS ARE - Shape DEFAULTS + THESE: */

      /* [boolean] :: If shape should follow sinusoidal path. */
      this._defaults.isSwirl = true;
      /* ∆ :: [number > 0] :: Degree size of the sinusoidal path. */
      this._defaults.swirlSize = 10;
      /* ∆ :: [number > 0] :: Frequency of the sinusoidal path. */
      this._defaults.swirlFrequency = 3;
      /* ∆ :: [number > 0] :: Sinusoidal path length scale. */
      this._defaults.pathScale = 1;
      /* ∆ :: [number] :: Degree shift for the sinusoidal path. */
      this._defaults.degreeShift = 0;
      /* ∆ :: [number] :: Radius of the shape. */
      this._defaults.radius = { 5: 0 };
      /* [number: -1, 1] :: Directon of Swirl. */
      this._defaults.direction = 1;
      /* technical ones: */
      /* [boolean] :: If should have child shape. */
      this._defaults.isWithShape = true;
    }

    // ^ PUBLIC  METHOD(S) ^
    // v PRIVATE METHOD(S) v

    /*
      Method to copy _o options to _props with
      fallback to _defaults.
      @private
      @override @ Module
    */
  }, {
    key: '_extendDefaults',
    value: function _extendDefaults() {
      _get(Object.getPrototypeOf(ShapeSwirl.prototype), '_extendDefaults', this).call(this);
      this._calcPosData();
    }

    /*
      Method to tune new oprions to _o and _props object.
      @private
      @overrides @ Module
      @param {Object} Options object to tune to.
    */
  }, {
    key: '_tuneNewOptions',
    value: function _tuneNewOptions(o) {
      if (o == null) {
        return;
      }

      _get(Object.getPrototypeOf(ShapeSwirl.prototype), '_tuneNewOptions', this).call(this, o);
      if (o.x != null || o.y != null) {
        this._calcPosData();
      }
    }

    /*
      Method to calculate Swirl's position data.
      @private
    */
  }, {
    key: '_calcPosData',
    value: function _calcPosData() {
      var x = this._getPosValue('x'),
          y = this._getPosValue('y'),
          angle = 90 + Math.atan(y.delta / x.delta || 0) * _h2['default'].RAD_TO_DEG;

      this._posData = {
        radius: Math.sqrt(x.delta * x.delta + y.delta * y.delta),
        angle: x.delta < 0 ? angle + 180 : angle,
        x: x, y: y
      };
      // set the last position to _props
      // this._calcSwirlXY( 1 );
    }

    /*
      Gets `x` or `y` position value.
      @private
      @param {String} Name of the property.
    */
  }, {
    key: '_getPosValue',
    value: function _getPosValue(name) {
      var delta = this._deltas[name];
      if (delta) {
        // delete from deltas to prevent normal
        delete this._deltas[name];
        return {
          start: delta.start.value,
          end: delta.end.value,
          delta: delta.delta,
          units: delta.end.unit
        };
      } else {
        var pos = _h2['default'].parseUnit(this._props[name]);
        return { start: pos.value, end: pos.value, delta: 0, units: pos.unit };
      }
    }

    /*
      Method to calculate the progress of the Swirl.
      @private
      @overrides @ Shape
      @param {Numer} Eased progress of the Swirl in range of [0..1]
      @param {Numer} Progress of the Swirl in range of [0..1]
    */
  }, {
    key: '_setProgress',
    value: function _setProgress(easedProgress, progress) {
      this._progress = easedProgress;
      this._calcCurrentProps(easedProgress, progress);
      this._calcSwirlXY(easedProgress);
      // this._calcOrigin();
      this._draw(easedProgress);
    }

    /*
      Method to calculate x/y for Swirl's progress
      @private
      @mutates _props
      @param {Number} Current progress in [0...1]
    */
  }, {
    key: '_calcSwirlXY',
    value: function _calcSwirlXY(proc) {
      var p = this._props,
          angle = this._posData.angle + p.degreeShift,
          point = _h2['default'].getRadialPoint({
        angle: p.isSwirl ? angle + this._getSwirl(proc) : angle,
        radius: proc * this._posData.radius * p.pathScale,
        center: {
          x: this._posData.x.start,
          y: this._posData.y.start
        }
      });

      // if foreign svg canvas - set position without units
      var x = point.x,
          y = point.y;
      p.x = this._o.ctx ? x : x + this._posData.x.units;
      p.y = this._o.ctx ? y : y + this._posData.y.units;
    }

    /*
      Method to get progress of the swirl.
      @private
      @param {Number} Progress of the Swirl.
      @returns {Number} Progress of the swirl.
    */
  }, {
    key: '_getSwirl',
    value: function _getSwirl(proc) {
      var p = this._props;
      return p.direction * p.swirlSize * Math.sin(p.swirlFrequency * proc);
    }

    /*
      Method to draw shape.
      If !isWithShape - draw self el only, but not shape.
      @private
      @overrides @ Shape.
    */
  }, {
    key: '_draw',
    value: function _draw() {
      // call _draw or just _drawEl @ Shape depending if there is `shape`
      var methodName = this._props.isWithShape ? '_draw' : '_drawEl';
      _shape2['default'].prototype[methodName].call(this);
    }
  }]);

  return ShapeSwirl;
})(_shape2['default']);

exports['default'] = ShapeSwirl;
module.exports = exports['default'];