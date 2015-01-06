(function() {
  var Bit, Line, line, ns, svg;

  Line = mojs.Line;

  Bit = mojs.Bit;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  line = new Line({
    ctx: svg
  });

  describe('Line', function() {
    it('should extend Bit', function() {
      return expect(line instanceof Bit).toBe(true);
    });
    it('should add itself to context', function() {
      line = new Line({
        ctx: svg
      });
      return expect(svg.firstChild).toBeDefined();
    });
    return describe('methods ->', function() {
      return describe('draw method ->', function() {
        it('should add properties to el', function() {
          var attr1, attr2, delta;
          svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
          line = new Line({
            ctx: svg,
            radius: 20
          });
          attr1 = parseInt(line.el.getAttribute('x1'), 10);
          attr2 = parseInt(line.el.getAttribute('x2'), 10);
          delta = attr2 - attr1;
          return expect(delta).toBe(40);
        });
        return it('should call super method', function() {
          svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
          line = new Line({
            ctx: svg
          });
          spyOn(Line.__super__, 'draw');
          line.draw();
          return expect(Line.__super__.draw).toHaveBeenCalled();
        });
      });
    });
  });

}).call(this);
