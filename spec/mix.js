(function() {
  var mix;

  mix = mojs.easing.mix;

  describe('mix ->', function() {});

  describe('returned function ->', function() {
    it('should parse easing', function() {
      var res;
      res = mix({
        to: .5,
        value: 'cubic.in'
      }, {
        to: .7,
        value: 'cubic.out'
      });
      return expect(res(.3)).toBe(mojs.easing.cubic["in"](.3));
    });
    return it('should with one value', function() {
      var res;
      res = mix({
        to: .5,
        value: 'cubic.in'
      });
      return expect(res(.3)).toBe(mojs.easing.cubic["in"](.3));
    });
  });

}).call(this);
