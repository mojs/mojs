(function() {
  var Burst, Swirl, Thenable, Transit, Tunable, h, t;

  Transit = mojs.Transit;

  Swirl = mojs.Swirl;

  Burst = mojs.Burst;

  Tunable = mojs.Tunable;

  Thenable = mojs.Thenable;

  t = mojs.tweener;

  h = mojs.h;

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
    describe('initialization ->', function() {
      it('should have _defaults', function() {
        var b, s;
        b = new Burst;
        s = new Swirl;
        delete b._defaults.count;
        delete b._defaults.degree;
        b._defaults.radius = s._defaults.radius;
        return expect(b._defaults).toEqual(s._defaults);
      });
      it('should add Burts properties', function() {
        var b;
        b = new Burst;
        expect(b._defaults.degree).toBe(360);
        return expect(b._defaults.count).toBe(5);
      });
      it('should have _childDefaults', function() {
        var b, key, s, value, _ref, _ref1;
        b = new Burst;
        s = new Swirl;
        _ref = h.tweenOptionMap;
        for (key in _ref) {
          value = _ref[key];
          delete b._childDefaults[key];
        }
        _ref1 = h.callbacksMap;
        for (key in _ref1) {
          value = _ref1[key];
          delete b._childDefaults[key];
        }
        b._childDefaults.isSwirl = true;
        return expect(b._childDefaults).toEqual(s._defaults);
      });
      it('should modify isSwirl', function() {
        var b, s;
        b = new Burst;
        s = new Swirl;
        return expect(b._childDefaults.isSwirl).toBe(false);
      });
      it('should add tween options to _childDefaults', function() {
        var b, key, value, _ref, _ref1, _results;
        b = new Burst;
        _ref = h.tweenOptionMap;
        for (key in _ref) {
          value = _ref[key];
          expect(b._childDefaults[key]).toBe(null);
        }
        _ref1 = h.callbacksMap;
        _results = [];
        for (key in _ref1) {
          value = _ref1[key];
          _results.push(expect(b._childDefaults[key]).toBe(null));
        }
        return _results;
      });
      return it('should add unitTimeline to the _skipPropsDelta', function() {
        var b;
        b = new Burst;
        return expect(b._skipPropsDelta.unitTimeline).toBeDefined();
      });
    });
    describe('_createBit method ->', function() {
      it('should create _swirls array', function() {
        var b;
        b = new Burst;
        b._createBit();
        return expect(b._swirls.length).toBe(b._props.count);
      });
      it('should pass index to the swirls', function() {
        var b;
        b = new Burst;
        b._createBit();
        expect(b._swirls[0]._o.index).toBe(0);
        expect(b._swirls[1]._o.index).toBe(1);
        expect(b._swirls[2]._o.index).toBe(2);
        expect(b._swirls[3]._o.index).toBe(3);
        return expect(b._swirls[4]._o.index).toBe(4);
      });
      return it('should pass options to swirls', function() {
        var b, key, options0, options1, options2, _results;
        b = new Burst;
        b._createBit();
        options0 = b._getOption(0);
        delete options0.callbacksContext;
        for (key in options0) {
          expect(b._swirls[0]._o[key]).toEqual(options0[key]);
        }
        options1 = b._getOption(1);
        delete options1.callbacksContext;
        for (key in options1) {
          expect(b._swirls[1]._o[key]).toEqual(options1[key]);
        }
        options2 = b._getOption(2);
        delete options2.callbacksContext;
        _results = [];
        for (key in options2) {
          _results.push(expect(b._swirls[2]._o[key]).toEqual(options2[key]));
        }
        return _results;
      });
    });
    describe('_getPropByMod method ->', function() {
      it('should fallback to empty object', function() {
        var burst, opt0;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        opt0 = burst._getPropByMod('radius', 0);
        return expect(opt0).toBe(void 0);
      });
      it('should return the prop from passed object based on index ->', function() {
        var burst, opt0, opt1, opt2, opt8;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        opt0 = burst._getPropByMod('radius', 0, burst._o.childOptions);
        opt1 = burst._getPropByMod('radius', 1, burst._o.childOptions);
        opt2 = burst._getPropByMod('radius', 2, burst._o.childOptions);
        opt8 = burst._getPropByMod('radius', 8, burst._o.childOptions);
        expect(opt0[20]).toBe(50);
        expect(opt1).toBe(20);
        expect(opt2).toBe('500');
        return expect(opt8).toBe('500');
      });
      it('should the same prop if not an array ->', function() {
        var burst, opt0, opt1, opt8;
        burst = new Burst({
          childOptions: {
            radius: 20
          }
        });
        opt0 = burst._getPropByMod('radius', 0, burst._o.childOptions);
        opt1 = burst._getPropByMod('radius', 1, burst._o.childOptions);
        opt8 = burst._getPropByMod('radius', 8, burst._o.childOptions);
        expect(opt0).toBe(20);
        expect(opt1).toBe(20);
        return expect(opt8).toBe(20);
      });
      return it('should work with another options object ->', function() {
        var burst, from, opt0, opt1, opt8;
        burst = new Burst({
          radius: 40,
          childOptions: {
            radius: 20
          }
        });
        from = burst._o;
        opt0 = burst._getPropByMod('radius', 0, from);
        opt1 = burst._getPropByMod('radius', 1, from);
        opt8 = burst._getPropByMod('radius', 8, from);
        expect(opt0).toBe(40);
        expect(opt1).toBe(40);
        return expect(opt8).toBe(40);
      });
    });
    describe('_getOption method ->', function() {
      it('should return an option obj based on i ->', function() {
        var burst, option0, option1, option7;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        option0 = burst._getOption(0);
        option1 = burst._getOption(1);
        option7 = burst._getOption(7);
        expect(option0.radius[20]).toBe(50);
        expect(option1.radius).toBe(20);
        return expect(option7.radius).toBe(20);
      });
      it('should try to fallback to childDefaiults first ->', function() {
        var burst, option0, option1, option7, option8;
        burst = new Burst({
          duration: 2000,
          childOptions: {
            radius: [200, null, '500']
          }
        });
        option0 = burst._getOption(0);
        option1 = burst._getOption(1);
        option7 = burst._getOption(7);
        option8 = burst._getOption(8);
        expect(option0.radius).toBe(200);
        expect(option1.radius[5]).toBe(0);
        expect(option7.radius[5]).toBe(0);
        return expect(option8.radius).toBe('500');
      });
      it('should have parent only options ->', function() {
        var burst, option0;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          },
          angle: {
            50: 0
          }
        });
        option0 = burst._getOption(0);
        expect(option0.radius[5]).toBe(0);
        return expect(option0.angle).toBe(90);
      });
      it('should parse stagger ->', function() {
        var burst, option0, option1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2,
          childOptions: {
            angle: 'stagger(20, 40)'
          }
        });
        option0 = burst._getOption(0);
        option1 = burst._getOption(1);
        expect(option0.angle).toBe(90 + 20.);
        return expect(option1.angle).toBe(270 + (20 + 40));
      });
      return it('should parse rand ->', function() {
        var burst, option0, option1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2,
          childOptions: {
            angle: 'rand(20, 40)'
          }
        });
        option0 = burst._getOption(0);
        option1 = burst._getOption(1);
        expect(option0.angle).toBeGreaterThan(90 + 20.);
        return expect(option1.angle).not.toBeGreaterThan(270 + (20 + 40));
      });
    });
    describe('_calcSize method ->', function() {
      it('should calc set size to 2', function() {
        var bs;
        bs = new Burst;
        expect(bs._props.size).toBe(2);
        return expect(bs._props.center).toBe(1);
      });
      return it('should recieve size', function() {
        var bs;
        bs = new Burst({
          size: 40
        });
        expect(bs._props.size).toBe(40);
        return expect(bs._props.center).toBe(20);
      });
    });
    describe('_draw method ->', function() {
      return it('should call _drawEl method ->', function() {
        var bs;
        bs = new Burst;
        spyOn(bs, '_drawEl');
        bs._draw();
        return expect(bs._drawEl).toHaveBeenCalled();
      });
    });
    describe('_transformTweenOptions method ->', function() {
      it('should call _applyCallbackOverrides with _o.timeline', function() {
        var tr;
        tr = new Burst({
          timeline: {
            delay: 200
          }
        });
        spyOn(tr, '_applyCallbackOverrides').and.callThrough();
        tr._transformTweenOptions();
        return expect(tr._applyCallbackOverrides).toHaveBeenCalledWith(tr._o.unitTimeline);
      });
      it('should fallback to an empty `timeline options` object on _o', function() {
        var tr;
        tr = new Burst;
        return expect(tr._o.unitTimeline).toBeDefined();
      });
      return it('should add `this` as callbacksContext to the unitTimeline', function() {
        var b;
        b = new Burst;
        return expect(b.unitTimeline._o.callbacksContext).toBe(b);
      });
    });
    describe('_makeTimeline method ->', function() {
      it('should create unitTimeline', function() {
        var bs, opts;
        bs = new Burst;
        opts = bs._o.unitTimeline;
        bs._makeTimeline();
        expect(bs.unitTimeline instanceof mojs.Timeline).toBe(true);
        return expect(bs.unitTimeline._o).toBe(opts);
      });
      it('should add swirls to the unitTimeline', function() {
        var bs;
        bs = new Burst;
        bs.unitTimeline._timelines.length = 0;
        bs._makeTimeline();
        return expect(bs.unitTimeline._timelines.length).toBe(bs._defaults.count);
      });
      describe('if !wasTimelineLess ->', function() {
        it('should call super _makeTimeline', function() {
          var bs;
          bs = new Burst;
          spyOn(Burst.prototype, '_makeTimeline');
          bs._makeTimeline();
          return expect(Burst.prototype._makeTimeline).toHaveBeenCalled();
        });
        return it('should add unitTimeline', function() {
          var bs;
          bs = new Burst;
          bs._makeTimeline();
          return expect(bs.timeline._timelines[0]).toBe(bs.unitTimeline);
        });
      });
      describe('if wasTimelineLess ->', function() {
        return it('should set unitTimeline as timeline', function() {
          var bs;
          bs = new Burst;
          bs._o.wasTimelineLess = true;
          bs._makeTimeline();
          return expect(bs.timeline).toBe(bs.unitTimeline);
        });
      });
      return it('should reset _o.timeline object', function() {
        var bs;
        bs = new Burst({
          timeline: {
            delay: 400
          }
        });
        bs.timeline._timelines.length = 0;
        bs._makeTimeline();
        return expect(bs._o.timeline).toBe(null);
      });
    });
    describe('_makeTween method ->', function() {
      return it('should override parent', function() {
        var bs;
        bs = new Burst;
        spyOn(mojs.Tweenable.prototype, '_makeTween');
        bs._makeTween();
        return expect(mojs.Tweenable.prototype._makeTween).not.toHaveBeenCalled();
      });
    });
    describe('_getSidePoint method ->', function() {
      return it('should return the side\'s point', function() {
        var burst, point;
        burst = new Burst({
          radius: {
            5: 25
          },
          radiusX: {
            10: 20
          },
          radiusY: {
            30: 10
          }
        });
        point = burst._getSidePoint('start', 0);
        expect(point.x).toBeDefined();
        return expect(point.y).toBeDefined();
      });
    });
    describe('_getSideRadius method ->', function() {
      return it('should return the side\'s radius, radiusX and radiusY', function() {
        var burst, sides;
        burst = new Burst({
          radius: {
            5: 25
          },
          radiusX: {
            10: 20
          },
          radiusY: {
            30: 10
          }
        });
        sides = burst._getSideRadius('start');
        expect(sides.radius).toBe(5);
        expect(sides.radiusX).toBe(10);
        return expect(sides.radiusY).toBe(30);
      });
    });
    describe('_getRadiusByKey method ->', function() {
      return it('should return the key\'s radius', function() {
        var burst, radius, radiusX, radiusY;
        burst = new Burst({
          radius: {
            5: 25
          },
          radiusX: {
            10: 20
          },
          radiusY: {
            30: 20
          }
        });
        radius = burst._getRadiusByKey('radius', 'start');
        radiusX = burst._getRadiusByKey('radiusX', 'start');
        radiusY = burst._getRadiusByKey('radiusX', 'end');
        expect(radius).toBe(5);
        expect(radiusX).toBe(10);
        return expect(radiusY).toBe(20);
      });
    });
    describe('_getDeltaFromPoints method ->', function() {
      it('should return the delta', function() {
        var burst, delta;
        burst = new Burst;
        delta = burst._getDeltaFromPoints('x', {
          x: 10,
          y: 20
        }, {
          x: 20,
          y: 40
        });
        return expect(delta[10]).toBe(20);
      });
      return it('should return one value if start and end positions are equal', function() {
        var burst, delta;
        burst = new Burst;
        delta = burst._getDeltaFromPoints('x', {
          x: 10,
          y: 20
        }, {
          x: 10,
          y: 40
        });
        return expect(delta).toBe(10);
      });
    });
    describe('_addOptionalProperties method ->', function() {
      it('should return the passed object', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProperties(obj, 0);
        return expect(result).toBe(obj);
      });
      it('should add parent, index', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProperties(obj, 0);
        expect(result.index).toBe(0);
        return expect(result.parent).toBe(burst.el);
      });
      it('should hard rewrite `left` and `top` properties to 50%', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProperties(obj, 0);
        expect(result.left).toBe('50%');
        return expect(result.top).toBe('50%');
      });
      it('should add x/y ->', function() {
        var burst, obj0, obj1, result0, result1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2,
          size: 0
        });
        obj0 = {};
        obj1 = {};
        result0 = burst._addOptionalProperties(obj0, 0);
        result1 = burst._addOptionalProperties(obj1, 1);
        expect(obj0.x[0]).toBeCloseTo(0, 5);
        expect(obj0.y[0]).toBeCloseTo(-100, 5);
        expect(obj1.x[0]).toBeCloseTo(0, 5);
        return expect(obj1.y[0]).toBeCloseTo(100, 5);
      });
      it('should add x/y ->', function() {
        var burst, obj0, obj1, result0, result1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2,
          size: 0
        });
        obj0 = {};
        obj1 = {};
        result0 = burst._addOptionalProperties(obj0, 0);
        result1 = burst._addOptionalProperties(obj1, 1);
        expect(obj0.x[0]).toBeCloseTo(0, 5);
        expect(obj0.y[0]).toBeCloseTo(-100, 5);
        expect(obj1.x[0]).toBeCloseTo(0, 5);
        return expect(obj1.y[0]).toBeCloseTo(100, 5);
      });
      return it('should add angles ->', function() {
        var burst, obj0, obj1, result0, result1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2
        });
        obj0 = {
          angle: 0
        };
        obj1 = {
          angle: 0
        };
        result0 = burst._addOptionalProperties(obj0, 0);
        result1 = burst._addOptionalProperties(obj1, 1);
        expect(obj0.angle).toBe(90);
        return expect(obj1.angle).toBe(270);
      });
    });
    describe('_getBitAngle method ->', function() {
      it('should get angle by i', function() {
        var burst;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          }
        });
        expect(burst._getBitAngle(0, 0)).toBe(90);
        expect(burst._getBitAngle(0, 1)).toBe(162);
        expect(burst._getBitAngle(0, 2)).toBe(234);
        expect(burst._getBitAngle(90, 2)).toBe(234 + 90);
        expect(burst._getBitAngle(0, 3)).toBe(306);
        expect(burst._getBitAngle(90, 3)).toBe(306 + 90);
        expect(burst._getBitAngle(0, 4)).toBe(378);
        return expect(burst._getBitAngle(50, 4)).toBe(378 + 50);
      });
      it('should get delta angle by i', function() {
        var burst;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          }
        });
        expect(burst._getBitAngle({
          180: 0
        }, 0)[270]).toBe(90);
        expect(burst._getBitAngle({
          50: 20
        }, 3)[356]).toBe(326);
        return expect(burst._getBitAngle({
          50: 20
        }, 4)[428]).toBe(398);
      });
      it('should work with `stagger` values', function() {
        var burst;
        burst = new Burst({
          count: 2
        });
        expect(burst._getBitAngle({
          'stagger(20, 10)': 0
        }, 0)[110]).toBe(90);
        expect(burst._getBitAngle({
          'stagger(20, 10)': 0
        }, 1)[300]).toBe(270);
        return expect(burst._getBitAngle({
          0: 'stagger(20, 10)'
        }, 1)[270]).toBe(300);
      });
      return it('should work with `random` values', function() {
        var angle, baseAngle, burst, key, value, _i, _j, _k, _len, _len1, _len2, _results;
        burst = new Burst({
          count: 2
        });
        angle = burst._getBitAngle({
          'rand(10, 20)': 0
        }, 0);
        for (value = _i = 0, _len = angle.length; _i < _len; value = ++_i) {
          key = angle[value];
          baseAngle = 90;
          expect(parseInt(key)).toBeGreaterThan(baseAngle + 10);
          expect(parseInt(key)).not.toBeGreaterThan(baseAngle + 20);
          expect(parseInt(value)).toBe(baseAngle);
        }
        angle = burst._getBitAngle({
          'rand(10, 20)': 0
        }, 1);
        for (value = _j = 0, _len1 = angle.length; _j < _len1; value = ++_j) {
          key = angle[value];
          baseAngle = 270;
          expect(parseInt(key)).toBeGreaterThan(baseAngle + 10);
          expect(parseInt(key)).not.toBeGreaterThan(baseAngle + 20);
          expect(parseInt(value)).toBe(baseAngle);
        }
        angle = burst._getBitAngle({
          0: 'rand(10, 20)'
        }, 1);
        _results = [];
        for (value = _k = 0, _len2 = angle.length; _k < _len2; value = ++_k) {
          key = angle[value];
          baseAngle = 270;
          expect(parseInt(key)).toBe(baseAngle);
          expect(parseInt(value)).toBeGreaterThan(baseAngle + 10);
          _results.push(expect(parseInt(value)).not.toBeGreaterThan(baseAngle + 20));
        }
        return _results;
      });
    });
    describe('_extendDefaults method ->', function() {
      it('should call super', function() {
        var b;
        b = new Burst;
        spyOn(Swirl.prototype, '_extendDefaults');
        b._extendDefaults();
        return expect(Swirl.prototype._extendDefaults).toHaveBeenCalled();
      });
      return it('should call _calcSize', function() {
        var b;
        b = new Burst;
        spyOn(b, '_calcSize');
        b._extendDefaults();
        return expect(b._calcSize).toHaveBeenCalled();
      });
    });
    describe('_resetMergedFlags method', function() {
      it('should call the super method', function() {
        var b, obj;
        b = new Burst({
          count: 2
        });
        spyOn(Thenable.prototype, '_resetMergedFlags');
        obj = {};
        b._resetMergedFlags(obj);
        return expect(Thenable.prototype._resetMergedFlags).toHaveBeenCalledWith(obj);
      });
      it('should return the same object back', function() {
        var b, obj;
        b = new Burst({
          count: 2
        });
        obj = {};
        return expect(b._resetMergedFlags(obj)).toBe(obj);
      });
      it('should set isTimelineLess option to false', function() {
        var b, obj;
        b = new Burst({
          count: 2
        });
        obj = {};
        return expect(b._resetMergedFlags(obj).isTimelineLess).toBe(false);
      });
      return it('should save the isTimelineLess flag option to false', function() {
        var b, obj;
        b = new Burst({
          count: 2
        });
        obj = {};
        expect(b._resetMergedFlags(obj).wasTimelineLess).toBe(true);
        return expect(b._resetMergedFlags(obj).isTimelineLess).toBe(false);
      });
    });
    describe('_getThenOption method ->', function() {
      it('should get options from childOptions', function() {
        var b, o, result;
        b = new Burst({
          count: 2
        });
        o = {
          childOptions: {
            fill: ['yellow', 'cyan', 'blue']
          }
        };
        result = b._getThenOption(o, 1);
        return expect(result.fill).toBe('cyan');
      });
      return it('should not throw if there is no childOptions', function() {
        var b, o, result;
        b = new Burst({
          count: 2
        });
        o = {};
        result = b._getThenOption(o, 1);
        return expect(result).toEqual({});
      });
    });
    return describe('then method ->', function() {
      it('should return this', function() {
        var b;
        b = new Burst({
          count: 2
        });
        return expect(b.then({})).toBe(b);
      });
      it('should pass options to swirls', function() {
        var b;
        b = new Burst({
          count: 2
        });
        spyOn(b._swirls[0], 'then');
        spyOn(b._swirls[1], 'then');
        b.then({
          childOptions: {
            radius: [10, 20]
          }
        });
        expect(b._swirls[0].then).toHaveBeenCalledWith({
          radius: 10,
          parent: b._modules[1].el
        });
        return expect(b._swirls[1].then).toHaveBeenCalledWith({
          radius: 20,
          parent: b._modules[1].el
        });
      });
      it('should call _recalcTotalDuration method', function() {
        var b;
        b = new Burst({
          count: 2
        });
        spyOn(b.timeline, '_recalcTotalDuration');
        b.then({
          childOptions: {
            radius: [10, 20]
          }
        });
        return expect(b.timeline._recalcTotalDuration).toHaveBeenCalled();
      });
      it('should create swirless master Burst', function() {
        var b;
        b = new Burst({
          count: 2
        });
        b.then({
          childOptions: {
            radius: [10, 20]
          }
        });
        expect(b._modules[1] instanceof Burst).toBe(true);
        return expect(b._modules[1]._o.count).toBe(0);
      });
      it('should pass the swirlLess Burst to swirls', function() {
        var b;
        b = new Burst({
          count: 2
        });
        b.then({
          childOptions: {
            radius: [10, 20]
          }
        });
        return expect(b._swirls[1]._modules[1]._o.parent).toBe(b._modules[1].el);
      });
      it('should pass merged options to the master busrt', function() {
        var b;
        b = new Burst({
          count: 2,
          opacity: {
            0: 1
          }
        }).then({
          opacity: 0,
          childOptions: {
            radius: [10, 20]
          }
        });
        return expect(b._modules[1]._o.opacity[1]).toBe(0);
      });
      return it('should set duration prop on master Burst', function() {
        var b;
        b = new Burst({
          count: 2,
          opacity: {
            0: 1
          }
        }).then({
          opacity: 0,
          childOptions: {
            duration: 'stagger(100, 200)',
            radius: [10, 20]
          }
        });
        return expect(b._modules[1].timeline._props.duration).toBe(300);
      });
    });
  });

}).call(this);
