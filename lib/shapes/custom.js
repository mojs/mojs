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

var Custom = (function (_Bit) {
  _inherits(Custom, _Bit);

  function Custom() {
    _classCallCheck(this, Custom);

    _get(Object.getPrototypeOf(Custom.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Custom, [{
    key: '_declareDefaults',

    /*
      Method to declare module's defaults.
      @private
      @overrides @ Bit
    */
    value: function _declareDefaults() {
      _get(Object.getPrototypeOf(Custom.prototype), '_declareDefaults', this).call(this);

      this._defaults.tag = 'path';
      this._defaults.parent = null;
    }

    /*
      Method to get shape to set on module's path.
      @public
      @returns {String} Empty string.
    */
  }, {
    key: 'getShape',
    value: function getShape() {
      return '';
    }

    /*
      Method to get shape perimeter length.
      @public
      @returns {Number} Default length string.
    */
  }, {
    key: 'getLength',
    value: function getLength() {
      return 100;
    }

    /*
      Method to draw the shape.
      Called on every frame.
      @private
      @overrides @ Bit
    */
  }, {
    key: '_draw',
    value: function _draw() {
      _get(Object.getPrototypeOf(Custom.prototype), '_draw', this).call(this);
      this._setAttrIfChanged('transform', this._getScale());
    }

    /*
      Method for initial render of the shape.
      @private
      @overrides @ Bit
    */
  }, {
    key: '_render',
    value: function _render() {
      if (this._isRendered) {
        return;
      }
      this._isRendered = true;

      this.getLength();

      var p = this._props;
      p.parent.innerHTML = '<svg id="js-mojs-shape-canvas" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><g id="js-mojs-shape-el">' + this.getShape() + '</g></svg>';

      this._canvas = p.parent.querySelector('#js-mojs-shape-canvas');
      this.el = p.parent.querySelector('#js-mojs-shape-el');
      this._setCanvasSize();
    }

    /*
      Method to get scales for the shape.
      @private
      @mutates @props
    */
  }, {
    key: '_getScale',
    value: function _getScale() {
      var p = this._props,
          radiusX = p.radiusX ? p.radiusX : p.radius,
          radiusY = p.radiusY ? p.radiusY : p.radius;

      p.scaleX = 2 * radiusX / 100;
      p.scaleY = 2 * radiusY / 100;

      p.shiftX = p.width / 2 - 50 + p.scaleX * 50;
      p.shiftY = p.height / 2 - 50 + p.scaleY * 50;
      var translate = 'translate(' + p.shiftX + ', ' + p.shiftY + ')';
      return translate + ' scale(' + p.scaleX + ', ' + p.scaleY + ')';
    }

    /*
      Method to length of the shape.
      @private
      @returns {Number} Length of the shape.
    */
  }, {
    key: '_getLength',
    value: function _getLength() {
      return this._length;
    }
  }]);

  return Custom;
})(_bit2['default']);

exports['default'] = Custom;
module.exports = exports['default'];