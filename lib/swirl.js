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

var _h2 = _interopRequireDefault(_h);

var Swirl = (function (_Transit) {
  _inherits(Swirl, _Transit);

  function Swirl() {
    _classCallCheck(this, Swirl);

    _get(Object.getPrototypeOf(Swirl.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Swirl, [{
    key: '_vars',

    /*
      Method to declare Swirl's properties.
      @private
      @override @ Transit
    */
    value: function _vars() {
      _get(Object.getPrototypeOf(Swirl.prototype), '_vars', this).call(this);
      !this._o.isSwirless && this.generateSwirl();
    }

    /*
      Method to declare _defaults and other default objects.
      @private
      @override @ Transit
    */
  }, {
    key: '_declareDefaults',
    value: function _declareDefaults() {
      _get(Object.getPrototypeOf(Swirl.prototype), '_declareDefaults', this).call(this);
      this._skipPropsDelta = { x: 1, y: 1 };
    }

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
      var x = this.getPosValue('x'),
          y = this.getPosValue('y'),
          angle = 90 + Math.atan(y.delta / x.delta || 0) * (180 / Math.PI);
      if (x.delta < 0) {
        angle += 180;
      }
      this.positionDelta = {
        radius: Math.sqrt(x.delta * x.delta + y.delta * y.delta),
        angle: angle,
        x: x, y: y
      };
      this._o.radiusScale = this._o.radiusScale == null ? 1 : this._o.radiusScale;
      this._props.angleShift = _h2['default'].parseIfRand(this._o.angleShift || 0);
      this._props.radiusScale = _h2['default'].parseIfRand(this._o.radiusScale);
    }

    /*
     */
  }, {
    key: 'getPosValue',
    value: function getPosValue(name) {
      var optVal = this._o[name];
      if (optVal && typeof optVal === 'object') {
        var val = _h2['default'].parseDelta(name, optVal);
        return {
          start: val.start.value,
          end: val.end.value,
          delta: val.delta,
          units: val.end.unit
        };
      } else {
        var val = parseFloat(optVal || this._defaults[name]);
        return { start: val, end: val, delta: 0, units: 'px' };
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
    value: function _setProgress(progress) {
      var angle = this.positionDelta.angle; // + this._props.angleShift
      if (this._o.isSwirl) {
        angle += this.getSwirl(progress);
      }
      point = _h2['default'].getRadialPoint({
        angle: angle,
        radius: this.positionDelta.radius * progress * this._props.radiusScale,
        center: { x: this.positionDelta.x.start, y: this.positionDelta.y.start }
      });
      var x = point.x.toFixed(4),
          y = point.y.toFixed(4);

      this._props.x = this._o.ctx ? x : x + this.positionDelta.x.units;
      this._props.y = this._o.ctx ? y : y + this.positionDelta.y.units;
      _get(Object.getPrototypeOf(Swirl.prototype), '_setProgress', this).call(this, progress);
    }

    /*
     */
  }, {
    key: 'generateSwirl',
    value: function generateSwirl() {
      this._props.signRand = Math.round(_h2['default'].rand(0, 1)) ? -1 : 1;
      this._o.swirlSize = this._o.swirlSize == null ? 10 : this._o.swirlSize;
      this._o.swirlFrequency = this._o.swirlFrequency ? 3 : this._o.swirlFrequency;
      this._props.swirlSize = _h2['default'].parseIfRand(this._o.swirlSize);
      this._props.swirlFrequency = _h2['default'].parseIfRand(this._o.swirlFrequency);
    }

    /*
     */
  }, {
    key: 'getSwirl',
    value: function getSwirl(progress) {
      return this._props.signRand * this._props.swirlSize * Math.sin(this._props.swirlFrequency * progress);
    }
  }]);

  return Swirl;
})(_transit2['default']);

exports['default'] = Swirl;
module.exports = exports['default'];