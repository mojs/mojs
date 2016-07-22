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
        var deltas, timeline;
        spyOn(Deltas.prototype, '_createTimeline');
        timeline = {};
        deltas = new Deltas({
          options: options,
          props: props,
          timeline: timeline
        });
        return expect(Deltas.prototype._createTimeline).toHaveBeenCalledWith(timeline);
      });
      it('should pass timeline options to the timeline', function() {
        var deltas, timeline;
        timeline = {};
        deltas = new Deltas({
          options: options,
          props: props,
          timeline: {}
        });
        return expect(deltas.timeline._o).toEqual(timeline);
      });
      it('should pass callbackOverrides to the timeline', function() {
        var deltas, fun;
        fun = function() {};
        deltas = new Deltas({
          options: options,
          props: props,
          onUpdate: fun
        });
        return expect(deltas.timeline._callbackOverrides.onUpdate).toBe(fun);
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
          mojs.h.parseDelta('x', {
            20: 0
          }), mojs.h.parseDelta('y', {
            0: 40
          }), mojs.h.parseDelta('fill', {
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
            delta: mojs.h.parseDelta('x', {
              20: 0
            }),
            tweenOptions: {
              duration: 4000
            }
          }, {
            delta: mojs.h.parseDelta('y', {
              0: 40
            }),
            tweenOptions: {
              delay: 200
            }
          }
        ]);
      });
      return it('should be called on initialization', function() {
        var deltas;
        spyOn(Deltas.prototype, '_parseDeltas').and.callThrough();
        deltas = new Deltas({
          options: options,
          props: props
        });
        return expect(Deltas.prototype._parseDeltas).toHaveBeenCalledWith(options);
      });
    });
    describe('_parseDelta method ->', function() {
      it('should call _splitTweenOptions method with passed object', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        deltas.isIt = 1;
        spyOn(deltas, '_splitTweenOptions').and.callThrough();
        return result = deltas._parseDelta('x', {
          20: 10
        });
      });
      it('should parse delta object', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        spyOn(mojs.h, 'parseDelta');
        result = deltas._parseDelta('x', {
          20: 10,
          duration: 2000
        });
        return expect(mojs.h.parseDelta).toHaveBeenCalledWith('x', {
          20: 10
        });
      });
      it('should return parsed delta and tween properties', function() {
        var deltas, result;
        deltas = new Deltas({
          options: options,
          props: props
        });
        result = deltas._parseDelta('x', {
          20: 10,
          duration: 2000
        });
        expect(result.delta).toEqual(mojs.h.parseDelta('x', {
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
        result = deltas._parseDelta('x', {
          20: 10
        });
        expect(result.delta).toEqual(mojs.h.parseDelta('x', {
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
      return it('should parse curve as part of delta', function() {
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
      return it('should be called on initialization', function() {
        var deltas;
        spyOn(Deltas.prototype, '_createDeltas').and.callThrough();
        deltas = new Deltas({
          options: options,
          props: props
        });
        return expect(Deltas.prototype._createDeltas).toHaveBeenCalled();
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
    return describe('_createDelta method ->', function() {
      return it('should create delta from passed objects', function() {
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
    });
  });

}).call(this);
