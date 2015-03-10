(function() {
  var Bit, Zigzag, ns, svg;

  Zigzag = mojs.Zigzag;

  Bit = mojs.Bit;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  document.body.appendChild(svg);

  describe('Zigzag ->', function() {
    it('should extend Bit', function() {
      var line;
      line = new Zigzag({
        ctx: svg
      });
      return expect(line instanceof Bit).toBe(true);
    });
    it('should add itself to context', function() {
      var line;
      line = new Zigzag({
        ctx: svg
      });
      return expect(svg.firstChild).toBeDefined();
    });
    it('should have ratio of 1.43', function() {
      var line;
      line = new Zigzag({
        ctx: svg
      });
      return expect(line.ratio).toBe(1.43);
    });
    describe('methods ->', function() {
      return describe('draw method ->', function() {
        it('should add properties to el', function() {
          var zigzag;
          return zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20
          });
        });
        it('should define points', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20
          });
          return expect(zigzag.el.getAttribute('d')).toBeTruthy();
        });
        return it('should not work with 0 points', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 0
          });
          return expect(zigzag.el.getAttribute('d')).toBeFalsy();
        });
      });
    });
    return describe('getLength method ->', function() {
      it('should calculate total length of the path', function() {
        var bit, radius;
        radius = 100;
        bit = new Zigzag({
          ctx: document.createElementNS(ns, 'svg'),
          radius: radius
        });
        return expect(Math.round(bit.getLength())).toBe(400);
      });
      return it('should calculate total length of the with different radiusX/Y', function() {
        var bit, radiusX, radiusY;
        radiusX = 100;
        radiusY = 50;
        bit = new Zigzag({
          ctx: document.createElementNS(ns, 'svg'),
          radiusX: radiusX,
          radiusY: radiusY
        });
        return expect(bit.getLength()).toBe(300);
      });
    });
  });

}).call(this);
