(function() {
  var bezier;

  bezier = mojs.easing.bezier;

  describe('bezier easing ->', function() {
    it('should be a function', function() {
      return expect(typeof bezier).toBe('function');
    });
    it('should return a function', function() {
      return expect(typeof bezier(0, 0, 1, 1)).toBe('function');
    });
    describe('linear curves ->', function() {
      return it('shoud be linear', function() {
        var bezier1, bezier2, i, samples, x, _i, _results;
        bezier1 = bezier(0, 0, 1, 1);
        bezier2 = bezier(1, 1, 0, 0);
        samples = 100;
        _results = [];
        for (i = _i = 0; 0 <= samples ? _i <= samples : _i >= samples; i = 0 <= samples ? ++_i : --_i) {
          x = i / samples;
          expect(bezier1(x)).toBe(bezier2(x));
          expect(bezier1(x)).toBe(x);
          _results.push(expect(bezier1(x)).toBeDefined());
        }
        return _results;
      });
    });
    describe('common props ->', function() {
      it('should be the right value at extremes', function() {
        var a, b, c, d, easing, i, _i, _results;
        _results = [];
        for (i = _i = 0; _i < 1000; i = ++_i) {
          a = Math.random();
          b = 2 * Math.random() - 0.5;
          c = Math.random();
          d = 2 * Math.random() - 0.5;
          easing = bezier(a, b, c, d);
          expect(easing(0)).toBe(0);
          _results.push(expect(easing(1)).toBe(1));
        }
        return _results;
      });
      return it('should approach the projected value of its x=y projected curve', function() {
        var a, b, c, composed, d, easing, i, projected, samples, x, _i, _results;
        samples = 1000;
        _results = [];
        for (i = _i = 0; 0 <= samples ? _i < samples : _i > samples; i = 0 <= samples ? ++_i : --_i) {
          x = i / samples;
          a = Math.random();
          b = Math.random();
          c = Math.random();
          d = Math.random();
          easing = bezier(a, b, c, d);
          projected = bezier(b, a, d, c);
          composed = function(x) {
            return projected(easing(x));
          };
          _results.push(expect(x).toBeCloseTo(composed(x), 1));
        }
        return _results;
      });
    });
    describe('two same instances ->', function() {
      return it('should be strictly equal', function() {
        var a, b, c, d, i, samples, x, _i, _results;
        samples = 100;
        _results = [];
        for (i = _i = 0; 0 <= samples ? _i <= samples : _i >= samples; i = 0 <= samples ? ++_i : --_i) {
          a = Math.random();
          b = 2 * Math.random() - 0.5;
          c = Math.random();
          d = 2 * Math.random() - 0.5;
          x = i / samples;
          _results.push(expect(bezier(a, b, c, d)(x)).toBe(bezier(a, b, c, d)(x)));
        }
        return _results;
      });
    });
    describe('symetric curves ->', function() {
      it('should have a central value y~=0.5 at x=0.5', function() {
        var a, b, c, d, easing, i, samples, _i, _results;
        samples = 100;
        _results = [];
        for (i = _i = 0; 0 <= samples ? _i <= samples : _i >= samples; i = 0 <= samples ? ++_i : --_i) {
          a = Math.random();
          b = 2 * Math.random() - 0.5;
          c = 1 - a;
          d = 1 - b;
          easing = bezier(a, b, c, d);
          _results.push(expect(easing(.5)).toBeCloseTo(.5));
        }
        return _results;
      });
      return it('should be symetrical', function() {
        var a, b, c, d, easing, i, samples, sym, x, _i, _results;
        samples = 100;
        _results = [];
        for (i = _i = 0; 0 <= samples ? _i <= samples : _i >= samples; i = 0 <= samples ? ++_i : --_i) {
          a = Math.random();
          b = 2 * Math.random() - 0.5;
          c = 1 - a;
          d = 1 - b;
          easing = bezier(a, b, c, d);
          sym = function(x) {
            return 1 - easing(1 - x);
          };
          x = i / samples;
          _results.push(expect(easing(x)).toBeCloseTo(sym(x)));
        }
        return _results;
      });
    });
    describe('toStr method ->', function() {
      return it('should return params, the function was called with', function() {
        return expect(bezier(0, 1, 0, 1).toStr()).toBe('bezier(0,1,0,1)');
      });
    });
    return describe('arguments parsing ->', function() {
      it('should error if no arguments', function() {
        spyOn(mojs.h, 'error');
        expect(bezier()).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if 1 argument', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(1)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if 2 arguments', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if 3 arguments', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if 3 arguments', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if string argument', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3, 'a')).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if NaN argument', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3, NaN)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if Infinity argument', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3, Infinity)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if Infinity argument', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3, Infinity)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if x < 0', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(0.5, 0.5, -5, 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if x < 0 #2', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(-2, 0.5, 1, 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if x < 0 #3', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(-Math.random() - 0.000001, 0.5, 0.5, 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if x > 1', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(0.5, 0.5, 5, 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if x > 1 #2', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 0.5, 1, 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      return it('should error if x > 1 #3', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(0.5, 0.5, 1.000001 + Math.random(), 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
    });
  });

}).call(this);
