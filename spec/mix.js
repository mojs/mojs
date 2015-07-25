(function() {
  var mix;

  mix = mojs.easing.mix;

  describe('mix ->', function() {
    it('should return new function', function() {
      var res;
      res = mix({
        to: .5,
        value: 4
      });
      return expect(typeof res).toBe('function');
    });
    return describe('returned function ->', function() {
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
      it('should return 1 if not defined', function() {
        var res;
        res = mix({
          to: .5,
          value: function(p) {
            return 2 * p;
          }
        });
        return expect(res(.6)).toBe(1);
      });
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
      it('should work with one value', function() {
        var res;
        res = mix({
          to: .5,
          value: 'cubic.in'
        });
        return expect(res(.3)).toBe(mojs.easing.cubic["in"](.3));
      });
      return it('should work with array value', function() {
        var res;
        res = mix({
          to: .5,
          value: [0.42, 0, 1, 1]
        });
        return expect(res(.3)).toBe(mojs.easing.ease["in"](.3));
      });
    });
  });

}).call(this);
