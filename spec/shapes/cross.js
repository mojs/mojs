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
    describe('draw ->', function() {
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
      it('should work with radiusX and fallback to radius', function() {
        var d, isD, isIE9D;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        cross = new Cross({
          ctx: svg,
          radius: 20,
          radiusX: 40
        });
        d = cross.el.getAttribute('d');
        isD = d === 'M-40,0 L40,0 M0,-20 L0,20';
        isIE9D = d === 'M -40 0 L 40 0 M 0 -20 L 0 20';
        return expect(isD || isIE9D).toBe(true);
      });
      it('should work with radiusY and fallback to radius', function() {
        var d, isD, isIE9D;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        cross = new Cross({
          ctx: svg,
          radius: 20,
          radiusY: 40
        });
        d = cross.el.getAttribute('d');
        isD = d === 'M-20,0 L20,0 M0,-40 L0,40';
        isIE9D = d === 'M -20 0 L 20 0 M 0 -40 L 0 40';
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
    return describe('getLength method', function() {
      it('should calculate total length of the path', function() {
        var bit;
        bit = new Cross({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        return expect(bit.getLength()).toBe(400);
      });
      return it('should calculate total length of the with different radiusX/Y', function() {
        var bit;
        bit = new Cross({
          ctx: document.createElementNS(ns, 'svg'),
          radiusX: 100,
          radiusY: 50
        });
        return expect(bit.getLength()).toBe(300);
      });
    });
  });

}).call(this);
