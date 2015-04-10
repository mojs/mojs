(function() {
  var easing;

  easing = mojs.easing;

  describe('easing ->', function() {
    describe('Linear ->', function() {
      return it('should have None', function() {
        return expect(easing.linear.none(.5)).toBe(.5);
      });
    });
    return describe('quad ->', function() {
      return it('should have In', function() {
        return expect(easing.quad["in"].toStr()).toBe('bezier(0.55,0.085,0.68,0.53)');
      });
    });
  });

}).call(this);
