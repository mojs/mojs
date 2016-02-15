(function() {
  var Bit, bit, ns, svg;

  Bit = mojs.shapesMap.getShape('bit');

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
    describe('setAttrsIfChanged method ->', function() {
      it('should not set attribute if property not changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          'stroke-width': 3
        });
        spyOn(bit.el, 'setAttribute');
        bit.props['stroke-width'] = 3;
        bit.setAttrsIfChanged('stroke-width');
        return expect(bit.el.setAttribute).not.toHaveBeenCalled();
      });
      it('should set attribute if property changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg
        }, 'stroke-width', 3);
        spyOn(bit.el, 'setAttribute');
        bit.props['stroke-width'] = 4;
        bit.setAttrsIfChanged('stroke-width');
        return expect(bit.el.setAttribute).toHaveBeenCalled();
      });
      it('should save the current value to state if changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg
        }, 'stroke-width', 2);
        bit.props['stroke-width'] = 30;
        bit.setAttrsIfChanged('stroke-width');
        return expect(bit.state['stroke-width']).toBe(30);
      });
      it('should recieve value to set ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          radius: 20
        });
        bit.setAttrsIfChanged('radius', 30);
        return expect(bit.state['radius']).toBe(30);
      });
      return it('should work with values hash ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          radius: 20
        });
        bit.setAttrsIfChanged({
          radius: 30,
          stroke: 'orange'
        });
        expect(bit.state['radius']).toBe(30);
        return expect(bit.state['stroke']).toBe('orange');
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
      return it('should have shape object', function() {
        return expect(bit.shape).toBeDefined();
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
    describe('foreign el ->', function() {
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
    describe('getLength method ->', function() {
      it('should calculate total length of the path', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        return expect(bit.getLength()).toBe(200);
      });
      it('should if el has getTotalLength method, it should use it', function() {
        var path;
        path = document.createElementNS(ns, 'path');
        path.setAttribute('d', 'M0,0 L100,100');
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100,
          el: path
        });
        return expect(bit.getLength()).toBe(path.getTotalLength());
      });
      return it('should should call getTotalLength on path only if d attr was set', function() {
        var path;
        path = document.createElementNS(ns, 'path');
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100,
          el: path
        });
        spyOn(path, 'getTotalLength');
        bit.getLength();
        return expect(path.getTotalLength).not.toHaveBeenCalled();
      });
    });
    describe('length tracking ->', function() {
      it('should track self length', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        return expect(bit.props.length).toBe(200);
      });
      return it('should call getLength method', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        spyOn(bit, 'getLength');
        bit.setProp('radius', 200);
        bit.draw();
        return expect(bit.getLength).toHaveBeenCalled();
      });
    });
    describe('castPercent method ->', function() {
      return it('should cast % values to pixels', function() {
        var pixels;
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        pixels = bit.castPercent(50);
        return expect(pixels).toBe((bit.props.length / 100) * 50);
      });
    });
    describe('castStrokeDash method ->', function() {
      it('should not cast pixel values', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit.props['stroke-dashoffset'] = {
          unit: 'px',
          value: 100
        };
        bit.castStrokeDash('stroke-dashoffset');
        return expect(bit.props['stroke-dashoffset']).toBe(100);
      });
      it('should cast % values', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit.props['stroke-dashoffset'] = {
          unit: '%',
          value: 100
        };
        bit.castStrokeDash('stroke-dashoffset');
        return expect(bit.props['stroke-dashoffset']).toBe(bit.props.length);
      });
      it('should not set 0 value >> ff issue fix', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit.props['stroke-dasharray'] = {
          unit: 'px',
          value: 0
        };
        bit.castStrokeDash('stroke-dasharray');
        return expect(bit.props['stroke-dasharray']).toBe('');
      });
      return it('should not set 0 value >> ff issue fix #2', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit.props['stroke-dasharray'] = [
          {
            unit: 'px',
            value: 0
          }
        ];
        bit.castStrokeDash('stroke-dasharray');
        return expect(bit.props['stroke-dasharray']).toBe('');
      });
    });
    describe('isChanged method ->', function() {
      it('should check if attribute was changed', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          stroke: 'deeppink'
        });
        expect(bit.isChanged('stroke')).toBe(false);
        bit.setProp('stroke', 'green');
        return expect(bit.isChanged('stroke')).toBe(true);
      });
      return it('should recieve value to set', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 20
        });
        return expect(bit.isChanged('radius', 30)).toBe(true);
      });
    });
    return describe('stroke-dash value setting ->', function() {
      it('should set the property from an array', function() {
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit.setProp('stroke-dasharray', [
          {
            value: 100,
            unit: 'px'
          }
        ]);
        bit.draw();
        return expect(bit.props['stroke-dasharray']).toBe('100 ');
      });
      it('should cast % values', function() {
        var dash;
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit.setProp('stroke-dasharray', [
          {
            value: 100,
            unit: 'px'
          }, {
            value: 50,
            unit: '%'
          }
        ]);
        bit.draw();
        dash = (bit.props.length / 100) * 50;
        return expect(bit.props['stroke-dasharray']).toBe("100 " + dash + " ");
      });
      return it('should cast % single values', function() {
        var dash;
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        bit.setProp('stroke-dasharray', {
          value: 25,
          unit: '%'
        });
        bit.draw();
        dash = (bit.props.length / 100) * 25;
        return expect(bit.props['stroke-dasharray']).toBe(dash);
      });
    });
  });

}).call(this);
