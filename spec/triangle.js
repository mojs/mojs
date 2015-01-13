(function() {
  var Bit, Triangle, ns, svg;

  Triangle = mojs.Triangle;

  Bit = mojs.Bit;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  describe('Triangle ->', function() {
    it('should extend Bit', function() {
      var triangle;
      triangle = new Triangle({
        ctx: svg
      });
      return expect(triangle instanceof Bit).toBe(true);
    });
    it('should have points prop', function() {
      var tri;
      tri = new Triangle({
        ctx: svg
      });
      return expect(tri.props.points).toBe(3);
    });
    it('should have recieve points prop', function() {
      var tri;
      tri = new Triangle({
        ctx: svg,
        points: 8
      });
      return expect(tri.props.points).toBe(8);
    });
    it('should call drawShape method', function() {
      var tri;
      tri = new Triangle({
        ctx: svg,
        points: 8
      });
      spyOn(tri, 'drawShape');
      tri.isDraw = false;
      tri.draw();
      return expect(tri.drawShape).toHaveBeenCalled();
    });
    it('should call drawShape only once', function() {
      var tri;
      tri = new Triangle({
        ctx: svg,
        points: 8
      });
      spyOn(tri, 'drawShape');
      tri.draw();
      return expect(tri.drawShape).not.toHaveBeenCalled();
    });
    it('should calculate radialPoints', function() {
      var tri;
      tri = new Triangle({
        ctx: svg
      });
      expect(tri.radialPoints).toBeDefined();
      return expect(tri.radialPoints.length).toBe(tri.props.points);
    });
    it('should calculate radialPoints', function() {
      var tri;
      tri = new Triangle({
        ctx: svg
      });
      expect(tri.radialPoints).toBeDefined();
      return expect(tri.radialPoints.length).toBe(tri.props.points);
    });
    return describe('draw ->', function() {
      it('should add properties to el', function() {
        var d, d2, tri;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        tri = new Triangle({
          ctx: svg,
          radius: 20
        });
        d = tri.el.getAttribute('points');
        d2 = '1.2246467991473533e-15,-20 17.320508075688775,9.999999999999998 -17.320508075688775,9.999999999999998 ';
        return expect(d).toBe(d2);
      });
      return it('should call super method', function() {
        var triangle;
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
