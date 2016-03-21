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

var _h = require('./h');

/*
  *TODO:*
  ---
  - tweak then chains
*/

var _h2 = _interopRequireDefault(_h);

var Swirl = (function (_Transit) {
  _inherits(Swirl, _Transit);

  function Swirl() {
    _classCallCheck(this, Swirl);

    _get(Object.getPrototypeOf(Swirl.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Swirl, [{
    key: '_declareDefaults',

    /*
      Method to declare _defaults and other default objects.
      @private
      @override @ Transit
    */
    value: function _declareDefaults() {
      _get(Object.getPrototypeOf(Swirl.prototype), '_declareDefaults', this).call(this);
      // ∆ :: [number > 0]
      this._defaults.swirlSize = 10;
      // ∆ :: [number > 0]
      this._defaults.swirlFrequency = 3;
      // [boolean]
      this._defaults.isSwirl = true;
      // ∆ :: [number > 0]
      this._defaults.radiusScale = 1;
      // ∆ :: [number]
      this._defaults.angleShift = 0;
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
      _get(Object.getPrototypeOf(Swirl.prototype), '_extendDefaults', this).call(this);

      var p = this._props,
          x = this._getPosValue('x'),
          y = this._getPosValue('y'),
          angle = 90 + Math.atan(y.delta / x.delta || 0) * _h2['default'].RAD_TO_DEG;

      this._posData = {
        radius: Math.sqrt(x.delta * x.delta + y.delta * y.delta),
        angle: x.delta < 0 ? angle + 180 : angle,
        x: x, y: y
      };

      p.signRand = Math.round(_h2['default'].rand(0, 1)) ? -1 : 1;
    }

    /*
      Gets `x` or `y` position value.
      @private
      @param {String} Name of the property.
    */
  }, {
    key: '_getPosValue',
    value: function _getPosValue(name) {
      if (this._deltas[name]) {
        var delta = this._deltas[name];
        // delete from deltas to prevent normal
        // deltas calculation for the property
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
      @overrides @ Transit
      @param {Numer} Progress of the Swirl in range of [0..1]
    */
  }, {
    key: '_setProgress',
    value: function _setProgress(proc) {

      this._progress = proc;
      this._calcCurrentProps(proc);

      var p = this._props,
          angle = this._posData.angle + p.angleShift,
          point = _h2['default'].getRadialPoint({
        angle: p.isSwirl ? angle + this._getSwirl(proc) : angle,
        radius: proc * this._posData.radius * p.radiusScale,
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

      this._calcOrigin();
      this._draw(proc);
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
      return p.signRand * p.swirlSize * Math.sin(p.swirlFrequency * proc);
    }
  }]);

  return Swirl;
})(_transit2['default']);

exports['default'] = Swirl;
module.exports = exports['default'];