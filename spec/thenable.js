(function() {
  var Thenable, Tweenable, h;

  h = mojs.h;

  Tweenable = mojs.Tweenable;

  Thenable = mojs.Thenable;

  describe('thenable ->', function() {
    describe('extention ->', function() {
      return it('should extend tweenable', function() {
        var th;
        th = new Thenable;
        return expect(th instanceof Tweenable).toBe(true);
      });
    });
    describe('_vars method ->', function() {
      it('should create _history object', function() {
        var th;
        th = new Thenable;
        th._vars();
        expect(h.isArray(th._history)).toBe(true);
        return expect(th._history.length).toBe(1);
      });
      return it('should clone _o object and save it as the first history record', function() {
        var options, th;
        options = {
          a: 2,
          b: 3
        };
        th = new Thenable(options);
        th._vars();
        expect(th._history[0]).not.toBe(options);
        expect(th._history[0].a).toBe(options.a);
        return expect(th._history[0].b).toBe(options.b);
      });
    });
    return describe('then method ->', function() {
      it("instance of the module should have .constructor property pointing to the module class", function() {
        var th;
        th = new Thenable;
        return expect(th.constructor).toBe(Thenable);
      });
      return it("should return this", function() {
        var th;
        th = new Thenable;
        return expect(th.then()).toBe(th);
      });
    });
  });

}).call(this);
