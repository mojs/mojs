(function() {
  var Delta, Tween, deltas, h, props, tweenOptions;

  Tween = mojs.Tween;

  h = mojs.h;

  Delta = mojs._pool.Delta;

  deltas = [{}, {}];

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
        return expect(delta._o.props['strokeDasharray']).toEqual([
          {
            string: '100px',
            value: 100,
            unit: 'px'
          }, {
            string: '50px',
            value: 50,
            unit: 'px'
          }
        ]);
      });
      it('should calc array # curve', function() {
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
        strokeDasharray = delta._o.props['strokeDasharray'];
        expect(strokeDasharray[0].value).toBeCloseTo(75, 1);
        expect(strokeDasharray[1].value).toBeCloseTo(37.5, 1);
        return expect(strokeDasharray.length).toBeCloseTo(2);
      });
      return it('should reuse the props array', function() {
        var arr, arrDelta, delta;
        arrDelta = h.parseDelta('strokeDasharray', {
          '0 100': '200 0'
        }, 0);
        arr = [];
        props = {
          strokeDasharray: arr
        };
        delta = new Delta({
          deltas: [arrDelta],
          tweenOptions: tweenOptions,
          props: props
        });
        delta._calcCurrent_array(arrDelta, .5, .5);
        return expect(delta._o.props['strokeDasharray']).toBe(arr);
      });
    });
    return describe('_createTween method', function() {
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
      return it('should be called on initialization', function() {
        var delta;
        spyOn(Delta.prototype, '_createTween');
        delta = new Delta({
          deltas: deltas,
          tweenOptions: tweenOptions,
          props: props
        });
        return expect(Delta.prototype._createTween).toHaveBeenCalledWith(tweenOptions);
      });
    });
  });

}).call(this);
