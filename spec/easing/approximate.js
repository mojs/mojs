(function() {
  var approximate;

  approximate = mojs.easing.approximate;

  describe('approximate method ->', function() {
    return describe('_sample method', function() {
      it('should call _proximate method with fn, samples', function() {
        var fn, i, index, keys, n, p, samples, samplesCount, step, _i, _ref;
        spyOn(approximate, '_proximate');
        fn = function(k) {
          return 2 * k;
        };
        n = 4;
        samplesCount = Math.pow(10, n);
        approximate(fn, n);
        samples = approximate._proximate.calls.first().args[0];
        keys = Object.keys(samples);
        expect(keys.length).toBe(samplesCount + 2);
        expect(samples[0]).toBe(fn(0));
        p = 0;
        step = 1 / samplesCount;
        for (i = _i = 0, _ref = samplesCount - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          p += step;
          index = parseFloat(p.toFixed(n));
          expect(samples[index]).toBe(fn(p));
        }
        return expect(samples[1]).toBe(fn(1));
      });
      it('should preserve presicion', function() {
        var fn, keys, n, samples, samplesCount;
        spyOn(approximate, '_proximate');
        fn = function(k) {
          return 2 * k;
        };
        n = 4;
        samplesCount = Math.pow(10, n);
        approximate(fn, n);
        samples = approximate._proximate.calls.first().args[0];
        keys = Object.keys(samples);
        return expect(parseFloat(keys[101]) - parseFloat(keys[100])).toBeCloseTo(0, n - 1);
      });
      it('should set base to the samples', function() {
        var fn, n, samples, samplesCount;
        spyOn(approximate, '_proximate');
        fn = function(k) {
          return 2 * k;
        };
        n = 4;
        samplesCount = Math.pow(10, n);
        approximate(fn, n);
        samples = approximate._proximate.calls.first().args[0];
        return expect(samples.base).toBe(n);
      });
      it('should return a function', function() {
        var fn, i, n, p, result, size, step, _i, _results;
        fn = function(k) {
          return 2 * k;
        };
        n = 4;
        result = approximate(fn, n);
        expect(typeof result).toBe('function');
        p = 0;
        size = 10000;
        step = 1 / size;
        _results = [];
        for (i = _i = 0; 0 <= size ? _i <= size : _i >= size; i = 0 <= size ? ++_i : --_i) {
          expect(result(p)).toBeCloseTo(fn(p));
          p += Math.random();
          if (p > 1) {
            _results.push(p = 0);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
      it('should return samples', function() {
        var fn, n, result, samples;
        spyOn(approximate, '_proximate').and.callThrough();
        fn = function(k) {
          return 2 * k;
        };
        n = 4;
        result = approximate(fn, n);
        samples = approximate._proximate.calls.first().args[0];
        return expect(result.getSamples()).toBe(samples);
      });
      it('should be able to load with samples', function() {
        var fn, loadSamples, n, result, samples;
        spyOn(approximate, '_proximate').and.callThrough();
        loadSamples = {};
        fn = function(k) {
          return 2 * k;
        };
        n = 4;
        result = approximate(fn, loadSamples);
        expect(approximate._proximate).toHaveBeenCalledWith(loadSamples);
        samples = approximate._proximate.calls.first().args[0];
        return expect(result.getSamples()).toBe(loadSamples);
      });
      return it('should be able to load with stringified samples', function() {
        var fn, loadSamples, n, result, samples;
        spyOn(approximate, '_proximate').and.callThrough();
        loadSamples = {
          a: 2,
          c: 3,
          d: 10
        };
        fn = function(k) {
          return 2 * k;
        };
        n = 4;
        result = approximate(fn, JSON.stringify(loadSamples));
        expect(approximate._proximate).toHaveBeenCalledWith(loadSamples);
        samples = approximate._proximate.calls.first().args[0];
        return expect(result.getSamples()).toEqual(loadSamples);
      });
    });
  });

}).call(this);
