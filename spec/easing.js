(function() {
  var Easing;

  Easing = mojs.Easing;

  describe('Easing', function() {
    describe('Linear ->', function() {
      return it('should have None', function() {
        return expect(Easing.Linear.None(.5)).toBe(.5);
      });
    });
    describe('Quadratic ->', function() {
      it('should have In', function() {
        return expect(Easing.Quadratic.In(.5)).toBe(.5 * .5);
      });
      it('should have Out', function() {
        return expect(Easing.Quadratic.Out(.5)).toBe(.5 * (2 - .5));
      });
      return it('should have InOut', function() {
        expect(Easing.Quadratic.InOut(.5)).toBe(.5);
        return expect(Easing.Quadratic.InOut(.25)).toBe(.125);
      });
    });
    describe('Cubic ->', function() {
      it('should have In', function() {
        return expect(Easing.Cubic.In(.5)).toBe(.5 * .5 * .5);
      });
      it('should have Out', function() {
        return expect(Easing.Cubic.Out(.5)).toBe(.875);
      });
      return it('should have InOut', function() {
        expect(Easing.Cubic.InOut(.5)).toBe(.5);
        return expect(Easing.Cubic.InOut(.25)).toBe(.0625);
      });
    });
    describe('Quartic ->', function() {
      it('should have In', function() {
        return expect(Easing.Quartic.In(.5)).toBe(.5 * .5 * .5 * .5);
      });
      it('should have Out', function() {
        return expect(Easing.Quartic.Out(.5)).toBe(.9375);
      });
      return it('should have InOut', function() {
        expect(Easing.Quartic.InOut(.5)).toBe(.5);
        return expect(Easing.Quartic.InOut(.25)).toBe(.03125);
      });
    });
    describe('Quintic ->', function() {
      it('should have In', function() {
        return expect(Easing.Quintic.In(.5)).toBe(.5 * .5 * .5 * .5 * .5);
      });
      it('should have Out', function() {
        return expect(Easing.Quintic.Out(.5)).toBe(.96875);
      });
      return it('should have InOut', function() {
        expect(Easing.Quintic.InOut(.5)).toBe(.5);
        return expect(Easing.Quintic.InOut(.25)).toBe(.015625);
      });
    });
    describe('Sinusoidal ->', function() {
      it('should have In', function() {
        return expect(Easing.Sinusoidal.In(.5)).toBe(1 - Math.cos(.5 * Math.PI / 2));
      });
      it('should have Out', function() {
        return expect(Easing.Sinusoidal.Out(.5)).toBe(Math.sin(.5 * Math.PI / 2));
      });
      return it('should have InOut', function() {
        var result;
        result = 0.5 * (1 - Math.cos(Math.PI * .5));
        return expect(Easing.Sinusoidal.InOut(.5)).toBe(result);
      });
    });
    describe('Exponential ->', function() {
      it('should have In', function() {
        expect(Easing.Exponential.In(0)).toBe(0);
        return expect(Easing.Exponential.In(.5)).toBe(Math.pow(1024, .5 - 1));
      });
      it('should have Out', function() {
        expect(Easing.Exponential.Out(1)).toBe(1);
        return expect(Easing.Exponential.Out(.5)).toBe(1 - Math.pow(2, -10 * .5));
      });
      return it('should have InOut', function() {
        expect(Easing.Exponential.InOut(0)).toBe(0);
        expect(Easing.Exponential.InOut(1)).toBe(1);
        expect(Easing.Exponential.InOut(.25)).toBe(0.5 * Math.pow(1024, .5 - 1));
        return expect(Easing.Exponential.InOut(.5)).toBe(.5);
      });
    });
    describe('Circular ->', function() {
      it('should have In', function() {
        return expect(Easing.Circular.In(.5)).toBe(1 - Math.sqrt(1 - .5 * .5));
      });
      it('should have Out', function() {
        var k;
        k = .5;
        return expect(Easing.Circular.Out(k)).toBe(Math.sqrt(1 - (--k * k)));
      });
      return it('should have InOut', function() {
        expect(Easing.Circular.InOut(.25).toFixed(2)).toBe('0.07');
        return expect(Easing.Circular.InOut(.6).toFixed(2)).toBe('0.80');
      });
    });
    describe('Elastic ->', function() {
      it('should have In', function() {
        expect(Easing.Elastic.In(0)).toBe(0);
        expect(Easing.Elastic.In(1)).toBe(1);
        expect(Easing.Elastic.In(.75).toFixed(5)).toBe('-0.12500');
        return expect(Easing.Elastic.In(.1).toFixed(2)).toBe('0.00');
      });
      it('should have Out', function() {
        expect(Easing.Elastic.Out(0)).toBe(0);
        expect(Easing.Elastic.Out(1)).toBe(1);
        return expect(Easing.Elastic.Out(.75).toFixed(2)).toBe('1.00');
      });
      return it('should have InOut', function() {
        expect(Easing.Elastic.InOut(0)).toBe(0);
        expect(Easing.Elastic.InOut(1)).toBe(1);
        expect(Easing.Elastic.InOut(.25).toFixed(2)).toBe('0.00');
        return expect(Easing.Elastic.InOut(.75).toFixed(2)).toBe('1.00');
      });
    });
    describe('Back ->', function() {
      it('should have In', function() {
        return expect(Easing.Back.In(.75).toFixed(2)).toBe('0.18');
      });
      it('should have Out', function() {
        return expect(Easing.Back.Out(.75).toFixed(2)).toBe('1.06');
      });
      return it('should have InOut', function() {
        expect(Easing.Back.InOut(.25).toFixed(2)).toBe('-0.10');
        return expect(Easing.Back.InOut(.75).toFixed(2)).toBe('1.10');
      });
    });
    return describe('Bounce ->', function() {
      it('should have In', function() {
        return expect(Easing.Bounce.In(.75).toFixed(2)).toBe('0.53');
      });
      it('should have Out', function() {
        expect(Easing.Bounce.Out(.1).toFixed(2)).toBe('0.08');
        expect(Easing.Bounce.Out(.25).toFixed(2)).toBe('0.47');
        expect(Easing.Bounce.Out(.75).toFixed(2)).toBe('0.97');
        return expect(Easing.Bounce.Out(.99).toFixed(2)).toBe('0.99');
      });
      return it('should have InOut', function() {
        expect(Easing.Bounce.InOut(.25).toFixed(2)).toBe('0.12');
        return expect(Easing.Bounce.InOut(.75).toFixed(2)).toBe('0.88');
      });
    });
  });

}).call(this);
