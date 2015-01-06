(function() {
  var Bit, bit, ns, svg;

  Bit = mojs.Bit;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  bit = new Bit({
    ctx: svg
  });

  describe('Bit', function() {
    describe('context', function() {
      return it('context passed should be real svg node', function() {
        expect(function() {
          return new Bit;
        }).toThrow();
        expect(function() {
          return bit = new Bit({
            ctx: 'a'
          });
        }).toThrow();
        return expect(function() {
          return bit = new Bit({
            ctx: svg
          });
        }).not.toThrow();
      });
    });
    describe('methods', function() {
      return it('should have vars method', function() {
        return expect(bit.vars).toBeDefined();
      });
    });
    describe('render method', function() {
      it('should have render method', function() {
        return expect(bit.render).toBeDefined();
      });
      it('should call render method on init', function() {
        return expect(bit.isRendered).toBe(true);
      });
      it('should add self to context', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg
        });
        return expect(svg.firstChild).toBeTruthy();
      });
      it('should run draw method', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg
        });
        spyOn(bit, 'draw');
        bit.render();
        return expect(bit.draw).toHaveBeenCalled();
      });
      return it('should not run draw method if isDrawLess option passed', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          isDrawLess: true
        });
        spyOn(bit, 'draw');
        bit.render();
        return expect(bit.draw).not.toHaveBeenCalled();
      });
    });
    describe('draw method ->', function() {
      return it('should set presentations attributes', function() {
        var fill, stroke, strokeDasharray, strokeOffset, strokeWidth, transform;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          stroke: '#0f0',
          strokeWidth: 3,
          fill: '#0ff',
          strokeDasharray: 100,
          strokeDashoffset: 50,
          deg: 45
        });
        stroke = bit.el.getAttribute('stroke');
        strokeWidth = bit.el.getAttribute('stroke-width');
        fill = bit.el.getAttribute('fill');
        strokeDasharray = bit.el.getAttribute('stroke-dasharray');
        strokeOffset = bit.el.getAttribute('stroke-dashoffset');
        transform = bit.el.getAttribute('transform');
        expect(stroke).toBe('#0f0');
        expect(strokeWidth).toBe('3');
        expect(fill).toBe('#0ff');
        expect(strokeDasharray).toBe('100');
        expect(strokeOffset).toBe('50');
        return expect(transform).toBe('rotate(45, 0, 0)');
      });
    });
    describe('setProp method ->', function() {
      it('should set properties ->', function() {
        bit = new Bit({
          ctx: svg,
          stroke: '#0f0'
        });
        bit.setProp('stroke', '#ff0000');
        return expect(bit.props.stroke).toBe('#ff0000');
      });
      return it('should set multiple properties ->', function() {
        bit = new Bit({
          ctx: svg,
          stroke: '#0f0'
        });
        bit.setProp({
          stroke: '#ff0000',
          fill: '#0000ff'
        });
        expect(bit.props.stroke).toBe('#ff0000');
        return expect(bit.props.fill).toBe('#0000ff');
      });
    });
    describe('setAttr method ->', function() {
      it('should have setAttr method', function() {
        return expect(bit.setAttr).toBeDefined();
      });
      it('should set attribute on element', function() {
        bit.el = typeof document.createElementNS === "function" ? document.createElementNS(ns, "line") : void 0;
        bit.setAttr('stroke', '#ff00ff');
        return expect(bit.el.getAttribute('stroke')).toBe('#ff00ff');
      });
      it('should set multiple attributes on element', function() {
        bit.el = typeof document.createElementNS === "function" ? document.createElementNS(ns, "circle") : void 0;
        bit.setAttr({
          stroke: '#f0f',
          fill: '#0f0'
        });
        expect(bit.el.getAttribute('stroke')).toBe('#f0f');
        return expect(bit.el.getAttribute('fill')).toBe('#0f0');
      });
      return it('should work with camelCase attribute names', function() {
        bit.el = typeof document.createElementNS === "function" ? document.createElementNS(ns, "rect") : void 0;
        bit.setAttr({
          strokeWidth: 2
        });
        return expect(bit.el.getAttribute('stroke-width')).toBe('2');
      });
    });
    describe('defaults and options', function() {
      it('should have defaults object', function() {
        return expect(bit.defaults).toBeDefined();
      });
      it('should have options object', function() {
        return expect(bit.o).toBeDefined();
      });
      it('should have dafaults', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        bit = new Bit({
          ctx: svg
        });
        return expect(bit.props.radius).toBe(50);
      });
      it('should have extendDefaults method', function() {
        bit = new Bit({
          ctx: svg,
          radius: 45
        });
        expect(bit.extendDefaults).toBeDefined();
        return expect(function() {
          return bit.extendDefaults();
        }).not.toThrow();
      });
      it('should extend defaults object to properties', function() {
        bit = new Bit({
          ctx: svg,
          radius: 45
        });
        return expect(bit.props.radius).toBe(45);
      });
      it('should have namespace object', function() {
        return expect(bit.ns).toBe('http://www.w3.org/2000/svg');
      });
      return it('should have type object', function() {
        return expect(bit.type).toBeDefined();
      });
    });
    return describe('calculations', function() {
      return it('should calculate transform object', function() {
        bit = new Bit({
          ctx: svg,
          deg: 90
        });
        expect(bit.props.transform).toBe('rotate(90, 0, 0)');
        return expect(bit.calcTransform).toBeDefined();
      });
    });
  });

}).call(this);
