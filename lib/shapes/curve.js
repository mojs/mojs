// istanbul ignore next
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _bit = require('./bit');

var _bit2 = _interopRequireDefault(_bit);

var Curve = (function (_Bit) {
  _inherits(Curve, _Bit);

  function Curve() {
    _classCallCheck(this, Curve);

    _get(Object.getPrototypeOf(Curve.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Curve, [{
    key: '_declareDefaults',

    /*
      Method to declare module's defaults.
      @private
      @overrides @ Bit
    */
    value: function _declareDefaults() {
      _get(Object.getPrototypeOf(Curve.prototype), '_declareDefaults', this).call(this);
      this._defaults.shape = 'path';
    }

    /*
      Method to draw the module.
      @private
      @overrides @ Bit
    */
  }, {
    key: '_draw',
    value: function _draw() {
      _get(Object.getPrototypeOf(Curve.prototype), '_draw', this).call(this);
      var p = this._props;

      var radiusX = p.radiusX != null ? p.radiusX : p.radius;
      var radiusY = p.radiusY != null ? p.radiusY : p.radius;

      var isRadiusX = radiusX === this._prevRadiusX;
      var isRadiusY = radiusY === this._prevRadiusY;
      var isPoints = p.points === this._prevPoints;
      // skip if nothing changed
      if (isRadiusX && isRadiusY && isPoints) {
        return;
      }

      var x = 1 * p.x;
      var y = 1 * p.y;
      var x1 = x - radiusX;
      var x2 = x + radiusX;

      var d = 'M' + x1 + ' ' + y + ' Q ' + x + ' ' + (p.y - 2 * radiusY) + ' ' + x2 + ' ' + y;

      // don't set the `d` attribute if nothing changed
      if (this._prevD === d) {
        return;
      }
      // set the `d` attribute and save it to `_prevD`
      this.el.setAttribute('d', d);
      // save the properties
      this._prevPoints = p.points;
      this._prevRadiusX = radiusX;
      this._prevRadiusY = radiusY;
    }
  }, {
    key: '_getLength',
    value: function _getLength() {
      var p = this._props;

      var radiusX = p.radiusX != null ? p.radiusX : p.radius;
      var radiusY = p.radiusY != null ? p.radiusY : p.radius;

      var dRadius = radiusX + radiusY;
      var sqrt = Math.sqrt((3 * radiusX + radiusY) * (radiusX + 3 * radiusY));

      return .5 * Math.PI * (3 * dRadius - sqrt);
    }
  }]);

  return Curve;
})(_bit2['default']);

exports['default'] = Curve;
module.exports = exports['default'];