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

var Arc = (function (_Bit) {
  _inherits(Arc, _Bit);

  function Arc() {
    _classCallCheck(this, Arc);

    _get(Object.getPrototypeOf(Arc.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Arc, [{
    key: '_declareDefaults',
    value: function _declareDefaults() {
      _get(Object.getPrototypeOf(Arc.prototype), '_declareDefaults', this).call(this);
      this._defaults.shape = 'path';
    }
  }, {
    key: 'draw',
    value: function draw() {
      _get(Object.getPrototypeOf(Arc.prototype), 'draw', this).call(this);

      var p = this._props;

      var radiusX = p.radiusX != null ? p.radiusX : p.radius;
      var radiusY = p.radiusY != null ? p.radiusY : p.radius;

      var x1 = p.x - radiusX;
      var x2 = p.x;
      var x3 = p.x + radiusX;

      var y1 = p.y - radiusY;
      var y2 = p.y;
      var y3 = p.y + radiusY;

      this.setAttr({ d: 'M' + x1 + ' ' + p.y + ' Q ' + x2 + ' ' + (p.y - 2 * p.radiusY) + ' ' + x3 + ' ' + p.y });
    }
  }, {
    key: 'getLength',
    value: function getLength() {
      var p = this._props;

      var radiusX = p.radiusX != null ? p.radiusX : p.radius;
      var radiusY = p.radiusY != null ? p.radiusY : p.radius;

      var len = .5 * Math.PI * (3 * (radiusX + radiusY) - Math.sqrt((3 * radiusX + radiusY) * (radiusX + 3 * radiusY)));

      return len;
    }
  }]);

  return Arc;
})(_bit2['default']);

exports['default'] = Arc;
module.exports = exports['default'];