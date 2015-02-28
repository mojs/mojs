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
      it('should set attributes', function() {
        var fill, isIE9Transform, isTransform, stroke, strokeDasharray, strokeOffset, strokeWidth, transform;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          x: 20,
          y: 20,
          stroke: '#0f0',
          'stroke-width': 3,
          fill: '#0ff',
          'stroke-dasharray': 100,
          'stroke-dashoffset': 50,
          angle: 45
        });
        stroke = bit.el.getAttribute('stroke');
        strokeWidth = bit.el.getAttribute('stroke-width');
        fill = bit.el.getAttribute('fill');
        strokeDasharray = bit.el.getAttribute('stroke-dasharray');
        strokeOffset = bit.el.getAttribute('stroke-dashoffset');
        transform = bit.el.getAttribute('transform');
        isTransform = transform === 'rotate(45, 20, 20)';
        isIE9Transform = transform === 'rotate(45 20 20)';
        expect(stroke).toBe('#0f0');
        expect(strokeWidth).toBe('3');
        expect(fill).toBe('#0ff');
        expect(strokeDasharray).toBe('100');
        expect(strokeOffset).toBe('50');
        return expect(isTransform || isIE9Transform).toBe(true);
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
        bit.draw();
        expect(bit.state['stroke']).toBe('#0f0');
        expect(bit.state['stroke-width']).toBe(3);
        expect(bit.state['stroke-opacity']).toBe(.5);
        expect(bit.state['stroke-dasharray']).toBe(100);
        expect(bit.state['stroke-dashoffset']).toBe(50);
        expect(bit.state['stroke-linecap']).toBe('round');
        expect(bit.state['fill']).toBe('#0ff');
        expect(bit.state['fill-opacity']).toBe('#f0f');
        return expect(bit.state['transform']).toBe('rotate(45, 20, 20)');
      });
      it('should not set attribute if property not changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          'stroke-width': 3
        });
        spyOn(bit.el, 'setAttribute');
        bit.draw();
        return expect(bit.el.setAttribute).not.toHaveBeenCalled();
      });
      return it('should set attribute if property changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          'stroke-width': 3
        });
        spyOn(bit.el, 'setAttribute');
        bit.setProp({
          'stroke-width': 4
        });
        bit.draw();
        return expect(bit.el.setAttribute).toHaveBeenCalled();
      });
    });
    describe('setAttrIfChanged method ->', function() {
      it('should not set attribute if property not changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          'stroke-width': 3
        });
        spyOn(bit.el, 'setAttribute');
        bit.props['stroke-width'] = 3;
        bit.setAttrIfChanged('stroke-width');
        return expect(bit.el.setAttribute).not.toHaveBeenCalled();
      });
      it('should set attribute if property changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg
        }, 'stroke-width', 3);
        spyOn(bit.el, 'setAttribute');
        bit.props['stroke-width'] = 4;
        bit.setAttrIfChanged('stroke-width');
        return expect(bit.el.setAttribute).toHaveBeenCalled();
      });
      return it('should save the current value to state if changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg
        }, 'stroke-width', 2);
        bit.props['stroke-width'] = 30;
        bit.setAttrIfChanged('stroke-width');
        return expect(bit.state['stroke-width']).toBe(30);
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
      return it('should set multiple attributes on element', function() {
        bit.el = typeof document.createElementNS === "function" ? document.createElementNS(ns, "circle") : void 0;
        bit.setAttr({
          stroke: '#f0f',
          fill: '#0f0'
        });
        expect(bit.el.getAttribute('stroke')).toBe('#f0f');
        return expect(bit.el.getAttribute('fill')).toBe('#0f0');
      });
    });
    describe('defaults and options', function() {
      it('should have defaults object', function() {
        return expect(bit.defaults).toBeDefined();
      });
      it('should have state object', function() {
        return expect(bit.state).toBeDefined();
      });
      it('should have drawMap object', function() {
        expect(bit.drawMap).toBeDefined();
        return expect(bit.drawMapLength).toBeDefined();
      });
      it('should have options object', function() {
        return expect(bit.o).toBeDefined();
      });
      it('should have ratio', function() {
        return expect(bit.ratio).toBeDefined();
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
          radius: 45,
          'stroke-width': 5
        });
        expect(bit.props.radius).toBe(45);
        return expect(bit.props['stroke-width']).toBe(5);
      });
      it('should work with 0 values', function() {
        bit = new Bit({
          ctx: svg,
          radius: 45,
          'stroke-width': 5,
          points: 0
        });
        return expect(bit.props.points).toBe(0);
      });
      it('should have namespace object', function() {
        return expect(bit.ns).toBe('http://www.w3.org/2000/svg');
      });
      return it('should have type object', function() {
        return expect(bit.type).toBeDefined();
      });
    });
    describe('calculations', function() {
      return it('should calculate transform object', function() {
        bit = new Bit({
          ctx: svg,
          angle: 90
        });
        expect(bit.props.transform).toBe('rotate(90, 0, 0)');
        return expect(bit.calcTransform).toBeDefined();
      });
    });
    return describe('foreign el', function() {
      it('should recieve foreign el', function() {
        var el;
        el = document.createElementNS(ns, 'rect');
        svg.appendChild(el);
        bit = new Bit({
          el: el
        });
        return expect(bit.el).toBe(el);
      });
      return it('should set isForeign flag', function() {
        var el;
        el = document.createElementNS(ns, 'rect');
        svg.appendChild(el);
        bit = new Bit({
          el: el
        });
        return expect(bit.isForeign).toBe(true);
      });
    });
  });

}).call(this);
