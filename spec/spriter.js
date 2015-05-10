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
      expect(sp._defaults.duration).toBe(500);
      expect(sp._defaults.delay).toBe(0);
      expect(sp._defaults.easing).toBe('linear.none');
      expect(sp._defaults.repeat).toBe(0);
      expect(sp._defaults.yoyo).toBe(false);
      expect(sp._defaults.isRunLess).toBe(false);
      expect(sp._defaults.onStart).toBe(null);
      expect(sp._defaults.onUpdate).toBe(null);
      return expect(sp._defaults.onComplete).toBe(null);
    });
    describe('extendDefaults method', function() {
      it('should extend props by options', function() {
        var div, fun, sp;
        div = document.createElement('div');
        fun = function() {};
        sp = new Spriter({
          el: div,
          onStart: fun
        });
        expect(sp._props.onUpdate).toBe(null);
        expect(sp._props.onStart).toBe(fun);
        expect(sp._props.delay).toBe(0);
        return expect(sp._props.duration).toBe(500);
      });
      it('should extend props by options', function() {
        var div, fun, sp;
        div = document.createElement('div');
        fun = function() {};
        sp = new Spriter({
          el: div,
          onComplete: fun
        });
        return expect(sp._props.onComplete).toBe(fun);
      });
      return it('should extend props by options', function() {
        var div, fun, sp;
        div = document.createElement('div');
        fun = function() {};
        sp = new Spriter({
          el: div,
          repeat: 1
        });
        expect(sp._props.repeat).toBe(1);
        return expect(sp._props.yoyo).toBe(false);
      });
    });
    describe('el option // el parsing', function() {
      it('should recieve el option', function() {
        var div, sp;
        div = document.createElement('div');
        sp = new Spriter({
          el: div
        });
        return expect(sp.el).toBe(div);
      });
      it('should error if el was not passed', function() {
        var sp;
        spyOn(h, 'error');
        sp = new Spriter;
        return expect(h.error).toHaveBeenCalled();
      });
      it('should parse el to frames', function() {
        var div, div1, div2, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        sp = new Spriter({
          el: div
        });
        expect(sp._frames.length).toBe(2);
        expect(sp._frames[0]).toBe(div1);
        return expect(sp._frames[1]).toBe(div2);
      });
      it('should frames should be real array', function() {
        var div, div1, div2, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        sp = new Spriter({
          el: div
        });
        return expect(sp._frames instanceof Array).toBe(true);
      });
      it('should warn if 2 or less frames', function() {
        var div, div1, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div.appendChild(div1);
        spyOn(h, 'warn');
        sp = new Spriter({
          el: div
        });
        return expect(h.warn).toHaveBeenCalled();
      });
      return it('should error if 0 frames parsed', function() {
        var div, sp;
        div = document.createElement('div');
        spyOn(h, 'error');
        sp = new Spriter({
          el: div
        });
        return expect(h.error).toHaveBeenCalled();
      });
    });
    return describe('tween creation', function() {
      it('should create timeline and tween', function() {
        var div, div1, div2, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        sp = new Spriter({
          el: div
        });
        expect(sp._timeline instanceof mojs.Timeline).toBe(true);
        expect(sp._tween instanceof mojs.Tween).toBe(true);
        return expect(sp._tween.timelines[0]).toBe(sp._timeline);
      });
      it('should start tween', function(dfr) {
        var div, div1, div2, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        sp = new Spriter({
          el: div
        });
        spyOn(sp._tween, 'start');
        return setTimeout(function() {
          expect(sp._tween.start).toHaveBeenCalled();
          return dfr();
        }, 10);
      });
      return it('should not start tween if isRunLess passed', function(dfr) {
        var div, div1, div2, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        sp = new Spriter({
          el: div,
          isRunLess: true
        });
        spyOn(sp._tween, 'start');
        return setTimeout(function() {
          expect(sp._tween.start).not.toHaveBeenCalled();
          return dfr();
        }, 10);
      });
    });
  });

}).call(this);
