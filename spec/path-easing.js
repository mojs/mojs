(function() {
  var PathEasing, h;

  h = mojs.h;

  PathEasing = mojs.easing.PathEasing;

  describe('PathEasing ->', function() {
    describe('variables ->', function() {
      it('should have _eps defined', function() {
        var pe;
        pe = new PathEasing('M0,0 10,10');
        return expect(pe._eps).toBeDefined();
      });
      it('should have _eps defined', function() {
        var pe;
        pe = new PathEasing('M0,0 10,10');
        expect(pe._stepsCount).toBe(5000);
        return expect(pe._step).toBe(1 / pe._stepsCount);
      });
      return it('should have _boundsPrevProgress defined', function() {
        var pe;
        pe = new PathEasing('M0,0 10,10');
        return expect(pe._boundsPrevProgress).toBe(-1);
      });
    });
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
    describe('sample method ->', function() {});
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
    describe('_approximate method', function() {
      return it('should find approximation', function() {
        var approximation, length2, pe, point1, point2, s;
        pe = new PathEasing('M0,100 100,0');
        s = pe._samples;
        approximation = pe._approximate(s[11], s[12], s[11].progress + 0.0003);
        point1 = pe.path.getPointAtLength(approximation);
        length2 = s[11].length + .3 * (s[12].length - s[11].length);
        point2 = pe.path.getPointAtLength(length2);
        return expect(point1.x).toBeCloseTo(point2.x, 1);
      });
    });
    describe('_findApproximate method', function() {
      return it('should return y', function() {
        var bounds, p, pe1, value;
        pe1 = new PathEasing('M0,100 100,0');
        p = 0.203231;
        bounds = pe1._findBounds(pe1._samples, p);
        value = pe1._findApproximate(p, bounds.start, bounds.end);
        return expect(value).toBeCloseTo(p, 4);
      });
    });
    describe('_findBounds method', function() {
      it('should find lowest and highest bounderies', function() {
        var bounds, pe1, progress;
        pe1 = new PathEasing('M0,100 100,0');
        progress = .735;
        return bounds = pe1._findBounds(pe1._samples, progress);
      });
      it('should save previous start index', function() {
        var bounds, pe1, progress;
        pe1 = new PathEasing('M0,100 100,0');
        progress = .735;
        bounds = pe1._findBounds(pe1._samples, progress);
        expect(pe1._boundsStartIndex).toBeGreaterThan(3600);
        return expect(pe1._boundsPrevProgress).toBe(.735);
      });
      return it('should reset previous start index if current progress is smaller then previous one', function() {
        var bounds, newProgress, pe1, progress;
        pe1 = new PathEasing('M0,100 100,0');
        pe1.isIt = true;
        progress = .735;
        newProgress = progress - .1;
        bounds = pe1._findBounds(pe1._samples, progress);
        bounds = pe1._findBounds(pe1._samples, newProgress);
        expect(pe1._boundsStartIndex).toBe(0);
        return expect(pe1._boundsPrevProgress).toBe(newProgress);
      });
    });
    return describe('_resolveY method', function() {
      return it('should resolve Y from point', function() {
        var pe1, y;
        pe1 = new PathEasing('M0,100 100,0');
        y = 10;
        return expect(pe1._resolveY({
          y: y
        })).toBe(1 - (y / 100));
      });
    });
  });

}).call(this);
