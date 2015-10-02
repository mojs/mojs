(function() {
  var Bit, h;

  h = require('../h');

  Bit = (function() {
    Bit.prototype.ns = 'http://www.w3.org/2000/svg';

    Bit.prototype.type = 'line';

    Bit.prototype.ratio = 1;

    Bit.prototype.defaults = {
      radius: 50,
      radiusX: void 0,
      radiusY: void 0,
      points: 3,
      x: 0,
      y: 0,
      angle: 0,
      'stroke': 'hotpink',
      'stroke-width': 2,
      'stroke-opacity': 1,
      'fill': 'transparent',
      'fill-opacity': 1,
      'stroke-dasharray': '',
      'stroke-dashoffset': '',
      'stroke-linecap': ''
    };

    function Bit(o) {
      this.o = o != null ? o : {};
      this.init();
      this;
    }

    Bit.prototype.init = function() {
      this.vars();
      this.render();
      return this;
    };

    Bit.prototype.vars = function() {
      if (this.o.ctx && this.o.ctx.tagName === 'svg') {
        this.ctx = this.o.ctx;
      } else if (!this.o.el) {
        h.error('You should pass a real context(ctx) to the bit');
      }
      this.state = {};
      this.drawMapLength = this.drawMap.length;
      this.extendDefaults();
      return this.calcTransform();
    };

    Bit.prototype.calcTransform = function() {
      var rotate;
      rotate = "rotate(" + this.props.angle + ", " + this.props.x + ", " + this.props.y + ")";
      return this.props.transform = "" + rotate;
    };

    Bit.prototype.extendDefaults = function() {
      var key, value, _ref, _results;
      if (this.props == null) {
        this.props = {};
      }
      _ref = this.defaults;
      _results = [];
      for (key in _ref) {
        value = _ref[key];
        _results.push(this.props[key] = this.o[key] != null ? this.o[key] : value);
      }
      return _results;
    };

    Bit.prototype.setAttr = function(attr, value) {
      var el, key, keys, len, val, _results;
      if (typeof attr === 'object') {
        keys = Object.keys(attr);
        len = keys.length;
        el = value || this.el;
        _results = [];
        while (len--) {
          key = keys[len];
          val = attr[key];
          _results.push(el.setAttribute(key, val));
        }
        return _results;
      } else {
        return this.el.setAttribute(attr, value);
      }
    };

    Bit.prototype.setProp = function(attr, value) {
      var key, val, _results;
      if (typeof attr === 'object') {
        _results = [];
        for (key in attr) {
          val = attr[key];
          _results.push(this.props[key] = val);
        }
        return _results;
      } else {
        return this.props[attr] = value;
      }
    };

    Bit.prototype.render = function() {
      this.isRendered = true;
      if (this.o.el != null) {
        this.el = this.o.el;
        return this.isForeign = true;
      } else {
        this.el = document.createElementNS(this.ns, this.type || 'line');
        !this.o.isDrawLess && this.draw();
        return this.ctx.appendChild(this.el);
      }
    };

    Bit.prototype.drawMap = ['stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill', 'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform'];

    Bit.prototype.draw = function() {
      var len, name;
      this.props.length = this.getLength();
      len = this.drawMapLength;
      while (len--) {
        name = this.drawMap[len];
        switch (name) {
          case 'stroke-dasharray':
          case 'stroke-dashoffset':
            this.castStrokeDash(name);
        }
        this.setAttrsIfChanged(name, this.props[name]);
      }
      return this.state.radius = this.props.radius;
    };

    Bit.prototype.castStrokeDash = function(name) {
      var cast, dash, i, stroke, _i, _len, _ref;
      if (h.isArray(this.props[name])) {
        stroke = '';
        _ref = this.props[name];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          dash = _ref[i];
          cast = dash.unit === '%' ? this.castPercent(dash.value) : dash.value;
          stroke += "" + cast + " ";
        }
        this.props[name] = stroke === '0 ' ? stroke = '' : stroke;
        return this.props[name] = stroke;
      }
      if (typeof this.props[name] === 'object') {
        stroke = this.props[name].unit === '%' ? this.castPercent(this.props[name].value) : this.props[name].value;
        return this.props[name] = stroke === 0 ? stroke = '' : stroke;
      }
    };

    Bit.prototype.castPercent = function(percent) {
      return percent * (this.props.length / 100);
    };

    Bit.prototype.setAttrsIfChanged = function(name, value) {
      var key, keys, len, _results;
      if (typeof name === 'object') {
        keys = Object.keys(name);
        len = keys.length;
        _results = [];
        while (len--) {
          key = keys[len];
          value = name[key];
          _results.push(this.setAttrIfChanged(key, value));
        }
        return _results;
      } else {
        if (value == null) {
          value = this.props[name];
        }
        return this.setAttrIfChanged(name, value);
      }
    };

    Bit.prototype.setAttrIfChanged = function(name, value) {
      if (this.isChanged(name, value)) {
        this.el.setAttribute(name, value);
        return this.state[name] = value;
      }
    };

    Bit.prototype.isChanged = function(name, value) {
      if (value == null) {
        value = this.props[name];
      }
      return this.state[name] !== value;
    };

    Bit.prototype.getLength = function() {
      var _ref;
      if ((((_ref = this.el) != null ? _ref.getTotalLength : void 0) != null) && this.el.getAttribute('d')) {
        return this.el.getTotalLength();
      } else {
        return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
      }
    };

    return Bit;

  })();

  module.exports = Bit;

}).call(this);
