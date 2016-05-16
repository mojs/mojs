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
        bit = new Bit({
          ctx: svg
        });
        return expect(bit instanceof mojs.Module).toBe(true);
      });
    });
    describe('context ->', function() {
      return it('context passed should be real svg node', function() {
        var b;
        b = new Bit({
          ctx: svg,
          isIt: 1
        });
        delete b._o.ctx;
        expect(b._vars()).toBe(true);
        b._o.ctx = svg;
        return expect(b._vars()).not.toBeDefined();
      });
    });
    describe('methods', function() {
      return it('should have _vars method', function() {
        return expect(bit._vars).toBeDefined();
      });
    });
    describe('_render method ->', function() {
      it('should have _render method', function() {
        return expect(bit._render).toBeDefined();
      });
      it('should call _render method on init', function() {
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
        bit._render();
        return expect(bit.draw).toHaveBeenCalled();
      });
      return it('should not run draw method if isDrawLess option passed', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          isDrawLess: true
        });
        spyOn(bit, 'draw');
        bit._render();
        return expect(bit.draw).not.toHaveBeenCalled();
      });
    });
    describe('draw method ->', function() {
      it('should set attributes', function() {
        var fill, stroke, strokeArray, strokeOffset, strokeWidth, transform;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg,
          isIt: 1,
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
        bit.draw();
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
        bit._props['stroke-width'] = 3;
        bit.setAttrsIfChanged({
          'stroke-width': 3
        });
        return expect(bit.el.setAttribute).not.toHaveBeenCalled();
      });
      it('should set attribute if property changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg
        }, 'stroke-width', 3);
        spyOn(bit.el, 'setAttribute');
        bit.setAttrsIfChanged({
          'stroke-width': 4
        });
        return expect(bit.el.setAttribute).toHaveBeenCalled();
      });
      it('should save the current value to state if changed ->', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = new Bit({
          ctx: svg
        }, 'stroke-width', 2);
        bit.setAttrsIfChanged({
          'stroke-width': 30
        });
        return expect(bit._state['stroke-width']).toBe(30);
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
        expect(bit._state['radius']).toBe(30);
        return expect(bit._state['stroke']).toBe('orange');
      });
    });
    describe('setProp method ->', function() {
      it('should set properties ->', function() {
        bit = new Bit({
          ctx: svg,
          stroke: '#0f0'
        });
        bit.setProp('stroke', '#ff0000');
        return expect(bit._props.stroke).toBe('#ff0000');
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
        expect(bit._props.stroke).toBe('#ff0000');
        return expect(bit._props.fill).toBe('#0000ff');
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
        return expect(bit._defaults).toBeDefined();
      });
      it('should have state object', function() {
        return expect(bit._state).toBeDefined();
      });
      it('should have _drawMap object', function() {
        expect(bit._drawMap).toBeDefined();
        return expect(bit._drawMapLength).toBeDefined();
      });
      it('should have options object', function() {
        return expect(bit._o).toBeDefined();
      });
      it('should have ratio', function() {
        return expect(bit._defaults.ratio).toBeDefined();
      });
      it('should have dafaults', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        bit = new Bit({
          ctx: svg
        });
        return expect(bit._props.radius).toBe(50);
      });
      it('should have namespace object', function() {
        return expect(bit._defaults.ns).toBe('http://www.w3.org/2000/svg');
      });
      return it('should have shape object', function() {
        return expect(bit._defaults.shape).toBeDefined();
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
        return expect(bit._props.length).toBe(200);
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
        return expect(pixels).toBe((bit._props.length / 100) * 50);
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
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
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
        bit.setProp('stroke-dasharray', [
          {
            value: 100,
            unit: 'px'
          }
        ]);
        bit.draw();
        return expect(bit._props['stroke-dasharray']).toBe('100 ');
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
        dash = (bit._props.length / 100) * 50;
        return expect(bit._props['stroke-dasharray']).toBe("100 " + dash + " ");
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
        dash = (bit._props.length / 100) * 25;
        return expect(bit._props['stroke-dasharray']).toBe(dash);
      });
    });
    describe('_pointsDelta method ->', function() {
      return it('should return distance between points', function() {
        var dx, dy, i, point1, point2, _i, _results;
        bit = new Bit({
          ctx: document.createElementNS(ns, 'svg')
        });
        _results = [];
        for (i = _i = 0; _i < 50; i = ++_i) {
          point1 = {
            x: 20 * i,
            y: 120 + i
          };
          point2 = {
            x: 200 + i,
            y: -120 * i
          };
          dx = Math.abs(point1.x - point2.x);
          dy = Math.abs(point1.y - point2.y);
          _results.push(expect(bit._pointsDelta(point1, point2)).toBe(Math.sqrt(dx * dx + dy * dy)));
        }
        return _results;
      });
    });
    return describe('_getPointsPerimiter method', function() {
      return it('should calculate sum between all points', function() {
        var i, points, sum, _i, _j, _ref;
        bit = new Bit({
          ctx: svg
        });
        points = [];
        for (i = _i = 1; _i < 20; i = ++_i) {
          points.push({
            x: 100 * Math.random(),
            y: 100 * Math.random()
          });
        }
        sum = 0;
        for (i = _j = 1, _ref = points.length; 1 <= _ref ? _j < _ref : _j > _ref; i = 1 <= _ref ? ++_j : --_j) {
          sum += bit._pointsDelta(points[i - 1], points[i]);
        }
        sum += bit._pointsDelta(points[0], mojs.h.getLastItem(points));
        return expect(bit._getPointsPerimiter(points)).toBe(sum);
      });
    });
  });

}).call(this);
