(function() {
  var Burst, Shape, ShapeSwirl, Tunable, h, t;

  Shape = mojs.Shape;

  ShapeSwirl = mojs.ShapeSwirl;

  Burst = mojs.Burst;

  Tunable = mojs.Tunable;

  t = mojs.tweener;

  h = mojs.h;

  describe('Burst ->', function() {
    beforeEach(function() {
      return t.removeAll();
    });
    describe('extension ->', function() {
      return it('should extend Shape class', function() {
        var burst;
        burst = new Burst;
        return expect(burst instanceof Tunable).toBe(true);
      });
    });
    describe('_defaults ->', function() {
      return it('should have Burst\'s defaults', function() {
        var burst;
        burst = new Burst;
        expect(burst._defaults.count).toBe(5);
        expect(burst._defaults.degree).toBe(360);
        expect(burst._defaults.radius).toEqual({
          0: 50
        });
        expect(burst._defaults.radiusX).toEqual(null);
        return expect(burst._defaults.radiusY).toEqual(null);
      });
    });
    describe('_extendDefaults method ->', function() {
      it('should call _removeTweenProperties method', function() {
        var b;
        b = new Burst;
        spyOn(b, '_removeTweenProperties');
        b._extendDefaults();
        return expect(b._removeTweenProperties).toHaveBeenCalledWith(b._o);
      });
      return it('should call super', function() {
        var burst;
        burst = new Burst;
        spyOn(mojs.Module.prototype, '_extendDefaults');
        burst._extendDefaults();
        return expect(mojs.Module.prototype._extendDefaults).toHaveBeenCalled();
      });
    });
    describe('_render method ->', function() {
      it('should create master swirl', function() {
        var burst;
        burst = new Burst;
        burst.masterSwirl = void 0;
        burst._render();
        return expect(burst.masterSwirl instanceof ShapeSwirl).toBe(true);
      });
      it('should set el of master swirl as el', function() {
        var burst;
        burst = new Burst;
        return expect(burst.el).toBe(burst.masterSwirl.el);
      });
      it('should pass options to master swirl', function() {
        var burst, opts;
        opts = {};
        burst = new Burst(opts);
        burst.masterSwirl = void 0;
        burst._render();
        return expect(burst.masterSwirl._o).toBe(opts);
      });
      it('should pass isWithShape option to master swirl', function() {
        var burst, opts;
        opts = {};
        burst = new Burst(opts);
        return expect(burst.masterSwirl._o.isWithShape).toBe(false);
      });
      it('should self as callbacksContext', function() {
        var burst, opts;
        opts = {};
        burst = new Burst(opts);
        return expect(burst.masterSwirl._o.callbacksContext).toBe(burst);
      });
      it('should call _saveTimelineOptions method', function() {
        var b, opts;
        opts = {};
        b = new Burst(opts);
        spyOn(b, '_saveTimelineOptions');
        b._render();
        return expect(b._saveTimelineOptions).toHaveBeenCalledWith(b._o);
      });
      it('should call _renderSwirls method', function() {
        var burst, opts;
        opts = {};
        burst = new Burst(opts);
        spyOn(burst, '_renderSwirls');
        burst._render();
        return expect(burst._renderSwirls).toHaveBeenCalled();
      });
      it('should create _masterSwirls object', function() {
        var burst;
        burst = new Burst;
        expect(burst._masterSwirls[0]).toBe(burst.masterSwirl);
        expect(typeof burst._masterSwirls).toBe('object');
        return expect(burst._masterSwirls).toBe(burst._masterSwirls);
      });
      it('should add optional properties to option', function() {
        var burst;
        burst = new Burst;
        spyOn(burst, '_addOptionalProps');
        burst._renderSwirls();
        return expect(burst._addOptionalProps.calls.count()).toBe(5);
      });
      it('should set time on tween of masterSwirl', function() {
        var burst;
        burst = new Burst({
          children: {
            duration: 'stagger(500, 1000)',
            repeat: 2
          }
        });
        burst.masterSwirl.tween._props.duration = null;
        burst._renderSwirls();
        return expect(burst.masterSwirl.tween._props.duration).toBe(burst._calcPackTime(burst._swirls[0]));
      });
      return it('should set isSwirl to false by default', function() {
        var burst;
        burst = new Burst({
          children: {
            duration: 'stagger(500, 1000)',
            repeat: 2
          }
        });
        return expect(burst.masterSwirl._props.isSwirl).toBe(false);
      });
    });
    describe('_renderSwirls method', function() {
      it('should create _swirls object', function() {
        var burst;
        burst = new Burst;
        expect(typeof burst._swirls).toBe('object');
        return expect(burst._swirls).toBe(burst._swirls);
      });
      it('should create _swirls pack', function() {
        var burst, count, pack;
        count = 5;
        burst = new Burst({
          count: count
        });
        pack = burst._swirls[0];
        expect(h.isArray(pack)).toBe(true);
        expect(pack.length).toBe(count);
        expect(pack[0] instanceof ShapeSwirl).toBe(true);
        expect(pack[1] instanceof ShapeSwirl).toBe(true);
        expect(pack[2] instanceof ShapeSwirl).toBe(true);
        expect(pack[3] instanceof ShapeSwirl).toBe(true);
        return expect(pack[4] instanceof ShapeSwirl).toBe(true);
      });
      it('should pass options to swirls', function() {
        var burst, count, fills, pack;
        count = 5;
        fills = ['cyan', 'yellow', 'blue'];
        burst = new Burst({
          count: count,
          children: {
            fill: fills
          }
        });
        pack = burst._swirls[0];
        expect(pack[0]._o.fill).toBe(fills[0]);
        expect(pack[1]._o.fill).toBe(fills[1]);
        expect(pack[2]._o.fill).toBe(fills[2]);
        expect(pack[3]._o.fill).toBe(fills[0]);
        return expect(pack[4]._o.fill).toBe(fills[1]);
      });
      return it('should parent to swirls', function() {
        var burst, count, pack;
        count = 5;
        burst = new Burst({
          count: count
        });
        pack = burst._swirls[0];
        expect(pack[0]._o.parent).toBe(burst.masterSwirl.el);
        expect(pack[1]._o.parent).toBe(burst.masterSwirl.el);
        expect(pack[2]._o.parent).toBe(burst.masterSwirl.el);
        expect(pack[3]._o.parent).toBe(burst.masterSwirl.el);
        return expect(pack[4]._o.parent).toBe(burst.masterSwirl.el);
      });
    });
    describe('_getChildOption method ->', function() {
      return it('should get options from swirls', function() {
        var b, o, result;
        b = new Burst({
          count: 2
        });
        o = {
          children: {
            fill: ['yellow', 'cyan', 'blue']
          }
        };
        result = b._getChildOption(o, 1);
        expect(result.fill).toBe('cyan');
        return it('should not throw if there is no swirls', function() {
          b = new Burst({
            count: 2
          });
          o = {};
          result = b._getChildOption(o, 1);
          return expect(result).toEqual({});
        });
      });
    });
    describe('_getPropByMod method ->', function() {
      it('should fallback to empty object', function() {
        var burst, opt0;
        burst = new Burst({
          children: {
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
          children: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        opt0 = burst._getPropByMod('radius', 0, burst._o.children);
        opt1 = burst._getPropByMod('radius', 1, burst._o.children);
        opt2 = burst._getPropByMod('radius', 2, burst._o.children);
        opt8 = burst._getPropByMod('radius', 8, burst._o.children);
        expect(opt0[20]).toBe(50);
        expect(opt1).toBe(20);
        expect(opt2).toBe('500');
        return expect(opt8).toBe('500');
      });
      it('should the same prop if not an array ->', function() {
        var burst, opt0, opt1, opt8;
        burst = new Burst({
          children: {
            radius: 20
          }
        });
        opt0 = burst._getPropByMod('radius', 0, burst._o.children);
        opt1 = burst._getPropByMod('radius', 1, burst._o.children);
        opt8 = burst._getPropByMod('radius', 8, burst._o.children);
        expect(opt0).toBe(20);
        expect(opt1).toBe(20);
        return expect(opt8).toBe(20);
      });
      return it('should work with another options object ->', function() {
        var burst, from, opt0, opt1, opt8;
        burst = new Burst({
          fill: 'cyan',
          children: {
            radius: 20
          }
        });
        from = burst._o;
        opt0 = burst._getPropByMod('fill', 0, from);
        opt1 = burst._getPropByMod('fill', 1, from);
        opt8 = burst._getPropByMod('fill', 8, from);
        expect(opt0).toBe('cyan');
        expect(opt1).toBe('cyan');
        return expect(opt8).toBe('cyan');
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
    describe('_makeTimeline method ->', function() {
      it('should restore timeline options on _o', function() {
        var bs, timeline;
        timeline = {};
        bs = new Burst({
          timeline: timeline
        });
        bs._makeTimeline();
        return expect(bs._o.timeline).toBe(timeline);
      });
      it('should call super', function() {
        var bs;
        bs = new Burst;
        spyOn(mojs.Tweenable.prototype, '_makeTimeline');
        bs._makeTimeline();
        return expect(mojs.Tweenable.prototype._makeTimeline).toHaveBeenCalled();
      });
      it('should add masterSwirl to the timeline', function() {
        var bs;
        bs = new Burst;
        return expect(bs.timeline._timelines[0]).toBe(bs.masterSwirl.timeline);
      });
      return it('should add swirls to the timeline', function() {
        var bs;
        bs = new Burst({
          count: 5
        });
        expect(bs.timeline._timelines[1]).toBe(bs._swirls[0][0].timeline);
        expect(bs.timeline._timelines[2]).toBe(bs._swirls[0][1].timeline);
        expect(bs.timeline._timelines[3]).toBe(bs._swirls[0][2].timeline);
        expect(bs.timeline._timelines[4]).toBe(bs._swirls[0][3].timeline);
        return expect(bs.timeline._timelines[5]).toBe(bs._swirls[0][4].timeline);
      });
    });
    describe('_addOptionalProps method ->', function() {
      it('should return the passed object', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProps(obj, 0);
        return expect(result).toBe(obj);
      });
      it('should add parent, index', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProps(obj, 0);
        expect(result.index).toBe(0);
        return expect(result.parent).toBe(burst.masterSwirl.el);
      });
      it('should add x/y', function() {
        var burst, eps, isClose, isZero, obj0, obj1, result0, result1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2,
          size: 0
        });
        obj0 = {};
        obj1 = {};
        result0 = burst._addOptionalProps(obj0, 0);
        result1 = burst._addOptionalProps(obj1, 1);
        eps = 0.00001;
        isClose = obj0.x[0] - 0 < eps;
        isZero = obj0.x === 0;
        expect(isClose || isZero).toBe(true);
        expect(obj0.y[0]).toBeCloseTo(-100, 5);
        eps = 0.00001;
        isClose = obj1.x[0] - 0 < eps;
        isZero = obj1.x === 0;
        expect(isClose || isZero).toBe(true);
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
        result0 = burst._addOptionalProps(obj0, 0);
        result1 = burst._addOptionalProps(obj1, 1);
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
        expect(burst._getBitAngle(0, 0, 0)).toBe(90);
        expect(burst._getBitAngle(0, 0, 1)).toBe(162);
        expect(burst._getBitAngle(0, 0, 2)).toBe(234);
        expect(burst._getBitAngle(90, 0, 2)).toBe(234 + 90);
        expect(burst._getBitAngle(0, 0, 3)).toBe(306);
        expect(burst._getBitAngle(90, 0, 3)).toBe(306 + 90);
        expect(burst._getBitAngle(0, 0, 4)).toBe(378);
        return expect(burst._getBitAngle(50, 0, 4)).toBe(378 + 50);
      });
      it('should add with angleShift', function() {
        var burst;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          }
        });
        expect(burst._getBitAngle(0, 0, 0)).toBe(90);
        expect(burst._getBitAngle(0, 10, 1)).toBe(162 + 10);
        expect(burst._getBitAngle(0, 30, 2)).toBe(234 + 30);
        expect(burst._getBitAngle(90, 40, 2)).toBe(234 + 90 + 40);
        expect(burst._getBitAngle(0, 20, 3)).toBe(306 + 20);
        expect(burst._getBitAngle(90, 25, 3)).toBe(306 + 90 + 25);
        expect(burst._getBitAngle(0, 10, 4)).toBe(378 + 10);
        return expect(burst._getBitAngle(50, 60, 4)).toBe(378 + 50 + 60);
      });
      it('should fallback to 0', function() {
        var burst;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          }
        });
        expect(burst._getBitAngle(void 0, 0, 0)).toBe(90);
        expect(burst._getBitAngle(void 0, 0, 1)).toBe(162);
        return expect(burst._getBitAngle(void 0, 0, 2)).toBe(234);
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
        }, 0, 0)[270]).toBe(90);
        expect(burst._getBitAngle({
          50: 20
        }, 0, 3)[356]).toBe(326);
        return expect(burst._getBitAngle({
          50: 20
        }, 0, 4)[428]).toBe(398);
      });
      it('should add angleShift to deltas', function() {
        var burst;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          }
        });
        expect(burst._getBitAngle({
          180: 0
        }, 20, 0)[270 + 20]).toBe(90 + 20);
        expect(burst._getBitAngle({
          50: 20
        }, 30, 3)[356 + 30]).toBe(326 + 30);
        return expect(burst._getBitAngle({
          50: 20
        }, 50, 4)[428 + 50]).toBe(398 + 50);
      });
      it('should work with `stagger` values', function() {
        var burst;
        burst = new Burst({
          count: 2
        });
        expect(burst._getBitAngle({
          'stagger(20, 10)': 0
        }, 0, 0)[110]).toBe(90);
        expect(burst._getBitAngle({
          'stagger(20, 10)': 0
        }, 0, 1)[300]).toBe(270);
        return expect(burst._getBitAngle({
          0: 'stagger(20, 10)'
        }, 0, 1)[270]).toBe(300);
      });
      return it('should work with `random` values', function() {
        var angle, baseAngle, burst, key, value, _i, _j, _k, _len, _len1, _len2, _results;
        burst = new Burst({
          count: 2
        });
        angle = burst._getBitAngle({
          'rand(10, 20)': 0
        }, 0, 0);
        for (value = _i = 0, _len = angle.length; _i < _len; value = ++_i) {
          key = angle[value];
          baseAngle = 90;
          expect(parseInt(key)).toBeGreaterThan(baseAngle + 10);
          expect(parseInt(key)).not.toBeGreaterThan(baseAngle + 20);
          expect(parseInt(value)).toBe(baseAngle);
        }
        angle = burst._getBitAngle({
          'rand(10, 20)': 0
        }, 0, 1);
        for (value = _j = 0, _len1 = angle.length; _j < _len1; value = ++_j) {
          key = angle[value];
          baseAngle = 270;
          expect(parseInt(key)).toBeGreaterThan(baseAngle + 10);
          expect(parseInt(key)).not.toBeGreaterThan(baseAngle + 20);
          expect(parseInt(value)).toBe(baseAngle);
        }
        angle = burst._getBitAngle({
          0: 'rand(10, 20)'
        }, 0, 1);
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
    describe('_getSidePoint method ->', function() {
      it('should return the side\'s point', function() {
        var burst, point0;
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
        point0 = burst._getSidePoint('start', 0);
        expect(point0.x).toBeDefined();
        return expect(point0.y).toBeDefined();
      });
      return it('should return the side\'s point by i', function() {
        var burst, point0, point1;
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
        }).then({
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
        spyOn(burst, '_getSideRadius').and.callThrough();
        point0 = burst._getSidePoint('start', 0, 0);
        expect(burst._getSideRadius).toHaveBeenCalledWith('start', 0);
        expect(burst._getSideRadius.calls.count()).toBe(1);
        point1 = burst._getSidePoint('start', 0, 1);
        expect(burst._getSideRadius).toHaveBeenCalledWith('start', 1);
        return expect(burst._getSideRadius.calls.count()).toBe(2);
      });
    });
    describe('_getSideRadius method ->', function() {
      it('should return the side\'s radius, radiusX and radiusY', function() {
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
      return it('should return the side\'s radius, radiusX and radiusY by i', function() {
        var burst, sidesE, sidesS;
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
        }).then({
          radius: {
            20: 40
          },
          radiusX: {
            50: 10
          },
          radiusY: {
            10: 20
          }
        });
        sidesS = burst._getSideRadius('start');
        sidesE = burst._getSideRadius('end');
        expect(sidesS.radius).toBe(5);
        expect(sidesS.radiusX).toBe(10);
        expect(sidesS.radiusY).toBe(30);
        expect(sidesE.radius).toBe(25);
        expect(sidesE.radiusX).toBe(20);
        expect(sidesE.radiusY).toBe(10);
        sidesS = burst._getSideRadius('start', 1);
        sidesE = burst._getSideRadius('end', 1);
        expect(sidesS.radius).toBe(20);
        expect(sidesS.radiusX).toBe(50);
        expect(sidesS.radiusY).toBe(10);
        expect(sidesE.radius).toBe(40);
        expect(sidesE.radiusX).toBe(10);
        return expect(sidesE.radiusY).toBe(20);
      });
    });
    describe('_getRadiusByKey method ->', function() {
      it('should return the key\'s radius', function() {
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
      it('should return the key\'s radius of the last master module // plain', function() {
        var burst, radiusE, radiusS, radiusXE, radiusXS, radiusYE, radiusYS;
        burst = new Burst({
          radius: 5,
          radiusX: 10,
          radiusY: 30
        }).then({
          radius: 25,
          radiusX: 20,
          radiusY: 40
        });
        radiusS = burst._getRadiusByKey('radius', 'start', 1);
        radiusXS = burst._getRadiusByKey('radiusX', 'start', 1);
        radiusYS = burst._getRadiusByKey('radiusY', 'start', 1);
        radiusE = burst._getRadiusByKey('radius', 'end', 1);
        radiusXE = burst._getRadiusByKey('radiusX', 'end', 1);
        radiusYE = burst._getRadiusByKey('radiusY', 'end', 1);
        expect(radiusS).toBe(5);
        expect(radiusXS).toBe(10);
        expect(radiusYS).toBe(30);
        expect(radiusE).toBe(25);
        expect(radiusXE).toBe(20);
        return expect(radiusYE).toBe(40);
      });
      return it('should return the key\'s radius of the last master module // deltas', function() {
        var burst, radiusE, radiusS, radiusXE, radiusXS, radiusYE, radiusYS;
        burst = new Burst({
          radius: 5,
          radiusX: 10,
          radiusY: 30
        }).then({
          radius: {
            10: 25
          },
          radiusX: {
            30: 20
          },
          radiusY: {
            25: 30
          }
        });
        radiusS = burst._getRadiusByKey('radius', 'start', 1);
        radiusXS = burst._getRadiusByKey('radiusX', 'start', 1);
        radiusYS = burst._getRadiusByKey('radiusY', 'start', 1);
        radiusE = burst._getRadiusByKey('radius', 'end', 1);
        radiusXE = burst._getRadiusByKey('radiusX', 'end', 1);
        radiusYE = burst._getRadiusByKey('radiusY', 'end', 1);
        expect(radiusS).toBe(10);
        expect(radiusXS).toBe(30);
        expect(radiusYS).toBe(25);
        expect(radiusE).toBe(25);
        expect(radiusXE).toBe(20);
        return expect(radiusYE).toBe(30);
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
    describe('_vars method ->', function() {
      it('should call super', function() {
        var burst;
        burst = new Burst;
        spyOn(mojs.Thenable.prototype, '_vars');
        burst._vars();
        return expect(mojs.Thenable.prototype._vars).toHaveBeenCalled();
      });
      return it('should create _bufferTimeline', function() {
        var burst;
        burst = new Burst;
        burst._bufferTimeline = null;
        burst._vars();
        return expect(burst._bufferTimeline instanceof mojs.Timeline).toBe(true);
      });
    });
    describe('_recalcModulesTime method', function() {
      it('should set duration on every moddules tween', function() {
        var b, modules, shiftTime, time;
        b = new Burst({
          fill: 'cyan'
        }).then({
          'fill': 'yellow'
        });
        shiftTime = 0;
        modules = b.masterSwirl._modules;
        spyOn(b, '_calcPackTime').and.callThrough();
        b._recalcModulesTime();
        expect(b._calcPackTime).toHaveBeenCalledWith(b._swirls[0]);
        time = b._calcPackTime(b._swirls[0]);
        expect(modules[0].tween._props.duration).toBe(time);
        expect(modules[0].tween._props.shiftTime).toBe(shiftTime);
        shiftTime += time;
        expect(b._calcPackTime).toHaveBeenCalledWith(b._swirls[1]);
        time = b._calcPackTime(b._swirls[1]);
        expect(modules[1].tween._props.duration).toBe(time);
        expect(modules[1].tween._props.shiftTime).toBe(shiftTime);
        return shiftTime += time;
      });
      return it('should call _recalcTotalDuration on main timeline', function() {
        var b;
        b = new Burst({
          fill: 'cyan'
        }).then({
          'fill': 'yellow'
        });
        spyOn(b.timeline, '_recalcTotalDuration');
        b._recalcModulesTime();
        return expect(b.timeline._recalcTotalDuration).toHaveBeenCalled();
      });
    });
    describe('_masterThen method ->', function() {
      it('should pass options to masterSwirl', function() {
        var b, o;
        b = new Burst({
          count: 2
        });
        spyOn(b.masterSwirl, 'then');
        o = {
          opacity: .5
        };
        b._masterThen(o);
        return expect(b.masterSwirl.then).toHaveBeenCalledWith(o);
      });
      it('should save the new master swirl', function() {
        var b;
        b = new Burst({
          count: 2
        });
        b._masterThen({
          opacity: .5
        });
        return expect(b._masterSwirls.length).toBe(2);
      });
      return it('should return the new swirl', function() {
        var b, result;
        b = new Burst({
          count: 2
        });
        result = b._masterThen({
          opacity: .5
        });
        return expect(result).toBe(b._masterSwirls[b._masterSwirls.length - 1]);
      });
    });
    describe('_childThen method ->', function() {
      it('should pass options to swirls', function() {
        var b, o, option0, option1, pack;
        b = new Burst({
          count: 2
        });
        pack = b._swirls[0];
        spyOn(pack[0], 'then');
        spyOn(pack[1], 'then');
        o = {
          children: {
            radius: [10, 20]
          }
        };
        b._childThen(o, b._masterThen(o));
        option0 = b._getChildOption(o, 0);
        option0.parent = b._masterSwirls[1].el;
        b._addBurstProperties(option0, 0, 1);
        expect(pack[0].then).toHaveBeenCalledWith(option0);
        option1 = b._getChildOption(o, 1);
        option1.parent = b._masterSwirls[1].el;
        b._addBurstProperties(option1, 1, 1);
        return expect(pack[1].then).toHaveBeenCalledWith(option1);
      });
      it('should call _addBurstProperties with the latest main swirl', function() {
        var b, o, option0, option1, pack;
        b = new Burst({
          count: 2
        });
        spyOn(b, '_addBurstProperties');
        pack = b._swirls[0];
        o = {
          children: {
            radius: [10, 20]
          }
        };
        b._childThen(o, b._masterThen(o));
        option0 = b._getChildOption(o, 0);
        option0.parent = b._masterSwirls[1].el;
        expect(b._addBurstProperties).toHaveBeenCalledWith(option0, 0, 1);
        option1 = b._getChildOption(o, 1);
        option1.parent = b._masterSwirls[1].el;
        return expect(b._addBurstProperties).toHaveBeenCalledWith(option1, 1, 1);
      });
      it('should save new swirls to _swirls', function() {
        var b, o;
        b = new Burst({
          count: 2
        });
        o = {
          children: {
            radius: [10, 20]
          }
        };
        b._masterThen(o);
        b._childThen(o);
        expect(b._swirls[1].length).toBe(2);
        expect(b._swirls[1][0] instanceof ShapeSwirl).toBe(true);
        return expect(b._swirls[1][1] instanceof ShapeSwirl).toBe(true);
      });
      return it('should return the new pack', function() {
        var b, o, result;
        b = new Burst({
          count: 2
        });
        o = {
          children: {
            radius: [10, 20]
          }
        };
        b._masterThen(o);
        result = b._childThen(o);
        return expect(result).toBe(b._swirls[1]);
      });
    });
    describe('then method ->', function() {
      it('should return this', function() {
        var b;
        b = new Burst({
          count: 2
        });
        return expect(b.then({})).toBe(b);
      });
      it('should call _removeTweenProperties method', function() {
        var b, options;
        b = new Burst;
        spyOn(b, '_removeTweenProperties');
        options = {
          x: 200
        };
        b.then(options);
        return expect(b._removeTweenProperties).toHaveBeenCalledWith(options);
      });
      it('should call _masterThen method', function() {
        var b, options;
        b = new Burst({
          count: 2
        });
        spyOn(b, '_masterThen').and.callThrough();
        options = {};
        b.then(options);
        return expect(b._masterThen).toHaveBeenCalledWith(options);
      });
      it('should call _childThen method', function() {
        var b, options;
        b = new Burst({
          count: 2
        });
        spyOn(b, '_childThen').and.callThrough();
        options = {};
        b.then(options);
        expect(b._childThen.calls.count()).toBe(1);
        return expect(b._childThen.calls.first().args[0]).toBe(options);
      });
      it('should set duration on new master swirl', function() {
        var b, time;
        b = new Burst({
          count: 2
        });
        spyOn(b, '_setSwirlDuration').and.callThrough();
        b.then({
          children: {
            duration: 50
          }
        });
        time = b._calcPackTime(b._swirls[1]);
        expect(b._setSwirlDuration.calls.count()).toBe(1);
        expect(b._setSwirlDuration.calls.first().args[0]).toBe(b._masterSwirls[1]);
        return expect(b._setSwirlDuration.calls.first().args[1]).toBe(time);
      });
      return it('should call _recalcTotalDuration method', function() {
        var b;
        b = new Burst({
          count: 2
        });
        spyOn(b.timeline, '_recalcTotalDuration');
        b.then({
          children: {
            radius: [10, 20]
          }
        });
        return expect(b.timeline._recalcTotalDuration).toHaveBeenCalled();
      });
    });
    describe('_calcPackTime method ->', function() {
      return it('should calculate time of swirls array', function() {
        var b, i, maxTime, p, pack, sw, swirl, tm, tween, _i, _len;
        sw = new ShapeSwirl;
        sw.timeline._props.shiftTime = 200000;
        pack = [
          sw, new ShapeSwirl({
            duration: 2000
          }), new ShapeSwirl({
            duration: 1800,
            delay: 400
          }), new ShapeSwirl({
            duration: 4000,
            speed: 3
          })
        ];
        b = new Burst;
        tm = new mojs.Timeline;
        maxTime = 0;
        for (i = _i = 0, _len = pack.length; _i < _len; i = ++_i) {
          swirl = pack[i];
          tween = swirl.tween;
          p = tween._props;
          maxTime = Math.max(p.repeatTime / p.speed, maxTime);
        }
        return expect(b._calcPackTime(pack)).toBe(maxTime);
      });
    });
    describe('_setSwirlDuration method ->', function() {
      it('should set tweens time', function() {
        var b, duration, sw;
        b = new Burst;
        sw = new ShapeSwirl;
        spyOn(sw.tween, '_setProp');
        spyOn(sw.timeline, '_recalcTotalDuration');
        duration = 10;
        b._setSwirlDuration(sw, duration);
        expect(sw.tween._setProp).toHaveBeenCalledWith('duration', duration);
        return expect(sw.timeline._recalcTotalDuration).toHaveBeenCalled();
      });
      return it('should not throw if Swirl has no timeline', function() {
        var b, set, sw;
        b = new Burst;
        sw = new ShapeSwirl;
        sw.timeline = sw.tween;
        set = function() {
          return b._setSwirlDuration(sw, 10);
        };
        return expect(set).not.toThrow();
      });
    });
    describe('tune method ->', function() {
      it('should return `this`', function() {
        var b;
        b = new Burst;
        return expect(b.tune({
          x: 200
        })).toBe(b);
      });
      it('should call _tuneNewOptions method', function() {
        var b, options;
        b = new Burst;
        spyOn(b, '_tuneNewOptions');
        options = {
          x: 200
        };
        b.tune(options);
        return expect(b._tuneNewOptions).toHaveBeenCalledWith(options);
      });
      it('should not call _tuneNewOptions method if no options', function() {
        var b, options, result;
        b = new Burst;
        spyOn(b, '_tuneNewOptions');
        options = null;
        result = b.tune(options);
        expect(b._tuneNewOptions).not.toHaveBeenCalledWith(options);
        return expect(result).toBe(b);
      });
      it('should call tune on masterSwirl', function() {
        var b, options;
        b = new Burst;
        spyOn(b.masterSwirl, 'tune');
        options = {
          x: 200
        };
        b.tune(options);
        return expect(b.masterSwirl.tune).toHaveBeenCalledWith(options);
      });
      it('should call _tuneSwirls method', function() {
        var b, options;
        b = new Burst;
        spyOn(b, '_tuneSwirls');
        options = {
          x: 200
        };
        b.tune(options);
        return expect(b._tuneSwirls).toHaveBeenCalledWith(options);
      });
      it('should call tune 0 pack swirls', function() {
        var args, b, option0, option1, option2, option3, option4, options, pack0, swirls;
        b = new Burst;
        pack0 = b._swirls[0];
        spyOn(pack0[0], 'tune');
        spyOn(pack0[1], 'tune');
        spyOn(pack0[2], 'tune');
        spyOn(pack0[3], 'tune');
        spyOn(pack0[4], 'tune');
        swirls = {
          x: 200,
          fill: ['cyan', 'yellow']
        };
        options = {
          children: swirls
        };
        b.tune(options);
        option0 = b._getChildOption(options, 0);
        b._addBurstProperties(option0, 0);
        args = pack0[0].tune.calls.first().args;
        expect(args[0]).toEqual(option0);
        option1 = b._getChildOption(options, 1);
        b._addBurstProperties(option1, 1);
        args = pack0[1].tune.calls.first().args;
        expect(args[0]).toEqual(option1);
        option2 = b._getChildOption(options, 2);
        b._addBurstProperties(option2, 2);
        args = pack0[2].tune.calls.first().args;
        expect(args[0]).toEqual(option2);
        option3 = b._getChildOption(options, 3);
        b._addBurstProperties(option3, 3);
        args = pack0[3].tune.calls.first().args;
        expect(args[0]).toEqual(option3);
        option4 = b._getChildOption(options, 4);
        b._addBurstProperties(option4, 4);
        args = pack0[4].tune.calls.first().args;
        return expect(args[0]).toEqual(option4);
      });
      it('should add Burst properties to options', function() {
        var b, options;
        b = new Burst;
        spyOn(b.masterSwirl, 'tune');
        options = {
          x: 200
        };
        spyOn(b, '_addBurstProperties');
        b.tune(options);
        expect(b._addBurstProperties).toHaveBeenCalledWith({}, 0);
        expect(b._addBurstProperties).toHaveBeenCalledWith({}, 1);
        expect(b._addBurstProperties).toHaveBeenCalledWith({}, 2);
        expect(b._addBurstProperties).toHaveBeenCalledWith({}, 3);
        return expect(b._addBurstProperties).toHaveBeenCalledWith({}, 4);
      });
      it('should call _recalcModulesTime method', function() {
        var b, options;
        b = new Burst;
        spyOn(b, '_recalcModulesTime');
        options = {
          x: 200
        };
        b.tune(options);
        return expect(b._recalcModulesTime).toHaveBeenCalled();
      });
      it('should call _saveTimelineOptions method', function() {
        var b, options;
        b = new Burst;
        spyOn(b, '_saveTimelineOptions');
        options = {
          x: 200
        };
        b.tune(options);
        return expect(b._saveTimelineOptions).toHaveBeenCalledWith(options);
      });
      return it('should set new options on timeline', function() {
        var b, options;
        b = new Burst;
        spyOn(b.timeline, '_setProp');
        options = {
          x: 200
        };
        b.tune(options);
        return expect(b.timeline._setProp).toHaveBeenCalledWith(b._timelineOptions);
      });
    });
    describe('_removeTweenProperties method ->', function() {
      return it('should remove all tween props from passed object', function() {
        var b, key, o, _results;
        b = new Burst;
        o = {};
        for (key in h.tweenOptionMap) {
          o[key] = 1;
        }
        for (key in b._defaults) {
          o[key] = 1;
        }
        b._removeTweenProperties(o);
        _results = [];
        for (key in h.tweenOptionMap) {
          _results.push(expect(o[key]).not.toBeDefined());
        }
        return _results;
      });
    });
    describe('_saveTimelineOptions method ->', function() {
      return it('should save timeline options to _timelineOptions', function() {
        var b, opts, timeline;
        b = new Burst;
        timeline = {};
        opts = {
          timeline: timeline
        };
        b._saveTimelineOptions(opts);
        expect(b._timelineOptions).toBe(timeline);
        return expect(opts.timeline).not.toBeDefined();
      });
    });
    describe('_addBurstProperties method ->', function() {
      it('should calculate bit angle', function() {
        var angle, b, obj;
        b = new Burst;
        angle = 20;
        obj = {
          angle: angle
        };
        b._addBurstProperties(obj, 1);
        return expect(obj.angle).toBe(b._getBitAngle(angle, 0, 1));
      });
      it('should calculate bit x and y', function() {
        var b, degreeCnt, index, obj, p, pointEnd, pointStart, step;
        index = 1;
        b = new Burst;
        obj = {};
        b._addBurstProperties(obj, index);
        p = b._props;
        degreeCnt = p.degree % 360 === 0 ? p.count : p.count - 1 || 1;
        step = p.degree / degreeCnt;
        pointStart = b._getSidePoint('start', index * step);
        pointEnd = b._getSidePoint('end', index * step);
        expect(obj.x).toEqual(b._getDeltaFromPoints('x', pointStart, pointEnd));
        return expect(obj.y).toEqual(b._getDeltaFromPoints('y', pointStart, pointEnd));
      });
      it('should calculate bit x/y and angle regarding degreeShift', function() {
        var angle, b, degreeCnt, degreeShifts, index, obj, p, pointEnd, pointStart, step;
        index = 1;
        angle = 20;
        degreeShifts = [0, 10, 20];
        b = new Burst({
          children: {
            degreeShift: degreeShifts
          }
        });
        obj = {
          angle: angle,
          degreeShift: degreeShifts[index]
        };
        b._addBurstProperties(obj, index);
        p = b._props;
        degreeCnt = p.degree % 360 === 0 ? p.count : p.count - 1 || 1;
        step = p.degree / degreeCnt;
        pointStart = b._getSidePoint('start', index * step + degreeShifts[index]);
        pointEnd = b._getSidePoint('end', index * step + degreeShifts[index]);
        expect(obj.x).toEqual(b._getDeltaFromPoints('x', pointStart, pointEnd));
        expect(obj.y).toEqual(b._getDeltaFromPoints('y', pointStart, pointEnd));
        return expect(obj.angle).toEqual(b._getBitAngle(angle + degreeShifts[index], 0, index));
      });
      it('should calculate bit x/y and angle regarding stagger', function() {
        var angle, b, degreeCnt, index, obj, p, pointEnd, pointStart, step;
        index = 2;
        angle = 20;
        b = new Burst({
          children: {
            degreeShift: 'stagger(200)'
          }
        });
        obj = {
          angle: angle,
          degreeShift: 'stagger(200)'
        };
        b._addBurstProperties(obj, index);
        p = b._props;
        degreeCnt = p.degree % 360 === 0 ? p.count : p.count - 1 || 1;
        step = p.degree / degreeCnt;
        pointStart = b._getSidePoint('start', index * step + 400);
        pointEnd = b._getSidePoint('end', index * step + 400);
        expect(obj.x).toEqual(b._getDeltaFromPoints('x', pointStart, pointEnd));
        expect(obj.y).toEqual(b._getDeltaFromPoints('y', pointStart, pointEnd));
        return expect(obj.angle).toEqual(b._getBitAngle(angle + 400, 0, index));
      });
      it('should fallback to 0 for angle', function() {
        var b, degreeCnt, index, obj, p, pointEnd, pointStart, step;
        index = 2;
        b = new Burst({
          children: {
            degreeShift: 'stagger(200)'
          }
        });
        obj = {
          degreeShift: 'stagger(200)'
        };
        b._addBurstProperties(obj, index);
        p = b._props;
        degreeCnt = p.degree % 360 === 0 ? p.count : p.count - 1 || 1;
        step = p.degree / degreeCnt;
        pointStart = b._getSidePoint('start', index * step + 400);
        pointEnd = b._getSidePoint('end', index * step + 400);
        return expect(obj.angle).toEqual(b._getBitAngle(0, 400, index));
      });
      return it('should call _getSidePoint with passed index', function() {
        var b, obj;
        b = new Burst({
          count: 2
        }).then({
          radius: 20
        });
        spyOn(b, '_getSidePoint').and.callThrough();
        obj = {};
        b._addBurstProperties(obj, 2, 1);
        expect(b._getSidePoint).toHaveBeenCalledWith('start', 360, 1);
        return expect(b._getSidePoint).toHaveBeenCalledWith('end', 360, 1);
      });
    });
    describe('_refreshBurstOptions method ->', function() {
      return it('should call _tuneNewOptions with results of _addBurstProperties', function() {
        var b, j, module, modules, options, _i, _j, _ref, _ref1, _results;
        b = new Burst({
          count: 4
        }).then({
          radius: 20
        }).then({
          radius: 30
        });
        modules = b._swirls[0][0]._modules;
        for (j = _i = 1, _ref = modules.length; 1 <= _ref ? _i < _ref : _i > _ref; j = 1 <= _ref ? ++_i : --_i) {
          module = modules[j];
          spyOn(module, '_tuneNewOptions').and.callThrough();
        }
        b._refreshBurstOptions(modules, 1);
        _results = [];
        for (j = _j = 1, _ref1 = modules.length; 1 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 1 <= _ref1 ? ++_j : --_j) {
          module = modules[j];
          options = {};
          b._addBurstProperties(options, 1, j);
          _results.push(expect(module._tuneNewOptions).toHaveBeenCalledWith(options));
        }
        return _results;
      });
    });
    describe('_tuneSwirls method', function() {
      it('should call _refreshBurstOptions with modules and i', function() {
        var b, i, pack0, swirl, _i, _ref, _results;
        b = new Burst({
          count: 4
        }).then({
          radius: 20
        }).then({
          radius: 30
        });
        spyOn(b, '_refreshBurstOptions');
        b._tuneSwirls({});
        pack0 = b._swirls[0];
        _results = [];
        for (i = _i = 0, _ref = pack0.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          swirl = pack0[i];
          _results.push(expect(b._refreshBurstOptions).toHaveBeenCalledWith(swirl._modules, i));
        }
        return _results;
      });
      it('should add Burst properties to options', function() {
        var b, options;
        b = new Burst({
          children: {
            degreeShift: 10
          }
        });
        options = {
          x: 200
        };
        spyOn(b, '_addBurstProperties');
        b._tuneSwirls(options);
        expect(b._addBurstProperties).toHaveBeenCalledWith({}, 0);
        expect(b._addBurstProperties).toHaveBeenCalledWith({}, 1);
        expect(b._addBurstProperties).toHaveBeenCalledWith({}, 2);
        expect(b._addBurstProperties).toHaveBeenCalledWith({}, 3);
        return expect(b._addBurstProperties).toHaveBeenCalledWith({}, 4);
      });
      return it('should not override the new degreeShift', function() {
        var b, options;
        b = new Burst({
          children: {
            degreeShift: 10
          }
        });
        options = {
          x: 200,
          children: {
            degreeShift: 20
          }
        };
        spyOn(b, '_addBurstProperties');
        b._tuneSwirls(options);
        expect(b._addBurstProperties).toHaveBeenCalledWith({
          degreeShift: 20
        }, 0);
        expect(b._addBurstProperties).toHaveBeenCalledWith({
          degreeShift: 20
        }, 1);
        expect(b._addBurstProperties).toHaveBeenCalledWith({
          degreeShift: 20
        }, 2);
        expect(b._addBurstProperties).toHaveBeenCalledWith({
          degreeShift: 20
        }, 3);
        return expect(b._addBurstProperties).toHaveBeenCalledWith({
          degreeShift: 20
        }, 4);
      });
    });
    describe('ChildSwirl ->', function() {
      var ChildSwirl;
      ChildSwirl = Burst.ChildSwirl;
      it('should extend ShapeSwirl', function() {
        var child;
        child = new ChildSwirl;
        return expect(child instanceof ShapeSwirl).toBe(true);
      });
      it('should override defaults', function() {
        var child;
        child = new ChildSwirl;
        return expect(child._defaults.isSwirl).toBe(false);
      });
      it('should override duration to 700', function() {
        var child;
        child = new ChildSwirl;
        return expect(child._o.duration).toBe(700);
      });
      it('should not override duration to 700 if defined', function() {
        var child;
        child = new ChildSwirl({
          duration: 0
        });
        return expect(child._o.duration).toBe(0);
      });
      it('should be used as children swirl', function() {
        var burst;
        burst = new Burst;
        return expect(burst._swirls[0][0] instanceof ChildSwirl).toBe(true);
      });
      return it('should not regard degreeShift in xy calculations', function() {
        var child1, child2;
        child1 = new ChildSwirl({
          degreeShift: 0,
          x: {
            0: 200
          }
        });
        child2 = new ChildSwirl({
          degreeShift: 20,
          x: {
            0: 200
          }
        });
        child1.setProgress(.45);
        child1.setProgress(.5);
        child2.setProgress(.45);
        child2.setProgress(.5);
        expect(child1._props.x).toBe(child2._props.x);
        return expect(child1._props.y).toBe(child2._props.y);
      });
    });
    describe('MainSwirl ->', function() {
      var ChildSwirl, MainSwirl;
      ChildSwirl = Burst.ChildSwirl;
      MainSwirl = Burst.MainSwirl;
      it('should extend ChildSwirl', function() {
        var child;
        child = new MainSwirl;
        return expect(child instanceof ChildSwirl).toBe(true);
      });
      it('should override defaults', function() {
        var child;
        child = new MainSwirl;
        expect(child._defaults.scale).toBe(1);
        expect(child._defaults.width).toBe(0);
        expect(child._defaults.height).toBe(0);
        expect(child._defaults.isSwirl).toBe(false);
        return expect(child._defaults.radius[25]).toBe(75);
      });
      return it('should be used as main swirl', function() {
        var burst;
        burst = new Burst;
        return expect(burst.masterSwirl instanceof MainSwirl).toBe(true);
      });
    });
    describe('_hide method ->', function() {
      return it('should not call super', function() {
        var burst;
        burst = new Burst;
        spyOn(mojs.Module.prototype, '_hide');
        burst._hide();
        return expect(mojs.Module.prototype._hide).not.toHaveBeenCalled();
      });
    });
    return describe('_show method ->', function() {
      return it('should not call super', function() {
        var burst;
        burst = new Burst;
        spyOn(mojs.Module.prototype, '_show');
        burst._show();
        return expect(mojs.Module.prototype._show).not.toHaveBeenCalled();
      });
    });
  });

}).call(this);
