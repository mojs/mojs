(function() {
  var Delta, Tween, deltas, h, props, tweenOptions;

  Tween = mojs.Tween;

  h = mojs.h;

  Delta = mojs._pool.Delta;

  deltas = [
    h.parseDelta('x', {
      0: 20
    }, 0), h.parseDelta('y', {
      20: 10
    }, 0)
  ];

  tweenOptions = {};

  props = {};

  describe('Delta ->', function() {
    it('should have _o', function() {
      var delta;
      delta = new Delta({
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props
      });
      expect(delta._o.deltas).toBe(deltas);
      expect(delta._o.tweenOptions).toBe(tweenOptions);
      return expect(delta._o.props).toBe(props);
    });
    it('should call refresh on tween when constructing', function() {
      var delta;
      spyOn(mojs.Tween.prototype, '_refresh');
      delta = new Delta({
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props
      });
      return expect(mojs.Tween.prototype._refresh).toHaveBeenCalledWith(true);
    });
    it('should not call `refresh` on tween when constructing is `isChained`', function() {
      var delta;
      spyOn(mojs.Tween.prototype, '_refresh');
      delta = new Delta({
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props,
        isChained: true
      });
      return expect(mojs.Tween.prototype._refresh).not.toHaveBeenCalled();
    });
    describe('_calcCurrentProps method ->', function() {
      return it('should call sub functions based on each delta type', function() {
        var arrDelta, delta, fillDelta, radiusDelta, xDelta;
        fillDelta = h.parseDelta('fill', {
          'rgba(0,0,0,0)': 'rgba(200,100,20,1)'
        }, 0);
        xDelta = h.parseDelta('x', {
          '0px': '100px'
        }, 0);
        arrDelta = h.parseDelta('strokeDasharray', {
          '0 100': '200 0'
        }, 0);
        radiusDelta = h.parseDelta('radius', {
          0: 100
        }, 0);
        props = {};
        delta = new Delta({
          deltas: [fillDelta, xDelta, arrDelta, radiusDelta],
          tweenOptions: tweenOptions,
          props: props
        });
        spyOn(delta, '_calcCurrent_color');
        spyOn(delta, '_calcCurrent_number');
        spyOn(delta, '_calcCurrent_unit');
        spyOn(delta, '_calcCurrent_array');
        delta._calcCurrentProps(.5, .5);
        expect(delta._calcCurrent_color).toHaveBeenCalledWith(fillDelta, .5, .5);
        expect(delta._calcCurrent_number).toHaveBeenCalledWith(radiusDelta, .5, .5);
        expect(delta._calcCurrent_unit).toHaveBeenCalledWith(xDelta, .5, .5);
        return expect(delta._calcCurrent_array).toHaveBeenCalledWith(arrDelta, .5, .5);
      });
    });
    describe('_calcCurrent_color method', function() {
      it('should calc color with alpha', function() {
        var delta, fillDelta;
        fillDelta = h.parseDelta('fill', {
          'rgba(0,0,0,0)': 'rgba(200,100,20,1)'
        }, 0);
        props = {};
        delta = new Delta({
          deltas: [fillDelta],
          tweenOptions: tweenOptions,
          props: props
        });
        delta._calcCurrent_color(fillDelta, .5, .5);
        return expect(delta._o.props['fill']).toBe('rgba(100,50,10,0.5)');
      });
      return it('should calc color with curve', function() {
        var delta, fill, fillArr, fillDelta;
        fillDelta = h.parseDelta('fill', {
          'rgba(200,100,20,1)': 'rgba(200,100,20,1)',
          curve: 'M0,0 L100,50'
        }, 0);
        props = {};
        delta = new Delta({
          deltas: [fillDelta],
          tweenOptions: tweenOptions,
          props: props
        });
        delta._calcCurrent_color(fillDelta, .5, .5);
        fill = delta._o.props['fill'];
        fillArr = fill.split(/rgba\(|\)|,/);
        expect(parseInt(fillArr[1])).toBe(150);
        expect(parseInt(fillArr[2])).toBe(75);
        expect(parseInt(fillArr[3])).toBe(15);
        return expect(parseFloat(fillArr[4])).toBeCloseTo(.75, 2);
      });
    });
    describe('_calcCurrent_number method', function() {
      it('should calc number', function() {
        var delta, radiusDelta;
        radiusDelta = h.parseDelta('radius', {
          0: 100
        }, 0);
        props = {};
        delta = new Delta({
          deltas: [radiusDelta],
          tweenOptions: tweenOptions,
          props: props
        });
        delta._calcCurrent_number(radiusDelta, .5, .5);
        return expect(delta._o.props['radius']).toBe(50);
      });
      return it('should calc number # curve', function() {
        var delta, radiusDelta;
        radiusDelta = h.parseDelta('radius', {
          100: 100,
          curve: 'M0,0 L100,50'
        }, 0);
        props = {};
        delta = new Delta({
          deltas: [radiusDelta],
          tweenOptions: tweenOptions,
          props: props
        });
        delta._calcCurrent_number(radiusDelta, .5, .5);
        return expect(delta._o.props['radius']).toBeCloseTo(75, 1);
      });
    });
    describe('_calcCurrent_unit method', function() {
      it('should calc unit based number', function() {
        var delta, xDelta;
        xDelta = h.parseDelta('x', {
          '0px': '100px'
        }, 0);
        props = {};
        delta = new Delta({
          deltas: [xDelta],
          tweenOptions: tweenOptions,
          props: props
        });
        delta._calcCurrent_unit(xDelta, .5, .5);
        return expect(delta._o.props['x']).toBe('50px');
      });
      return it('should calc unit based number # curve', function() {
        var delta, xDelta;
        xDelta = h.parseDelta('x', {
          100: 100,
          curve: 'M0,0 L100,50'
        }, 0);
        props = {};
        delta = new Delta({
          deltas: [xDelta],
          tweenOptions: tweenOptions,
          props: props
        });
        delta._calcCurrent_unit(xDelta, .5, .5);
        return expect(parseFloat(delta._o.props['x'])).toBeCloseTo(75, 1);
      });
    });
    describe('_calcCurrent_array method', function() {
      it('should calc array', function() {
        var arrDelta, delta;
        arrDelta = h.parseDelta('strokeDasharray', {
          '0 100': '200 0'
        }, 0);
        props = {};
        delta = new Delta({
          deltas: [arrDelta],
          tweenOptions: tweenOptions,
          props: props
        });
        delta._calcCurrent_array(arrDelta, .5, .5);
        return expect(delta._o.props['strokeDasharray']).toEqual('100px 50px ');
      });
      return it('should calc array # curve', function() {
        var arrDelta, delta, strokeDasharray;
        arrDelta = h.parseDelta('strokeDasharray', {
          '0 100': '200 0',
          curve: 'M0,0 L100,50'
        }, 0);
        props = {};
        delta = new Delta({
          deltas: [arrDelta],
          tweenOptions: tweenOptions,
          props: props
        });
        delta._calcCurrent_array(arrDelta, .5, .5);
        strokeDasharray = delta._o.props['strokeDasharray'].split(/\s/);
        expect(parseFloat(strokeDasharray[0])).toBeCloseTo(75, 1);
        return expect(parseFloat(strokeDasharray[1])).toBeCloseTo(37.5, 1);
      });
    });
    describe('_createTween method ->', function() {
      it('should create a tween', function() {
        var delta;
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        delta.tween = null;
        delta._createTween(tweenOptions);
        return expect(delta.tween instanceof mojs.Tween).toBe(true);
      });
      it('should pass options to the tween', function() {
        var delta;
        tweenOptions = {
          duration: 200
        };
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        delta.tween = null;
        delta._createTween(tweenOptions);
        return expect(delta.tween._o).toBe(tweenOptions);
      });
      it('should add onUpdate callback override', function() {
        var delta;
        tweenOptions = {
          duration: 200
        };
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        delta.tween = null;
        delta._createTween(tweenOptions);
        expect(typeof delta.tween._callbackOverrides.onUpdate).toBe('function');
        spyOn(delta, '_calcCurrentProps');
        delta.tween._callbackOverrides.onUpdate(.2, .1);
        return expect(delta._calcCurrentProps).toHaveBeenCalledWith(.2, .1);
      });
      it('should add onRefresh callback override', function() {
        var delta;
        tweenOptions = {
          duration: 200
        };
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        delta.tween = null;
        delta._createTween(tweenOptions);
        expect(typeof delta.tween._callbackOverrides.onRefresh).toBe('function');
        spyOn(delta, '_calcCurrentProps');
        delta.tween._callbackOverrides.onRefresh(true, .2, .1);
        return expect(delta._calcCurrentProps).toHaveBeenCalledWith(.2, .1);
      });
      it('should add not onRefresh callback override is isChained', function() {
        var delta;
        tweenOptions = {
          duration: 200
        };
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props,
          isChained: true
        });
        delta.tween = null;
        delta._createTween(tweenOptions);
        return expect(typeof delta.tween._callbackOverrides.onRefresh).toBe('undefined');
      });
      it('should be called on initialization', function() {
        var delta;
        spyOn(Delta.prototype, '_createTween').and.callThrough();
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        return expect(Delta.prototype._createTween).toHaveBeenCalledWith(tweenOptions);
      });
      return it('should pass callbacksContext to tween', function() {
        var callbacksContext, delta;
        callbacksContext = {};
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props,
          callbacksContext: callbacksContext
        });
        return expect(delta.tween._o.callbacksContext).toBe(callbacksContext);
      });
    });
    describe('refresh method ->', function() {
      it('should call `_refresh` on `tween` // before', function() {
        var delta;
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        spyOn(delta.tween, '_refresh').and.callThrough();
        delta.refresh(true);
        return expect(delta.tween._refresh).toHaveBeenCalledWith(true);
      });
      it('should call `_refresh` on `tween` // after', function() {
        var delta;
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        spyOn(delta.tween, '_refresh').and.callThrough();
        delta.refresh(false);
        return expect(delta.tween._refresh).toHaveBeenCalledWith(false);
      });
      it('should save `_previousValues`', function() {
        var delta, p;
        deltas = [
          h.parseDelta('x', {
            0: 20
          }, 0), h.parseDelta('y', {
            20: 10
          }, 0)
        ];
        props = {};
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        delta._previousValues = null;
        delta.refresh(false);
        p = delta._previousValues;
        expect(p[0].name).toBe('x');
        expect(p[0].value).toBe('0px');
        expect(p[1].name).toBe('y');
        return expect(p[1].value).toBe('20px');
      });
      return it('should return this', function() {
        var delta, result;
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        result = delta.refresh(false);
        return expect(result).toBe(delta);
      });
    });
    return describe('restore method ->', function() {
      it('should call restore values from `_previousValues`', function() {
        var delta;
        props = {};
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        props.z = null;
        props.f = null;
        delta._previousValues = [
          {
            name: 'z',
            value: 20
          }, {
            name: 'f',
            value: 40
          }
        ];
        delta.restore();
        expect(props.z).toBe(20);
        return expect(props.f).toBe(40);
      });
      return it('should return `this`', function() {
        var delta, result;
        props = {};
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        delta._previousValues = [
          {
            name: 'z',
            value: 20
          }, {
            name: 'f',
            value: 40
          }
        ];
        result = delta.restore();
        return expect(result).toBe(delta);
      });
    });
  });

}).call(this);
