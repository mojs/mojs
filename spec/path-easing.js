(function() {
  var PathEasing, h;

  h = mojs.h;

  PathEasing = mojs.easing.PathEasing;

  describe('PathEasing ->', function() {
    describe('_preSample method ->', function() {
      return it('should pre sample the path', function() {
        var len, pe;
        pe = new PathEasing('M0,100 100,0');
        len = pe.pathLength;
        expect(pe._samples[0]).toBeDefined();
        expect(pe._samples[1]).toBeDefined();
        expect(pe._samples[2]).toBeDefined();
        expect(pe._samples[50]).toBeDefined();
        return expect(pe._samples[pe._stepsCount - 1]).toBeDefined();
      });
    });
    describe('sample method ->', function() {
      it('should clamp x value', function() {
        var path, pe;
        path = 'M0,100 100,0';
        pe = new PathEasing(path);
        expect(pe.sample(-.5)).toBeCloseTo(0, 5);
        return expect(pe.sample(1.5)).toBeCloseTo(1, 5);
      });
      it('should return y', function() {
        var path, pe;
        path = 'M0,100 100,0';
        pe = new PathEasing(path);
        return expect(pe.sample(.7)).toBe(.7);
      });
      return it('should sample y', function() {
        var path, pe;
        path = 'M0,100 100,0';
        pe = new PathEasing(path);
        return expect(pe.sample(.706)).toBeCloseTo(.706, 4);
      });
    });
    describe('_hardSample method', function() {
      return it('should return y', function() {
        var bounds, p, pe1, value;
        pe1 = new PathEasing('M0,100 100,0');
        p = 0.203231;
        bounds = pe1._findBounds(pe1._samples, p);
        value = pe1._hardSample(p, bounds.start.length, bounds.end.length);
        return expect(value).toBeCloseTo(p, 4);
      });
    });
    return describe('_findBounds method', function() {
      return it('should find lowest and highest bounderies', function() {
        var bounds, pe1, progress;
        pe1 = new PathEasing('M0,100 100,0');
        progress = .735;
        return bounds = pe1._findBounds(pe1._samples, progress);
      });
    });
  });

}).call(this);
