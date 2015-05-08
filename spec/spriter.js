(function() {
  var Spriter, h;

  h = mojs.h;

  Spriter = mojs.Spriter;

  describe('Spriter module ->', function() {
    it('should have defaults', function() {
      var sp;
      sp = new Spriter({
        el: document.createElement('div')
      });
      expect(sp.defaults.duration).toBe(500);
      expect(sp.defaults.delay).toBe(0);
      expect(sp.defaults.easing).toBe('linear.none');
      expect(sp.defaults.repeat).toBe(0);
      expect(sp.defaults.yoyo).toBe(false);
      expect(sp.defaults.onStart).toBe(null);
      expect(sp.defaults.onUpdate).toBe(null);
      return expect(sp.defaults.onComplete).toBe(null);
    });
    describe('extendDefaults method', function() {
      return it('should extend props by options', function() {
        var div, fun, sp;
        div = document.createElement('div');
        fun = function() {};
        sp = new Spriter({
          el: div,
          onStart: fun
        });
        return expect(sp._props.onStart).toBe(fun);
      });
    });
    return describe('el option // el parsing', function() {
      it('should recieve el option', function() {
        var div, sp;
        div = document.createElement('div');
        sp = new Spriter({
          el: div
        });
        return expect(sp.el).toBe(div);
      });
      return it('should error if el was not passed', function() {
        var sp;
        spyOn(h, 'error');
        sp = new Spriter;
        return expect(h.error).toHaveBeenCalled();
      });
    });
  });

}).call(this);
