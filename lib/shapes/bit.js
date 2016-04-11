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
    value: function _declareDefaults() {
      this._defaults = {
        ns: 'http://www.w3.org/2000/svg',
        ctx: null,

        shape: 'line',
        ratio: 1,
        radius: 50,
        radiusX: undefined,
        radiusY: undefined,
        points: 3,
        x: 0,
        y: 0,
        rx: 0,
        ry: 0,
        angle: 0,
        stroke: 'hotpink',
        'stroke-width': 2,
        'stroke-opacity': 1,
        fill: 'transparent',
        'fill-opacity': 1,
        'stroke-dasharray': '',
        'stroke-dashoffset': '',
        'stroke-linecap': ''
      };
      this._drawMap = ['stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill', 'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform'];
    }
  }, {
    key: '_vars',
    value: function _vars() {
      if (this._o.ctx && this._o.ctx.tagName === 'svg') {
        this.ctx = this._o.ctx;
      } else if (!this._o.el) {
        _h2['default'].error('You should pass a real context(ctx) to the bit');
        // # --> COVER return if not ctx and not el
        // # return true
      }
      this._state = {};this._drawMapLength = this._drawMap.length;
      // this.calcTransform();
    }

    // calcTransform () {
    //   var p      = this._props,
    //       rotate = `rotate(${p.angle}, ${p.x}, ${p.y})`;
    //   p.transform = `${rotate}`;
    // }

  }, {
    key: 'setAttr',
    value: function setAttr(attr, value) {
      if (typeof attr === 'object') {
        var keys = Object.keys(attr),
            len = keys.length,
            el = value || this.el;

        while (len--) {
          var key = keys[len],
              val = attr[key];
          el.setAttribute(key, val);
        }
      } else {
        this.el.setAttribute(attr, value);
      }
    }
  }, {
    key: 'setProp',
    value: function setProp(attr, value) {
      if (typeof attr === 'object') {
        for (var key in attr) {
          var val = attr[key];
          this._props[key] = val;
        }
      } else {
        this._props[attr] = value;
      }
    }
  }, {
    key: '_render',
    value: function _render() {
      this.isRendered = true;
      if (this._o.el != null) {
        this.el = this._o.el;
        this.isForeign = true;
      } else {
        this.el = document.createElementNS(this._props.ns, this._props.shape);
        !this._o.isDrawLess && this.draw();this.ctx.appendChild(this.el);
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      this._props.length = this.getLength();

      var len = this._drawMapLength;
      while (len--) {
        var name = this._drawMap[len];
        switch (name) {
          case 'stroke-dasharray':
          case 'stroke-dashoffset':
            this.castStrokeDash(name);
          // # name is 'stroke-dashoffset' and console.log this._props[name]
        }
        this.setAttrIfChanged(name, this._props[name]);
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
  }, {
    key: 'setAttrsIfChanged',
    value: function setAttrsIfChanged(name, value) {
      var keys = Object.keys(name),
          len = keys.length;
      while (len--) {
        var key = keys[len],
            value = name[key];
        this.setAttrIfChanged(key, value);
      }
    }
  }, {
    key: 'setAttrIfChanged',
    value: function setAttrIfChanged(name, value) {
      if (this._state[name] !== value) {
        this.el.setAttribute(name, value);
        this._state[name] = value;
      }
    }
  }, {
    key: 'getLength',
    value: function getLength() {
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
  }]);

  return Bit;
})(_module3['default']);

exports['default'] = Bit;
module.exports = exports['default'];