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
        return expect(easing.quad["in"].toStr()).toBe('bezier(0.55,0.085,0.68,0.53)');
      });
      it('should have Out', function() {
        return expect(easing.quad.out.toStr()).toBe('bezier(0.25,0.46,0.45,0.94)');
      });
      return it('should have InOut', function() {
        return expect(easing.quad.inout.toStr()).toBe('bezier(0.455,0.03,0.515,0.955)');
      });
    });
    describe('cubic ->', function() {
      it('should have In', function() {
        return expect(easing.cubic["in"].toStr()).toBe('bezier(0.55,0.055,0.675,0.19)');
      });
      it('should have Out', function() {
        return expect(easing.cubic.out.toStr()).toBe('bezier(0.215,0.61,0.355,1)');
      });
      return it('should have InOut', function() {
        return expect(easing.cubic.inout.toStr()).toBe('bezier(0.645,0.045,0.355,1)');
      });
    });
    describe('quart ->', function() {
      it('should have In', function() {
        return expect(easing.quart["in"].toStr()).toBe('bezier(0.895,0.03,0.685,0.22)');
      });
      it('should have Out', function() {
        return expect(easing.quart.out.toStr()).toBe('bezier(0.165,0.84,0.44,1)');
      });
      return it('should have InOut', function() {
        return expect(easing.quart.inout.toStr()).toBe('bezier(0.77,0,0.175,1)');
      });
    });
    describe('quint ->', function() {
      it('should have In', function() {
        return expect(easing.quint["in"].toStr()).toBe('bezier(0.895,0.03,0.685,0.22)');
      });
      it('should have Out', function() {
        return expect(easing.quint.out.toStr()).toBe('bezier(0.165,0.84,0.44,1)');
      });
      return it('should have InOut', function() {
        return expect(easing.quint.inout.toStr()).toBe('bezier(0.77,0,0.175,1)');
      });
    });
    describe('sin ->', function() {
      it('should have In', function() {
        return expect(easing.sin["in"].toStr()).toBe('bezier(0.47,0,0.745,0.715)');
      });
      it('should have Out', function() {
        return expect(easing.sin.out.toStr()).toBe('bezier(0.39,0.575,0.565,1)');
      });
      return it('should have InOut', function() {
        return expect(easing.sin.inout.toStr()).toBe('bezier(0.445,0.05,0.55,0.95)');
      });
    });
    describe('expo ->', function() {
      it('should have In', function() {
        return expect(easing.expo["in"].toStr()).toBe('bezier(0.95,0.05,0.795,0.035)');
      });
      it('should have Out', function() {
        return expect(easing.expo.out.toStr()).toBe('bezier(0.19,1,0.22,1)');
      });
      return it('should have InOut', function() {
        return expect(easing.expo.inout.toStr()).toBe('bezier(1,0,0,1)');
      });
    });
    describe('circ ->', function() {
      it('should have In', function() {
        return expect(easing.circ["in"].toStr()).toBe('bezier(0.6,0.04,0.98,0.335)');
      });
      it('should have Out', function() {
        return expect(easing.circ.out.toStr()).toBe('bezier(0.075,0.82,0.165,1)');
      });
      return it('should have InOut', function() {
        return expect(easing.circ.inout.toStr()).toBe('bezier(0.785,0.135,0.15,0.86)');
      });
    });
    describe('back ->', function() {
      it('should have In', function() {
        return expect(easing.back["in"].toStr()).toBe('bezier(0.6,0,0.735,0.045)');
      });
      it('should have Out', function() {
        return expect(easing.back.out.toStr()).toBe('bezier(0.175,0.885,0.32,1)');
      });
      return it('should have InOut', function() {
        return expect(easing.back.inout.toStr()).toBe('bezier(0.68,0,0.265,1)');
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
