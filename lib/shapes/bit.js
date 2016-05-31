'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _module2 = require('../module');

var _module3 = _interopRequireDefault(_module2);

var _h = require('../h');

var _h2 = _interopRequireDefault(_h);

var Bit = (function (_Module) {
  _inherits(Bit, _Module);

  function Bit() {
    _classCallCheck(this, Bit);

    _get(Object.getPrototypeOf(Bit.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Bit, [{
    key: '_declareDefaults',

    /*
      Method to declare module's defaults.
      @private
    */
    value: function _declareDefaults() {
      this._defaults = {
        'ns': 'http://www.w3.org/2000/svg',
        'tag': 'ellipse',
        'parent': document.body,
        'ratio': 1,
        'radius': 50,
        'radiusX': null,
        'radiusY': null,
        'stroke': 'hotpink',
        'stroke-dasharray': '',
        'stroke-dashoffset': '',
        'stroke-linecap': '',
        'stroke-width': 2,
        'stroke-opacity': 1,
        'fill': 'transparent',
        'fill-opacity': 1,
        'width': 0,
        'height': 0
      };
      this._drawMap = ['stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill', 'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform'];
    }
  }, {
    key: '_vars',
    value: function _vars() {
      this._state = {};
      this._drawMapLength = this._drawMap.length;
    }

    /*
      Method for initial render of the shape.
      @private
    */
  }, {
    key: '_render',
    value: function _render() {
      if (this._isRendered) {
        return;
      }
      // set `_isRendered` hatch
      this._isRendered = true;
      // create `SVG` canvas to draw in
      this._createSVGCanvas();
      // set canvas size
      this._setCanvasSize();
      // draw the initial state
      this._draw();
      // append the canvas to the parent from props
      this._props.parent.appendChild(this._canvas);
    }

    /*
      Method to create `SVG` canvas to draw in.
      @private
    */
  }, {
    key: '_createSVGCanvas',
    value: function _createSVGCanvas() {
      var p = this._props;
      // create canvas - `svg` element to draw in
      this._canvas = document.createElementNS(p.ns, 'svg');
      // create the element shape element and add it to the canvas
      this.el = document.createElementNS(p.ns, p.tag);
      this._canvas.appendChild(this.el);
    }

    /*
      Method to set size of the _canvas.
      @private
    */
  }, {
    key: '_setCanvasSize',
    value: function _setCanvasSize() {
      var p = this._props,
          style = this._canvas.style;

      style.display = 'block';
      style.width = '100%';
      style.height = '100%';
      style.left = '0px';
      style.top = '0px';
    }

    /*
      Method to draw the shape.
      Called on every frame.
      @private
    */
  }, {
    key: '_draw',
    value: function _draw() {
      this._props.length = this._getLength();

      var state = this._state,
          props = this._props;

      var len = this._drawMapLength;
      while (len--) {
        var name = this._drawMap[len];
        switch (name) {
          case 'stroke-dasharray':
          case 'stroke-dashoffset':
            this.castStrokeDash(name);
        }
        this._setAttrIfChanged(name, this._props[name]);
      }
      this._state.radius = this._props.radius;
    }
  }, {
    key: 'castStrokeDash',
    value: function castStrokeDash(name) {
      // # if array of values
      var p = this._props;
      if (_h2['default'].isArray(p[name])) {
        var stroke = '';
        for (var i = 0; i < p[name].length; i++) {
          var dash = p[name][i],
              cast = dash.unit === '%' ? this.castPercent(dash.value) : dash.value;
          stroke += cast + ' ';
        }
        p[name] = stroke === '0 ' ? stroke = '' : stroke;
        // console.log(`set: ${stroke}`)
        return p[name] = stroke;
      }
      // # if single value
      if (typeof p[name] === 'object') {
        stroke = p[name].unit === '%' ? this.castPercent(p[name].value) : p[name].value;
        p[name] = stroke === 0 ? stroke = '' : stroke;
      }
    }
  }, {
    key: 'castPercent',
    value: function castPercent(percent) {
      return percent * (this._props.length / 100);
    }

    /*
      Method to set props to attributes and cache the values.
      @private
    */
  }, {
    key: '_setAttrIfChanged',
    value: function _setAttrIfChanged(name, value) {
      if (this._state[name] !== value) {
        // this.el.style[name] = value;
        this.el.setAttribute(name, value);
        this._state[name] = value;
      }
    }

    /*
      Method to length of the shape.
      @private
      @returns {Number} Length of the shape.
    */
  }, {
    key: '_getLength',
    value: function _getLength() {
      var p = this._props,
          len = 0,
          isGetLength = !!(this.el && this.el.getTotalLength);

      if (isGetLength && this.el.getAttribute('d')) {
        len = this.el.getTotalLength();
      } else {
        len = 2 * (p.radiusX != null ? p.radiusX : p.radius);
      }
      return len;
    }

    /*
      Method to calculate total sum between points.
      @private
      @param {Array} Array of points.
      @returns {Number} Distance bewtween all points.
    */
  }, {
    key: '_getPointsPerimiter',
    value: function _getPointsPerimiter(points) {
      var sum = 0;

      for (var i = 1; i < points.length; i++) {
        sum += this._pointsDelta(points[i - 1], points[i]);
      }

      sum += this._pointsDelta(points[0], _h2['default'].getLastItem(points));
      return sum;
    }

    /*
      Method to get delta from two points.
      @private
      @param {Object} Point 1.
      @param {Object} Point 2.
      @returns {Number} Distance between the pooints.
    */
  }, {
    key: '_pointsDelta',
    value: function _pointsDelta(point1, point2) {
      var dx = Math.abs(point1.x - point2.x),
          dy = Math.abs(point1.y - point2.y);
      return Math.sqrt(dx * dx + dy * dy);
    }

    /*
      Method to set module's size.
      @private
      @param {Number} Module width.
      @param {Number} Module height.
    */
  }, {
    key: '_setSize',
    value: function _setSize(width, height) {
      var p = this._props;
      p.width = width;
      p.height = height;
      this._draw();
    }
  }]);

  return Bit;
})(_module3['default']);

exports['default'] = Bit;
module.exports = exports['default'];