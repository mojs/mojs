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
    describe('methods ->', function() {
      return describe('_draw method ->', function() {
        it('should define points', function() {
          var equal;
          equal = new Equal({
            radius: 20
          });
          return expect(equal.el.getAttribute('d')).toBeTruthy();
        });
        return it('should not work with 0 points', function() {
          var equal;
          equal = new Equal({
            radius: 20,
            points: 0
          });
          return expect(equal.el.getAttribute('points')).toBeFalsy();
        });
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
          ctx: document.createElementNS(ns, 'svg'),
          radiusX: radiusX,
          radiusY: radiusY
        });
        return expect(bit._getLength()).toBe(2 * radiusX);
      });
    });
  });

}).call(this);
