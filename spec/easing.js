(function() {
  var easing;

  easing = mojs.easing;

  describe('easing ->', function() {
    describe('Linear ->', function() {
      return it('should have None', function() {
        return expect(easing.linear.none(.5)).toBe(.5);
      });
    });
    describe('quadratic ->', function() {
      it('should have In', function() {
        return expect(easing.quadratic["in"](.5)).toBe(.5 * .5);
      });
      it('should have Out', function() {
        return expect(easing.quadratic.out(.5)).toBe(.5 * (2 - .5));
      });
      return it('should have InOut', function() {
        expect(easing.quadratic.inout(.5)).toBe(.5);
        return expect(easing.quadratic.inout(.25)).toBe(.125);
      });
    });
    describe('cubic ->', function() {
      it('should have In', function() {
        return expect(easing.cubic["in"](.5)).toBe(.5 * .5 * .5);
      });
      it('should have Out', function() {
        return expect(easing.cubic.out(.5)).toBe(.875);
      });
      return it('should have InOut', function() {
        expect(easing.cubic.inout(.5)).toBe(.5);
        return expect(easing.cubic.inout(.25)).toBe(.0625);
      });
    });
    describe('quartic ->', function() {
      it('should have In', function() {
        return expect(easing.quartic["in"](.5)).toBe(.5 * .5 * .5 * .5);
      });
      it('should have Out', function() {
        return expect(easing.quartic.out(.5)).toBe(.9375);
      });
      return it('should have InOut', function() {
        expect(easing.quartic.inout(.5)).toBe(.5);
        return expect(easing.quartic.inout(.25)).toBe(.03125);
      });
    });
    describe('quintic ->', function() {
      it('should have In', function() {
        return expect(easing.quintic["in"](.5)).toBe(.5 * .5 * .5 * .5 * .5);
      });
      it('should have Out', function() {
        return expect(easing.quintic.out(.5)).toBe(.96875);
      });
      return it('should have InOut', function() {
        expect(easing.quintic.inout(.5)).toBe(.5);
        return expect(easing.quintic.inout(.25)).toBe(.015625);
      });
    });
    describe('sinusoidal ->', function() {
      it('should have In', function() {
        return expect(easing.sinusoidal["in"](.5)).toBe(1 - Math.cos(.5 * Math.PI / 2));
      });
      it('should have Out', function() {
        return expect(easing.sinusoidal.out(.5)).toBe(Math.sin(.5 * Math.PI / 2));
      });
      return it('should have InOut', function() {
        var result;
        result = 0.5 * (1 - Math.cos(Math.PI * .5));
        return expect(easing.sinusoidal.inout(.5)).toBe(result);
      });
    });
    describe('exponential ->', function() {
      it('should have In', function() {
        expect(easing.exponential["in"](0)).toBe(0);
        return expect(easing.exponential["in"](.5)).toBe(Math.pow(1024, .5 - 1));
      });
      it('should have Out', function() {
        expect(easing.exponential.out(1)).toBe(1);
        return expect(easing.exponential.out(.5)).toBe(1 - Math.pow(2, -10 * .5));
      });
      return it('should have InOut', function() {
        expect(easing.exponential.inout(0)).toBe(0);
        expect(easing.exponential.inout(1)).toBe(1);
        expect(easing.exponential.inout(.25)).toBe(0.5 * Math.pow(1024, .5 - 1));
        return expect(easing.exponential.inout(.5)).toBe(.5);
      });
    });
    describe('circular ->', function() {
      it('should have In', function() {
        return expect(easing.circular["in"](.5)).toBe(1 - Math.sqrt(1 - .5 * .5));
      });
      it('should have Out', function() {
        var k;
        k = .5;
        return expect(easing.circular.out(k)).toBe(Math.sqrt(1 - (--k * k)));
      });
      return it('should have InOut', function() {
        expect(easing.circular.inout(.25).toFixed(2)).toBe('0.07');
        return expect(easing.circular.inout(.6).toFixed(2)).toBe('0.80');
      });
    });
    describe('elastic ->', function() {
      it('should have In', function() {
        expect(easing.elastic["in"](0)).toBe(0);
        expect(easing.elastic["in"](1)).toBe(1);
        expect(easing.elastic["in"](.75).toFixed(5)).toBe('-0.12500');
        return expect(easing.elastic["in"](.1).toFixed(2)).toBe('0.00');
      });
      it('should have Out', function() {
        expect(easing.elastic.out(0)).toBe(0);
        expect(easing.elastic.out(1)).toBe(1);
        return expect(easing.elastic.out(.75).toFixed(2)).toBe('1.00');
      });
      return it('should have InOut', function() {
        expect(easing.elastic.inout(0)).toBe(0);
        expect(easing.elastic.inout(1)).toBe(1);
        expect(easing.elastic.inout(.25).toFixed(2)).toBe('0.00');
        return expect(easing.elastic.inout(.75).toFixed(2)).toBe('1.00');
      });
    });
    describe('back ->', function() {
      it('should have In', function() {
        return expect(easing.back["in"](.75).toFixed(2)).toBe('0.18');
      });
      it('should have Out', function() {
        return expect(easing.back.out(.75).toFixed(2)).toBe('1.06');
      });
      return it('should have InOut', function() {
        expect(easing.back.inout(.25).toFixed(2)).toBe('-0.10');
        return expect(easing.back.inout(.75).toFixed(2)).toBe('1.10');
      });
    });
    return describe('bounce ->', function() {
      it('should have In', function() {
        return expect(easing.bounce["in"](.75).toFixed(2)).toBe('0.53');
      });
      it('should have Out', function() {
        expect(easing.bounce.out(.1).toFixed(2)).toBe('0.08');
        expect(easing.bounce.out(.25).toFixed(2)).toBe('0.47');
        expect(easing.bounce.out(.75).toFixed(2)).toBe('0.97');
        return expect(easing.bounce.out(.99).toFixed(2)).toBe('0.99');
      });
      return it('should have InOut', function() {
        expect(easing.bounce.inout(.25).toFixed(2)).toBe('0.12');
        return expect(easing.bounce.inout(.75).toFixed(2)).toBe('0.88');
      });
    });
  });

}).call(this);
