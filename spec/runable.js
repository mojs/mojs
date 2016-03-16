(function() {
  var Runable, Thenable, h;

  h = mojs.h;

  Runable = mojs.Runable;

  Thenable = mojs.Thenable;

  describe('Runable ->', function() {
    describe('extention ->', function() {
      return it('should extend Thenable', function() {
        var rn;
        rn = new Runable;
        return expect(rn instanceof Thenable).toBe(true);
      });
    });
    describe('_vars method ->', function() {});
    return describe('_transformHistoryRecord method', function() {});
  });

}).call(this);
