(function() {
  var PathEasing, h;

  h = mojs.h;

  PathEasing = mojs.easing.PathEasing;

  describe('PathEasing ->', function() {
    it('should be a function', function() {
      return expect(typeof mojs.easing.PathEasing).toBe('function');
    });
    it('should not init if "creator" was passed', function() {
      var pe;
      pe = new PathEasing('creator');
      return expect(pe.precision).not.toBeDefined();
    });
    it('should have path property', function() {
      var easing, pe;
      pe = new PathEasing('creator');
      easing = pe.create('M 0, 0 L 100,100');
      return expect(easing.path instanceof SVGElement).toBe(true);
    });
    describe('variables ->', function() {
      it('should have _eps defined', function() {
        var pe;
        pe = new PathEasing('M0,0 L10,10');
        return expect(pe._eps).toBeDefined();
      });
      it('should have _eps defined', function() {
        var pe;
        pe = new PathEasing('M0,0 L10,10');
        expect(pe._precompute).toBe(2000);
        return expect(pe._step).toBe(1 / pe._precompute);
      });
      return it('should have _boundsPrevProgress defined', function() {
        var pe;
        pe = new PathEasing('M0,0 L10,10');
        return expect(pe._boundsPrevProgress).toBe(-1);
      });
    });
    describe('path parsing ->', function() {
      it('should parse path', function() {
        var path, pe;
        path = 'M0,0 L10,10';
        spyOn(h, 'parsePath');
        pe = new PathEasing(path);
        return expect(h.parsePath).toHaveBeenCalledWith(path);
      });
      it('should save path and pathLength', function() {
        var path, pe;
        path = 'M0,0 L10,10';
        pe = new PathEasing(path);
        expect(pe.path).toBeDefined();
        return expect(pe.pathLength).toBe(pe.path.getTotalLength());
      });
      return it('should error if path wasnt parsed', function() {
        var path, pe;
        path = 'M0,0 L10,10';
        spyOn(h, 'error');
        spyOn(h, 'parsePath');
        pe = new PathEasing(path);
        return expect(h.error).toHaveBeenCalled();
      });
    });
    describe('options ->', function() {
      it('should recieve "_approximateMax" option', function() {
        var path, pe;
        path = 'M0,0 L10,10';
        pe = new PathEasing(path, {
          approximateMax: 10
        });
        return expect(pe._approximateMax).toBe(10);
      });
      it('should recieve "rect" option', function() {
        var path, pe;
        path = 'M0,0 L10,10';
        pe = new PathEasing(path, {
          rect: 200
        });
        return expect(pe._rect).toBe(200);
      });
      it('should recieve "eps" option', function() {
        var eps, path, pe;
        path = 'M0,0 L10,10';
        eps = .00001;
        pe = new PathEasing(path, {
          eps: eps
        });
        return expect(pe._eps).toBe(eps);
      });
      return describe('precompute option ->', function() {
        it('should recieve "precompute" option', function() {
          var path, pe, precompute;
          path = 'M0,0 L10,10';
          precompute = 10000;
          pe = new PathEasing(path, {
            precompute: precompute
          });
          return expect(pe._precompute).toBe(precompute);
        });
        it('should not be larger than 10000', function() {
          var path, pe, precompute;
          path = 'M0,0 L10,10';
          precompute = 20000;
          pe = new PathEasing(path, {
            precompute: precompute
          });
          return expect(pe._precompute).toBe(10000);
        });
        return it('should not be smaller than 100', function() {
          var path, pe, precompute;
          path = 'M0,0 L10,10';
          precompute = 20;
          pe = new PathEasing(path, {
            precompute: precompute
          });
          return expect(pe._precompute).toBe(100);
        });
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
        return expect(pe._samples[pe._precompute - 1]).toBeDefined();
      });
    });
    describe('sample method ->', function() {
      it('should clamp x value', function() {
        var path, pe;
        path = 'M0,100 100,0';
        pe = new PathEasing(path);
        expect(pe.sample(-.5)).toBeCloseTo(0, 3);
        return expect(pe.sample(1.5)).toBeCloseTo(1, 2);
      });
      it('should return y', function() {
        var path, pe;
        path = 'M0,100 100,0';
        pe = new PathEasing(path);
        return expect(Math.abs(pe.sample(.7) - .7)).toBeLessThan(pe._eps);
      });
      it('should sample y', function() {
        var i, pe, progress, _i, _results;
        pe = new PathEasing('M0,100 100,0');
        _results = [];
        for (i = _i = 1; _i < 20; i = ++_i) {
          progress = 1 / i;
          _results.push(expect(Math.abs(pe.sample(progress) - progress)).toBeLessThan(pe._eps));
        }
        return _results;
      });
      return it('should call _findApproximate method if bounds are not close enough', function() {
        var pe;
        pe = new PathEasing('M0,100 100,0', {
          precompute: 100
        });
        spyOn(pe, '_findApproximate');
        pe.sample(0.015);
        return expect(pe._findApproximate).toHaveBeenCalled();
      });
    });
    describe('_checkIfBoundsCloseEnough method', function() {
      it('should return start value if it is close enough', function() {
        var pe, value;
        pe = new PathEasing('M0,100 100,0');
        value = .5;
        return pe._checkIfBoundsCloseEnough(value, {
          start: {
            point: {
              x: value + (pe._eps / 2)
            }
          },
          end: {
            point: {
              x: .75
            }
          }
        });
      });
      return it('should return end value if it is close enough', function() {
        var pe, value;
        pe = new PathEasing('M0,100 100,0');
        value = .5;
        return pe._checkIfBoundsCloseEnough(value, {
          start: {
            point: {
              x: .25
            }
          },
          end: {
            point: {
              x: value + (pe._eps / 2)
            }
          }
        });
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
      it('should return y', function() {
        var bounds, p, pe1, value;
        pe1 = new PathEasing('M0,100 100,0');
        p = 0.203231;
        bounds = pe1._findBounds(pe1._samples, p);
        value = pe1._findApproximate(p, bounds.start, bounds.end);
        return expect(value).toBeCloseTo(p, 4);
      });
      it('should stop if running for a log time( _approximateMax < 1)', function() {
        var end, p, pe1, start, value;
        pe1 = new PathEasing('M0,100 100,0', {
          precompute: 100
        });
        p = 0.015;
        start = {
          point: {
            x: 0.01
          },
          length: 0
        };
        end = {
          point: {
            x: 0.02
          },
          length: 1
        };
        spyOn(pe1, '_findApproximate').and.callThrough();
        value = pe1._findApproximate(p, start, end, 1);
        return expect(pe1._findApproximate.calls.count()).toBe(1);
      });
      return it('should call self recursivelly if not precise enough but no more then _approximateMax value', function() {
        var end, p, pe, start, value;
        pe = new PathEasing('M0,100 100,0', {
          precompute: 100,
          eps: .00000001
        });
        p = 0.015;
        start = {
          point: {
            x: 0.01
          },
          length: 10
        };
        end = {
          point: {
            x: 0.5
          },
          length: 20
        };
        spyOn(pe, '_findApproximate').and.callThrough();
        value = pe._findApproximate(p, start, end);
        return expect(pe._findApproximate.calls.count()).toEqual(5);
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
        expect(pe1._boundsStartIndex).toBeGreaterThan(1400);
        return expect(pe1._boundsPrevProgress).toBe(.735);
      });
      it('should return [0] item if progress is 0', function() {
        var bounds, pe1, progress;
        pe1 = new PathEasing('M0,100 100,0');
        progress = 0;
        bounds = pe1._findBounds(pe1._samples, progress);
        expect(bounds.start).toBeDefined();
        return expect(bounds.start.point.x).toBeCloseTo(0, 1);
      });
      it('should cache index in reverse order', function() {
        var bounds, newProgress, pe1, progress;
        pe1 = new PathEasing('M0,100 100,0');
        progress = .735;
        newProgress = progress - .2;
        bounds = pe1._findBounds(pe1._samples, progress);
        bounds = pe1._findBounds(pe1._samples, newProgress);
        expect(pe1._boundsStartIndex).toBeLessThan(1400);
        return expect(pe1._boundsPrevProgress).toBe(newProgress);
      });
      it('should cache previous return object', function() {
        var bounds, pe1;
        pe1 = new PathEasing('M0,100 100,0');
        bounds = pe1._findBounds(pe1._samples, .735);
        return expect(pe1._prevBounds).toBe(bounds);
      });
      return it('should detect if previous progress is the current one', function() {
        var bounds1, bounds2, newProgress, pe1, progress;
        pe1 = new PathEasing('M0,100 100,0');
        progress = .735;
        newProgress = progress - .2;
        bounds1 = pe1._findBounds(pe1._samples, progress);
        bounds2 = pe1._findBounds(pe1._samples, progress);
        return expect(bounds1).toBe(bounds2);
      });
    });
    describe('_resolveY method', function() {
      return it('should resolve Y from point', function() {
        var pe1, y;
        pe1 = new PathEasing('M0,100 100,0');
        y = 10;
        return expect(pe1._resolveY({
          y: y
        })).toBe(1 - (y / 100));
      });
    });
    describe('create method ->', function() {
      return it('should create new instance of path-easing and return it\'s method', function() {
        var easing, pe;
        pe = new PathEasing('creator');
        easing = pe.create('M0,100 100,0', {
          precision: 10
        });
        expect(typeof easing).toBe('function');
        return expect(Math.abs(easing(.5) - .5)).toBeLessThan(.01);
      });
    });
    describe('_normalizePath method', function() {
      it('should normalize start x value to 0', function() {
        var newPath, pe;
        pe = new PathEasing('creator');
        newPath = pe._normalizePath('M0.1,0 L100,100');
        return expect(newPath).toBe('M0,0 L100,100');
      });
      it('should normalize end x value to rect.x value', function() {
        var newPath, pe;
        pe = new PathEasing('creator');
        newPath = pe._normalizePath('M0.1,0 L99,100');
        return expect(newPath).toBe('M0,0 L100,100');
      });
      return it('should normalize end x value for the latest segment only', function() {
        var newPath, normPath, path, pe;
        pe = new PathEasing('creator');
        pe.isIt = true;
        path = 'M0.1,0 C68,-3.5 69,6 70,14 C70,21 74,27 74,18 C77,-0.6 100,0 101,0 Z';
        newPath = pe._normalizePath(path);
        normPath = 'M0,0 C68,-3.5 69,6 70,14 C70,21 74,27 74,18 C77,-0.6 100,0 100,0 Z';
        return expect(newPath).toBe(normPath);
      });
    });
    describe('_normalizeSegment method', function() {
      it('should normalize segment by passed value', function() {
        var pe;
        pe = new PathEasing('creator');
        return expect(pe._normalizeSegment('0.1522, 100 ', 0)).toBe('0,100');
      });
      return it('should last value of the segment', function() {
        var normSegment, pe, segment;
        pe = new PathEasing('creator');
        segment = ' 0.1522, 100 20, 30 12,10';
        normSegment = '0.1522,100 20,30 100,10';
        return expect(pe._normalizeSegment(segment, 100)).toBe(normSegment);
      });
    });
    return describe('_getSegmentPairs', function() {
      it('should normalize an array by pairs', function() {
        var pairs, pe;
        pe = new PathEasing('creator');
        pairs = pe._getSegmentPairs(['0.12', '102']);
        expect(pairs[0][0]).toBe('0.12');
        expect(pairs[0][1]).toBe('102');
        pairs = pe._getSegmentPairs(['0.12', '102', 200, 12]);
        expect(pairs[0][0]).toBe('0.12');
        expect(pairs[0][1]).toBe('102');
        expect(pairs[1][0]).toBe(200);
        return expect(pairs[1][1]).toBe(12);
      });
      return it('should error if array is not even', function() {
        var pairs, pe;
        pe = new PathEasing('creator');
        spyOn(h, 'error');
        pairs = pe._getSegmentPairs(['0.12', '102', 200]);
        return expect(h.error).toHaveBeenCalled();
      });
    });
  });

}).call(this);
