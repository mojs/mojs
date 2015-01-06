(function() {
  var h;

  h = mojs.helpers;

  describe('Helpers ->', function() {
    return describe('methods ->', function() {
      describe('prefix', function() {
        return it('should have prefix', function() {
          expect(h.prefix).toBeDefined();
          expect(h.prefix.js).toBeDefined();
          expect(h.prefix.css).toBeDefined();
          expect(h.prefix.lowercase).toBeDefined();
          return expect(h.prefix.dom).toBeDefined();
        });
      });
      return describe('getRadialPoint', function() {
        it('should calculate radial point', function() {
          var point;
          point = h.getRadialPoint({
            radius: 50,
            angle: 90,
            center: {
              x: 50,
              y: 50
            }
          });
          expect(point.x).toBe(100);
          return expect(point.y).toBe(50);
        });
        it('should return false if 1 of 3 options missed', function() {
          var point;
          point = h.getRadialPoint({
            radius: 50,
            angle: 90
          });
          return expect(point).toBeFalsy();
        });
        it('should return false only if 1 of 3 options missed but not falsy', function() {
          var point;
          point = h.getRadialPoint({
            radius: 0,
            angle: 90,
            center: {
              x: 0,
              y: 0
            }
          });
          return expect(point).toBeTruthy();
        });
        return it('options should have default empty object', function() {
          var point;
          point = h.getRadialPoint();
          expect(point).toBeFalsy();
          return expect(h.getRadialPoint).not.toThrow();
        });
      });
    });
  });

}).call(this);
