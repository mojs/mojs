(function() {
  var mix;

  mix = mojs.easing.mix;

  describe('mix ->', function() {
    return it('should return new function', function() {
      var res;
      res = mix({
        to: .5,
        value: 4
      });
      return expect(typeof res).toBe('function');
    });
  });

  describe('returned function ->', function() {
    it('should return value on the progress', function() {
      var res;
      res = mix({
        to: .5,
        value: 4
      }, {
        to: .7,
        value: 3
      });
      expect(res(.4)).toBe(4);
      return expect(res(.6)).toBe(3);
    });
    it('should evaluate function if passed', function() {
      var res;
      res = mix({
        to: .5,
        value: function(p) {
          return 2 * p;
        }
      }, {
        to: .7,
        value: 3
      });
      expect(res(.4)).toBe(2 * .4);
      return expect(res(.6)).toBe(3);
    });
    return it('should return 1 if not defined', function() {
      var res;
      res = mix({
        to: .5,
        value: function(p) {
          return 2 * p;
        }
      });
      return expect(res(.6)).toBe(1);
    });
  });

}).call(this);
