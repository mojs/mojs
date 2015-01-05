(function() {
  var Bit, Triangle, ns, svg, triangle;

  Triangle = mojs.Triangle;

  Bit = mojs.Bit;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  triangle = new Triangle({
    ctx: svg
  });

  describe('Triangle ->', function() {
    return describe('draw ->', function() {
      it('should add properties to el', function() {
        var cross, d, d2;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        cross = new Triangle({
          ctx: svg,
          radius: 20
        });
        d = cross.el.getAttribute('d');
        d2 = "M1.2246467991473533e-15, -20 L17.320508075688775, 9.999999999999998 M17.320508075688775, 9.999999999999998 L-17.320508075688775, 9.999999999999998 M-17.320508075688775, 9.999999999999998 L1.2246467991473533e-15, -20";
        return expect(d).toBe(d2);
      });
      return it('should call super method', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        triangle = new Triangle({
          ctx: svg
        });
        spyOn(Triangle.__super__, 'draw');
        triangle.draw();
        return expect(Triangle.__super__.draw).toHaveBeenCalled();
      });
    });
  });

}).call(this);
