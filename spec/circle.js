(function() {
  var Bit, Circle, circle, ns, svg;

  Circle = mojs.Circle;

  Bit = mojs.Bit;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  circle = new Circle({
    ctx: svg
  });

  describe('Circle ->', function() {
    it('should extend Bit', function() {
      return expect(circle instanceof Bit).toBe(true);
    });
    return describe('draw ->', function() {
      it('should add properties to el', function() {
        var cross, cx, cy, rx, ry;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        cross = new Circle({
          ctx: svg,
          radius: 20,
          radiusX: 40,
          y: 50
        });
        rx = cross.el.getAttribute('rx');
        ry = cross.el.getAttribute('ry');
        cx = cross.el.getAttribute('cx');
        cy = cross.el.getAttribute('cy');
        expect(rx).toBe('40');
        expect(ry).toBe('20');
        expect(cx).toBe('0');
        return expect(cy).toBe('50');
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
  });

}).call(this);
