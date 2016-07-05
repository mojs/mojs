(function() {
  var Bit, Custom, custom, ns, parent,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Custom = mojs.shapesMap.getShape('custom');

  Bit = mojs.shapesMap.getShape('bit');

  ns = 'http://www.w3.org/2000/svg';

  parent = document.createElement('div');

  custom = new Custom({
    parent: parent
  });

  describe('Custom ->', function() {
    it('should extend Bit', function() {
      return expect(custom instanceof Bit).toBe(true);
    });
    describe('getShape method', function() {
      return it('should return an empty string', function() {
        custom = new Custom({
          parent: parent
        });
        return expect(custom.getShape()).toEqual('');
      });
    });
    describe('_declareDefaults method', function() {
      it('should call super', function() {
        custom = new Custom({
          parent: parent
        });
        spyOn(Bit.prototype, '_declareDefaults');
        custom._declareDefaults();
        return expect(Bit.prototype._declareDefaults).toHaveBeenCalled();
      });
      it('should call super', function() {
        custom = new Custom({
          parent: parent
        });
        spyOn(Bit.prototype, '_declareDefaults');
        custom._declareDefaults();
        return expect(Bit.prototype._declareDefaults).toHaveBeenCalled();
      });
      it('should set tag to path', function() {
        custom = new Custom({
          parent: parent
        });
        return expect(custom._defaults.tag).toBe('path');
      });
      it('should set parent to null', function() {
        custom = new Custom({
          parent: parent
        });
        return expect(custom._defaults.parent).toBe(null);
      });
      return it('should remove strokeWidth from _drawMap', function() {
        var item, _i, _len, _ref, _results;
        custom = new Custom({
          parent: parent
        });
        _ref = custom._drawMap;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(expect(item).not.toBe('stroke-width'));
        }
        return _results;
      });
    });
    describe('_render method ->', function() {
      it('should set innerHtml of parent with the string', function() {
        var Shape, g, path, svg;
        Shape = (function(_super) {
          __extends(Shape, _super);

          function Shape() {
            return Shape.__super__.constructor.apply(this, arguments);
          }

          Shape.prototype.getShape = function() {
            return '<path />';
          };

          return Shape;

        })(Custom);
        custom = new Shape({
          parent: parent
        });
        custom._isRendered = false;
        custom._props.parent.innerHTML = '';
        spyOn(custom, '_setCanvasSize');
        custom._render();
        svg = custom._props.parent.firstChild;
        g = svg.firstChild;
        path = g.firstChild;
        expect(svg.tagName.toLowerCase()).toBe('svg');
        expect(svg.getAttribute('id').toLowerCase()).toBe('js-mojs-shape-canvas');
        expect(g.tagName.toLowerCase()).toBe('g');
        expect(g.getAttribute('id').toLowerCase()).toBe('js-mojs-shape-el');
        return expect(path.tagName.toLowerCase()).toBe('path');
      });
      it('should find el', function() {
        var Shape;
        Shape = (function(_super) {
          __extends(Shape, _super);

          function Shape() {
            return Shape.__super__.constructor.apply(this, arguments);
          }

          Shape.prototype.getShape = function() {
            return '<line />';
          };

          return Shape;

        })(Custom);
        custom = new Shape({
          parent: parent
        });
        custom._isRendered = false;
        custom._props.parent.innerHTML = '';
        custom._render();
        expect(custom._canvas.tagName.toLowerCase()).toBe('svg');
        expect(custom._canvas.parentNode).toBe(custom._props.parent);
        expect(custom.el.tagName.toLowerCase()).toBe('g');
        return expect(custom.el.parentNode).toBe(custom._canvas);
      });
      it('should call _setCanvasSize', function() {
        custom = new Custom({
          parent: parent
        });
        spyOn(custom, '_setCanvasSize');
        custom._isRendered = false;
        custom._render();
        return expect(custom._setCanvasSize).toHaveBeenCalled();
      });
      it('should call _setCanvasSize', function() {
        custom = new Custom({
          parent: parent
        });
        spyOn(custom, 'getLength');
        custom._isRendered = false;
        custom._render();
        return expect(custom.getLength).toHaveBeenCalled();
      });
      it('should set _isRendered to true', function() {
        custom = new Custom({
          parent: parent
        });
        custom._isRendered = false;
        custom._render();
        return expect(custom._isRendered).toBe(true);
      });
      it('should render just once', function() {
        custom = new Custom({
          parent: parent
        });
        custom._props.parent.innerHTML = '';
        custom._render();
        return expect(custom._props.parent.innerHTML).toBe('');
      });
      return it('should set _length', function() {
        custom = new Custom({
          parent: parent
        });
        custom._isRendered = false;
        custom._length = null;
        custom._render();
        return expect(custom._length).toBe(custom.getLength());
      });
    });
    describe('_getScale method ->', function() {
      it('should calculate x scale', function() {
        var radiusX;
        radiusX = 25;
        custom = new Custom({
          radiusX: radiusX,
          parent: parent
        });
        custom._getScale();
        return expect(custom._props.scaleX).toBe((2 * radiusX) / 100);
      });
      it('should fallback to radius value', function() {
        var radiusX;
        radiusX = 25;
        custom = new Custom({
          radius: radiusX,
          parent: parent
        });
        custom._getScale();
        return expect(custom._props.scaleX).toBe((2 * radiusX) / 100);
      });
      it('should calculate y scale', function() {
        var radiusY;
        radiusY = 25;
        custom = new Custom({
          radiusY: radiusY,
          parent: parent
        });
        custom._getScale();
        return expect(custom._props.scaleY).toBe((2 * radiusY) / 100);
      });
      it('should fallback to radius value', function() {
        var radiusY;
        radiusY = 25;
        custom = new Custom({
          radius: radiusY,
          parent: parent
        });
        custom._getScale();
        return expect(custom._props.scaleY).toBe((2 * radiusY) / 100);
      });
      it('should calculate max scale #1', function() {
        var p, radiusY;
        radiusY = 25;
        custom = new Custom({
          radiusY: radiusY,
          radius: 100,
          parent: parent
        });
        custom._getScale();
        p = custom._props;
        return expect(custom._props.maxScale).toBe(Math.max(p.scaleX, p.scaleY));
      });
      it('should calculate max scale #2', function() {
        var p, radiusY;
        radiusY = 125;
        custom = new Custom({
          radiusY: radiusY,
          radius: 100,
          parent: parent
        });
        custom._getScale();
        p = custom._props;
        return expect(custom._props.maxScale).toBe(Math.max(p.scaleX, p.scaleY));
      });
      it('should calculate max scale #2', function() {
        var p, radiusX;
        radiusX = 125;
        custom = new Custom({
          radiusX: radiusX,
          radius: 100,
          parent: parent
        });
        custom._getScale();
        p = custom._props;
        return expect(custom._props.maxScale).toBe(Math.max(p.scaleX, p.scaleY));
      });
      it('should calculate max scale #3', function() {
        var p, radiusX;
        radiusX = 25;
        custom = new Custom({
          radiusX: radiusX,
          radius: 100,
          parent: parent
        });
        custom._getScale();
        p = custom._props;
        return expect(custom._props.maxScale).toBe(Math.max(p.scaleX, p.scaleY));
      });
      it('should calculate x shift', function() {
        var height, width;
        width = 100;
        height = 200;
        custom = new Custom({
          width: width,
          height: height,
          parent: parent
        });
        custom._getScale();
        return expect(custom._props.shiftX).toBe(width / 2 - 50 * custom._props.scaleX);
      });
      it('should calculate y shift', function() {
        var height, width;
        width = 100;
        height = 200;
        custom = new Custom({
          width: width,
          height: height,
          parent: parent
        });
        custom._getScale();
        return expect(custom._props.shiftY).toBe(height / 2 - 50 * custom._props.scaleY);
      });
      return it('should return transform string', function() {
        var height, p, width;
        width = 100;
        height = 200;
        custom = new Custom({
          width: width,
          height: height,
          parent: parent
        });
        p = custom._props;
        return expect(custom._getScale()).toBe("translate(" + p.shiftX + ", " + p.shiftY + ") scale(" + p.scaleX + ", " + p.scaleY + ")");
      });
    });
    describe('_draw method ->', function() {
      it('should call super', function() {
        custom = new Custom({
          parent: parent
        });
        spyOn(Bit.prototype, '_draw');
        custom._draw();
        return expect(Bit.prototype._draw).toHaveBeenCalled();
      });
      it('should set transform on el', function() {
        var height, isTr1, isTr2, width;
        width = 100;
        height = 200;
        custom = new Custom({
          width: width,
          height: height,
          parent: parent
        });
        custom.el.setAttribute('transform', '');
        custom._draw();
        isTr1 = custom.el.getAttribute('transform') === 'translate(0, 50) scale(1, 1)';
        isTr2 = custom.el.getAttribute('transform') === 'translate(0 50) scale(1)';
        return expect(isTr1 || isTr2).toBe(true);
      });
      it('should not set transform on el if nothing changed', function() {
        var height, width;
        width = 100;
        height = 200;
        custom = new Custom({
          width: width,
          height: height,
          parent: parent
        });
        custom._draw();
        spyOn(custom.el, 'setAttribute');
        custom._draw();
        expect(custom.el.setAttribute).not.toHaveBeenCalled();
        expect(custom._state['radiusX']).toBe(custom._props['radiusX']);
        expect(custom._state['radiusY']).toBe(custom._props['radiusY']);
        return expect(custom._state['radius']).toBe(custom._props['radius']);
      });
      return it('should set stroke-width on el', function() {
        var height, width;
        width = 100;
        height = 200;
        custom = new Custom({
          width: width,
          height: height,
          parent: parent
        });
        custom._draw();
        return expect(custom.el.getAttribute('stroke-width')).toBe("" + custom._props['stroke-width']);
      });
    });
    describe('getLength method', function() {
      return it('should return 100', function() {
        custom = new Custom({
          parent: parent
        });
        return expect(custom.getLength()).toBe(100);
      });
    });
    return describe('_getLength method', function() {
      return it('should return _length property', function() {
        custom = new Custom({
          parent: parent
        });
        custom._length = 200;
        return expect(custom._getLength()).toBe(200);
      });
    });
  });

}).call(this);
