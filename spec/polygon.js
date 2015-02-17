(function() {
  var Bit, Polygon, ns, svg;

  Polygon = mojs.Polygon;

  Bit = mojs.Bit;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  describe('Polygon ->', function() {
    it('should extend Bit', function() {
      var polygon;
      polygon = new Polygon({
        ctx: svg
      });
      return expect(polygon instanceof Bit).toBe(true);
    });
    it('should have points prop', function() {
      var tri;
      tri = new Polygon({
        ctx: svg
      });
      return expect(tri.props.points).toBe(3);
    });
    it('should have recieve points prop', function() {
      var tri;
      tri = new Polygon({
        ctx: svg,
        points: 8
      });
      return expect(tri.props.points).toBe(8);
    });
    it('should call drawShape method', function() {
      var tri;
      tri = new Polygon({
        ctx: svg,
        points: 8
      });
      spyOn(tri, 'drawShape');
      tri.isDraw = false;
      tri.draw();
      return expect(tri.drawShape).toHaveBeenCalled();
    });
    it('should calculate radialPoints', function() {
      var tri;
      tri = new Polygon({
        ctx: svg
      });
      expect(tri.radialPoints).toBeDefined();
      return expect(tri.radialPoints.length).toBe(tri.props.points);
    });
    it('should calculate radialPoints', function() {
      var tri;
      tri = new Polygon({
        ctx: svg
      });
      expect(tri.radialPoints).toBeDefined();
      return expect(tri.radialPoints.length).toBe(tri.props.points);
    });
    return describe('draw ->', function() {
      it('should add properties to el', function() {
        var d, d2, isD, isIE9D, tri;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        tri = new Polygon({
          ctx: svg,
          radius: 20
        });
        d = tri.el.getAttribute('points');
        d2 = '0.0000,-20.0000 17.3205,10.0000 -17.3205,10.0000 ';
        isD = d === d2;
        isIE9D = d === '0,-20 17.3205,10 -17.3205,10';
        return expect(isD || isIE9D).toBe(true);
      });
      it('should work with radiusX and fallback to radius', function() {
        var d, d2, isD, isIE9D, tri;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        tri = new Polygon({
          ctx: svg,
          radius: 20,
          radiusX: 40
        });
        d = tri.el.getAttribute('points');
        d2 = '0.0000,-20.0000 34.6410,10.0000 -34.6410,10.0000 ';
        isD = d === d2;
        isIE9D = d === '0,-20 34.6410,10 -34.6410,10';
        return expect(isD || isIE9D).toBe(true);
      });
      it('should work with radiusY and fallback to radius', function() {
        var d, d2, isD, isIE9D, tri;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        tri = new Polygon({
          ctx: svg,
          radius: 20,
          radiusY: 40
        });
        d = tri.el.getAttribute('points');
        d2 = '0.0000,-40.0000 17.3205,20.0000 -17.3205,20.0000 ';
        isD = d === d2;
        isIE9D = d === '0,-40 17.3205,20 -17.3205,20';
        return expect(isD || isIE9D).toBe(true);
      });
      return it('should call super method', function() {
        var polygon;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        polygon = new Polygon({
          ctx: svg
        });
        spyOn(Polygon.__super__, 'draw');
        polygon.draw();
        return expect(Polygon.__super__.draw).toHaveBeenCalled();
      });
    });
  });

}).call(this);
