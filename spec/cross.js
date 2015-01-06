(function() {
  var Bit, Cross, cross, ns, svg;

  Cross = mojs.Cross;

  Bit = mojs.Bit;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  cross = new Cross({
    ctx: svg
  });

  describe('Cross ->', function() {
    it('should extend Bit', function() {
      return expect(cross instanceof Bit).toBe(true);
    });
    return describe('draw ->', function() {
      it('should add properties to el', function() {
        var d;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        cross = new Cross({
          ctx: svg,
          radius: 20
        });
        d = cross.el.getAttribute('d');
        return expect(d).toBe('M-20,0 L20,0 M0,-20 L0,20');
      });
      return it('should call super method', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        cross = new Cross({
          ctx: svg
        });
        spyOn(Cross.__super__, 'draw');
        cross.draw();
        return expect(Cross.__super__.draw).toHaveBeenCalled();
      });
    });
  });

}).call(this);
