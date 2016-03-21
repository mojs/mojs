(function() {
  var Burst, Swirl, Transit, t;

  Transit = mojs.Transit;

  Swirl = mojs.Swirl;

  Burst = mojs.Burst;

  t = mojs.tweener;

  describe('Burst ->', function() {
    beforeEach(function() {
      return t.removeAll();
    });
    describe('extension ->', function() {
      return it('should extend Transit class', function() {
        var burst;
        burst = new Burst;
        return expect(burst instanceof Swirl).toBe(true);
      });
    });
    return describe('initialization ->', function() {
      it('should have _defaults', function() {
        var b, s;
        b = new Burst;
        s = new Swirl;
        delete b._defaults.childOptions;
        delete b._defaults.count;
        delete b._defaults.randomAngle;
        delete b._defaults.randomRadius;
        return expect(b._defaults).toEqual(s._defaults);
      });
      it('should have childOptions', function() {
        var b;
        b = new Burst;
        return expect(b._defaults.childOptions).toBe(null);
      });
      it('should add Burts properties', function() {
        var b;
        b = new Burst;
        expect(b._defaults.count).toBe(5);
        expect(b._defaults.randomAngle).toBe(0);
        return expect(b._defaults.randomRadius).toBe(0);
      });
      it('should have _childDefaults', function() {
        var b, s;
        b = new Burst;
        s = new Swirl;
        return expect(b._childDefaults).toEqual(s._defaults);
      });
      return it('should have _optionsIntersection', function() {
        var b, s;
        b = new Burst;
        s = new Swirl;
        expect(b._optionsIntersection['radius']).toBe(1);
        expect(b._optionsIntersection['radiusX']).toBe(1);
        expect(b._optionsIntersection['radiusY']).toBe(1);
        expect(b._optionsIntersection['angle']).toBe(1);
        expect(b._optionsIntersection['opacity']).toBe(1);
        return expect(b._optionsIntersection['scale']).toBe(1);
      });
    });
  });

}).call(this);
