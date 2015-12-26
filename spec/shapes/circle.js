(function() {
  var Bit, Circle, circle, ns, svg;

  Circle = mojs.shapesMap.getShape('circle');

  Bit = mojs.shapesMap.getShape('bit');

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  circle = new Circle({
    ctx: svg
  });

  describe('Circle ->', function() {
    it('should extend Bit', function() {
      return expect(circle instanceof Bit).toBe(true);
    });
    describe('draw ->', function() {
      it('should add properties to el', function() {
        var cross, cx, cy, rx, ry;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        cross = new Circle({
          ctx: svg,
          radius: 20,
          radiusX: 40,
          radiusY: 35,
          y: 50
        });
        rx = cross.el.getAttribute('rx');
        ry = cross.el.getAttribute('ry');
        cx = cross.el.getAttribute('cx');
        cy = cross.el.getAttribute('cy');
        expect(rx).toBe('40');
        expect(ry).toBe('35');
        expect(cx).toBe('0');
        return expect(cy).toBe('50');
      });
      it('should fallback to radius', function() {
        var cross, rx, ry;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        cross = new Circle({
          ctx: svg,
          radius: 20,
          radiusY: 35
        });
        rx = cross.el.getAttribute('rx');
        ry = cross.el.getAttribute('ry');
        expect(rx).toBe('20');
        return expect(ry).toBe('35');
      });
      return it('should call super method', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        circle = new Circle({
          ctx: svg
        });
        spyOn(Circle.__super__, 'draw');
        circle.draw();
        return expect(Circle.__super__.draw).toHaveBeenCalled();
      });
    });
    return describe('getLength method', function() {
      it('should calculate total length of the path', function() {
        var bit, radius;
        radius = 100;
        bit = new Circle({
          ctx: document.createElementNS(ns, 'svg'),
          radius: radius
        });
        return expect(bit.getLength()).toBe(2 * Math.PI * radius);
      });
      return it('should calculate total length of the with different radiusX/Y', function() {
        var bit, radiusX, radiusY, sqrt;
        radiusX = 100;
        radiusY = 50;
        bit = new Circle({
          ctx: document.createElementNS(ns, 'svg'),
          radiusX: radiusX,
          radiusY: radiusY
        });
        sqrt = Math.sqrt((radiusX * radiusX + radiusY * radiusY) / 2);
        return expect(bit.getLength()).toBe(2 * Math.PI * sqrt);
      });
    });
  });

}).call(this);
