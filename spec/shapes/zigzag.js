(function() {
  var Bit, Zigzag, ns, svg;

  Zigzag = mojs.shapesMap.getShape('zigzag');

  Bit = mojs.shapesMap.getShape('bit');

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
        it('should not work with 0 points', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 0
          });
          return expect(zigzag.el.getAttribute('d')).toBeFalsy();
        });
        return it('should calculate path length', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 10
          });
          zigzag.draw();
          return expect(zigzag._length).toBe(80);
        });
      });
    });
    return describe('getLength method ->', function() {
      return it('should calculate total length of the path', function() {
        var bit;
        bit = new Zigzag({
          ctx: document.createElementNS(ns, 'svg'),
          radiusX: 100,
          radiusY: 550
        });
        bit.draw();
        return expect(bit.getLength()).toBe(bit._length);
      });
    });
  });

}).call(this);
