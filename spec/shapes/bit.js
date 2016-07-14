(function() {
  var Bit, bit, h, ns, svg;

  Bit = mojs.shapesMap.getShape('bit');

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  bit = new Bit({
    ctx: svg
  });

  h = mojs.h;

  describe('Bit ->', function() {
    describe('extention ->', function() {
      return it('should extend Module', function() {
        bit = new Bit;
        return expect(bit instanceof mojs.Module).toBe(true);
      });
    });
    describe('_defaults', function() {
      return it('should have defaults', function() {
        var defaults;
        bit = new Bit;
        defaults = bit._defaults;
        expect(defaults['ns']).toBe('http://www.w3.org/2000/svg');
        expect(defaults['ratio']).toBe(1);
        expect(defaults['radius']).toBe(50);
        expect(defaults['radiusX']).toBe(null);
        expect(defaults['radiusY']).toBe(null);
        expect(defaults['stroke']).toBe('hotpink');
        expect(defaults['stroke-width']).toBe(2);
        expect(defaults['stroke-opacity']).toBe(1);
        expect(defaults['fill']).toBe('transparent');
        expect(defaults['fill-opacity']).toBe(1);
        expect(defaults['stroke-dasharray']).toBe('');
        expect(defaults['stroke-dashoffset']).toBe('');
        expect(defaults['stroke-linecap']).toBe('');
        expect(defaults['width']).toBe(0);
        return expect(defaults['height']).toBe(0);
      });
    });
    describe('_render method ->', function() {
      it('should set `_isRendered` to `true`', function() {
        bit = new Bit;
        bit._isRendered = false;
        bit._render();
        return expect(bit._isRendered).toBe(true);
      });
      it('should call `_createSVGCanvas` method', function() {
        bit = new Bit;
        bit._isRendered = false;
        spyOn(bit, '_createSVGCanvas');
        bit._render();
        return expect(bit._createSVGCanvas).toHaveBeenCalled();
      });
      it('should `return` if `_isRendered`', function() {
        bit = new Bit;
        spyOn(bit, '_createSVGCanvas');
        bit._render();
        return expect(bit._createSVGCanvas).not.toHaveBeenCalled();
      });
      it('should call `_setCanvasSize` method', function() {
        bit = new Bit;
        bit._isRendered = false;
        spyOn(bit, '_setCanvasSize');
        bit._render();
        return expect(bit._setCanvasSize).toHaveBeenCalled();
      });
      return it('should append `_canvas` to the `parent`', function() {
        bit = new Bit;
        bit._isRendered = false;
        spyOn(bit._props.parent, 'appendChild').and.callThrough();
        bit._render();
        expect(bit._props.parent.appendChild).toHaveBeenCalledWith(bit._canvas);
        return expect(bit._canvas.parentNode).toBe(bit._props.parent);
      });
    });
    describe('_createSVGCanvas method ->', function() {
      it('should create _canvas', function() {
        bit = new Bit;
        bit._canvas = null;
        bit._createSVGCanvas();
        return expect(bit._canvas.tagName.toLowerCase()).toBe('svg');
      });
      return it('should create `el`', function() {
        bit = new Bit;
        bit.el = null;
        bit._createSVGCanvas();
        expect(bit.el.tagName.toLowerCase()).toBe(bit._props.tag);
        return expect(bit.el.parentNode).toBe(bit._canvas);
      });
    });
    describe('_setCanvasSize method ->', function() {
      return it('should set size of the `_canvas`', function() {
        var height, style, width;
        width = 20;
        height = 50;
        bit = new Bit({
          width: width,
          height: height
        });
        style = bit._canvas.style;
        style.width = '';
        style.height = '';
        bit._setCanvasSize();
        expect(style.width).toBe('100%');
        expect(style.width).toBe('100%');
        expect(style.left).toBe('0px');
        expect(style.top).toBe('0px');
        return expect(style.display).toBe('block');
      });
    });
    describe('_draw method ->', function() {
      it('should set attributes', function() {
        var fill, stroke, strokeArray, strokeOffset, strokeWidth, transform;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          'stroke': '#0f0',
          'stroke-width': 3,
          'fill': '#0ff',
          'stroke-dasharray': 100,
          'stroke-dashoffset': 50,
          'angle': 45
        });
        bit._draw();
        stroke = bit.el.getAttribute('stroke');
        strokeWidth = bit.el.getAttribute('stroke-width');
        fill = bit.el.getAttribute('fill');
        strokeArray = bit.el.getAttribute('stroke-dasharray');
        strokeOffset = bit.el.getAttribute('stroke-dashoffset');
        transform = bit.el.getAttribute('transform');
        expect(stroke).toBe('#0f0');
        expect(strokeWidth).toBe('3');
        expect(fill).toBe('#0ff');
        expect(strokeArray).toBe('100');
        return expect(strokeOffset).toBe('50');
      });
      it('should save its state', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          x: 20,
          y: 20,
          stroke: '#0f0',
          'stroke-width': 3,
          'fill': '#0ff',
          'fill-opacity': '#f0f',
          'stroke-dasharray': 100,
          'stroke-dashoffset': 50,
          'stroke-linecap': 'round',
          'stroke-opacity': .5,
          angle: 45
        });
        bit._draw();
        expect(bit._state['stroke']).toBe('#0f0');
        expect(bit._state['stroke-width']).toBe(3);
        expect(bit._state['stroke-opacity']).toBe(.5);
        expect(bit._state['stroke-dasharray']).toBe(100);
        expect(bit._state['stroke-dashoffset']).toBe(50);
        expect(bit._state['stroke-linecap']).toBe('round');
        expect(bit._state['fill']).toBe('#0ff');
        return expect(bit._state['fill-opacity']).toBe('#f0f');
      });
      it('should not set attribute if property not changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          'stroke-width': 3
        });
        bit._draw();
        spyOn(bit.el, 'setAttribute');
        bit._draw();
        return expect(bit.el.setAttribute).not.toHaveBeenCalled();
      });
      return it('should set attribute if property changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          'stroke-width': 3
        });
        spyOn(bit.el, 'setAttribute');
        bit._setProp({
          'stroke-width': 4
        });
        bit._draw();
        return expect(bit.el.setAttribute).toHaveBeenCalled();
      });
    });
    describe('castStrokeDash method ->', function() {
      it('should not cast pixel values', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit._props['stroke-dashoffset'] = {
          unit: 'px',
          value: 100
        };
        bit.castStrokeDash('stroke-dashoffset');
        return expect(bit._props['stroke-dashoffset']).toBe(100);
      });
      it('should cast % values', function() {
        bit = new Bit({
          radius: 100
        });
        bit._draw();
        bit._props['stroke-dashoffset'] = {
          unit: '%',
          value: 100
        };
        bit.castStrokeDash('stroke-dashoffset');
        return expect(bit._props['stroke-dashoffset']).toBe(bit._props.length);
      });
      it('should not set 0 value >> ff issue fix', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit._props['stroke-dasharray'] = {
          unit: 'px',
          value: 0
        };
        bit.castStrokeDash('stroke-dasharray');
        return expect(bit._props['stroke-dasharray']).toBe('');
      });
      return it('should not set 0 value >> ff issue fix #2', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit._props['stroke-dasharray'] = [
          {
            unit: 'px',
            value: 0
          }
        ];
        bit.castStrokeDash('stroke-dasharray');
        return expect(bit._props['stroke-dasharray']).toBe('');
      });
    });
    describe('stroke-dash value setting ->', function() {
      it('should set the property from an array', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit._setProp('stroke-dasharray', [
          {
            value: 100,
            unit: 'px'
          }
        ]);
        bit._draw();
        return expect(bit._props['stroke-dasharray']).toBe('100 ');
      });
      it('should cast % values', function() {
        var dash;
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit._draw();
        bit._setProp('stroke-dasharray', [
          {
            value: 100,
            unit: 'px'
          }, {
            value: 50,
            unit: '%'
          }
        ]);
        bit._draw();
        dash = (bit._props.length / 100) * 50;
        return expect(bit._props['stroke-dasharray']).toBe("100 " + dash + " ");
      });
      return it('should cast % single values', function() {
        var dash;
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit._setProp('stroke-dasharray', {
          value: 25,
          unit: '%'
        });
        bit._draw();
        dash = (bit._props.length / 100) * 25;
        return expect(bit._props['stroke-dasharray']).toBe(dash);
      });
    });
    describe('castPercent method ->', function() {
      return it('should cast % values to pixels', function() {
        var pixels;
        bit = new Bit({
          radius: 100
        });
        bit._draw();
        pixels = bit.castPercent(50);
        return expect(pixels).toBe((bit._props.length / 100) * 50);
      });
    });
    return describe('setSize method ->', function() {
      it('should set width and height of the module', function() {
        var p;
        bit = new Bit({
          radius: 100
        });
        bit._setSize(200, 100);
        p = bit._props;
        expect(p.width).toBe(200);
        return expect(p.height).toBe(100);
      });
      return it('should call _draw method', function() {
        bit = new Bit({
          radius: 100
        });
        spyOn(bit, '_draw');
        bit._setSize(200, 100);
        return expect(bit._draw).toHaveBeenCalled();
      });
    });
  });

}).call(this);
