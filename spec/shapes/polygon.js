(function() {
  var Bit, Polygon, ns, svg;

  Polygon = mojs.shapesMap.getShape('polygon');

  Bit = mojs.shapesMap.getShape('bit');

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  describe('Polygon ->', function() {
    it('should extend Bit', function() {
      var polygon;
      polygon = new Polygon;
      return expect(polygon instanceof Bit).toBe(true);
    });
    describe('_declareDefaults method ->', function() {
      it('should call super', function() {
        var polygon;
        polygon = new Polygon;
        spyOn(Bit.prototype, '_declareDefaults');
        polygon._declareDefaults();
        return expect(Bit.prototype._declareDefaults).toHaveBeenCalled();
      });
      return it('should defaults for `tag` and `points`', function() {
        var polygon;
        polygon = new Polygon;
        expect(polygon._defaults.tag).toBe('path');
        return expect(polygon._defaults.points).toBe(3);
      });
    });
    it('should have points prop', function() {
      var tri;
      tri = new Polygon;
      return expect(tri._props.points).toBe(3);
    });
    it('should have recieve points prop', function() {
      var tri;
      tri = new Polygon({
        points: 8
      });
      return expect(tri._props.points).toBe(8);
    });
    it('should calculate _radialPoints', function() {
      var tri;
      tri = new Polygon;
      tri._draw();
      expect(tri._radialPoints).toBeDefined();
      return expect(tri._radialPoints.length).toBe(tri._props.points);
    });
    describe('_draw method ->', function() {
      it('should add properties to el', function() {
        var d, d2, isD, isIE9D, tri;
        tri = new Polygon({
          radius: 20
        });
        tri._draw();
        d = tri.el.getAttribute('d');
        d2 = 'M0.0000,-20.0000 L17.3205,10.0000 L-17.3205,10.0000 z';
        isD = d === d2;
        isIE9D = d === 'M 0 -20 L 17.3205 10 L -17.3205 10 Z';
        return expect(isD || isIE9D).toBe(true);
      });
      it('should work with radiusX and fallback to radius', function() {
        var d, d2, isD, isIE9D, tri;
        tri = new Polygon({
          radius: 20,
          radiusX: 40
        });
        tri._draw();
        d = tri.el.getAttribute('d');
        d2 = 'M0.0000,-20.0000 L34.6410,10.0000 L-34.6410,10.0000 z';
        isD = d === d2;
        isIE9D = d === 'M 0 -20 L 34.641 10 L -34.641 10 Z';
        return expect(isD || isIE9D).toBe(true);
      });
      it('should work with radiusY and fallback to radius', function() {
        var d, d2, isD, isIE9D, tri;
        tri = new Polygon({
          radius: 20,
          radiusY: 40
        });
        tri._draw();
        d = tri.el.getAttribute('d');
        d2 = 'M0.0000,-40.0000 L17.3205,20.0000 L-17.3205,20.0000 z';
        isD = d === d2;
        isIE9D = d === 'M 0 -40 L 17.3205 20 L -17.3205 20 Z';
        return expect(isD || isIE9D).toBe(true);
      });
      it('should call super method', function() {
        var polygon;
        polygon = new Polygon;
        spyOn(Polygon.__super__, '_draw');
        polygon._draw();
        return expect(Polygon.__super__._draw).toHaveBeenCalled();
      });
      it('should not set `d` attribute if nothing changed', function() {
        var polygon;
        polygon = new Polygon({
          radius: 20,
          points: 10
        });
        polygon._draw();
        spyOn(polygon.el, 'setAttribute');
        polygon._draw();
        return expect(polygon.el.setAttribute).not.toHaveBeenCalled();
      });
      it('should set `d` attribute if `radiusX` changed', function() {
        var polygon;
        polygon = new Polygon({
          radius: 20,
          points: 10
        });
        polygon._draw();
        spyOn(polygon.el, 'setAttribute');
        polygon._props.radiusX = 30;
        polygon._draw();
        return expect(polygon.el.setAttribute).toHaveBeenCalled();
      });
      it('should set `d` attribute if `radiusY` changed', function() {
        var polygon;
        polygon = new Polygon({
          radius: 20,
          points: 10
        });
        polygon._draw();
        spyOn(polygon.el, 'setAttribute');
        polygon._props.radiusY = 30;
        polygon._draw();
        return expect(polygon.el.setAttribute).toHaveBeenCalled();
      });
      return it('should set `d` attribute if `points` changed', function() {
        var polygon;
        polygon = new Polygon({
          radius: 20,
          points: 10
        });
        polygon._draw();
        spyOn(polygon.el, 'setAttribute');
        polygon._props.points = 30;
        polygon._draw();
        return expect(polygon.el.setAttribute).toHaveBeenCalled();
      });
    });
    describe('getLength method', function() {
      return it('should calculate sum between all points', function() {
        var polygon;
        polygon = new Polygon({
          radiusX: 100,
          radiusY: 200
        });
        polygon._draw();
        return expect(polygon._getLength()).toBe(polygon._getPointsPerimiter(polygon._radialPoints));
      });
    });
    describe('_pointsDelta method ->', function() {
      return it('should return distance between points', function() {
        var dx, dy, i, point1, point2, tri, _i, _results;
        tri = new Polygon;
        _results = [];
        for (i = _i = 0; _i < 50; i = ++_i) {
          point1 = {
            x: 20 * i,
            y: 120 + i
          };
          point2 = {
            x: 200 + i,
            y: -120 * i
          };
          dx = Math.abs(point1.x - point2.x);
          dy = Math.abs(point1.y - point2.y);
          _results.push(expect(tri._pointsDelta(point1, point2)).toBe(Math.sqrt(dx * dx + dy * dy)));
        }
        return _results;
      });
    });
    return describe('_getPointsPerimiter method', function() {
      return it('should calculate sum between all points', function() {
        var i, points, sum, tri, _i, _j, _ref;
        tri = new Polygon;
        points = [];
        for (i = _i = 1; _i < 20; i = ++_i) {
          points.push({
            x: 100 * Math.random(),
            y: 100 * Math.random()
          });
        }
        sum = 0;
        for (i = _j = 1, _ref = points.length; 1 <= _ref ? _j < _ref : _j > _ref; i = 1 <= _ref ? ++_j : --_j) {
          sum += tri._pointsDelta(points[i - 1], points[i]);
        }
        sum += tri._pointsDelta(points[0], mojs.h.getLastItem(points));
        return expect(tri._getPointsPerimiter(points)).toBe(sum);
      });
    });
  });

}).call(this);
