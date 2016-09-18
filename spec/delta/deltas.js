(function() {
  var Delta, Deltas, options, props;

  Deltas = mojs._pool.Deltas;

  Delta = mojs._pool.Delta;

  options = {};

  props = {};

  describe('Deltas ->', function() {
    it('should have _o', function() {
      var deltas;
      deltas = new Deltas({
        options: options,
        props: props
      });
      expect(deltas._o.options).toBe(options);
      return expect(deltas._o.props).toBe(props);
    });
    it('should have _ignoreDeltas object', function() {
      var deltas;
      deltas = new Deltas({
        options: options,
        props: props
      });
      return expect(deltas._ignoreDeltasMap).toEqual({
        prevChainModule: 1,
        masterModule: 1
      });
    });
    describe('_createTimeline method', function() {
      it('should create a Timeline', function() {
        var deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        deltas.timeline = null;
        deltas._createTimeline();
        return expect(deltas.timeline instanceof mojs.Timeline).toBe(true);
      });
      it('should be called on initialization', function() {
        var deltas;
        options = {
          x: {
            20: 0
          },
          timeline: {
            duration: 200
          }
        };
        spyOn(Deltas.prototype, '_createTimeline');
        deltas = new Deltas({
          options: options,
          props: props
        });
        return expect(Deltas.prototype._createTimeline).toHaveBeenCalledWith(deltas._mainTweenOptions);
      });
      return it('should add _deltas to the Timeline', function() {
        var deltas;
        options = {
          stroke: 'cyan',
          x: {
            20: 0,
            easing: 'cubic.in'
          },
          y: {
            0: 40,
            easing: 'cubic.out'
          },
          radius: {
            0: 40,
            duration: 400
          },
          fill: {
            'cyan': 'red'
          },
          duration: 1000,
          backwardEasing: 'cubic.out'
        };
        deltas = new Deltas({
          options: options,
          props: props
        });
        return expect(deltas.timeline._timelines.length).toBe(4);
      });
    });
    describe('_parseDeltas method ->', function() {
      it('should parse main tween options', function() {
        var deltas, opts;
        deltas = new Deltas({
          options: options,
          props: props
        });
        opts = {
          stroke: 'cyan',
          x: {
            20: 0
          },
          y: {
            0: 40
          },
          fill: {
            'cyan': 'red'
          },
          duration: 1000,
          backwardEasing: 'cubic.out'
        };
        deltas._mainTweenOptions = null;
        deltas._parseDeltas(opts);
        return expect(deltas._mainTweenOptions).toEqual({
          duration: 1000,
          backwardEasing: 'cubic.out'
        });
      });
      it('should parse main deltas', function() {
        var deltas, opts;
        deltas = new Deltas({
          options: options,
          props: props
        });
        opts = {
          stroke: 'cyan',
          x: {
            20: 0
          },
          y: {
            0: 40
          },
          fill: {
            'cyan': 'red'
          },
          duration: 1000,
          backwardEasing: 'cubic.out'
        };
        deltas._mainDeltas = null;
        deltas._parseDeltas(opts);
        return expect(deltas._mainDeltas).toEqual([
          deltas._parseDelta('x', {
            20: 0
          }), deltas._parseDelta('y', {
            0: 40
          }), deltas._parseDelta('fill', {
            'cyan': 'red'
          })
        ]);
      });
      it('should parse child deltas', function() {
        var deltas, opts;
        deltas = new Deltas({
          options: options,
          props: props
        });
        opts = {
          stroke: 'cyan',
          x: {
            20: 0,
            duration: 4000
          },
          y: {
            0: 40,
            delay: 200
          },
          fill: {
            'cyan': 'red'
          },
          duration: 1000,
          backwardEasing: 'cubic.out'
        };
        deltas._childDeltas = null;
        deltas._parseDeltas(opts);
        return expect(deltas._childDeltas).toEqual([
          {
            delta: deltas._parseDelta('x', {
              20: 0
            }),
            tweenOptions: {
              duration: 4000
            }
          }, {
            delta: deltas._parseDelta('y', {
              0: 40
            }),
            tweenOptions: {
              delay: 200
            }
          }
        ]);
      });
      it('should be called on initialization', function() {
        var deltas;
        spyOn(Deltas.prototype, '_parseDeltas').and.callThrough();
        deltas = new Deltas({
          options: options,
          props: props
        });
        return expect(Deltas.prototype._parseDeltas).toHaveBeenCalledWith(options);
      });
      it('should not call `_splitAndParseDelta` with props from `_ignoreDeltasMap`', function() {
        var deltas, key, mainSplit, opts, value, _ref, _results;
        deltas = new Deltas({
          options: options,
          props: props
        });
        deltas._parseDeltas(deltas._o);
        mainSplit = deltas._splitTweenOptions(deltas._o);
        opts = mainSplit.delta;
        spyOn(deltas, '_splitAndParseDelta').and.callThrough();
        _ref = deltas._ignoreDeltasMap;
        _results = [];
        for (key in _ref) {
          value = _ref[key];
          _results.push(expect(deltas._splitAndParseDelta).not.toHaveBeenCalledWith(key, opts[key]));
        }
        return _results;
      });
      it('should call `_parseDeltaByGuess` if not in customProps', function() {
        var deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        spyOn(deltas, '_parseDeltaByGuess').and.callThrough();
        deltas._parseDelta('x', props, 0);
        return expect(deltas._parseDeltaByGuess).toHaveBeenCalledWith('x', props, 0);
      });
      return it('should call `_parseDeltaByCustom` if in customProps', function() {
        var deltas;
        deltas = new Deltas({
          options: options,
          props: props,
          customProps: {
            x: {
              type: 'number',
              "default": 0
            }
          }
        });
        spyOn(deltas, '_parseDeltaByCustom').and.callThrough();
        deltas._parseDelta('x', props, 0);
        return expect(deltas._parseDeltaByCustom).toHaveBeenCalledWith('x', props, 0);
      });
    });
    describe('_splitAndParseDelta method ->', function() {
      it('should call _splitTweenOptions method with passed object', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        deltas.isIt = 1;
        spyOn(deltas, '_splitTweenOptions').and.callThrough();
        return result = deltas._splitAndParseDelta('x', {
          20: 10
        });
      });
      it('should parse delta object', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        spyOn(deltas, '_parseDelta');
        result = deltas._splitAndParseDelta('x', {
          20: 10,
          duration: 2000
        });
        return expect(deltas._parseDelta).toHaveBeenCalledWith('x', {
          20: 10
        });
      });
      it('should return parsed delta and tween properties', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        result = deltas._splitAndParseDelta('x', {
          20: 10,
          duration: 2000
        });
        expect(result.delta).toEqual(deltas._parseDelta('x', {
          20: 10
        }));
        return expect(result.tweenOptions).toEqual({
          duration: 2000
        });
      });
      return it('should return falsy tweenOptions if none', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        result = deltas._splitAndParseDelta('x', {
          20: 10
        });
        expect(result.delta).toEqual(deltas._parseDelta('x', {
          20: 10
        }));
        return expect(result.tweenOptions).toBeFalsy();
      });
    });
    describe('_splitTweenOptions method', function() {
      it('should return tween options separated from delta', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        result = deltas._splitTweenOptions({
          0: 20,
          duration: 2000,
          delay: 200,
          easing: 'cubic.in'
        });
        expect(result.delta).toEqual({
          0: 20
        });
        return expect(result.tweenOptions).toEqual({
          duration: 2000,
          delay: 200,
          easing: 'cubic.in'
        });
      });
      it('should not return tweenOptions if any', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        result = deltas._splitTweenOptions({
          0: 20
        });
        expect(result.delta).toEqual({
          0: 20
        });
        return expect(result.tweenOptions).toBeFalsy();
      });
      it('should not return tweenOptions if they are sufficiently `undefined`', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        result = deltas._splitTweenOptions({
          0: 20,
          easing: void 0,
          duration: null
        });
        expect(result.delta).toEqual({
          0: 20
        });
        return expect(result.tweenOptions).toBeFalsy();
      });
      it('should parse curve as part of delta', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        result = deltas._splitTweenOptions({
          0: 20,
          curve: 'M0,0 L100,0'
        });
        expect(result.delta).toEqual({
          0: 20,
          curve: 'M0,0 L100,0'
        });
        return expect(result.tweenOptions).toBeFalsy();
      });
      return it('should treat timeline property as tween one', function() {
        var deltas, result;
        options = {
          x: {
            0: 20
          },
          timeline: {
            delay: 200
          }
        };
        deltas = new Deltas({
          options: options,
          props: props
        });
        result = deltas._splitTweenOptions(options);
        return expect(result.tweenOptions.timeline).toEqual({
          delay: 200
        });
      });
    });
    describe('_createDeltas method ->', function() {
      it('should create deltas from parsed object ->', function() {
        var deltas, mainDelta;
        options = {
          stroke: 'cyan',
          x: {
            20: 0,
            duration: 4000
          },
          y: {
            0: 40,
            delay: 200
          },
          fill: {
            'cyan': 'red'
          },
          duration: 1000,
          backwardEasing: 'cubic.out'
        };
        deltas = new Deltas({
          options: options,
          props: props
        });
        deltas._deltas = null;
        deltas._createDeltas();
        mainDelta = deltas._deltas[0];
        expect(mainDelta._o.deltas).toBe(deltas._mainDeltas);
        expect(mainDelta._o.tweenOptions).toBe(deltas._mainTweenOptions);
        expect(mainDelta._o.props).toBe(props);
        return expect(mainDelta instanceof Delta).toBe(true);
      });
      it('should create deltas from parsed child objects ->', function() {
        var childDelta1, childDelta2, deltas;
        options = {
          stroke: 'cyan',
          x: {
            20: 0,
            duration: 4000
          },
          y: {
            0: 40,
            delay: 200
          },
          fill: {
            'cyan': 'red'
          },
          duration: 1000,
          backwardEasing: 'cubic.out'
        };
        deltas = new Deltas({
          options: options,
          props: props
        });
        deltas._deltas = null;
        deltas._createDeltas();
        childDelta1 = deltas._deltas[1];
        childDelta2 = deltas._deltas[2];
        expect(childDelta1._o.deltas).toEqual([deltas._childDeltas[0].delta]);
        expect(childDelta1._o.tweenOptions).toBe(deltas._childDeltas[0].tweenOptions);
        expect(childDelta1._o.props).toBe(props);
        expect(childDelta1 instanceof Delta).toBe(true);
        expect(childDelta2._o.deltas).toEqual([deltas._childDeltas[1].delta]);
        expect(childDelta2._o.tweenOptions).toBe(deltas._childDeltas[1].tweenOptions);
        expect(childDelta2._o.props).toBe(props);
        return expect(childDelta2 instanceof Delta).toBe(true);
      });
      it('should be called on initialization', function() {
        var deltas;
        spyOn(Deltas.prototype, '_createDeltas').and.callThrough();
        deltas = new Deltas({
          options: options,
          props: props
        });
        return expect(Deltas.prototype._createDeltas).toHaveBeenCalled();
      });
      return it('should send callbacksContext to each delta', function() {
        var callbacksContext, deltas, result;
        callbacksContext = {};
        deltas = new Deltas({
          options: options,
          props: props,
          callbacksContext: callbacksContext
        });
        result = deltas._createDelta([
          deltas._parseDelta('x', {
            0: 20
          })
        ], {});
        return expect(result._o.callbacksContext).toBe(callbacksContext);
      });
    });
    describe('_isDelta method ->', function() {
      return it('should detect if value is not a delta value', function() {
        var deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        expect(deltas._isDelta(45)).toBe(false);
        expect(deltas._isDelta('45')).toBe(false);
        expect(deltas._isDelta(['45'])).toBe(false);
        expect(deltas._isDelta({
          unit: 'px',
          value: 20
        })).toBe(false);
        return expect(deltas._isDelta({
          20: 30
        })).toBe(true);
      });
    });
    describe('_createDelta method ->', function() {
      it('should create delta from passed objects', function() {
        var deltas, deltasArr, result, tweenOpts;
        deltas = new Deltas({
          options: options,
          props: props
        });
        deltasArr = [];
        tweenOpts = {};
        result = deltas._createDelta(deltasArr, tweenOpts);
        expect(result instanceof Delta).toBe(true);
        expect(result._o.deltas).toBe(deltasArr);
        expect(result._o.tweenOptions).toBe(tweenOpts);
        return expect(result._o.props).toBe(props);
      });
      return it('should pass isChained to delta', function() {
        var deltas, deltasArr, result, tweenOpts;
        deltas = new Deltas({
          options: options,
          props: props,
          isChained: true
        });
        deltasArr = [];
        tweenOpts = {};
        result = deltas._createDelta(deltasArr, tweenOpts);
        return expect(result._o.isChained).toBe(true);
      });
    });
    describe('_parseColorDelta method ->', function() {
      it('should calculate color delta', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        delta = deltas._parseColorDelta('stroke', {
          '#000': 'rgb(255,255,255)'
        });
        expect(delta.start.r).toBe(0);
        expect(delta.end.r).toBe(255);
        expect(delta.delta.r).toBe(255);
        expect(delta.type).toBe('color');
        return expect(delta.name).toBe('stroke');
      });
      it('should ignore stroke-linecap prop, use start prop and warn', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        spyOn(console, 'warn');
        delta = deltas._parseColorDelta('strokeLinecap', {
          'round': 'butt'
        });
        expect(function() {
          return deltas._parseColorDelta('strokeLinecap', {
            'round': 'butt'
          });
        }).not.toThrow();
        expect(console.warn).toHaveBeenCalled();
        return expect(delta.type).not.toBeDefined();
      });
      return it('should parse color curve values', function() {
        var curve, delta, deltas, startDelta;
        deltas = new Deltas({
          options: options,
          props: props
        });
        spyOn(mojs.easing, 'parseEasing').and.callThrough();
        curve = "M0,100 L100,0";
        startDelta = {
          '#000': 'rgb(255,255,255)',
          curve: curve
        };
        delta = deltas._parseColorDelta('stroke', startDelta);
        expect(delta.start.r).toBe(0);
        expect(delta.end.r).toBe(255);
        expect(delta.delta.r).toBe(255);
        expect(delta.type).toBe('color');
        expect(typeof delta.curve).toBe('function');
        expect(delta.curve(.5)).toBeCloseTo(.5, 2);
        return expect(mojs.easing.parseEasing).toHaveBeenCalledWith(curve);
      });
    });
    describe('_parseArrayDelta method ->', function() {
      it('should calculate array delta', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        delta = deltas._parseArrayDelta('strokeDasharray', {
          '200 100%': '300'
        });
        expect(delta.type).toBe('array');
        expect(delta.start[0].value).toBe(200);
        expect(delta.start[0].unit).toBe('px');
        expect(delta.end[0].value).toBe(300);
        expect(delta.end[0].unit).toBe('px');
        expect(delta.start[1].value).toBe(100);
        expect(delta.start[1].unit).toBe('%');
        expect(delta.end[1].value).toBe(0);
        expect(delta.end[1].unit).toBe('%');
        return expect(delta.name).toBe('strokeDasharray');
      });
      it('should calculate array delta', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        delta = deltas._parseArrayDelta('strokeDashoffset', {
          '200 100%': '300'
        });
        expect(delta.type).toBe('array');
        expect(delta.start[0].value).toBe(200);
        expect(delta.start[0].unit).toBe('px');
        expect(delta.end[0].value).toBe(300);
        expect(delta.end[0].unit).toBe('px');
        expect(delta.start[1].value).toBe(100);
        expect(delta.start[1].unit).toBe('%');
        expect(delta.end[1].value).toBe(0);
        return expect(delta.end[1].unit).toBe('%');
      });
      it('should calculate array delta', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        delta = deltas._parseArrayDelta('origin', {
          '200 100%': '300'
        });
        expect(delta.type).toBe('array');
        expect(delta.start[0].value).toBe(200);
        expect(delta.start[0].unit).toBe('px');
        expect(delta.end[0].value).toBe(300);
        expect(delta.end[0].unit).toBe('px');
        expect(delta.start[1].value).toBe(100);
        expect(delta.start[1].unit).toBe('%');
        expect(delta.end[1].value).toBe(0);
        return expect(delta.end[1].unit).toBe('%');
      });
      return it('should parse array curve values', function() {
        var curve, delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        spyOn(mojs.easing, 'parseEasing').and.callThrough();
        curve = "M0,100 L100,0";
        delta = deltas._parseArrayDelta('origin', {
          '200 100%': '300',
          curve: curve
        });
        expect(delta.type).toBe('array');
        expect(delta.start[0].value).toBe(200);
        expect(delta.start[0].unit).toBe('px');
        expect(delta.end[0].value).toBe(300);
        expect(delta.end[0].unit).toBe('px');
        expect(delta.start[1].value).toBe(100);
        expect(delta.start[1].unit).toBe('%');
        expect(delta.end[1].value).toBe(0);
        expect(delta.end[1].unit).toBe('%');
        expect(typeof delta.curve).toBe('function');
        expect(delta.curve(.5)).toBeCloseTo(.5, 2);
        return expect(mojs.easing.parseEasing).toHaveBeenCalledWith(curve);
      });
    });
    describe('_parseUnitDelta method ->', function() {
      it('should calculate unit delta', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        delta = deltas._parseUnitDelta('x', {
          '0%': '100%'
        });
        expect(delta.start.string).toBe('0');
        expect(delta.end.string).toBe('100%');
        expect(delta.delta).toBe(100);
        return expect(delta.type).toBe('unit');
      });
      return it('should parse array curve values', function() {
        var curve, delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        spyOn(mojs.easing, 'parseEasing').and.callThrough();
        curve = "M0,100 L100,0";
        delta = deltas._parseUnitDelta('x', {
          '0%': '100%',
          curve: curve
        });
        expect(delta.start.string).toBe('0');
        expect(delta.end.string).toBe('100%');
        expect(delta.delta).toBe(100);
        expect(delta.type).toBe('unit');
        expect(typeof delta.curve).toBe('function');
        expect(delta.curve(.5)).toBeCloseTo(.5, 2);
        return expect(mojs.easing.parseEasing).toHaveBeenCalledWith(curve);
      });
    });
    describe('_parseNumberDelta method ->', function() {
      it('should calculate delta', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        delta = deltas._parseNumberDelta('radius', {
          25: 75
        });
        expect(delta.start).toBe(25);
        expect(delta.delta).toBe(50);
        expect(delta.type).toBe('number');
        return expect(delta.name).toBe('radius');
      });
      it('should parse curve', function() {
        var curve, delta, deltas, startDelta;
        deltas = new Deltas({
          options: options,
          props: props
        });
        spyOn(mojs.easing, 'parseEasing').and.callThrough();
        curve = "M0,100 L100,0";
        startDelta = {
          25: 75,
          curve: curve
        };
        delta = deltas._parseNumberDelta('radius', startDelta);
        expect(delta.start).toBe(25);
        expect(delta.delta).toBe(50);
        expect(delta.type).toBe('number');
        expect(typeof delta.curve).toBe('function');
        expect(delta.curve(.5)).toBeCloseTo(.5, 2);
        expect(mojs.easing.parseEasing).toHaveBeenCalledWith(curve);
        return expect(startDelta.curve).toBe(curve);
      });
      it('should calculate delta with string arguments', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        delta = deltas._parseNumberDelta('radius', {
          25: 75
        });
        expect(delta.start).toBe(25);
        return expect(delta.delta).toBe(50);
      });
      it('should calculate delta with float arguments', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        delta = deltas._parseNumberDelta('radius', {
          '25.50': 75.50
        });
        expect(delta.start).toBe(25.5);
        return expect(delta.delta).toBe(50);
      });
      it('should calculate delta with negative start arguments', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        delta = deltas._parseNumberDelta('radius', {
          '-25.50': 75.50
        });
        expect(delta.start).toBe(-25.5);
        return expect(delta.delta).toBe(101);
      });
      return it('should calculate delta with negative end arguments', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        delta = deltas._parseNumberDelta('radius', {
          '25.50': -75.50
        });
        expect(delta.start).toBe(25.5);
        expect(delta.end).toBe(-75.5);
        return expect(delta.delta).toBe(-101);
      });
    });
    describe('_preparseDelta method', function() {
      it('should parse start and end values of passed delta', function() {
        var delta, deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        delta = deltas._preparseDelta({
          '25.50': -75.50
        });
        expect(delta.start).toBe('25.50');
        return expect(delta.end).toBe(-75.50);
      });
      it('should parse curve', function() {
        var curve, delta, deltas, startDelta;
        deltas = new Deltas({
          options: options,
          props: props
        });
        curve = "M0,100 L100,0";
        startDelta = {
          25: 75,
          curve: curve
        };
        spyOn(mojs.easing, 'parseEasing').and.callThrough();
        delta = deltas._preparseDelta(startDelta);
        expect(delta.start).toBe('25');
        expect(delta.end).toBe(75);
        expect(typeof delta.curve).toBe('function');
        expect(delta.curve(.5)).toBeCloseTo(.5, 2);
        expect(mojs.easing.parseEasing).toHaveBeenCalledWith(curve);
        return expect(startDelta.curve).toBe(curve);
      });
      it('should set parent on parsed curve', function() {
        var curve, delta, deltas, startDelta;
        deltas = new Deltas({
          options: options,
          props: props
        });
        curve = "M0,100 L100,0";
        startDelta = {
          25: 75,
          curve: curve
        };
        delta = deltas._preparseDelta(startDelta);
        expect(typeof delta.curve).toBe('function');
        expect(delta.curve(.5)).toBeCloseTo(.5, 2);
        return expect(delta.curve._parent).toBe(deltas);
      });
      return it('should not parse curve if not set', function() {
        var delta, deltas, startDelta;
        deltas = new Deltas({
          options: options,
          props: props
        });
        startDelta = {
          25: 75
        };
        spyOn(mojs.easing, 'parseEasing').and.callThrough();
        delta = deltas._preparseDelta(startDelta);
        expect(delta.start).toBe('25');
        expect(delta.end).toBe(75);
        expect(typeof delta.curve).toBe('undefined');
        return expect(mojs.easing.parseEasing).not.toHaveBeenCalled();
      });
    });
    describe('color parsing - _makeColorObj method', function() {
      var deltas;
      deltas = new Deltas({
        options: options,
        props: props
      });
      it('should have _shortColors map', function() {
        return expect(deltas._shortColors).toBeDefined();
      });
      it('should parse 3 hex color', function() {
        var colorObj;
        colorObj = deltas._makeColorObj('#f0f');
        expect(colorObj.r).toBe(255);
        expect(colorObj.g).toBe(0);
        expect(colorObj.b).toBe(255);
        return expect(colorObj.a).toBe(1);
      });
      it('should parse 6 hex color', function() {
        var colorObj;
        colorObj = deltas._makeColorObj('#0000ff');
        expect(colorObj.r).toBe(0);
        expect(colorObj.g).toBe(0);
        expect(colorObj.b).toBe(255);
        return expect(colorObj.a).toBe(1);
      });
      it('should parse color shorthand', function() {
        var colorObj;
        colorObj = deltas._makeColorObj('deeppink');
        expect(colorObj.r).toBe(255);
        expect(colorObj.g).toBe(20);
        expect(colorObj.b).toBe(147);
        return expect(colorObj.a).toBe(1);
      });
      it('should parse none color shorthand', function() {
        var colorObj;
        colorObj = deltas._makeColorObj('none');
        expect(colorObj.r).toBe(0);
        expect(colorObj.g).toBe(0);
        expect(colorObj.b).toBe(0);
        return expect(colorObj.a).toBe(0);
      });
      it('should parse rgb color', function() {
        var colorObj;
        colorObj = deltas._makeColorObj('rgb(200,100,0)');
        expect(colorObj.r).toBe(200);
        expect(colorObj.g).toBe(100);
        expect(colorObj.b).toBe(0);
        return expect(colorObj.a).toBe(1);
      });
      it('should parse rgba color', function() {
        var colorObj;
        colorObj = deltas._makeColorObj('rgba(0,200,100,.1)');
        expect(colorObj.r).toBe(0);
        expect(colorObj.g).toBe(200);
        expect(colorObj.b).toBe(100);
        return expect(colorObj.a).toBe(.1);
      });
      return it('should parse rgba color with float starting by 0', function() {
        var colorObj;
        colorObj = deltas._makeColorObj('rgba(0,200,100,0.5)');
        expect(colorObj.r).toBe(0);
        expect(colorObj.g).toBe(200);
        expect(colorObj.b).toBe(100);
        return expect(colorObj.a).toBe(.5);
      });
    });
    describe('strToArr method', function() {
      var deltas;
      deltas = new Deltas({
        options: options,
        props: props
      });
      it('should parse string to array', function() {
        var array;
        array = deltas._strToArr('200 100');
        expect(array[0].value).toBe(200);
        return expect(array[0].unit).toBe('px');
      });
      it('should parse % string to array', function() {
        var array;
        array = deltas._strToArr('200% 100');
        expect(array[0].value).toBe(200);
        expect(array[0].unit).toBe('%');
        expect(array[1].value).toBe(100);
        return expect(array[1].unit).toBe('px');
      });
      it('should parse number to array', function() {
        var array;
        array = deltas._strToArr(200);
        expect(array[0].value).toBe(200);
        return expect(array[0].unit).toBe('px');
      });
      it('should parse string with multiple spaces to array', function() {
        var array;
        array = deltas._strToArr('200   100%');
        expect(array[0].value).toBe(200);
        expect(array[0].unit).toBe('px');
        expect(array[1].value).toBe(100);
        return expect(array[1].unit).toBe('%');
      });
      it('should trim string before parse', function() {
        var array;
        array = deltas._strToArr('  200   100% ');
        expect(array[0].value).toBe(200);
        expect(array[0].unit).toBe('px');
        expect(array[1].value).toBe(100);
        return expect(array[1].unit).toBe('%');
      });
      return it('should parse rand values', function() {
        var array;
        array = deltas._strToArr('  200   rand(10,20) ');
        expect(array[0].value).toBe(200);
        expect(array[0].unit).toBe('px');
        expect(array[1].value).toBeGreaterThan(10);
        expect(array[1].value).not.toBeGreaterThan(20);
        return expect(array[1].unit).toBe('px');
      });
    });
    describe('_parseDelta method ->', function() {
      describe('color values ->', function() {
        it('should parse color objects', function() {
          var delta, deltas, name, sourceDelta;
          deltas = new Deltas({
            options: options,
            props: props
          });
          spyOn(deltas, '_parseColorDelta').and.callThrough();
          name = 'color';
          sourceDelta = {
            'cyan': 'white'
          };
          delta = deltas._parseDelta(name, sourceDelta);
          expect(deltas._parseColorDelta).toHaveBeenCalledWith(name, sourceDelta);
          return expect(delta).toEqual(deltas._parseColorDelta(name, sourceDelta));
        });
        it('should not react on rand values', function() {
          var delta, deltas, name, sourceDelta;
          deltas = new Deltas({
            options: options,
            props: props
          });
          spyOn(deltas, '_parseColorDelta').and.callThrough();
          name = 'color';
          sourceDelta = {
            'rand(1,20)': 'white'
          };
          delta = deltas._parseDelta(name, sourceDelta);
          return expect(deltas._parseColorDelta).not.toHaveBeenCalled();
        });
        return it('should not react on stagger values', function() {
          var delta, deltas, name, sourceDelta;
          deltas = new Deltas({
            options: options,
            props: props
          });
          spyOn(deltas, '_parseColorDelta').and.callThrough();
          name = 'color';
          sourceDelta = {
            'stagger(20)': 'white'
          };
          delta = deltas._parseDelta(name, sourceDelta);
          return expect(deltas._parseColorDelta).not.toHaveBeenCalled();
        });
      });
      describe('array values ->', function() {
        var arrayPropertyMap;
        arrayPropertyMap = {
          transformOrigin: 1
        };
        return it('should treat the value as array if it is set in arrayPropertyMap object', function() {
          var delta, deltas, name, sourceDelta;
          deltas = new Deltas({
            options: options,
            props: props,
            arrayPropertyMap: arrayPropertyMap
          });
          spyOn(deltas, '_parseArrayDelta').and.callThrough();
          name = 'transformOrigin';
          sourceDelta = {
            '100 200': '0 50'
          };
          delta = deltas._parseDelta(name, sourceDelta);
          expect(deltas._parseArrayDelta).toHaveBeenCalledWith(name, sourceDelta);
          return expect(delta).toEqual(deltas._parseArrayDelta(name, sourceDelta));
        });
      });
      return describe('unit values ->', function() {
        it('should parse unit values by default', function() {
          var delta, deltas, name, sourceDelta;
          deltas = new Deltas({
            options: options,
            props: props
          });
          spyOn(deltas, '_parseUnitDelta').and.callThrough();
          name = 'x';
          sourceDelta = {
            '20': '30'
          };
          delta = deltas._parseDelta(name, sourceDelta);
          expect(deltas._parseUnitDelta).toHaveBeenCalledWith(name, sourceDelta, void 0);
          return expect(delta).toEqual(deltas._parseUnitDelta(name, sourceDelta));
        });
        it('should pass the index', function() {
          var delta, deltas, index, name, sourceDelta;
          deltas = new Deltas({
            options: options,
            props: props
          });
          spyOn(deltas, '_parseUnitDelta').and.callThrough();
          name = 'x';
          sourceDelta = {
            '20': '30'
          };
          index = 3;
          delta = deltas._parseDelta(name, sourceDelta, index);
          expect(deltas._parseUnitDelta).toHaveBeenCalledWith(name, sourceDelta, index);
          return expect(delta).toEqual(deltas._parseUnitDelta(name, sourceDelta, index));
        });
        return it('should parse properties that are in numberPropertyMap as numbers', function() {
          var delta, deltas, index, name, numberPropertyMap, sourceDelta;
          numberPropertyMap = {
            opacity: 1
          };
          deltas = new Deltas({
            options: options,
            props: props,
            numberPropertyMap: numberPropertyMap
          });
          spyOn(deltas, '_parseUnitDelta').and.callThrough();
          spyOn(deltas, '_parseNumberDelta').and.callThrough();
          name = 'opacity';
          sourceDelta = {
            '20': '30'
          };
          index = 3;
          delta = deltas._parseDelta(name, sourceDelta, index);
          expect(deltas._parseUnitDelta).not.toHaveBeenCalled();
          expect(deltas._parseNumberDelta).toHaveBeenCalledWith(name, sourceDelta, index);
          return expect(delta).toEqual(deltas._parseNumberDelta(name, sourceDelta, index));
        });
      });
    });
    describe('refresh method ->', function() {
      it('should call `refresh` on all `delta` objects // before', function() {
        var deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        spyOn(deltas._deltas[0], 'refresh');
        spyOn(deltas._deltas[1], 'refresh');
        spyOn(deltas._deltas[2], 'refresh');
        deltas.refresh(true);
        expect(deltas._deltas[0].refresh).toHaveBeenCalledWith(true);
        expect(deltas._deltas[1].refresh).toHaveBeenCalledWith(true);
        return expect(deltas._deltas[2].refresh).toHaveBeenCalledWith(true);
      });
      it('should call `refresh` on all `delta` objects // after', function() {
        var deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        spyOn(deltas._deltas[0], 'refresh');
        spyOn(deltas._deltas[1], 'refresh');
        spyOn(deltas._deltas[2], 'refresh');
        deltas.refresh(false);
        expect(deltas._deltas[0].refresh).toHaveBeenCalledWith(false);
        expect(deltas._deltas[1].refresh).toHaveBeenCalledWith(false);
        return expect(deltas._deltas[2].refresh).toHaveBeenCalledWith(false);
      });
      return it('should return `this`', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        result = deltas.refresh(false);
        return expect(result).toBe(deltas);
      });
    });
    describe('restore method ->', function() {
      it('should call `restore` on all `delta` objects', function() {
        var deltas;
        deltas = new Deltas({
          options: options,
          props: props
        });
        spyOn(deltas._deltas[0], 'restore');
        spyOn(deltas._deltas[1], 'restore');
        spyOn(deltas._deltas[2], 'restore');
        deltas.restore();
        expect(deltas._deltas[0].restore).toHaveBeenCalled();
        expect(deltas._deltas[1].restore).toHaveBeenCalled();
        return expect(deltas._deltas[2].restore).toHaveBeenCalled();
      });
      return it('should return `this`', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        result = deltas.restore();
        return expect(result).toBe(deltas);
      });
    });
    return describe('_parseDeltaByCustom method ->', function() {
      return it('should call _parseNumberDelta', function() {
        var deltas;
        deltas = new Deltas({
          options: options,
          props: props,
          customProps: {
            x: 0
          }
        });
        spyOn(deltas, '_parseNumberDelta');
        deltas._parseDeltaByCustom('x', props, 0);
        return expect(deltas._parseNumberDelta).toHaveBeenCalledWith('x', props, 0);
      });
    });
  });

}).call(this);
