(function() {
  var Bit, Rect, ns, rect, svg;

  Rect = mojs.Rect;

  Bit = mojs.Bit;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  rect = new Rect({
    ctx: svg
  });

  describe('Rect ->', function() {
    it('should extend Bit', function() {
      return expect(rect instanceof Bit).toBe(true);
    });
    describe('defaults ->', function() {
      it('should have type of "rect"', function() {
        return expect(rect.type).toBe('rect');
      });
      return it('should have ratio of 1.43', function() {
        return expect(rect.ratio).toBe(1.43);
      });
    });
    return describe('draw ->', function() {
      it('should add properties to el', function() {
        var height, width, x, y;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        rect = new Rect({
          ctx: svg,
          radius: 20,
          x: 50,
          y: 100
        });
        width = rect.el.getAttribute('width');
        height = rect.el.getAttribute('height');
        x = rect.el.getAttribute('x');
        y = rect.el.getAttribute('y');
        expect(width).toBe('40');
        expect(height).toBe('40');
        expect(x).toBe('30');
        return expect(y).toBe('80');
      });
      return it('should call super method', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        rect = new Rect({
          ctx: svg
        });
        spyOn(Rect.__super__, 'draw');
        rect.draw();
        return expect(Rect.__super__.draw).toHaveBeenCalled();
      });
    });
  });

}).call(this);
