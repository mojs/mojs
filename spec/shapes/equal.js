(function() {
  var Bit, Equal, ns, svg;

  Equal = mojs.shapesMap.getShape('equal');

  Bit = mojs.shapesMap.getShape('bit');

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  describe('Equal ->', function() {
    it('should extend Bit', function() {
      var equal;
      equal = new Equal;
      return expect(equal instanceof Bit).toBe(true);
    });
    describe('_declareDefaults method ->', function() {
      it('should call super', function() {
        var equal;
        equal = new Equal;
        spyOn(Bit.prototype, '_declareDefaults');
        equal._declareDefaults();
        return expect(Bit.prototype._declareDefaults).toHaveBeenCalled();
      });
      it('should set `shape` to `path`', function() {
        var equal;
        equal = new Equal;
        return expect(equal._defaults.tag).toBe('path');
      });
      return it('should set `points` to `2`', function() {
        var equal;
        equal = new Equal;
        return expect(equal._defaults.points).toBe(2);
      });
    });
    describe('_draw method ->', function() {
      it('should define points', function() {
        var equal;
        equal = new Equal({
          radius: 20
        });
        equal._draw();
        return expect(equal.el.getAttribute('d')).toBeTruthy();
      });
      it('should not work with 0 points', function() {
        var equal;
        equal = new Equal({
          radius: 20,
          points: 0
        });
        return expect(equal.el.getAttribute('points')).toBeFalsy();
      });
      it('should not set `d` attribute if nothing changed', function() {
        var equal;
        equal = new Equal({
          radius: 20,
          points: 10
        });
        equal._draw();
        spyOn(equal.el, 'setAttribute');
        equal._draw();
        return expect(equal.el.setAttribute).not.toHaveBeenCalled();
      });
      it('should set `d` attribute if `radiusX` changed', function() {
        var equal;
        equal = new Equal({
          radius: 20,
          points: 10
        });
        equal._draw();
        spyOn(equal.el, 'setAttribute');
        equal._props.radiusX = 30;
        equal._draw();
        return expect(equal.el.setAttribute).toHaveBeenCalled();
      });
      it('should set `d` attribute if `radiusY` changed', function() {
        var equal;
        equal = new Equal({
          radius: 20,
          points: 10
        });
        equal._draw();
        spyOn(equal.el, 'setAttribute');
        equal._props.radiusY = 30;
        equal._draw();
        return expect(equal.el.setAttribute).toHaveBeenCalled();
      });
      return it('should set `d` attribute if `points` changed', function() {
        var equal;
        equal = new Equal({
          radius: 20,
          points: 10
        });
        equal._draw();
        spyOn(equal.el, 'setAttribute');
        equal._props.points = 30;
        equal._draw();
        return expect(equal.el.setAttribute).toHaveBeenCalled();
      });
    });
    return describe('getLength method', function() {
      it('should calculate total length of the path', function() {
        var bit, radius;
        radius = 100;
        bit = new Equal({
          radius: radius
        });
        return expect(bit._getLength()).toBe(2 * radius);
      });
      return it('should calculate total length of the with different radiusX/Y', function() {
        var bit, radiusX, radiusY;
        radiusX = 100;
        radiusY = 50;
        bit = new Equal({
          radiusX: radiusX,
          radiusY: radiusY
        });
        return expect(bit._getLength()).toBe(2 * radiusX);
      });
    });
  });

}).call(this);
