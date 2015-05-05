(function() {
  var easing;

  easing = mojs.easing;

  describe('easing ->', function() {
    describe('Linear ->', function() {
      return it('should have None', function() {
        return expect(easing.linear.none(.5)).toBe(.5);
      });
    });
    describe('ease ->', function() {
      it('should have In', function() {
        return expect(easing.ease["in"].toStr()).toBe('bezier(0.42,0,1,1)');
      });
      it('should have Out', function() {
        return expect(easing.ease.out.toStr()).toBe('bezier(0,0,0.58,1)');
      });
      return it('should have InOut', function() {
        return expect(easing.ease.inout.toStr()).toBe('bezier(0.42,0,0.58,1)');
      });
    });
    describe('quad ->', function() {
      it('should have In', function() {
        return expect(easing.quad["in"](.5)).toBe(.5 * .5);
      });
      it('should have Out', function() {
        return expect(easing.quad.out(.5)).toBe(.5 * (2 - .5));
      });
      return it('should have InOut', function() {
        expect(easing.quad.inout(.5)).toBe(.5);
        return expect(easing.quad.inout(.25)).toBe(.125);
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
    describe('quart ->', function() {
      it('should have In', function() {
        return expect(easing.quart["in"](.5)).toBe(.5 * .5 * .5 * .5);
      });
      it('should have Out', function() {
        return expect(easing.quart.out(.5)).toBe(.9375);
      });
      return it('should have InOut', function() {
        expect(easing.quart.inout(.5)).toBe(.5);
        return expect(easing.quart.inout(.25)).toBe(.03125);
      });
    });
    describe('quint ->', function() {
      it('should have In', function() {
        return expect(easing.quint["in"](.5)).toBe(.5 * .5 * .5 * .5 * .5);
      });
      it('should have Out', function() {
        return expect(easing.quint.out(.5)).toBe(.96875);
      });
      return it('should have InOut', function() {
        expect(easing.quint.inout(.5)).toBe(.5);
        return expect(easing.quint.inout(.25)).toBe(.015625);
      });
    });
    describe('sin ->', function() {
      it('should have In', function() {
        return expect(easing.sin["in"](.5)).toBe(1 - Math.cos(.5 * Math.PI / 2));
      });
      it('should have Out', function() {
        return expect(easing.sin.out(.5)).toBe(Math.sin(.5 * Math.PI / 2));
      });
      return it('should have InOut', function() {
        var result;
        result = 0.5 * (1 - Math.cos(Math.PI * .5));
        return expect(easing.sin.inout(.5)).toBe(result);
      });
    });
    describe('exp ->', function() {
      it('should have In', function() {
        expect(easing.exp["in"](0)).toBe(0);
        return expect(easing.exp["in"](.5)).toBe(Math.pow(1024, .5 - 1));
      });
      it('should have Out', function() {
        expect(easing.exp.out(1)).toBe(1);
        return expect(easing.exp.out(.5)).toBe(1 - Math.pow(2, -10 * .5));
      });
      return it('should have InOut', function() {
        expect(easing.exp.inout(0)).toBe(0);
        expect(easing.exp.inout(1)).toBe(1);
        expect(easing.exp.inout(.25)).toBe(0.5 * Math.pow(1024, .5 - 1));
        return expect(easing.exp.inout(.5)).toBe(.5);
      });
    });
    describe('circ ->', function() {
      it('should have In', function() {
        return expect(easing.circ["in"](.5)).toBe(1 - Math.sqrt(1 - .5 * .5));
      });
      it('should have Out', function() {
        var k;
        k = .5;
        return expect(easing.circ.out(k)).toBe(Math.sqrt(1 - (--k * k)));
      });
      return it('should have InOut', function() {
        expect(easing.circ.inout(.25).toFixed(2)).toBe('0.07');
        return expect(easing.circ.inout(.6).toFixed(2)).toBe('0.80');
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
    describe('bounce ->', function() {
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
    describe('bezier ->', function() {
      return it('should have bezier constructor', function() {
        return expect(typeof easing.bezier).toBe('function');
      });
    });
    describe('path ->', function() {
      return it('should have path constructor', function() {
        return expect(typeof easing.path).toBe('function');
      });
    });
    return describe('PathEasing ->', function() {
      return it('should have PathEasing constructor', function() {
        return expect(typeof easing.PathEasing).toBe('function');
      });
    });
  });

}).call(this);
