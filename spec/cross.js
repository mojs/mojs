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
        var d, isD, isIE9D;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        cross = new Cross({
          ctx: svg,
          radius: 20
        });
        d = cross.el.getAttribute('d');
        isD = d === 'M-20,0 L20,0 M0,-20 L0,20';
        isIE9D = d === 'M -20 0 L 20 0 M 0 -20 L 0 20';
        return expect(isD || isIE9D).toBe(true);
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