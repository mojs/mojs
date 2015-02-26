(function() {
  var Bit, Zigzag, ns, svg;

  Zigzag = mojs.Zigzag;

  Bit = mojs.Bit;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  describe('Line', function() {
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
    return describe('methods ->', function() {
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
          return expect(zigzag.el.getAttribute('points')).toBeTruthy();
        });
        return it('should not work with 0 points', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 0
          });
          return expect(zigzag.el.getAttribute('points')).toBeFalsy();
        });
      });
    });
  });

}).call(this);
