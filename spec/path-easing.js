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
        expect(pe._samples[pe._step * 0]).toBeDefined();
        expect(pe._samples[pe._step * 1]).toBeDefined();
        expect(pe._samples[pe._step * 2]).toBeDefined();
        expect(pe._samples[pe._step * 50]).toBeDefined();
        return expect(pe._samples[pe._step * pe._stepsCount]).toBeDefined();
      });
    });
    return describe('_findBounds method', function() {
      return it('should find lowest and highest bounderies', function() {
        var bounds, pe1, progress;
        pe1 = new PathEasing('M0,100 100,0');
        progress = .735;
        console.time('search');
        bounds = pe1._findBounds(pe1._samples, progress);
        return console.timeEnd('search');
      });
    });
  });

}).call(this);
