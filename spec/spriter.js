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
      expect(sp._defaults.isShowEnd).toBe(false);
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
      it('should error if 0 frames parsed', function() {
        var div, sp;
        div = document.createElement('div');
        spyOn(h, 'error');
        sp = new Spriter({
          el: div
        });
        return expect(h.error).toHaveBeenCalled();
      });
      it('should hide all frames', function() {
        var div, div1, div2, div3, div4, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div3 = document.createElement('div');
        div4 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);
        sp = new Spriter({
          el: div,
          isRunLess: true
        });
        expect(sp._frames[0].style.opacity).toBe('0');
        expect(sp._frames[1].style.opacity).toBe('0');
        expect(sp._frames[2].style.opacity).toBe('0');
        return expect(sp._frames[3].style.opacity).toBe('0');
      });
      return it('should calculate _frameStep variable', function() {
        var div, div1, div2, div3, div4, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div3 = document.createElement('div');
        div4 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);
        sp = new Spriter({
          el: div,
          isRunLess: true
        });
        return expect(sp._frameStep).toBe(.25);
      });
    });
    describe('tween creation ->', function() {
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
        expect(sp.timeline instanceof mojs.Timeline).toBe(true);
        expect(sp._tween instanceof mojs.Tween).toBe(true);
        return expect(sp.timeline._timelines[0]).toBe(sp._tween);
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
        spyOn(sp.timeline, 'play');
        return setTimeout(function() {
          expect(sp.timeline.play).toHaveBeenCalled();
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
        spyOn(sp.timeline, 'play');
        return setTimeout(function() {
          expect(sp.timeline.play).not.toHaveBeenCalled();
          return dfr();
        }, 10);
      });
    });
    describe('_setProgress method', function() {
      it('should show element on progress', function() {
        var div, div1, div2, div3, div4, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div3 = document.createElement('div');
        div4 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);
        sp = new Spriter({
          el: div,
          isRunLess: true
        });
        sp._setProgress(.5);
        expect(sp._frames[0].style.opacity).toBe('0');
        expect(sp._frames[1].style.opacity).toBe('0');
        expect(sp._frames[2].style.opacity).toBe('1');
        return expect(sp._frames[3].style.opacity).toBe('0');
      });
      it('should hide previous element on progress', function() {
        var div, div1, div2, div3, div4, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div3 = document.createElement('div');
        div4 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);
        sp = new Spriter({
          el: div,
          isRunLess: true
        });
        sp._setProgress(.25);
        sp._setProgress(.5);
        expect(sp._frames[0].style.opacity).toBe('0');
        expect(sp._frames[1].style.opacity).toBe('0');
        expect(sp._frames[2].style.opacity).toBe('1');
        return expect(sp._frames[3].style.opacity).toBe('0');
      });
      it('should hide all frames at end', function() {
        var div, div1, div2, div3, div4, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div3 = document.createElement('div');
        div4 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);
        sp = new Spriter({
          el: div,
          isRunLess: true
        });
        sp._setProgress(.25);
        sp._setProgress(.5);
        sp._setProgress(1);
        expect(sp._frames[0].style.opacity).toBe('0');
        expect(sp._frames[1].style.opacity).toBe('0');
        expect(sp._frames[2].style.opacity).toBe('0');
        return expect(sp._frames[3].style.opacity).toBe('0');
      });
      return it('should not hide the last frame at end if isShowEnd passed', function() {
        var div, div1, div2, div3, div4, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div3 = document.createElement('div');
        div4 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);
        sp = new Spriter({
          el: div,
          isRunLess: true,
          isShowEnd: true
        });
        sp._setProgress(.25);
        sp._setProgress(.5);
        sp._setProgress(1);
        return expect(sp._frames[3].style.opacity).toBe('1');
      });
    });
    describe('onUpdate callback ->', function() {
      it('should be called on every sprite update', function() {
        var div, div1, div2, div3, div4, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div3 = document.createElement('div');
        div4 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);
        sp = new Spriter({
          el: div,
          isRunLess: true,
          onUpdate: function() {}
        });
        spyOn(sp._props, 'onUpdate');
        sp.timeline.setProgress(.45);
        sp.timeline.setProgress(.5);
        return expect(sp._props.onUpdate).toHaveBeenCalled();
      });
      return it('should be called with progress on every sprite update', function() {
        var div, div1, div2, div3, div4, progress, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div3 = document.createElement('div');
        div4 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);
        progress = -1;
        sp = new Spriter({
          el: div,
          isRunLess: true,
          onUpdate: function(p) {
            return progress = p;
          }
        });
        sp.timeline.setProgress(.45);
        sp.timeline.setProgress(.5);
        return expect(progress.toFixed(1)).toBe('0.5');
      });
    });
    return describe('run method', function() {
      return it('should start tween', function() {
        var div, div1, div2, div3, div4, sp;
        div = document.createElement('div');
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div3 = document.createElement('div');
        div4 = document.createElement('div');
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);
        sp = new Spriter({
          el: div,
          isRunLess: true
        });
        spyOn(sp.timeline, 'play');
        sp.run();
        return expect(sp.timeline.play).toHaveBeenCalled();
      });
    });
  });

}).call(this);
