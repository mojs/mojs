(function() {
  var Burst, Transit;

  Transit = mojs.Transit;

  Burst = mojs.Burst;

  describe('Byte ->', function() {
    return describe('extension ->', function() {
      it('should extend Transit class', function() {
        var burst;
        burst = new Burst;
        return expect(burst instanceof Transit).toBe(true);
      });
      return it('should have its own defaults', function() {
        var burst;
        burst = new Burst;
        expect(burst.defaults.burstDegree).toBe(360);
        expect(burst.defaults.burstPoints).toBe(5);
        return expect(burst.defaults.burstRadius[50]).toBe(75);
      });
    });
  });

}).call(this);
