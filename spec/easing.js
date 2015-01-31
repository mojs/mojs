(function() {
  var easing;

  easing = mojs.easing;

  describe('easing', function() {
    describe('Linear ->', function() {
      return it('should have None', function() {
        return expect(easing.Linear.None(.5)).toBe(.5);
      });
    });
    describe('Quadratic ->', function() {
      it('should have In', function() {
        return expect(easing.Quadratic.In(.5)).toBe(.5 * .5);
      });
      it('should have Out', function() {
        return expect(easing.Quadratic.Out(.5)).toBe(.5 * (2 - .5));
      });
      return it('should have InOut', function() {
        expect(easing.Quadratic.InOut(.5)).toBe(.5);
        return expect(easing.Quadratic.InOut(.25)).toBe(.125);
      });
    });
    describe('Cubic ->', function() {
      it('should have In', function() {
        return expect(easing.Cubic.In(.5)).toBe(.5 * .5 * .5);
      });
      it('should have Out', function() {
        return expect(easing.Cubic.Out(.5)).toBe(.875);
      });
      return it('should have InOut', function() {
        expect(easing.Cubic.InOut(.5)).toBe(.5);
        return expect(easing.Cubic.InOut(.25)).toBe(.0625);
      });
    });
    describe('Quartic ->', function() {
      it('should have In', function() {
        return expect(easing.Quartic.In(.5)).toBe(.5 * .5 * .5 * .5);
      });
      it('should have Out', function() {
        return expect(easing.Quartic.Out(.5)).toBe(.9375);
      });
      return it('should have InOut', function() {
        expect(easing.Quartic.InOut(.5)).toBe(.5);
        return expect(easing.Quartic.InOut(.25)).toBe(.03125);
      });
    });
    describe('Quintic ->', function() {
      it('should have In', function() {
        return expect(easing.Quintic.In(.5)).toBe(.5 * .5 * .5 * .5 * .5);
      });
      it('should have Out', function() {
        return expect(easing.Quintic.Out(.5)).toBe(.96875);
      });
      return it('should have InOut', function() {
        expect(easing.Quintic.InOut(.5)).toBe(.5);
        return expect(easing.Quintic.InOut(.25)).toBe(.015625);
      });
    });
    describe('Sinusoidal ->', function() {
      it('should have In', function() {
        return expect(easing.Sinusoidal.In(.5)).toBe(1 - Math.cos(.5 * Math.PI / 2));
      });
      it('should have Out', function() {
        return expect(easing.Sinusoidal.Out(.5)).toBe(Math.sin(.5 * Math.PI / 2));
      });
      return it('should have InOut', function() {
        var result;
        result = 0.5 * (1 - Math.cos(Math.PI * .5));
        return expect(easing.Sinusoidal.InOut(.5)).toBe(result);
      });
    });
    describe('Exponential ->', function() {
      it('should have In', function() {
        expect(easing.Exponential.In(0)).toBe(0);
        return expect(easing.Exponential.In(.5)).toBe(Math.pow(1024, .5 - 1));
      });
      it('should have Out', function() {
        expect(easing.Exponential.Out(1)).toBe(1);
        return expect(easing.Exponential.Out(.5)).toBe(1 - Math.pow(2, -10 * .5));
      });
      return it('should have InOut', function() {
        expect(easing.Exponential.InOut(0)).toBe(0);
        expect(easing.Exponential.InOut(1)).toBe(1);
        expect(easing.Exponential.InOut(.25)).toBe(0.5 * Math.pow(1024, .5 - 1));
        return expect(easing.Exponential.InOut(.5)).toBe(.5);
      });
    });
    describe('Circular ->', function() {
      it('should have In', function() {
        return expect(easing.Circular.In(.5)).toBe(1 - Math.sqrt(1 - .5 * .5));
      });
      it('should have Out', function() {
        var k;
        k = .5;
        return expect(easing.Circular.Out(k)).toBe(Math.sqrt(1 - (--k * k)));
      });
      return it('should have InOut', function() {
        expect(easing.Circular.InOut(.25).toFixed(2)).toBe('0.07');
        return expect(easing.Circular.InOut(.6).toFixed(2)).toBe('0.80');
      });
    });
    describe('Elastic ->', function() {
      it('should have In', function() {
        expect(easing.Elastic.In(0)).toBe(0);
        expect(easing.Elastic.In(1)).toBe(1);
        expect(easing.Elastic.In(.75).toFixed(5)).toBe('-0.12500');
        return expect(easing.Elastic.In(.1).toFixed(2)).toBe('0.00');
      });
      it('should have Out', function() {
        expect(easing.Elastic.Out(0)).toBe(0);
        expect(easing.Elastic.Out(1)).toBe(1);
        return expect(easing.Elastic.Out(.75).toFixed(2)).toBe('1.00');
      });
      return it('should have InOut', function() {
        expect(easing.Elastic.InOut(0)).toBe(0);
        expect(easing.Elastic.InOut(1)).toBe(1);
        expect(easing.Elastic.InOut(.25).toFixed(2)).toBe('0.00');
        return expect(easing.Elastic.InOut(.75).toFixed(2)).toBe('1.00');
      });
    });
    describe('Back ->', function() {
      it('should have In', function() {
        return expect(easing.Back.In(.75).toFixed(2)).toBe('0.18');
      });
      it('should have Out', function() {
        return expect(easing.Back.Out(.75).toFixed(2)).toBe('1.06');
      });
      return it('should have InOut', function() {
        expect(easing.Back.InOut(.25).toFixed(2)).toBe('-0.10');
        return expect(easing.Back.InOut(.75).toFixed(2)).toBe('1.10');
      });
    });
    return describe('Bounce ->', function() {
      it('should have In', function() {
        return expect(easing.Bounce.In(.75).toFixed(2)).toBe('0.53');
      });
      it('should have Out', function() {
        expect(easing.Bounce.Out(.1).toFixed(2)).toBe('0.08');
        expect(easing.Bounce.Out(.25).toFixed(2)).toBe('0.47');
        expect(easing.Bounce.Out(.75).toFixed(2)).toBe('0.97');
        return expect(easing.Bounce.Out(.99).toFixed(2)).toBe('0.99');
      });
      return it('should have InOut', function() {
        expect(easing.Bounce.InOut(.25).toFixed(2)).toBe('0.12');
        return expect(easing.Bounce.InOut(.75).toFixed(2)).toBe('0.88');
      });
    });
  });

}).call(this);
